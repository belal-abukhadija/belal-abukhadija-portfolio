/**
 * Projects Data Configuration
 *
 * Every project here started as a problem hit at work: something slow,
 * manual, or missing, that ended as a small product to fix it. The one
 * exception is marked `kind: "side"`: built for the fun of building.
 *
 * To add a project, append an object to the `projects` array.
 *
 * Project fields:
 * - name: display name
 * - chore: the task this project deleted, as short phrases. Each phrase is
 *   struck through on its own and never wraps, so keep them under ~15 characters
 * - problem: the real-world problem that made this exist (one sentence)
 * - description: what the project actually does
 * - url: full URL to the live project
 * - category: grouping label shown on the card
 * - kind: "work" (born from a problem) or "side" (built for fun)
 * - featured: shown as a large card with a live screenshot
 */

export interface Project {
  name: string;
  /** The chore this project deleted, in short non-wrapping phrases. Omitted for side projects. */
  chore?: string[];
  /** The problem that made this exist. Omitted for side projects. */
  problem?: string;
  description: string;
  url: string;
  category?: string;
  kind?: "work" | "side";
  /** Featured on the homepage "Projects" section with a live screenshot */
  featured?: boolean;
  screenshot?: string;
  year?: string;
  facts?: string[];
}

export const projects: Project[] = [
  {
    name: "PDF Signature Tool",
    chore: ["Print it.", "Sign it.", "Scan it.", "Email it."],
    problem:
      "Signing one line of a contract meant printing the whole document, signing it, scanning it back, and emailing a worse copy than the one I started with.",
    description:
      "Add signatures and text annotations to PDF documents directly in the browser, with no upload, no account, and the file never leaves the machine.",
    url: "https://sign.belal.work/",
    category: "Documents",
    kind: "work",
    featured: true,
    screenshot: "/work/pdf-signature-tool.jpg",
    year: "2024",
    facts: ["No account", "100% in-browser", "Free"],
  },
  {
    name: "MarkFlow",
    chore: ["Rebuilding", "Word tables", "by hand."],
    problem:
      "Our docs lived in Markdown but every stakeholder wanted a Word file, and converting by hand broke the tables, math, and diagrams every single time.",
    description:
      "Converts Markdown and MDX into fully formatted Word documents entirely client-side, with full GFM support, math equations, diagrams, custom styles, no server, and no uploads.",
    url: "https://md.belal.work/",
    category: "Developer",
    kind: "work",
    featured: true,
    screenshot: "/work/markdown-editor.jpg",
    year: "2025",
    facts: ["Zero data collection", "Works offline", "Free"],
  },
  {
    name: "WordCount Pro",
    chore: ["Ad-covered", "counter sites."],
    problem:
      "Writing copy against platform character limits meant pasting drafts into whichever ad-covered counter site loaded first, then guessing at keyword density.",
    description:
      "Accurate word and character counter with SEO keyword density analysis, per-platform character limits, and reading time estimates, running entirely in the browser.",
    url: "https://counter.belal.work/",
    category: "Writing",
    kind: "work",
    featured: true,
    screenshot: "/work/wordcount-pro.jpg",
    year: "2024",
    facts: ["SEO keyword density", "Platform limits", "Free"],
  },
  {
    name: "Color Palette Generator",
    chore: ["Three sites", "for one", "palette."],
    problem:
      "Pulling a palette out of a brand image and then proving it passed contrast took three different sites and a lot of copy-paste between them.",
    description:
      "Generate palettes and gradients, extract them straight from an image, check contrast, and explore harmonious combinations for UI and branding, all in one place.",
    url: "https://color.belal.work/",
    category: "Design",
    kind: "work",
    featured: true,
    screenshot: "/work/color-palette-generator.jpg",
    year: "2025",
    facts: ["Image extraction", "Contrast checker", "Free"],
  },
  {
    name: "Exam Prep Quizzes",
    chore: ["Revising from", "scattered PDFs."],
    problem:
      "Government IT jobs here are won on a competitive exam, and the people sitting it were revising from scattered PDFs with no way to practise under exam conditions or see what they kept getting wrong.",
    description:
      "A quiz trainer for the government IT exam, covering SQL Server, Oracle Forms, .NET Core, C#, Entity Framework, testing, and English. Run a topic as practice or as a timed exam, review every mistake, and track your stats across attempts.",
    url: "https://q.belal.work/",
    category: "Education",
    kind: "work",
    featured: true,
    screenshot: "/work/exam-prep-quiz.jpg",
    year: "2026",
    facts: ["7 topics", "Practice or exam mode", "Mistake review"],
  },
  {
    name: "Chess Puzzles",
    description:
      "A rated chess puzzle trainer. Solve tactics against an adaptive rating, with hints, full solutions, five difficulty levels, and a move list you can step back through.",
    url: "https://chess.belal.work/",
    category: "Side project",
    kind: "side",
    featured: true,
    screenshot: "/work/chess-puzzles.png",
    year: "2026",
    facts: ["Adaptive rating", "5 difficulty levels", "Built for fun"],
  },
  {
    name: "Theme Converter",
    chore: ["White logos", "on white", "pages."],
    problem:
      "Logos kept arriving as white PNGs that disappeared on light backgrounds, and every one meant another manual round trip through an image editor.",
    description:
      "Turns white logos into black versions for contrast on light-themed sites. Supports PNG, JPG, and WebP with batch processing.",
    url: "https://theme.belal.work/",
    category: "Design",
    kind: "work",
  },
  {
    name: "Image Converter",
    chore: ["Uploading", "client assets."],
    problem:
      "Page-weight budgets kept getting blown by oversized PNGs, and every online converter wanted me to upload client assets to someone else's server.",
    description:
      "Converts images to WebP and other modern formats for better compression. Processing happens in the browser, so nothing is uploaded.",
    url: "https://convert.belal.work/",
    category: "Media",
    kind: "work",
  },
  {
    name: "Arabic Lorem Ipsum",
    chore: ["Latin filler", "in Arabic", "layouts."],
    problem:
      "Arabic layouts mocked up with Latin lorem ipsum fell apart the moment real right-to-left text landed in them.",
    description:
      "Generates realistic Arabic placeholder text for mockups and templates, built specifically for Arabic-language projects.",
    url: "https://text.belal.work/",
    category: "Design",
    kind: "work",
  },
  {
    name: "Binary Converter",
    chore: ["Mangled", "UTF-8."],
    problem:
      "Chasing an encoding bug meant hunting for a converter that handled UTF-8 honestly instead of mangling every non-Latin character it touched.",
    description:
      "Converts between text and binary with real-time character metrics, proper UTF-8 handling, and file uploads.",
    url: "https://binary.belal.work/",
    category: "Developer",
    kind: "work",
  },
  {
    name: "Media Downloader",
    chore: ["Fake download", "buttons."],
    problem:
      "Pulling a reference clip for a build meant wading through download sites buried in pop-ups and fake buttons.",
    description:
      "Download video and audio from YouTube, TikTok, Instagram, and more, in multiple formats, without the ad maze.",
    url: "https://download.belal.work/",
    category: "Media",
    kind: "work",
  },
  {
    name: "Break Timer",
    chore: ["Sessions", "with no end."],
    problem:
      "Long build sessions ran away from me. I wanted a break clock I could leave open on a second screen and read from across the desk.",
    description:
      "A simple countdown timer for work and rest intervals, with a large readable clock and customizable colors.",
    url: "https://break.belal.work/",
    category: "Focus",
    kind: "work",
  },
  {
    name: "Tools Plus",
    chore: ["A dozen", "forgotten", "bookmarks."],
    problem:
      "A dozen one-off helpers (formatters, generators, small converters) were scattered across bookmarks and half-forgotten tabs.",
    description:
      "A single utility suite collecting the small text, PDF, image, and development helpers that never warranted a site of their own.",
    url: "https://tools.belal.work/",
    category: "Utilities",
    kind: "work",
  },
];

/**
 * Personal Information Configuration
 * Update these values to change personal information across the site
 */
export const personalInfo = {
  name: "Belal Abukhadija",
  title: "Full-Stack Developer",
  headline: "AI Engineer",
  location: "Amman, Jordan",
  timezone: "Asia/Amman",
  /** Short line for the hero. Keep it to one sentence. */
  heroLine: "I build my way out of problems, then put the result online.",
  description:
    "I'm a full-stack developer who builds his way out of problems. Almost everything on belal.work started as friction I hit at work: a slow, manual, or missing step that became a small product to remove it.",
  email: "belalabukhadija97@gmail.com",
  github: "https://github.com/belal-abukhadija",
  linkedin: "https://www.linkedin.com/in/belal-abu-khadija-9a591730b",
  whatsapp: "962789752515",
  whatsappDisplay: "+962 78 975 2515",
  instagram: "belal_abukhadija",
  domain: "belal.work",
  yearsOfExperience: 3,
};

/**
 * Work Experience
 * Reverse-chronological, newest first.
 */
export interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  url: string;
}

export const experience: ExperienceEntry[] = [
  {
    company: "Kawkab AI",
    role: "AI Engineer",
    period: "09/2025 onwards",
    url: "https://kawkab.ai/",
  },
  {
    company: "CirrusGo",
    role: "DevOps Trainee",
    period: "07/2025–09/2025",
    url: "https://cirrusgo.com/",
  },
];

/**
 * Companies worked with, shown in the logo rail below the hero.
 */
export interface WorkedWithEntry {
  name: string;
  url: string;
}

export const workedWith: WorkedWithEntry[] = [
  { name: "Kawkab", url: "https://kawkab.ai/" },
  { name: "CirrusGo", url: "https://cirrusgo.com/" },
];

/**
 * Toolkit: the software this developer actually reaches for, day to day.
 */
export interface ToolkitEntry {
  name: string;
  category: string;
  /** slugs into components/ToolkitIcon.tsx, one or two (shown side by side) */
  icons: string[];
}

export const toolkit: ToolkitEntry[] = [
  { name: "VS Code", category: "Coding", icons: ["vscode"] },
  { name: "Claude Code", category: "AI-Assisted Development", icons: ["claudecode"] },
  { name: "Figma", category: "Design", icons: ["figma"] },
  { name: "Next.js", category: "Framework", icons: ["nextdotjs"] },
  { name: "Git & GitHub", category: "Version Control", icons: ["git", "github"] },
  { name: "Docker", category: "Infrastructure", icons: ["docker"] },
  { name: "Supabase", category: "Backend / Data", icons: ["supabase"] },
  { name: "Postman", category: "API Testing", icons: ["postman"] },
];
