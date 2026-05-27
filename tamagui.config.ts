import { defaultConfig } from "@tamagui/config/v4";
import { createTamagui } from "tamagui";

/**
 * Minimal Tamagui config. Hybrid mode — Tailwind owns global styling,
 * Tamagui used only for interactive components that benefit from its
 * primitives (Press, focus rings, gesture states, accessible variants).
 *
 * Tokens map to existing CSS variables so Tamagui components inherit the
 * site palette automatically.
 */
export const config = createTamagui(defaultConfig);

export type AppConfig = typeof config;

declare module "tamagui" {
  // biome-ignore lint/suspicious/noEmptyInterface: required pattern for module augmentation
  interface TamaguiCustomConfig extends AppConfig {}
}

export default config;
