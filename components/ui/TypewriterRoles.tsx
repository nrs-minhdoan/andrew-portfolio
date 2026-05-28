"use client";

import { useEffect, useState } from "react";

interface Props {
  roles: string[];
}

/**
 * SSR-friendly typewriter. First render outputs the full first role so the
 * HTML payload contains keyword-rich H1 text for SEO crawlers. After mount,
 * the deleting/typing cycle kicks in and rotates through the rest.
 */
export function TypewriterRoles({ roles }: Props) {
  const first = roles[0] ?? "";
  const [text, setText] = useState(first);
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"hold" | "typing" | "pausing" | "deleting">("hold");
  // Locale switch swaps the roles array. useState's initial value already ran,
  // so text/index are stuck on the previous language. Detect identity change
  // and reset to the new first role (React's derived-state-during-render pattern).
  const [prevRoles, setPrevRoles] = useState(roles);
  if (prevRoles !== roles) {
    setPrevRoles(roles);
    setText(roles[0] ?? "");
    setIndex(0);
    setPhase("hold");
  }

  useEffect(() => {
    if (roles.length <= 1) return;
    if (phase === "hold") {
      const t = window.setTimeout(() => setPhase("deleting"), 1800);
      return () => window.clearTimeout(t);
    }
    const current = roles[index]!;
    if (phase === "typing") {
      if (text.length < current.length) {
        const t = window.setTimeout(() => setText(current.slice(0, text.length + 1)), 55);
        return () => window.clearTimeout(t);
      }
      const t = window.setTimeout(() => setPhase("deleting"), 1600);
      return () => window.clearTimeout(t);
    }
    if (phase === "deleting") {
      if (text.length > 0) {
        const t = window.setTimeout(() => setText(current.slice(0, text.length - 1)), 28);
        return () => window.clearTimeout(t);
      }
      const next = (index + 1) % roles.length;
      setIndex(next);
      setPhase("typing");
    }
  }, [text, phase, index, roles]);

  return <span className="caret mono block min-h-[2lh] text-(--accent) lg:min-h-lh">{text}</span>;
}
