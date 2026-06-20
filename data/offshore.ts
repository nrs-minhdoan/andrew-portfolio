import type { CompanySlug } from "@/types/company";
import type { TechKey } from "@/types/tech";

export interface OffshoreEngagement {
  name: string;
  url?: string;
  /** Local logo path, preferred over a remote favicon for a clear, crisp mark. */
  image?: string;
  /** Render the logo on a white plate when the mark is dark/transparent. */
  logoLightBg?: boolean;
}

export interface OffshoreGroup {
  engagements: readonly OffshoreEngagement[];
  techs?: readonly TechKey[];
}

/**
 * Offshore engagements per company. Not full-ownership builds - listed as
 * lightweight contributions, distinct from the project grid.
 */
export const OFFSHORE_ENGAGEMENTS: Partial<Record<CompanySlug, OffshoreGroup>> = {
  vmo: {
    engagements: [
      {
        name: "Optix Solutions",
        url: "https://www.optixsolutions.com.hk/",
        image: "/projects/optix-solutions/logo.png",
        logoLightBg: true,
      },
      {
        name: "Steerpath Smart Office",
        url: "https://apps.apple.com/us/app/steerpath-smart-office/id1483252763",
        image: "/projects/steerpath-smart-office/logo.png",
      },
      {
        name: "Cleverday",
        url: "https://apps.apple.com/us/app/cleverday/id1529858243",
        image: "/projects/cleverday/logo.svg",
      },
    ],
    techs: [
      "typescript",
      "javascript",
      "react",
      "reactnative",
      "redux",
      "reduxsaga",
      "reactquery",
      "graphql",
      "apolloclient",
    ],
  },
};
