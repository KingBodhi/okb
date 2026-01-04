import Link from "next/link";

const newsArticles = [
  {
    id: 1,
    date: "1/21/25",
    title: "Jessy Artman founder of FineArtSociety.xyz curates Washington Elite Gala during Miami Blockchain Week – Evolving the Era of Influencers",
    subtitle: "Washington Elite Gala - January 2025",
    image: "/images/news-1.jpg",
    slug: "washington-elite-gala",
  },
  {
    id: 2,
    date: "3/10/24",
    title: "Ushering in The Age of Sustainable Development Pt. III",
    subtitle: "Ushering in a New Era of Sustainable Development",
    image: "/images/news-2.jpg",
    slug: "sustainable-development-pt-3",
  },
];

export default function News() {
  return (
    <>
      {/* Header Spacer */}
      <div className="h-32" />

      {/* Page Title */}
      <section className="py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl text-center font-cinzel">
            News
          </h1>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {newsArticles.map((article) => (
              <article key={article.id} className="group">
                <Link href={`/news/${article.slug}`}>
                  <div
                    className="relative aspect-square mb-6 overflow-hidden bg-cover bg-center transition-transform duration-300 group-hover:scale-[1.02]"
                    style={{ backgroundImage: `url('${article.image}')` }}
                  />
                </Link>

                <p className="text-sm text-gray-500 mb-2">
                  {article.date}
                </p>

                <h2 className="text-lg md:text-xl leading-tight mb-3 font-cinzel">
                  <Link
                    href={`/news/${article.slug}`}
                    className="hover:text-[#3949AB] transition-colors"
                  >
                    {article.title}
                  </Link>
                </h2>

                <p className="text-sm text-gray-500 mb-4">
                  {article.subtitle}
                </p>

                <Link
                  href={`/news/${article.slug}`}
                  className="text-sm text-[#3949AB] hover:underline"
                >
                  Read More
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
