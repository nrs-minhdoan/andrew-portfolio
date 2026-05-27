import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0d0506" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://minhdoan.dev"),
  title: { default: "Minh Truong Doan", template: "%s · Minh Truong Doan" },
  description: "Front-end Developer & Team Leader with 7+ years of experience.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
