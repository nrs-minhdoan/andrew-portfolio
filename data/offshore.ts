import type { CompanySlug } from "@/types/company";

export interface OffshoreEngagement {
  name: string;
  url?: string;
}

/**
 * Offshore engagements per company. Not full-ownership builds — listed as
 * lightweight contributions, distinct from the project grid.
 */
export const OFFSHORE_ENGAGEMENTS: Partial<
  Record<CompanySlug, readonly OffshoreEngagement[]>
> = {
  vmo: [
    { name: "Optix Solutions", url: "https://www.optixsolutions.com.hk/" },
    {
      name: "Steerpath Smart Office",
      url: "https://apps.apple.com/us/app/steerpath-smart-office/id1483252763",
    },
    {
      name: "Cleverday",
      url: "https://apps.apple.com/us/app/cleverday/id1529858243",
    },
  ],
};
