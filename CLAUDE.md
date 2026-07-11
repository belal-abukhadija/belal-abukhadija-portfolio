# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Next.js dev server at http://localhost:3000
- `npm run build` — production build (also the primary typecheck; there is no separate `tsc` script)
- `npm start` — serve the production build
- `npm run lint` — `next lint`

There is no test suite in this repo.

## Architecture

Single-page Next.js 16 App Router portfolio. `app/page.tsx` composes a fixed sequence of section components (`Hero`, `Coverage`, `Marquee`, `Tools`, `Showcase`, `Process`, `About`, `Contact`) inside `<main>`, wrapped by `Header` / `Footer`. Routing is a single `/` — everything is sections on one page.

### Data flows from one source

`lib/tools-data.ts` exports `tools[]` and `personalInfo`. These two objects are the single source of truth that fans out to:

- `components/Tools.tsx` + `ToolCard.tsx` — renders the grid
- `app/sitemap.ts` — sitemap entries
- `app/layout.tsx` — metadata (`metadataBase`, title, OG, canonical all derived from `personalInfo.domain`)
- `lib/structured-data.ts` — JSON-LD for Person, WebSite, ProfilePage, BreadcrumbList, and one `SoftwareApplication` per tool, injected into `<head>` via `dangerouslySetInnerHTML` in `app/layout.tsx`

Changing `personalInfo.domain`, adding/removing a tool, or editing a tool description automatically updates metadata, sitemap, and structured data — do not duplicate these values elsewhere.

`ToolCard.tsx` resolves `tool.icon` by string-indexing `lucide-react`'s exports (`(Icons as Record<…>)[tool.icon] || Icons.Box`). Icon names in `tools-data.ts` must match lucide-react export names exactly.

### Styling system (Tailwind v4 + editorial-dark)

Tailwind v4 is configured via `@import "tailwindcss"` + an `@theme` block in `app/globals.css` — the single source of truth for theme tokens. The legacy `tailwind.config.ts` uses v3-style `theme.extend` syntax and is mostly inert under v4; edit `globals.css` for theme tokens.

The visual language is editorial-dark: a warm near-black canvas with a single amber accent. Color tokens: `--color-bg`, `--color-panel`(`-2`), `--color-line`(`-strong`), `--color-ink`(`-soft`/`-faint`), `--color-amber`(`-bright`/`-deep`). Build UI from the component classes defined in `globals.css` — `.card` (+`.card-hover`), `.btn-primary` / `.btn-ghost` (rounded 14px, not pills), `.eyebrow`, `.chip`, `.icon-tile`, `.accent-word` (serif-italic amber highlight), `.grain` — rather than ad-hoc utilities. Match this system when adding components.

Fonts (all `next/font/google` in `app/layout.tsx`): Inter (`font-sans`, body) · Space Grotesk (`font-display`, headings) · Instrument Serif (`font-serif`, italic amber accent words) · Space Mono (`font-mono`, eyebrows/labels/numbers).

### Interactive / animated components

Client-only visual components are marked `"use client"`:

- `Hero.tsx` — full-bleed background `<video>` (`public/hero.mp4`). The video is rendered **client-only** (behind a `mounted` flag) so a browser extension mutating the `<video>` can't cause a hydration mismatch, and the hero's entrance uses **CSS** (`.rise` classes in `globals.css`), NOT framer-motion — above-the-fold content must never depend on JS to become visible.
- `Globe.tsx` — `cobe` (WebGL globe), restyled dark/amber.
- Scroll/entry animations elsewhere — `framer-motion` `useInView` (fade + rise), e.g. `ToolCard` and the section components.

three.js / `@react-three/*` and the old Rubik's-cube / hero-scene components were removed. Keep new interactive work inside `"use client"` components so the rest of the page stays server-rendered for SEO.

### Path alias

`@/*` maps to the repo root (see `tsconfig.json`). Imports use e.g. `@/components/Hero`, `@/lib/tools-data`.
