"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = useState(false);

  // Prevent background scrolling when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  return (
    <header className="relative z-50">

      {/* Top Bar */}
      <div className="px-6 md:px-10 py-6 md:py-8 max-w-7xl mx-auto w-full flex items-center justify-between">

        {/* Logo + Brand */}
        <Link href="/" className="flex items-center space-x-3">
          <img
            src="/logo.png"
            alt="Lite Orbit Logo"
            className="h-10 md:h-16 w-auto"
          />
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
          className="md:hidden text-3xl transition-transform duration-300"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Overlay (Below Header Only) */}
      {open && (
        <div className="md:hidden absolute top-full left-0 w-full h-[calc(100vh-100%)]">

          {/* Background */}
          <div
            className="absolute inset-0 bg-[#F5F1EB]/95 backdrop-blur-md"
            onClick={() => setOpen(false)}
          />

          {/* Menu Content */}
          <div className="relative flex flex-col items-center justify-center h-full space-y-10 text-2xl text-[#2F2F2F] tracking-wide animate-fadeSlide">
            <Link href="/" onClick={() => setOpen(false)}>Home</Link>
            <Link href="/about" onClick={() => setOpen(false)}>About</Link>
            <Link href="/collection" onClick={() => setOpen(false)}>Collection</Link>
            <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
          </div>

        </div>
      )}
    </header>
  );
}