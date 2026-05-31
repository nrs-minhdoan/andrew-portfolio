import cx from "classnames";
import { Award } from "lucide-react";

interface Props {
  awards: readonly string[];
  label: string;
  variant?: "solid" | "outline";
  className?: string;
}

/**
 * Award marker chip. `solid` reads on photo backgrounds (Projects grid),
 * `outline` reads inside glass cards (Experience cards).
 */
export function AwardBadge({ awards, label, variant = "solid", className }: Props) {
  const base =
    "inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-wider uppercase";
  const skin =
    variant === "solid"
      ? "rounded-full bg-(--accent-3)/90 px-2.5 py-1 text-white shadow"
      : "rounded-full border border-(--accent-3)/40 bg-(--accent-3)/10 px-2 py-1 text-(--accent-3)";
  const countSkin =
    variant === "solid"
      ? "rounded-full bg-white/25 px-1.5 py-px text-[9px] leading-none font-bold"
      : "rounded-full bg-(--accent-3)/25 px-1.5 py-px text-[9px] leading-none font-bold";
  return (
    <span title={awards.join(" · ")} className={cx(base, skin, className)}>
      <Award className="h-3 w-3" aria-hidden />
      {label}
      {awards.length > 1 ? <span className={countSkin}>×{awards.length}</span> : null}
    </span>
  );
}
