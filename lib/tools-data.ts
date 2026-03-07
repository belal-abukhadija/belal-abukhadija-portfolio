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
}

export const tools: Tool[] = [
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
    name: "PDF Signature Tool",
    description: "Add signatures and text annotations to PDF documents directly in your browser. Perfect for document signing and approval workflows.",
    url: "https://sign.belal.work/",
    icon: "FileSignature",
    color: "from-red-500 to-orange-500",
    category: "Productivity"
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
  title: "Web Developer & Tool Creator",
  description: "I build practical web tools that solve real-world problems. From logo converters to PDF editors, each tool is crafted with care for developers and creators.",
  email: "belalabukhadija97@gmail.com",
  github: "https://github.com/belalslah",
  linkedin: "https://www.linkedin.com/in/belal-abu-khadija-9a591730b",
  domain: "belal.work"
};
