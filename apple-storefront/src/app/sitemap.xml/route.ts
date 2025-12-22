import type { MetadataRoute } from "next";
import { getAllHandles } from "@/lib/shopify";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const handles = await getAllHandles();
  const base = "https://apple-storefront.example";

  return [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/apples`, changeFrequency: "daily", priority: 0.9 },
    ...handles.map((handle) => ({
      url: `${base}/apples/${handle}`,
      changeFrequency: "daily",
      priority: 0.8,
    })),
    { url: `${base}/about`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/faq`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/contact`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${base}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/terms`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
