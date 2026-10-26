/**
 * Astro content collections backed by the files Keystatic writes
 * (see keystatic.config.ts — keep both schemas in sync).
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const text = z.string().default('');
const image = z.string().nullish();

const posts = defineCollection({
  loader: glob({ pattern: '*.mdoc', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    category: z.string(),
    date: z.coerce.date(),
    author: text,
    authorRole: text,
    excerpt: text,
    dek: text,
    readTime: z.string().default('5 min read'),
    cover: image,
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
  }),
});

const caseStudies = defineCollection({
  loader: glob({ pattern: '*.mdoc', base: './src/content/case-studies' }),
  schema: z.object({
    shortTitle: z.string(),
    title: z.string(),
    client: z.string(),
    area: text,
    industry: z.string(),
    practice: text,
    timeframe: text,
    metric: text,
    metricLabel: text,
    order: z.number().default(0),
    cover: image,
  }),
});

const services = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    summary: text,
    cta: z.string().default('Explore Framework'),
    order: z.number().default(0),
    cover: image,
    blocks: z.array(z.object({ heading: z.string(), text: z.string() })).default([]),
    card: z
      .object({ title: text, text: text, cta: text, note: text })
      .default({ title: '', text: '', cta: '', note: '' }),
  }),
});

const team = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/team' }),
  schema: z.object({
    name: z.string(),
    role: text,
    bio: text,
    photo: image,
    linkedin: z.string().nullish(),
    x: z.string().nullish(),
    order: z.number().default(0),
  }),
});

const testimonials = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/testimonials' }),
  schema: z.object({ name: z.string(), role: text, company: text, quote: z.string(), photo: image }),
});

const jobs = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/jobs' }),
  schema: z.object({
    title: z.string(),
    practice: text,
    department: z.string(),
    location: text,
    focus: text,
    text: text,
    order: z.number().default(0),
  }),
});

const legal = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/legal' }),
  schema: z.object({
    label: z.string(),
    title: z.string(),
    intro: text,
    revised: text,
    sections: z.array(z.object({ heading: z.string(), body: z.string() })).default([]),
  }),
});

const changelog = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/changelog' }),
  schema: z.object({ version: z.string(), date: z.coerce.date(), notes: text }),
});

export const collections = { posts, caseStudies, services, team, testimonials, jobs, legal, changelog };
