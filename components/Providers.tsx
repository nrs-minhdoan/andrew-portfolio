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
 * Keeps the iOS Safari address-bar / status-bar tint in sync with the active
 * theme. Static `viewport.themeColor` only follows the OS scheme, so a
 * user-toggled theme would otherwise leave the chrome mismatched.
 */
function MetaThemeSync() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const color = resolvedTheme === "dark" ? THEME_COLORS.dark : THEME_COLORS.light;
    let tag = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]:not([media])');
    if (!tag) {
      tag = document.createElement("meta");
      tag.name = "theme-color";
      document.head.appendChild(tag);
    }
    tag.content = color;
    document.documentElement.style.backgroundColor = color;
    document.body.style.backgroundColor = color;
  }, [resolvedTheme]);

  return null;
}
