"use client";

import cx from "classnames";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Intent = "primary" | "ghost" | "outline";

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  intent?: Intent;
  iconAfter?: ReactNode;
  /** Tamagui-era alias kept for callsite compatibility. */
  onPress?: () => void;
}

const baseClass =
  "inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 font-semibold transition-[background,border-color,filter,opacity,color,box-shadow] duration-200 outline-none focus-visible:ring-2 focus-visible:ring-(--accent) focus-visible:ring-offset-2 focus-visible:ring-offset-(--bg) active:opacity-85 disabled:opacity-50";

const intentClass: Record<Intent, string> = {
  primary:
    "border border-transparent text-white shadow-[0_10px_30px_-10px_color-mix(in_oklab,var(--accent)_60%,transparent)] [background:linear-gradient(135deg,var(--accent),var(--accent-3))] hover:brightness-110",
  ghost:
    "border border-transparent text-(--fg) hover:bg-[color-mix(in_oklab,var(--accent)_12%,transparent)]",
  outline:
    "border border-(--border-strong) bg-transparent text-(--fg) hover:border-(--accent) hover:bg-[color-mix(in_oklab,var(--accent)_8%,transparent)]",
};

export function Button({
  intent = "outline",
  iconAfter,
  onPress,
  onClick,
  className,
  children,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cx(baseClass, intentClass[intent], className)}
      onClick={(e) => {
        onClick?.(e);
        onPress?.();
      }}
      {...rest}
    >
      {children}
      {iconAfter}
    </button>
  );
}
