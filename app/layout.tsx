import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { personalInfo } from "@/lib/projects-data";
import SmoothScroll from "@/components/SmoothScroll";
import {
  personStructuredData,
  websiteStructuredData,
  profilePageStructuredData,
  breadcrumbStructuredData,
  softwareApplicationStructuredData,
} from "@/lib/structured-data";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bricolage",
  axes: ["opsz", "wdth"],
});

/**
 * Root Layout Metadata
 *
 * SEO-optimized metadata for the entire site
 * This is automatically applied to all pages
 */
export const metadata: Metadata = {
  metadataBase: new URL(`https://${personalInfo.domain}`),
  title: {
    default: `${personalInfo.name} - ${personalInfo.title}`,
    template: `%s | ${personalInfo.name}`,
  },
  description: personalInfo.description,
  keywords: [
    "web developer",
    "web developer portfolio",
    "problem solving developer",
    "free online tools",
    "logo converter",
    "binary converter",
    "pdf editor",
    "pdf signature",
    "link sharing",
    "arabic lorem ipsum",
    "image converter",
    "webp converter",
    "word counter",
    "character counter",
    "keyword density",
    "belal abukhadija",
    "developer portfolio",
    "frontend developer",
    "react developer",
    "next.js developer",
    "freelance developer",
    "arab developer",
  ],
  authors: [{ name: personalInfo.name, url: `https://${personalInfo.domain}` }],
  creator: personalInfo.name,
  publisher: personalInfo.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `https://${personalInfo.domain}`,
    siteName: `${personalInfo.name} Portfolio`,
    title: `${personalInfo.name} - ${personalInfo.title}`,
    description: personalInfo.description,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${personalInfo.name} - Full-Stack Developer & Project Builder`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${personalInfo.name} - ${personalInfo.title}`,
    description: personalInfo.description,
    images: ["/og-image.png"],
    creator: "@belalabukhadija",
  },
  alternates: {
    canonical: `https://${personalInfo.domain}`,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  verification: {
    google: "your-google-verification-code", // Add your Google Search Console verification code
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" id="top" className={bricolage.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              personStructuredData,
              websiteStructuredData,
              profilePageStructuredData,
              breadcrumbStructuredData,
              ...softwareApplicationStructuredData,
            ]),
          }}
        />
        {/* The page line is what crosses phrases out, and it needs JS. Without
            JS, fall back to an ordinary strikethrough. */}
        <noscript>
          <style>{`.strike { text-decoration: line-through; text-decoration-color: #FF4C65; }`}</style>
        </noscript>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className="font-sans antialiased"
        suppressHydrationWarning
      >
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
