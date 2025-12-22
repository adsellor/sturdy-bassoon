import Link from "next/link";

export const Footer = () => (
  <footer className="border-t border-zinc-200 bg-white">
    <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-8 text-sm text-zinc-600 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <p>© {new Date().getFullYear()} Apple Storefront. All rights reserved.</p>
      <nav className="flex flex-wrap gap-4">
        <Link className="hover:text-emerald-700" href="/privacy">
          Privacy
        </Link>
        <Link className="hover:text-emerald-700" href="/terms">
          Terms
        </Link>
        <Link className="hover:text-emerald-700" href="/thank-you">
          Thank you
        </Link>
      </nav>
    </div>
  </footer>
);
