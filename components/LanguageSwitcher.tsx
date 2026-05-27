"use client";

import { Check, ChevronDown, Languages } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState, useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { type Locale, routing } from "@/i18n/routing";

export function LanguageSwitcher() {
  const t = useTranslations("Language");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const detailsRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (!detailsRef.current?.contains(e.target as Node)) {
        detailsRef.current?.removeAttribute("open");
        setOpen(false);
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [open]);

  const onPick = (next: Locale) => {
    detailsRef.current?.removeAttribute("open");
    setOpen(false);
    startTransition(() => {
      // scroll: false → preserve viewport position across locale swap.
      // Without it next.js resets to top, masking the SPA transition as a jump.
      router.replace(pathname, { locale: next, scroll: false });
    });
  };

  return (
    <details
      ref={detailsRef}
      className="group/lang relative"
      onToggle={(e) => setOpen((e.currentTarget as HTMLDetailsElement).open)}
    >
      <summary
        aria-label={t("label")}
        className="inline-flex h-9 w-9 cursor-pointer items-center justify-center gap-0 rounded-md border border-(--border) px-0 text-(--fg) transition-colors outline-none hover:border-(--border-strong) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent) sm:w-[120px] sm:gap-2.5 sm:rounded-lg sm:px-3.5 [&::-webkit-details-marker]:hidden"
      >
        <Languages size={16} aria-hidden />
        <span className="hidden text-[13px] font-semibold sm:inline">{locale.toUpperCase()}</span>
        <ChevronDown
          size={14}
          aria-hidden
          className="hidden transition-transform group-open/lang:rotate-180 sm:ml-auto sm:block"
        />
      </summary>

      <div className="absolute right-0 z-50 mt-2 w-44 rounded-xl border border-(--border) bg-(--bg) p-1 shadow-2xl">
        <div className="px-2 py-1.5 text-[11px] font-semibold tracking-widest text-(--muted) uppercase">
          {t("label")}
        </div>
        <ul className="flex flex-col gap-0.5">
          {routing.locales.map((l) => (
            <li key={l}>
              <button
                type="button"
                disabled={isPending}
                onClick={() => onPick(l)}
                className="flex w-full items-center justify-between rounded-md px-2 py-2 text-sm text-(--fg) transition-colors hover:bg-(--accent)/10 focus-visible:bg-(--accent)/15 focus-visible:outline-none aria-selected:text-(--accent) data-[selected=true]:text-(--accent)"
                data-selected={l === locale}
              >
                <span>{t(l)}</span>
                {l === locale ? <Check size={14} aria-hidden /> : null}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
}
