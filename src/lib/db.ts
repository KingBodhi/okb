import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

let db: Database.Database | null = null;

const DATA_FILE = 'oklahoma-billionaire.db';

const createStatements = `
CREATE TABLE IF NOT EXISTS okb_admin_users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS okb_admin_sessions (
  token TEXT PRIMARY KEY,
  admin_id INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  expires_at DATETIME NOT NULL,
  FOREIGN KEY (admin_id) REFERENCES okb_admin_users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS okb_contact_submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  first_name TEXT,
  last_name TEXT,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS okb_scheduling_requests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  first_name TEXT,
  last_name TEXT,
  organization TEXT,
  website TEXT,
  event_description TEXT,
  event_date TEXT,
  country TEXT,
  address_line1 TEXT,
  address_line2 TEXT,
  postcode TEXT,
  city TEXT,
  media_present TEXT,
  audience TEXT,
  host_email TEXT,
  host_phone TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS okb_press_requests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  first_name TEXT,
  last_name TEXT,
  organization TEXT,
  details TEXT,
  email TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS okb_blog_posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  date TEXT NOT NULL,
  subtitle TEXT,
  image TEXT,
  content TEXT,
  status TEXT DEFAULT 'draft',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS okb_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
`;

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export function getDb() {
  if (db) return db;

  const isServerless = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
  const dataDir = isServerless ? '/tmp' : path.join(process.cwd(), 'data');
  ensureDir(dataDir);
  const dbPath = path.join(dataDir, DATA_FILE);

  db = new Database(dbPath);
  db.pragma('journal_mode = WAL');
  db.exec(createStatements);
  return db;
}

export type ContactSubmission = {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  subject: string;
  message: string;
  created_at?: string;
};

export type SchedulingRequest = {
  id?: number;
  first_name: string;
  last_name: string;
  organization: string;
  website: string;
  event_description: string;
  event_date: string;
  country: string;
  address_line1: string;
  address_line2?: string;
  postcode: string;
  city: string;
  media_present?: string;
  audience?: string;
  host_email: string;
  host_phone?: string;
  created_at?: string;
};

export type PressRequest = {
  id?: number;
  first_name: string;
  last_name: string;
  organization: string;
  details: string;
  email: string;
  created_at?: string;
};

export type BlogPost = {
  id?: number;
  title: string;
  slug: string;
  date: string;
  subtitle?: string;
  image?: string;
  content?: string;
  status?: 'draft' | 'published';
  created_at?: string;
  updated_at?: string;
};
