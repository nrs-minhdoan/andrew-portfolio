import cx from "classnames";
import { ArrowUpRight, Users } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { AwardBadge } from "@/components/ui/AwardBadge";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { TechList } from "@/components/ui/TechList";
import { PROJECTS } from "@/data/portfolio";
import { getProjectIcon } from "@/lib/project-icon";
import { STAGGER } from "@/lib/theme";

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
            const icon = getProjectIcon(project.url, project.image);
            const projectName = t(`items.${project.slug}.name`);
            const isMobile = project.previewMobile ?? project.role === "mobile";
            const previewSrc = project.preview ?? PLACEHOLDER;
            const objectPosition = project.previewFocus ?? "center top";
            const mobileBgPosition = project.previewFocus ?? "center 25%";
            const mobileBgSize = project.previewZoom ?? "180%";
            return (
              <Reveal as="li" key={project.slug} delay={i * STAGGER}>
                <SpotlightCard className="glass group relative h-full overflow-hidden rounded-2xl transition-all focus-within:border-(--accent)/60 hover:-translate-y-1 hover:border-(--accent)/40">
                  <div className="relative aspect-video overflow-hidden border-b border-(--border)">
                    {isMobile ? (
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-no-repeat transition-transform duration-700 group-hover:scale-105"
                        style={{
                          backgroundImage: `url(${previewSrc})`,
                          backgroundSize: mobileBgSize,
                          backgroundPosition: mobileBgPosition,
                        }}
                      />
                    ) : (
                      <Image
                        src={previewSrc}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        style={{ objectPosition }}
                      />
                    )}
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-linear-to-tr from-(--bg)/40 via-transparent to-(--accent)/10"
                    />
                    {icon ? (
                      <span
                        className={cx(
                          "absolute right-3 bottom-3 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-(--border-strong) p-1.5 shadow-[0_8px_24px_-4px_rgba(0,0,0,0.45),0_2px_6px_rgba(0,0,0,0.35),0_0_0_1px_rgba(255,255,255,0.06)] ring-1 ring-black/5 backdrop-blur",
                          project.logoLightBg ? "bg-white" : "bg-(--bg)/90",
                        )}
                      >
                        <img
                          src={icon}
                          alt=""
                          width={36}
                          height={36}
                          className="h-full w-full object-contain"
                          loading="lazy"
                          decoding="async"
                        />
                      </span>
                    ) : null}
                    {project.awards?.length ? (
                      <AwardBadge
                        awards={project.awards}
                        label={t("award")}
                        variant="solid"
                        className="absolute top-3 left-3"
                      />
                    ) : null}
                  </div>
                  <div className="space-y-3 p-5">
                    <header className="flex items-start justify-between gap-2">
                      <h3 className="font-display text-lg leading-tight font-bold">
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
                    <p className="line-clamp-2 min-h-10 text-sm text-(--muted)">
                      {t(`items.${project.slug}.summary`)}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-(--muted)">
                      <span>{project.period}</span>
                      <span className="inline-flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" aria-hidden /> {project.teamSize}
                      </span>
                    </div>
                    {/* Tech list sits above the card-link overlay via z-10 so
                        each chip intercepts its own click before the project
                        anchor fires. */}
                    <TechList techs={project.techs} className="relative z-10 pt-1" />
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
