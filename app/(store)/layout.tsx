import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import Script from "next/script";

import Header from "@/components/Header";
import PageTransition from "@/providers/PageTransition";
import { CartProvider } from "@/context/CartContext";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  // keep everything exactly as you already have it
};

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${inter.className} bg-[#F5F1EB] text-[#2F2F2F] min-h-screen flex flex-col`}
    >
      <CartProvider>
        <Header />

        <main className="flex-grow">
          <PageTransition>{children}</PageTransition>
        </main>

        <footer className="py-16 px-10 bg-[#E3DED6] mt-24">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-[#6B6B6B]">
            <div className="tracking-[0.18em] font-light mb-6 md:mb-0">
              LITE ORBIT
            </div>

            <div className="space-x-8">
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>
        </footer>

        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}
      </CartProvider>
    </div>
  );
}