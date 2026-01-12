"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { use } from "react";

export default function EditPost({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "",
    slug: "",
    date: "",
    subtitle: "",
    image: "",
    content: "",
    status: "draft" as "draft" | "published",
  });

  useEffect(() => {
    fetch(`/api/admin/blog/${id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setForm({
            title: data.title || "",
            slug: data.slug || "",
            date: data.date || "",
            subtitle: data.subtitle || "",
            image: data.image || "",
            content: data.content || "",
            status: data.status || "draft",
          });
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load post");
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const response = await fetch(`/api/admin/blog/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to update post");
      }

      router.push("/admin/blog");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    setDeleting(true);
    try {
      const response = await fetch(`/api/admin/blog/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete post");
      }

      router.push("/admin/blog");
    } catch (err) {
      setError((err as Error).message);
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-[var(--muted-foreground)]">Loading post...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-[var(--admin-accent)] mb-1">Content</p>
          <h1 className="text-3xl font-cinzel">Edit Post</h1>
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
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-2 border border-[var(--border)] rounded focus:outline-none focus:border-[var(--admin-accent)]"
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
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Content</label>
          <textarea
            rows={12}
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            className="w-full px-4 py-2 border border-[var(--border)] rounded focus:outline-none focus:border-[var(--admin-accent)] font-mono text-sm"
          />
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="px-6 py-2 border border-red-300 text-red-600 rounded hover:bg-red-50 transition-colors disabled:opacity-50"
          >
            {deleting ? "Deleting..." : "Delete Post"}
          </button>

          <div className="flex gap-4">
            <Link
              href="/admin/blog"
              className="px-6 py-2 border border-[var(--border)] rounded hover:bg-[var(--admin-muted)] transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="btn-primary disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
