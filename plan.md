# Clarity template — QA report and fix plan

Audit of commit `c9d7eef` (10 Nov 2026). **Nothing in this report has been applied** — it lists what is wrong, where, and the proposed fix, in priority order.

## How it was checked

| Pass | What was done |
| --- | --- |
| Build | `astro check` (0 errors / 0 warnings / 0 hints) and `npm run build` (101 pages, no warnings). |
| Visual | Every built route (40 pages + 60 section previews + 404) loaded in Chromium at 390, 768, 1024 and 1440 px, scrolled end to end, and screenshotted; spot checks at 1920 px. Screenshots were reviewed page by page at 390 and 1440. |
| Automated | Per page and width: horizontal overflow, broken images, failed requests, console errors, content left hidden by reveal animations, heading order, duplicate ids, tap-target size, internal links, and axe-core (at 390 and 1440). |
| Code | All of `src/` (layout, scripts, components, pages, data), `keystatic.config.ts`, `content.config.ts`, every content file, README and `docs/PLAN.md`. |
| Efficiency | Bundle sizes, fonts, images, per-page payload, unused code and assets. |

Not checked: Safari / Firefox / real devices, the Keystatic editor UI in a browser, a live form submission on a host, Lighthouse scores, and a pixel diff against Figma (the Figma file was not opened in this pass).

**What passed cleanly:** no horizontal scroll at any width, no broken images or 404 requests, no broken internal links, no duplicate ids, no heading-level skips, one `<h1>` on every real page, every image has `alt`, all reveal-animated content becomes visible, and axe reports only the three issue types listed in section 3.

Priority key: **P0** broken for visitors or buyers · **P1** should fix before release · **P2** polish.

---

## 1. Visual errors

| # | Pri | Where | Problem | Proposed fix |
| --- | --- | --- | --- | --- |
| V1 | P0 | `sections/Process01.astro:19` (Home 1, "Our 4-Step Engagement Model") | Steps 2–4 can never be opened. The markup uses `data-tabs` / `data-tab-item`, which no script handles. On desktop their text stays invisible; at 390 and 768 px they render as a number plus "…". | Rebuild on the existing accordion contract (`data-accordion` + `<button data-accordion-trigger>`), as `Process04` does; stack vertically on mobile. |
| V2 | P0 | `ui/ClientLogo.astro:32` | The Vexum logo renders as a solid grey block (Home 1 hero strip, Home 2 marquee, Case Studies and Service Detail logo strips). Vite inlines SVGs under 4 KB as a `data:` URI containing quotes, which breaks the unquoted `mask:url(...)`. Unify and Synth would break the same way. | Quote the URL (`url("…")`), or force file URLs with `?url&no-inline`. |
| V3 | P0 | `scripts/motion.ts:91-94` | The header can stay hidden at the top of the page. Jumping to the top (Home key, anchor, fast flick) within 0.4 s of scrolling down leaves it translated off-screen. Reproduced: header ends at `top: -104px` with `scrollY = 0`. | Kill the running tween (`gsap.killTweensOf(header)`) before clearing the transform. |
| V4 | P1 | `sections/CaseReel.astro` (Home 2) | 8 of the 10 reel cards are empty grey boxes; only one has a photo. Reads as unfinished. | Fill every card from the case-study covers, or cut the reel to real cards. |
| V5 | P1 | `content/case-studies/*.mdoc:28` | Each case study shows a dark grey placeholder box where the chart figure should be (the `figure` tag has no `src`). | Ship a chart image or remove the tag; make `Figure` render nothing without `src`. |
| V6 | P1 | `sections/ImageBanner.astro:13` (Services) | Banner image is a fixed 1470 px wide, so above ~1470 px viewports black bars show left and right (image spans 225–1695 of 1920). | `inset-0 size-full object-cover` instead of fixed pixels. |
| V7 | P1 | `sections/TeamRoster.astro:11`, `sections/Team01.astro:20` | Third team member is cut off on desktop and reachable only by mouse drag — no arrows, and nothing at all under reduced motion. | Add `SliderNav`, or switch to a 3-column grid at `lg`. |
| V8 | P1 | `sections/Timeline02.astro` (About 2, 390 px) | Year columns run off the right edge and the body text is clipped mid-word. | Stack columns on mobile, or make the row scrollable with snap; use `min-h` instead of fixed `h-[259px]`. |
| V9 | P1 | `sections/Timeline01.astro:9` (About, 390 px) | Active year is off-screen on load and the track scrolls ~470 px past the last card (fixed `w-[1400px]` rule). | Size the rule with `inset-x-0`; scroll the active item into view. |
| V10 | P1 | `sections/Principle01.astro` (About, 390 px) | Large blank gap where the active image should be, between the accordion and the two thumbnails. | Give the image stack an explicit mobile height / aspect ratio. |
| V11 | P1 | `sections/Pillar02.astro` (Home 2, 390 px) | Card has a ~230 px empty grey area under the four items. | Remove the fixed height below `lg`. |
| V12 | P1 | `sections/Reach02.astro:8,31` (About 2) | Map pins use hardcoded 1440-canvas pixel offsets: between 1024 and 1279 px "Dubai" and "Sydney" are clipped. The dotted map itself is almost invisible. The `x`/`y` values in `data/about.ts` are ignored. | Position from `l.x` / `l.y` percentages; raise map contrast. |
| V13 | P1 | `ui/Checkbox.astro:9` (Contact, 390 px) | Fixed `h-[21px]` labels: two-line labels overlap the row below. | `min-h` + `items-start`; one column on mobile. |
| V14 | P1 | `sections/Hero02.astro` (Home 2) | White nav text sits on the bright top of the photo — logo and menu icon are nearly invisible on mobile. | Add a top gradient scrim, or a darker crop. |
| V15 | P2 | `sections/Pillar03.astro` (Home 3, 390 px) | Four cards take ~1500 px of height, mostly blank space around an icon. | Shrink the icon block on mobile. |
| V16 | P2 | `sections/Testimonial01.astro:21` | Fixed `md:h-[435px]` clips the caption between 1024 and 1200 px. | `md:min-h-[435px]`. |
| V17 | P2 | `sections/ServiceList.astro:14` | Fixed `md:h-[224px]` copy column overflows the card at 768 px. | `md:min-h-[224px]`. |
| V18 | P2 | `sections/Reach01.astro:12` | Dial spokes get `translate` twice (Tailwind class plus inline `transform`), so the wheel turns off-centre. | Drop one. |
| V19 | P2 | `ui/Toc.astro:17`, `ContactHero.astro:45`, `Pillar02.astro:29`, `Pillar03.astro:17`, `ServiceBody.astro:39` | `truncate` / `line-clamp` cut real content (TOC headings, the office address, pillar copy, card title). | Let it wrap. |
| V20 | P2 | `pages/template/licenses.astro:21` | Source cards show a letter ("L", "F", "G") instead of a logo. | Add the source logos or a neutral icon. |

## 2. Functional and code bugs

| # | Pri | Where | Problem | Proposed fix |
| --- | --- | --- | --- | --- |
| B1 | P0 | `lib/forms.ts`, `content/settings.json:16` | Every form fails on the Vercel deployment the last commit prepares for: `formEndpoint` is empty, so forms POST Netlify-style to `/`, which a static Vercel site rejects. Visitors see "Something went wrong". | Ship a working default (endpoint env var or a serverless function), or show a clear "form not configured" state in dev and fail the build when unset. |
| B2 | P0 | `keystatic.config.ts:38,75,100,116,146,163` | Image fields point at `/images/<type>/` but every seed image lives in `/images/lib/`. In the editor the covers and photos show empty and are dropped on first save. | Point the fields at `public/images/lib`, or move seed images into per-type folders. |
| B3 | P0 | `styles/global.css:221-225` | If the JS bundle fails to load, all reveal content stays invisible (27 of 27 elements on Home 1, including the `<h1>`), because an inline script adds `.js` before the bundle is known to work. | Add the class from the bundle itself, or add a CSS/timeout failsafe. |
| B4 | P1 | `sections/BlogGrid.astro` + `scripts/filter.ts` | Category tabs only filter the 9 posts on the current page, so a category whose posts are on page 2 shows "No briefings". "Corporate Governance Hub" is deliberately removed from the tabs (line 22), so 3 posts have no tab. | Filter across all posts (render all, paginate client-side) or build static category pages; restore the tab. |
| B5 | P1 | `pages/insights/index.astro:7`, `BlogGrid.astro:46` | Build crashes with zero featured posts or fewer than 3 non-featured posts; a second featured post silently disappears. | Fall back to the newest post; `.filter(Boolean)`. |
| B6 | P1 | `pages/legal/[slug].astro:37` | "Last revised: October 2026." is hardcoded; the CMS `revised` field is never shown. | Render `page.revised`. |
| B7 | P1 | `sections/TeamRoster.astro:30,32` | Every member's X / LinkedIn icon links to the company profile; per-member `x` / `linkedin` fields are ignored. | Use `m.x` / `m.linkedin`, hide when empty. |
| B8 | P1 | `sections/ServiceBody.astro:14,39-47` | A service without a sidebar card renders an empty heading and an empty black pill. "Download … PDF Brochure" links to `/contact`; there is no PDF. | Guard on `card.title`; add a `brochure` URL field or reword. |
| B9 | P1 | `sections/Reach02.astro:31` | Build throws if `locations` has more than 6 entries. | See V12. |
| B10 | P1 | `content.config.ts:105` vs `keystatic.config.ts:211` | Changelog `date` is optional in the editor but required by the build. | Mark it required in Keystatic. |
| B11 | P1 | `pages/index.astro:13` | Home 1 marks "Services" as the active nav link. | `active: ''`. |
| B12 | P1 | `forms/ContactForm.astro:26` | "Which product(s)…*" is marked required but nothing validates it; company and name are optional here but required in the demo form. | Add group validation; align required fields. |
| B13 | P1 | `ui/NewsletterInput.astro:8` | Email field placeholder reads "Current Executive Designation*" (every footer). | "Work email address". |
| B14 | P2 | `scripts/slider.ts:161,180` | A new click listener is added on every resize, and every resize resets the track to the start. | Bind once; preserve position. |
| B15 | P2 | `scripts/slider.ts:108-112` | Autoplay keeps running off-screen and has no pause control; it pauses on hover only. | Pause via ScrollTrigger `onToggle` and on focus; add a pause button. |
| B16 | P2 | `pages/insights/[slug].astro:18,36` | Tags all link to `/insights` (decorative); "related" is just the 3 newest posts, not same-category. | Plain text or a real tag filter; prefer same category. |
| B17 | P2 | `sections/Pillar02.astro:22`, `Timeline01.astro:5`, `Timeline02.astro:14` | Layouts assume exactly 4 pillars / an item at index 1; other counts emit a literal `undefined` class or an inconsistent open state. | Derive from index; clamp `active`. |
| B18 | P2 | `sections/Reach01.astro:13` | Assumes every image has a `-800.webp` sibling; a buyer's own image would 404. | Use the path as given. |
| B19 | P2 | `scripts/video.ts:23` | With no video URL set (the default), visitors who click a video card see "Add your video URL in Keystatic…". | Hide video cards when `videoUrl` is empty. |
| B20 | P2 | `pages/password.astro`, `scripts/forms.ts:36` | Password form always answers "Incorrect password"; "Log In" in the nav leads here. | Document it as a host-protection stub, or remove "Log In" by default. |
| B21 | P2 | all pages | GSAP logs "target not found" on most pages (empty selector passed to `gsap.set` / `gsap.fromTo`). | Skip when the list is empty. |
| B22 | P2 | `ServiceList.astro:15`, `ServiceZigzag.astro:13`, `TeamRoster.astro:22`, `CareersList.astro:25`, `BlogGrid.astro:39` | `data-reveal` nested inside another `data-reveal` — double offset and fade. | Remove the inner one. |

## 3. Accessibility

| # | Pri | Where | Problem | Proposed fix |
| --- | --- | --- | --- | --- |
| A1 | P1 | `Case01.astro:39`, `Case03.astro:74`, `Testimonial02.astro:26` | Slider dots are 17 × 3 px spans promoted to buttons by script. | Real `<button>`s with a ≥ 24 px hit area. |
| A2 | P1 | `Timeline01.astro:17`, `Timeline02.astro:28` | Inactive years are `zinc-200` on white — 1.26:1 contrast (axe: serious, 12 nodes). | `text-ink-3` or darker. |
| A3 | P1 | Home 1/2/3 team and blog rows | Scrollable rows are not keyboard-focusable (axe: serious, 6 pages). | `tabindex="0"` + `role="region"` + label, or add arrows. |
| A4 | P1 | `ui/SliderNav.astro`, pagination, `Socials.astro`, `FilterTabs.astro:21`, footer links | Tap targets below 24 px on mobile: social icons 14 px, search icon 18 px, footer links 18 px tall; slider arrows are exactly 24 px. | Pad to ≥ 24 px (44 px ideal on touch). |
| A5 | P1 | `Timeline01.astro:21` and other accordion items without a trigger | Items get `aria-expanded` but expand nothing; Timeline01 also auto-rotates every 6 s with no pause. | Use `aria-current`; add a pause control. |
| A6 | P2 | `ui/FilterTabs.astro` | `role="tab"` without tabpanels or arrow-key support; search icon uses the 20 % ink tier. | Plain toggle buttons with `aria-pressed`; darker icon. |
| A7 | P2 | `Navbar.astro:18` | Active nav link has no `aria-current="page"`. | Add it. |
| A8 | P2 | `ui/Field.astro:16`, `Newsletter.astro:17` | Inputs remove the outline; focus is only a border going from 11 % to 40 % black. Placeholders use the 36 % tier (~2.5:1). | Visible focus ring; `text-ink-3` placeholders. |
| A9 | P2 | `Stats01.astro:22` | `<dl>` has value and label swapped. | Swap, or use paragraphs. |
| A10 | P2 | `template/sections/index.astro:24,40-51` | `toolbar` / `radiogroup` roles without the keyboard behaviour. | `role="group"` + `aria-pressed`. |
| A11 | P2 | `PostHero.astro:31` | Same stock avatar for every author, with alt "Photo of {author}". | Per-author photo field, or `alt=""`. |

Note: axe cannot measure text over photos or gradients, so hero and footer text contrast (and the 20 % / 36 % opacity tiers generally) still needs a manual pass.

## 4. Content and CMS

| # | Pri | Where | Problem | Proposed fix |
| --- | --- | --- | --- | --- |
| C1 | P0 | `content/settings.json:5-7` | Emails use `@clarity.com`, a real third-party domain — every `mailto:` and the careers "Submit Portfolio" button would mail a stranger. | `@example.com`. |
| C2 | P1 | `Form01.astro:54,57,64` | "4.8 Stars on Trustpilot" is an invented rating and "Trusted by 3 million owners" is copy from another product. | Neutral placeholders, as props. |
| C3 | P1 | `data/content.ts:72-112`, `Case02.astro:8-11`, `CaseProof.astro:6-7` | Three hardcoded sets of case highlights contradict each other and the CMS (89 % is Owlearn in one place and Deepstack in another; five highlights point at three case studies whose clients are different companies). | One source: derive all three from the `caseStudies` collection. |
| C4 | P1 | `Blog02.astro:15`, `BlogSlider.astro:16` | Every card is forced to the category "Corporate Strategy Hub", which does not exist; the slider shows each post twice. | Use the post's own category; don't duplicate. |
| C5 | P1 | `data/cases.ts:4`, `data/careers.ts:4` | Empty tabs: "High Tech Systems" and "Manufacturing" (case studies), "Management" (careers). | Derive tabs from the content. |
| C6 | P1 | `content/case-studies/*.mdoc` | Four paragraphs are identical across all three case studies; the finance case talks about "fulfillment nodes" and "supply chain mechanics". | Rewrite per case. |
| C7 | P1 | `content/services/*.yaml:6-16` | Detail blocks and sidebar card are the same text for all four services; benchmarks, proof cards and FAQ (only 2 items) are hardcoded and identical on every service page. | Per-service copy; move benchmarks and FAQs into the collection. |
| C8 | P1 | `content/changelog/*`, `package.json` | Changelog says v2.0.0 with dates before the first commit; `package.json` says 0.1.0; no git tags. Entries claim "AVIF auto-compression" and "WCAG compliance", neither of which is true. | One honest 1.0.0 entry; align the version. |
| C9 | P1 | `data/content.ts:12` and Pillar headings | First pillar is "Agent Canvas" (another product); headings differ between variants ("Core Pillars of Clarity" vs "…of Architecture", "via" vs "with Quantitative Methods"). | Rename; unify. |
| C10 | P2 | `data/about.ts:15-16`, `pages/about-2.astro:18` | "8+ Years Experience" vs milestones from 2016 vs "2019-2026"; "Partners and staffs". "$420M+" vs "$1.8B+" capital optimized. | Pick one founding year; fix grammar; reconcile. |
| C11 | P2 | `content/legal/cookies.yaml`, `privacy.yaml` | Describes a cookie banner and analytics that don't exist; lists collected fields that don't match the forms. | Reword as placeholder legal text. |
| C12 | P2 | `forms/ContactForm.astro:5`, `ContactHero.astro` | "Quartr API" product option is foreign; office address and regional hubs are hardcoded (Singapore here, Hong Kong / Dubai / Sydney on About). | Move to settings; make consistent. |
| C13 | P2 | `content/posts/*` | Four authors aren't in the team collection; `authorRole` is filled in but never shown; two excerpts are near-duplicates of other posts; one post has an impossible timeline ("six months ago … three quarters later"). | Tidy seed copy; render or drop `authorRole`. |
| C14 | P2 | `content/settings.json:4,8-9`, `Footer.astro:18` | Footer credits "Slabpixel" on every buyer's site; social links are bare `linkedin.com` / `x.com`; "Clarity" is hardcoded instead of `site.name`. | Placeholders; use the setting. |
| C15 | P2 | `data/site.ts`, `data/*.ts`, most sections | Nav, footer columns, section headings, eyebrows and CTAs live in code, so buyers must edit components. Category / industry / department lists are duplicated in four files and validated as free text. | Expose props; one exported list + `z.enum`; move nav/footer into settings. |
| C16 | P2 | `pages/template/licenses.astro` | Says icons come from Font Awesome, but `Icon.astro` is a hand-drawn set; GSAP, Astro, Tailwind and Keystatic are not listed. | Correct the page. |
| C17 | P2 | `content/jobs/chief-operations-officer-coo.yaml` | "Chief Operations Officer" → "Chief Operating Officer"; department says Manufacturing, text says logistics. | Fix. |

## 5. SEO

| # | Pri | Where | Problem | Proposed fix |
| --- | --- | --- | --- | --- |
| S1 | P1 | `home-2`, `home-3`, `about-2`, `services-2`, `contact-2` | Variant pages are indexable duplicates: titles "Home 2 — Clarity" / "Home 3 — Clarity", and identical titles for About, Services and Contact pairs. All are in the sitemap. | `noindex` + sitemap exclusion for demo variants, or document that buyers delete them. |
| S2 | P1 | `password`, `thank-you`, `template/*` | No `noindex` meta (only the section previews have it). Robots disallows `/template/sections/` while the sitemap still lists its index. | Pass `noindex`; align robots and sitemap. |
| S3 | P1 | `layouts/BaseLayout.astro` | No JSON-LD (Organization, Article, BreadcrumbList). `og:image` is always declared 1200 × 630 even for cover images. | Add structured data; drop the fixed dimensions for covers. |
| S4 | P2 | site-wide | 35 of 97 internal links lack the trailing slash that canonicals and the sitemap use. | Set `trailingSlash` and make links consistent. |
| S5 | P2 | `public/` | Only a text-based SVG favicon (renders in a fallback font); no apple-touch icon or web manifest. | Add an icon set. |
| S6 | P2 | meta descriptions | Too short on Contact 2, Thank You, Changelog; 166 chars on one post. | Tune. |

## 6. Efficiency

| # | Pri | Where | Problem | Proposed fix |
| --- | --- | --- | --- | --- |
| E1 | P1 | `ui/Media.astro` | Images are hand-exported WebP in `public/` — 14 MB, ~600 KB per 1600 px file, no AVIF, no `width`/`height` attributes on any `<img>` (22 on Home 1). | Move to `astro:assets` (`<Image>` / `getImage`) for AVIF/WebP, intrinsic sizes and hashing. |
| E2 | P1 | `Principle01.astro:35`, `Principle02.astro:33`, `Process02.astro:35`, `Testimonial01.astro:19`, `Testimonial02.astro:15` | No `sizes`, so a 50 px avatar or a 575 px column can download the 1600 px file. | Add accurate `sizes`. |
| E3 | P1 | `layouts/BaseLayout.astro` | One 130 KB JS bundle (50 KB gzip: GSAP + ScrollTrigger + all behaviours) loads on every page, including Legal and 404. | Split per feature with dynamic imports keyed on the markup present. |
| E4 | P1 | `styles/global.css:3-6` | 116 KB CSS (44 KB gzip), largely `@font-face` rules for Cyrillic and Vietnamese subsets; 38 font files emitted, legacy `.woff` included; no font preload. | Import `latin` subsets only; preload the two above-the-fold fonts. |
| E5 | P1 | hero sections | The hero `<h1>` is hidden until the JS bundle runs (reveal animation), which delays LCP; the hero image isn't preloaded. | Don't reveal-animate above-the-fold headings; `<link rel="preload">` the hero image. |
| E6 | P2 | `Reach01.astro:13` | 28 CSS background tiles load 800 px images eagerly for 93 px slots. | Small thumbnails via lazy `<img>`. |
| E7 | P2 | `template/sections/index.astro:85-92` | 59 iframes, each a full page with GSAP; nothing unloads them. | Mount on intersection, unmount off-screen. |
| E8 | P2 | `data/images.ts`, `ui/Icon.astro` | Unused image slots (`facadeAngle`, `towerBlock`, `buildingConcrete`, `portraitDesk`, `glassTowerUp`) and icons (`chevron-up`, `menu`, `check`, `arrow-right`). | Remove. |

## 7. Code quality and template hygiene

| # | Pri | Where | Problem | Proposed fix |
| --- | --- | --- | --- | --- |
| Q1 | P1 | repo root | No ESLint, Prettier, `.editorconfig`, `engines` field, CI or LICENSE file. | Add them; run `astro check` + build in CI. |
| Q2 | P1 | `README.md` | Says Node 20+ (Astro 7.4 needs ≥ 22.22); says `public/robots.txt` (it is `src/pages/robots.txt.ts`); route table omits `/insights/page/[n]`; claims every section has a catalog id (HERO-11, LEGAL-01, PASSWORD-01, ARTICLE-01, DOCS, navbar and footer don't). | Correct. |
| Q3 | P1 | `docs/PLAN.md` | The build plan ships to buyers and describes things that don't exist (Astro 5, Lenis, Embla, AVIF, JSON-LD, category pages, analytics) with every to-do unchecked. | Remove from the deliverable or rewrite as-built. |
| Q4 | P2 | `template/sections/_registry.ts`, `index.astro:17` | Catalog claims "all 59 sections" but omits five sections plus nav and footer; `usedOn` lists are wrong in several entries; nothing links to `/template/sections`. | Complete the registry; link it from the footer or style guide. |
| Q5 | P2 | 8 places | `as any` (icon names ×5, related posts, licenses, registry component). | Type the data with `IconName`; proper prop types. |
| Q6 | P2 | `Newsletter.astro`, `Stats04/05.astro` | Duplicated markup (hand-rolled newsletter form; two near-identical stats sections; logo list repeated). | Merge into shared components. |
| Q7 | P2 | `ui/Media.astro:3`, `ui/Icon.astro:4`, `ui/Toc.astro:2`, `Principle01.astro:2`, `PageHero.astro:11`, `Timeline02.astro:15` | Stale comments ("until the asset pass", "step 6"), an unused prop, a dead helper. | Clean up. |
| Q8 | P2 | `template/sections/index.astro:121`, `[id].astro:32` | `postMessage(…, '*')` with no origin check. | Use `location.origin`. |
| Q9 | P2 | `pages/template/style-guide.astro` | Lists text tier "50 %" where the token is 55 %; a duplicated stroke swatch; redundant inline declarations. | Generate swatches from the tokens. |

---

## Suggested order of work

1. **P0 fixes** (V1, V2, V3, B1, B2, B3, C1) — small, isolated, and each one is visibly broken today.
2. **Mobile layout pass** (V8–V13, V15) and wide-screen fixes (V6, V7, V12).
3. **Content single-sourcing** (C3–C9, B4–B8) — most contradictions disappear once the hardcoded arrays read from the CMS.
4. **Accessibility** (A1–A5 first).
5. **Performance** (E1–E5) — `astro:assets` migration is the largest single item.
6. **SEO, docs and hygiene** (S1–S3, Q1–Q3), then the P2 polish.

After each group: re-run `astro check`, `npm run build`, and the same 4-width screenshot and axe pass used for this report.
