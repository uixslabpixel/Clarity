/** Template release notes, read from the Keystatic-managed `changelog` collection (newest last). */
import { getCollection } from 'astro:content';
import { longDate } from '../lib/format';

export const changelog = (await getCollection('changelog'))
  .sort((a, b) => a.data.date.valueOf() - b.data.date.valueOf())
  .map(({ data }, i) => ({ version: data.version, date: longDate(data.date), number: String(i + 1).padStart(3, '0'), notes: data.notes }));
