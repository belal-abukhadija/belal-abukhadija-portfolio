import { MetadataRoute } from "next";
import { personalInfo, tools } from "@/lib/tools-data";

/**
 * Sitemap Configuration
 *
 * Generates a sitemap.xml file for search engines
 * This helps search engines discover and index your pages
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = `https://${personalInfo.domain}`;

  // Main pages
  const mainPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  // Tool pages (external links - for reference)
  const toolPages: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: tool.url,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...mainPages, ...toolPages];
}
