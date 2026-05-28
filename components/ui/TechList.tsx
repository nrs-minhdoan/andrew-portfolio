"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { TECHS, type TechKey } from "@/data/portfolio";
import { TechIcon } from "@/components/ui/TechBadge";
import { sortTechs } from "@/lib/tech-sort";

interface Props {
  techs: readonly TechKey[];
  size?: number;
  className?: string;
}

const GAP_PX = 8; // matches Tailwind `gap-2`
const OVERFLOW_RESERVE = 36; // space for the "+N" pill

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Horizontal tech-icon row. Renders every chip; once mounted, measures the
 * row width and collapses the tail into a "+N" counter only when the chips
 * no longer fit. Techs render in priority order regardless of source array.
 */
export function TechList({ techs, size = 20, className }: Props) {
  const ordered = sortTechs(techs);
  const ref = useRef<HTMLUListElement>(null);
  const [visibleCount, setVisibleCount] = useState(ordered.length);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const compute = () => {
      const containerWidth = el.clientWidth;
      if (!containerWidth) return;

      const chipWidth = size + GAP_PX;
      const fullFit = Math.floor((containerWidth + GAP_PX) / chipWidth);
      if (fullFit >= ordered.length) {
        setVisibleCount(ordered.length);
        return;
      }
      const withOverflow = Math.floor((containerWidth - OVERFLOW_RESERVE + GAP_PX) / chipWidth);
      setVisibleCount(Math.max(1, withOverflow));
    };

    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ordered.length, size]);

  const visible = ordered.slice(0, visibleCount);
  const overflow = ordered.length - visible.length;

  return (
    <ul
      ref={ref}
      className={`flex flex-nowrap items-center gap-2 overflow-hidden ${className ?? ""}`}
    >
      {visible.map((k) => {
        const tech = TECHS[k];
        const icon = <TechIcon techKey={k} size={size} />;
        return (
          <li key={k} title={k} className="shrink-0">
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
      {overflow > 0 ? <li className="shrink-0 text-xs text-(--muted)">+{overflow}</li> : null}
    </ul>
  );
}
