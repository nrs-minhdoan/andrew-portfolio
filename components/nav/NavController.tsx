"use client";

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

export function NavController() {
  useEffect(() => {
    const header = document.querySelector<HTMLElement>("[data-nav-shell]");
    if (!header) return;

    // Multiple anchors can share the same data-nav-link (desktop nav +
    // mobile menu both list the same sections). Store every match per id
    // so each gets the data-active toggle.
    const links = new Map<string, HTMLElement[]>();
    header.querySelectorAll<HTMLElement>("[data-nav-link]").forEach((el) => {
      const id = el.dataset.navLink;
      if (!id) return;
      const bucket = links.get(id);
      if (bucket) bucket.push(el);
      else links.set(id, [el]);
    });

    const sections: { id: string; el: HTMLElement }[] = [];
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) sections.push({ id, el });
    });
    if (!sections.length) return;

    let activeId = "";
    const setActive = (id: string | undefined) => {
      if (!id || id === activeId) return;
      activeId = id;
      for (const [linkId, els] of links) {
        for (const el of els) {
          if (linkId === id) el.setAttribute("data-active", "true");
          else el.removeAttribute("data-active");
        }
      }
    };

    let scheduled = false;
    const compute = () => {
      scheduled = false;
      const headerH = header.getBoundingClientRect().height;
      const scrollY = window.scrollY;
      const docH = document.documentElement.scrollHeight;
      const winH = window.innerHeight;

      if (scrollY > 16) header.setAttribute("data-scrolled", "true");
      else header.removeAttribute("data-scrolled");

      if (scrollY + winH >= docH - 24) {
        setActive(sections[sections.length - 1]?.id);
        return;
      }

      // Probe at ~35% from top of viewport: a section becomes "active" once
      // its top has scrolled into the upper third of the viewport. Triggers
      // early enough to feel responsive without flicker on short sections.
      const probe = scrollY + headerH + winH * 0.35;
      let current = sections[0]?.id;
      for (const s of sections) {
        const top = s.el.offsetTop;
        if (top <= probe) current = s.id;
        else break;
      }
      setActive(current);
    };

    const onScroll = () => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(compute);
    };

    const contactLinks = links.get("contact") ?? [];
    const onContactClick = (e: Event) => {
      e.preventDefault();
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    };
    contactLinks.forEach((el) => el.addEventListener("click", onContactClick));

    // Intercept other section links so the scroll target lands at
    // section.top - header.height every time, regardless of scroll-snap or
    // scroll-padding interactions. Native anchor + snap leaks the previous
    // section's tail on desktop; explicit JS scroll wins.
    const sectionLinkHandlers = new Map<HTMLElement, (e: Event) => void>();
    for (const [id, els] of links) {
      if (id === "contact") continue;
      const target = document.getElementById(id);
      if (!target) continue;
      const handler = (e: Event) => {
        e.preventDefault();
        const headerH = header.getBoundingClientRect().height;
        const top = target.getBoundingClientRect().top + window.scrollY - headerH;
        window.scrollTo({ top, behavior: "smooth" });
        if (history.replaceState) history.replaceState(null, "", `#${id}`);
      };
      for (const el of els) {
        el.addEventListener("click", handler);
        sectionLinkHandlers.set(el, handler);
      }
    }

    // Mobile menu uses <details>. Close it after a link click so the dropdown
    // collapses on navigation. Scoped to links inside <details> only — desktop
    // nav lives outside any <details>, so its listeners are untouched.
    const mobileLinks = Array.from(
      header.querySelectorAll<HTMLElement>("details [data-nav-link]"),
    );
    const onMobileLinkClick = (e: Event) => {
      const details = (e.currentTarget as HTMLElement).closest("details");
      if (details?.open) details.removeAttribute("open");
    };
    mobileLinks.forEach((el) => el.addEventListener("click", onMobileLinkClick));

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      contactLinks.forEach((el) => el.removeEventListener("click", onContactClick));
      mobileLinks.forEach((el) => el.removeEventListener("click", onMobileLinkClick));
      for (const [el, handler] of sectionLinkHandlers) {
        el.removeEventListener("click", handler);
      }
    };
  }, []);

  return null;
}
