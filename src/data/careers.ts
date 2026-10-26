/** Open roles, read from the Keystatic-managed `jobs` collection. */
import { getCollection } from 'astro:content';

export const departments = ['Finance', 'Manufacturing', 'Management'];

export const jobs = (await getCollection('jobs')).sort((a, b) => a.data.order - b.data.order).map(({ id, data }) => ({ ...data, slug: id }));
