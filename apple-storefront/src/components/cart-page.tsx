"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { useAnalytics } from "./analytics-provider";
import { useCart } from "./cart-provider";
import { formatCurrency, formatWeight } from "@/lib/utils";

export const CartPage = () => {
  const { items, subtotal, updateQuantity, removeItem, clearCart } = useCart();
  const { track } = useAnalytics();

  const estimatedTax = useMemo(() => subtotal * 0.0825, [subtotal]);
  const estimatedTotal = subtotal + estimatedTax;

  const beginCheckout = () => {
    track({ name: "begin_checkout", payload: { value: subtotal } });
    alert(
      "For the MVP this button would redirect to Shopify Checkout with cart ID. See README for integration notes.",
    );
  };

  if (!items.length) {
    return (
      <div className="rounded-3xl border border-zinc-100 bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-semibold text-zinc-900">
          Your cart is empty
        </h1>
        <p className="mt-2 text-sm text-zinc-600">
          Add apples by selecting shape and weight from a product page.
        </p>
        <Link
          className="mt-6 inline-flex rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white"
          href="/apples"
        >
          Browse catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <section className="space-y-4 rounded-3xl border border-zinc-100 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-zinc-900">
            Cart ({items.length} items)
          </h1>
          <button
            type="button"
            onClick={clearCart}
            className="text-sm font-medium text-zinc-500 underline"
          >
            Clear cart
          </button>
        </div>
        <ul className="space-y-4">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex flex-col gap-4 rounded-2xl border border-zinc-100 p-4 sm:flex-row"
            >
              <div className="relative h-32 w-full overflow-hidden rounded-2xl sm:w-40">
                <Image
                  src={item.image}
                  alt={item.productTitle}
                  fill
                  sizes="(max-width:768px) 100vw, 200px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-zinc-900">
                    {item.productTitle}
                  </h2>
                  <p className="text-sm text-zinc-500">
                    {item.shape} · {formatWeight(item.weightLbs)}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <label className="flex items-center gap-2 text-zinc-600">
                    Qty
                    <input
                      type="number"
                      min={1}
                      className="w-20 rounded-xl border border-zinc-200 px-2 py-1 text-center"
                      value={item.quantity}
                      onChange={(event) =>
                        updateQuantity(item.id, Number(event.target.value))
                      }
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="text-sm font-medium text-red-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="text-right text-lg font-semibold text-zinc-900">
                {formatCurrency(item.price * item.quantity)}
              </div>
            </li>
          ))}
        </ul>
      </section>
      <aside className="space-y-4 rounded-3xl border border-emerald-100 bg-emerald-50/70 p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-emerald-900">
          Estimated totals
        </h2>
        <dl className="space-y-3 text-sm text-emerald-900">
          <div className="flex items-center justify-between">
            <dt>Subtotal</dt>
            <dd>{formatCurrency(subtotal)}</dd>
          </div>
          <div className="flex items-center justify-between text-emerald-800">
            <dt>Estimated taxes*</dt>
            <dd>{formatCurrency(estimatedTax)}</dd>
          </div>
          <div className="flex items-center justify-between border-t border-emerald-200 pt-3 text-base font-semibold">
            <dt>Estimated total</dt>
            <dd>{formatCurrency(estimatedTotal)}</dd>
          </div>
        </dl>
        <p className="text-xs text-emerald-900">
          *Final taxes, discounts, and shipping rates are calculated in Shopify
          Checkout after address entry.
        </p>
        <button
          type="button"
          onClick={beginCheckout}
          className="w-full rounded-full bg-emerald-600 px-5 py-3 text-base font-semibold text-white transition hover:bg-emerald-700"
        >
          Begin checkout
        </button>
        <Link
          href="/faq"
          className="inline-flex justify-center text-sm font-semibold text-emerald-700"
        >
          Shipping & tax policy
        </Link>
      </aside>
    </div>
  );
};
