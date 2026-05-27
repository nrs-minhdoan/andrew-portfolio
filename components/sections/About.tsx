import { Brain, Gauge, Rocket, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

const HIGHLIGHTS = [
  { key: "architecture", icon: Brain },
  { key: "performance", icon: Gauge },
  { key: "leadership", icon: Users },
  { key: "delivery", icon: Rocket },
] as const;

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
          <div className="space-y-5 text-(--muted) text-base leading-relaxed sm:text-lg">
            {(["p1", "p2", "p3", "p4"] as const).map((k, i) => (
              <Reveal key={k} delay={i * 0.06} as="div">
                <p
                  dangerouslySetInnerHTML={{
                    __html: t
                      .raw(k)
                      .replaceAll("<b>", '<strong class="text-(--fg) font-semibold">')
                      .replaceAll("</b>", "</strong>"),
                  }}
                />
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1} className="space-y-4">
            <h3 className="font-display font-semibold text-(--muted) text-sm uppercase tracking-widest">
              {t("highlightTitle")}
            </h3>
            <ul className="grid gap-3">
              {HIGHLIGHTS.map(({ key, icon: Icon }, i) => (
                <Reveal key={key} as="li" delay={0.05 * i}>
                  <div className="glass group relative flex items-start gap-4 rounded-2xl p-5 transition-all hover:-translate-y-0.5 hover:border-(--accent)/40">
                    <span
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-white"
                      style={{
                        background: "linear-gradient(135deg, var(--accent), var(--accent-3))",
                      }}
                    >
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <div>
                      <div className="font-display font-semibold">
                        {t(`highlights.${key}.title`)}
                      </div>
                      <p className="mt-1 text-(--muted) text-sm">{t(`highlights.${key}.desc`)}</p>
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
