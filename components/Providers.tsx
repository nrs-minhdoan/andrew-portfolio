"use client";

import { ThemeProvider, useTheme } from "next-themes";
import { type ReactNode, useEffect } from "react";

const THEME_COLORS: Record<"light" | "dark", string> = {
  light: "#ffffff",
  dark: "#0d0506",
};
// Off-by-one shades used purely to force iOS Safari to register a value
// change before settling on the real theme color.
const FLASH_COLORS: Record<"light" | "dark", string> = {
  light: "#fefefe",
  dark: "#0c0405",
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
 * iOS Safari refuses to refresh the status-bar tint mid-scroll even when
 * `meta[name=theme-color]` is mutated — it caches whatever value it read
 * when the URL bar last painted. To force a re-read we layer three tricks:
 *
 *   1. Flash the meta `content` to an off-by-one shade, then settle on the
 *      real color on the next frame. Safari treats this as two distinct
 *      value transitions and re-evaluates the second one.
 *   2. Detach + re-append our `data-runtime` tag. Safari rescans the head
 *      and treats the re-inserted node as a fresh declaration.
 *   3. Update `html.style.background` + `colorScheme` so the chrome
 *      inherits the right tint from the root element (Safari falls back to
 *      root paint color when no meta is conclusive).
 *
 * Renders nothing → zero hydration cost. Touches only our own
 * `data-runtime` tag, never the media-query metas React owns.
 */
function MetaThemeSync() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (resolvedTheme !== "dark" && resolvedTheme !== "light") return;
    const color = THEME_COLORS[resolvedTheme];
    const flash = FLASH_COLORS[resolvedTheme];

    let tag = document.querySelector<HTMLMetaElement>('meta[name="theme-color"][data-runtime]');
    if (!tag) {
      tag = document.createElement("meta");
      tag.name = "theme-color";
      tag.setAttribute("data-runtime", "");
      document.head.appendChild(tag);
    }
    const node = tag;

    // Root paint + native UI alignment (rubber-band, scrollbars, form UI).
    const root = document.documentElement;
    root.style.colorScheme = resolvedTheme;
    root.style.backgroundColor = color;

    // Step 1: off-by-one flash so Safari sees a value change.
    node.content = flash;

    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      node.content = color;
      // Step 2: detach + reattach forces a fresh head scan on Safari.
      const head = document.head;
      node.remove();
      raf2 = requestAnimationFrame(() => head.appendChild(node));
    });

    return () => {
      cancelAnimationFrame(raf1);
      if (raf2) cancelAnimationFrame(raf2);
    };
  }, [resolvedTheme]);

  return null;
}
