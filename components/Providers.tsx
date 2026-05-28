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
 * Keeps the iOS Safari status-bar tint in sync with the user-toggled theme.
 * Maintains its OWN <meta name="theme-color" data-runtime>; never touches the
 * media-query metas emitted by `viewport.themeColor` — those are React-managed
 * and stripping them triggers `removeChild` reconciliation errors.
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
  }, [resolvedTheme]);

  return null;
}
