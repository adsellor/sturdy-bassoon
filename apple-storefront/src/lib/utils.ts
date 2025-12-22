import type { AppleProduct, AppleShape } from "./types";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

export const formatCurrency = (value: number) => currency.format(value);

export const formatWeight = (weight: number) =>
  `${weight % 1 === 0 ? weight.toFixed(0) : weight.toFixed(1)} lb`;

export const weightRangeLabel = (product: AppleProduct) => {
  const min = formatWeight(product.options.minWeight);
  const max = formatWeight(product.options.maxWeight);
  return `${min} – ${max}`;
};

export const priceRangeLabel = (product: AppleProduct) => {
  const prices = product.variants.map((variant) => variant.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return min === max
    ? formatCurrency(min)
    : `${formatCurrency(min)} – ${formatCurrency(max)}`;
};

export const buildVariantId = (
  handle: string,
  shape: AppleShape,
  weight: number,
) => `${handle}-${shape}-${weight}`;
