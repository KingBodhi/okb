import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[var(--dark-bg)] py-16 border-t border-[var(--gold)]/20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-cinzel text-white tracking-[0.15em] uppercase text-lg mb-4">
              Oklahoma Billionaire
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Building ventures that facilitate Global Economic Abundance through technology, innovation, and the arts.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[var(--gold-light)] tracking-[0.15em] uppercase text-sm font-semibold mb-4">
              Quick Links
            </h4>
            <div className="flex flex-col gap-2">
              <Link href="/vision" className="text-sm text-gray-400 hover:text-[var(--gold-light)] transition-colors">
                Vision
              </Link>
              <Link href="/ventures" className="text-sm text-gray-400 hover:text-[var(--gold-light)] transition-colors">
                Ventures
              </Link>
              <Link href="/news" className="text-sm text-gray-400 hover:text-[var(--gold-light)] transition-colors">
                News
              </Link>
              <Link href="/press" className="text-sm text-gray-400 hover:text-[var(--gold-light)] transition-colors">
                Press
              </Link>
              <Link href="/contact" className="text-sm text-gray-400 hover:text-[var(--gold-light)] transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[var(--gold-light)] tracking-[0.15em] uppercase text-sm font-semibold mb-4">
              Contact
            </h4>
            <Link
              href="mailto:theoffice@oklahomabillionaire.com"
              className="text-sm text-gray-400 hover:text-[var(--gold-light)] transition-colors"
            >
              theoffice@oklahomabillionaire.com
            </Link>
            <p className="text-sm text-gray-500 mt-4">
              Ponca City, Oklahoma
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-[var(--gold)]/20 mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} The Office of the Oklahoma Billionaire. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600">Powered by</span>
            <Link
              href="https://powerclubglobal.com"
              target="_blank"
              className="text-xs text-[var(--gold)] hover:text-[var(--gold-light)] transition-colors"
            >
              PowerClub Global
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
