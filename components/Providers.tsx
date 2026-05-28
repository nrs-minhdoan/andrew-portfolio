"use client";

import { ThemeProvider, useTheme } from "next-themes";
import { type ReactNode, useEffect } from "react";

const THEME_COLORS: Record<"light" | "dark", string> = {
  light: "#ffffff",
  dark: "#0d0506",
};

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <MetaThemeSync />
      {children}
    </ThemeProvider>
  );
}

/**
 * Sync iOS Safari status-bar tint with the active theme.
 *
 * iOS Safari reads `meta[name=theme-color]` once when the URL bar paints. Mid-
 * scroll `.content` mutations are ignored — the bar stays the stale color
 * until the user fully collapses + re-expands it. To force a re-read we
 * detach the tag from `<head>` and re-append it on the next animation frame:
 * Safari treats the re-inserted node as a fresh declaration and re-evaluates.
 *
 * Owns its own `data-runtime` meta tag — never touches the media-query metas
 * rendered by `viewport.themeColor` (those belong to React; stripping them
 * triggers `removeChild` reconciliation errors).
 *
 * Renders nothing → zero hydration cost.
 */
function MetaThemeSync() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!resolvedTheme) return;
    const color = resolvedTheme === "dark" ? THEME_COLORS.dark : THEME_COLORS.light;

    let tag = document.querySelector<HTMLMetaElement>('meta[name="theme-color"][data-runtime]');
    if (!tag) {
      tag = document.createElement("meta");
      tag.name = "theme-color";
      tag.setAttribute("data-runtime", "");
      document.head.appendChild(tag);
    }
    tag.content = color;

    // Force iOS Safari to re-read theme-color: detach + re-append on rAF.
    const head = document.head;
    const node = tag;
    node.remove();
    const raf = requestAnimationFrame(() => head.appendChild(node));

    // Align native UI (scrollbars, form controls, OS tint) with active theme.
    document.documentElement.style.colorScheme = resolvedTheme;

    return () => cancelAnimationFrame(raf);
  }, [resolvedTheme]);

  return null;
}
