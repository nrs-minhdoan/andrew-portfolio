import { Brain, Gauge, Rocket, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { IconBox } from "@/components/ui/IconBox";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { STATS } from "@/data/portfolio";

const HIGHLIGHTS = [
  { key: "architecture", icon: Brain },
  { key: "performance", icon: Gauge },
  { key: "leadership", icon: Users },
  { key: "delivery", icon: Rocket },
];

const STAT_VALUES = {
  years: STATS.yearsExperience,
  leadingYears: STATS.yearsLeading,
  teamMin: STATS.teamMin,
  teamMax: STATS.teamMax,
};

const richTags = {
  b: (chunks: ReactNode) => <strong className="font-semibold text-(--fg)">{chunks}</strong>,
};

export function About() {
  const t = useTranslations("About");
  return (
    <section id="about" data-section="about" className="relative">
      <div className="container-page">
        <SectionHeader
          label={t("label")}
          title={<span className="gradient-text">{t("title")}</span>}
        />

        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-5 text-base leading-relaxed text-(--muted) sm:text-lg">
            {["p1", "p2", "p3", "p4"].map((k, i) => (
              <Reveal key={k} delay={i * 0.06} as="div">
                <p>{t.rich(k, { ...richTags, ...STAT_VALUES })}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1} className="space-y-4">
            <h3 className="font-display text-sm font-semibold tracking-widest text-(--muted) uppercase">
              {t("highlightTitle")}
            </h3>
            <ul className="grid gap-3">
              {HIGHLIGHTS.map(({ key, icon: Icon }, i) => (
                <Reveal key={key} as="li" delay={0.05 * i}>
                  <div className="glass group relative flex items-start gap-4 rounded-2xl p-5 transition-all hover:-translate-y-0.5 hover:border-(--accent)/40">
                    <IconBox size="sm">
                      <Icon className="h-5 w-5" aria-hidden />
                    </IconBox>
                    <div>
                      <div className="font-display font-semibold">
                        {t(`highlights.${key}.title`)}
                      </div>
                      <p className="mt-1 text-sm text-(--muted)">
                        {t(`highlights.${key}.desc`, STAT_VALUES)}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
