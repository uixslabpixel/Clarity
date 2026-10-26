/**
 * Keystatic CMS schema. Runs in local mode: edits are written straight to the
 * files under src/content and picked up by Astro content collections.
 * Open http://127.0.0.1:4321/keystatic while `npm run dev` is running.
 *
 * To edit from a deployed site instead, switch `storage` to
 * `{ kind: 'github', repo: 'owner/repo' }` (or Keystatic Cloud) and deploy
 * with an SSR adapter — see README.
 */
import { config, collection, singleton, fields } from '@keystatic/core';
import { block } from '@keystatic/core/content-components';

const postCategories = ['Corporate Governance Hub', 'Strategy Hub', 'Operations', 'Capital Trends', 'Executive Pay'];
const industries = ['Global Operations', 'Finance', 'High Tech Systems', 'Manufacturing', 'Logistics'];
const departments = ['Finance', 'Manufacturing', 'Management'];

const options = (list: string[]) => list.map((v) => ({ label: v, value: v }));

/** Rich-text body shared by insights and case studies. */
const articleBody = (imageDir: string) =>
  fields.markdoc({
    label: 'Body',
    options: {
      image: { directory: `public/images/${imageDir}`, publicPath: `/images/${imageDir}/` },
      heading: [2, 3],
    },
    components: {
      quote: block({
        label: 'Pull quote',
        schema: {
          quote: fields.text({ label: 'Quote', multiline: true }),
          cite: fields.text({ label: 'Attribution' }),
        },
      }),
      figure: block({
        label: 'Figure',
        schema: {
          src: fields.image({ label: 'Image', directory: `public/images/${imageDir}`, publicPath: `/images/${imageDir}/` }),
          alt: fields.text({ label: 'Alt text' }),
          caption: fields.text({ label: 'Caption' }),
          height: fields.integer({ label: 'Height (px, desktop)', defaultValue: 312 }),
          width: fields.integer({ label: 'Max width (px, optional)' }),
        },
      }),
    },
  });

export default config({
  storage: { kind: 'local' },
  ui: {
    brand: { name: 'Clarity' },
    navigation: {
      Content: ['posts', 'caseStudies', 'services'],
      Company: ['team', 'testimonials', 'jobs'],
      Site: ['settings', 'legal', 'changelog'],
    },
  },
  collections: {
    posts: collection({
      label: 'Insights',
      slugField: 'title',
      path: 'src/content/posts/*',
      format: { contentField: 'body' },
      entryLayout: 'content',
      columns: ['title', 'date', 'category'],
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        category: fields.select({ label: 'Category', options: options(postCategories), defaultValue: postCategories[0] }),
        date: fields.date({ label: 'Publish date', validation: { isRequired: true } }),
        author: fields.text({ label: 'Author' }),
        authorRole: fields.text({ label: 'Author role' }),
        excerpt: fields.text({ label: 'Excerpt (cards)', multiline: true }),
        dek: fields.text({ label: 'Standfirst (article header)', multiline: true }),
        readTime: fields.text({ label: 'Read time', defaultValue: '5 min read' }),
        cover: fields.image({ label: 'Cover image', directory: 'public/images/posts', publicPath: '/images/posts/' }),
        tags: fields.array(fields.text({ label: 'Tag' }), { label: 'Tags', itemLabel: (p) => p.value }),
        featured: fields.checkbox({ label: 'Feature at the top of the Insights page' }),
        body: articleBody('posts'),
      },
    }),

    caseStudies: collection({
      label: 'Case Studies',
      slugField: 'shortTitle',
      path: 'src/content/case-studies/*',
      format: { contentField: 'body' },
      entryLayout: 'content',
      columns: ['shortTitle', 'client'],
      schema: {
        shortTitle: fields.slug({ name: { label: 'Headline' } }),
        title: fields.text({ label: 'Long title (list cards)', multiline: true }),
        client: fields.text({ label: 'Client' }),
        area: fields.text({ label: 'Practice area tag' }),
        industry: fields.select({ label: 'Industry (filter)', options: options(industries), defaultValue: industries[0] }),
        practice: fields.text({ label: 'Deployed practice' }),
        timeframe: fields.text({ label: 'Transformation frame' }),
        metric: fields.text({ label: 'Headline metric' }),
        metricLabel: fields.text({ label: 'Metric label' }),
        order: fields.integer({ label: 'Sort order', defaultValue: 0 }),
        cover: fields.image({ label: 'Cover image', directory: 'public/images/cases', publicPath: '/images/cases/' }),
        body: articleBody('cases'),
      },
    }),

    services: collection({
      label: 'Services',
      slugField: 'title',
      path: 'src/content/services/*',
      format: { data: 'yaml' },
      columns: ['title', 'order'],
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        summary: fields.text({ label: 'Summary', multiline: true }),
        cta: fields.text({ label: 'Card button label', defaultValue: 'Explore Framework' }),
        order: fields.integer({ label: 'Sort order', defaultValue: 0 }),
        cover: fields.image({ label: 'Image', directory: 'public/images/services', publicPath: '/images/services/' }),
        blocks: fields.array(
          fields.object({
            heading: fields.text({ label: 'Heading' }),
            text: fields.text({ label: 'Text', multiline: true }),
          }),
          { label: 'Detail page sections', itemLabel: (p) => p.fields.heading.value },
        ),
        card: fields.object(
          {
            title: fields.text({ label: 'Title', defaultValue: 'Direct Strategic Access' }),
            text: fields.text({ label: 'Text', multiline: true }),
            cta: fields.text({ label: 'Button', defaultValue: 'Retain Practice Lead' }),
            note: fields.text({ label: 'Note link', defaultValue: 'Download Service-Specific Technical PDF Brochure' }),
          },
          { label: 'Sidebar card' },
        ),
      },
    }),

    team: collection({
      label: 'Team',
      slugField: 'name',
      path: 'src/content/team/*',
      format: { data: 'yaml' },
      columns: ['name', 'role'],
      schema: {
        name: fields.slug({ name: { label: 'Name' } }),
        role: fields.text({ label: 'Role' }),
        bio: fields.text({ label: 'Bio', multiline: true }),
        photo: fields.image({ label: 'Portrait', directory: 'public/images/team', publicPath: '/images/team/' }),
        linkedin: fields.url({ label: 'LinkedIn URL' }),
        x: fields.url({ label: 'X URL' }),
        order: fields.integer({ label: 'Sort order', defaultValue: 0 }),
      },
    }),

    testimonials: collection({
      label: 'Testimonials',
      slugField: 'name',
      path: 'src/content/testimonials/*',
      format: { data: 'yaml' },
      schema: {
        name: fields.slug({ name: { label: 'Name' } }),
        role: fields.text({ label: 'Role' }),
        company: fields.text({ label: 'Company' }),
        quote: fields.text({ label: 'Quote', multiline: true }),
        photo: fields.image({ label: 'Photo', directory: 'public/images/testimonials', publicPath: '/images/testimonials/' }),
      },
    }),

    jobs: collection({
      label: 'Open Roles',
      slugField: 'title',
      path: 'src/content/jobs/*',
      format: { data: 'yaml' },
      columns: ['title', 'department'],
      schema: {
        title: fields.slug({ name: { label: 'Role title' } }),
        practice: fields.text({ label: 'Practice' }),
        department: fields.select({ label: 'Department (filter)', options: options(departments), defaultValue: departments[0] }),
        location: fields.text({ label: 'Location' }),
        focus: fields.text({ label: 'Focus' }),
        text: fields.text({ label: 'Summary', multiline: true }),
        order: fields.integer({ label: 'Sort order', defaultValue: 0 }),
      },
    }),

    legal: collection({
      label: 'Legal Pages',
      slugField: 'label',
      path: 'src/content/legal/*',
      format: { data: 'yaml' },
      schema: {
        label: fields.slug({ name: { label: 'Link label' }, slug: { label: 'URL slug' } }),
        title: fields.text({ label: 'Page title' }),
        intro: fields.text({ label: 'Intro', multiline: true }),
        revised: fields.text({ label: 'Last revised', defaultValue: 'October 2026' }),
        sections: fields.array(
          fields.object({
            heading: fields.text({ label: 'Heading' }),
            body: fields.text({ label: 'Body (blank line between paragraphs)', multiline: true }),
          }),
          { label: 'Sections', itemLabel: (p) => p.fields.heading.value },
        ),
      },
    }),

    changelog: collection({
      label: 'Changelog',
      slugField: 'version',
      path: 'src/content/changelog/*',
      format: { data: 'yaml' },
      schema: {
        version: fields.slug({ name: { label: 'Version' } }),
        date: fields.date({ label: 'Release date' }),
        notes: fields.text({ label: 'Notes', multiline: true }),
      },
    }),
  },

  singletons: {
    settings: singleton({
      label: 'Site Settings',
      path: 'src/content/settings',
      format: { data: 'json' },
      schema: {
        name: fields.text({ label: 'Site name', defaultValue: 'Clarity' }),
        tagline: fields.text({ label: 'Footer tagline', multiline: true }),
        owner: fields.text({ label: 'Copyright owner' }),
        email: fields.text({ label: 'General email' }),
        talentEmail: fields.text({ label: 'Careers email' }),
        legalEmail: fields.text({ label: 'Legal email' }),
        linkedin: fields.url({ label: 'LinkedIn URL' }),
        x: fields.url({ label: 'X URL' }),
        announcement: fields.object(
          {
            enabled: fields.checkbox({ label: 'Show announcement bar', defaultValue: true }),
            text: fields.text({ label: 'Text' }),
            cta: fields.text({ label: 'Link label' }),
            href: fields.text({ label: 'Link URL' }),
          },
          { label: 'Announcement' },
        ),
        formEndpoint: fields.text({
          label: 'Form endpoint (optional)',
          description: 'Leave empty to use Netlify Forms. Set to a Formspree/Basin/etc. URL to post forms there instead.',
        }),
      },
    }),
  },
});
