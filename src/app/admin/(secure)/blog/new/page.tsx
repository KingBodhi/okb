"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewPost() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "",
    slug: "",
    date: new Date().toISOString().split("T")[0],
    subtitle: "",
    image: "",
    content: "",
    status: "draft" as "draft" | "published",
  });

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleTitleChange = (title: string) => {
    setForm({
      ...form,
      title,
      slug: form.slug || generateSlug(title),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to create post");
      }

      router.push("/admin/blog");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-[var(--admin-accent)] mb-1">Content</p>
          <h1 className="text-3xl font-cinzel">New Post</h1>
        </div>
        <Link href="/admin/blog" className="text-sm text-[var(--muted-foreground)] hover:text-[var(--admin-accent)]">
          ← Back to Posts
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-white shadow-lg p-8 border-l-4 border-[var(--admin-accent)]">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">Title *</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full px-4 py-2 border border-[var(--border)] rounded focus:outline-none focus:border-[var(--admin-accent)]"
              placeholder="Enter post title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Slug *</label>
            <input
              type="text"
              required
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              className="w-full px-4 py-2 border border-[var(--border)] rounded focus:outline-none focus:border-[var(--admin-accent)]"
              placeholder="url-friendly-slug"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">Date *</label>
            <input
              type="date"
              required
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full px-4 py-2 border border-[var(--border)] rounded focus:outline-none focus:border-[var(--admin-accent)]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value as "draft" | "published" })}
              className="w-full px-4 py-2 border border-[var(--border)] rounded focus:outline-none focus:border-[var(--admin-accent)]"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Image URL</label>
            <input
              type="text"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              className="w-full px-4 py-2 border border-[var(--border)] rounded focus:outline-none focus:border-[var(--admin-accent)]"
              placeholder="/images/news-1.jpg"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Subtitle</label>
          <input
            type="text"
            value={form.subtitle}
            onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
            className="w-full px-4 py-2 border border-[var(--border)] rounded focus:outline-none focus:border-[var(--admin-accent)]"
            placeholder="Brief description or tagline"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Content</label>
          <textarea
            rows={12}
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            className="w-full px-4 py-2 border border-[var(--border)] rounded focus:outline-none focus:border-[var(--admin-accent)] font-mono text-sm"
            placeholder="Write your post content here..."
          />
        </div>

        <div className="flex justify-end gap-4">
          <Link
            href="/admin/blog"
            className="px-6 py-2 border border-[var(--border)] rounded hover:bg-[var(--admin-muted)] transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Post"}
          </button>
        </div>
      </form>
    </div>
  );
}
