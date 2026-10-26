import type { APIRoute } from 'astro';

/** robots.txt pointing at the sitemap on whatever domain the site is built for. */
export const GET: APIRoute = ({ site }) =>
  new Response(
    ['User-agent: *', 'Allow: /', 'Disallow: /template/sections/', 'Disallow: /thank-you/', '', `Sitemap: ${new URL('sitemap-index.xml', site)}`, ''].join('\n'),
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
