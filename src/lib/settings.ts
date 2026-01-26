import { getDb } from './db';

export interface SiteSettings {
  site_name: string;
  contact_email: string;
  site_description: string;
  linkedin_url: string;
  twitter_url: string;
  instagram_url: string;
  youtube_url: string;
}

const defaultSettings: SiteSettings = {
  site_name: 'The Office of the Oklahoma Billionaire',
  contact_email: 'theoffice@oklahomabillionaire.com',
  site_description: 'A private office facilitating Global Economic Abundance through technology, innovation, and the arts.',
  linkedin_url: 'https://www.linkedin.com/in/jessyartman/',
  twitter_url: 'https://x.com/oklahomabillion',
  instagram_url: 'https://instagram.com/oklahomabillionaire',
  youtube_url: '',
};

export function getSetting(key: string): string | null {
  const db = getDb();
  const row = db.prepare('SELECT value FROM okb_settings WHERE key = ?').get(key) as { value: string } | undefined;
  return row?.value ?? null;
}

export function setSetting(key: string, value: string): void {
  const db = getDb();
  db.prepare(`
    INSERT INTO okb_settings (key, value, updated_at)
    VALUES (?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP
  `).run(key, value);
}

export function getAllSettings(): SiteSettings {
  const db = getDb();
  const rows = db.prepare('SELECT key, value FROM okb_settings').all() as { key: string; value: string }[];

  const settings = { ...defaultSettings };
  rows.forEach((row) => {
    if (row.key in settings) {
      (settings as Record<string, string>)[row.key] = row.value;
    }
  });

  return settings;
}

export function updateSettings(updates: Partial<SiteSettings>): void {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO okb_settings (key, value, updated_at)
    VALUES (?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP
  `);

  const updateTransaction = db.transaction((entries: [string, string][]) => {
    entries.forEach(([key, value]) => stmt.run(key, value));
  });

  const entries = Object.entries(updates).filter(([, value]) => value !== undefined) as [string, string][];
  updateTransaction(entries);
}
