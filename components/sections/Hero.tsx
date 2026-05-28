import { Mail, MapPin, Sparkles } from "lucide-react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { HeroCTAs } from "@/components/sections/HeroCTAs";
import { Reveal } from "@/components/ui/Reveal";
import { TypewriterRoles } from "@/components/ui/TypewriterRoles";
import { CONTACT, STATS } from "@/data/portfolio";

const HeroBackground = dynamic(() => import("./HeroBackground").then((m) => m.HeroBackground));

export function Hero() {
  const t = useTranslations("Hero");
  const tContact = useTranslations("Contact");
  const roles = t.raw("roles") as string[];

  return (
    <section
      id="hero"
      data-section="hero"
      className="relative isolate flex min-h-svh flex-col items-stretch pt-20 sm:flex-row sm:items-start sm:pt-28 lg:items-center lg:pt-24"
    >
      <div className="aurora" aria-hidden />
      <div className="bg-grid absolute inset-0" aria-hidden />
      <HeroBackground />
      <div className="noise" aria-hidden />

      <div className="container-page relative z-10 grid w-full gap-8 sm:gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-center">
        <div className="space-y-6 sm:space-y-8">
          <Reveal>
            <span className="label">
              <Sparkles className="h-3 w-3" aria-hidden />
              {t("eyebrow")}
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="font-display leading-[1.1] font-bold tracking-tight text-balance">
              {/* Name never wraps — cap at text-6xl so 16 chars always fit
                  the container at every breakpoint, then force single-line. */}
              <span className="block text-3xl whitespace-nowrap sm:text-5xl md:text-6xl">
                {t("name")}
              </span>
              {/* Reserve 3 lines of typewriter height on md+ so the layout
                  below doesn't shift as role text cycles through lengths.
                  Mobile keeps natural flow — already handled there. */}
              <span className="gradient-text mt-2 block text-3xl wrap-break-word sm:text-5xl md:min-h-[3.3em] md:text-6xl lg:text-7xl">
                <TypewriterRoles roles={roles} />
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="max-w-xl text-base text-(--muted) sm:text-xl">{t("tagline")}</p>
          </Reveal>

          <Reveal delay={0.26}>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-(--muted) sm:gap-4 sm:text-sm">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4" /> {tContact("address")}
              </span>
              <span className="hidden h-1 w-1 rounded-full bg-(--muted)/40 sm:block" aria-hidden />
              <a
                className="inline-flex items-center gap-1.5 break-all hover:text-(--fg)"
                href={`mailto:${CONTACT.email}`}
              >
                <Mail className="h-4 w-4 shrink-0" /> {CONTACT.email}
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.34}>
            <HeroCTAs labels={{ projects: t("ctaProjects"), contact: t("ctaContact") }} />
          </Reveal>
        </div>

        <Reveal delay={0.4} className="grid grid-cols-2 gap-3 sm:gap-4">
          <StatCard value={`${STATS.yearsExperience}+`} label={t("stats.yearsExperience")} />
          <StatCard value={`${STATS.yearsLeading}+`} label={t("stats.yearsLeading")} />
          <StatCard value={STATS.teamSize} label={t("stats.teamSize")} />
          <StatCard value={`${STATS.projects}+`} label={t("stats.projects")} />
        </Reveal>
      </div>

      <a
        href="#about"
        aria-label={t("scroll")}
        className="mt-10 mb-2 self-center text-xs tracking-[0.2em] text-(--muted) uppercase sm:absolute sm:bottom-8 sm:left-1/2 sm:z-10 sm:mt-0 sm:mb-0 sm:-translate-x-1/2"
      >
        <span className="floating inline-block">↓ {t("scroll")}</span>
      </a>
    </section>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="glass rounded-2xl p-4 sm:p-5">
      <div className="font-display text-3xl font-bold sm:text-4xl">
        <span className="gradient-text">{value}</span>
      </div>
      <div className="mt-1 text-xs text-(--muted) sm:text-sm">{label}</div>
    </div>
  );
}
