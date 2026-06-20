import { ExternalLink, Menu } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { NavController } from "@/components/nav/NavController";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CONTACT } from "@/data/portfolio";

const SECTIONS = [
  { id: "about", key: "about" },
  { id: "skills", key: "skills" },
  { id: "projects", key: "projects" },
  { id: "experience", key: "experience" },
  { id: "achievements", key: "achievements" },
  { id: "contact", key: "contact" },
];

/**
 * Server component. Renders the full nav markup so crawlers receive every
 * link in the initial HTML. `NavController` is a sibling client island that
 * imperatively toggles `data-scrolled` + `data-active` via DOM attributes
 * without re-rendering the tree.
 *
 * Mobile menu uses `<details>` so no client JS is needed for open/close.
 */
export function Navigation() {
  const t = useTranslations("Nav");

  return (
    <>
      <header
        data-nav-shell
        className="fixed inset-x-0 top-0 z-50 border-b border-transparent transition-all duration-300 data-[scrolled=true]:border-(--border) data-[scrolled=true]:bg-(--bg)/80 data-[scrolled=true]:backdrop-blur-md"
      >
        <div className="container-page flex h-16 min-w-0 items-center justify-between gap-2 sm:gap-4">
          <a
            href="#hero"
            aria-label={`${CONTACT.handle} - home`}
            className="group font-display inline-flex min-w-0 items-center gap-6 text-base font-bold"
          >
            <Image
              src="/logo.svg"
              alt=""
              aria-hidden
              width={18}
              height={40}
              priority
              unoptimized
              className="h-9 w-auto transition-transform group-hover:scale-110"
              style={{ width: "auto" }}
            />
            <span className="font-pixel">{CONTACT.handle}</span>
          </a>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                data-nav-link={s.id}
                className="rounded-md px-3 py-2 text-sm text-(--muted) transition-colors outline-none hover:text-(--fg) focus-visible:text-(--fg) focus-visible:ring-2 focus-visible:ring-(--accent)/60 data-[active=true]:text-(--fg)"
              >
                {t(s.key)}
              </a>
            ))}
            <a
              href={CONTACT.links.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm text-(--muted) transition-colors outline-none hover:text-(--fg) focus-visible:text-(--fg) focus-visible:ring-2 focus-visible:ring-(--accent)/60"
            >
              {t("resume")}
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            </a>
          </nav>

          <div className="flex shrink-0 flex-nowrap items-center gap-1.5 sm:gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
            <details className="group/menu relative md:hidden">
              <summary
                aria-label="Open menu"
                className="inline-flex h-9 w-9 cursor-pointer list-none items-center justify-center rounded-md border border-(--border) text-(--fg) hover:border-(--border-strong) [&::-webkit-details-marker]:hidden"
              >
                <Menu className="h-4 w-4 transition-transform group-open/menu:rotate-90" />
              </summary>
              <nav
                aria-label="Mobile primary"
                className="absolute right-0 mt-2 flex w-56 flex-col gap-0.5 rounded-2xl border border-(--border) bg-(--bg) p-2 shadow-2xl"
              >
                {SECTIONS.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    data-nav-link={s.id}
                    className="rounded-xl px-3 py-2.5 text-sm text-(--fg) transition-colors hover:bg-(--accent)/10 data-[active=true]:bg-(--accent)/15 data-[active=true]:text-(--accent)"
                  >
                    {t(s.key)}
                  </a>
                ))}
                <a
                  href={CONTACT.links.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between gap-1.5 rounded-xl px-3 py-2.5 text-sm text-(--fg) transition-colors hover:bg-(--accent)/10"
                >
                  {t("resume")}
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                </a>
              </nav>
            </details>
          </div>
        </div>
      </header>
      <NavController />
    </>
  );
}
