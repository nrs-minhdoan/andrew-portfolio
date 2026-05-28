"use client";

import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const t = useTranslations("Theme");
  const { resolvedTheme, setTheme } = useTheme();

  const toggle = () => setTheme(resolvedTheme === "dark" ? "light" : "dark");

  return (
    <button
      type="button"
      aria-label={t("toggle")}
      onClick={toggle}
      className="inline-flex aspect-square h-9 w-9 shrink-0 items-center justify-center rounded-md border border-(--border) transition-colors hover:bg-black/5 dark:hover:bg-white/10"
    >
      <Moon className="h-4 w-4 dark:hidden" aria-hidden />
      <Sun className="hidden h-4 w-4 dark:inline" aria-hidden />
    </button>
  );
}
