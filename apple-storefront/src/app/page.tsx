import Link from "next/link";
import { getFeaturedProducts, listProducts } from "@/lib/shopify";
import { ProductCard } from "@/components/product-card";

export default async function Home() {
  const [featured, catalog] = await Promise.all([
    getFeaturedProducts(3),
    listProducts(),
  ]);

  return (
    <div className="space-y-12">
      <section className="rounded-[32px] bg-gradient-to-br from-emerald-600 via-emerald-500 to-lime-400 px-6 py-12 text-white shadow-xl">
        <p className="text-sm uppercase tracking-[0.2em]">Headless Shopify</p>
        <h1 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl">
          Apple storefront with shape & weight precision.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-emerald-50">
          Browse real inventory, pick exact pounds in 0.5 lb increments, and
          check out through Shopify with cards or PayPal. Domestic shipping only
          with carrier-calculated rates.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/apples"
            className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-emerald-700 shadow-md transition hover:bg-emerald-50"
          >
            Browse all apples
          </Link>
          <Link
            href="/faq"
            className="rounded-full border border-white/80 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            How it works
          </Link>
        </div>
      </section>
      <section className="space-y-6">
        <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-emerald-700">Featured</p>
            <h2 className="text-2xl font-semibold text-zinc-900">
              Fresh harvest highlights
            </h2>
          </div>
          <Link
            href="/apples"
            className="text-sm font-semibold text-emerald-600 hover:text-emerald-700"
          >
            View catalog →
          </Link>
        </header>
        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      <section className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-zinc-900">
          What makes this MVP special?
        </h2>
        <ul className="mt-4 grid gap-4 text-sm text-zinc-700 md:grid-cols-3">
          <li className="rounded-2xl bg-emerald-50/60 p-4">
            <p className="font-semibold text-emerald-900">Variant strategy</p>
            <p className="mt-2">
              Weight increments map 1:1 to Shopify variants, so pricing, taxes,
              and shipping match checkout exactly.
            </p>
          </li>
          <li className="rounded-2xl bg-emerald-50/60 p-4">
            <p className="font-semibold text-emerald-900">Analytics ready</p>
            <p className="mt-2">
              GA4 hooks capture product views, add-to-cart, and begin checkout
              with space for cross-domain linking.
            </p>
          </li>
          <li className="rounded-2xl bg-emerald-50/60 p-4">
            <p className="font-semibold text-emerald-900">
              Accessibility first
            </p>
            <p className="mt-2">
              Skip links, labeled controls, and keyboard-friendly selectors keep
              us aligned to WCAG 2.1 AA.
            </p>
          </li>
        </ul>
      </section>
      <section className="rounded-3xl border border-zinc-100 bg-white/60 p-6">
        <h2 className="text-xl font-semibold text-zinc-900">
          In season now ({catalog.products.length} varieties)
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {catalog.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
