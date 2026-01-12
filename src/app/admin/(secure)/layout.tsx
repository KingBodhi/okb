"use client";
import { ReactNode, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const sidebarItems = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: '📊'
  },
  {
    title: 'Content',
    items: [
      { title: 'Blog Posts', href: '/admin/blog', icon: '📝' },
    ]
  },
  {
    title: 'Submissions',
    items: [
      { title: 'Contact', href: '/admin/submissions?type=contact', icon: '✉️' },
      { title: 'Scheduling', href: '/admin/submissions?type=scheduling', icon: '📅' },
      { title: 'Press', href: '/admin/submissions?type=press', icon: '📰' },
    ]
  },
  {
    title: 'Configuration',
    items: [
      { title: 'Settings', href: '/admin/settings', icon: '⚙️' },
    ]
  }
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [session, setSession] = useState<{ authenticated: boolean } | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    fetch('/api/admin/session')
      .then(r => r.json())
      .then(data => {
        if (!data.authenticated) {
          router.push('/admin/login');
        } else {
          setSession(data);
        }
      })
      .catch(() => router.push('/admin/login'));
  }, [router]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  if (!session?.authenticated) {
    return (
      <div className="min-h-screen bg-[var(--admin-bg)] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--admin-accent)] mx-auto mb-4"></div>
          <div className="text-[var(--muted-foreground)]">Authenticating...</div>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[var(--admin-bg)] flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 bg-[var(--dark-bg)] text-white transition-all duration-300 flex flex-col w-64
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[var(--gold)]/20 h-16">
          <Link href="/admin" className="font-cinzel text-[var(--gold)] tracking-wider">
            OKB ADMIN
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 hover:bg-white/10 rounded transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {sidebarItems.map((item, index) => (
            <div key={index}>
              {item.href ? (
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    pathname === item.href
                      ? 'bg-[var(--admin-accent)]/20 text-[var(--admin-accent)]'
                      : 'hover:bg-white/10 text-gray-300'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span className="font-medium">{item.title}</span>
                </Link>
              ) : (
                <div>
                  <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mt-4">
                    {item.title}
                  </div>
                  <div className="space-y-1">
                    {item.items?.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        href={subItem.href}
                        className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                          pathname === subItem.href.split('?')[0]
                            ? 'bg-[var(--admin-accent)]/20 text-[var(--admin-accent)]'
                            : 'hover:bg-white/10 text-gray-300'
                        }`}
                      >
                        <span>{subItem.icon}</span>
                        <span>{subItem.title}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-[var(--gold)]/20">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-gray-300 mb-2"
          >
            <span>🌐</span>
            <span>View Site</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-gray-300"
          >
            <span>🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="bg-[var(--dark-bg)] border-b border-[var(--gold)]/20 px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-[var(--gold-light)] hover:text-[var(--gold)] transition-colors text-xl"
            >
              ☰
            </button>
            <div className="font-cinzel text-[var(--gold-light)] text-lg tracking-[0.1em] hidden lg:block">
              Family Office Control Center
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="/"
              target="_blank"
              className="text-sm text-gray-400 hover:text-[var(--gold-light)] transition-colors hidden md:block"
            >
              View Site →
            </Link>
            <div className="text-sm text-[var(--gold-light)]">
              Administrator
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-4 lg:p-8 overflow-auto bg-[var(--admin-bg)]">
          {children}
        </main>
      </div>
    </div>
  );
}
