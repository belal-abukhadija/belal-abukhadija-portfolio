# Portfolio Redesign — "Editorial Dark" (Toolmaker's Bench)

Date: 2026-07-11
Status: Approved

## Goal

Replace the washed-out, low-contrast neumorphic design (which reads as templated / "AI slop")
with a distinctive, high-contrast editorial dark design that gives Belal — a full-stack
developer who ships a suite of real browser tools (belal.work) — a memorable visual identity.
Content and links are unchanged; only the look, contrast, typography, and structure quality change.

## Direction (locked with user)

- **Aesthetic:** Editorial dark / modern. Warm near-black canvas, one confident accent.
- **Accent:** Amber / gold.
- **3D:** Drop three.js (Rubik's cube + hero scene). Keep the `cobe` WebGL globe, restyled dark.

## Grounding concept: the toolmaker's bench

Belal's signature output is a collection of focused, precise browser utilities. The design leans
into a "precision instrument / spec-sheet" feel: monospace utility type for labels, numbers, and
the tool index; warm editorial display type for headlines; amber as the single accent.

## Design tokens

**Color (warm dark + amber):**
- `--color-bg: #0B0A08` (warm near-black)
- `--color-panel: #141210` (cards)
- `--color-panel-2: #1B1815` (hover/elevated)
- `--color-line: #2A2621` (hairline borders)
- `--color-ink: #F4EFE6` (warm off-white)
- `--color-ink-soft: #A39B8C`
- `--color-ink-faint: #6E675B`
- `--color-amber: #F5B23D` (primary accent)
- `--color-amber-bright: #FFC65A` (hover / glow)
- `--color-amber-deep: #C8862A`

**Type (4 roles, each with a distinct job):**
- Display headlines: **Space Grotesk** (600/700), tight tracking.
- Emphasis accent words: **Instrument Serif** *italic*, in amber, used sparingly (warmth).
- Utility — eyebrows, labels, numbers, tags, tool index: **Space Mono** (spec-sheet signature).
- Body: **Inter**.

**Signature elements:**
1. Hero portrait framed as a "spec card" with monospace metadata (role, location, `● available`).
2. Tools grid as a numbered "toolmaker's index" (`01`–`11` in mono — real sequence).
3. Ambient warm amber radial glow + subtle film grain over the near-black canvas.

## Motion

Keep `framer-motion` scroll reveals (fade + rise), subtle and consistent. Amber hover states with
a slight card lift. Respect `prefers-reduced-motion`.

## Scope

- Rewrite `app/globals.css` theme (neumorphic → dark editorial tokens + utility classes + grain).
- Update `app/layout.tsx` fonts (add Space Grotesk, Instrument Serif, Space Mono; keep Inter).
- Restyle every in-use component: Header, Hero, Coverage, Marquee, Tools, ToolCard, Showcase,
  Process, About, Contact, Footer, BackToTop, Globe.
- Delete `components/HeroScene.tsx`, `components/RubiksCube.tsx` (already orphaned).
- Remove deps: `three`, `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`,
  `cubing`, `@types/three`.
- **Untouched:** `lib/tools-data.ts`, `lib/structured-data.ts`, `app/sitemap.ts` (content/SEO source of truth).

## Sections (order preserved)

Header → Hero → Coverage (globe) → Marquee → Tools → Skills → Experience → About → Contact → Footer.
`components/Availability.tsx` stays unused (not imported).

## Quality floor

Responsive to mobile, visible keyboard focus, reduced-motion respected, high text contrast.
