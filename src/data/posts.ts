/** Insights, read from the Keystatic-managed `posts` collection (newest first). */
import { getCollection } from 'astro:content';
import { shortDate, longDate } from '../lib/format';

export const categories = ['Corporate Governance Hub', 'Strategy Hub', 'Operations', 'Capital Trends', 'Executive Pay'];

export interface Post {
  slug: string;
  title: string;
  category: string;
  date: string;
  longDate: string;
  author: string;
  authorRole: string;
  excerpt: string;
  dek: string;
  readTime: string;
  tags: string[];
  cover?: string | null;
  featured?: boolean;
}

const entries = (await getCollection('posts')).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

export const allPosts: Post[] = entries.map(({ id, data }) => ({
  ...data,
  slug: id,
  date: shortDate(data.date),
  longDate: longDate(data.date),
}));
