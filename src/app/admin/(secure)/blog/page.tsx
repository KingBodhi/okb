import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const dynamic = 'force-dynamic';

export default function BlogList() {
  const posts = getAllPosts();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-[var(--admin-accent)] mb-1">Content</p>
          <h1 className="text-3xl font-cinzel">Blog Posts</h1>
        </div>
        <Link
          href="/admin/blog/new"
          className="btn-primary"
        >
          + New Post
        </Link>
      </div>

      <div className="bg-white shadow-lg border-l-4 border-[var(--admin-accent)]">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[var(--admin-muted)] border-b border-[var(--border)]">
              <tr>
                <th className="text-left px-6 py-4 text-xs uppercase tracking-wider text-[var(--muted-foreground)]">Title</th>
                <th className="text-left px-6 py-4 text-xs uppercase tracking-wider text-[var(--muted-foreground)]">Date</th>
                <th className="text-left px-6 py-4 text-xs uppercase tracking-wider text-[var(--muted-foreground)]">Status</th>
                <th className="text-right px-6 py-4 text-xs uppercase tracking-wider text-[var(--muted-foreground)]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-[var(--admin-muted)]/50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold">{post.title}</p>
                      <p className="text-sm text-[var(--muted-foreground)]">/{post.slug}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-[var(--muted-foreground)]">
                    {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-1 rounded ${
                      post.status === 'published'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Link
                      href={`/news/${post.slug}`}
                      target="_blank"
                      className="text-sm text-[var(--muted-foreground)] hover:text-[var(--admin-accent)]"
                    >
                      View
                    </Link>
                    <Link
                      href={`/admin/blog/${post.id}`}
                      className="text-sm text-[var(--admin-accent)] hover:text-[var(--gold-dark)]"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
              {posts.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-[var(--muted-foreground)]">
                    No posts yet. Create your first post!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
