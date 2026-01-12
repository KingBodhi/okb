import Link from "next/link";
import { getPublishedPosts } from "@/lib/blog";

export const dynamic = "force-dynamic";

export default function News() {
  const articles = getPublishedPosts();

  return (
    <>
      {/* ============================================
          HERO SECTION - Black/Gold
          ============================================ */}
      <section className="relative py-32 px-6 bg-[var(--dark-bg)]">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-cinzel text-white text-4xl md:text-5xl tracking-[0.1em] uppercase mb-6">
            News
          </h1>
          <div className="w-16 h-0.5 bg-[var(--gold)] mx-auto mb-8" />
          <p className="text-gray-400 text-lg">
            Updates from the Office
          </p>
        </div>
      </section>

      {/* ============================================
          NEWS GRID - White/Gold
          ============================================ */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          {!articles.length && (
            <div className="text-center py-20">
              <p className="text-[var(--muted-foreground)]">Stories are being finalized. Check back soon.</p>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-12">
            {articles.map((article) => (
              <article key={article.slug} className="group">
                <Link href={`/news/${article.slug}`}>
                  <div
                    className="relative aspect-[4/3] mb-6 overflow-hidden bg-cover bg-center transition-all duration-300 group-hover:shadow-xl"
                    style={{ backgroundImage: `url('${article.image ?? "/images/news-1.jpg"}')` }}
                  >
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>
                </Link>

                <p className="text-sm text-[var(--gold)] tracking-wider uppercase mb-3">
                  {new Date(article.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </p>

                <h2 className="text-xl md:text-2xl leading-tight mb-3 font-cinzel">
                  <Link
                    href={`/news/${article.slug}`}
                    className="hover:text-[var(--gold)] transition-colors"
                  >
                    {article.title}
                  </Link>
                </h2>

                {article.subtitle && (
                  <p className="text-[var(--muted-foreground)] mb-4 leading-relaxed">
                    {article.subtitle}
                  </p>
                )}

                <Link
                  href={`/news/${article.slug}`}
                  className="text-sm text-[var(--gold)] hover:text-[var(--gold-dark)] transition-colors inline-flex items-center gap-2"
                >
                  Read More
                  <span>→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          CTA - Black/Gold
          ============================================ */}
      <section className="py-16 px-6 bg-[var(--dark-bg)]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-cinzel text-white text-xl tracking-[0.15em] uppercase mb-4">
            Media Inquiries
          </h2>
          <p className="text-gray-400 mb-8">
            For press and media requests, please visit our press page.
          </p>
          <Link
            href="/press"
            className="btn-outline text-[var(--gold-light)] border-[var(--gold-light)] hover:bg-[var(--gold-light)] hover:text-black"
          >
            Press & Media
          </Link>
        </div>
      </section>
    </>
  );
}
