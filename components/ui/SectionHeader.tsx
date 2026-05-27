import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

interface Props {
  label: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
}

export function SectionHeader({ label, title, subtitle, align = "left" }: Props) {
  const isCenter = align === "center";
  return (
    <Reveal
      as="header"
      className={`mb-10 flex max-w-full min-w-0 flex-col gap-4 sm:mb-12 ${
        isCenter ? "items-center text-center" : "items-start"
      }`}
    >
      {/* Inline-flex on the badge means it sizes to content; the parent
          previously stretched it to full container width on mobile. */}
      <span className="label max-w-full">{label}</span>
      <h2 className="max-w-full text-balance font-bold font-display text-2xl break-words tracking-tight sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {subtitle ? (
        <p
          className={`description min-w-0 max-w-full text-(--muted) text-sm break-words sm:max-w-2xl sm:text-base ${
            isCenter ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </p>
      ) : null}
    </Reveal>
  );
}
