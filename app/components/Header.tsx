"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { cart } = useCart();

  const itemCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  // Prevent background scrolling when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  return (
    <header className="relative z-50 border-b border-[#E5E0D8]">

      {/* Top Bar */}
      <div className="px-6 md:px-10 py-6 md:py-8 max-w-7xl mx-auto w-full flex items-center justify-between">

        {/* Logo + Brand */}
        <Link href="/" className="flex items-center space-x-3">
          <img
            src="/logo.png"
            alt="Lite Orbit Logo"
            className="h-8 md:h-14 w-auto"
          />

          <div className="leading-tight">
            <span
              className="block text-base md:text-3xl italic"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Lite Orbit
            </span>

            <span className="block text-xs md:text-lg tracking-wide text-[#6B6B6B]">
              Essentials, Reconsidered.
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-10 text-sm text-[#6B6B6B] items-center">
          <Link href="/" className="hover:text-black transition">Home</Link>
          <Link href="/about" className="hover:text-black transition">About</Link>
          <Link href="/collection" className="hover:text-black transition">Collection</Link>
          <Link href="/shop" className="hover:text-black transition">Shop</Link>
          <Link href="/contact" className="hover:text-black transition">Contact</Link>

          <Link href="/cart" className="hover:text-black transition">
            Cart
            {itemCount > 0 && (
              <span className="ml-1 font-medium">
                ({itemCount})
              </span>
            )}
          </Link>
        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-3xl z-50"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Fullscreen Overlay */}
      {open && (
        <div className="fixed inset-0 bg-[#F5F1EB]/95 backdrop-blur-md flex flex-col items-center justify-center space-y-10 text-2xl text-[#2F2F2F] tracking-wide md:hidden">

          <Link href="/" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/about" onClick={() => setOpen(false)}>About</Link>
          <Link href="/collection" onClick={() => setOpen(false)}>Collection</Link>
          <Link href="/shop" onClick={() => setOpen(false)}>Shop</Link>
          <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>

          <Link href="/cart" onClick={() => setOpen(false)}>
            Cart {itemCount > 0 && `(${itemCount})`}
          </Link>

        </div>
      )}
    </header>
  );
}