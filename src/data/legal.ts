/** Legal pages, read from the Keystatic-managed `legal` collection. */
import { getCollection } from 'astro:content';
import { paragraphs } from '../lib/format';

const order = ['terms', 'privacy', 'cookies'];

export const legalPages = (await getCollection('legal'))
  .sort((a, b) => (order.indexOf(a.id) + 1 || 99) - (order.indexOf(b.id) + 1 || 99))
  .map(({ id, data }) => ({ ...data, slug: id, sections: data.sections.map((s) => ({ heading: s.heading, body: paragraphs(s.body) })) }));
