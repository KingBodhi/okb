import { getDb, ContactSubmission, SchedulingRequest, PressRequest } from './db';

export function saveContactSubmission(payload: Omit<ContactSubmission, 'id' | 'created_at'>) {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO okb_contact_submissions (first_name, last_name, email, subject, message)
    VALUES (@first_name, @last_name, @email, @subject, @message)
  `);
  const result = stmt.run(payload);
  return result.lastInsertRowid as number;
}

export function saveSchedulingRequest(payload: Omit<SchedulingRequest, 'id' | 'created_at'>) {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO okb_scheduling_requests (
      first_name, last_name, organization, website, event_description, event_date,
      country, address_line1, address_line2, postcode, city, media_present, audience,
      host_email, host_phone
    ) VALUES (
      @first_name, @last_name, @organization, @website, @event_description, @event_date,
      @country, @address_line1, @address_line2, @postcode, @city, @media_present, @audience,
      @host_email, @host_phone
    )
  `);
  const result = stmt.run(payload);
  return result.lastInsertRowid as number;
}

export function savePressRequest(payload: Omit<PressRequest, 'id' | 'created_at'>) {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO okb_press_requests (first_name, last_name, organization, details, email)
    VALUES (@first_name, @last_name, @organization, @details, @email)
  `);
  const result = stmt.run(payload);
  return result.lastInsertRowid as number;
}

export function getRecentContact(limit = 20) {
  const db = getDb();
  return db.prepare('SELECT * FROM okb_contact_submissions ORDER BY created_at DESC LIMIT ?').all(limit);
}

export function getRecentScheduling(limit = 20) {
  const db = getDb();
  return db.prepare('SELECT * FROM okb_scheduling_requests ORDER BY created_at DESC LIMIT ?').all(limit);
}

export function getRecentPress(limit = 20) {
  const db = getDb();
  return db.prepare('SELECT * FROM okb_press_requests ORDER BY created_at DESC LIMIT ?').all(limit);
}

export function getSubmissionStats() {
  const db = getDb();
  const contact = (db.prepare('SELECT COUNT(*) as count FROM okb_contact_submissions').get() as { count: number } | undefined)?.count ?? 0;
  const scheduling = (db.prepare('SELECT COUNT(*) as count FROM okb_scheduling_requests').get() as { count: number } | undefined)?.count ?? 0;
  const press = (db.prepare('SELECT COUNT(*) as count FROM okb_press_requests').get() as { count: number } | undefined)?.count ?? 0;
  return { contact, scheduling, press };
}
