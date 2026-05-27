import { Award, GraduationCap, Trophy } from "lucide-react";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ACHIEVEMENTS, EDUCATION } from "@/data/portfolio";

/* Sort by award date descending — most recent first. `new Date("Jan 2023")`
   handles both "Jan 2023" and "2023" forms. */
const ITEMS = [
  ...ACHIEVEMENTS.map((a) => ({ slug: a.slug, date: a.date, location: a.location })),
  { slug: "project-2022", date: "Jan 2023", location: "Ha Noi" },
  { slug: "project-2019", date: "Jan 2020", location: "Ha Noi" },
  { slug: "project-2018", date: "Jan 2019", location: "Ha Noi" },
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export function Achievements() {
  const t = useTranslations("Achievements");

  return (
    <section id="achievements" data-section="achievements" className="relative">
      <div className="container-page">
        <SectionHeader
          label={t("label")}
          title={<span className="gradient-text">{t("title")}</span>}
        />

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <ul className="grid gap-3 sm:grid-cols-2">
            {ITEMS.map((item, i) => (
              <Reveal as="li" key={item.slug} delay={i * 0.05}>
                <div className="glass group relative h-full overflow-hidden rounded-2xl p-5 transition-all hover:-translate-y-0.5 hover:border-(--accent)/40">
                  <div className="mb-3 inline-flex items-center gap-2">
                    <span
                      className="grid h-10 w-10 place-items-center rounded-xl text-white"
                      style={{
                        background: "linear-gradient(135deg, var(--accent-3), var(--accent))",
                      }}
                    >
                      <Trophy className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="text-xs tracking-widest text-(--muted) uppercase">
                      {item.date}
                    </span>
                  </div>
                  <h3 className="font-display text-base font-bold">
                    {t(`items.${item.slug}.title`)}
                  </h3>
                  <p className="mt-1 text-sm text-(--muted)">{t(`items.${item.slug}.desc`)}</p>
                  <Award
                    aria-hidden
                    className="pointer-events-none absolute -right-3 -bottom-3 h-24 w-24 text-(--accent)/5 transition-transform group-hover:scale-110"
                  />
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.1}>
            <div className="glass rounded-2xl p-6">
              <div className="mb-3 inline-flex items-center gap-2 text-xs tracking-widest text-(--muted) uppercase">
                <GraduationCap className="h-4 w-4 text-(--accent)" /> {t("education.label")}
              </div>
              <h3 className="font-display text-lg font-bold">{t("education.engineer")}</h3>
              <p className="mt-1 text-sm text-(--muted)">{EDUCATION.school}</p>
              <p className="mt-3 text-xs tracking-widest text-(--muted) uppercase">
                {EDUCATION.period} · {EDUCATION.location}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
