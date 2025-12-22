"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { AppleShape, ProductSort } from "@/lib/types";
import { useCallback } from "react";

interface FilterBarProps {
  shapes: AppleShape[];
  varieties: string[];
}

const updateParam = (
  params: URLSearchParams,
  key: string,
  value: string | null,
) => {
  if (!value) {
    params.delete(key);
  } else {
    params.set(key, value);
  }
};

export const FilterBar = ({ shapes, varieties }: FilterBarProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      updateParam(params, key, value.length ? value : null);
      router.push(`/apples?${params.toString()}`);
    },
    [router, searchParams],
  );

  const currentShape = searchParams.get("shape") ?? "";
  const currentVariety = searchParams.get("variety") ?? "";
  const currentSort = (searchParams.get("sort") ?? "relevance") as ProductSort;

  return (
    <section className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-sm font-medium text-emerald-900">
          Shape
          <select
            className="rounded-xl border border-emerald-100 bg-white px-3 py-2 text-sm text-zinc-800"
            value={currentShape}
            onChange={(event) => handleChange("shape", event.target.value)}
          >
            <option value="">All shapes</option>
            {shapes.map((shape) => (
              <option key={shape} value={shape}>
                {shape}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium text-emerald-900">
          Variety
          <select
            className="rounded-xl border border-emerald-100 bg-white px-3 py-2 text-sm text-zinc-800"
            value={currentVariety}
            onChange={(event) => handleChange("variety", event.target.value)}
          >
            <option value="">All varieties</option>
            {varieties.map((variety) => (
              <option key={variety} value={variety}>
                {variety}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium text-emerald-900">
          Sort by
          <select
            className="rounded-xl border border-emerald-100 bg-white px-3 py-2 text-sm text-zinc-800"
            value={currentSort}
            onChange={(event) =>
              handleChange("sort", event.target.value as ProductSort)
            }
          >
            <option value="relevance">Relevance</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
        </label>
      </div>
    </section>
  );
};
