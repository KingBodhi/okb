import Link from "next/link";
import { getDb } from "@/lib/db";
import { getAllPosts } from "@/lib/blog";

function getDashboardData() {
  const db = getDb();

  const contactCount = (db.prepare('SELECT COUNT(*) as count FROM okb_contact_submissions').get() as { count: number })?.count ?? 0;
  const schedulingCount = (db.prepare('SELECT COUNT(*) as count FROM okb_scheduling_requests').get() as { count: number })?.count ?? 0;
  const pressCount = (db.prepare('SELECT COUNT(*) as count FROM okb_press_requests').get() as { count: number })?.count ?? 0;

  const posts = getAllPosts();
  const publishedPosts = posts.filter(p => p.status === 'published').length;
  const draftPosts = posts.filter(p => p.status === 'draft').length;

  const recentContact = db.prepare('SELECT * FROM okb_contact_submissions ORDER BY created_at DESC LIMIT 5').all();
  const recentScheduling = db.prepare('SELECT * FROM okb_scheduling_requests ORDER BY created_at DESC LIMIT 5').all();
  const recentPress = db.prepare('SELECT * FROM okb_press_requests ORDER BY created_at DESC LIMIT 5').all();

  return {
    stats: {
      contact: contactCount,
      scheduling: schedulingCount,
      press: pressCount,
      posts: posts.length,
      published: publishedPosts,
      drafts: draftPosts,
    },
    recentContact,
    recentScheduling,
    recentPress,
    recentPosts: posts.slice(0, 5),
  };
}

export const dynamic = 'force-dynamic';

export default function AdminDashboard() {
  const data = getDashboardData();

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs tracking-[0.3em] uppercase text-[var(--admin-accent)] mb-1">Overview</p>
        <h1 className="text-3xl font-cinzel">Dashboard</h1>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="/admin/submissions?type=contact">
          <div className="bg-white shadow-lg p-6 border-l-4 border-[var(--admin-accent)] hover:shadow-xl transition-shadow cursor-pointer">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted-foreground)]">Contact</p>
            <p className="text-4xl font-cinzel mt-2 text-[var(--admin-accent)]">{data.stats.contact}</p>
          </div>
        </Link>

        <Link href="/admin/submissions?type=scheduling">
          <div className="bg-white shadow-lg p-6 border-l-4 border-[var(--admin-accent)] hover:shadow-xl transition-shadow cursor-pointer">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted-foreground)]">Scheduling</p>
            <p className="text-4xl font-cinzel mt-2 text-[var(--admin-accent)]">{data.stats.scheduling}</p>
          </div>
        </Link>

        <Link href="/admin/submissions?type=press">
          <div className="bg-white shadow-lg p-6 border-l-4 border-[var(--admin-accent)] hover:shadow-xl transition-shadow cursor-pointer">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted-foreground)]">Press</p>
            <p className="text-4xl font-cinzel mt-2 text-[var(--admin-accent)]">{data.stats.press}</p>
          </div>
        </Link>

        <Link href="/admin/blog">
          <div className="bg-white shadow-lg p-6 border-l-4 border-[var(--admin-accent)] hover:shadow-xl transition-shadow cursor-pointer">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted-foreground)]">Blog Posts</p>
            <p className="text-4xl font-cinzel mt-2 text-[var(--admin-accent)]">{data.stats.posts}</p>
            <p className="text-xs text-[var(--muted-foreground)] mt-1">
              {data.stats.published} published · {data.stats.drafts} drafts
            </p>
          </div>
        </Link>
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow-lg p-6 border-l-4 border-[var(--admin-accent)]">
        <h2 className="font-cinzel text-xl mb-6">Quick Actions</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/admin/blog/new"
            className="flex items-center gap-3 p-4 bg-[var(--admin-muted)] hover:bg-[var(--admin-accent)]/10 rounded-lg transition-colors border border-[var(--border)]"
          >
            <span className="text-2xl">✏️</span>
            <div>
              <div className="font-semibold">New Post</div>
              <div className="text-sm text-[var(--muted-foreground)]">Create blog post</div>
            </div>
          </Link>

          <Link
            href="/admin/submissions?type=contact"
            className="flex items-center gap-3 p-4 bg-[var(--admin-muted)] hover:bg-[var(--admin-accent)]/10 rounded-lg transition-colors border border-[var(--border)]"
          >
            <span className="text-2xl">✉️</span>
            <div>
              <div className="font-semibold">View Messages</div>
              <div className="text-sm text-[var(--muted-foreground)]">Contact submissions</div>
            </div>
          </Link>

          <Link
            href="/admin/submissions?type=scheduling"
            className="flex items-center gap-3 p-4 bg-[var(--admin-muted)] hover:bg-[var(--admin-accent)]/10 rounded-lg transition-colors border border-[var(--border)]"
          >
            <span className="text-2xl">📅</span>
            <div>
              <div className="font-semibold">Requests</div>
              <div className="text-sm text-[var(--muted-foreground)]">Scheduling requests</div>
            </div>
          </Link>

          <Link
            href="/admin/settings"
            className="flex items-center gap-3 p-4 bg-[var(--admin-muted)] hover:bg-[var(--admin-accent)]/10 rounded-lg transition-colors border border-[var(--border)]"
          >
            <span className="text-2xl">⚙️</span>
            <div>
              <div className="font-semibold">Settings</div>
              <div className="text-sm text-[var(--muted-foreground)]">Configuration</div>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Posts */}
        <div className="bg-white shadow-lg p-6 border-l-4 border-[var(--admin-accent)]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-cinzel text-xl">Recent Posts</h2>
            <Link href="/admin/blog" className="text-sm text-[var(--admin-accent)] hover:text-blue-700">
              View All →
            </Link>
          </div>
          <div className="space-y-4">
            {data.recentPosts.length > 0 ? data.recentPosts.map((post: any) => (
              <Link
                key={post.id}
                href={`/admin/blog/${post.id}`}
                className="block p-4 bg-[var(--admin-muted)] rounded-lg hover:bg-[var(--admin-accent)]/10 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{post.title}</p>
                    <p className="text-xs text-[var(--muted-foreground)]">{post.date}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${
                    post.status === 'published'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {post.status}
                  </span>
                </div>
              </Link>
            )) : (
              <p className="text-[var(--muted-foreground)] text-center py-8">No posts yet</p>
            )}
          </div>
        </div>

        {/* Recent Submissions */}
        <div className="bg-white shadow-lg p-6 border-l-4 border-[var(--admin-accent)]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-cinzel text-xl">Recent Submissions</h2>
            <Link href="/admin/submissions?type=contact" className="text-sm text-[var(--admin-accent)] hover:text-blue-700">
              View All →
            </Link>
          </div>
          <div className="space-y-4">
            {[...data.recentContact, ...data.recentScheduling, ...data.recentPress]
              .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
              .slice(0, 5)
              .map((item: any, i: number) => (
                <div key={i} className="p-4 bg-[var(--admin-muted)] rounded-lg">
                  <p className="font-semibold">
                    {[item.first_name, item.last_name].filter(Boolean).join(' ') || item.email || 'Anonymous'}
                  </p>
                  <p className="text-sm text-[var(--muted-foreground)] truncate">
                    {item.message || item.details || item.subject || 'No message'}
                  </p>
                  <p className="text-xs text-[var(--muted-foreground)] mt-1">
                    {new Date(item.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            {data.recentContact.length === 0 && data.recentScheduling.length === 0 && data.recentPress.length === 0 && (
              <p className="text-[var(--muted-foreground)] text-center py-8">No submissions yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
