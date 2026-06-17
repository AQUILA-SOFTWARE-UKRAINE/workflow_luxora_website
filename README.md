# Luxora — Сайт хімчистки

Маркетинговий сайт для залучення клієнтів (lead-gen) для сервісу хімчистки Luxora. **Не магазин** — жодних платежів, кошика чи акаунтів. Єдина конверсія — заповнена форма, яка надходить менеджеру у Telegram.

Дизайн: Figma `6YGRUjIrwbXUk1X9RPgAKv`, затверджений фрейм `183:4824`.

---

## Структура репозиторію

```
├── frontend/          # Next.js 15 — статичний лендінг (SSG)
├── supabase/
│   ├── migrations/    # SQL-схема бази (leads, RLS, тригери)
│   └── functions/     # Edge Functions (Deno/TypeScript)
├── bot/               # Python aiogram 3 — Telegram-бот менеджера
├── docker-compose.yml # Запуск тільки бота (все інше — managed)
├── glob_PLAN.md       # Детальний технічний план проєкту
└── CLAUDE.md          # Інструкції для AI-асистента
```

---

## Архітектура

```
Браузер клієнта
  → Статичний фронтенд (Next.js SSG)
  → Supabase Edge Function  (валідація, Turnstile, EXIF, Storage upload)
  → Supabase PostgreSQL     (lead-запис — джерело істини, RLS увімкнено)
  → Supabase Storage        (фото, приватний bucket)
  → Supabase Database Webhook (тригер на INSERT)
  → aiogram бот             → Telegram (менеджер, кнопки статусу)
  → (оновлення статусу)     → Supabase Edge Function → PostgreSQL
```

**Критичний інваріант:** Edge Function спочатку пише у PostgreSQL, і лише після успішного INSERT спрацьовує Webhook. БД — джерело істини. Telegram — канал доставки. Ліда не можна втратити через недоступність Telegram.

---

## Стек

| Шар | Рішення |
|-----|---------|
| Фронтенд | Next.js 15 App Router, TypeScript, Tailwind CSS v4 |
| Шрифти | Inter (body), Plus Jakarta Sans (логотип) |
| Backend | Supabase Edge Functions (Deno/TypeScript) |
| База даних | Supabase Managed PostgreSQL (RLS увімкнено) |
| Файли | Supabase Storage (приватний bucket) |
| Бот | Python 3.11 + aiogram 3 |
| Anti-spam | Cloudflare Turnstile + honeypot + rate limiting |
| Деплой | Vercel/Netlify (фронт) + Supabase + Fly.io/Railway (бот) |

---

## Швидкий старт

### Фронтенд

```bash
cd frontend
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run type-check # перевірка TypeScript
npm run lint       # ESLint
```

Скопіюйте `.env.local.example` → `.env.local` і заповніть:

```env
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
```

### Telegram-бот

```bash
cd bot
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # заповніть усі змінні
python main.py
```

Або через Docker Compose:

```bash
docker compose up --build
```

### Supabase

1. Створіть проєкт на [supabase.com](https://supabase.com)
2. Застосуйте міграцію: `supabase/migrations/00001_create_leads.sql`
3. Увімкніть Database Webhook на таблицю `leads` (подія `INSERT`)
4. URL вебхука: `https://<bot-host>/webhook/supabase`
5. Заголовок авторизації: `Authorization: Bearer <WEBHOOK_SECRET>`

---

## Змінні оточення

### `bot/.env`

| Змінна | Опис |
|--------|------|
| `TELEGRAM_BOT_TOKEN` | Токен від @BotFather |
| `MANAGER_CHAT_ID` | ID чату/групи менеджера |
| `SUPABASE_URL` | URL Supabase-проєкту |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role ключ (не anon!) |
| `WEBHOOK_SECRET` | Shared secret для Database Webhook |
| `PORT` | Порт HTTP-сервера бота (за замовчуванням 8080) |

> Генерація секрету: `python -c "import secrets; print(secrets.token_urlsafe(32))"`

---

## База даних

Таблиця `leads` зберігає кожну заявку:

| Поле | Тип | Опис |
|------|-----|------|
| `id` | uuid | Первинний ключ |
| `name` | text | Ім'я клієнта |
| `phone` | text | Номер телефону |
| `city` | text | Місто |
| `address` | text | Адреса |
| `service` | enum | Тип послуги |
| `description` | text | Опис (необов'язково) |
| `photo_path` | text | Шлях у Supabase Storage |
| `status` | enum | `new → contacted → assessed → in_progress → completed` (або `declined`) |
| `tg_chat_id` | bigint | Telegram chat, куди відправлено повідомлення |
| `tg_message_id` | int | Для редагування/відповіді |
| `turnstile_verified` | bool | Пройшла перевірку Turnstile |
| `ip_hash` | text | Хеш IP для rate-limiting |

**RLS:** увімкнено з першого дня. Service role key (тільки у Edge Functions і боті) обходить RLS. Anon key не має доступу до `leads`.

---

## Фази розробки

| Фаза | Фокус | Критерій завершення |
|------|-------|---------------------|
| **0** | Scaffold: DB-схема, Edge Function stub, бот-скелет | Dummy POST → Edge Function → DB → Webhook → echo в Telegram |
| **1** ✅ | Статичний лендінг (9 секцій), SEO | Сайт індексується |
| **2** | Форма → Edge Function (валідація, Turnstile, EXIF, Storage, INSERT) | Заявка зберігається в БД |
| **3** | Webhook → бот: доставка ліда, кнопки статусу, оновлення | Кожна заявка надходить менеджеру |
| **4** | Hardening: privacy policy, Sentry, тест на спам | Production-ready |
| **5** | (Опційно) веб-дашборд, аналітика, легка CMS | — |

---

## Що потрібно додати перед запуском

- [ ] Реальні фото: 6 карток послуг, 4 у секції "Чому ми", 3 пари "до/після"
- [ ] Номер телефону (замінити `+380 XX XXX XX XX`)
- [ ] Посилання Instagram/Facebook у footer і кнопках
- [ ] Фінальний домен (оновити `CLAUDE.md` і JSON-LD у `layout.tsx`)
- [ ] Текст Політики конфіденційності (`/privacy`)
