"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  { href: "/about", label: "About" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
  { href: "/press", label: "Press" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 right-0 z-50 pt-6">
      <nav className="max-w-7xl mx-auto px-6 relative">
        {/* Logo - Centered */}
        <div className="text-center mb-3">
          <Link
            href="/"
            className="text-white hover:opacity-80 transition-opacity text-xl md:text-2xl font-semibold tracking-wide font-cinzel"
          >
            oklahoma billionaire
          </Link>
        </div>

        {/* Desktop Navigation - Centered Below Logo */}
        <div className="hidden md:flex items-center justify-center gap-10">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-base font-semibold tracking-wide text-white hover:text-white/80 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Login - Top Right */}
        <Link
          href="/login"
          className="hidden md:block absolute top-0 right-6 text-base font-semibold tracking-wide text-white hover:text-white/80 transition-colors"
        >
          Login
        </Link>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex justify-center">
          <button
            className="p-2 text-white text-2xl"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/20">
            <div className="flex flex-col items-center gap-4 pt-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-base font-semibold tracking-wide text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/login"
                className="text-base font-semibold tracking-wide text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
