"use client";

import { track } from "@vercel/analytics";
import { useEffect } from "react";

const SECTION_IDS = [
  "hero",
  "about",
  "skills",
  "projects",
  "experience",
  "achievements",
  "contact",
];

const VISIBILITY_THRESHOLD = 0.5;
const MIN_DWELL_MS = 2000;

/**
 * Tracks how long each section stays >50% visible in the viewport and emits a
 * `section_dwell` custom event to Vercel Analytics when the user leaves the
 * section (scroll out, navigate away, or close tab). Dwells under 2s are
 * dropped as accidental scroll-through. Each section accumulates time across
 * multiple visits within the same page lifetime — the flush sends the total.
 */
export function SectionDwellTracker() {
  useEffect(() => {
    const dwell = new Map<string, number>();
    const enteredAt = new Map<string, number>();

    const accumulate = (id: string) => {
      const start = enteredAt.get(id);
      if (start === undefined) return;
      const delta = performance.now() - start;
      dwell.set(id, (dwell.get(id) ?? 0) + delta);
      enteredAt.delete(id);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const id = (e.target as HTMLElement).id;
          if (!id) continue;
          if (e.intersectionRatio >= VISIBILITY_THRESHOLD) {
            if (!enteredAt.has(id)) enteredAt.set(id, performance.now());
          } else {
            accumulate(id);
          }
        }
      },
      { threshold: [0, VISIBILITY_THRESHOLD, 1] },
    );

    const observed: HTMLElement[] = [];
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
        observed.push(el);
      }
    }

    const flush = () => {
      for (const id of enteredAt.keys()) accumulate(id);
      for (const [id, ms] of dwell) {
        if (ms < MIN_DWELL_MS) continue;
        track("section_dwell", { section: id, ms: Math.round(ms) });
      }
      dwell.clear();
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") flush();
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pagehide", flush);

    return () => {
      flush();
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pagehide", flush);
      observed.length = 0;
    };
  }, []);

  return null;
}
