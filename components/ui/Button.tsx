"use client";

import type { ComponentType } from "react";
import { Button as TamaguiButton, type ButtonProps as TamaguiButtonProps } from "tamagui";

// Tamagui v2 has strict prop typings against raw CSS strings; cast escape.
type AnyProps = Record<string, unknown>;
const RawButton = TamaguiButton as unknown as ComponentType<AnyProps>;

export interface ButtonProps extends Omit<TamaguiButtonProps, "color"> {
  intent?: "primary" | "ghost" | "outline";
}

export function Button({ intent = "outline", children, ...rest }: ButtonProps) {
  const isPrimary = intent === "primary";
  const palette =
    intent === "primary"
      ? {
          bg: "transparent",
          border: "transparent",
          fg: "#ffffff",
          hoverBg: "transparent",
          hoverBorder: "transparent",
        }
      : intent === "ghost"
        ? {
            bg: "transparent",
            border: "transparent",
            fg: "var(--fg)",
            hoverBg: "color-mix(in oklab, var(--accent) 12%, transparent)",
            hoverBorder: "transparent",
          }
        : {
            bg: "transparent",
            border: "var(--border-strong)",
            fg: "var(--fg)",
            hoverBg: "color-mix(in oklab, var(--accent) 8%, transparent)",
            hoverBorder: "var(--accent)",
          };

  const primaryGradient = isPrimary
    ? {
        background: "linear-gradient(135deg, var(--accent), var(--accent-3))",
        boxShadow: "0 10px 30px -10px color-mix(in oklab, var(--accent) 60%, transparent)",
      }
    : undefined;

  return (
    <RawButton
      animation="medium"
      borderRadius={9999}
      paddingHorizontal={22}
      height={44}
      borderWidth={1}
      backgroundColor={palette.bg}
      borderColor={palette.border}
      color={palette.fg}
      fontWeight="600"
      fontFamily="var(--font-sans)"
      cursor="pointer"
      gap={8}
      style={{
        ...primaryGradient,
        transition:
          "background-color 250ms ease-out, border-color 250ms ease-out, filter 250ms ease-out, opacity 200ms ease-out, color 250ms ease-out, box-shadow 250ms ease-out",
      }}
      hoverStyle={
        isPrimary
          ? { filter: "brightness(1.12)" }
          : { backgroundColor: palette.hoverBg, borderColor: palette.hoverBorder }
      }
      pressStyle={{ opacity: 0.85 }}
      focusVisibleStyle={{
        outlineColor: "var(--accent)",
        outlineWidth: 2,
        outlineStyle: "solid",
        outlineOffset: 2,
      }}
      {...rest}
    >
      {children}
    </RawButton>
  );
}
