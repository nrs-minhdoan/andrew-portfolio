import { TECHS, type TechKey } from "@/data/portfolio";
import { TechIcon } from "@/components/ui/TechBadge";

interface Props {
  techs: readonly TechKey[];
  max?: number;
  size?: number;
  className?: string;
}

/**
 * Horizontal tech-icon row used by project cards. Each chip links to the
 * tech's official site; surplus items beyond `max` collapse into a "+N"
 * counter. Wrapped in `relative z-10` by the caller when sitting above a
 * card-link overlay so chip clicks aren't swallowed.
 */
export function TechList({ techs, max = 8, size = 20, className }: Props) {
  const visible = techs.slice(0, max);
  const overflow = techs.length - max;
  return (
    <ul className={`flex flex-wrap items-center gap-2 ${className ?? ""}`}>
      {visible.map((k) => {
        const tech = TECHS[k];
        const icon = <TechIcon techKey={k} size={size} />;
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
      {overflow > 0 ? <li className="text-xs text-(--muted)">+{overflow}</li> : null}
    </ul>
  );
}
