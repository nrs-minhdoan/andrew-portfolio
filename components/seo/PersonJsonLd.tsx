import { CONTACT, EDUCATION, TECH_LIST } from "@/data/portfolio";
import { SITE_URL } from "@/lib/site";

/**
 * Schema.org Person JSON-LD. Rendered server-side so crawlers and LLMs see
 * structured data immediately, no client JS required.
 */
export function PersonJsonLd({ locale }: { locale: string }) {
  const knowsAbout = TECH_LIST.filter((t) => t.type === "main").map((t) => t.name);

  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: CONTACT.fullName,
    alternateName: locale === "vi" ? CONTACT.altName : CONTACT.fullName,
    jobTitle: CONTACT.jobTitle,
    email: `mailto:${CONTACT.email}`,
    telephone: CONTACT.phone,
    url: SITE_URL,
    image: `${SITE_URL}/og.png`,
    address: {
      "@type": "PostalAddress",
      addressLocality: CONTACT.addressLocality,
      addressCountry: CONTACT.addressCountry,
    },
    sameAs: [CONTACT.links.linkedin, CONTACT.links.github, CONTACT.links.facebook],
    knowsAbout,
    knowsLanguage: CONTACT.languages,
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: EDUCATION.school,
    },
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
