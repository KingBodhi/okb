import bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';
import { getDb } from './db';

const DEFAULT_ADMIN_USERNAME = process.env.OKB_ADMIN_USERNAME ?? 'admin';
const DEFAULT_ADMIN_EMAIL = process.env.OKB_ADMIN_EMAIL ?? 'admin@okb.local';
const DEFAULT_ADMIN_PASSWORD = process.env.OKB_ADMIN_PASSWORD ?? 'ChangeMe123!';
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

export type AdminUser = {
  id: number;
  username: string;
  email: string;
  created_at: string;
};

type AdminRow = AdminUser & { password_hash?: string };

export async function ensureDefaultAdmin() {
  const db = getDb();
  const existing = db
    .prepare('SELECT * FROM okb_admin_users WHERE LOWER(username) = LOWER(?) OR LOWER(email) = LOWER(?) LIMIT 1')
    .get(DEFAULT_ADMIN_USERNAME, DEFAULT_ADMIN_EMAIL) as AdminRow | undefined;

  if (!existing) {
    const passwordHash = await bcrypt.hash(DEFAULT_ADMIN_PASSWORD, 10);
    db.prepare('INSERT INTO okb_admin_users (username, email, password_hash) VALUES (?, ?, ?)')
      .run(DEFAULT_ADMIN_USERNAME, DEFAULT_ADMIN_EMAIL, passwordHash);
    return;
  }

  const needsPassword = existing.password_hash ? !(await bcrypt.compare(DEFAULT_ADMIN_PASSWORD, existing.password_hash)) : true;
  if (existing.username !== DEFAULT_ADMIN_USERNAME || existing.email !== DEFAULT_ADMIN_EMAIL || needsPassword) {
    const passwordHash = needsPassword ? await bcrypt.hash(DEFAULT_ADMIN_PASSWORD, 10) : existing.password_hash;
    db.prepare('UPDATE okb_admin_users SET username = ?, email = ?, password_hash = ? WHERE id = ?')
      .run(DEFAULT_ADMIN_USERNAME, DEFAULT_ADMIN_EMAIL, passwordHash, existing.id);
  }
}

export async function verifyAdminCredentials(identifier: string, password: string): Promise<AdminUser | null> {
  const db = getDb();
  const record = db
    .prepare('SELECT * FROM okb_admin_users WHERE LOWER(username) = LOWER(?) OR LOWER(email) = LOWER(?) LIMIT 1')
    .get(identifier, identifier) as AdminRow | undefined;

  if (!record?.password_hash) {
    return null;
  }

  const isValid = await bcrypt.compare(password, record.password_hash);
  if (!isValid) return null;

  return {
    id: record.id,
    username: record.username,
    email: record.email,
    created_at: record.created_at,
  };
}

export function createSession(adminId: number) {
  const db = getDb();
  const token = randomBytes(24).toString('hex');
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS).toISOString();

  db.prepare('INSERT INTO okb_admin_sessions (token, admin_id, expires_at) VALUES (?, ?, ?)')
    .run(token, adminId, expiresAt);

  return { token, expiresAt };
}

export function destroySession(token: string) {
  const db = getDb();
  db.prepare('DELETE FROM okb_admin_sessions WHERE token = ?').run(token);
}

export function getSession(token: string) {
  if (!token) return null;
  const db = getDb();
  const row = db
    .prepare('SELECT s.token, s.expires_at, u.id as admin_id, u.username, u.email FROM okb_admin_sessions s JOIN okb_admin_users u ON s.admin_id = u.id WHERE s.token = ?')
    .get(token) as { token: string; expires_at: string; admin_id: number; username: string; email: string } | undefined;
  if (!row) return null;
  if (new Date(row.expires_at).getTime() < Date.now()) {
    destroySession(token);
    return null;
  }
  return {
    token: row.token as string,
    admin: {
      id: row.admin_id as number,
      username: row.username as string,
      email: row.email as string,
    },
  };
}
