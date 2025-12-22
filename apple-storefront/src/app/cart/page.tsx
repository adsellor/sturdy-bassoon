import type { Metadata } from "next";
import { CartPage } from "@/components/cart-page";

export const metadata: Metadata = {
  title: "Cart",
  description:
    "Review apple line items, confirm weight and shape selections, then continue to Shopify Checkout.",
};

export default function Cart() {
  return <CartPage />;
}
