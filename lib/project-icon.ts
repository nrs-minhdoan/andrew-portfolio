import { getFaviconUrl } from "./favicon";

/**
 * Logo precedence: project's bundled image (sharper, brand-correct) wins;
 * otherwise fall back to a remote favicon derived from the URL. Returns null
 * when neither is available so callers can omit the slot.
 */
export function getProjectIcon(url?: string, image?: string): string | null {
  if (image) return image;
  if (url) return getFaviconUrl(url);
  return null;
}
