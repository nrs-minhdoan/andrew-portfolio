import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TechBadge, TechIcon } from "@/components/ui/TechBadge";
import { INTEGRATION_STACKS, MAIN_STACKS, TECHS } from "@/data/portfolio";

export function Skills() {
  const t = useTranslations("Skills");

  return (
    <section id="skills" data-section="skills" className="relative">
      <div className="aurora opacity-40" aria-hidden />
      <div className="container-page relative">
        <SectionHeader
          label={t("label")}
          title={
            <>
              <span className="gradient-text">{t("title").split(".")[0]}.</span>
              <span className="gradient-text ml-2">⚡</span>
            </>
          }
          subtitle={t("subtitle")}
        />

        <Reveal className="mb-6 flex items-center gap-3">
          <h3 className="font-display font-semibold text-(--muted) text-sm uppercase tracking-widest">
            {t("mainStacks")}
          </h3>
          <span className="h-px flex-1 bg-(--border)" />
        </Reveal>

        <Reveal>
          <ul className="grid w-full grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-5">
            {MAIN_STACKS.map((key) => {
              const tech = TECHS[key];
              const cardBody = (
                <>
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-(--bg)/40 transition-transform group-hover:scale-110 sm:h-14 sm:w-14">
                    <TechIcon techKey={key} size={28} />
                  </span>
                  <span className="line-clamp-1 break-all font-semibold text-xs sm:text-sm">
                    {tech.name}
                  </span>
                  <span
                    aria-hidden
                    className="absolute inset-0 -z-10 rounded-2xl opacity-0 blur-2xl transition-opacity group-hover:opacity-30"
                    style={{
                      background: `radial-gradient(60% 60% at 50% 50%, ${tech.color}, transparent)`,
                    }}
                  />
                </>
              );
              const cardClass =
                "glass group relative flex h-full min-w-0 flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl p-3 text-center transition-all hover:-translate-y-1 hover:border-(--accent)/40 sm:gap-3 sm:p-5";
              return (
                <li key={key}>
                  {tech.url ? (
                    <a
                      href={tech.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${tech.name} — official site`}
                      className={`${cardClass} cursor-pointer focus-visible:outline-2 focus-visible:outline-(--accent) focus-visible:outline-offset-2`}
                    >
                      {cardBody}
                    </a>
                  ) : (
                    <div className={cardClass}>{cardBody}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </Reveal>

        <Reveal className="mt-14 mb-6 flex items-center gap-3">
          <h3 className="font-display font-semibold text-(--muted) text-sm uppercase tracking-widest">
            {t("integrationStacks")}
          </h3>
          <span className="h-px flex-1 bg-(--border)" />
        </Reveal>

        <Reveal>
          <div className="marquee py-2" style={{ ["--marquee-duration" as string]: "35s" }}>
            <div className="marquee-track">
              {[...INTEGRATION_STACKS, ...INTEGRATION_STACKS].map((key, idx) => (
                <TechBadge key={`${key}-${idx}`} techKey={key} size="md" />
              ))}
            </div>
          </div>
          <div
            className="marquee mt-4 py-2"
            data-reverse="true"
            style={{ ["--marquee-duration" as string]: "45s" }}
          >
            <div className="marquee-track">
              {[...INTEGRATION_STACKS]
                .reverse()
                .concat([...INTEGRATION_STACKS].reverse())
                .map((key, idx) => (
                  <TechBadge key={`${key}-r-${idx}`} techKey={key} size="md" />
                ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
