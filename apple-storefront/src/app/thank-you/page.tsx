import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thank you",
  description: "Order confirmation landing page after Shopify Checkout.",
};

interface ThankYouPageProps {
  searchParams?: {
    orderId?: string;
    email?: string;
  };
}

export default function ThankYouPage({ searchParams }: ThankYouPageProps) {
  const orderId = searchParams?.orderId ?? "pending";
  const email = searchParams?.email ?? "your inbox";

  return (
    <div className="rounded-3xl border border-emerald-100 bg-white p-8 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
        Shopify Checkout
      </p>
      <h1 className="mt-3 text-3xl font-semibold text-zinc-900">
        Thanks for your order!
      </h1>
      <p className="mt-3 text-sm text-zinc-600">
        Order <span className="font-semibold">#{orderId}</span> is confirmed.
        We sent a receipt to <span className="font-semibold">{email}</span>.
      </p>
      <p className="mt-2 text-sm text-zinc-600">
        When Shopify marks the order as fulfilled, this page can poll the
        Storefront API to show tracking numbers or recommended apples for the
        next shipment.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/apples"
          className="rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white"
        >
          Continue shopping
        </Link>
        <Link
          href="/faq"
          className="rounded-full border border-emerald-200 px-5 py-3 text-sm font-semibold text-emerald-700"
        >
          Track shipping policy
        </Link>
      </div>
    </div>
  );
}
