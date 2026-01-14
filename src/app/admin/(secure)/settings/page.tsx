"use client";

import { useState, useEffect } from "react";

interface SiteSettings {
  site_name: string;
  contact_email: string;
  site_description: string;
  linkedin_url: string;
  twitter_url: string;
  instagram_url: string;
  youtube_url: string;
}

export default function Settings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<SiteSettings>({
    site_name: "",
    contact_email: "",
    site_description: "",
    linkedin_url: "",
    twitter_url: "",
    instagram_url: "",
    youtube_url: "",
  });

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((data) => {
        if (!data.error) {
          setForm(data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setError("");
    setSaved(false);

    try {
      const response = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Failed to save settings");
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-[var(--muted-foreground)]">Loading settings...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs tracking-[0.3em] uppercase text-[var(--admin-accent)] mb-1">Configuration</p>
        <h1 className="text-3xl font-cinzel">Settings</h1>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded">
          {error}
        </div>
      )}

      {saved && (
        <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded">
          Settings saved successfully!
        </div>
      )}

      {/* Site Settings */}
      <div className="bg-white shadow-lg p-8 border-l-4 border-[var(--admin-accent)]">
        <h2 className="font-cinzel text-xl mb-6">Site Configuration</h2>

        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Site Name</label>
              <input
                type="text"
                value={form.site_name}
                onChange={(e) => setForm({ ...form, site_name: e.target.value })}
                className="w-full px-4 py-2 border border-[var(--border)] rounded focus:outline-none focus:border-[var(--admin-accent)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Contact Email</label>
              <input
                type="email"
                value={form.contact_email}
                onChange={(e) => setForm({ ...form, contact_email: e.target.value })}
                className="w-full px-4 py-2 border border-[var(--border)] rounded focus:outline-none focus:border-[var(--admin-accent)]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Site Description</label>
            <textarea
              rows={3}
              value={form.site_description}
              onChange={(e) => setForm({ ...form, site_description: e.target.value })}
              className="w-full px-4 py-2 border border-[var(--border)] rounded focus:outline-none focus:border-[var(--admin-accent)]"
            />
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="bg-white shadow-lg p-8 border-l-4 border-[var(--admin-accent)]">
        <h2 className="font-cinzel text-xl mb-6">Social Links</h2>

        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">LinkedIn URL</label>
              <input
                type="url"
                value={form.linkedin_url}
                onChange={(e) => setForm({ ...form, linkedin_url: e.target.value })}
                className="w-full px-4 py-2 border border-[var(--border)] rounded focus:outline-none focus:border-[var(--admin-accent)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">X (Twitter) URL</label>
              <input
                type="url"
                value={form.twitter_url}
                onChange={(e) => setForm({ ...form, twitter_url: e.target.value })}
                className="w-full px-4 py-2 border border-[var(--border)] rounded focus:outline-none focus:border-[var(--admin-accent)]"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Instagram URL</label>
              <input
                type="url"
                value={form.instagram_url}
                onChange={(e) => setForm({ ...form, instagram_url: e.target.value })}
                className="w-full px-4 py-2 border border-[var(--border)] rounded focus:outline-none focus:border-[var(--admin-accent)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">YouTube URL</label>
              <input
                type="url"
                value={form.youtube_url}
                onChange={(e) => setForm({ ...form, youtube_url: e.target.value })}
                placeholder="https://youtube.com/@..."
                className="w-full px-4 py-2 border border-[var(--border)] rounded focus:outline-none focus:border-[var(--admin-accent)]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="btn-primary disabled:opacity-50"
        >
          {saving ? "Saving..." : saved ? "Saved!" : "Save Settings"}
        </button>
      </div>
    </div>
  );
}
