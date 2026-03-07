import { MetadataRoute } from "next";
import { personalInfo } from "@/lib/tools-data";

/**
 * Web App Manifest
 *
 * Provides information about the web application
 * Enables PWA features like add to home screen
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${personalInfo.name} - Portfolio`,
    short_name: "BELAL",
    description: personalInfo.description,
    start_url: "/",
    display: "standalone",
    background_color: "#111116",
    theme_color: "#2dd4bf",
    orientation: "portrait-primary",
    categories: ["portfolio", "developer", "tools"],
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
