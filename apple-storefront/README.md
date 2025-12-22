## Apple Storefront — Headless Shopify MVP

This repository contains a greenfield Next.js (App Router) implementation of the PRD/impact analysis for a headless apple storefront. The UI simulates Shopify data today and is wired for future Storefront API + Cart API calls, GA4 tracking, and Shopify Checkout handoff.

### Tech stack

- Next.js 16 (App Router) with React 19 and TypeScript
- Tailwind CSS 4 for design tokens
- Local mock data that mirrors Shopify product/variant modeling (shape + weight)
- Client providers for cart state, analytics events, and accessibility helpers

## Running locally

```bash
npm install
npm run dev
# open http://localhost:3000
```

### Environment variables

When you are ready to point at a real Shopify store, add the following variables to `.env.local` and swap the mock client in `src/lib/shopify.ts` with Storefront API requests:

```
NEXT_PUBLIC_SHOPIFY_DOMAIN=your-shop.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_VERSION=2024-10
NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=xxxx
```

Cart mutations would then call the Shopify Cart API and redirect to the returned `checkoutUrl`.

## Application map

| Route | Purpose |
| --- | --- |
| `/` | Hero, featured apples, project highlights |
| `/apples` | Catalog with shape/variety filters + price sorting |
| `/apples/[handle]` | PDP with variant selection (shape + weight), pricing, add to cart |
| `/cart` | Persistent cart drawer/page with begin checkout CTA |
| `/thank-you` | Post-checkout landing page (reads `orderId` + `email`) |
| `/about`, `/faq`, `/contact`, `/privacy`, `/terms` | CMS-backed content stubbed from `src/data/apples.ts` |
| `/healthz` | JSON heartbeat for uptime monitors |
| `/robots.txt`, `/sitemap.xml` | SEO-ready crawlers & discovery |

## Key modules

- `src/data/apples.ts` — mock dataset mirroring Shopify products, variants, and CMS pages
- `src/lib/shopify.ts` — abstraction layer for listing/filtering products (swap with real Storefront API later)
- `src/components/product-detail.tsx` — PDP UI with accessible selectors, price math, and cart analytics events
- `src/components/cart-provider.tsx` — localStorage-backed cart with add/update/remove helpers
- `src/components/analytics-provider.tsx` — tiny GA4-style dataLayer hook for product, list, add-to-cart, and begin-checkout events

## Implementation notes

- Weight increments (0.5 lb, 1–20 lb) and shapes adhere to the PRD. Variant IDs emulate Shopify variant SKUs for future API requests.
- `Add to cart` currently stores line items locally and shows an alert describing where the Shopify checkout redirect would occur. Replace with an API route when credentials are available.
- The UI emphasizes WCAG basics: skip link, focus-visible styles, button semantics, and aria-friendly controls.
- `sitemap.xml` and `robots.txt` use a placeholder production domain (`https://apple-storefront.example`). Update this when a real host is known.

## Next steps toward production

1. Replace `src/lib/shopify.ts` with real Storefront API queries (products, pages, cart).
2. Wire cart actions to Shopify Cart API and forward customers to the returned `checkoutUrl`.
3. Configure GA4 + Sentry keys and load their SDKs in `AnalyticsProvider`.
4. Move CMS content into Shopify Pages or a CMS of choice and fetch server-side.
5. Add automated tests for variant selection logic and cart actions.
