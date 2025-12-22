import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/apples", "/thank-you"],
      disallow: ["/cart"],
    },
    sitemap: "https://apple-storefront.example/sitemap.xml",
  };
}
