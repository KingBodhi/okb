import { getPostBySlug, getPublishedPosts } from '@/lib/blog';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post || post.status !== 'published') {
    return {
      title: 'Article Not Found',
    };
  }

  const siteUrl = 'https://oklahomabillionaire.com';

  return {
    title: post.title,
    description: post.subtitle || `${post.content?.substring(0, 155)}...`,
    openGraph: {
      title: post.title,
      description: post.subtitle || `${post.content?.substring(0, 155)}...`,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.updated_at || post.date,
      authors: ['Jessy Artman'],
      images: post.image ? [
        {
          url: `${siteUrl}${post.image}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.subtitle || `${post.content?.substring(0, 155)}...`,
      images: post.image ? [`${siteUrl}${post.image}`] : undefined,
    },
  };
}

export async function generateStaticParams() {
  const posts = getPublishedPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function NewsArticle({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post || post.status !== 'published') {
    notFound();
  }

  const siteUrl = 'https://oklahomabillionaire.com';

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.subtitle || post.content?.substring(0, 155),
    image: post.image ? `${siteUrl}${post.image}` : undefined,
    datePublished: post.date,
    dateModified: post.updated_at || post.date,
    author: {
      "@type": "Person",
      name: "Jessy Artman",
      url: "https://www.linkedin.com/in/jessyartman/",
    },
    publisher: {
      "@type": "Organization",
      name: "The Office of the Oklahoma Billionaire",
      url: siteUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/news/${post.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
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
              <span>&larr;</span>
              Back to News
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
