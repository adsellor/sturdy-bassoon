import type { Metadata } from "next";
import { cmsPages } from "@/data/apples";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn how the Apple Storefront MVP uses Shopify Admin, Storefront API, and Checkout.",
};

export default function AboutPage() {
  const content = cmsPages.about;

  return (
    <article className="rounded-3xl border border-zinc-100 bg-white p-8 shadow-sm">
      <h1 className="text-3xl font-semibold text-zinc-900">{content.title}</h1>
      <p className="mt-4 text-sm text-zinc-600">{content.intro}</p>
      <ul className="mt-6 space-y-3">
        {content.highlights.map((highlight) => (
          <li
            key={highlight}
            className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4 text-sm text-emerald-900"
          >
            {highlight}
          </li>
        ))}
      </ul>
    </article>
  );
}
