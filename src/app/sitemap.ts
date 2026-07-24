import type { MetadataRoute } from "next";
import { ALL_CITIES, SITE } from "@/lib/site-config";
import { COMMUNITIES } from "@/lib/communities";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE.url, changeFrequency: "weekly", priority: 1 },
    {
      url: `${SITE.url}/home-value`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    { url: `${SITE.url}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE.url}/terms`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const cityPages: MetadataRoute.Sitemap = ALL_CITIES.map((city) => ({
    url: `${SITE.url}/dr-horton/${city.slug}`,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // Only surface non-sold-out communities to search engines.
  const communityPages: MetadataRoute.Sitemap = COMMUNITIES.filter(
    (c) => c.status !== "sold-out"
  ).map((c) => ({
    url: `${SITE.url}/dr-horton/${c.citySlug}/${c.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticPages, ...cityPages, ...communityPages];
}
