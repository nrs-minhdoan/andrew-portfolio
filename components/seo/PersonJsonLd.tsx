import { CONTACT, EDUCATION, TECH_LIST } from "@/data/portfolio";
import { SITE_URL } from "@/lib/site";

/**
 * Schema.org Person JSON-LD. `type="application/ld+json"` makes this a
 * non-executable data block, so React 19 does NOT emit its "script inside
 * React component" warning (see isScriptDataBlock in react-dom).
 *
 * Locale-independent: a single canonical English document avoids re-rendering
 * the script on locale switch and keeps the JSON-LD identical for crawlers.
 */
export function PersonJsonLd() {
  const knowsAbout = TECH_LIST.filter((t) => t.type === "main").map((t) => t.name);

  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: CONTACT.fullName,
    alternateName: [CONTACT.fullName, CONTACT.altName].filter(Boolean),
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
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
