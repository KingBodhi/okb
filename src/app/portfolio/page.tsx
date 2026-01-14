import Link from "next/link";
import { Metadata } from "next";
import {
  ventures,
  agencyVenture,
  fundVenture,
  infrastructureVentures,
  philanthropyVentures,
  oklahomaVentures,
  pcgPortfolio
} from "@/data/ventures";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Explore the Family Office portfolio including operating companies, venture investments, real estate holdings, and philanthropic initiatives managed by the Office of the Oklahoma Billionaire.",
  openGraph: {
    title: "Portfolio | Oklahoma Billionaire",
    description: "Operating companies, venture investments, and philanthropic initiatives under management.",
  },
};

export default function Portfolio() {
  return (
    <>
      {/* ============================================
          HERO SECTION - Black/Gold
          ============================================ */}
      <section className="relative py-32 px-6 bg-[var(--dark-bg)]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[var(--gold)] tracking-[0.3em] uppercase text-sm mb-4">
            Assets Under Management
          </p>
          <h1 className="font-cinzel text-white text-4xl md:text-5xl tracking-[0.1em] uppercase mb-6">
            Family Office Portfolio
          </h1>
          <div className="w-16 h-0.5 bg-[var(--gold)] mx-auto mb-8" />
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            The Office of the Oklahoma Billionaire oversees a diverse portfolio of operating
            companies, venture investments, real estate holdings, and philanthropic initiatives —
            all unified by a commitment to building generational wealth and community prosperity.
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

          <div className="venture-card max-w-4xl mx-auto mb-12">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <h2 className="font-cinzel text-2xl tracking-wide">{agencyVenture.name}</h2>
                  <span className="badge-live">Operating</span>
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

          {/* PCG Portfolio */}
          {pcgPortfolio.length > 0 && (
            <div className="max-w-4xl mx-auto">
              <p className="text-center text-sm text-[var(--muted-foreground)] tracking-wider uppercase mb-6">
                PCG Portfolio
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                {pcgPortfolio.map((client) => (
                  <div key={client.id} className="border border-[var(--border)] p-6">
                    <div className="flex items-center gap-4 mb-3">
                      <h4 className="font-cinzel text-lg tracking-wide">{client.name}</h4>
                    </div>
                    <p className="text-sm text-[var(--gold)] tracking-wider uppercase mb-2">
                      {client.sector}
                    </p>
                    <p className="text-sm text-[var(--gold-muted)] italic mb-3">
                      {client.tagline}
                    </p>
                    <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-4">
                      {client.description}
                    </p>
                    {client.url && (
                      <Link
                        href={client.url}
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
          )}
        </div>
      </section>

      {/* ============================================
          THE FUND - Black/Gold
          ============================================ */}
      <section className="py-20 px-6 bg-[var(--dark-bg)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-[var(--gold)] tracking-[0.3em] uppercase text-sm mb-2">
              The Investment Arm
            </p>
          </div>

          <div className="venture-card-dark max-w-4xl mx-auto border-[var(--gold)]/30">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <h2 className="font-cinzel text-white text-2xl tracking-wide">{fundVenture.name}</h2>
                  <span className={fundVenture.status === "LIVE"
                    ? "badge-live"
                    : "badge-building border-[var(--gold)] text-[var(--gold)]"
                  }>
                    {fundVenture.status === "LIVE" ? "Operating" : "Building"}
                  </span>
                </div>
                <p className="text-sm text-[var(--gold-light)] tracking-wider uppercase mb-4">
                  {fundVenture.sector}
                </p>
                <p className="text-sm text-[var(--gold-muted)] italic mb-4">
                  &ldquo;{fundVenture.tagline}&rdquo;
                </p>
                <p className="text-gray-400 leading-relaxed mb-6">
                  {fundVenture.description}
                </p>
                {fundVenture.features && (
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {fundVenture.features.map((feature, i) => (
                      <p key={i} className="text-sm text-gray-500">
                        • {feature}
                      </p>
                    ))}
                  </div>
                )}
              </div>
              {fundVenture.url && (
                <div className="md:text-right">
                  {fundVenture.status === "LIVE" ? (
                    <Link
                      href={fundVenture.url}
                      target="_blank"
                      className="btn-outline text-[var(--gold-light)] border-[var(--gold-light)] hover:bg-[var(--gold-light)] hover:text-black"
                    >
                      Visit Site
                    </Link>
                  ) : (
                    <span className="text-sm text-gray-500 italic">
                      Website Coming Soon
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          OPERATING COMPANIES HEADER - White/Gold
          ============================================ */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-cinzel text-2xl md:text-3xl tracking-[0.15em] uppercase mb-4">
            Operating Companies
          </h2>
          <div className="heading-divider" />
          <p className="text-[var(--muted-foreground)]">
            Direct holdings across our core investment pillars
          </p>
        </div>
      </section>

      {/* ============================================
          INFRASTRUCTURE - White/Gold
          ============================================ */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="font-cinzel text-xl tracking-[0.15em] uppercase mb-4">
              Infrastructure
            </h3>
            <p className="text-sm text-[var(--muted-foreground)]">
              Building the decentralized systems that power a free and open future
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {infrastructureVentures.map((venture) => (
              <div key={venture.id} className="venture-card">
                <div className="flex items-center gap-4 mb-4">
                  <h4 className="font-cinzel text-lg tracking-wide">{venture.name}</h4>
                  <span className={venture.status === "LIVE" ? "badge-live" : "badge-building"}>
                    {venture.status === "LIVE" ? "Operating" : "Building"}
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
            <h3 className="font-cinzel text-white text-xl tracking-[0.15em] uppercase mb-4">
              Oklahoma
            </h3>
            <div className="w-12 h-0.5 bg-[var(--gold)] mx-auto mb-4" />
            <p className="text-gray-400 text-sm">
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
            <h3 className="font-cinzel text-xl tracking-[0.15em] uppercase mb-4">
              Philanthropy
            </h3>
            <div className="heading-divider" />
            <p className="text-[var(--muted-foreground)] text-sm">
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
          CTA - Black/Gold
          ============================================ */}
      <section className="py-20 px-6 bg-[var(--dark-bg)]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-cinzel text-white text-2xl md:text-3xl tracking-[0.15em] uppercase mb-4">
            Partner With Us
          </h2>
          <div className="w-16 h-0.5 bg-[var(--gold)] mx-auto mb-8" />
          <p className="text-gray-400 mb-10">
            Interested in exploring opportunities with the Family Office? We welcome
            inquiries from founders, partners, and collaborators aligned with our vision.
          </p>
          <Link
            href="/contact"
            className="btn-outline text-[var(--gold-light)] border-[var(--gold-light)] hover:bg-[var(--gold-light)] hover:text-black"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
