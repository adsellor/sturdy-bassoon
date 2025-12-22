import type { Metadata } from "next";
import { cmsPages } from "@/data/apples";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach the orchard team for wholesale or support.",
};

export default function ContactPage() {
  const content = cmsPages.contact;

  return (
    <section className="rounded-3xl border border-zinc-100 bg-white p-8 shadow-sm">
      <h1 className="text-3xl font-semibold text-zinc-900">{content.title}</h1>
      <ul className="mt-6 space-y-4 text-sm text-zinc-700">
        <li>
          <span className="font-semibold text-zinc-900">Email:</span>{" "}
          <a
            className="text-emerald-700 underline"
            href={`mailto:${content.email}`}
          >
            {content.email}
          </a>
        </li>
        <li>
          <span className="font-semibold text-zinc-900">Phone:</span>{" "}
          <a className="text-emerald-700" href={`tel:${content.phone}`}>
            {content.phone}
          </a>
        </li>
        <li>
          <span className="font-semibold text-zinc-900">Address:</span>{" "}
          {content.address}
        </li>
      </ul>
      <p className="mt-4 text-xs text-zinc-500">
        Response time targets: <strong>4 business hours</strong> for commerce
        issues, <strong>1 business day</strong> for general inquiries.
      </p>
    </section>
  );
}
