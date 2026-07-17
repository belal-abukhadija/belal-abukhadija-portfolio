/**
 * Tools Data Configuration
 *
 * This file contains all the tools showcased on the portfolio.
 * To add a new tool, simply add a new object to the tools array following the same structure.
 *
 * Tool Interface:
 * - name: The display name of the tool
 * - description: A brief description of what the tool does
 * - url: The full URL to the tool
 * - icon: The icon identifier (used with lucide-react)
 * - color: Tailwind color class for the card accent
 * - category: Category for filtering (optional, for future use)
 */

export interface Tool {
  name: string;
  description: string;
  url: string;
  icon: string;
  color: string;
  category?: string;
  /** Featured on the homepage "Work" section with a live screenshot */
  featured?: boolean;
  screenshot?: string;
  year?: string;
  facts?: string[];
}

export const tools: Tool[] = [

  {
    name: "PDF Signature Tool",
    description: "Add signatures and text annotations to PDF documents directly in your browser. Perfect for document signing and approval workflows.",
    url: "https://sign.belal.work/",
    icon: "FileSignature",
    color: "from-red-500 to-orange-500",
    category: "Productivity",
    featured: true,
    screenshot: "/work/pdf-signature-tool.jpg",
    year: "2024",
    facts: ["No account", "100% in-browser", "Free"],
  },
  {
    name: "Theme Converter",
    description: "Transform white logos into black versions for better contrast on light-themed websites. Supports PNG, JPG, WebP with batch processing.",
    url: "https://theme.belal.work/",
    icon: "Palette",
    color: "from-purple-500 to-pink-500",
    category: "Design"
  },
  {
    name: "Binary Converter",
    description: "Convert between text and binary formats with real-time character metrics. Supports UTF-8 encoding and file uploads.",
    url: "https://binary.belal.work/",
    icon: "Binary",
    color: "from-blue-500 to-cyan-500",
    category: "Developer"
  },
  {
    name: "Media Downloader",
    description: "Download videos and audio from YouTube, TikTok, Instagram, and more — multiple formats, fast processing, all in the browser.",
    url: "https://download.belal.work/",
    icon: "Download",
    color: "from-blue-500 to-indigo-500",
    category: "Media"
  },
  {
    name: "Arabic Lorem Ipsum",
    description: "Generate professional Arabic placeholder text for mockups and templates. Designed specifically for Arabic-language projects.",
    url: "https://text.belal.work/",
    icon: "Type",
    color: "from-amber-500 to-yellow-500",
    category: "Design"
  },
  {
    name: "Image Converter",
    description: "Convert images to WebP and other modern formats for better compression and performance. Browser-based processing ensures privacy.",
    url: "https://convert.belal.work/",
    icon: "ImageDown",
    color: "from-indigo-500 to-purple-500",
    category: "Media"
  },
  {
    name: "WordCount Pro",
    description: "Accurate word and character counter with SEO keyword density analysis, platform character limits, and reading time estimates. Runs entirely in your browser.",
    url: "https://counter.belal.work/",
    icon: "LetterText",
    color: "from-teal-500 to-cyan-500",
    category: "Productivity",
    featured: true,
    screenshot: "/work/wordcount-pro.jpg",
    year: "2024",
    facts: ["SEO keyword density", "Platform limits", "Free"],
  },
  {
    name: "MarkFlow",
    description: "Convert Markdown and MDX files into fully formatted Word documents, entirely client-side. Full GFM support, math equations, diagrams, and custom styles — no server, no uploads.",
    url: "https://md.belal.work/",
    icon: "FileCode",
    color: "from-gray-600 to-gray-900",
    category: "Developer",
    featured: true,
    screenshot: "/work/markdown-editor.jpg",
    year: "2025",
    facts: ["Zero data collection", "Works offline", "Free"],
  },
  {
    name: "Color Palette Generator",
    description: "Generate beautiful color palettes and gradients for design projects. Extract palettes from images, check contrast, and explore harmonious color combinations for UI and branding.",
    url: "https://color.belal.work/",
    icon: "SwatchBook",
    color: "from-rose-500 to-fuchsia-500",
    category: "Design",
    featured: true,
    screenshot: "/work/color-palette-generator.jpg",
    year: "2025",
    facts: ["Image extraction", "Contrast checker", "Free"],
  },
  {
    name: "Break Timer",
    description: "A simple and elegant break timer to help you manage work and rest intervals. Displays a beautiful countdown clock with customizable colors.",
    url: "https://break.belal.work/",
    icon: "Timer",
    color: "from-emerald-500 to-green-500",
    category: "Productivity"
  },
  {
    name: "Tools Plus",
    description: "A free online utility suite with tools for text, PDFs, images, and development workflows, including formatters, generators, and productivity helpers.",
    url: "https://tools.belal.work/",
    icon: "Tool",
    color: "from-slate-500 to-slate-700",
    category: "Productivity"
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
  role: "Developer. Designer. Builder.",
  location: "Amman, Jordan",
  timezone: "Asia/Amman",
  description: "I'm a full-stack developer who loves turning ideas into fast, clean, and useful products. Whether it's a design system, a browser tool, or a side project - I build things I'd actually use.",
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
 * Reverse-chronological — newest first.
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
    period: "[09/2025—]",
    url: "https://kawkab.ai/",
  },
  {
    company: "CirrusGo",
    role: "DevOps Trainee",
    period: "[07/2025–09/2025]",
    url: "https://cirrusgo.com/",
  },
];

/**
 * Companies worked with — shown in the logo rail below the hero.
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
 * Toolkit — the software this developer actually reaches for, day to day.
 */
export interface ToolkitEntry {
  name: string;
  category: string;
  /** slugs into components/ToolkitIcon.tsx — one or two (shown side by side) */
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
