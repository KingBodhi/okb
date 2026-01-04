export default function About() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/about-bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative z-20 text-center text-white px-6 max-w-3xl">
          <blockquote className="text-2xl md:text-3xl lg:text-4xl font-cinzel italic leading-relaxed">
            &ldquo;Championing the Bold to Achieve the Extraordinary&rdquo;
          </blockquote>
          <p className="mt-6 text-lg tracking-wide">— Jessy Artman</p>
        </div>
      </section>

      {/* Mission Statement Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xl tracking-wider mb-8 font-cinzel">
            JESSY ARTMAN
          </h2>

          <p className="text-sm md:text-base leading-relaxed text-gray-600">
            The Office of the Oklahoma Billionaire is committed to facilitating Global Economic
            Abundance by using technology and innovation to improve the human and planetary condition.
            Through civic engagement and public activism, the Office of The Oklahoma Billionaire will
            strive to inform, educate, and inspire Individuals from all walks of life as we seek to
            build a truly great Future. Through this office, Jessy Artman will remain a tireless
            champion for the underprivileged men and women of the world – and for their right to live
            sovereign, safe, and secure in their life&apos;s purpose.
          </p>
        </div>
      </section>

      {/* Verticals Section */}
      <section className="py-20 px-6 bg-[#f5f5f5]">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Infrastructure */}
            <div className="text-center">
              <h3 className="text-2xl mb-4 font-cinzel">Infrastructure</h3>
              <p className="text-sm leading-relaxed text-gray-600">
                Building the foundations for tomorrow through strategic investments in
                sustainable development, smart cities, and transformative public works
                that enhance quality of life for communities worldwide.
              </p>
            </div>

            {/* Philanthropy */}
            <div className="text-center">
              <h3 className="text-2xl mb-4 font-cinzel">Philanthropy</h3>
              <p className="text-sm leading-relaxed text-gray-600">
                Empowering underprivileged communities through education, healthcare,
                and economic opportunity initiatives designed to create lasting,
                generational impact and self-sufficiency.
              </p>
            </div>

            {/* Fine Art */}
            <div className="text-center">
              <h3 className="text-2xl mb-4 font-cinzel">Fine Art</h3>
              <p className="text-sm leading-relaxed text-gray-600">
                Championing artistic expression and cultural preservation through
                FineArtSociety.xyz, curating elite experiences that bridge traditional
                artistry with emerging blockchain technology.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
