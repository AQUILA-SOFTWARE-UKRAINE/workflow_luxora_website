# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

This is a **dry-cleaning lead-gen marketing site** (Luxora brand). It is not a store — no payments, no cart, no accounts. The single conversion goal is a form submission that routes a lead to a manager via Telegram. Design source: the "Clean Company / Luxora" Figma file.

The full development plan is in `glob_PLAN.md`. Read it before starting any phase of work.

## Architecture

Supabase is the managed backend layer — no custom server infrastructure for the intake path. Edge Functions handle form ingestion; Database Webhooks decouple storage from Telegram delivery.

```
Customer browser
  → Static frontend (SSG pages + request form)
  → Supabase Edge Function (validation, Turnstile, EXIF strip, intake)
  → Supabase PostgreSQL (durable lead record — source of truth, RLS on)
  → Supabase Storage (photo, private bucket)
  → Supabase Database Webhook (INSERT trigger)
  → aiogram bot → Telegram (manager workspace, status buttons)
  → (status update) → Supabase Edge Function → PostgreSQL
```

Lead lifecycle: `new → contacted → assessed → in progress → completed` (plus `declined`). Transitions are bot button taps that call a status-update Edge Function.

**Critical invariant:** Edge Function writes to PostgreSQL first; the Database Webhook fires after the INSERT succeeds. DB is truth; Telegram is a channel. Never lose a lead because Telegram was unavailable.

**RLS must be on from day one** on the leads table. Only the service-role key (used by Edge Functions and the bot) can read or write leads. The public anon key must never have access.

## Planned stack

| Layer | Decision |
|-------|----------|
| Frontend | Next.js / Nuxt (SSG/ISR) or Astro |
| Backend | Supabase Edge Functions (Deno/TypeScript) — intake, status updates |
| Bot | Python + aiogram — triggered via Supabase Database Webhook |
| Database | Supabase Managed PostgreSQL (RLS enforced) |
| Media | Supabase Storage (private bucket, S3-compatible) |
| Anti-spam | Cloudflare Turnstile + honeypot + rate limiting in Edge Function |
| Packaging | Docker only for the aiogram bot; everything else is managed/serverless |
| Hosting | Static host (Vercel/Netlify/Cloudflare Pages) + Supabase project + bot on Fly.io/Railway |

## Frontend dev commands

```bash
cd frontend
npm install          # first time — installs next, react, tailwindcss, @tailwindcss/postcss
npm run dev          # http://localhost:3000  (turbopack)
npm run build        # production build
npm run type-check   # tsc --noEmit
npm run lint         # eslint
```

Design source: Figma file `6YGRUjIrwbXUk1X9RPgAKv` (node `183:4824` = full landing page).

## Frontend structure (Phase 1)

```
frontend/src/
├── app/
│   ├── layout.tsx            # root — Inter font, Nav, Footer, JSON-LD
│   ├── page.tsx              # Home: Hero, WhyLuxora, ServicesPreview, HowItWorks, Reviews, CTA
│   ├── services/page.tsx     # all 6 service cards with prices
│   ├── how-it-works/page.tsx # 5-step process + FAQ accordion
│   ├── about/page.tsx        # brand story, values, team placeholder
│   └── contact/page.tsx      # contact info + RequestForm
└── components/
    ├── nav.tsx               # sticky top nav, mobile hamburger (client)
    ├── footer.tsx            # dark-navy 4-col footer (server)
    └── request-form.tsx      # full form UI, no backend yet (client) — Phase 2 TODO
```

**Design tokens (Tailwind v4 `@theme`):**
| Token | Value | Used for |
|-------|-------|----------|
| `--color-navy` | `#032445` | headings, dark text |
| `--color-blue` | `#0666c6` | buttons, labels, accents |
| `--color-sky` | `#ebf5ff` | light section backgrounds |
| `--color-footer` | `#0c1e33` | footer bg |
| `--color-body` | `#4b6070` | paragraph text |
| `--color-border` | `#e2eaf0` | card borders, dividers |
| `--color-star` | `#f59e0b` | review stars |

## Development phases

| Phase | Focus | Exit condition |
|-------|-------|----------------|
| 0 | Supabase project + schema + Storage + Webhook config, Edge Function scaffold, bot skeleton on Fly.io/Railway, frontend scaffold | Dummy POST → Edge Function → DB row → Webhook → bot echo in Telegram |
| 1 | Static marketing pages (home, services, how-it-works, about, contact) + SEO | Site is indexable |
| 2 | Form UI + Supabase Edge Function intake (validation, Turnstile, EXIF, Storage upload, DB INSERT) | Submission is stored durably |
| 3 | Database Webhook → bot lead delivery, lifecycle buttons, status-update Edge Function | Every lead reliably reaches manager |
| 4 | Hardening: privacy policy, TLS, Supabase PITR verification, Vault for secrets, Sentry, Storage retention lifecycle, spam test | Production-ready |
| 5 | (Optional) read-only web dashboard, analytics, lightweight CMS |  |

## Open decisions (confirm before implementing)

1. Bot hosting: Fly.io vs. Railway vs. small VPS (the only custom-deployed service)
2. Photo retention period — Supabase Storage lifecycle rule (e.g., delete after 90 days once lead is closed)
3. Telegram target: shared manager group vs. single manager + assignment workflow
4. Languages: UA / RU / EN (affects routing and content structure)
5. Exact screen inventory from the Figma file

> **Resolved:** backend runtime (Supabase Edge Functions / Deno), datastore (Supabase PostgreSQL), media storage (Supabase Storage), notification mechanism (Database Webhook), hosting topology.

## Key domain constraints

- **Prices are minimum ranges only** — every job needs in-person assessment; never display fixed prices as final.
- **Form fields:** name, phone, city + address, service type, photo, optional description.
- **Photo handling:** enforce type/size limits, re-encode, strip EXIF before storing or forwarding.
- **SEO is a first-class requirement** — this is a local service business; all marketing pages must be server-rendered or statically generated and fully indexable with correct metadata.
- **No silent form failures** — if submission fails, the user must know and be able to retry. Losing a lead is a business failure.
