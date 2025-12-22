"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "./cart-provider";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/apples", label: "All Apples" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

const isActive = (pathname: string, href: string) =>
  pathname === href || (href !== "/" && pathname.startsWith(href));

export const Header = () => {
  const pathname = usePathname();
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Apple Storefront
        </Link>
        <nav className="hidden gap-4 text-sm font-medium text-zinc-600 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-3 py-1 transition-colors ${
                isActive(pathname, link.href)
                  ? "bg-emerald-50 text-emerald-800"
                  : "hover:text-emerald-700"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/cart"
            className="relative rounded-full border border-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50"
          >
            Cart
            <span className="ml-2 inline-flex min-w-[1.5rem] justify-center rounded-full bg-emerald-600 px-2 py-0.5 text-xs font-bold text-white">
              {itemCount}
            </span>
          </Link>
        </div>
      </div>
      <div className="border-t border-zinc-100 bg-emerald-50 p-2 text-center text-xs font-medium text-emerald-900 md:hidden">
        <span>Browse:</span>
        <div className="mt-2 flex flex-wrap justify-center gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full bg-white px-3 py-1 text-xs text-emerald-700 shadow-sm"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};
