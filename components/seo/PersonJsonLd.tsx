import { CONTACT, MAIN_STACKS, TECHS } from "@/data/portfolio";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://minhdoan.dev";

/**
 * Schema.org Person JSON-LD. Rendered server-side so crawlers and LLMs see
 * structured data immediately, no client JS required.
 */
export function PersonJsonLd({ locale }: { locale: string }) {
  const knowsAbout = MAIN_STACKS.map((k) => TECHS[k]?.name).filter(Boolean);

  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Minh Truong Doan",
    alternateName: locale === "vi" ? "Minh Trương Đoàn" : "Minh Truong Doan",
    jobTitle: "Front-end Developer & Team Leader",
    email: `mailto:${CONTACT.email}`,
    telephone: CONTACT.phone,
    url: SITE,
    image: `${SITE}/og.png`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ha Noi",
      addressCountry: "VN",
    },
    sameAs: [
      CONTACT.links.linkedin,
      CONTACT.links.github,
      CONTACT.links.facebook,
    ],
    knowsAbout,
    knowsLanguage: ["English", "Vietnamese"],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Hanoi University of Industry",
    },
  } as const;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
