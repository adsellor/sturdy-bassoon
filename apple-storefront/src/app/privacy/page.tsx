import type { Metadata } from "next";
import { cmsPages } from "@/data/apples";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how data flows between the headless storefront and Shopify.",
};

export default function PrivacyPage() {
  const content = cmsPages.privacy;

  return (
    <article className="rounded-3xl border border-zinc-100 bg-white p-8 shadow-sm">
      <h1 className="text-3xl font-semibold text-zinc-900">{content.title}</h1>
      <div className="mt-6 space-y-3 text-sm text-zinc-700">
        {content.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
