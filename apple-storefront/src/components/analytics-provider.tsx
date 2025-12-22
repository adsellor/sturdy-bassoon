"use client";

import { createContext, useCallback, useContext } from "react";

type AnalyticsEvent =
  | { name: "product_view"; payload: { handle: string } }
  | { name: "list_view"; payload: { source: string } }
  | { name: "add_to_cart"; payload: { handle: string; variantId: string } }
  | { name: "begin_checkout"; payload: { value: number } }
  | { name: string; payload?: Record<string, unknown> };

interface AnalyticsContextValue {
  track: (event: AnalyticsEvent) => void;
}

const AnalyticsContext = createContext<AnalyticsContextValue>({
  track: () => undefined,
});

export const AnalyticsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const track = useCallback((event: AnalyticsEvent) => {
    if (typeof window === "undefined") {
      return;
    }
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({
      event: event.name,
      ...event.payload,
    });
    if (process.env.NODE_ENV === "development") {
      console.info("[analytics]", event.name, event.payload);
    }
  }, []);

  return (
    <AnalyticsContext.Provider value={{ track }}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = () => useContext(AnalyticsContext);
