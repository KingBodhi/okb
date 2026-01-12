import { getPostBySlug } from '@/lib/blog';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { use } from 'react';

export const dynamic = 'force-dynamic';

export default function NewsArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const post = getPostBySlug(slug);

  if (!post || post.status !== 'published') {
    notFound();
  }

  return (
    <>
      {/* ============================================
          HERO SECTION - Black/Gold
          ============================================ */}
      <section className="relative py-32 px-6 bg-[var(--dark-bg)]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-[var(--gold)] tracking-wider uppercase mb-4">
            {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
          <h1 className="font-cinzel text-white text-3xl md:text-5xl tracking-[0.05em] uppercase mb-6">
            {post.title}
          </h1>
          {post.subtitle && (
            <>
              <div className="w-16 h-0.5 bg-[var(--gold)] mx-auto mb-6" />
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                {post.subtitle}
              </p>
            </>
          )}
        </div>
      </section>

      {/* ============================================
          ARTICLE CONTENT - White
          ============================================ */}
      <article className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          {post.image && (
            <div className="relative w-full aspect-[16/9] mb-12 overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
          )}

          {post.content && (
            <div className="space-y-6 text-[var(--muted-foreground)] leading-relaxed text-lg">
              {post.content.split('\n').map((paragraph, index) => (
                <p key={`${paragraph}-${index}`}>{paragraph}</p>
              ))}
            </div>
          )}

          {/* Back to News */}
          <div className="mt-16 pt-8 border-t border-[var(--border)]">
            <Link
              href="/news"
              className="text-sm text-[var(--gold)] hover:text-[var(--gold-dark)] transition-colors inline-flex items-center gap-2"
            >
              <span>←</span>
              Back to News
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
