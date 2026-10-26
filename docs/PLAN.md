# Clarity — Website Template Build Plan

Source: Figma `Template--Clarity` (file `CvaaIilykmuriZiRYM7t4Y`), page **Ready Dev** (`399:24106`).
Treat Ready Dev as the source of truth. The `Wireframe`, `Design : Style` and `Archive` pages are reference only.

---

## 1. Design analysis (done)

### 1.1 What's in the file
- **20 page designs**. Most have a desktop frame (1440) and a mobile frame (390).
- There are **no tablet frames**, so tablet layouts (768 / 1024) have to be worked out between desktop and mobile.
- Several pages carry **"open state" sub-sections** that define tab and accordion states. These specify the interactions.
- There's a **mobile nav overlay** design (`421:22032`): full-screen blurred backdrop, large centered links, Log In and Book a Call buttons pinned to the bottom.
- The rest of the canvas is marketing material: cover and preview mockups (`448:85102`, `508:*`, `515:*`). These aren't site pages.
- The changelog calls this the **"Clarity Webflow Template"**, which matters for the stack decision in §2.1.

### 1.2 Page inventory

| # | Page | Desktop node | Mobile node | Height (D) |
|---|------|-------------|-------------|-----------|
| 1 | Home 1 (dark, full-bleed hero, announcement bar) | `421:19878` | `421:20962` | 8567 |
| 2 | Home 2 (full-bleed photo hero + logo marquee) | `421:15567` | `421:16839` | 7909 |
| 3 | Home 3 (inset rounded hero, logo grid) | `421:12378` | `421:13936` | 9704 |
| 4 | About 1 | `421:24417` | `421:24982` | 3861 |
| 5 | About 2 | `421:26473` | `421:29727` | 4472 |
| 6 | Services 1 (stacked list cards) | `421:33433` | `421:34160` | 4556 |
| 7 | Services 2 (zig-zag) | `421:34963` | `421:35451` | 5954 |
| 8 | Service Detail | `421:36521` | `421:37267` | 4784 |
| 9 | Case Studies (filter list) | `421:39902` | `421:40705` | 4119 |
| 10 | Case Study Detail | `421:42249` | `421:42706` | 3676 |
| 11 | Team | `421:43148` | `421:43642` | 4227 |
| 12 | Blog / Insights | `421:44118` | `421:44676` | 4290 |
| 13 | Blog Detail | `421:46433` | `421:46972` | 5271 |
| 14 | Contact 1 (light) | `421:45183` | `421:45894` | 1894 |
| 15 | Contact 2 (image bg) | `421:45620` | `421:46171` | 1894 |
| 16 | Careers | `421:50579` | `421:51342` | 2791 |
| 17 | Legal | `421:50049` | `421:50320` | 2101 |
| 18 | 404 | `421:49568` | `421:49815` | 1427 |
| 19 | Style Guide | `421:48927` | — (desktop only) | 4352 |
| 20 | Changelog | `451:16458` | — | 1833 |
| 21 | Password | `451:16735` | — | 1419 |
| 22 | Asset License | `451:16999` | — | 2208 |

Utility pages 19–22 have no mobile frame, so their mobile layouts get derived from the shared patterns.

### 1.3 Design tokens (from Figma variables)
- **Fonts**
  - Headings: **Inter Tight** 400. Display 80/1.2, H1 64/1.2, H2 56/1.1, H3 40, H4 32, H5 24, H6 16 (+1% tracking).
  - Body: **Geist** 400. B1 32, B2 24, B3 16/1.3, B4 14/1.4, B5 12.
  - Label / eyebrow: **Geist Mono** 500, 14/1.3, 4% tracking, uppercase.
- **Colors**
  - Black `#000` and white `#fff`.
  - Zinc scale `50 #fafafa · 100 #f4f4f5 · 200 #e4e4e7 · 300 #d4d4d8 · 400 #9f9fa9 · 600 #52525c`.
  - Text opacity steps: 100 / 72 / 50 / 36 / 20%.
  - Strokes: `#D4D4D8`, black/white at 10%.
  - Brand 1 `#FA8513` (orange), Brand 2 `#9BACD8` (periwinkle), plus a brand gradient (peach → periwinkle). The gradient is used on CTAs, the footer, and hero washes.
- **Recurring visual motifs**
  - Diagonal **hatched divider strip** between sections.
  - Peach/periwinkle **corner gradient wash** behind page heroes and CTAs.
  - Duotone **halftone/dot-screen photography** (periwinkle + coral).
  - "Clarity" wordmark with a gradient fade on "ity".
  - Pill buttons with a circled chevron.
- **Layout**
  - Desktop canvas is 1440.
  - Two content widths: about 1170 for most sections, about 1280–1360 for wide sections (Home 3, About 2).
  - Narrow column about 800 for legal and FAQ.
  - Mobile canvas is 390 with 16px gutters (358 content width).
- **Icons**: Font Awesome, per the Asset License page. The style guide shows a solid set and an outline set.

### 1.4 Global components
- **Announcement bar**: "The Clarity Agent is live · Read now". Home 1 shows it above the nav; Home 2 and 3 show it inline in the hero.
- **Navbar**, 3 variants:
  - (a) transparent over a dark image, white text (Home 1, Home 2, Contact 2)
  - (b) light, on the gradient wash (inner pages)
  - (c) light, minimal, above an inset hero (Home 3)
  - The active link is highlighted. Right side has Log In and Book a Call.
- **Mobile nav overlay** (open/close animation).
- **Footer**, 3 variants:
  - (a) dark, over a building photo (Home 1)
  - (b) boxed gradient card plus a bottom legal row (most pages)
  - (c) full-bleed light, unboxed (Home 3)
  - Contents: wordmark, tagline, Overview / Contact / Legal columns, newsletter input, social links, © line.
- **CTA "Get a Demo"**: centered, on the gradient wash, one button. Headline and button text change per page.
- **Breadcrumb** in Geist Mono (`HOME /ABOUT`).
- **Buttons**: pill light, pill dark, pill ghost, each with an optional chevron. Also a slider arrow button and slider dots/dashes.
- **Form controls**: input, select, textarea, checkbox, and an inline newsletter input with a Send button.
- **Section header**: eyebrow label, heading, optional right-aligned button. Some variants have a hairline divider.

### 1.5 Section catalog (feeds the "Template Sections" page)

**Heroes**
- HERO-01: Full-bleed image, centered headline, 2 CTAs, floating video card (Home 1)
- HERO-02: Full-bleed image, left headline, video card, logo marquee strip (Home 2)
- HERO-03: Inset rounded image, left headline, video card (Home 3)
- HERO-04: Centered page hero with breadcrumb and gradient wash (About 1, Services, Case Studies, Team, Careers)
- HERO-05: Split hero: breadcrumb and year on the left, title and text on the right, full-width image below (About 2)
- HERO-06: Detail hero: breadcrumb, title left, description right, wide image (Service Detail)
- HERO-07: Case study hero: title, big metric, image, 3-column meta row
- HERO-08: Featured post hero: title, meta, excerpt, image (Blog)
- HERO-09: Article hero with author / date / read-time row (Blog Detail)
- HERO-10: Contact hero with a form card (light and image-background variants)
- HERO-11: 404 hero with a big ghost "404"
- HERO-12: Simple centered title hero (Style Guide, Changelog, Password, Asset License, Legal)

**Logos**
- LOGO-01: Infinite marquee (Home 2)
- LOGO-02: 3×2 bordered grid (Home 3)
- LOGO-03: Inline divided strip (Service Detail, Case Studies, Home 2)

**Pillars and features**
- PILLAR-01: Dark split layout: accordion list on the left, image stack on the right that swaps with the active item (Home 1, 4 states)
- PILLAR-02: Grey card, 2×2 icon grid, image on the right (Home 2)
- PILLAR-03: 2×2 cards with a summary, an icon and a bullet list (Home 3)
- PRINCIPLE-01: Accordion with an image stack (About 1)
- PRINCIPLE-02: Vertical tabs with a large image (About 2)

**Stats**
- STATS-01: Dark split: title on the left, 3 rows of number + caption (Home 1)
- STATS-02: 3 grey cards (Home 2)
- STATS-03: 3 centered columns with dividers (Home 3)
- STATS-04: Range numbers, "+22% to 45%" (Service Detail)
- STATS-05: "Portfolio Performance Secured", 2 large numbers plus a logo strip (Case Studies)
- REACH-01: Arc of tilted images around a heading plus 3 stats (About 1)
- REACH-02: Dotted world map with location pins (About 2)

**Case studies**
- CASE-01: Dark coverflow carousel with an active card, metric and excerpt (Home 1)
- CASE-02: 2×2 metric cards plus a logo strip (Home 2)
- CASE-03: Testimonial-style case card slider with 2 metrics and dot pagination (Home 3)
- CASE-04: Filter tabs, search, horizontal list cards with a metric (Case Studies)
- CASE-05: "Proof of Execution", 2-up image cards (Service Detail)

**Process**
- PROCESS-01: 4 columns where the active column expands (Home 1)
- PROCESS-02: Accordion on the left, image on the right (Home 2)
- PROCESS-03: Sticky numbered index on the left, stacked cards with images on the right (Home 3)
- PROCESS-04: 3 horizontal step columns where the active one expands (Services 1)
- PROCESS-05: Title on the left, 3 step cards in a grid (Services 2)
- TIMELINE-01: Horizontal years slider with the active year highlighted (About 1)
- TIMELINE-02: 3 year columns with a tick ruler; the active column expands with an image (About 2)

**Team**
- TEAM-01: Horizontal slider of portraits with a faded bottom (Home 1)
- TEAM-02: 3 bordered portrait cards on a gradient (Home 2, Home 3)
- TEAM-03: Full team cards with bio and social links, horizontal scroll (Team)
- QUOTE-01: Statement quote next to a photo collage (Team)

**Blog**
- BLOG-01: 3 cards with category chip, title, date/author and excerpt (Home 1, Home 2, Blog Detail related posts)
- BLOG-02: Card slider with arrows (Home 3)
- BLOG-03: Filter tabs, search, featured large card, 2 stacked cards, grid, pagination (Blog)

**Testimonials and forms**
- TESTI-01: Split layout: photo left, quote right, arrows (Home 1)
- TESTI-02: Centered quote with avatar and dashes pagination (Home 3)
- FORM-01: "Architect Your Transformation" demo form on the gradient wash, avatars + Trustpilot row (Home 1, Home 3)
- FORM-02: The same form over a dark image with a video play button (Home 2)
- FORM-03: Contact discovery form with checkboxes and revenue select (Contact)

**Services**
- SERVICE-01: Stacked list cards with image and CTA (Services 1)
- SERVICE-02: Zig-zag image and text (Services 2)
- SERVICE-03: Content blocks next to a sticky sidebar CTA card (Service Detail)
- BANNER-01: Full-bleed image banner with headline and CTA (Services)
- CALLOUT-01: Grey callout box with headline and 1–2 buttons (Team, Contact "24/7 Crisis Support")

**FAQ and content**
- FAQ-01: Centered accordion (Service Detail)
- ARTICLE-01: Rich text plus a sticky "In this page" table of contents (Case Study Detail, Blog Detail). Supports a blockquote, a list with sub-text, figures with captions, a chart image and tags.
- CAREERS-01: Filter tabs, search, job cards with a hatched edge, mandate sidebar card
- LEGAL-01: Narrow sections with dividers and a "Last revised" footer row
- CHANGELOG-01: Sticky TOC plus version cards
- LICENSE-01: Sticky TOC plus source cards
- STYLEGUIDE-01: Typography, color, buttons, form and icon blocks

**Other**
- NEWSLETTER-01: "Subscribe to Clarity Brief", centered input on the gradient wash (Blog)
- PASSWORD-01: Protected portal card
- CTA-01: Centered "Get a Demo" CTA (every inner page)

### 1.6 Issues found in the design (fix or confirm during the build)
1. **Duplicate field.** The demo form asks for "Secure Corporate Email Address" twice (Home 1, 2, 3). The second one should probably be a phone number.
2. **Legal page** repeats the heading "Operational Engagement SLAs" (the 2nd and 3rd blocks).
3. **Changelog**:
   - The 2nd entry is labelled V 1.0.0 but the TOC says V 1.1.0.
   - The hero subtitle is copied from the Style Guide.
4. **Footer tagline** reads "personal coach for effective high-stakes legal communication", which looks like it came from another template. The logo link layer is named "Rhetorich".
5. **Copyright year** says © 2025, but the content is dated 2026. Make it dynamic.
6. **Placeholder email** domain is `clarity-slug.com` (Careers, Legal).
7. **Careers filter tab** is truncated to "Manufactur".
8. **Font mismatch.** The Style Guide labels body text as Inter Tight, but the variables say **Geist**, and Asset License lists Inter Tight + Geist Mono. I'll follow the variables (Geist) and list Geist on Asset License.
9. **Mobile frame names.** The Blog and Blog Detail mobile frames are named `/blog-desktop`.
10. **Missing mobile frames** for Style Guide, Changelog, Password and Asset License.
11. **Missing footer pages.** The footer links to Terms, Privacy and Cookie Policy, but there's only one Legal design. That one template will serve all legal pages.
12. **Careers "Submit Portfolio"** has no destination page. Plan: link to Contact or open a modal/mailto.
13. **Service Detail page title** is the generic "Management Consulting & Corporate Strategy" for every service. Make it CMS-driven.

---

## 2. Plan

### 2.1 Stack (decision needed)
The design is labelled a *Webflow* template, but you asked for a local-first CMS. My recommendation is a code template:

| Concern | Choice | Why |
|---|---|---|
| Framework | **Astro 5** (static output) | Ships no JavaScript by default, works well with content collections, fast Lighthouse scores, easy to sell or hand over as a template |
| Styling | CSS custom properties (tokens) + **Tailwind CSS v4** mapped to Figma variables | Lets me match the design exactly, and the tokens can be themed |
| CMS (local first) | **Keystatic** in `local` mode | Git-backed Markdown/YAML files with an admin UI at `/keystatic`. Can switch to GitHub mode later with no migration |
| Content | Astro Content Collections with Zod schemas (Keystatic writes the files) | Type-safe, so a schema mismatch fails the build |
| Motion | **GSAP + ScrollTrigger** (entrance, parallax, sticky), **Lenis** (smooth scroll) | Industry standard, covers every interaction in the design |
| Sliders | **Embla Carousel** | Small, accessible, supports coverflow/loop |
| Forms | Netlify Forms or Formspree (pluggable) plus client-side validation | Works on a static host |
| Images | `astro:assets` (AVIF/WebP, responsive `srcset`) | Performance |
| Deploy | Vercel / Netlify / Cloudflare Pages | Free tier, preview deploys |
| QA | Playwright (visual screenshots at 390 / 768 / 1024 / 1440), Lighthouse CI, axe | Repeatable QC |

The alternative is to build it in Webflow. That would need Webflow API or Designer access, which I don't have here. The phases below are the same either way, but this plan assumes Astro.

### 2.2 Sitemap

```
/                         Home 1 (default)
/home-2                   Home 2 (variant)
/home-3                   Home 3 (variant)
/about                    About 1
/about-2                  About 2 (variant)
/services                 Services 1
/services-2               Services 2 (variant)
/services/[slug]          Service Detail            ← CMS: services
/case-studies             Case Studies (filter)
/case-studies/[slug]      Case Study Detail         ← CMS: caseStudies
/team                     Team                      ← CMS: team
/insights                 Blog (filter + pagination)
/insights/page/[n]        Blog pagination
/insights/category/[cat]  Category filter (static)  ← CMS: categories
/insights/[slug]          Blog Detail               ← CMS: posts
/careers                  Careers                   ← CMS: jobs
/contact                  Contact 1
/contact-2                Contact 2 (variant)
/legal/[slug]             Terms / Privacy / Cookie  ← CMS: legal
/template/style-guide     Style Guide
/template/changelog       Changelog                 ← CMS: changelog
/template/licenses        Asset License
/template/sections        Template Sections (NEW — step 9)
/password                 Password protected
/404                      Not Found
/keystatic                CMS admin (dev only / auth in prod)
```

Main nav: About Us · Services · Case Studies · Team · Insights, plus Log In and Book a Call.
Footer: Overview (same 5 links), Contact (Email, LinkedIn), Legal (Terms, Privacy), plus Privacy and Cookie in the bottom row.

### 2.3 CMS model (Keystatic collections and singletons)

**Collections**
- **posts**: title, slug, category (ref), author (ref team), date, readTime, excerpt, cover, coverAlt, featured (bool), tags[], body (MDX: headings → TOC, blockquote with cite, figure with caption, list items with descriptions)
- **categories**: name, slug (Corporate Governance Hub, Strategy Hub, Operations, Capital Trends, Executive Pay)
- **caseStudies**: title, shortTitle, slug, client, clientLogo, industry (filter: Global Operations, Finance, High Tech Systems, Manufacturing, Logistics), practiceArea (ref services), timeframe, heroMetric {value, label}, metrics[] {value, label}, testimonial {quote, name, role, avatar}, cover, excerpt, featured, order, body (MDX)
- **services**: title, slug, shortDescription, ctaLabel, cover, icon, summary, bullets[], detailBlocks[] {heading, text}, sidebarCard {title, text, cta, brochureUrl}, benchmarks[] {from, to, label}, faqs[] {q, a}, relatedCases (refs), order
- **team**: name, slug, role, bio, portrait (transparent PNG), social {x, linkedin}, order, featured
- **testimonials**: quote, name, role, avatar, photo, company
- **jobs**: title, department (filter), practice, location, focus, summary, applyUrl, open (bool)
- **clients/logos**: name, logo (SVG), url
- **legal**: title, slug, intro, sections[] {heading, body}, lastRevised, contactEmail
- **changelog**: version, date, number, notes
- **faqs**: question, answer, group

**Singletons**
- **site**: name, tagline, emails, socials, address, announcement bar {enabled, text, link}, nav links, footer columns, newsletter copy, copyright owner
- **homepage blocks**: hero text and CTAs, video card, stats[], pillars[], process steps[], section headings and eyebrows, form copy
- **about**: principles[], milestones[] {year, title, text, image}, reach stats[], locations[] {label, x, y}
- **cta**: default "Get a Demo" copy, with per-page overrides
- **licenses**: sources[] {group, name, url, logo}

### 2.4 Code architecture
```
src/
  styles/tokens.css        Figma variables → CSS vars (color, type, space, radius)
  styles/global.css
  components/ui/           Button, Eyebrow, SectionHeader, Breadcrumb, Input, Select,
                           Textarea, Checkbox, Tag, SliderNav, Wordmark, Icon, HatchDivider
  components/layout/       AnnouncementBar, Navbar(variant), MobileMenu, Footer(variant), CTA
  components/sections/     one file per catalog ID (Hero01.astro, Pillar01.astro …)
  components/cards/        BlogCard, CaseCard*, TeamCard*, ServiceCard*, JobCard, MetricCard
  layouts/                 BaseLayout, PageLayout, ArticleLayout
  content/                 Keystatic-managed collections
  scripts/                 motion.ts (GSAP registry), sliders.ts, tabs.ts, accordion.ts, filter.ts
  pages/                   routes per sitemap
keystatic.config.ts
```
Every section takes its content through props, so the same component powers both real pages and the Template Sections page.

---

## 3. To-do list

### Phase 0 — Setup
- [ ] Decide the stack (Astro + Keystatic recommended, or Webflow)
- [ ] Create the GitHub repo **Clarity** and attach it to this session
- [ ] Scaffold Astro 5 with TypeScript (strict), Tailwind v4, ESLint and Prettier
- [ ] Add fonts: Inter Tight, Geist, Geist Mono (self-hosted via Fontsource, `font-display: swap`)
- [ ] Add Font Awesome, or export the used icons as SVG
- [ ] Set up deploy previews (Vercel or Netlify)
- [ ] Add a README with the template usage guide

### Phase 1 — Analyze the design (done, see §1)
- [x] Inventory every page, breakpoint and open-state frame
- [x] Extract tokens (type, color) from the Figma variables
- [x] Build the global component and section catalog
- [x] Log design issues
- [ ] Extract spacing, radius and shadow values per section with `get_design_context` while building each section
- [ ] Confirm the design issues in §1.6 with you

### Phase 2 — Plan (done, see §2)
- [x] Sitemap
- [x] CMS schema
- [x] Section catalog and IDs
- [x] Code architecture
- [ ] Write the Zod schemas and `keystatic.config.ts` skeleton

### Phase 3 — Base structure, desktop 1:1 (no real assets; placeholder boxes sized like the design)
**Foundations**
- [ ] `tokens.css`: colors, text opacity steps, strokes, brand colors and gradient, type scale, container widths (1170 / 1280 / 1360 / 800), section spacing
- [ ] Type utility classes (`.display`, `.h1`–`.h6`, `.b1`–`.b5`, `.label`)
- [ ] UI primitives: Button (3 variants, ± chevron), SliderNav, Eyebrow, SectionHeader, Breadcrumb, Wordmark, HatchDivider, Tag/Chip, form controls
- [ ] Layout: AnnouncementBar, Navbar ×3 variants, Footer ×3 variants, CTA-01
- [ ] BaseLayout (SEO meta, OG, canonical, favicon, skip link)

**Pages** (build each against a Figma screenshot overlay)
- [ ] Home 1: HERO-01, PILLAR-01, STATS-01, CASE-01, PROCESS-01, TEAM-01, BLOG-01, TESTI-01, FORM-01, dark footer
- [ ] Home 2: HERO-02 + LOGO-01, PILLAR-02, CASE-02 + LOGO-03, STATS-02, TEAM-02, PROCESS-02, CASE-03 variant slider, BLOG-01, FORM-02, boxed footer
- [ ] Home 3: HERO-03, LOGO-02, PILLAR-03, STATS-03, CASE-03, PROCESS-03, TEAM-02, BLOG-02, TESTI-02, FORM-01, light footer
- [ ] About 1: HERO-04, PRINCIPLE-01, TIMELINE-01, REACH-01, CTA-01
- [ ] About 2: HERO-05, PRINCIPLE-02, TIMELINE-02, REACH-02, CTA-01
- [ ] Services 1: HERO-04, SERVICE-01, PROCESS-04, BANNER-01, CTA-01
- [ ] Services 2: HERO-04, SERVICE-02, PROCESS-05, BANNER-01, CTA-01
- [ ] Service Detail: HERO-06, SERVICE-03, STATS-04 + LOGO-03, CASE-05, FAQ-01, CTA-01
- [ ] Case Studies: HERO-04, CASE-04, STATS-05, CTA-01
- [ ] Case Study Detail: HERO-07, ARTICLE-01, CTA-01
- [ ] Team: HERO-04 + image, TEAM-03, QUOTE-01, CALLOUT-01, CTA-01
- [ ] Blog: HERO-08, BLOG-03, NEWSLETTER-01
- [ ] Blog Detail: HERO-09, ARTICLE-01, BLOG-01 related, CTA-01
- [ ] Contact 1 and Contact 2: HERO-10 ×2, CALLOUT-01
- [ ] Careers: HERO-04, CAREERS-01, CTA-01
- [ ] Legal: HERO-12, LEGAL-01
- [ ] 404: HERO-11
- [ ] Style Guide: STYLEGUIDE-01, rendered from the real tokens
- [ ] Changelog: CHANGELOG-01
- [ ] Password: PASSWORD-01
- [ ] Asset License: LICENSE-01
- [ ] Pixel check at 1440: Playwright screenshot vs Figma export for every page, diff under a small tolerance

### Phase 4 — Responsive layout
- [ ] Define breakpoints: 390 (mobile design), 768, 1024, 1280, 1440+ (max-width containers, fluid type via `clamp()` between mobile and desktop sizes)
- [ ] Implement every mobile frame 1:1 at 390 (Home 1/2/3, About 1/2, Services 1/2, Service Detail, Case Studies, Case Study Detail, Team, Blog, Blog Detail, Contact 1/2, Careers, Legal, 404)
- [ ] Use the mobile open-state frames for the accordion and tab versions (PILLAR-01 → stacked accordion, PROCESS-01 → vertical cards, CASE-01 → single-card swipe)
- [ ] Mobile nav overlay plus hamburger. Also lock body scroll, trap focus and close on Esc.
- [ ] Derive tablet layouts (2-column grids, condensed heroes)
- [ ] Derive mobile layouts for Style Guide, Changelog, Password and Asset License
- [ ] Turn horizontal scrollers into native scroll-snap on touch devices
- [ ] Use AVIF/WebP image `sizes` per breakpoint
- [ ] Check widths 320 → 1920 for overflow and horizontal scroll

### Phase 5 — CMS, local first
- [ ] Install Keystatic (`@keystatic/astro`) in `local` storage mode
- [ ] Define all collections and singletons from §2.3
- [ ] Seed content from the Figma copy:
  - 9+ posts and 5 categories
  - 5 case studies
  - 4 services
  - 3+ team members
  - 2 jobs
  - 3 legal pages
  - 3 changelog entries
  - 6–7 client logos
  - testimonials and FAQs
- [ ] Wire pages to collections: lists, detail routes (`getStaticPaths`), related items, prev/next
- [ ] Blog: category filter, client-side search, static pagination (9 per page)
- [ ] Case Studies and Careers: industry/department filter tabs and search
- [ ] Article TOC generated from MDX headings, with scroll-spy
- [ ] Site settings singleton drives nav, footer, announcement bar and default CTA
- [ ] Fix the §1.6 content issues in the seed data
- [ ] Document how to edit content (README) and how to switch Keystatic to GitHub mode for production

### Phase 6 — Interactions and motion
**Global**
- [ ] Lenis smooth scroll (respects `prefers-reduced-motion`)
- [ ] Button hover: background fill, chevron nudge
- [ ] Link underline hover
- [ ] Card hover: image scale 1.03, border darken
- [ ] Nav: hide on scroll down, show on scroll up, background change after the hero, active link state
- [ ] Mobile menu: blur fade-in, staggered links

**Entrance**
- [ ] Headings: split-line reveal (mask + translateY)
- [ ] Eyebrows: fade in
- [ ] Cards: stagger up 24px plus fade
- [ ] Images: clip-path reveal
- [ ] Stats count up when visible (34%, $420M+, 2.4x, 1000+ …)

**Parallax**
- [ ] Hero background image (Home 1/2/3, Contact 2, Services banner)
- [ ] Footer building image (Home 1)
- [ ] REACH-01 image arc rotates or drifts on scroll
- [ ] Gradient washes drift slowly

**Section interactions (from the open-state frames)**
- [ ] PILLAR-01 / PRINCIPLE-01: accordion that also swaps the image stack (auto-advance with a progress indicator, optional)
- [ ] PROCESS-01 / PROCESS-04: column expands on hover or click
- [ ] PROCESS-02: accordion that crossfades the image
- [ ] PROCESS-03: sticky index with scroll-spy as the cards pass
- [ ] PRINCIPLE-02, TIMELINE-01, TIMELINE-02: tabs with the active year expanding
- [ ] CASE-01: coverflow carousel (center scale, side dim), arrows and dashes
- [ ] CASE-03, TESTI-01/02, TEAM-01, TEAM-03, BLOG-02: Embla sliders with drag, arrows and dots
- [ ] LOGO-01: infinite marquee (pauses on hover and for reduced motion)
- [ ] FAQ-01: accordion with height animation and chevron rotate
- [ ] REACH-02: map pins pulse, label pills appear on hover
- [ ] Video card: opens a lightbox player
- [ ] Forms: focus states, inline validation, loading / success / error states, custom select
- [ ] Filters: animate the list swap (FLIP)
- [ ] Back-to-top and in-page TOC smooth scroll

### Phase 7 — Assets
- [ ] Export from Figma: building and people photography, team portraits (transparent PNG), client logos (SVG), icons (SVG), wordmark (SVG), world map (SVG), hatch pattern (SVG/CSS), gradient washes (CSS where possible)
- [ ] Optimize: AVIF/WebP, responsive widths, compressed SVGs, LQIP/blur placeholders
- [ ] Add every image to the CMS seed data with alt text
- [ ] Video card: poster image plus a sample video, or an embed URL field
- [ ] Favicon set, OG images (default plus per-collection), `site.webmanifest`
- [ ] Check licenses (Lummi, Freepik, Font Awesome, Google Fonts) and match the Asset License page

### Phase 8 — QC, every page and section
- [ ] Visual diff against Figma at 1440 and 390 for every page; log and fix differences
- [ ] Check intermediate widths (768, 1024, 1280, 1920)
- [ ] Cross-browser: Chrome, Safari (iOS + macOS), Firefox, Edge
- [ ] Accessibility (WCAG 2.2 AA):
  - semantic landmarks and heading order
  - focus-visible states, keyboard support for sliders, tabs and accordions (ARIA)
  - color contrast (watch the faded text and 20% opacity tiers)
  - form labels and errors
  - reduced motion
  - axe: 0 violations
- [ ] Performance: Lighthouse ≥ 95 on every page, CLS < 0.05, LCP < 2.0s, font preloading, lazy-loaded images below the fold
- [ ] SEO: titles, descriptions, OG/Twitter tags, sitemap.xml, robots.txt, JSON-LD (Organization, Article, BreadcrumbList), canonical URLs
- [ ] Links: no 404s, nav active states correct, footer links resolve
- [ ] Forms: submit end-to-end, spam protection (honeypot), success messages
- [ ] CMS: create, edit and delete every content type in Keystatic and confirm the site updates; check empty states
- [ ] Content proofread: placeholder emails, ©-year, the §1.6 issues
- [ ] Production build passes with no warnings

### Phase 9 — "Template Sections" page
- [ ] `/template/sections` page with a sticky sidebar index grouped by category (Heroes, Logos, Pillars, Stats, Case Studies, Process, Team, Blog, Testimonials, Forms, Services, FAQ, CTA, Content, Navigation, Footers)
- [ ] For every catalog ID: name, ID, which pages use it, and a **live preview** (the real component with seed data)
- [ ] Preview toggle per section: Desktop / Tablet / Mobile (rendered in a resizable iframe via a `/template/sections/preview/[id]` route)
- [ ] "Copy component usage" snippet (import + props) for template buyers
- [ ] Include the nav, footer and mobile menu variants
- [ ] Link it from the footer, Style Guide and Changelog
- [ ] QC the page itself: responsive, fast (lazy-render previews), accessible

### Phase 10 — Launch
- [ ] Production deploy and custom domain
- [ ] Analytics (Plausible or GA4), privacy-friendly cookie banner if required
- [ ] Password page wired to the host's protection (Vercel/Netlify password, or middleware)
- [ ] Final README: setup, CMS editing, theming tokens, adding sections, deploy
- [ ] Tag release v1.0.0 and update the Changelog entry

---

## 4. Open questions for you
1. **Stack**: Astro + Keystatic (recommended), Webflow, or something else (Next.js + Sanity, etc.)?
2. **Repo**: create `Clarity` on GitHub and attach it here (I can't create repos from this session).
3. **Variants**: ship all 3 Homes, 2 Abouts, 2 Services and 2 Contacts as separate routes (my assumption), or pick one of each?
4. **Design issues** in §1.6: OK to fix the copy (duplicate email field → phone, tagline, legal heading, changelog version)?
5. **Forms**: which provider (Netlify Forms, Formspree, or your own endpoint)?
