import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TechBadge, TechIcon } from "@/components/ui/TechBadge";
import { TECH_LIST } from "@/data/portfolio";

const MAIN_STACKS = TECH_LIST.filter((t) => t.type === "main");
const INTEGRATION_STACKS_BIG = TECH_LIST.filter((t) => t.type === "big_integration");
const INTEGRATION_STACKS_SMALL = TECH_LIST.filter((t) => t.type === "small_integration");

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
          <h3 className="font-display text-sm font-semibold tracking-widest text-(--muted) uppercase">
            {t("mainStacks")}
          </h3>
          <span className="h-px flex-1 bg-(--border)" />
        </Reveal>

        <Reveal>
          <ul className="grid w-full grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-5">
            {MAIN_STACKS.map((tech) => {
              const cardBody = (
                <>
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-(--bg)/40 transition-transform group-hover:scale-110 sm:h-14 sm:w-14">
                    <TechIcon techKey={tech.key} size={28} />
                  </span>
                  <span className="line-clamp-1 text-xs font-semibold break-all sm:text-sm">
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
                <li key={tech.key}>
                  {tech.url ? (
                    <a
                      href={tech.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${tech.name} — official site`}
                      className={`${cardClass} cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)`}
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
          <h3 className="font-display text-sm font-semibold tracking-widest text-(--muted) uppercase">
            {t("integrationStacks")}
          </h3>
          <span className="h-px flex-1 bg-(--border)" />
        </Reveal>

        <Reveal>
          <div className="marquee py-2" style={{ ["--marquee-duration" as string]: "35s" }}>
            <div className="marquee-track">
              {[...INTEGRATION_STACKS_BIG, ...INTEGRATION_STACKS_BIG].map((tech, idx) => (
                <TechBadge key={`${tech.key}-${idx}`} techKey={tech.key} size="md" />
              ))}
            </div>
          </div>
          <div
            className="marquee mt-4 py-2"
            data-reverse="true"
            style={{ ["--marquee-duration" as string]: "45s" }}
          >
            <div className="marquee-track">
              {[...INTEGRATION_STACKS_SMALL, ...INTEGRATION_STACKS_SMALL].map((tech, idx) => (
                <TechBadge key={`${tech.key}-r-${idx}`} techKey={tech.key} size="md" />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
