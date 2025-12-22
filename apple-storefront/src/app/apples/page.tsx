import type { Metadata } from "next";
import { FilterBar } from "@/components/filter-bar";
import { ProductCard } from "@/components/product-card";
import { listProducts } from "@/lib/shopify";
import type { AppleShape, ProductSort } from "@/lib/types";

export const metadata: Metadata = {
  title: "All Apples",
  description:
    "Browse every apple variety, filter by shape, and sort by price before heading to Shopify Checkout.",
};

interface ApplesPageProps {
  searchParams?: {
    shape?: AppleShape;
    variety?: string;
    sort?: ProductSort;
  };
}

export default async function ApplesPage({ searchParams }: ApplesPageProps) {
  const { shape, variety, sort } = searchParams ?? {};
  const { products, filters } = await listProducts(
    { shape, variety },
    sort ?? "relevance",
  );

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
          Catalog
        </p>
        <h1 className="text-3xl font-semibold text-zinc-900">All apples</h1>
        <p className="text-sm text-zinc-600">
          Filter by shape for prep workflows, sort by price, and select precise
          pounds on each product detail page.
        </p>
      </header>
      <FilterBar shapes={filters.shapes} varieties={filters.varieties} />
      <section aria-live="polite" className="space-y-4">
        <p className="text-sm text-zinc-600">
          Showing <strong>{products.length}</strong> varieties
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
