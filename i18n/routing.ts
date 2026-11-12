import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "vi"],
  defaultLocale: "en",
  localePrefix: "always",
  // hreflang alternates are already emitted in <head> from SITE_URL
  // (generateMetadata). The middleware's Link header derives its host from
  // request headers (x-forwarded-host), so it is disabled.
  alternateLinks: false,
});

export type Locale = (typeof routing.locales)[number];
