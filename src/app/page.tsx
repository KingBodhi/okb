import Link from "next/link";
import { ventures } from "@/data/ventures";

export default function Home() {
  const liveVentures = ventures.filter(v => v.status === "LIVE");
  const buildingVentures = ventures.filter(v => v.status === "BUILDING");

  return (
    <>
      {/* ============================================
          HERO SECTION - Black/Gold
          ============================================ */}
      <section className="relative min-h-screen overflow-hidden flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-[70%_60%] md:bg-[center_65%]"
          style={{ backgroundImage: "url('/images/portrait.jpg')" }}
        />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} />

        {/* Content */}
        <div className="relative z-20 text-center px-6 max-w-4xl">
          <p className="text-[var(--gold-light)] tracking-[0.3em] uppercase text-sm mb-6 animate-fade-in">
            The Office of the
          </p>
          <h1 className="font-cinzel text-white text-4xl md:text-5xl lg:text-6xl tracking-[0.1em] uppercase mb-6 animate-fade-in animate-delay-100">
            Oklahoma Billionaire
          </h1>
          <div className="w-16 h-0.5 bg-[var(--gold)] mx-auto mb-8 animate-fade-in animate-delay-200" />
          <p className="text-white/90 text-lg md:text-xl font-light italic mb-10 animate-fade-in animate-delay-200">
            &ldquo;Building Tomorrow&apos;s Legacy Today&rdquo;
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animate-delay-300">
            <Link href="/vision" className="btn-primary">
              Explore the Vision
            </Link>
            <Link href="/portfolio" className="btn-outline text-[var(--gold-light)] border-[var(--gold-light)] hover:bg-[var(--gold-light)] hover:text-black">
              View Ventures
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-[var(--gold-light)]/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-[var(--gold-light)]/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* ============================================
          MISSION SECTION - White/Gold
          ============================================ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-cinzel text-2xl md:text-3xl tracking-[0.15em] uppercase mb-4">
            Building the Future
          </h2>
          <div className="heading-divider" />
          <p className="text-lg text-[var(--muted-foreground)] leading-relaxed max-w-3xl mx-auto">
            The Office of the Oklahoma Billionaire is building ventures that facilitate
            Global Economic Abundance through technology, innovation, and the arts.
            Through civic engagement and public activism, we work to inform, educate,
            and inspire individuals from all walks of life as we build a truly great future.
          </p>
        </div>
      </section>

      {/* ============================================
          THE AGENCY SECTION - Black/Gold
          ============================================ */}
      <section className="py-24 px-6 bg-[var(--dark-bg)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[var(--gold)] tracking-[0.3em] uppercase text-sm mb-4">
              The Engine
            </p>
            <h2 className="font-cinzel text-white text-2xl md:text-3xl tracking-[0.15em] uppercase mb-4">
              PowerClub Global
            </h2>
            <div className="w-16 h-0.5 bg-[var(--gold)] mx-auto mb-6" />
            <p className="text-[var(--gold-light)] text-lg italic">
              &ldquo;Championing the Bold to Achieve the Extraordinary&rdquo;
            </p>
          </div>

          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gray-400 leading-relaxed mb-8">
              An international agency specializing in branding, marketing, and digital innovation
              for early to mid-stage technology startups. PowerClub Global is the engine that
              powers the Oklahoma Billionaire venture ecosystem.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
              <div className="text-center">
                <p className="text-[var(--gold-light)] text-sm tracking-wider uppercase">Road Shows</p>
              </div>
              <div className="text-center">
                <p className="text-[var(--gold-light)] text-sm tracking-wider uppercase">Social Media Management</p>
              </div>
              <div className="text-center">
                <p className="text-[var(--gold-light)] text-sm tracking-wider uppercase">Web Development</p>
              </div>
              <div className="text-center">
                <p className="text-[var(--gold-light)] text-sm tracking-wider uppercase">Event Production</p>
              </div>
            </div>
            <Link
              href="https://powerclubglobal.com"
              target="_blank"
              className="btn-outline text-[var(--gold-light)] border-[var(--gold-light)] hover:bg-[var(--gold-light)] hover:text-black"
            >
              Visit PowerClub Global
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================
          VENTURES SECTION - White/Gold
          ============================================ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-cinzel text-2xl md:text-3xl tracking-[0.15em] uppercase mb-4">
              Ventures in Motion
            </h2>
            <div className="heading-divider" />
            <p className="text-[var(--muted-foreground)]">
              Building the infrastructure of tomorrow, today.
            </p>
          </div>

          {/* Live Ventures Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {liveVentures.filter(v => v.type !== 'agency').map((venture) => (
              <div key={venture.id} className="venture-card">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-cinzel text-lg tracking-wide">{venture.name}</h3>
                  <span className={venture.type === 'nonprofit' ? 'badge-nonprofit' : 'badge-live'}>
                    {venture.type === 'nonprofit' ? 'Non-Profit' : 'Live'}
                  </span>
                </div>
                <p className="text-sm text-[var(--gold)] tracking-wider uppercase mb-3">
                  {venture.sector}
                </p>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-4">
                  {venture.tagline}
                </p>
                {venture.url && (
                  <Link
                    href={venture.url}
                    target="_blank"
                    className="text-sm text-[var(--gold)] hover:text-[var(--gold-dark)] transition-colors inline-flex items-center gap-2"
                  >
                    Visit Site
                    <span>→</span>
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Building Ventures */}
          {buildingVentures.length > 0 && (
            <div className="border-t border-[var(--border)] pt-12">
              <p className="text-center text-sm text-[var(--muted-foreground)] tracking-wider uppercase mb-8">
                On the Horizon
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                {buildingVentures.map((venture) => (
                  <div key={venture.id} className="text-center px-8 py-4 border border-[var(--border)]">
                    <h4 className="font-cinzel text-sm tracking-wider mb-1">{venture.name}</h4>
                    <p className="text-xs text-[var(--muted-foreground)]">{venture.sector}</p>
                    <span className="badge-building mt-2 inline-block text-[var(--gold)]">Building</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/portfolio" className="btn-outline">
              View All Ventures
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================
          CORE PILLARS SECTION - Black/Gold
          ============================================ */}
      <section className="py-24 px-6 bg-[var(--dark-bg)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-cinzel text-white text-2xl md:text-3xl tracking-[0.15em] uppercase mb-4">
              Core Pillars
            </h2>
            <div className="w-16 h-0.5 bg-[var(--gold)] mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Infrastructure */}
            <div className="text-center">
              <h3 className="font-cinzel text-[var(--gold-light)] text-xl tracking-wider uppercase mb-4">
                Infrastructure
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Building the decentralized systems that power a free and open future —
                from network protocols to privacy hardware to artificial intelligence.
              </p>
              <div className="text-xs text-gray-500 space-y-1">
                <p>Alpha Protocol</p>
                <p>Omega Wireless</p>
                <p>Spectrum Galactic</p>
                <p>Pythia AI</p>
              </div>
            </div>

            {/* Oklahoma */}
            <div className="text-center">
              <h3 className="font-cinzel text-[var(--gold-light)] text-xl tracking-wider uppercase mb-4">
                Oklahoma
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Building prosperity and opportunity in the heartland — from sovereign
                manufacturing to community development.
              </p>
              <div className="text-xs text-gray-500 space-y-1">
                <p>Wahzhazhe Industries</p>
                <p>Mahⁿshee Estates</p>
              </div>
            </div>

            {/* Philanthropy */}
            <div className="text-center">
              <h3 className="font-cinzel text-[var(--gold-light)] text-xl tracking-wider uppercase mb-4">
                Philanthropy
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Empowering communities and cultivating the next generation of innovators
                through education, resources, and collaborative spaces.
              </p>
              <div className="text-xs text-gray-500 space-y-1">
                <p>Emergence Institute</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          CTA SECTION - White/Gold
          ============================================ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-cinzel text-2xl md:text-3xl tracking-[0.15em] uppercase mb-4">
            Request an Appearance
          </h2>
          <div className="heading-divider" />
          <p className="text-[var(--muted-foreground)] mb-10 max-w-2xl mx-auto">
            Jessy Artman is available for speaking engagements, conferences,
            panels, and strategic consultations on technology, innovation,
            and building ventures that matter.
          </p>
          <Link href="/contact" className="btn-primary">
            Schedule a Meeting
          </Link>
        </div>
      </section>
    </>
  );
}
