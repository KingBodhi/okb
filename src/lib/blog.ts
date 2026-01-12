import { getDb, BlogPost } from './db';

const seedPosts: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>[] = [
  {
    title: 'Jessy Artman Curates Washington Elite Gala',
    slug: 'washington-elite-gala',
    date: '2025-01-21',
    subtitle: 'FineArtSociety.xyz elevates Miami Blockchain Week',
    image: '/images/news-1.jpg',
    content: 'Highlights from the Washington Elite Gala hosted during Miami Blockchain Week with bespoke art direction from FineArtSociety.xyz.',
    status: 'published',
  },
  {
    title: 'Ushering in The Age of Sustainable Development Pt. III',
    slug: 'sustainable-development-pt-3',
    date: '2024-03-10',
    subtitle: 'Extending our sustainable development thesis with actionable playbooks.',
    image: '/images/news-2.jpg',
    content: 'An updated framework for mobilizing public-private coalitions that accelerate sustainable expansion.',
    status: 'published',
  },
];

let seeded = false;

export function ensureSeedPosts() {
  if (seeded) return;
  const db = getDb();
  const countRow = db.prepare('SELECT COUNT(*) as count FROM okb_blog_posts').get() as { count: number } | undefined;
  const count = countRow?.count ?? 0;
  if (count > 0) return;
  const stmt = db.prepare(`
    INSERT OR IGNORE INTO okb_blog_posts (title, slug, date, subtitle, image, content, status)
    VALUES (@title, @slug, @date, @subtitle, @image, @content, @status)
  `);
  const insert = db.transaction((posts: typeof seedPosts) => {
    posts.forEach((post) => stmt.run(post));
  });
  insert(seedPosts);
  seeded = true;
}

export function getPublishedPosts(): BlogPost[] {
  const db = getDb();
  return db
    .prepare("SELECT * FROM okb_blog_posts WHERE status = 'published' ORDER BY date DESC")
    .all() as BlogPost[];
}

export function getAllPosts(): BlogPost[] {
  const db = getDb();
  return db.prepare('SELECT * FROM okb_blog_posts ORDER BY date DESC').all() as BlogPost[];
}

export function createPost(payload: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>) {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO okb_blog_posts (title, slug, date, subtitle, image, content, status)
    VALUES (@title, @slug, @date, @subtitle, @image, @content, @status)
  `);
  const result = stmt.run(payload);
  return result.lastInsertRowid as number;
}

export function updatePost(id: number, data: Partial<BlogPost>) {
  const db = getDb();
  const fields: string[] = [];
  const values: unknown[] = [];

  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && key !== 'id') {
      fields.push(`${key} = ?`);
      values.push(value);
    }
  });

  if (!fields.length) return 0;

  values.push(id);
  const stmt = db.prepare(`UPDATE okb_blog_posts SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`);
  const result = stmt.run(values);
  return result.changes;
}

export function deletePost(id: number) {
  const db = getDb();
  const stmt = db.prepare('DELETE FROM okb_blog_posts WHERE id = ?');
  return stmt.run(id).changes;
}

export function getPostBySlug(slug: string) {
  const db = getDb();
  return db.prepare('SELECT * FROM okb_blog_posts WHERE slug = ? LIMIT 1').get(slug) as BlogPost | undefined;
}

ensureSeedPosts();
