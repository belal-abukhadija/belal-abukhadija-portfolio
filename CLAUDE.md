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

### Styling system (Tailwind v4 + neo-brutalism)

Tailwind v4 is configured via `@import "tailwindcss"` + an `@theme` block in `app/globals.css` — that is where custom colors (`--color-cream`, `--color-hot-red`, `--color-vivid-yellow`, `--color-slate-blue`) and brutal shadow tokens live. The legacy `tailwind.config.ts` uses v3-style `theme.extend` syntax and is mostly inert under v4; prefer editing `globals.css` for theme tokens.

The visual language is neo-brutalist: `border-4 border-black`, cream background, and hardcoded offset shadows like `shadow-[8px_8px_0px_0px_#000]` / `shadow-[12px_12px_0px_0px_#000]`. Match this pattern when adding components.

Font is Space Grotesk loaded via `next/font/google` in `app/layout.tsx`, exposed as `--font-space-grotesk` and consumed via `font-sans`.

### 3D / interactive components

Client-only visual components are marked `"use client"` and rely on heavy libs:

- `HeroScene.tsx`, `RubiksCube.tsx` — `three` + `@react-three/fiber` / `@react-three/drei` / `@react-three/postprocessing`
- `Globe.tsx` — `cobe` (WebGL globe)
- Scroll/entry animations — `framer-motion` (`useInView` pattern used in `ToolCard`, `Tools`)

When adding new 3D or interactive work, keep it inside `"use client"` components so the rest of the page stays server-rendered for SEO.

### Path alias

`@/*` maps to the repo root (see `tsconfig.json`). Imports use e.g. `@/components/Hero`, `@/lib/tools-data`.
