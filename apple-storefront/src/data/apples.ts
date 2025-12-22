import type { AppleProduct, AppleShape } from "@/lib/types";
import { buildVariantId } from "@/lib/utils";

const baseWeights = Array.from({ length: 39 }, (_, index) =>
  Number((1 + index * 0.5).toFixed(1)),
);

const createVariants = (
  handle: string,
  shapes: AppleShape[],
  pricePerLb: number,
  soldOut: Partial<Record<AppleShape, number[]>> = {},
) =>
  shapes.flatMap((shape) =>
    baseWeights.map((weight) => {
      const soldOutWeights = soldOut[shape] ?? [];
      const available = !soldOutWeights.includes(weight);
      return {
        id: buildVariantId(handle, shape, weight),
        sku: `${handle}-${shape.substring(0, 1)}-${weight}`.replaceAll(" ", ""),
        weightLbs: weight,
        shape,
        price: Number((pricePerLb * weight).toFixed(2)),
        available,
        inventory: available ? Math.max(5, Math.floor(Math.random() * 40)) : 0,
      };
    }),
  );

export const appleProducts: AppleProduct[] = [
  {
    id: "gala",
    handle: "gala",
    title: "Gala Apples",
    variety: "Gala",
    summary:
      "Crisp, honey-sweet Galas descended from New Zealand orchards and grown with regenerative practices.",
    description:
      "Our Galas are grown in cool highlands for longer hang-time, producing vibrant striping and balanced sweetness. Each apple is hand-selected, rinsed, and packed within 24 hours of picking for remarkable crunch.",
    heroImage:
      "https://images.unsplash.com/photo-1502740479091-635887520276?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502741126161-b048400d085d?auto=format&fit=crop&w=1200&q=80",
    ],
    pricePerLb: 3.5,
    badges: ["Organic", "Best Seller"],
    origin: "Yakima Valley, Washington",
    flavorProfile: "Light honey, floral finish, crisp bite",
    tastingNotes: [
      "Peak sweetness harvested at 14–15 °Brix",
      "Ideal for snacking and salads",
      "Holds texture when baked in tarts",
    ],
    nutritionNotes: [
      "Good source of fiber (4g per medium apple)",
      "Rich in vitamin C and antioxidants",
      "Naturally fat-free and cholesterol-free",
    ],
    options: {
      shapes: ["Round", "Pear-shaped"],
      minWeight: 1,
      maxWeight: 20,
      increment: 0.5,
    },
    seo: {
      title: "Gala Apples — Apple Storefront",
      description:
        "Shop regenerative Gala apples by weight with shape selection and domestic shipping.",
    },
    variants: createVariants("gala", ["Round", "Pear-shaped"], 3.5, {
      "Pear-shaped": [1, 1.5],
    }),
  },
  {
    id: "honeycrisp",
    handle: "honeycrisp",
    title: "Honeycrisp Apples",
    variety: "Honeycrisp",
    summary:
      "Juicy, shattering Honeycrisps with complex sweetness and a touch of acidity for perfect snacking.",
    description:
      "These Honeycrisps travel directly from our cold storage to you, packed with humidity control to retain that iconic pop. Choose the shape that fits your recipe or aesthetic, and pick the exact pounds you need.",
    heroImage:
      "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1447175008436-054170c2e979?auto=format&fit=crop&w=1200&q=80",
    ],
    pricePerLb: 4.25,
    badges: ["Staff Pick"],
    origin: "Finger Lakes, New York",
    flavorProfile: "Snappy acidity, maple sweetness, aromatic finish",
    tastingNotes: [
      "Harvested at peak pressure for crispness",
      "Pairs well with aged cheddar or nut butters",
      "Maintains structure in pies and galettes",
    ],
    nutritionNotes: [
      "Excellent source of hydration (84% water)",
      "Contains potassium and manganese",
      "No added sugar — naturally sweet",
    ],
    options: {
      shapes: ["Round", "Pear-shaped", "Odd-shaped"],
      minWeight: 1,
      maxWeight: 20,
      increment: 0.5,
    },
    seo: {
      title: "Honeycrisp Apples — Apple Storefront",
      description:
        "Customize Honeycrisp orders by shape and weight with transparent pricing per pound.",
    },
    variants: createVariants(
      "honeycrisp",
      ["Round", "Pear-shaped", "Odd-shaped"],
      4.25,
      { "Odd-shaped": [2, 2.5, 3] },
    ),
  },
  {
    id: "fuji",
    handle: "fuji",
    title: "Fuji Apples",
    variety: "Fuji",
    summary:
      "Dense, candy-sweet Fujis perfect for juicing, roasting, or eating straight from the crate.",
    description:
      "Our Fujis lean into natural caramel notes thanks to warm daytime temps and cool nights. Expect dense flesh and a satisfying crunch even after long storage.",
    heroImage:
      "https://images.unsplash.com/photo-1506804881824-860fba4d1070?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1481391032119-d89fee407e44?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=1200&q=80",
    ],
    pricePerLb: 3.25,
    badges: ["New Harvest"],
    origin: "Okanogan County, Washington",
    flavorProfile: "Caramel, vanilla, low acidity",
    tastingNotes: [
      "Low acid profile makes it kid-friendly",
      "Excellent for slow roasting or dehydrating",
      "Balances savory dishes like pork tenderloin",
    ],
    nutritionNotes: [
      "High polyphenol content",
      "Provides 12% daily fiber per serving",
      "Naturally gluten-free and vegan",
    ],
    options: {
      shapes: ["Round", "Odd-shaped"],
      minWeight: 1,
      maxWeight: 20,
      increment: 0.5,
    },
    seo: {
      title: "Fuji Apples — Apple Storefront",
      description:
        "Build Fuji apple shipments with half-pound increments and transparent per-pound pricing.",
    },
    variants: createVariants("fuji", ["Round", "Odd-shaped"], 3.25, {
      Round: [10, 10.5, 11],
    }),
  },
];

export const cmsPages = {
  about: {
    title: "About Apple Storefront",
    intro:
      "We are a headless storefront connected to Shopify Admin, giving growers direct tools to manage catalog, pricing, and inventory without touching code.",
    highlights: [
      "Domestic shipping with live carrier rates",
      "Transparent pricing by weight with per-lb metafields",
      "Accessible, mobile-first experience built on Next.js",
    ],
  },
  faq: {
    title: "Frequently Asked Questions",
    items: [
      {
        question: "How are weights calculated?",
        answer:
          "Each variant weight maps to a Shopify variant so pricing, taxes, and shipping stay in sync with checkout.",
      },
      {
        question: "Do you ship internationally?",
        answer:
          "Not yet. The MVP supports US domestic shipping with carrier-calculated rates.",
      },
      {
        question: "Can I mix apple varieties in one shipment?",
        answer:
          "Yes. Add different varieties to the cart and checkout once. Shopify will optimize packaging and rates.",
      },
    ],
  },
  contact: {
    title: "Contact",
    email: "orchard@applestorefront.test",
    phone: "+1 (415) 555-0199",
    address: "2121 Orchard Row, Sebastopol, CA 95472",
  },
  privacy: {
    title: "Privacy Policy",
    body: [
      "We rely on Shopify Checkout for payment collection so payment data never touches this storefront.",
      "Analytics is handled via GA4 with cross-domain linking and respects global privacy control signals.",
    ],
  },
  terms: {
    title: "Terms of Service",
    body: [
      "Apples are agricultural products and weights may vary ±2%.",
      "Shipping timelines are subject to carrier performance and weather holds.",
    ],
  },
};
