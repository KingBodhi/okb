"use client";

import { useState } from "react";

export default function Settings() {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs tracking-[0.3em] uppercase text-[var(--admin-accent)] mb-1">Configuration</p>
        <h1 className="text-3xl font-cinzel">Settings</h1>
      </div>

      {/* Site Settings */}
      <div className="bg-white shadow-lg p-8 border-l-4 border-[var(--admin-accent)]">
        <h2 className="font-cinzel text-xl mb-6">Site Configuration</h2>

        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Site Name</label>
              <input
                type="text"
                defaultValue="The Office of the Oklahoma Billionaire"
                className="w-full px-4 py-2 border border-[var(--border)] rounded focus:outline-none focus:border-[var(--admin-accent)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Contact Email</label>
              <input
                type="email"
                defaultValue="theoffice@oklahomabillionaire.com"
                className="w-full px-4 py-2 border border-[var(--border)] rounded focus:outline-none focus:border-[var(--admin-accent)]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Site Description</label>
            <textarea
              rows={3}
              defaultValue="A single-family office facilitating Global Economic Abundance through technology, innovation, and the arts."
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
                defaultValue="https://www.linkedin.com/in/jessyartman/"
                className="w-full px-4 py-2 border border-[var(--border)] rounded focus:outline-none focus:border-[var(--admin-accent)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">X (Twitter) URL</label>
              <input
                type="url"
                defaultValue="https://x.com/oklahomabillion"
                className="w-full px-4 py-2 border border-[var(--border)] rounded focus:outline-none focus:border-[var(--admin-accent)]"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Instagram URL</label>
              <input
                type="url"
                defaultValue="https://instagram.com/oklahomabillionaire"
                className="w-full px-4 py-2 border border-[var(--border)] rounded focus:outline-none focus:border-[var(--admin-accent)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">YouTube URL</label>
              <input
                type="url"
                placeholder="https://youtube.com/@..."
                className="w-full px-4 py-2 border border-[var(--border)] rounded focus:outline-none focus:border-[var(--admin-accent)]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Admin Account */}
      <div className="bg-white shadow-lg p-8 border-l-4 border-[var(--admin-accent)]">
        <h2 className="font-cinzel text-xl mb-6">Admin Account</h2>

        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Username</label>
              <input
                type="text"
                defaultValue="admin"
                className="w-full px-4 py-2 border border-[var(--border)] rounded focus:outline-none focus:border-[var(--admin-accent)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                defaultValue="admin@okb.local"
                className="w-full px-4 py-2 border border-[var(--border)] rounded focus:outline-none focus:border-[var(--admin-accent)]"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">New Password</label>
              <input
                type="password"
                placeholder="Leave blank to keep current"
                className="w-full px-4 py-2 border border-[var(--border)] rounded focus:outline-none focus:border-[var(--admin-accent)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm new password"
                className="w-full px-4 py-2 border border-[var(--border)] rounded focus:outline-none focus:border-[var(--admin-accent)]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button onClick={handleSave} className="btn-primary">
          {saved ? "Saved!" : "Save Settings"}
        </button>
      </div>
    </div>
  );
}
