import Link from "next/link";
import { ventures } from "@/data/ventures";

export default function Vision() {
  const infrastructureVentures = ventures.filter(v => v.category === "Infrastructure");
  const oklahomaVentures = ventures.filter(v => v.category === "Oklahoma");
  const philanthropyVentures = ventures.filter(v => v.category === "Philanthropy");

  return (
    <>
      {/* ============================================
          HERO SECTION
          ============================================ */}
      <section className="relative min-h-screen overflow-hidden flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/about-bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-20 text-center text-white px-6 max-w-4xl">
          <blockquote className="text-2xl md:text-3xl lg:text-4xl font-cinzel italic leading-relaxed mb-6">
            &ldquo;Fortune Favors the Visionary&rdquo;
          </blockquote>
          <div className="w-16 h-0.5 bg-[var(--gold)] mx-auto mb-6" />
          <p className="text-lg tracking-[0.2em] uppercase text-[var(--gold-light)]">
            Jessy Artman
          </p>
        </div>
      </section>

      {/* ============================================
          THE FAMILY OFFICE - White/Gold
          ============================================ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[var(--gold)] tracking-[0.3em] uppercase text-sm mb-4">
              The Family Office
            </p>
            <h2 className="font-cinzel text-2xl md:text-3xl tracking-[0.15em] uppercase mb-4">
              Office of the Oklahoma Billionaire
            </h2>
            <div className="heading-divider" />
          </div>

          <div className="space-y-6 text-[var(--muted-foreground)] leading-relaxed">
            <p>
              The Office of the Oklahoma Billionaire is a single-family office dedicated to the
              strategic management, preservation, and growth of generational wealth. We oversee
              the administration of family trusts and a diverse portfolio of operating
              companies, venture investments, and philanthropic initiatives.
            </p>
            <p>
              Our mandate extends beyond traditional wealth management. Through active ownership
              and strategic guidance, we build ventures that facilitate Global Economic Abundance —
              creating lasting impact through technology, innovation, and the arts.
            </p>
            <p>
              Through civic engagement and public activism, this office works to inform,
              educate, and inspire individuals from all walks of life as we build a truly
              great future. Jessy Artman remains a tireless champion for the underprivileged —
              for their right to live sovereign, safe, and secure in their life&apos;s purpose.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================
          FAMILY OFFICE SERVICES - Black/Gold
          ============================================ */}
      <section className="py-20 px-6 bg-[var(--dark-bg)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-cinzel text-white text-xl md:text-2xl tracking-[0.15em] uppercase mb-4">
              What We Do
            </h2>
            <div className="w-16 h-0.5 bg-[var(--gold)] mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <h3 className="font-cinzel text-[var(--gold-light)] text-sm tracking-wider uppercase mb-3">
                Trust Administration
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Comprehensive oversight and administration of family trusts and their assets.
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-cinzel text-[var(--gold-light)] text-sm tracking-wider uppercase mb-3">
                Portfolio Management
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Active management of operating companies, venture investments, and real assets.
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-cinzel text-[var(--gold-light)] text-sm tracking-wider uppercase mb-3">
                Strategic Development
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Identifying and developing new ventures aligned with our core pillars.
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-cinzel text-[var(--gold-light)] text-sm tracking-wider uppercase mb-3">
                Philanthropic Direction
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Guiding charitable initiatives and community development programs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          CORE PILLARS - White/Gold
          ============================================ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-cinzel text-2xl md:text-3xl tracking-[0.15em] uppercase mb-4">
              Core Pillars
            </h2>
            <div className="heading-divider" />
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Infrastructure */}
            <div className="text-center">
              <h3 className="font-cinzel text-[var(--gold)] text-xl tracking-wider uppercase mb-6">
                Infrastructure
              </h3>
              <p className="text-[var(--muted-foreground)] text-sm leading-relaxed mb-8">
                Building the decentralized systems that power a free and open future —
                from network protocols to privacy hardware to artificial intelligence.
              </p>
              <div className="space-y-3">
                {infrastructureVentures.map((v) => (
                  <div key={v.id} className="text-sm">
                    {v.url ? (
                      <Link
                        href={v.url}
                        target="_blank"
                        className="text-[var(--muted-foreground)] hover:text-[var(--gold)] transition-colors"
                      >
                        {v.name}
                        {v.status === "BUILDING" && (
                          <span className="text-xs text-gray-400 ml-2">(Building)</span>
                        )}
                      </Link>
                    ) : (
                      <span className="text-gray-400">
                        {v.name}
                        <span className="text-xs ml-2">(Building)</span>
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Oklahoma */}
            <div className="text-center">
              <h3 className="font-cinzel text-[var(--gold)] text-xl tracking-wider uppercase mb-6">
                Oklahoma
              </h3>
              <p className="text-[var(--muted-foreground)] text-sm leading-relaxed mb-8">
                Building prosperity and opportunity in the heartland — from sovereign
                manufacturing to community development.
              </p>
              <div className="space-y-3">
                {oklahomaVentures.map((v) => (
                  <div key={v.id} className="text-sm">
                    {v.url ? (
                      <Link
                        href={v.url}
                        target="_blank"
                        className="text-[var(--muted-foreground)] hover:text-[var(--gold)] transition-colors"
                      >
                        {v.name}
                      </Link>
                    ) : (
                      <span className="text-gray-400">
                        {v.name}
                        <span className="text-xs ml-2">(Building)</span>
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Philanthropy */}
            <div className="text-center">
              <h3 className="font-cinzel text-[var(--gold)] text-xl tracking-wider uppercase mb-6">
                Philanthropy
              </h3>
              <p className="text-[var(--muted-foreground)] text-sm leading-relaxed mb-8">
                Empowering communities and cultivating the next generation of innovators
                through education, resources, and collaborative spaces.
              </p>
              <div className="space-y-3">
                {philanthropyVentures.map((v) => (
                  <div key={v.id} className="text-sm">
                    {v.url ? (
                      <Link
                        href={v.url}
                        target="_blank"
                        className="text-[var(--muted-foreground)] hover:text-[var(--gold)] transition-colors"
                      >
                        {v.name}
                        {v.type === "nonprofit" && (
                          <span className="text-xs text-[var(--gold)] ml-2">(Non-Profit)</span>
                        )}
                      </Link>
                    ) : (
                      <span className="text-gray-400">{v.name}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          THE AGENCY - Black/Gold
          ============================================ */}
      <section className="py-24 px-6 bg-[var(--dark-bg)]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[var(--gold)] tracking-[0.3em] uppercase text-sm mb-4">
            The Engine
          </p>
          <h2 className="font-cinzel text-white text-2xl md:text-3xl tracking-[0.15em] uppercase mb-4">
            PowerClub Global
          </h2>
          <div className="w-16 h-0.5 bg-[var(--gold)] mx-auto mb-6" />
          <p className="text-gray-400 leading-relaxed mb-8">
            An international agency specializing in branding, marketing, and digital innovation
            for early to mid-stage technology startups. PowerClub Global is the engine that
            powers the Oklahoma Billionaire Family Office ecosystem.
          </p>
          <Link
            href="https://powerclubglobal.com"
            target="_blank"
            className="btn-outline text-[var(--gold-light)] border-[var(--gold-light)] hover:bg-[var(--gold-light)] hover:text-black"
          >
            Visit PowerClub Global
          </Link>
        </div>
      </section>

      {/* ============================================
          CTA - White/Gold
          ============================================ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-cinzel text-2xl md:text-3xl tracking-[0.15em] uppercase mb-4">
            Explore the Portfolio
          </h2>
          <div className="heading-divider" />
          <p className="text-[var(--muted-foreground)] mb-10">
            View all the operating companies and ventures under management by the Family Office.
          </p>
          <Link
            href="/portfolio"
            className="btn-primary"
          >
            View Portfolio
          </Link>
        </div>
      </section>
    </>
  );
}
