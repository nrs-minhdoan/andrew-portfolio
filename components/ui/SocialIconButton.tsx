import type { ReactNode } from "react";

interface Props {
  href: string;
  label: string;
  children: ReactNode;
  size?: "sm" | "md";
  className?: string;
}

const SIZE_CLASS: Record<"sm" | "md", string> = {
  sm: "h-8 w-8",
  md: "h-8 w-8 sm:h-9 sm:w-9",
};

/**
 * Round social icon link. Used in footer + contact card for LinkedIn / GitHub
 * / Facebook icons. Always opens in a new tab.
 */
export function SocialIconButton({ href, label, children, size = "md", className }: Props) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center rounded-full border border-(--border) transition-colors hover:border-(--accent)/60 hover:text-(--accent) ${SIZE_CLASS[size]} ${className ?? ""}`}
    >
      {children}
    </a>
  );
}
