"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
  as?: "div" | "section" | "li" | "article" | "header";
}

type RevealState = "idle" | "hidden" | "visible";

/**
 * SSR-safe scroll reveal. Content renders visible on first paint (no opacity:0
 * baked into HTML), so a slow mobile hydrate never leaves the page blank.
 * After mount an IntersectionObserver hides offscreen elements and animates
 * them in on entry. Above-fold elements stay visible with no animation.
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  once = true,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<RevealState>("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let first = true;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setState("visible");
            if (once) io.disconnect();
          } else if (first) {
            setState("hidden");
          } else if (!once) {
            setState("hidden");
          }
        }
        first = false;
      },
      { threshold: 0, rootMargin: "0px 0px -5% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  const style: React.CSSProperties | undefined =
    state === "hidden"
      ? {
          opacity: 0,
          transform: `translateY(${y}px)`,
          transition: "none",
          willChange: "opacity, transform",
        }
      : state === "visible"
        ? {
            opacity: 1,
            transform: "translateY(0)",
            transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
          }
        : undefined;

  return (
    <Tag ref={ref as never} className={className} style={style}>
      {children}
    </Tag>
  );
}
