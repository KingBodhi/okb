'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FormEvent, useState } from 'react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Unable to login');
      }

      router.push('/admin');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[var(--dark-bg)] px-6">
      <div className="max-w-md w-full">
        {/* Gold accent line */}
        <div className="w-16 h-0.5 bg-[var(--gold)] mx-auto mb-8" />

        <div className="bg-white shadow-2xl border-t-4 border-[var(--gold)] p-10">
          <div className="text-center mb-8">
            <p className="text-xs tracking-[0.3em] uppercase text-[var(--gold)] mb-2">Control Room</p>
            <h1 className="text-3xl font-cinzel">Admin Console</h1>
            <p className="text-sm text-[var(--muted-foreground)] mt-2">
              Authenticate to review submissions and content.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 p-3 mb-6 text-center">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-sm font-medium">Email or Username</label>
              <input
                type="text"
                required
                className="mt-2"
                value={form.username}
                onChange={(event) => setForm({ ...form, username: event.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                required
                className="mt-2"
                value={form.password}
                onChange={(event) => setForm({ ...form, password: event.target.value })}
              />
            </div>
            <button type="submit" className="btn-primary w-full" disabled={loading}>
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-xs text-[var(--muted-foreground)] mt-8">
            <Link href="/" className="text-[var(--gold)] hover:text-[var(--gold-dark)] transition-colors">
              ← back to site
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
