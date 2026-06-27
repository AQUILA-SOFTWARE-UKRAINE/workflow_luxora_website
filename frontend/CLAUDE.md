# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # dev server with Turbopack (http://localhost:3000)
npm run build        # production build
npm run type-check   # tsc --noEmit (run this before any commit)
npm run lint         # ESLint
```

No test suite exists yet. Verify changes visually at 375px, 744px, 1024px, and 1440px viewport widths.

## Project context

Marketing / lead-gen site for a Berlin cleaning service. **Not a store** — the only conversion is a form submission that will eventually be wired to a Supabase Edge Function → PostgreSQL → Telegram bot pipeline. Phase 1 (static site) is complete. Phase 2 (form submission backend) has not started yet.

The form (`src/components/request-form.tsx`) submits JSON to the `submit-lead` Supabase Edge Function at `wkvqirxbzryysbeczzmd.supabase.co` (already in `remotePatterns`). **Phase 2 gap:** the form UI collects up to 5 photos but they are not yet sent — the Edge Function accepts JSON only. Photo upload (multipart, EXIF strip, Supabase Storage) is Phase 2 work.

## Architecture

### Routing

Next.js 15 App Router. `src/app/layout.tsx` wraps every page with `<Nav>` and `<Footer>`. Pages: `/` (home), `/contact` (form), `/about`, `/services`, `/how-it-works` (the last three are stubs).

The home page (`src/app/page.tsx`) simply stacks eight section components in order.

### Data

All static copy lives in `src/data/home.ts` — service card details, FAQ entries, review text, photo paths, etc. Edit content there; components read it via named exports.

### Styling system

**CSS Modules are the standard** — every component has a co-located `ComponentName.module.css`. Tailwind utility classes still appear in `src/app/contact/page.tsx` (not yet migrated) but nowhere else.

Shared design-system utilities (containers, section padding, button variants, typography scale, card base) live in `src/styles/shared.module.css`. Import with `import shared from "@/styles/shared.module.css"` when a component needs those primitives.

Brand tokens (colors, fonts) are defined in `src/app/globals.css` under `@theme` and referenced as CSS custom properties (`var(--color-navy)`, `var(--color-blue)`, etc.) rather than hardcoded hex values.

Two global utility classes — `.bubble` and `.bubble-container` — are defined in `globals.css` and used directly (not via CSS Modules) by `nav.tsx`, `RewardsSection.tsx`, and `FinalCtaSection.tsx` for the floating-bubble animations.

### Breakpoint system

All media queries follow a strict mobile-first delta pattern — only override what changes at each step:

| Name     | Query                      |
|----------|----------------------------|
| Mobile   | default `< 744px`          |
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

Inter (body text) and Plus Jakarta Sans (logo only — weight 700/800) are loaded via `next/font/google` in `layout.tsx` and injected as CSS variables `--font-inter` and `--font-plus-jakarta-sans`.
