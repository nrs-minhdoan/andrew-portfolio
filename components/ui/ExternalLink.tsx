import type { AnchorHTMLAttributes, ReactNode } from "react";

interface Props extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "target" | "rel"> {
  href: string;
  children: ReactNode;
}

/**
 * Anchor pre-set for outbound links. Pins `target=_blank` + safe `rel` so
 * call sites don't repeat the pair. Any other anchor attributes pass through.
 */
export function ExternalLink({ href, children, ...rest }: Props) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );
}
