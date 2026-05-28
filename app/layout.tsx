import type { Metadata, Viewport } from "next";
import { CONTACT } from "@/data/portfolio";
import { SITE_URL } from "@/lib/site";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0506" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: CONTACT.fullName, template: `%s · ${CONTACT.fullName}` },
  description: "Front-end Developer & Team Leader with 7+ years of experience.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
