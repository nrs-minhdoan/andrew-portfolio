"use client";

import { type ReactNode, useEffect } from "react";
import { ThemeProvider, useTheme } from "@/components/theme/ThemeProvider";

const THEME_COLORS: Record<"light" | "dark", string> = {
  light: "#ffffff",
  dark: "#0d0506",
};

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <MetaThemeSync />
      {children}
    </ThemeProvider>
  );
}

/**
 * Updates `meta[name=theme-color]` + the root `color-scheme` to the active
 * theme. iOS Safari only re-reads `theme-color` when the URL bar transitions
 * between collapsed and expanded — mid-scroll toggles will stay stale until
 * the next bar transition.
 */
function MetaThemeSync() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (resolvedTheme !== "dark" && resolvedTheme !== "light") return;
    const color = THEME_COLORS[resolvedTheme];

    let tag = document.querySelector<HTMLMetaElement>('meta[name="theme-color"][data-runtime]');
    if (!tag) {
      tag = document.createElement("meta");
      tag.name = "theme-color";
      tag.setAttribute("data-runtime", "");
      document.head.appendChild(tag);
    }
    tag.content = color;

    document.documentElement.style.colorScheme = resolvedTheme;
  }, [resolvedTheme]);

  return null;
}
