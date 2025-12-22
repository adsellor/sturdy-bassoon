import Image from "next/image";
import Link from "next/link";
import type { AppleProduct } from "@/lib/types";
import { priceRangeLabel, weightRangeLabel } from "@/lib/utils";

export const ProductCard = ({ product }: { product: AppleProduct }) => (
  <article className="flex flex-col overflow-hidden rounded-2xl border border-zinc-100 bg-white shadow-sm shadow-emerald-50 transition hover:-translate-y-0.5 hover:shadow-md">
    <Link href={`/apples/${product.handle}`} className="relative block h-52 w-full">
      <Image
        src={product.heroImage}
        alt={product.title}
        fill
        sizes="(max-width:768px) 100vw, 400px"
        className="object-cover"
        priority={false}
      />
    </Link>
    <div className="flex flex-1 flex-col gap-4 p-5">
      <div className="flex flex-wrap gap-2">
        {product.badges.map((badge) => (
          <span
            key={badge}
            className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-900"
          >
            {badge}
          </span>
        ))}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-zinc-900">{product.title}</h3>
        <p className="mt-1 text-sm text-zinc-600">{product.summary}</p>
      </div>
      <dl className="text-sm text-zinc-700">
        <div className="flex justify-between">
          <dt className="font-medium text-zinc-500">Price range</dt>
          <dd>{priceRangeLabel(product)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="font-medium text-zinc-500">Weight range</dt>
          <dd>{weightRangeLabel(product)}</dd>
        </div>
      </dl>
      <Link
        href={`/apples/${product.handle}`}
        className="mt-auto inline-flex items-center justify-center rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
      >
        View details
      </Link>
    </div>
  </article>
);
