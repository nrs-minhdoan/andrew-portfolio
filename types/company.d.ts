export type CompanySlug = "blitz" | "cryptopie" | "vmo" | "freelance";

export interface CompanySpec {
  slug: CompanySlug;
  title: string;
  location: string;
  period: string;
  ongoing?: boolean;
}
