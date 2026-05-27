/**
 * Barrel re-export. Splits keep each module under 300 lines.
 * - techs.ts     — TECHS catalog + MAIN/INTEGRATION stack lists
 * - companies.ts — career tenures
 * - projects.ts  — project specs
 * - profile.ts   — achievements, education, contact, stats
 *
 * Type definitions live under `@/types/*`.
 */

export type {
  TechKey,
  TechMeta,
  CompanySlug,
  CompanySpec,
  ProjectRole,
  ProjectSpec,
  AchievementSpec,
} from "@/types";
export { TECHS, MAIN_STACKS, INTEGRATION_STACKS } from "./techs";
export { COMPANIES } from "./companies";
export { PROJECTS } from "./projects";
export { OFFSHORE_ENGAGEMENTS } from "./offshore";
export { ACHIEVEMENTS, EDUCATION, CONTACT, STATS } from "./profile";
