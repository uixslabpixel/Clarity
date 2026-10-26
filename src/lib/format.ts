/** 18/06/26 — the compact date used on cards. */
export const shortDate = (d: Date) =>
  [d.getUTCDate(), d.getUTCMonth() + 1, d.getUTCFullYear() % 100].map((n) => String(n).padStart(2, '0')).join('/');

/** June 18, 2026 — the long date used in article headers and the changelog. */
export const longDate = (d: Date) =>
  d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

/** Splits a CMS multiline field into paragraphs. */
export const paragraphs = (s: string) => s.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
