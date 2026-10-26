// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import markdoc from '@astrojs/markdoc';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';

// The Keystatic admin (/keystatic) needs a server runtime, so it is only
// mounted for `astro dev`. Production builds stay fully static.
// Set KEYSTATIC=true with an SSR adapter to ship the admin (see README).
const withCms = process.argv.includes('dev') || process.env.KEYSTATIC === 'true';

export default defineConfig({
  site: 'https://clarity.example.com',
  integrations: [markdoc(), ...(withCms ? [react(), keystatic()] : [])],
  vite: { plugins: [tailwindcss()] },
});
