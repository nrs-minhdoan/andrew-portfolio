import type { MetadataRoute } from "next";
import { CONTACT } from "@/data/portfolio";

// "Minh Truong Doan" -> "Minh Doan": home-screen labels get truncated past ~12 chars.
const nameParts = CONTACT.fullName.split(" ");
const shortName = `${nameParts[0]} ${nameParts[nameParts.length - 1]}`;

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: CONTACT.fullName,
    short_name: shortName,
    description: CONTACT.jobTitle,
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0d0506",
    theme_color: "#0d0506",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
