import type { TechKey } from "./tech";
import type { CompanySlug } from "./company";

export type ProjectRole = "lead" | "fe" | "mobile" | "fe_mobile";

export interface ProjectSpec {
  slug: string;
  period: string;
  ongoing?: boolean;
  role: ProjectRole;
  teamSize: number | string;
  techs: TechKey[];
  awards?: readonly string[];
  company: CompanySlug;
  /** featured on landing grid */
  featured?: boolean;
  /** Public production URL — used for favicon fetching + click-through. */
  url?: string;
  /** Preview image path under /public (e.g. "/projects/bitcastle.png"). */
  image?: string;
  /** Force a light backdrop behind the logo (for dark-on-transparent assets). */
  logoLightBg?: boolean;
}
