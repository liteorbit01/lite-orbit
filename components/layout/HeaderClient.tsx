"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import CartBadge from "@/components/cart/CartBadge";

type HeaderClientProps = {
  itemCount: number;
};

export default function HeaderClient({
  itemCount,
}: HeaderClientProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open
      ? "hidden"
      : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <header className="relative z-50 border-b border-[#E5E0D8]">

      {/* Top Bar */}
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 md:px-10 md:py-8">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center space-x-3"
        >
          <Image
            src="/logo.png"
            alt="Lite Orbit Logo"
            width={224}
            height={56}
            priority
            className="h-8 w-auto md:h-14"
          />

          <div className="leading-tight">

            <span
              className="block text-base italic md:text-3xl"
              style={{
                fontFamily:
                  "'Playfair Display', serif",
              }}
            >
              Lite Orbit
            </span>

            <span className="block text-xs tracking-wide text-[#6B6B6B] md:text-lg">
              Essentials, Reconsidered.
            </span>

          </div>

        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-10 text-sm text-[#6B6B6B] md:flex">

          <Link
            href="/"
            className="transition hover:text-black"
          >
            Home
          </Link>

          <Link
            href="/about"
            className="transition hover:text-black"
          >
            About
          </Link>

          <Link
            href="/collection"
            className="transition hover:text-black"
          >
            Collection
          </Link>

          <Link
            href="/shop"
            className="transition hover:text-black"
          >
            Shop
          </Link>

          <Link
            href="/contact"
            className="transition hover:text-black"
          >
            Contact
          </Link>

          <CartBadge itemCount={itemCount} />

        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="z-50 text-3xl md:hidden"
          aria-label={
            open
              ? "Close menu"
              : "Open menu"
          }
        >
          {open ? "✕" : "☰"}
        </button>

      </div>

      {/* Mobile Fullscreen Menu */}
      {open && (

        <div className="fixed inset-0 flex flex-col items-center justify-center space-y-10 bg-[#F5F1EB]/95 text-2xl tracking-wide text-[#2F2F2F] backdrop-blur-md md:hidden">

          <Link
            href="/"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>

          <Link
            href="/about"
            onClick={() => setOpen(false)}
          >
            About
          </Link>

          <Link
            href="/collection"
            onClick={() => setOpen(false)}
          >
            Collection
          </Link>

          <Link
            href="/shop"
            onClick={() => setOpen(false)}
          >
            Shop
          </Link>

          <Link
            href="/contact"
            onClick={() => setOpen(false)}
          >
            Contact
          </Link>

          <Link
            href="/cart"
            onClick={() => setOpen(false)}
          >
            Cart
            {itemCount > 0 &&
              ` (${itemCount})`}
          </Link>

        </div>

      )}

    </header>
  );
}