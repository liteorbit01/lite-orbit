"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="px-6 md:px-10 py-6 md:py-8 max-w-7xl mx-auto w-full">

      <div className="flex items-center justify-between">

        {/* Left: Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <img
            src="/logo.png"
            alt="Lite Orbit Logo"
            className="h-10 md:h-16 w-auto"
          />

          {/* Brand Name (Visible on ALL screens) */}
          <span
            className="text-xl md:text-6xl italic tracking-wide"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Lite Orbit
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-10 text-sm text-[#6B6B6B]">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/collection">Collection</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl"
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden mt-6 flex flex-col space-y-4 text-center text-lg text-[#6B6B6B]">
          <Link href="/" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/about" onClick={() => setOpen(false)}>About</Link>
          <Link href="/collection" onClick={() => setOpen(false)}>Collection</Link>
          <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
        </div>
      )}

    </header>
  );
}