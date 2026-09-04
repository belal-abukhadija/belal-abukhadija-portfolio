import { personalInfo, projects } from "./projects-data";

/**
 * Structured Data (JSON-LD) Configuration
 *
 * Generates structured data for search engines
 * Helps search engines understand your content better
 */

export const personStructuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `https://${personalInfo.domain}/#person`,
  name: personalInfo.name,
  givenName: "Belal",
  familyName: "Abukhadija",
  jobTitle: personalInfo.title,
  email: `mailto:${personalInfo.email}`,
  url: `https://${personalInfo.domain}`,
  sameAs: [personalInfo.github, personalInfo.linkedin],
  description: personalInfo.description,
  knowsAbout: [
    "Web Development",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Frontend Development",
    "UI/UX Design",
    "Web Tools",
    "Product Engineering",
  ],
};

export const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `https://${personalInfo.domain}/#website`,
  name: `${personalInfo.name} Portfolio`,
  description: personalInfo.description,
  url: `https://${personalInfo.domain}`,
  inLanguage: "en-US",
  author: {
    "@type": "Person",
    "@id": `https://${personalInfo.domain}/#person`,
    name: personalInfo.name,
  },
  publisher: {
    "@type": "Person",
    "@id": `https://${personalInfo.domain}/#person`,
    name: personalInfo.name,
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `https://${personalInfo.domain}/?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export const profilePageStructuredData = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `https://${personalInfo.domain}/#profilepage`,
  mainEntity: {
    "@type": "Person",
    "@id": `https://${personalInfo.domain}/#person`,
  },
  dateCreated: "2024-01-01",
  dateModified: new Date().toISOString().split("T")[0],
};

export const softwareApplicationStructuredData = projects.map((project, index) => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `https://${personalInfo.domain}/#project-${index}`,
  name: project.name,
  applicationCategory: "WebApplication",
  operatingSystem: "Any",
  description: project.description,
  url: project.url,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
  author: {
    "@type": "Person",
    "@id": `https://${personalInfo.domain}/#person`,
    name: personalInfo.name,
  },
}));

export const breadcrumbStructuredData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: `https://${personalInfo.domain}`,
    },
  ],
};
