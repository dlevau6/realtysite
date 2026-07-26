import { ALL_CITIES, SITE } from "@/lib/site-config";

/**
 * RealEstateAgent structured data — injected in the root layout so it
 * appears on every page. Helps Google understand who Eric is and can
 * enable Knowledge Panel treatment for branded searches.
 *
 * Populated with real data. Never keyword-stuff schema; that gets pages
 * penalized.
 */
export function RealEstateAgentSchema() {
  const json = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: SITE.agentName,
    alternateName: SITE.brandName,
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    // Canopy equal-prominence rule mirrors here too — brokerage is a
    // first-class parent org.
    worksFor: {
      "@type": "RealEstateOrganization",
      name: SITE.brokerage,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.state,
      postalCode: SITE.address.zip,
      addressCountry: "US",
    },
    areaServed: ALL_CITIES.map((c) => ({
      "@type": "City",
      name: c.name,
      addressRegion: "NC",
    })),
    knowsAbout: [
      "D.R. Horton new construction homes",
      "Charlotte NC new construction",
      "Lake Norman real estate",
      "Research Triangle relocation",
    ],
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "license",
      recognizedBy: {
        "@type": "Organization",
        name: "North Carolina Real Estate Commission",
      },
      identifier: SITE.licenseNumber,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

interface FaqItem {
  q: string;
  a: string;
}

/** FAQPage schema — for pages with a real FAQ section. */
export function FaqPageSchema({ items }: { items: FaqItem[] }) {
  const json = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

/** Place schema for city pages — reinforces geographic relevance. */
export function CityPlaceSchema({
  citySlug,
  cityName,
}: {
  citySlug: string;
  cityName: string;
}) {
  const json = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: `D.R. Horton new construction homes in ${cityName}, NC`,
    address: {
      "@type": "PostalAddress",
      addressLocality: cityName,
      addressRegion: "NC",
      addressCountry: "US",
    },
    url: `${SITE.url}/dr-horton/${citySlug}`,
    containedInPlace: {
      "@type": "State",
      name: "North Carolina",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
