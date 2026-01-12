"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { socialLinks } from "./Footer";

const navItems = [
  { href: "/vision", label: "Vision" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/news", label: "News" },
  { href: "/press", label: "Press" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerBg = isScrolled
    ? "bg-white/95 backdrop-blur-md border-b border-[var(--gold)]/20 shadow-sm"
    : "bg-transparent";

  const textColor = isScrolled ? "text-black" : "text-white";
  const logoColor = isScrolled ? "text-black" : "text-white";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg}`}>
      <nav className="max-w-7xl mx-auto px-6 py-4 relative">
        {/* Logo - Centered */}
        <div className="text-center mb-3">
          <Link
            href="/"
            className={`${logoColor} hover:text-[var(--gold)] transition-colors text-lg md:text-xl tracking-[0.15em] uppercase font-cinzel`}
          >
            Oklahoma Billionaire
          </Link>
        </div>

        {/* Desktop Navigation - Centered Below Logo */}
        <div className="hidden md:flex items-center justify-center gap-10">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm tracking-[0.15em] uppercase font-medium ${textColor} hover:text-[var(--gold)] transition-colors`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex justify-center">
          <button
            className={`p-2 ${textColor} text-2xl hover:text-[var(--gold)] transition-colors`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 bg-[var(--dark-bg)] rounded-lg border border-[var(--gold)]/30">
            <div className="flex flex-col items-center gap-4 pt-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm tracking-[0.15em] uppercase font-medium text-white hover:text-[var(--gold-light)] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="w-12 h-px bg-[var(--gold)]/30 my-2" />
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 border border-[var(--gold)]/30 flex items-center justify-center text-gray-400 hover:text-[var(--gold-light)] hover:border-[var(--gold)] transition-colors text-xs"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
