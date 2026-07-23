import type { Listing } from "@/types/database";
import { SITE } from "./site-config";

/** RealEstateAgent + LocalBusiness schema — used on the homepage and about page. */
export function agentSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: SITE.agentName,
    jobTitle: SITE.agentTitle,
    telephone: SITE.phone,
    email: SITE.email,
    url: SITE.url,
    worksFor: {
      "@type": "Organization",
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
    areaServed: SITE.serviceAreas.map((area) => ({
      "@type": "Place",
      name: area,
    })),
  };
}

/** SingleFamilyResidence + Offer schema for an individual listing page. */
export function listingSchema(listing: Listing) {
  return {
    "@context": "https://schema.org",
    "@type": "SingleFamilyResidence",
    name: listing.address_line,
    description: listing.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: listing.address_line,
      addressLocality: listing.city,
      addressRegion: listing.state,
      postalCode: listing.zip,
      addressCountry: "US",
    },
    numberOfRooms: listing.bedrooms,
    numberOfBathroomsTotal: listing.bathrooms,
    floorSize: {
      "@type": "QuantitativeValue",
      value: listing.square_feet,
      unitCode: "FTK",
    },
    ...(listing.latitude && listing.longitude
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: listing.latitude,
            longitude: listing.longitude,
          },
        }
      : {}),
    image: listing.photo_urls,
    offers: {
      "@type": "Offer",
      price: listing.list_price,
      priceCurrency: "USD",
      availability:
        listing.status === "Active"
          ? "https://schema.org/InStock"
          : "https://schema.org/SoldOut",
    },
  };
}

interface TestimonialInput {
  authorName: string;
  reviewBody: string;
  ratingValue: number;
  datePublished: string;
}

/** AggregateRating + Review schema, built from real testimonial text
 *  (replaces the raw screenshot assets — see /areas notes). */
export function testimonialSchema(testimonials: TestimonialInput[]) {
  const avg =
    testimonials.reduce((sum, t) => sum + t.ratingValue, 0) / testimonials.length;

  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: SITE.agentName,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: avg.toFixed(1),
      reviewCount: testimonials.length,
    },
    review: testimonials.map((t) => ({
      "@type": "Review",
      author: { "@type": "Person", name: t.authorName },
      reviewRating: {
        "@type": "Rating",
        ratingValue: t.ratingValue,
        bestRating: 5,
      },
      reviewBody: t.reviewBody,
      datePublished: t.datePublished,
    })),
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
