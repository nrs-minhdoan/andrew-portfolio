import { Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { FacebookIcon, GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { CONTACT } from "@/data/portfolio";

export function SiteFooter() {
  const t = useTranslations("Footer");
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-(--border) py-3 text-xs leading-tight text-(--muted) sm:text-sm sm:leading-none">
      <div className="container-page flex flex-col items-center justify-between gap-2 text-center sm:h-6 sm:flex-row sm:gap-6 sm:text-left">
        <p className="truncate">
          © {year} {CONTACT.handle} · {t("rights")}
        </p>
        <p className="hidden truncate text-center md:block">{t("built")}</p>
        <div className="flex shrink-0 items-center gap-3">
          <a aria-label="Email" href={`mailto:${CONTACT.email}`} className="hover:text-(--accent)">
            <Mail className="h-4 w-4" />
          </a>
          <a
            aria-label="LinkedIn"
            href={CONTACT.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-(--accent)"
          >
            <LinkedinIcon size={16} />
          </a>
          <a
            aria-label="GitHub"
            href={CONTACT.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-(--accent)"
          >
            <GithubIcon size={16} />
          </a>
          <a
            aria-label="Facebook"
            href={CONTACT.links.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-(--accent)"
          >
            <FacebookIcon size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
