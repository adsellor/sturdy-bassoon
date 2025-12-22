import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Providers } from "@/components/providers";
import { SkipLink } from "@/components/skip-link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://apple-storefront.example"),
  title: {
    default: "Apple Storefront — Headless Shopify MVP",
    template: "%s — Apple Storefront",
  },
  description:
    "Browse apple varieties, select shape and weight, and checkout securely through Shopify.",
  openGraph: {
    title: "Apple Storefront",
    description:
      "Domestic apple storefront with shape and weight selection powered by Shopify.",
    url: "https://apple-storefront.example",
    siteName: "Apple Storefront",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-[#f4fbf7] text-zinc-900 antialiased`}
      >
        <Providers>
          <SkipLink />
          <Header />
          <main
            id="main"
            className="mx-auto min-h-screen w-full max-w-5xl px-4 py-10 sm:px-6"
          >
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
