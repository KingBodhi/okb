import Link from "next/link";

export default function Dashboard() {
  return (
    <section className="min-h-screen bg-[var(--dark-bg)] flex items-center justify-center px-6">
      <div className="max-w-2xl mx-auto text-center">
        {/* Logo/Icon Area */}
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto border-2 border-[var(--gold)]/30 rounded-full flex items-center justify-center mb-6">
            <span className="text-[var(--gold)] text-4xl font-cinzel">PCG</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="font-cinzel text-white text-3xl md:text-4xl tracking-[0.1em] uppercase mb-4">
          PCG Dashboard
        </h1>
        <div className="w-16 h-0.5 bg-[var(--gold)] mx-auto mb-8" />

        {/* Description */}
        <p className="text-gray-400 leading-relaxed mb-4">
          The PCG Dashboard ecosystem is coming soon.
        </p>
        <p className="text-gray-500 text-sm leading-relaxed mb-12">
          This portal will provide unified access to analytics, operations,
          and venture management across the Oklahoma Billionaire network.
        </p>

        {/* Status */}
        <div className="inline-block border border-[var(--gold)]/30 px-6 py-3 mb-12">
          <span className="text-[var(--gold-light)] tracking-[0.2em] uppercase text-sm">
            Coming Soon
          </span>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/admin/panel"
            className="btn-outline text-[var(--gold-light)] border-[var(--gold-light)] hover:bg-[var(--gold-light)] hover:text-black"
          >
            Go to Admin Panel
          </Link>
          <Link
            href="/"
            className="btn-outline text-gray-400 border-gray-600 hover:bg-gray-600 hover:text-white"
          >
            Return Home
          </Link>
        </div>

        {/* PowerClub Global Link */}
        <div className="mt-16 pt-8 border-t border-[var(--gold)]/10">
          <p className="text-xs text-gray-600 mb-2">Powered by</p>
          <Link
            href="https://powerclubglobal.com"
            target="_blank"
            className="text-[var(--gold)] hover:text-[var(--gold-light)] transition-colors text-sm"
          >
            PowerClub Global
          </Link>
        </div>
      </div>
    </section>
  );
}
