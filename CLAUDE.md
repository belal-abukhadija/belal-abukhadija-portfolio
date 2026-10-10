# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev`, start Next.js dev server at http://localhost:3000
- `npm run build`, production build (also the primary typecheck; there is no separate `tsc` script)
- `npm start`, serve the production build
- `npm run lint`, `next lint`

There is no test suite in this repo.

## Architecture

Single-page Next.js 16 App Router portfolio, plus a small file-based MDX blog. `app/page.tsx` composes a fixed sequence of section components (`Hero`, `About`, `Work`, `Writing`, `Contact`) inside `<main>`, wrapped by `Header`/`Footer`. Section ids (`hero`, `work`, `articles`, `about`, `contact`) are a shared contract: `navItems` is exported from `Header.tsx` and reused by `Footer.tsx`, so rename or reorder sections there. `/articles` and `/articles/[slug]` are real routes for the blog.

### Data flows from one source

`lib/projects-data.ts` exports `projects[]`, `personalInfo`, `experience[]`, `workedWith[]`, and `toolkit[]`. These are the single source of truth that fan out to:

- `components/Hero.tsx`, the name, `headline`, `title`, `location`, `heroLine`, and the current job (`experience[0]`)
- `components/Work.tsx`, large spreads with a printed screenshot for `projects` with `featured: true`, plus a compact row list for the rest
- `components/About.tsx`, work history from `experience[]`, daily tools from `toolkit[]`
- `app/sitemap.ts`: sitemap entries for the site's own routes only (`/`, `/articles`, every article slug). The external `*.belal.work` project URLs were deliberately removed; they are different hosts and belong in their own sitemaps.
- `app/layout.tsx`, metadata (`metadataBase`, title, OG, canonical all derived from `personalInfo.domain`)
- `lib/structured-data.ts`, JSON-LD for Person, WebSite, ProfilePage, BreadcrumbList, and one `SoftwareApplication` per project, injected into `<head>` via `dangerouslySetInnerHTML` in `app/layout.tsx`

Changing `personalInfo.domain`, adding/removing a project, or editing a project description automatically updates metadata, sitemap, and structured data, do not duplicate these values elsewhere.

The site's framing is problem-first: these are projects that solved a real problem hit at work, not a tool catalogue. Every `Project` carries a `chore` (the task it deleted, as an array of short phrases) and a `problem` (one sentence on the friction that made it exist). The `chore` is the headline of each entry and is rendered struck through; each phrase is its own non-wrapping `<Strike>`, so keep phrases under about 15 characters or they overflow on phones. The exception is `kind: "side"` (e.g. Chess Puzzles), which omits `chore` and `problem` and renders "Nothing was broken." with a "Built for fun" label instead. A `Project` with `featured: true` also needs `screenshot`, `year`, and `facts` set.

### Content conventions

No em dashes (`—`) anywhere in user-facing content: components, `lib/projects-data.ts`, and `content/articles/*.mdx`. Use a comma, colon, period, or parentheses instead. This is a standing preference, not a one-off cleanup, so write new copy that way rather than adding dashes to be stripped later.

There is also no section or item numbering anywhere (`01`, `001`, `01/ WORK` in nav). It was removed on purpose; don't reintroduce it. Same for a decorative period after a display headline (`Things I no longer do`, not `Things I no longer do.`). The struck chore phrases are sentences and do end in periods.

The compact rows in `Work.tsx` stay compact: chore, name, category, description, URL. The `problem` text renders only on the large featured spreads.

### Blog (MDX, file-based)

Articles are `.mdx` files with frontmatter (`title`, `date`, `excerpt`, optional `part`) in `content/articles/`. `lib/articles.ts` reads them at build/request time via `gray-matter` + `fs` (no database, no CMS), drop a new `.mdx` file in that folder and it's automatically picked up by the homepage preview, `/articles`, `/articles/[slug]`, and the sitemap. Rendering uses `next-mdx-remote/rsc`'s `<MDXRemote>` as a Server Component; article body typography lives in the `.article-body` utility in `globals.css`.

### Styling system (Tailwind v4, two-ink print)

The paper grain (`body::after`) must not use `mix-blend-mode`: a full-screen blended layer forces the page under it to be re-composited on every scrolled frame.

Tailwind v4 is configured via `@import "tailwindcss"` + an `@theme` block in `app/globals.css`, the single source of truth for theme tokens. The legacy `tailwind.config.ts` uses v3-style `theme.extend` syntax and is mostly inert under v4; edit `globals.css` for theme tokens.

The visual language is a two-colour risograph print: ultramarine ink (`--color-ink`) and a fluorescent red pen (`--color-mark`) on cool paper (`--color-paper`). There is no black or grey anywhere; body text is the ink colour, and `--color-ink-soft` is the only secondary text colour. The red is for marks only (strikes, hover underlines, list bullets), never for text, because it fails contrast on paper. The contact section and footer invert to paper on ink via the `.on-ink` class, which also switches button hover and strike blending.

The one motif is the strike, and the page line is what draws it. `components/Strike.tsx` only marks a phrase (`<s data-strike>`); it renders no stroke of its own. `PageLine.tsx` routes the single red line through every `[data-strike]` phrase, so a chore reads as crossed out only after the pen has passed over it. Don't give `Strike` its own stroke again, and don't add a second red line anywhere. Without JS a `<noscript>` rule in `app/layout.tsx` falls back to a plain strikethrough.

Component classes in `globals.css`: `.gutter` (page side padding, used on every section instead of a container), `.display` / `.display-light` (condensed heavy and condensed thin display type), `.size-hero` / `.size-chore` / `.size-title` / `.size-row` (the display scale), `.name` (+ `.name-first`, `.name-last`, the hero name), `.label` (small bold sentence-case label), `.link`, `.btn`, `.print` (+ `.print-reveal`). Don't reintroduce uppercase tracked eyebrow labels, cards, chips, icon tiles, or arrow icons on links.

`.print` pulls an image through the ink: greyscale, screen-blended over the ink colour, then multiplied onto the paper. A `.print-reveal` ancestor link restores full colour on hover. The multiply blend needs the paper directly behind it, so a `.print` must not sit inside an element that creates a stacking context (`sticky`, `transform`, `opacity`), or it renders on white.

Fonts: a single family, Bricolage Grotesque (`next/font/google` in `app/layout.tsx`, variable `--font-bricolage`, loaded with the `opsz` and `wdth` axes). The variable class must stay on `<html>`, not `<body>`: the `@theme` font tokens resolve on `:root`, and on `<body>` they silently fall back to the system font. Display type uses `font-stretch: 75%`.

### Interactive / animated components

This is a personal site first: the hero is Belal's name at poster scale, and About comes before the project list. Don't lead with projects in the hero, and don't use a personal photo anywhere (removed at the owner's request; `public/mee.png` is unused).

Three components are `"use client"`: `PageLine.tsx`, `SmoothScroll.tsx`, and `Contact.tsx`.

- `Hero.tsx` is a server component: the name set in two lines (`.name`), thin first name over heavy surname. The entrance and the strike through "problems" in `heroLine` are pure **CSS**, so above-the-fold content never depends on JS to become visible. `.name` is sized by viewport width but capped by height so the whole hero fits one screen.
- The hero has no pointer effects. Two were tried and removed at the owner's request: the name changing font weight with the pointer, and a red pen trail following the cursor (it competed with the page line). Don't add cursor effects to the hero.
- `SmoothScroll.tsx`, mounted once in `app/layout.tsx`, runs Lenis for eased wheel scrolling on every page and glides to same-page section links (`/#about`), cancelling the click so `next/link` doesn't also jump. Because Lenis owns scroll easing, there must be no `scroll-behavior: smooth` in CSS. Off under `prefers-reduced-motion`; touch scrolling stays native.
- `PageLine.tsx`, one continuous red pen line from the top of the home page to the footer, drawn as the visitor scrolls (the tip sits about 62% down the viewport, sliding to the bottom edge over the last screen). It is an absolutely positioned SVG that must be the first child of the `relative` wrapper around `<main>` and `<Footer>` in `app/page.tsx`, and it rebuilds its route from measured element positions on every resize. The route, in order: a loop beside the first name; under the surname and across "problems" in the hero line; down the gap between the About heading and text; through each project's chore phrases, row by row, starting each row from the nearer end so stacked rows zigzag, then down the gap between that project's text and screenshot; through the chores of the compact rows; down the gap between dates and titles in Writing; an arrow beside the contact field; and finally the signature. On narrow screens the stretches between strikes use the nearer page margin instead of column gaps. The line deliberately runs through content now (owner's request), but approaches should still use empty space where it exists rather than cut diagonally across paragraphs; fix that in `build()`, not by moving content. It is decorative (`aria-hidden`, `pointer-events: none`), shown fully drawn under `prefers-reduced-motion`, and absent without JS.
- The arrow at the contact field. The pen never enters the typing area. It stays to the right of the chore input and draws an arrow pointing at it (shaft, the two barbs of the head, then back along the shaft so the line leaves from the tail), positioned from the measured `#chore` input. The arrow's sharp tip and barbs come from the `corners` set passed to `route()`, which zeroes the curve's tangent at those points. An earlier version had the pen write an example sentence inside the field and rule a line round it; the owner removed it because it obstructed the place visitors type. Do not put pen strokes or overlays in or around the input again. The chore input is an ordinary field sized for typing (a step larger than the others, not display type; it was headline-sized once and the owner found it unusable), with `dir="auto"` for right-to-left text. Its `max-w` always leaves a strip free on the right, which is where the arrow is drawn, so keep that gap if the field is restyled.
- Pacing. Going down the page the pen follows the scroll, but a level stretch of line (a strike, the arrow, the signature) is demanded all at once by a few pixels of scrolling, so there the pen keeps its own steady speed (`PEN_SPEED` in `PageLine.tsx`) instead. While it is behind, `PageLine` lowers `scrollPace.factor` (`lib/scroll-pace.ts`) and `SmoothScroll` scales downward wheel movement by it, so the page waits for the pen. Scrolling up is never held, and a large jump (nav link, scrollbar) skips pacing and catches up fast. Touch scrolling is native and cannot be held, so on phones the pen simply finishes at its own pace. The owner asked for this explicitly: do not go back to the pen racing to match scroll speed.
- The cap. It behaves like a real marker's: it rides posted on the back of the barrel while the pen writes, and when the signature is finished it slides off the back, swings round the side, turns to face the nib, and pushes on (`capped` in `lib/pen3d.ts`). It reverses if the visitor scrolls back up. It is a deeper shade of the pen's red, so it shows on both the paper and the ink-coloured footer; two earlier versions (a blue cap, then a white one that simply faded in beside the nib) were rejected.
- Performance rule for the line: never call `SVGPathElement.getPointAtLength` or `getTotalLength` in `PageLine.tsx`. On a path this long each call costs most of a millisecond, and sampling the route with it froze the page for over two seconds on every rebuild (and it rebuilds several times during load, as fonts and images change the page height). `route()` walks the Beziers itself and returns a measured polyline; `pointAt()` reads positions from that, and the path's `pathLength` attribute is set to the same total so dash offsets agree with it.
- The signature. The line ends by writing "Belal" in joined handwriting inside `[data-pen-signature]`, an empty block `Footer` renders when given the `signature` prop (home page only). The letterforms are the `SIGNATURE` point lists in `PageLine.tsx`, in letter units, one unbroken stroke.
- The 3D pen. `PageLine.tsx` also carries the site's one 3D object: a marker pen (`lib/pen3d.ts`, three.js, built from primitives, no model file) whose nib sits on the end of the line, so it appears to draw it. One `requestAnimationFrame` loop in `PageLine` eases the inked length towards what the scroll asks for and moves the pen to the same point, so the two can never drift apart; don't animate either with a CSS transition. The pen stands upright at rest and only leans while travelling sideways, because it is always on screen and a leaning barrel covers more of the text around it. three.js is loaded with a dynamic `import()` after mount, so it stays out of the initial bundle and the line works without it. The pen layer is clipped to the page (`overflow-hidden`) because its canvas is far wider than the pen.
- `Contact.tsx`, the contact form. The headline field strikes through whatever is typed (an invisible copy of the text sizes the box so the stroke spans exactly what was written), followed by name, email, and optional details. It posts JSON to `/api/contact`.

Motion is deliberately limited: the hero entrance and strike on load, and the page line following the scroll. There are no scroll-triggered entrance animations; don't add fade-and-rise reveals to sections. `prefers-reduced-motion` disables all of it. `framer-motion` and `lucide-react` are still in `package.json` but nothing imports them any more.

### Contact form (Resend)

`components/Contact.tsx` posts JSON to `app/api/contact/route.ts`, which sends two emails through the `resend` SDK:

- the message itself, to `CONTACT_TO_EMAIL`, with the visitor's address as `replyTo`. This is the one that must succeed; if it fails the route returns an error.
- an automatic confirmation to the visitor (`lib/contact-emails.ts`), with `CONTACT_TO_EMAIL` as `replyTo` so their reply reaches the owner. If only this one fails, the route still returns `ok: true` with `confirmation: false`, and the form says so.

It needs three variables in `.env` (gitignored, and they must also be set on the host): `RESEND_API_KEY`, `CONTACT_TO_EMAIL` (the inbox), and `CONTACT_FROM_EMAIL` (any address on a domain verified in Resend; it does not need to be a real mailbox). A bare sender address is given the owner's name as its display name. The API key in use is a send-only key, so delivery status can only be checked in the Resend dashboard, not from code.

Because the form mails whatever address is typed into it, it could be used to send mail to strangers. The safeguards, which should not be loosened casually: a hidden `website` honeypot answered with a fake success; an in-memory limit of 5 messages per 10 minutes per IP (resets on restart, per server instance, so a brake rather than a guarantee); every visitor-typed value HTML-escaped; and the confirmation echoes only the name and the 60-character chore, never the free-text details.

The confirmation email is a table layout with inline styles only, in the site's inks on paper, with the chore struck through. Email clients do not load web fonts or honour most CSS, so do not port site styles into it. `lib/contact-emails.ts` imports nothing, so it can be run directly with Node to preview the HTML.

The form's states are deliberate, because the owner found the original too quiet: while sending, the fields lock, the button shows a spinner and "Sending", and a live line says what is happening; on failure a bordered notice says the message was not sent and why, keeps everything typed, and the button becomes "Try sending again"; on success the form is replaced by a panel that shows the chore (which the page line's pen then crosses out), says the message arrived, whether a confirmation was sent, and when to expect a reply, with a button to send another. Focus moves to the result in both cases.

### Path alias

`@/*` maps to the repo root (see `tsconfig.json`). Imports use e.g. `@/components/Hero`, `@/lib/projects-data`.
