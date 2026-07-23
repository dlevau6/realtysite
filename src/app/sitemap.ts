import type { MetadataRoute } from "next";
import { getAllListingSlugs, getAllNeighborhoods } from "@/lib/data/listings";
import { SITE } from "@/lib/site-config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [listingSlugs, neighborhoods] = await Promise.all([
    getAllListingSlugs(),
    getAllNeighborhoods(),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE.url, changeFrequency: "daily", priority: 1 },
    { url: `${SITE.url}/listings`, changeFrequency: "hourly", priority: 0.9 },
    { url: `${SITE.url}/neighborhoods`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE.url}/about`, changeFrequency: "monthly", priority: 0.5 },
  ];

  const listingPages: MetadataRoute.Sitemap = listingSlugs.map((slug) => ({
    url: `${SITE.url}/listings/${slug}`,
    changeFrequency: "daily",
    priority: 0.7,
  }));

  const neighborhoodPages: MetadataRoute.Sitemap = neighborhoods.map((n) => ({
    url: `${SITE.url}/neighborhoods/${n.slug}`,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticPages, ...listingPages, ...neighborhoodPages];
}
