import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://minhdoan.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routing.locales.map((locale) => ({
    url: locale === routing.defaultLocale ? `${SITE}/` : `${SITE}/${locale}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: locale === routing.defaultLocale ? 1 : 0.8,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, l === routing.defaultLocale ? `${SITE}/` : `${SITE}/${l}`]),
      ),
    },
  }));
}
