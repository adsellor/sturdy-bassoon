export type AppleShape = "Round" | "Pear-shaped" | "Odd-shaped";

export interface AppleVariant {
  id: string;
  sku: string;
  weightLbs: number;
  shape: AppleShape;
  price: number;
  available: boolean;
  inventory: number;
}

export interface AppleProduct {
  id: string;
  handle: string;
  title: string;
  variety: string;
  summary: string;
  description: string;
  heroImage: string;
  gallery: string[];
  pricePerLb: number;
  badges: string[];
  origin: string;
  flavorProfile: string;
  tastingNotes: string[];
  nutritionNotes: string[];
  options: {
    shapes: AppleShape[];
    minWeight: number;
    maxWeight: number;
    increment: number;
  };
  seo: {
    title: string;
    description: string;
  };
  variants: AppleVariant[];
}

export interface ProductFilters {
  shape?: AppleShape;
  variety?: string;
  minWeight?: number;
  maxWeight?: number;
}

export type ProductSort = "relevance" | "price-asc" | "price-desc";

export interface ProductListResult {
  products: AppleProduct[];
  filters: {
    shapes: AppleShape[];
    varieties: string[];
  };
}

export interface CartItem {
  id: string;
  productHandle: string;
  productTitle: string;
  shape: AppleShape;
  weightLbs: number;
  price: number;
  quantity: number;
  image: string;
}

export interface CartState {
  items: CartItem[];
  updatedAt: string | null;
}
