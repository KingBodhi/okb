import { getDb, BlogPost } from './db';

const seedPosts: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>[] = [
  {
    title: 'Ushering in The Age of Sustainable Development Pt. I',
    slug: 'sustainable-development-pt-1',
    date: '2018-03-06',
    subtitle: 'Examining the environmental cost of global production',
    image: '/images/news-1.jpg',
    content: `Throughout history, technology has enhanced productivity, and computational machines now pervade most processes in developed economies. This integration will deepen as development progresses.

We have achieved remarkable global progress: extreme poverty has diminished, childhood mortality from disease has declined, and education has expanded, particularly for young women. However, our planet still suffers one grave danger — US!

Environmental degradation is tied to resource extraction and manufacturing. African nations yield precious stones, metals, and petroleum. Asian and South American forests have been cleared extensively. Residents of resource-rich regions rarely benefit, often living under corrupt regimes supported by consumer demand.

The production process itself contributes to environmental harm. Harvesting, transportation, processing facilities, and distribution all generate pollution and waste. The result is not the issue, but the process.

This is part one of a three-part series examining sustainable development and production methods.`,
    status: 'published',
  },
  {
    title: 'Ushering in The Age of Sustainable Development Pt. II',
    slug: 'sustainable-development-pt-2',
    date: '2018-03-08',
    subtitle: 'A Three Part Series by Jessy Artman',
    image: '/images/news-2.jpg',
    content: `Current production methods are unsustainable due to their inability to support a growing population while maintaining environmental responsibility. Though consumption habits also present challenges, this series focuses on production processes and emerging technologies.

Modern infrastructure still relies on a petroleum-based system designed by Thomas Edison in the late 1800s, involving energy generation from fossil fuels, transmission via high-voltage wires, transformer conversion, and consumer distribution.

This approach enabled Western prosperity but cannot be globally implemented. China exemplifies this problem — rapid industrial expansion created economic growth while devastating environmental conditions through manufacturing-scale pollution.

The fossil fuel extraction pipeline involves geological discovery, deep-earth drilling, long-distance transportation through underground pipelines, and massive refinement plants that emit excessive carbon. This process produces hazardous conditions while potentially replaceable resources could be substituted.

Transportation industry shifts alone could reduce petroleum consumption by 30%, as Tesla exemplifies with alternative solutions.

As Dr. Seuss reminds us, we must take environmental responsibility seriously. Part III will explore how decentralized infrastructure, blockchain technology, and social networks can create harmony between environmental, economic, and social interests.`,
    status: 'published',
  },
  {
    title: 'Ushering in The Age of Sustainable Development Pt. III',
    slug: 'sustainable-development-pt-3',
    date: '2018-03-10',
    subtitle: 'Decentralized solutions for a sustainable future',
    image: '/images/news-3.jpg',
    content: 'An exploration of how decentralized infrastructure, blockchain technology, and social networks can create harmony between environmental, economic, and social interests — completing our three-part series on sustainable development.',
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
