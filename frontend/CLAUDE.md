# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # dev server with Turbopack (http://localhost:3000)
npm run build        # production build (output: "standalone")
npm run type-check   # tsc --noEmit (run this before any commit)
npm run lint         # ESLint (next/core-web-vitals + next/typescript)
```

No test suite exists yet. Verify changes visually at 375px, 744px, 1024px, and 1440px viewport widths.

## Project context

Marketing / lead-gen site for a Berlin cleaning service (Luxora Reinigungsservice). **Not a store** — the only conversion is a form submission that will eventually be wired to a Supabase Edge Function → PostgreSQL → Telegram bot pipeline. Phase 1 (static site) is complete. Phase 2 (form submission backend) has not started yet.

The form (`src/components/request-form.tsx`) submits JSON to the `submit-lead` Supabase Edge Function at `wkvqirxbzryysbeczzmd.supabase.co` (already in `remotePatterns`). **Phase 2 gap:** the form UI collects up to 5 photos but they are not yet sent — the Edge Function accepts JSON only. Photo upload (multipart, EXIF strip, Supabase Storage) is Phase 2 work.

## Architecture

### Internationalization (next-intl) — read this first

i18n is the backbone of the routing and content model; almost everything else hangs off it.

- **Three locales:** `de` (default), `en`, `ru`, configured in `src/i18n/routing.ts`. `localePrefix: "as-needed"` (German has no URL prefix — `/contact`; others are prefixed — `/en/contact`, `/ru/contact`). `localeDetection: false` (no automatic redirect based on `Accept-Language`).
- **All user-facing copy lives in `messages/{de,en,ru}.json`**, keyed by namespace (`meta`, `nav`, `footer`, `hero`, `whyUs`, `services`, `beforeAfter`, `rewards`, `reviews`, `faq`, `finalCta`, `contact`, `form`, `legal`). When adding or changing text, edit **all three** JSON files in lockstep — there is no fallback locale at runtime.
- **`src/data/home.ts` holds only non-textual assets** — image paths, prices, bubble-animation configs, review metadata. It contains no prose. Don't put copy here; copy goes in the message files.
- **Reading translations:** Server Components use `getTranslations(namespace)` / `getTranslations({ locale, namespace })` (the latter for `generateMetadata`); Client Components use `useTranslations(namespace)` from `next-intl`. Most section components are translation consumers.
- **Navigation must be locale-aware:** import `Link`, `redirect`, `usePathname`, `useRouter` from `@/i18n/navigation` (wrappers from `createNavigation`), **not** from `next/link` or `next/navigation` — otherwise the locale prefix is lost.
- `src/i18n/request.ts` loads the per-request message bundle; `src/middleware.ts` runs `next-intl` middleware (matcher excludes `api`, `_next`, `_vercel`, and files with extensions).

### Routing & layout (two-tier)

Next.js 15 App Router with a `[locale]` dynamic segment under `src/app/`.

- **`src/app/layout.tsx` (root):** renders `<html lang>` / `<body>`, loads fonts, injects the `HomeAndConstructionBusiness` JSON-LD. Sets `lang` from `getLocale()`. No `<Nav>`/`<Footer>` here.
- **`src/app/[locale]/layout.tsx`:** wraps children in `NextIntlClientProvider` and renders `<Nav>` + `<Footer>`. Owns `generateStaticParams` (one page per locale → static export) and `generateMetadata` (title/description/OpenGraph from the `meta` namespace).
- **Pages** (all under `[locale]/`): `/` (home), `/contact` (form), `/about`, `/services`, `/how-it-works`, plus German legal pages `/impressum`, `/datenschutz`, `/agb`.

The home page (`src/app/[locale]/page.tsx`) simply stacks eight section components in order.

### Styling system

**CSS Modules are the standard** — every section/component has a co-located `ComponentName.module.css`. Tailwind utility classes (inline `className`) survive only in the pages that haven't been migrated: `[locale]/contact/page.tsx` and the three legal pages (`impressum`, `datenschutz`, `agb`). Everything else uses CSS Modules. `request-form.tsx` has its own `request-form.module.css`.

Shared design-system utilities (containers, section padding, button variants, typography scale, card base) live in `src/styles/shared.module.css`. Import with `import shared from "@/styles/shared.module.css"` when a component needs those primitives.

Brand tokens (colors, fonts) are defined in `src/app/globals.css` under `@theme` and referenced as CSS custom properties (`var(--color-navy)`, `var(--color-blue)`, etc.) rather than hardcoded hex values.

Two global utility classes — `.bubble` and `.bubble-container` — are defined in `globals.css` and used directly (not via CSS Modules) for the floating-bubble animations (see `BubblesLayer.tsx`, `nav.tsx`, `RewardsSection.tsx`, `FinalCtaSection.tsx`).

### Breakpoint system

All media queries follow a strict mobile-first delta pattern — only override what changes at each step:

| Name     | Query                        |
|----------|------------------------------|
| Mobile   | default `< 744px`            |
| Tablet S | `@media (min-width: 744px)`  |
| Tablet L | `@media (min-width: 1024px)` |
| Desktop  | `@media (min-width: 1280px)` |

Never repeat a value already set by a lower breakpoint — write only the delta.

### Nav breakpoint behaviour

- `< 744px`: Logo + flag/DE + hamburger
- `744px–1023px`: Logo + location badge + language + hamburger
- `1024px–1279px`: Logo + location badge + language + "Contact Us" text link + hamburger (`.tabletContactLink`)
- `1280px+`: Logo + location badge + language + full desktop nav (Menu dropdown + Contact Us); hamburger hidden

The mobile drawer (`drawerWrapper`) is hidden at `1280px+`. The `FooterBottomPad` component adds bottom spacing on mobile to prevent content from being hidden behind the fixed bottom CTA bar.

### HeroSection dual-tree pattern

`HeroSection.tsx` renders two independent JSX trees — `.mobile` (image stacked above content) and `.desktop` (full-bleed image with text overlay). CSS toggles which is visible: `.mobile` hides at `744px+`, `.desktop` shows at `744px+`. Do not merge them into a single responsive tree.

### Fonts

Inter (body text) and Plus Jakarta Sans (logo only — weight 700/800) are loaded via `next/font/google` in the **root** `layout.tsx` and injected as CSS variables `--font-inter` and `--font-plus-jakarta-sans`.
