import { ArrowUpRight, Award, Users } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { TechIcon } from "@/components/ui/TechBadge";
import { PROJECTS, TECHS } from "@/data/portfolio";
import { getFaviconUrl } from "@/lib/favicon";

const PLACEHOLDER = "/projects/placeholder.svg";

/**
 * "Card link" pattern: the project title becomes the card-wide anchor via an
 * `::after` overlay (`after:absolute after:inset-0`). All other interactive
 * elements inside the card (tech icon anchors, etc.) set `relative z-10` so
 * they sit above the overlay and intercept clicks first. Avoids nested `<a>`
 * (invalid HTML) while still making the whole card clickable.
 */
export function Projects() {
  const t = useTranslations("Projects");
  const featured = PROJECTS.filter((p) => p.featured);

  return (
    <section id="projects" data-section="projects" className="relative">
      <div className="bg-grid absolute inset-0 opacity-50" aria-hidden />
      <div className="container-page relative">
        <SectionHeader
          label={t("label")}
          title={<span className="gradient-text">{t("title")}</span>}
          subtitle={t("subtitle")}
        />

        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, i) => {
            const favicon = project.url ? getFaviconUrl(project.url) : null;
            // Project logo (if supplied) takes precedence over remote favicon
            // for every icon slot — sharper, brand-correct, no network call.
            const icon = project.image ?? favicon;
            const projectName = t(`items.${project.slug}.name`);
            return (
              <Reveal as="li" key={project.slug} delay={i * 0.05}>
                <SpotlightCard className="glass group relative h-full overflow-hidden rounded-2xl transition-all focus-within:border-(--accent)/60 hover:-translate-y-1 hover:border-(--accent)/40">
                  <div className="relative aspect-video overflow-hidden border-b border-(--border)">
                    <Image
                      src={PLACEHOLDER}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-linear-to-tr from-(--bg)/40 via-transparent to-(--accent)/10"
                    />
                    {icon ? (
                      <span
                        className={`absolute right-3 bottom-3 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-(--border) p-1.5 shadow-lg backdrop-blur ${project.logoLightBg ? "bg-white" : "bg-(--bg)/85"}`}
                      >
                        <Image
                          src={icon}
                          alt=""
                          width={36}
                          height={36}
                          className="h-full w-full object-contain"
                          unoptimized
                        />
                      </span>
                    ) : null}
                    {project.awards?.length ? (
                      <span
                        title={project.awards.join(" · ")}
                        className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-(--accent-3)/90 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-white uppercase shadow"
                      >
                        <Award className="h-3 w-3" aria-hidden />
                        {project.awards.length > 1 ? (
                          <>
                            award
                            <span className="rounded-full bg-white/25 px-1.5 py-px text-[9px] leading-none font-bold">
                              ×{project.awards.length}
                            </span>
                          </>
                        ) : (
                          "award"
                        )}
                      </span>
                    ) : null}
                  </div>
                  <div className="space-y-3 p-5">
                    <header className="flex items-start justify-between gap-3">
                      <h3 className="font-display flex items-center gap-2 text-lg leading-tight font-bold">
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
                        ) : null}
                        {project.url ? (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${projectName} — visit site`}
                            className="after:absolute after:inset-0 after:cursor-pointer hover:text-(--accent) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
                          >
                            {projectName}
                          </a>
                        ) : (
                          projectName
                        )}
                      </h3>
                      <ArrowUpRight className="h-5 w-5 shrink-0 text-(--muted) transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-(--accent)" />
                    </header>
                    <p className="text-sm text-(--muted)">{t(`items.${project.slug}.summary`)}</p>
                    <div className="flex items-center gap-3 text-xs text-(--muted)">
                      <span>{project.period}</span>
                      <span className="inline-flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" aria-hidden /> {project.teamSize}
                      </span>
                    </div>
                    {/* Tech list sits above the card-link overlay via z-10 so
                        each chip intercepts its own click before the project
                        anchor fires. */}
                    <ul className="relative z-10 flex flex-wrap items-center gap-2 pt-1">
                      {project.techs.slice(0, 6).map((k) => {
                        const tech = TECHS[k];
                        const icon = <TechIcon techKey={k} size={20} />;
                        return (
                          <li key={k}>
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
                      {project.techs.length > 6 ? (
                        <li className="text-xs text-(--muted)">+{project.techs.length - 6}</li>
                      ) : null}
                    </ul>
                  </div>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </ul>

        <Reveal className="mt-10 flex justify-center" delay={0.1}>
          <a
            href="#experience"
            className="inline-flex items-center gap-2 rounded-full border border-(--border-strong) px-5 py-2.5 text-sm font-semibold transition-colors hover:border-(--accent)/60 hover:bg-(--accent)/5"
          >
            {t("viewAll")} <ArrowUpRight className="h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
