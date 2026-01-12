import Link from "next/link";
import { ventures, agencyVenture } from "@/data/ventures";

export default function Ventures() {
  const liveVentures = ventures.filter(v => v.status === "LIVE" && v.type !== "agency");
  const buildingVentures = ventures.filter(v => v.status === "BUILDING");
  const nonprofitVenture = ventures.find(v => v.type === "nonprofit");

  return (
    <>
      {/* ============================================
          HERO SECTION - Black/Gold
          ============================================ */}
      <section className="relative py-32 px-6 bg-[var(--dark-bg)]">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-cinzel text-white text-4xl md:text-5xl tracking-[0.1em] uppercase mb-6">
            Ventures in Motion
          </h1>
          <div className="w-16 h-0.5 bg-[var(--gold)] mx-auto mb-8" />
          <p className="text-gray-400 text-lg">
            Building the infrastructure of tomorrow, today.
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
          LIVE VENTURES - White/Gold
          ============================================ */}
      <section className="py-20 px-6 bg-[var(--muted)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-cinzel text-2xl md:text-3xl tracking-[0.15em] uppercase mb-4">
              Live Ventures
            </h2>
            <div className="heading-divider" />
          </div>

          <div className="space-y-8">
            {liveVentures.filter(v => v.type !== "nonprofit").map((venture) => (
              <div key={venture.id} className="venture-card bg-white">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <h3 className="font-cinzel text-xl tracking-wide">{venture.name}</h3>
                      <span className="badge-live">Live</span>
                    </div>
                    <p className="text-sm text-[var(--gold)] tracking-wider uppercase mb-2">
                      {venture.sector}
                    </p>
                    <p className="text-sm text-[var(--gold-muted)] italic mb-4">
                      {venture.tagline}
                    </p>
                    <p className="text-[var(--muted-foreground)] leading-relaxed mb-4">
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
                      <p className="text-sm text-[var(--muted-foreground)]">
                        📍 {venture.location}
                      </p>
                    )}
                  </div>
                  {venture.url && (
                    <div className="md:text-right">
                      <Link
                        href={venture.url}
                        target="_blank"
                        className="btn-outline inline-block"
                      >
                        Visit Site
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          NON-PROFIT - Black/Gold
          ============================================ */}
      {nonprofitVenture && (
        <section className="py-20 px-6 bg-[var(--dark-bg)]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-[var(--gold)] tracking-[0.3em] uppercase text-sm mb-4">
                Giving Back
              </p>
              <h2 className="font-cinzel text-white text-2xl md:text-3xl tracking-[0.15em] uppercase mb-4">
                Non-Profit
              </h2>
              <div className="w-16 h-0.5 bg-[var(--gold)] mx-auto" />
            </div>

            <div className="venture-card-dark max-w-4xl mx-auto border-[var(--gold)]/30">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <h3 className="font-cinzel text-white text-xl tracking-wide">
                      {nonprofitVenture.name}
                    </h3>
                    <span className="badge-nonprofit">Non-Profit</span>
                  </div>
                  <p className="text-sm text-[var(--gold-light)] tracking-wider uppercase mb-2">
                    {nonprofitVenture.sector}
                  </p>
                  <p className="text-sm text-[var(--gold-muted)] italic mb-4">
                    {nonprofitVenture.tagline}
                  </p>
                  <p className="text-gray-400 leading-relaxed mb-4">
                    {nonprofitVenture.description}
                  </p>
                  {nonprofitVenture.features && (
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {nonprofitVenture.features.map((feature, i) => (
                        <p key={i} className="text-sm text-gray-500">
                          • {feature}
                        </p>
                      ))}
                    </div>
                  )}
                  {nonprofitVenture.location && (
                    <p className="text-sm text-gray-500">
                      📍 {nonprofitVenture.location}
                    </p>
                  )}
                </div>
                <div className="md:text-right space-y-3">
                  {nonprofitVenture.url && (
                    <Link
                      href={nonprofitVenture.url}
                      target="_blank"
                      className="btn-outline text-[var(--gold-light)] border-[var(--gold-light)] hover:bg-[var(--gold-light)] hover:text-black inline-block"
                    >
                      Learn More
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============================================
          IN DEVELOPMENT - White/Gold
          ============================================ */}
      {buildingVentures.length > 0 && (
        <section className="py-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-cinzel text-2xl md:text-3xl tracking-[0.15em] uppercase mb-4">
                On the Horizon
              </h2>
              <div className="heading-divider" />
              <p className="text-[var(--muted-foreground)]">
                Ventures currently in development
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {buildingVentures.map((venture) => (
                <div key={venture.id} className="border border-[var(--border)] p-8 text-center">
                  <h3 className="font-cinzel text-xl tracking-wide mb-2">{venture.name}</h3>
                  <p className="text-sm text-[var(--gold)] tracking-wider uppercase mb-4">
                    {venture.sector}
                  </p>
                  <p className="text-sm text-[var(--gold-muted)] italic mb-4">
                    {venture.tagline}
                  </p>
                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-6">
                    {venture.description}
                  </p>
                  <span className="badge-building inline-block border-[var(--gold)] text-[var(--gold)]">
                    In Development
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================
          CTA - Black/Gold
          ============================================ */}
      <section className="py-20 px-6 bg-[var(--dark-bg)]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-cinzel text-white text-2xl md:text-3xl tracking-[0.15em] uppercase mb-4">
            Interested in Partnering?
          </h2>
          <div className="w-16 h-0.5 bg-[var(--gold)] mx-auto mb-8" />
          <p className="text-gray-400 mb-10">
            We&apos;re always looking for visionary partners to help build the future.
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
