"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { AppleProduct, AppleShape } from "@/lib/types";
import { formatCurrency, formatWeight } from "@/lib/utils";
import { useAnalytics } from "./analytics-provider";
import { useCart } from "./cart-provider";

interface ProductDetailProps {
  product: AppleProduct;
  defaultShape?: AppleShape;
  defaultWeight?: number;
}

export const ProductDetail = ({
  product,
  defaultShape,
  defaultWeight,
}: ProductDetailProps) => {
  const fallbackVariant = product.variants.find((variant) => variant.available);
  const [selectedShape, setSelectedShape] = useState<AppleShape>(
    defaultShape ?? fallbackVariant?.shape ?? product.options.shapes[0],
  );
  const [selectedWeight, setSelectedWeight] = useState<number>(
    defaultWeight ?? fallbackVariant?.weightLbs ?? product.options.minWeight,
  );

  const router = useRouter();
  const pathname = usePathname();
  const { addItem } = useCart();
  const { track } = useAnalytics();

  const currentVariant = useMemo(
    () =>
      product.variants.find(
        (variant) =>
          variant.shape === selectedShape &&
          Number(variant.weightLbs) === Number(selectedWeight),
      ),
    [product.variants, selectedShape, selectedWeight],
  );

  const availableWeights = useMemo(
    () =>
      product.variants
        .filter((variant) => variant.shape === selectedShape)
        .map((variant) => ({
          weight: variant.weightLbs,
          price: variant.price,
          available: variant.available,
        })),
    [product.variants, selectedShape],
  );

  const handleShapeChange = (shape: AppleShape) => {
    setSelectedShape(shape);
    const firstAvailable = product.variants.find(
      (variant) => variant.shape === shape && variant.available,
    );
    if (firstAvailable) {
      setSelectedWeight(firstAvailable.weightLbs);
      router.replace(
        `${pathname}?shape=${encodeURIComponent(shape)}&weight=${
          firstAvailable.weightLbs
        }`,
        { scroll: false },
      );
    }
  };

  const handleWeightChange = (weight: number) => {
    setSelectedWeight(weight);
    router.replace(
      `${pathname}?shape=${encodeURIComponent(selectedShape)}&weight=${weight}`,
      { scroll: false },
    );
  };

  const handleAddToCart = () => {
    if (!currentVariant || !currentVariant.available) {
      return;
    }

    addItem({
      id: currentVariant.id,
      productHandle: product.handle,
      productTitle: product.title,
      shape: currentVariant.shape,
      weightLbs: currentVariant.weightLbs,
      price: currentVariant.price,
      quantity: 1,
      image: product.heroImage,
    });

    track({
      name: "add_to_cart",
      payload: { handle: product.handle, variantId: currentVariant.id },
    });
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-4">
        <div className="relative h-96 overflow-hidden rounded-3xl">
          <Image
            src={product.heroImage}
            alt={product.title}
            fill
            sizes="(max-width:1024px) 100vw, 600px"
            className="object-cover"
            priority
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {product.gallery.map((image) => (
            <div key={image} className="relative h-48 overflow-hidden rounded-2xl">
              <Image
                src={image}
                alt={`${product.title} detail`}
                fill
                sizes="(max-width:768px) 100vw, 300px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-6 rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm">
        <div>
          <p className="text-sm uppercase tracking-wide text-emerald-600">
            {product.variety}
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-zinc-900">
            {product.title}
          </h1>
          <p className="mt-3 text-sm text-zinc-600">{product.summary}</p>
        </div>
        <div className="rounded-2xl bg-emerald-50/70 p-4">
          <p className="text-sm font-medium text-emerald-900">
            ${product.pricePerLb.toFixed(2)} per lb
          </p>
          <p className="text-xs text-emerald-700">
            Price is calculated automatically based on selected weight.
          </p>
        </div>
        <section className="space-y-4">
          <div>
            <p className="text-sm font-semibold text-zinc-800">Select a shape</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.options.shapes.map((shape) => (
                <button
                  key={shape}
                  type="button"
                  onClick={() => handleShapeChange(shape)}
                  className={`rounded-2xl border px-3 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 ${
                    selectedShape === shape
                      ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                      : "border-zinc-200 bg-white text-zinc-700 hover:border-emerald-200"
                  }`}
                >
                  {shape}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-800">
              Select a weight
            </p>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {availableWeights.map((option) => (
                <button
                  key={option.weight}
                  type="button"
                  onClick={() => handleWeightChange(option.weight)}
                  disabled={!option.available}
                  className={`rounded-2xl border px-3 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 ${
                    selectedWeight === option.weight
                      ? "border-emerald-500 bg-emerald-600 text-white"
                      : "border-zinc-200 bg-white text-zinc-700 hover:border-emerald-200"
                  } ${option.available ? "" : "cursor-not-allowed opacity-40"}`}
                >
                  {formatWeight(option.weight)}
                </button>
              ))}
            </div>
          </div>
        </section>
        <div className="rounded-2xl border border-dashed border-emerald-200 p-4 text-sm text-zinc-700">
          <p>
            Ships domestically with carrier-calculated rates. Taxes calculated
            during Shopify Checkout.
          </p>
        </div>
        <div className="space-y-3 rounded-2xl bg-zinc-50 p-4">
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-zinc-600">Selected weight</span>
            <span className="text-base font-semibold text-zinc-900">
              {formatWeight(selectedWeight)}
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-zinc-600">Total</span>
            <span className="text-2xl font-semibold text-emerald-700">
              {currentVariant ? formatCurrency(currentVariant.price) : "--"}
            </span>
          </div>
          <p className="text-xs text-zinc-500">
            Inventory:{" "}
            {currentVariant?.available
              ? `${currentVariant.inventory} lbs ready to ship`
              : "Sold out"}
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!currentVariant?.available}
          className="w-full rounded-full bg-emerald-600 px-5 py-3 text-base font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-zinc-300"
        >
          {currentVariant?.available ? "Add to cart" : "Sold out"}
        </button>
        <section>
          <h2 className="text-lg font-semibold text-zinc-900">
            Flavor & nutrition
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-600">
            {product.tastingNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
          <h3 className="mt-4 text-sm font-semibold text-zinc-800">
            Nutrition notes
          </h3>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-zinc-600">
            {product.nutritionNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};
