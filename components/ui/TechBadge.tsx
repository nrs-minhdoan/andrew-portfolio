import cx from "classnames";
import type { ReactNode } from "react";
import { TECHS, type TechKey } from "@/data/portfolio";

const DEVICON_BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

interface Props {
  techKey: TechKey;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

const SIZES: Record<"sm" | "md" | "lg", { icon: number; badge: string }> = {
  sm: { icon: 16, badge: "h-7 px-2 text-xs gap-1.5" },
  md: { icon: 20, badge: "h-9 px-3 text-sm gap-2" },
  lg: { icon: 28, badge: "h-12 px-4 text-base gap-2.5" },
};

function resolveIconSrc(tech: (typeof TECHS)[TechKey]): string | null {
  if (tech.iconUrl) return tech.iconUrl;
  if (tech.icon) return `${DEVICON_BASE}/${tech.icon}`;
  return null;
}

function themeInvertClass(tech: (typeof TECHS)[TechKey]): string {
  return cx({
    "dark:invert": tech.invertOnDark,
    "invert-on-light": tech.invertOnLight,
  });
}

/**
 * Anchor when tech has an official URL, plain span otherwise. Same visual.
 * Keyboard / screen-reader semantics inherit from the chosen element.
 */
export function LinkOrSpan({
  url,
  name,
  className,
  style,
  children,
}: {
  url?: string;
  name: string;
  className?: string;
  style?: React.CSSProperties;
  children: ReactNode;
}) {
  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${name} — official site`}
        className={cx(className, "cursor-pointer")}
        style={style}
      >
        {children}
      </a>
    );
  }
  return (
    <span className={className} style={style} aria-label={name}>
      {children}
    </span>
  );
}

export function TechBadge({ techKey, size = "md", showLabel = true }: Props) {
  const tech = TECHS[techKey];
  if (!tech) return null;
  const { icon, badge } = SIZES[size];
  const src = resolveIconSrc(tech);
  return (
    <LinkOrSpan
      url={tech.url}
      name={tech.name}
      className={cx(
        "inline-flex items-center rounded-full border border-(--border) bg-(--card) backdrop-blur-sm transition-all hover:border-(--accent)/40 hover:bg-(--accent)/5",
        badge,
      )}
      style={{ ["--tech-color" as string]: tech.color }}
    >
      {src ? (
        <img
          src={src}
          alt=""
          width={icon}
          height={icon}
          className={cx("h-[1em] w-[1em] shrink-0 object-contain", themeInvertClass(tech))}
          loading="eager"
          decoding="async"
        />
      ) : (
        <span
          className="grid h-[1.2em] w-[1.2em] place-items-center rounded-sm text-[0.6em] font-bold text-white"
          style={{ background: tech.color }}
          aria-hidden
        >
          {tech.fallback ?? tech.name.slice(0, 2)}
        </span>
      )}
      {showLabel ? <span className="font-medium">{tech.name}</span> : null}
    </LinkOrSpan>
  );
}

/**
 * Bare icon. Does NOT auto-wrap in an anchor — consumers (Skills card,
 * Experience tech chips) decide whether to make the surrounding region
 * clickable. Avoids invalid nested `<a>` when the card itself is a link.
 */
export function TechIcon({ techKey, size = 28 }: { techKey: TechKey; size?: number }) {
  const tech = TECHS[techKey];
  if (!tech) return null;
  const src = resolveIconSrc(tech);
  return src ? (
    <img
      src={src}
      alt={tech.name}
      width={size}
      height={size}
      className={cx("shrink-0 object-contain", themeInvertClass(tech))}
      style={{ width: size, height: size }}
      loading="lazy"
      decoding="async"
    />
  ) : (
    <span
      className="grid place-items-center rounded font-bold text-white"
      style={{ width: size, height: size, background: tech.color, fontSize: size * 0.4 }}
      aria-label={tech.name}
    >
      {tech.fallback ?? tech.name.slice(0, 2)}
    </span>
  );
}
