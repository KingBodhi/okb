import Link from "next/link";

export default function Home() {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Hero Background */}
      <div
        className="absolute inset-0 bg-cover bg-[right_bottom] md:bg-[right_70%]"
        style={{ backgroundImage: "url('/images/portrait.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative z-20 h-full flex items-center justify-center">
        <div className="text-center px-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl leading-tight mb-8 text-white font-cinzel">
            <span className="block italic font-light">The Office of the</span>
            <span className="block mt-1">Oklahoma Billionaire</span>
          </h1>

          <Link
            href="/contact"
            className="inline-block bg-white text-black px-8 py-3 text-sm tracking-widest font-medium hover:bg-gray-100 transition-all"
          >
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}
