import { Mail, MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { SiteFooter } from "@/components/SiteFooter";
import { FacebookIcon, GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { CopyButton } from "@/components/ui/CopyButton";
import { IconBox } from "@/components/ui/IconBox";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SocialIconButton } from "@/components/ui/SocialIconButton";
import { CONTACT } from "@/data/portfolio";

export function Contact() {
  const t = useTranslations("Contact");

  return (
    <section id="contact" data-section="contact" className="relative">
      <div className="aurora opacity-50" aria-hidden />
      <div className="container-page relative flex flex-1 flex-col justify-center pb-16 sm:pb-24">
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
                <div className="text-[10px] tracking-widest text-(--muted) uppercase sm:text-xs">
                  {t("location")}
                </div>
                <div className="font-display mt-1 inline-flex items-center gap-2 text-base font-bold wrap-break-word sm:text-lg">
                  <MapPin className="h-4 w-4 shrink-0 text-(--accent) sm:h-5 sm:w-5" aria-hidden />
                  {t("address")}
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <SocialIconButton href={CONTACT.links.linkedin} label="LinkedIn">
                  <LinkedinIcon size={14} />
                </SocialIconButton>
                <SocialIconButton href={CONTACT.links.github} label="GitHub">
                  <GithubIcon size={14} />
                </SocialIconButton>
                <SocialIconButton href={CONTACT.links.facebook} label="Facebook">
                  <FacebookIcon size={14} />
                </SocialIconButton>
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
      <IconBox size="sm">{icon}</IconBox>
      <div className="min-w-0 flex-1">
        <div className="text-[10px] tracking-widest text-(--muted) uppercase sm:text-xs">
          {label}
        </div>
        <a
          href={href}
          className="font-display block truncate text-xs font-semibold hover:text-(--accent) sm:text-base"
        >
          {value}
        </a>
      </div>
      <CopyButton value={value} />
    </div>
  );
}
