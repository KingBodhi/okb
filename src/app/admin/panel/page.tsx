'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Submission {
  id: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  subject?: string;
  message?: string;
  organization?: string;
  details?: string;
  created_at?: string;
}

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  date: string;
  subtitle?: string;
  image?: string;
  content?: string;
  status: 'draft' | 'published';
}

interface OverviewResponse {
  stats: { contact: number; scheduling: number; press: number };
  contact: Submission[];
  scheduling: Submission[];
  press: Submission[];
  posts: BlogPost[];
}

const initialPost = {
  title: '',
  slug: '',
  date: '',
  subtitle: '',
  image: '',
  content: '',
  status: 'draft' as 'draft' | 'published',
};

export default function AdminPanel() {
  const router = useRouter();
  const [overview, setOverview] = useState<OverviewResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [postForm, setPostForm] = useState(initialPost);
  const [postStatus, setPostStatus] = useState<'idle' | 'loading' | 'error' | 'success'>('idle');

  useEffect(() => {
    const initialize = async () => {
      const session = await fetch('/api/admin/session');
      if (!session.ok) {
        router.push('/admin/login');
        return;
      }
      loadOverview();
    };
    initialize();
  }, [router]);

  const loadOverview = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/overview', { cache: 'no-store' });
      if (!response.ok) {
        throw new Error('Unable to load admin data');
      }
      const data = (await response.json()) as OverviewResponse;
      setOverview(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const handleCreatePost = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPostStatus('loading');
    try {
      const response = await fetch('/api/admin/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postForm),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Unable to create post');
      }
      setPostStatus('success');
      setPostForm(initialPost);
      loadOverview();
    } catch (err) {
      setPostStatus('error');
      setError((err as Error).message);
    } finally {
      setTimeout(() => setPostStatus('idle'), 2500);
    }
  };

  const toggleStatus = async (post: BlogPost) => {
    await fetch(`/api/admin/blog/${post.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: post.status === 'published' ? 'draft' : 'published' }),
    });
    loadOverview();
  };

  const deletePost = async (post: BlogPost) => {
    await fetch(`/api/admin/blog/${post.id}`, { method: 'DELETE' });
    loadOverview();
  };

  const formatDate = (date?: string) =>
    date ? new Date(date).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';

  return (
    <section className="min-h-screen bg-[var(--muted)] pt-28 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-[var(--gold)]">Control Room</p>
            <h1 className="text-3xl font-cinzel">Admin Panel</h1>
          </div>
          <div className="flex gap-4">
            <Link
              href="/dashboard"
              className="btn-outline text-sm"
            >
              PCG Dashboard
            </Link>
            <button onClick={handleLogout} className="btn-outline text-sm">
              Logout
            </button>
          </div>
        </div>

        {loading && <p className="text-[var(--muted-foreground)]">Loading latest intelligence…</p>}
        {error && <p className="text-red-600 text-sm mb-6">{error}</p>}

        {overview && !loading && (
          <>
            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {Object.entries(overview.stats).map(([label, value]) => (
                <div key={label} className="bg-white border-l-4 border-[var(--gold)] shadow p-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-foreground)]">{label}</p>
                  <p className="text-4xl font-cinzel mt-3 text-[var(--gold)]">{value}</p>
                </div>
              ))}
            </div>

            {/* Submissions Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              <AdminCard title="Contact" data={overview.contact} formatDate={formatDate} />
              <AdminCard title="Scheduling" data={overview.scheduling} formatDate={formatDate} />
              <AdminCard title="Press" data={overview.press} formatDate={formatDate} />
            </div>

            {/* Blog Management */}
            <div className="bg-white shadow-xl p-8 border-l-4 border-[var(--gold)]">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <div>
                  <p className="text-xs tracking-[0.3em] uppercase text-[var(--gold)]">Editorial Desk</p>
                  <h2 className="text-2xl font-cinzel">Blog Posts</h2>
                </div>
              </div>

              <form onSubmit={handleCreatePost} className="grid md:grid-cols-2 gap-6 mb-10">
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <input
                    required
                    className="mt-2"
                    value={postForm.title}
                    onChange={(event) => setPostForm({ ...postForm, title: event.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Slug</label>
                  <input
                    required
                    className="mt-2"
                    value={postForm.slug}
                    onChange={(event) => setPostForm({ ...postForm, slug: event.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Date</label>
                  <input
                    type="date"
                    required
                    className="mt-2"
                    value={postForm.date}
                    onChange={(event) => setPostForm({ ...postForm, date: event.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Subtitle</label>
                  <input
                    className="mt-2"
                    value={postForm.subtitle}
                    onChange={(event) => setPostForm({ ...postForm, subtitle: event.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Hero Image URL</label>
                  <input
                    className="mt-2"
                    value={postForm.image}
                    onChange={(event) => setPostForm({ ...postForm, image: event.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Status</label>
                  <select
                    className="mt-2"
                    value={postForm.status}
                    onChange={(event) => setPostForm({ ...postForm, status: event.target.value as 'draft' | 'published' })}
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium">Content</label>
                  <textarea
                    rows={4}
                    className="mt-2"
                    value={postForm.content}
                    onChange={(event) => setPostForm({ ...postForm, content: event.target.value })}
                  />
                </div>
                <div className="md:col-span-2 flex justify-end">
                  <button type="submit" className="btn-primary" disabled={postStatus === 'loading'}>
                    {postStatus === 'loading' ? 'Publishing…' : 'Save Post'}
                  </button>
                </div>
                {postStatus === 'error' && <p className="text-sm text-red-600">Unable to save post.</p>}
                {postStatus === 'success' && <p className="text-sm text-green-600">Post saved.</p>}
              </form>

              <div className="space-y-4">
                {overview.posts.map((post) => (
                  <div key={post.id} className="flex flex-col md:flex-row md:items-center gap-3 border border-[var(--border)] p-4">
                    <div className="flex-1">
                      <p className="text-xs uppercase text-[var(--muted-foreground)]">{formatDate(post.date)}</p>
                      <p className="text-lg font-semibold">{post.title}</p>
                      <p className="text-sm text-[var(--muted-foreground)]">/{post.slug}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs px-2 py-1 ${post.status === 'published' ? 'bg-[var(--gold)] text-white' : 'bg-gray-200 text-gray-600'}`}>
                        {post.status}
                      </span>
                      <button
                        className="text-xs px-3 py-2 border border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-white transition-colors"
                        onClick={() => toggleStatus(post)}
                      >
                        {post.status === 'published' ? 'Set Draft' : 'Publish'}
                      </button>
                      <button
                        className="text-xs px-3 py-2 border border-red-300 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                        onClick={() => deletePost(post)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
                {!overview.posts.length && <p className="text-sm text-[var(--muted-foreground)]">No posts yet.</p>}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function AdminCard({ title, data, formatDate }: { title: string; data: Submission[]; formatDate: (date?: string) => string }) {
  return (
    <div className="bg-white shadow p-6 border-l-4 border-[var(--gold)]">
      <h3 className="text-xl font-cinzel mb-4">{title}</h3>
      <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
        {data.map((item) => (
          <div key={item.id} className="border border-[var(--border)] p-4 bg-[var(--muted)]">
            <p className="text-sm font-semibold">{[item.first_name, item.last_name].filter(Boolean).join(' ') || '—'}</p>
            {item.email && <p className="text-xs text-[var(--muted-foreground)]">{item.email}</p>}
            {item.organization && <p className="text-xs text-[var(--muted-foreground)]">{item.organization}</p>}
            {(item.subject || item.details || item.message) && (
              <p className="text-sm text-[var(--muted-foreground)] mt-2 line-clamp-3">{item.subject || item.details || item.message}</p>
            )}
            <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--muted-foreground)] mt-2">{formatDate(item.created_at)}</p>
          </div>
        ))}
        {!data.length && <p className="text-sm text-[var(--muted-foreground)]">No submissions yet.</p>}
      </div>
    </div>
  );
}
