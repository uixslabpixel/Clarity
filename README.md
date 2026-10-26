# Clarity — Astro website template

A consulting / advisory website template built from the **Template – Clarity** Figma file.
Astro (static), Tailwind CSS v4, Keystatic CMS (local mode) and GSAP.

## Quick start

```bash
npm install
npm run dev        # http://127.0.0.1:4321  ·  CMS at http://127.0.0.1:4321/keystatic
npm run build      # static site in dist/
npm run preview
```

Requires Node 20+.

## Pages

| Route | Page |
| --- | --- |
| `/`, `/home-2`, `/home-3` | Three home page variants |
| `/about`, `/about-2` | About variants |
| `/services`, `/services-2`, `/services/[slug]` | Service list variants + detail |
| `/case-studies`, `/case-studies/[slug]` | Case study list + detail |
| `/team` | Team roster |
| `/insights`, `/insights/[slug]` | Blog list + article |
| `/contact`, `/contact-2` | Contact variants |
| `/careers` | Open roles |
| `/legal/[slug]` | Terms, privacy, cookies |
| `/404`, `/password`, `/thank-you` | Utility pages |
| `/template/style-guide`, `/template/changelog`, `/template/licenses`, `/template/sections` | Template docs |

## Editing content (Keystatic)

Run `npm run dev` and open **/keystatic**. In local mode every save writes a file under
`src/content/`, so changes are versioned with git like the rest of the site.

| CMS area | Files | Used by |
| --- | --- | --- |
| Insights | `src/content/posts/*.mdoc` | Blog sections, `/insights`, article pages |
| Case Studies | `src/content/case-studies/*.mdoc` | `/case-studies`, detail pages |
| Services | `src/content/services/*.yaml` | Service lists, detail pages |
| Team | `src/content/team/*.yaml` | Team sections, `/team` |
| Testimonials | `src/content/testimonials/*.yaml` | Testimonial sections |
| Open Roles | `src/content/jobs/*.yaml` | `/careers` |
| Legal Pages | `src/content/legal/*.yaml` | `/legal/*` |
| Changelog | `src/content/changelog/*.yaml` | `/template/changelog` |
| Site Settings | `src/content/settings.json` | Contact emails, socials, announcement bar, form endpoint |

Article bodies are Markdoc. Besides normal formatting they support two blocks, available
from the editor's **+** menu:

```markdoc
{% quote quote="Pull quote text" cite="— Name, Role" /%}
{% figure src="/images/posts/chart.jpg" alt="…" caption="…" height=312 /%}
```

`h2` headings automatically populate the article's "In this page" table of contents.

Section copy that is part of the design rather than content (pillars, process steps,
stats, principles, timelines) lives in `src/data/*.ts`.

The schema is defined twice and must stay in sync: `keystatic.config.ts` (editor) and
`src/content.config.ts` (Astro validation).

### Editing on a deployed site

Local mode only runs alongside `npm run dev`; production builds are fully static and do
not include `/keystatic`. To let editors work on the live site, switch `storage` in
`keystatic.config.ts` to `{ kind: 'github', repo: 'owner/repo' }` (or Keystatic Cloud),
add an SSR adapter (e.g. `@astrojs/netlify` or `@astrojs/vercel`) and build with
`KEYSTATIC=true`. See https://keystatic.com/docs/github-mode.

## Forms

The demo, contact and newsletter forms work with **Netlify Forms** out of the box
(`data-netlify`, honeypot, redirect to `/thank-you`). To use another provider, set
**Site Settings → Form endpoint** to its URL (Formspree, Basin, a serverless function…);
the forms then post there instead.

## Images & logos

- Photos live in `public/images/lib/` as WebP in three widths (`name.webp` 1600px,
  `name-1200.webp`, `name-800.webp`); `Media` builds the `srcset` automatically.
- Static sections take their images from one slot map, `src/data/images.ts` — swap a
  path there to rebrand a section. CMS entries (posts, case studies, services, team,
  testimonials) have their own image fields; uploads land in `public/images/<type>/`.
- Client logos are SVGs in `src/assets/logos/<name>.svg`, rendered as a CSS mask so they
  take the surrounding text colour. Any client without a file falls back to a wordmark.

## SEO

Per-page titles and descriptions, canonical URLs, Open Graph / Twitter cards
(`public/og.jpg` by default, the cover image on articles, case studies and services),
`sitemap-index.xml` via `@astrojs/sitemap` and `public/robots.txt`. Set your domain in
`astro.config.mjs` (`site`) and `robots.txt`.

## Design system

- Tokens (colors, fonts) — `src/styles/global.css` `@theme` block, mirrored from the Figma variables.
- Type scale — `t-display`, `t-h1`…`t-h6`, `t-b1`…`t-b5`, `t-label` utilities (responsive).
- Breakpoints — mobile first; `md` 768, `lg` 1024, `xl` 1280. Desktop is designed at 1440.
- Components — `src/components/ui` (primitives), `cards`, `forms`, `layout`, `sections`.
  Every section carries a `data-section` id matching the catalog on `/template/sections`.
