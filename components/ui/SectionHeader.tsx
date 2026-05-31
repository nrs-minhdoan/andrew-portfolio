import cx from "classnames";
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
      className={cx(
        "mb-10 flex max-w-full min-w-0 flex-col gap-4 sm:mb-12",
        isCenter ? "items-center text-center" : "items-start",
      )}
    >
      {/* Inline-flex on the badge means it sizes to content; the parent
          previously stretched it to full container width on mobile. */}
      <span className="label max-w-full">{label}</span>
      <h2 className="font-display max-w-full text-2xl font-bold tracking-tight wrap-break-word sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cx(
            "description max-w-full min-w-0 text-sm wrap-break-word text-(--muted) sm:max-w-2xl sm:text-base",
            { "mx-auto": isCenter },
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </Reveal>
  );
}
