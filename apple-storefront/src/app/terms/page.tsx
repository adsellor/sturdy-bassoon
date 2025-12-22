import type { Metadata } from "next";
import { cmsPages } from "@/data/apples";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Understand shipping tolerances and domestic-only policies.",
};

export default function TermsPage() {
  const content = cmsPages.terms;

  return (
    <article className="rounded-3xl border border-zinc-100 bg-white p-8 shadow-sm">
      <h1 className="text-3xl font-semibold text-zinc-900">{content.title}</h1>
      <ol className="mt-6 list-decimal space-y-2 pl-5 text-sm text-zinc-700">
        {content.body.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ol>
    </article>
  );
}
