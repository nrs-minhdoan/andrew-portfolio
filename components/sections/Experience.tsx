import cx from "classnames";
import { ArrowUpRight, Briefcase, Users } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { spellNumber } from "@/lib/spell-number";
import { AwardBadge } from "@/components/ui/AwardBadge";
import { LogoMark } from "@/components/ui/LogoMark";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TechList } from "@/components/ui/TechList";
import {
  COMPANIES,
  type CompanySlug,
  OFFSHORE_ENGAGEMENTS,
  PROJECTS,
  STATS,
} from "@/data/portfolio";
import { getProjectIcon } from "@/lib/project-icon";
import { ACCENT_GRADIENT, STAGGER } from "@/lib/theme";
import type { ProjectSpec } from "@/types/project";

export function Experience() {
  const t = useTranslations("Experience");
  const tProjects = useTranslations("Projects");
  const locale = useLocale();

  return (
    <section id="experience" data-section="experience" className="relative">
      <div className="container-page">
        <SectionHeader
          label={t("label")}
          title={<span className="gradient-text">{t("title")}</span>}
          subtitle={t("subtitle", {
            years: spellNumber(STATS.yearsExperience, locale),
            leadingYears: spellNumber(STATS.yearsLeading, locale),
          })}
        />

        <ol className="relative space-y-10 md:space-y-12">
          <span
            aria-hidden
            className="pointer-events-none absolute top-2 bottom-2 left-1.5 w-px bg-linear-to-b from-transparent via-(--accent)/40 to-transparent md:left-4 md:via-(--accent)/50"
          />
          {COMPANIES.map((company, idx) => {
            const slug = company.slug as CompanySlug;
            const items = PROJECTS.filter((p) => p.company === slug);
            return (
              <Reveal as="li" key={slug} delay={idx * STAGGER} className="relative pl-6 md:pl-14">
                <span
                  aria-hidden
                  className={cx(
                    "absolute top-1.5 left-1.5 block aspect-square w-3 -translate-x-1/2 rounded-full md:left-4 md:w-5",
                    { "present-dot": company.ongoing },
                  )}
                  style={{
                    flex: "none",
                    background: company.ongoing ? "#22c55e" : ACCENT_GRADIENT,
                    boxShadow: company.ongoing
                      ? "0 0 0 3px var(--bg), 0 0 0 4px #22c55e, 0 0 12px 1px rgba(34,197,94,0.55)"
                      : "0 0 0 3px var(--bg), 0 0 0 4px var(--border-strong)",
                  }}
                />
                <header className="mb-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h3 className="font-display text-xl font-bold sm:text-2xl">
                    {t(`companies.${slug}.title`)},{" "}
                    {company.url ? (
                      <a
                        href={company.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${t(`companies.${slug}.org`)} - visit site`}
                        className="text-(--accent) underline decoration-(--accent)/30 underline-offset-4 transition-colors hover:decoration-(--accent) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
                      >
                        {t(`companies.${slug}.org`)}
                      </a>
                    ) : (
                      <span className="text-(--accent)">{t(`companies.${slug}.org`)}</span>
                    )}
                  </h3>
                  <span className="text-xs tracking-widest text-(--muted) uppercase">
                    {company.period}
                  </span>
                  {company.ongoing ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-green-500/40 bg-green-500/10 px-2 py-0.5 text-[10px] font-semibold tracking-[0.14em] text-green-500 uppercase dark:text-green-400">
                      <span
                        aria-hidden
                        className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-green-500 dark:bg-green-400"
                      />
                      {t("present")}
                    </span>
                  ) : null}
                </header>

                <ul className="grid gap-3 md:grid-cols-2">
                  {items.map((project) => (
                    <ProjectCard
                      key={project.slug}
                      project={project}
                      roleLabel={t(`roles.${project.role}`)}
                      awardLabel={t("award")}
                      responsibilitiesLabel={t("responsibilities")}
                      name={tProjects(`items.${project.slug}.name`)}
                      summary={tProjects(`items.${project.slug}.summary`)}
                      responsibilities={tProjects(`items.${project.slug}.responsibilities`)}
                    />
                  ))}
                </ul>

                {OFFSHORE_ENGAGEMENTS[slug]?.engagements.length ? (
                  <div className="glass mt-4 rounded-xl px-4 py-3">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.14em] text-(--muted)/80 uppercase">
                        <span
                          aria-hidden
                          className="inline-block h-1.5 w-1.5 rounded-full bg-(--muted)/50"
                        />
                        {t("offshoreLabel")}
                      </span>
                      <ul className="flex flex-wrap gap-1.5">
                        {OFFSHORE_ENGAGEMENTS[slug]?.engagements.map((e) => {
                          const logo = getProjectIcon(e.url, e.image);
                          const mark = logo ? (
                            <LogoMark src={logo} lightBg={e.logoLightBg} />
                          ) : null;
                          return (
                            <li key={e.name}>
                              {e.url ? (
                                <a
                                  href={e.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label={`${e.name} - visit site`}
                                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-(--border) py-0.5 pr-2.5 pl-1 text-xs text-(--muted) transition-colors hover:border-(--accent)/60 hover:text-(--fg)"
                                >
                                  {mark}
                                  {e.name}
                                </a>
                              ) : (
                                <span className="inline-flex items-center gap-1.5 rounded-full border border-(--border) py-0.5 pr-2.5 pl-1 text-xs text-(--muted)">
                                  {mark}
                                  {e.name}
                                </span>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    <div className="mt-3 border-t border-(--border)/60 pt-3">
                      <p className="mb-1.5 text-[10px] font-semibold tracking-[0.14em] text-(--muted)/80 uppercase">
                        {t("responsibilities")}
                      </p>
                      <p className="text-xs leading-relaxed text-(--muted)">
                        {t("offshoreResponsibilities")}
                      </p>
                    </div>
                    {OFFSHORE_ENGAGEMENTS[slug]?.techs?.length ? (
                      <TechList
                        techs={OFFSHORE_ENGAGEMENTS[slug]?.techs ?? []}
                        className="relative z-10 mt-3"
                      />
                    ) : null}
                  </div>
                ) : null}
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

interface CardProps {
  project: ProjectSpec;
  roleLabel: string;
  awardLabel: string;
  responsibilitiesLabel: string;
  name: string;
  summary: string;
  responsibilities: string;
}

function ProjectCard({
  project,
  roleLabel,
  awardLabel,
  responsibilitiesLabel,
  name,
  summary,
  responsibilities,
}: CardProps) {
  const icon = getProjectIcon(project.url, project.image);
  return (
    <li className="glass group relative block overflow-hidden rounded-2xl p-5 transition-all focus-within:border-(--accent)/60 hover:-translate-y-0.5 hover:border-(--accent)/40">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="font-display flex items-center gap-2.5 text-base font-bold">
            {icon ? (
              <LogoMark src={icon} size={32} lightBg={project.logoLightBg} />
            ) : (
              <Briefcase className="h-5 w-5 text-(--accent)" aria-hidden />
            )}
            {project.url ? (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name} - visit site`}
                className="after:absolute after:inset-0 after:cursor-pointer hover:text-(--accent) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
              >
                {name}
              </a>
            ) : (
              name
            )}
            {project.url ? (
              <ArrowUpRight
                className="h-3.5 w-3.5 text-(--muted) opacity-0 transition-opacity group-hover:opacity-100"
                aria-hidden
              />
            ) : null}
          </h4>
          <p className="mt-1 text-xs text-(--muted)">{project.period}</p>
        </div>
        {project.awards?.length ? (
          <AwardBadge awards={project.awards} label={awardLabel} variant="outline" />
        ) : null}
      </div>
      <p className="mt-3 line-clamp-2 min-h-10 text-sm text-(--muted)">{summary}</p>
      <div className="mt-3 flex items-center gap-3 text-xs text-(--muted)">
        <span className="inline-flex items-center gap-1">
          <Users className="h-3.5 w-3.5" aria-hidden /> {project.teamSize}
        </span>
        <span className="inline-flex items-center gap-1 rounded-full border border-(--border) px-2 py-0.5">
          {roleLabel}
        </span>
      </div>
      {responsibilities ? (
        <div className="mt-3 border-t border-(--border)/60 pt-3">
          <p className="mb-1.5 text-[10px] font-semibold tracking-[0.14em] text-(--muted)/80 uppercase">
            {responsibilitiesLabel}
          </p>
          <p className="text-xs leading-relaxed text-(--muted)">{responsibilities}</p>
        </div>
      ) : null}
      {/* Tech list above the card-link overlay (z-10) so each chip click
          targets the tech's official site, not the project URL. */}
      <TechList techs={project.techs} className="relative z-10 mt-4" />
    </li>
  );
}
