"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type Theme = "light" | "dark" | "system";
type Resolved = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: Resolved | undefined;
  setTheme: (t: Theme) => void;
}

const STORAGE_KEY = "theme";
const MEDIA = "(prefers-color-scheme: dark)";

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readSystem(): Resolved {
  return window.matchMedia(MEDIA).matches ? "dark" : "light";
}

function applyClass(resolved: Resolved) {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(resolved);
  root.style.colorScheme = resolved;
}

function disableTransitionsBriefly() {
  const style = document.createElement("style");
  style.appendChild(
    document.createTextNode(
      "*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}",
    ),
  );
  document.head.appendChild(style);
  return () => {
    window.getComputedStyle(document.body);
    setTimeout(() => {
      document.head.removeChild(style);
    }, 1);
  };
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [resolved, setResolved] = useState<Resolved | undefined>(undefined);

  // Hydrate persisted preference on mount.
  useEffect(() => {
    let initial: Theme = "system";
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
      if (stored === "light" || stored === "dark" || stored === "system") {
        initial = stored;
      }
    } catch {}
    setThemeState(initial);
    const r: Resolved = initial === "system" ? readSystem() : initial;
    setResolved(r);
  }, []);

  // Apply class whenever theme changes after hydration.
  useEffect(() => {
    if (resolved === undefined) return;
    const next: Resolved = theme === "system" ? readSystem() : theme;
    const restore = disableTransitionsBriefly();
    applyClass(next);
    setResolved(next);
    restore();
  }, [theme, resolved]);

  // Follow system changes when in system mode.
  useEffect(() => {
    if (theme !== "system") return;
    const mq = window.matchMedia(MEDIA);
    const handler = () => {
      const next = readSystem();
      applyClass(next);
      setResolved(next);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme]);

  // Cross-tab sync via storage event.
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return;
      const next = (e.newValue as Theme | null) ?? "system";
      if (next === "light" || next === "dark" || next === "system") {
        setThemeState(next);
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const setTheme = useCallback((t: Theme) => {
    try {
      localStorage.setItem(STORAGE_KEY, t);
    } catch {}
    setThemeState(t);
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, resolvedTheme: resolved, setTheme }),
    [theme, resolved, setTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    return { theme: "system", resolvedTheme: undefined, setTheme: () => {} };
  }
  return ctx;
}
