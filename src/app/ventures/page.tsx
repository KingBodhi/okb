import Link from "next/link";
import {
  fundVenture,
  agencyVenture,
  infrastructureVentures,
  philanthropyVentures,
  fineArtVentures,
  oklahomaVentures
} from "@/data/ventures";

export default function Ventures() {
  return (
    <>
      {/* ============================================
          HERO SECTION - Black/Gold
          ============================================ */}
      <section className="relative py-32 px-6 bg-[var(--dark-bg)]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[var(--gold)] tracking-[0.3em] uppercase text-sm mb-4">
            The Investment Vehicle
          </p>
          <h1 className="font-cinzel text-white text-4xl md:text-5xl tracking-[0.1em] uppercase mb-6">
            {fundVenture.name}
          </h1>
          <div className="w-16 h-0.5 bg-[var(--gold)] mx-auto mb-8" />
          <p className="text-[var(--gold-light)] text-xl italic mb-6">
            &ldquo;{fundVenture.tagline}&rdquo;
          </p>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            {fundVenture.description}
          </p>
        </div>
      </section>

      {/* ============================================
          THE AGENCY - White/Gold
          ============================================ */}
      <section className="py-20 px-6 bg-white border-b border-[var(--border)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-[var(--gold)] tracking-[0.3em] uppercase text-sm mb-2">
              The Engine
            </p>
          </div>

          <div className="venture-card max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <h2 className="font-cinzel text-2xl tracking-wide">{agencyVenture.name}</h2>
                  <span className="badge-live">Live</span>
                </div>
                <p className="text-sm text-[var(--gold)] tracking-wider uppercase mb-4">
                  {agencyVenture.sector}
                </p>
                <p className="text-[var(--muted-foreground)] leading-relaxed mb-6">
                  {agencyVenture.description}
                </p>
                {agencyVenture.features && (
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {agencyVenture.features.map((feature, i) => (
                      <p key={i} className="text-sm text-[var(--muted-foreground)]">
                        • {feature}
                      </p>
                    ))}
                  </div>
                )}
              </div>
              <div className="md:text-right">
                <Link
                  href={agencyVenture.url!}
                  target="_blank"
                  className="btn-primary inline-block"
                >
                  Visit Site
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          PORTFOLIO HEADER - Black/Gold
          ============================================ */}
      <section className="py-16 px-6 bg-[var(--dark-bg)]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-cinzel text-white text-2xl md:text-3xl tracking-[0.15em] uppercase mb-4">
            The Portfolio
          </h2>
          <div className="w-16 h-0.5 bg-[var(--gold)] mx-auto mb-6" />
          <p className="text-gray-400">
            Strategic investments across four key areas
          </p>
        </div>
      </section>

      {/* ============================================
          INFRASTRUCTURE - White/Gold
          ============================================ */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="font-cinzel text-2xl tracking-[0.15em] uppercase mb-4">
              Infrastructure
            </h3>
            <div className="heading-divider" />
            <p className="text-[var(--muted-foreground)]">
              Building the decentralized systems that power a free and open future
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {infrastructureVentures.map((venture) => (
              <div key={venture.id} className="venture-card">
                <div className="flex items-center gap-4 mb-4">
                  <h4 className="font-cinzel text-lg tracking-wide">{venture.name}</h4>
                  <span className={venture.status === "LIVE" ? "badge-live" : "badge-building"}>
                    {venture.status === "LIVE" ? "Live" : "Building"}
                  </span>
                </div>
                <p className="text-sm text-[var(--gold)] tracking-wider uppercase mb-2">
                  {venture.sector}
                </p>
                <p className="text-sm text-[var(--gold-muted)] italic mb-4">
                  {venture.tagline}
                </p>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-4">
                  {venture.description}
                </p>
                {venture.url && (
                  <Link
                    href={venture.url}
                    target="_blank"
                    className="text-sm text-[var(--gold)] hover:text-[var(--gold-dark)] transition-colors inline-flex items-center gap-2"
                  >
                    Visit Site <span>→</span>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          OKLAHOMA - Black/Gold
          ============================================ */}
      <section className="py-20 px-6 bg-[var(--dark-bg)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="font-cinzel text-white text-2xl tracking-[0.15em] uppercase mb-4">
              Oklahoma
            </h3>
            <div className="w-16 h-0.5 bg-[var(--gold)] mx-auto mb-6" />
            <p className="text-gray-400">
              Building prosperity and opportunity in the heartland
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {oklahomaVentures.map((venture) => (
              <div key={venture.id} className="venture-card-dark border-[var(--gold)]/30">
                <div className="flex items-center gap-4 mb-4">
                  <h4 className="font-cinzel text-white text-lg tracking-wide">{venture.name}</h4>
                  <span className="badge-building border-[var(--gold)] text-[var(--gold)]">
                    Building
                  </span>
                </div>
                <p className="text-sm text-[var(--gold-light)] tracking-wider uppercase mb-2">
                  {venture.sector}
                </p>
                <p className="text-sm text-[var(--gold-muted)] italic mb-4">
                  {venture.tagline}
                </p>
                <p className="text-sm text-gray-400 leading-relaxed mb-4">
                  {venture.description}
                </p>
                {venture.features && (
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {venture.features.map((feature, i) => (
                      <p key={i} className="text-sm text-gray-500">
                        • {feature}
                      </p>
                    ))}
                  </div>
                )}
                {venture.location && (
                  <p className="text-sm text-gray-500">
                    {venture.location}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          PHILANTHROPY - White/Gold
          ============================================ */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="font-cinzel text-2xl tracking-[0.15em] uppercase mb-4">
              Philanthropy
            </h3>
            <div className="heading-divider" />
            <p className="text-[var(--muted-foreground)]">
              Empowering communities and cultivating the next generation
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            {philanthropyVentures.map((venture) => (
              <div key={venture.id} className="venture-card">
                <div className="flex items-center gap-4 mb-4">
                  <h4 className="font-cinzel text-lg tracking-wide">{venture.name}</h4>
                  <span className="badge-nonprofit">Non-Profit</span>
                </div>
                <p className="text-sm text-[var(--gold)] tracking-wider uppercase mb-2">
                  {venture.sector}
                </p>
                <p className="text-sm text-[var(--gold-muted)] italic mb-4">
                  {venture.tagline}
                </p>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-4">
                  {venture.description}
                </p>
                {venture.features && (
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {venture.features.map((feature, i) => (
                      <p key={i} className="text-sm text-[var(--muted-foreground)]">
                        • {feature}
                      </p>
                    ))}
                  </div>
                )}
                {venture.location && (
                  <p className="text-sm text-[var(--muted-foreground)] mb-4">
                    {venture.location}
                  </p>
                )}
                {venture.url && (
                  <Link
                    href={venture.url}
                    target="_blank"
                    className="text-sm text-[var(--gold)] hover:text-[var(--gold-dark)] transition-colors inline-flex items-center gap-2"
                  >
                    Learn More <span>→</span>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          FINE ART - Black/Gold
          ============================================ */}
      <section className="py-20 px-6 bg-[var(--dark-bg)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="font-cinzel text-white text-2xl tracking-[0.15em] uppercase mb-4">
              Fine Art
            </h3>
            <div className="w-16 h-0.5 bg-[var(--gold)] mx-auto mb-6" />
            <p className="text-gray-400">
              Championing artistic expression and cultural preservation
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            {fineArtVentures.map((venture) => (
              <div key={venture.id} className="venture-card-dark border-[var(--gold)]/30">
                <div className="flex items-center gap-4 mb-4">
                  <h4 className="font-cinzel text-white text-lg tracking-wide">{venture.name}</h4>
                  <span className="badge-live">Live</span>
                </div>
                <p className="text-sm text-[var(--gold-light)] tracking-wider uppercase mb-2">
                  {venture.sector}
                </p>
                <p className="text-sm text-[var(--gold-muted)] italic mb-4">
                  {venture.tagline}
                </p>
                <p className="text-sm text-gray-400 leading-relaxed mb-4">
                  {venture.description}
                </p>
                {venture.features && (
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {venture.features.map((feature, i) => (
                      <p key={i} className="text-sm text-gray-500">
                        • {feature}
                      </p>
                    ))}
                  </div>
                )}
                {venture.location && (
                  <p className="text-sm text-gray-500 mb-4">
                    {venture.location}
                  </p>
                )}
                {venture.url && (
                  <Link
                    href={venture.url}
                    target="_blank"
                    className="text-sm text-[var(--gold-light)] hover:text-[var(--gold)] transition-colors inline-flex items-center gap-2"
                  >
                    Visit Gallery <span>→</span>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          CTA - White/Gold
          ============================================ */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-cinzel text-2xl md:text-3xl tracking-[0.15em] uppercase mb-4">
            Invest With Us
          </h2>
          <div className="heading-divider" />
          <p className="text-[var(--muted-foreground)] mb-10">
            OKB Ventures is building tomorrow&apos;s legacy today. Interested in joining us?
          </p>
          <Link
            href="/contact"
            className="btn-primary"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
