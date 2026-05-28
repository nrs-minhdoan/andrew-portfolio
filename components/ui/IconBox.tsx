import type { CSSProperties, ReactNode } from "react";
import { ACCENT_GRADIENT } from "@/lib/theme";

type Size = "sm" | "md" | "lg";

interface Props {
  children: ReactNode;
  size?: Size;
  variant?: "gradient" | "muted";
  className?: string;
  style?: CSSProperties;
}

const SIZE_CLASS: Record<Size, string> = {
  sm: "h-9 w-9 sm:h-10 sm:w-10 rounded-xl",
  md: "h-10 w-10 sm:h-14 sm:w-14 rounded-xl",
  lg: "h-11 w-11 sm:h-12 sm:w-12 rounded-xl",
};

/**
 * Decorative icon plate. `gradient` paints the accent → accent-3 ramp behind
 * white-tinted lucide icons (Hero stats, Contact rows). `muted` is a subtle
 * neutral plate for hover effects (Skills cards). Pass `style` to override
 * the gradient (e.g. reversed ramp for Achievements trophies).
 */
export function IconBox({ children, size = "md", variant = "gradient", className, style }: Props) {
  const skin: CSSProperties =
    variant === "gradient" ? { background: ACCENT_GRADIENT, ...style } : { ...style };
  return (
    <span
      className={`grid shrink-0 place-items-center text-white ${SIZE_CLASS[size]} ${variant === "muted" ? "bg-(--bg)/40" : ""} ${className ?? ""}`}
      style={skin}
    >
      {children}
    </span>
  );
}
