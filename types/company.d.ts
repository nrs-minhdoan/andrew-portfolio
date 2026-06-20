export type CompanySlug = "bitcastle" | "blitz" | "vmo" | "freelance";

export interface CompanySpec {
  slug: CompanySlug;
  title: string;
  location: string;
  period: string;
  ongoing?: boolean;
  /** Public website URL. When present, the company name renders as a click-through. */
  url?: string;
}
