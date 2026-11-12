const FALLBACK_SITE_URL = "https://minhdoan.com";

// Treat an empty value as unset and normalize to a bare origin (no path or
// trailing slash) so canonical/OG/sitemap URLs are always well formed.
// An invalid URL throws at build time instead of shipping broken metadata.
const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();

export const SITE_URL = new URL(raw || FALLBACK_SITE_URL).origin;
