/**
 * Build a Google S2 favicon URL for any site. 128px size is sharp enough for
 * card icons without re-fetching multiple resolutions, and the CDN handles
 * fallbacks (e.g. browser-chooser pick from `<link rel="icon">`).
 */
export function getFaviconUrl(siteUrl: string, size = 128): string {
  try {
    const host = new URL(siteUrl).hostname;
    return `https://www.google.com/s2/favicons?domain=${host}&sz=${size}`;
  } catch {
    return "";
  }
}
