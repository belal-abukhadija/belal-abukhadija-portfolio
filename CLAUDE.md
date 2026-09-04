# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev`, start Next.js dev server at http://localhost:3000
- `npm run build`, production build (also the primary typecheck; there is no separate `tsc` script)
- `npm start`, serve the production build
- `npm run lint`, `next lint`

There is no test suite in this repo.

## Architecture

Single-page Next.js 16 App Router portfolio, plus a small file-based MDX blog. `app/page.tsx` composes a fixed sequence of section components (`Hero`, `WorkedWith`, `Projects`, `ArticlesPreview`, `Capabilities`, `About`, `Contact`) inside `<main>`, wrapped by `Header`/`Footer`, with `AvailableBadge` as a fixed overlay. Section ids (`hero`, `work`, `articles`, `skills`, `about`, `contact`) are shared contract between `Header` nav and `Footer` nav, keep them in sync if you rename or reorder sections. `/articles` and `/articles/[slug]` are real routes for the blog.

### Data flows from one source

`lib/projects-data.ts` exports `projects[]`, `personalInfo`, `experience[]`, `workedWith[]`, and `toolkit[]`. These are the single source of truth that fan out to:

- `components/Projects.tsx` (+ `ProjectCard.tsx`), curated screenshot cards for `projects` with `featured: true`, plus a flat grid for the rest
- `components/WorkedWith.tsx`, the light-band logo rail, from `workedWith[]`
- `components/About.tsx`, work history from `experience[]`, stack grid from `toolkit[]`
- `app/sitemap.ts`: sitemap entries for the site's own routes only (`/`, `/articles`, every article slug). The external `*.belal.work` project URLs were deliberately removed; they are different hosts and belong in their own sitemaps.
- `app/layout.tsx`, metadata (`metadataBase`, title, OG, canonical all derived from `personalInfo.domain`)
- `lib/structured-data.ts`, JSON-LD for Person, WebSite, ProfilePage, BreadcrumbList, and one `SoftwareApplication` per project, injected into `<head>` via `dangerouslySetInnerHTML` in `app/layout.tsx`

Changing `personalInfo.domain`, adding/removing a project, or editing a project description automatically updates metadata, sitemap, and structured data, do not duplicate these values elsewhere.

The site's framing is problem-first: these are projects that solved a real problem hit at work, not a tool catalogue. Every `Project` carries a `problem` (one sentence on the friction that made it exist) rendered above the `description` ("What I built") on both card types, keep that voice when adding entries. The exception is `kind: "side"` (e.g. Chess Puzzles), which omits `problem` and renders a "Built for fun" block instead. A `Project` with `featured: true` also needs `screenshot`, `year`, and `facts` set, it's rendered by `Projects.tsx` instead of the plain grid.

### Content conventions

No em dashes (`—`) anywhere in user-facing content: components, `lib/projects-data.ts`, and `content/articles/*.mdx`. Use a comma, colon, period, or parentheses instead. This is a standing preference, not a one-off cleanup, so write new copy that way rather than adding dashes to be stripped later.

There is also no section or item numbering anywhere (`01`, `001`, `01/ WORK` in nav). It was removed on purpose; don't reintroduce it. Same for a decorative period after a display headline (the hero name is `ABUKHADIJA`, not `ABUKHADIJA.`).

The grid `ProjectCard` stays compact: category, name, description, URL. The `problem` text renders only on the large featured cards in `Projects.tsx`, because putting it on the small cards made them tall and square.

### Blog (MDX, file-based)

Articles are `.mdx` files with frontmatter (`title`, `date`, `excerpt`, optional `part`) in `content/articles/`. `lib/articles.ts` reads them at build/request time via `gray-matter` + `fs` (no database, no CMS), drop a new `.mdx` file in that folder and it's automatically picked up by the homepage preview, `/articles`, `/articles/[slug]`, and the sitemap. Rendering uses `next-mdx-remote/rsc`'s `<MDXRemote>` as a Server Component; article body typography lives in the `.article-body` utility in `globals.css`.

### Styling system (Tailwind v4 + carbon/mint)

Tailwind v4 is configured via `@import "tailwindcss"` + an `@theme` block in `app/globals.css`, the single source of truth for theme tokens. The legacy `tailwind.config.ts` uses v3-style `theme.extend` syntax and is mostly inert under v4; edit `globals.css` for theme tokens.

The visual language is a flat, technical, dark system (modeled on mauriciojuba.com): a near-black carbon canvas with a single ice-mint accent, low/no radius, no drop shadows. Color tokens: `--color-bg`, `--color-panel`(`-2`), `--color-line`(`-strong`), `--color-ink`(`-soft`/`-faint`), `--color-mint`(`-bright`/`-deep`), plus `--color-paper`/`--color-paper-ink` for the one light-contrast band (`WorkedWith.tsx`). Build UI from the component classes defined in `globals.css`, `.card` (+`.card-hover`), `.btn-primary`/`.btn-ghost` (10px radius, not pills), `.eyebrow`, `.chip`, `.icon-tile`, `.accent-word` (mint highlight, no italic/serif), `.stroke-text` (outline-stroke giant section words), `.grain`, rather than ad-hoc utilities. `SectionBand.tsx` is the reusable meta-label + repeated-outline-word header used by every major section (mirrors the reference site's "FEATURED WORK FEATURED WORK…" motif; note there is no section numbering, `01`/`001`-style counters were deliberately removed sitewide, don't reintroduce them), reuse it for new sections rather than hand-rolling headings.

Fonts: a single family, Rubik (`next/font/google` in `app/layout.tsx`, variable `--font-rubik`), mapped to `font-sans`/`font-display`/`font-mono` alike. Hierarchy comes from scale, case, and weight, not multiple typefaces.

### Interactive / animated components

Client-only visual components are marked `"use client"`:

- `Hero.tsx`, full-bleed background `<video>` (`public/fif.mp4`), duotone-treated (`.duotone` + `.duotone-tint` in `globals.css`) to read as a technical portrait plate. The video is rendered **client-only** (behind a `mounted` flag) so a browser extension mutating the `<video>` can't cause a hydration mismatch, and the hero's entrance uses **CSS** (`.rise` classes in `globals.css`), NOT framer-motion, above-the-fold content must never depend on JS to become visible.
- `AvailableBadge.tsx`, fixed floating vertical status tab; hidden below `lg`.
- Scroll/entry animations elsewhere, `framer-motion` `useInView` (fade + rise), e.g. `ProjectCard` and the section components.

three.js / `@react-three/*`, the old Rubik's-cube / hero-scene components, and the `cobe` globe were removed. Keep new interactive work inside `"use client"` components so the rest of the page stays server-rendered for SEO.

### Path alias

`@/*` maps to the repo root (see `tsconfig.json`). Imports use e.g. `@/components/Hero`, `@/lib/projects-data`.
