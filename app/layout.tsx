import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import Script from "next/script";

import Header from "./components/Header";
import PageTransition from "./providers/PageTransition";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://liteorbit.com"),

  title: {
    default: "Lite Orbit — Refined Essentials for Modern Living",
    template: "%s | Lite Orbit",
  },

  description:
    "Lite Orbit creates elevated essentials in apparel and home textiles, thoughtfully designed for modern living.",

  keywords: [
    "luxury essentials",
    "modern apparel",
    "premium bedding",
    "refined textiles",
    "quiet luxury brand",
    "Lite Orbit",
  ],

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    title: "Lite Orbit — Refined Essentials",
    description:
      "Elevated essentials thoughtfully designed for modern living.",
    url: "https://liteorbit.com",
    siteName: "Lite Orbit",
    images: [
      {
        url: "/hero.jpg", // Must be 1200x630 in /public
        width: 1280,
        height: 630,
        alt: "Lite Orbit Lifestyle",
      },
    ],
    locale: "en_CA",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Lite Orbit — Refined Essentials",
    description:
      "Elevated essentials thoughtfully designed for modern living.",
    images: ["/hero.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-[#F5F1EB] text-[#2F2F2F] antialiased min-h-screen flex flex-col`}
      >
        <Header />

        {/* MAIN CONTENT */}
        <main className="flex-grow">
          <PageTransition>{children}</PageTransition>
        </main>

        {/* FOOTER */}
        <footer className="py-16 px-10 bg-[#E3DED6] mt-24">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-[#6B6B6B]">
            <div className="tracking-[0.18em] font-light mb-6 md:mb-0">
              LITE ORBIT
            </div>

            <div className="space-x-8">
              <Link
                href="/privacy"
                className="hover:text-black transition duration-300"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="hover:text-black transition duration-300"
              >
                Terms
              </Link>
              <Link
                href="/contact"
                className="hover:text-black transition duration-300"
              >
                Contact
              </Link>
            </div>
          </div>
        </footer>

        {/* GOOGLE ANALYTICS */}
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
      </body>
    </html>
  );
}