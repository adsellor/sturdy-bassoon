import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/product-detail";
import { getAllHandles, getProductByHandle } from "@/lib/shopify";
import type { AppleShape } from "@/lib/types";

interface ProductPageProps {
  params: { handle: string };
  searchParams?: {
    shape?: AppleShape;
    weight?: string;
  };
}

export async function generateStaticParams() {
  const handles = await getAllHandles();
  return handles.map((handle) => ({ handle }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = await getProductByHandle(params.handle);
  if (!product) {
    return {
      title: "Product not found",
    };
  }
  return {
    title: product.seo.title,
    description: product.seo.description,
    openGraph: {
      title: product.title,
      description: product.summary,
      images: [{ url: product.heroImage }],
    },
  };
}

export default async function ProductPage({
  params,
  searchParams,
}: ProductPageProps) {
  const product = await getProductByHandle(params.handle);
  if (!product) {
    notFound();
  }

  const shape = searchParams?.shape;
  const weight = searchParams?.weight
    ? Number(searchParams.weight)
    : undefined;

  return (
    <div className="space-y-6">
      <ProductDetail
        product={product}
        defaultShape={shape}
        defaultWeight={weight}
      />
      <section className="rounded-3xl border border-zinc-100 bg-white/70 p-6">
        <h2 className="text-lg font-semibold text-zinc-900">Why Shopify?</h2>
        <p className="mt-2 text-sm text-zinc-600">
          Variant IDs here mirror Shopify variant IDs, so when you add to cart
          we can hand off cleanly to the Storefront and Cart APIs, then redirect
          to Checkout with accurate pricing, taxes, and shipping rates.
        </p>
      </section>
    </div>
  );
}
