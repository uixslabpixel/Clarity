// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import markdoc from '@astrojs/markdoc';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import sitemap from '@astrojs/sitemap';

// The Keystatic admin (/keystatic) needs a server runtime, so it is only
// mounted for `astro dev`. Production builds stay fully static.
// Set KEYSTATIC=true with an SSR adapter to ship the admin (see README).
const withCms = process.argv.includes('dev') || process.env.KEYSTATIC === 'true';

// Canonical URLs, the sitemap and robots.txt use this. Set SITE_URL for a custom domain;
// on Vercel the production domain is picked up automatically.
const site =
  process.env.SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'https://clarity.example.com');

export default defineConfig({
  site,
  integrations: [
    markdoc(),
    sitemap({ filter: (page) => !/\/(template\/sections\/.+|thank-you|password)\/?$/.test(page) }),
    ...(withCms ? [react(), keystatic()] : []),
  ],
  vite: { plugins: [tailwindcss()] },
});
