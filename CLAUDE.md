# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

This is the **repo-root** guide. For frontend-specific conventions (i18n, CSS Modules, breakpoints, section components) see `frontend/CLAUDE.md` — do not duplicate that content here.

## Monorepo layout

Three independently-deployable pieces plus glue:

- **`frontend/`** — Next.js 15 App Router marketing/lead-gen site for Luxora Reinigungsservice (Berlin cleaning service). SSG, multilingual. See `frontend/CLAUDE.md`.
- **`bot/`** — Python 3.12 + aiogram 3 Telegram bot. An `aiohttp` HTTP server that receives lead notifications and forwards them to the manager's Telegram chat.
- **`supabase/`** — `migrations/` (SQL schema for the `leads` table) and `functions/` (Deno/TypeScript Edge Functions). `config.toml` drives the local Supabase CLI stack.
- **Root deploy glue** — `Dockerfile`, `entrypoint.sh`, `nginx.conf.template`, `heroku.yml`, `docker-compose.yml`.

> The root `README.md` is partly stale (it predates the current schema and deploy setup). When README and code disagree, **the code and migrations are source of truth.** Notably: the `leads` table now uses `services text[]` + `photos text[]` + `message` (not the single `service`/`description`/`photo_path` the README lists), and deployment is a single combined Docker image on Heroku (not separate Vercel + Fly.io).

## The lead pipeline (the core of the whole system)

This is the one flow the entire repo exists to serve. Trace it end-to-end before changing any piece:

1. **Form** (`frontend/src/components/request-form.tsx`) POSTs JSON to the `submit-lead` Edge Function. Payload: `name`, `phone`, `city`, `address`, `message`, `services` (array of ids), `photos` (array of base64 JPEGs, max 5), `turnstileToken`, and honeypot `_trap`.
2. **`submit-lead` Edge Function** (`supabase/functions/submit-lead/index.ts`):
   - Drops silently if honeypot `_trap` is set (returns `{ok:true}`).
   - Verifies the Cloudflare Turnstile token server-side (`TURNSTILE_SECRET_KEY`).
   - Base64-decodes each photo → uploads to Supabase Storage bucket **`lead-photos`** → collects public URLs.
   - `INSERT`s the row into `leads` using the **service_role** client (bypasses RLS).
   - **Then notifies the bot directly** via `fetch(BOT_WEBHOOK_URL)` with `Authorization: Bearer $BOT_WEBHOOK_SECRET`, sending a Supabase-Database-Webhook-shaped body (`{type:"INSERT", table:"leads", record: lead}`). This call is fire-and-forget.
3. **Bot** (`bot/webhook.py::handle_supabase_webhook`, mounted at `POST /webhook/supabase`): verifies the bearer secret (`hmac.compare_digest`), checks `type==INSERT && table==leads`, formats the lead, and sends it to `MANAGER_CHAT_ID` — plain message, single photo, or media group depending on `photos` count.

**Critical invariant: the DB is the source of truth; Telegram is just delivery.** The Edge Function inserts into Postgres *before* notifying the bot, and the bot returns **5xx on Telegram failure so the caller retries** — a lead is never lost because Telegram was down.

### Why the DB trigger is a no-op (don't "fix" it)

Migration `00002` originally sent the bot notification from a Postgres `AFTER INSERT` trigger via `pg_net`. That extension isn't enabled on this project, so migration `00003` deliberately turns `notify_bot_new_lead()` into a no-op, and the Edge Function took over the notification job (see step 2 above). If you re-enable `pg_net` later, restore the trigger body from `00002` **and** remove the direct `fetch` from the Edge Function, or every lead double-fires.

## Data model

`leads` table (`supabase/migrations/00001` + `00004`): `id`, `created_at`/`updated_at` (auto trigger), `name`/`phone`/`city` (required, with CHECK constraints), `address`, `message`, `services text[]`, `photos text[]`, `status` (default `'new'`), `tg_chat_id`/`tg_message_id`, `ip_hash`. **RLS is on from day one** — restrictive `deny_anon` / `deny_authenticated` policies mean only the service_role key (Edge Functions + bot) can touch the table.

Service ids used across the stack: `apartment`, `upholstery`, `windows`, `driveway`, `car`, `other`. Human labels for Telegram live in `SERVICE_LABELS` in `bot/webhook.py`; the frontend has its own copy in the message JSON — keep them in sync when adding a service.

## Deployment: single combined container

`heroku.yml` builds `Dockerfile` and runs one container serving **all three** processes behind Nginx:

- **Build** (stage 1): `npm ci` + `npm run build` in `frontend/`, producing Next.js **`standalone`** output (frontend must keep `output: "standalone"` in its Next config or the image breaks). `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is baked in at build time as a Docker `ARG` (value in `heroku.yml`).
- **Runtime** (stage 2, `python:3.12-slim` + Node 22 + Nginx): `entrypoint.sh` runs `envsubst` to inject Heroku's `$PORT` into `nginx.conf.template`, then starts **Next.js standalone on :3000**, the **bot on :5000**, and **Nginx in the foreground as PID 1**.
- **Nginx routing** (`nginx.conf.template`): `/webhook` + `/health` → bot (:5000); `/_next/static/` and `/images/` served from disk with long cache; everything else → Next.js (:3000).

`docker-compose.yml` is a **separate, bot-only** setup (bot on :8080, reads `bot/.env`) for running just the bot locally — it does not build the frontend or Nginx.

> Bot port is context-dependent: `config.py` defaults to `5000`, the combined `entrypoint.sh` forces `5000`, but `docker-compose.yml` / `.env.example` use `8080`. The bot reads `PORT` from env, so match it to the deployment.

## Commands

Frontend (`cd frontend`): see `frontend/CLAUDE.md` — `npm run dev` / `build` / `type-check` / `lint`.

Bot (`cd bot`):
```bash
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env        # fill all vars, then:
python main.py              # starts aiohttp server on $PORT (default 5000)
```

Supabase (needs the Supabase CLI + `cd`-ing so `config.toml` is found):
```bash
supabase start                        # local stack (Postgres :54322, Studio :54323, API :54321)
supabase db push                      # apply migrations to the linked remote project
supabase functions deploy submit-lead # deploy an Edge Function
```

Combined image (from repo root):
```bash
docker compose up --build   # bot only
# full stack is built/run by Heroku from heroku.yml; there is no compose target for it
```

No automated test suite exists in any package.

## Secrets & environment

Secrets live outside the repo. Three distinct env surfaces:

- **Bot** (`bot/.env`, loaded by pydantic `Settings` in `config.py`): `TELEGRAM_BOT_TOKEN`, `MANAGER_CHAT_ID`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `WEBHOOK_SECRET`, `BASE_URL` (public app URL — used to register the Telegram webhook), `PORT`.
- **Edge Function** (Supabase project secrets): `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `TURNSTILE_SECRET_KEY`, `BOT_WEBHOOK_URL`, `BOT_WEBHOOK_SECRET`.
- **Frontend build**: `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (Docker build ARG), plus `NEXT_PUBLIC_SUPABASE_*` for local dev.

The bot's `WEBHOOK_SECRET` and the Edge Function's `BOT_WEBHOOK_SECRET` **must be the same value** — that shared bearer token is what authenticates the notification call. Use the **service_role** key (never the anon key) for the bot and Edge Functions; the anon key has zero access to `leads` under RLS.
