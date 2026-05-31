"use client";

import cx from "classnames";
import { type CSSProperties, type ReactNode, useRef } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export function SpotlightCard({ children, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={cx("spotlight", className)}
      style={
        {
          ["--mx" as keyof CSSProperties]: "50%",
          ["--my" as keyof CSSProperties]: "50%",
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
