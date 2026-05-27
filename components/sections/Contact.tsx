import { Mail, MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { SiteFooter } from "@/components/SiteFooter";
import { FacebookIcon, GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { CopyButton } from "@/components/ui/CopyButton";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CONTACT } from "@/data/portfolio";

export function Contact() {
  const t = useTranslations("Contact");

  return (
    <section id="contact" data-section="contact" className="relative">
      <div className="aurora opacity-50" aria-hidden />
      <div className="container-page relative flex flex-1 flex-col justify-center">
        <SectionHeader
          align="center"
          label={t("label")}
          title={<span className="gradient-text">{t("title")}</span>}
          subtitle={t("subtitle")}
        />

        <Reveal className="mx-auto grid w-full max-w-3xl gap-3 sm:grid-cols-2">
          <ContactRow
            icon={<Mail className="h-4 w-4 sm:h-5 sm:w-5" />}
            label={t("emailMe")}
            value={CONTACT.email}
            href={`mailto:${CONTACT.email}`}
          />
          <ContactRow
            icon={<Phone className="h-4 w-4 sm:h-5 sm:w-5" />}
            label={t("callMe")}
            value={CONTACT.phone}
            href={`tel:${CONTACT.phone.replaceAll(/\s+/g, "")}`}
          />
          <div className="glass rounded-2xl p-4 sm:col-span-2 sm:p-5">
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <div className="text-(--muted) text-[10px] uppercase tracking-widest sm:text-xs">
                  {t("location")}
                </div>
                <div className="mt-1 inline-flex items-center gap-2 break-words font-bold font-display text-base sm:text-lg">
                  <MapPin className="h-4 w-4 shrink-0 text-(--accent) sm:h-5 sm:w-5" aria-hidden />
                  {CONTACT.location}
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <a
                  aria-label="LinkedIn"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={CONTACT.links.linkedin}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-(--border) hover:border-(--accent)/60 hover:text-(--accent) sm:h-9 sm:w-9"
                >
                  <LinkedinIcon size={14} />
                </a>
                <a
                  aria-label="GitHub"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={CONTACT.links.github}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-(--border) hover:border-(--accent)/60 hover:text-(--accent) sm:h-9 sm:w-9"
                >
                  <GithubIcon size={14} />
                </a>
                <a
                  aria-label="Facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={CONTACT.links.facebook}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-(--border) hover:border-(--accent)/60 hover:text-(--accent) sm:h-9 sm:w-9"
                >
                  <FacebookIcon size={14} />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
      <SiteFooter />
    </section>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <div className="glass group flex min-w-0 items-center gap-3 rounded-2xl p-3 transition-all hover:-translate-y-0.5 hover:border-(--accent)/40 sm:gap-4 sm:p-5">
      <span
        className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-white sm:h-11 sm:w-11"
        style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-3))" }}
      >
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-(--muted) text-[10px] uppercase tracking-widest sm:text-xs">
          {label}
        </div>
        <a
          href={href}
          className="block truncate font-display font-semibold text-xs hover:text-(--accent) sm:text-base"
        >
          {value}
        </a>
      </div>
      <CopyButton value={value} />
    </div>
  );
}
