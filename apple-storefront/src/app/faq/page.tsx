import type { Metadata } from "next";
import { cmsPages } from "@/data/apples";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to shipping, pricing, and checkout questions.",
};

export default function FAQPage() {
  const content = cmsPages.faq;

  return (
    <article className="rounded-3xl border border-zinc-100 bg-white p-8 shadow-sm">
      <h1 className="text-3xl font-semibold text-zinc-900">{content.title}</h1>
      <dl className="mt-6 space-y-5">
        {content.items.map((item) => (
          <div
            key={item.question}
            className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4"
          >
            <dt className="text-base font-semibold text-emerald-900">
              {item.question}
            </dt>
            <dd className="mt-2 text-sm text-zinc-700">{item.answer}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}
