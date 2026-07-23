import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE.url, changeFrequency: "weekly", priority: 1 },
  ];

  const cityPages: MetadataRoute.Sitemap = SITE.cities.map((city) => ({
    url: `${SITE.url}/new-homes/${city.slug}`,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [...staticPages, ...cityPages];
}
