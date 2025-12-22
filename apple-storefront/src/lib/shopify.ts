import { appleProducts } from "@/data/apples";
import type {
  AppleProduct,
  AppleShape,
  ProductFilters,
  ProductListResult,
  ProductSort,
} from "./types";

const sortProducts = (products: AppleProduct[], sort?: ProductSort) => {
  switch (sort) {
    case "price-asc":
      return [...products].sort(
        (a, b) =>
          Math.min(...a.variants.map((variant) => variant.price)) -
          Math.min(...b.variants.map((variant) => variant.price)),
      );
    case "price-desc":
      return [...products].sort(
        (a, b) =>
          Math.max(...b.variants.map((variant) => variant.price)) -
          Math.max(...a.variants.map((variant) => variant.price)),
      );
    default:
      return products;
  }
};

const applyFilters = (
  products: AppleProduct[],
  filters?: ProductFilters,
): AppleProduct[] => {
  if (!filters) {
    return products;
  }

  return products.filter((product) => {
    let passes = true;
    if (filters.shape) {
      passes =
        passes &&
        product.options.shapes.includes(filters.shape) &&
        product.variants.some(
          (variant) =>
            variant.shape === filters.shape && variant.available === true,
        );
    }

    if (filters.variety) {
      passes =
        passes &&
        product.variety.toLowerCase() === filters.variety.toLowerCase();
    }

    if (filters.minWeight) {
      passes =
        passes &&
        product.variants.some(
          (variant) => variant.weightLbs >= (filters.minWeight ?? 0),
        );
    }

    if (filters.maxWeight) {
      passes =
        passes &&
        product.variants.some(
          (variant) => variant.weightLbs <= (filters.maxWeight ?? 0),
        );
    }

    return passes;
  });
};

export const listProducts = async (
  filters?: ProductFilters,
  sort?: ProductSort,
): Promise<ProductListResult> => {
  const filtered = applyFilters(appleProducts, filters);
  const sorted = sortProducts(filtered, sort);
  const shapes = Array.from(
    new Set(appleProducts.flatMap((product) => product.options.shapes)),
  ) as AppleShape[];
  const varieties = Array.from(
    new Set(appleProducts.map((product) => product.variety)),
  );

  return {
    products: sorted,
    filters: {
      shapes,
      varieties,
    },
  };
};

export const getProductByHandle = async (handle: string) =>
  appleProducts.find((product) => product.handle === handle);

export const getFeaturedProducts = async (count = 3) =>
  appleProducts.slice(0, count);

export const getAllHandles = async () => appleProducts.map((p) => p.handle);
