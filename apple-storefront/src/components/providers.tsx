"use client";

import { AnalyticsProvider } from "./analytics-provider";
import { CartProvider } from "./cart-provider";

export const Providers = ({ children }: { children: React.ReactNode }) => (
  <AnalyticsProvider>
    <CartProvider>{children}</CartProvider>
  </AnalyticsProvider>
);
