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
  /** Logo path under /public — convention: `/projects/<slug>/logo.<ext>`. Other assets (preview*.png) live in the same folder. */
  image?: string;
  /** Card preview screenshot — convention: `/projects/<slug>/preview.<ext>`. */
  preview?: string;
  /** CSS object/background-position for the preview crop (e.g. "center 22%" to focus on App Store screenshots row). */
  previewFocus?: string;
  /** CSS background-size for mobile preview zoom (e.g. "200%" to zoom past App Store header). Defaults to "180%". */
  previewZoom?: string;
  /** Force a light backdrop behind the logo (for dark-on-transparent assets). */
  logoLightBg?: boolean;
  /** Render preview using the mobile-screenshot crop (CSS background) even
   *  when `role` isn't `"mobile"`. Use for hybrid mobile/web projects. */
  previewMobile?: boolean;
}
