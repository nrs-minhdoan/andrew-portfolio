import { ArrowUpRight, Award, Briefcase, Users } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TechIcon } from "@/components/ui/TechBadge";
import {
  COMPANIES,
  type CompanySlug,
  OFFSHORE_ENGAGEMENTS,
  PROJECTS,
  TECHS,
} from "@/data/portfolio";
import { getFaviconUrl } from "@/lib/favicon";
import type { ProjectSpec } from "@/types/project";

export function Experience() {
  const t = useTranslations("Experience");
  const tProjects = useTranslations("Projects");

  return (
    <section id="experience" data-section="experience" className="relative">
      <div className="container-page">
        <SectionHeader
          label={t("label")}
          title={<span className="gradient-text">{t("title")}</span>}
          subtitle={t("subtitle")}
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
              <Reveal as="li" key={slug} delay={idx * 0.05} className="relative pl-6 md:pl-14">
                <span
                  aria-hidden
                  className="absolute top-1.5 left-0 h-3 w-3 rounded-full md:top-1.5 md:left-2 md:h-5 md:w-5"
                  style={{
                    background: "linear-gradient(135deg, var(--accent), var(--accent-3))",
                    boxShadow: "0 0 0 3px var(--bg), 0 0 0 4px var(--border-strong)",
                  }}
                />
                <header className="mb-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h3 className="font-display text-xl font-bold sm:text-2xl">
                    {t(`companies.${slug}.title`)},{" "}
                    <span className="text-(--accent)">{t(`companies.${slug}.org`)}</span>
                  </h3>
                  <span className="text-xs tracking-widest text-(--muted) uppercase">
                    {company.period}
                    {company.ongoing ? ` · ${t("present")}` : ""}
                  </span>
                </header>

                <ul className="grid gap-3 md:grid-cols-2">
                  {items.map((project) => (
                    <ProjectCard
                      key={project.slug}
                      project={project}
                      roleLabel={t(`roles.${project.role}`)}
                      name={tProjects(`items.${project.slug}.name`)}
                      summary={tProjects(`items.${project.slug}.summary`)}
                    />
                  ))}
                </ul>

                {OFFSHORE_ENGAGEMENTS[slug]?.length ? (
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
                        {OFFSHORE_ENGAGEMENTS[slug]?.map((e) => (
                          <li key={e.name}>
                            {e.url ? (
                              <a
                                href={e.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${e.name} — visit site`}
                                className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-(--border) px-2.5 py-0.5 text-xs text-(--muted) transition-colors hover:border-(--accent)/60 hover:text-(--fg)"
                              >
                                <Image
                                  src={getFaviconUrl(e.url)}
                                  alt=""
                                  width={12}
                                  height={12}
                                  className="h-3 w-3 shrink-0 rounded-sm"
                                  unoptimized
                                />
                                {e.name}
                              </a>
                            ) : (
                              <span className="rounded-full border border-(--border) px-2.5 py-0.5 text-xs text-(--muted)">
                                {e.name}
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
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
  name: string;
  summary: string;
}

function ProjectCard({ project, roleLabel, name, summary }: CardProps) {
  const favicon = project.url ? getFaviconUrl(project.url) : null;
  // Prefer the supplied logo over a remote favicon for the title icon slot.
  const icon = project.image ?? favicon;
  return (
    <li className="glass group relative block overflow-hidden rounded-2xl p-5 transition-all focus-within:border-(--accent)/60 hover:-translate-y-0.5 hover:border-(--accent)/40">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="font-display flex items-center gap-2 text-base font-bold">
            {icon ? (
              <span
                className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded p-0.5 ${project.logoLightBg ? "bg-white" : ""}`}
              >
                <Image
                  src={icon}
                  alt=""
                  width={20}
                  height={20}
                  className="h-full w-full object-contain"
                  unoptimized
                />
              </span>
            ) : (
              <Briefcase className="h-4 w-4 text-(--accent)" aria-hidden />
            )}
            {project.url ? (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name} — visit site`}
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
          <span
            title={project.awards.join(" · ")}
            className="inline-flex items-center gap-1.5 rounded-full border border-(--accent-3)/40 bg-(--accent-3)/10 px-2 py-1 text-[10px] font-semibold tracking-wider text-(--accent-3) uppercase"
          >
            <Award className="h-3 w-3" aria-hidden />
            {project.awards.length > 1 ? (
              <>
                award
                <span className="rounded-full bg-(--accent-3)/25 px-1.5 py-px text-[9px] leading-none font-bold">
                  ×{project.awards.length}
                </span>
              </>
            ) : (
              "award"
            )}
          </span>
        ) : null}
      </div>
      <p className="mt-3 text-sm text-(--muted)">{summary}</p>
      <div className="mt-3 flex items-center gap-3 text-xs text-(--muted)">
        <span className="inline-flex items-center gap-1">
          <Users className="h-3.5 w-3.5" aria-hidden /> {project.teamSize}
        </span>
        <span className="inline-flex items-center gap-1 rounded-full border border-(--border) px-2 py-0.5">
          {roleLabel}
        </span>
      </div>
      {/* Tech list above the card-link overlay (z-10) so each chip click
          targets the tech's official site, not the project URL. */}
      <ul className="relative z-10 mt-4 flex flex-wrap items-center gap-2">
        {project.techs.slice(0, 8).map((k) => {
          const tech = TECHS[k];
          const icon = <TechIcon techKey={k} size={20} />;
          return (
            <li key={k} title={k}>
              {tech?.url ? (
                <a
                  href={tech.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${tech.name} — official site`}
                  className="inline-flex cursor-pointer rounded transition-transform hover:scale-110 focus-visible:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
                >
                  {icon}
                </a>
              ) : (
                icon
              )}
            </li>
          );
        })}
        {project.techs.length > 8 ? (
          <li className="text-xs text-(--muted)">+{project.techs.length - 8}</li>
        ) : null}
      </ul>
    </li>
  );
}
