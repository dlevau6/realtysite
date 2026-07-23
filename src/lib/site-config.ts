/**
 * Single source of truth for agent/brokerage info used across the site
 * (header, footer, schema.org markup, contact forms).
 *
 * Sourced from client-provided branding assets. Replace placeholders
 * (marked TODO) once confirmed with the client — in particular the
 * logo file, headshot, and final service-area list.
 */
export const SITE = {
  brandName: "Lake Norman Realtor1",
  agentName: "Eric Fisher",
  agentTitle: "Realtor® / Broker",
  licenseNumber: "NC #362747",
  brokerage: "Southern Homes of the Carolinas",
  tagline: "Moving You to the Lake",
  description:
    "Eric Fisher is a Lake Norman real estate expert serving the Lake Norman and Charlotte, NC areas — honest, experienced, and personal service from listing to closing.",
  phone: "704-495-2241",
  email: "LakeNormanRealtor1@gmail.com",
  address: {
    street: "19900 W. Catawba Ave. Suite 206",
    city: "Cornelius",
    state: "NC",
    zip: "28031",
  },
  serviceAreas: ["Lake Norman", "Cornelius", "Charlotte", "Sherrills Ford", "Cherryville"],
  social: {
    instagram: "https://instagram.com/lakenormanrealtor1",
  },
  // TODO: swap in production URL once domain is confirmed
  url: "https://www.southernhomescarolinas.com",
} as const;
