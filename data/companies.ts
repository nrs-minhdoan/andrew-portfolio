import type { CompanySpec } from "@/types/company";

export const COMPANIES: readonly CompanySpec[] = [
  {
    slug: "blitz",
    title: "Front-end Lead, Blitz Labo",
    location: "Ha Noi",
    period: "Oct 2024 — Present",
    ongoing: true,
  },
  {
    slug: "cryptopie",
    title: "Front-end Lead, CryptoPie Labo",
    location: "Ha Noi",
    period: "Aug 2021 — Oct 2024",
  },
  {
    slug: "vmo",
    title: "Front-end Lead, VMO Group",
    location: "Ha Noi",
    period: "Aug 2018 — Aug 2021",
  },
  {
    slug: "freelance",
    title: "Front-end Developer, Freelancer",
    location: "Ha Noi",
    period: "Apr 2019 — Present",
    ongoing: true,
  },
] as const;
