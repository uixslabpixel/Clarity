/**
 * Catalog of every section in the template, used by /template/sections and its
 * isolated previews (/template/sections/<id>). Add an entry when you add a section.
 */
import Hero01 from '../../../components/sections/Hero01.astro';
import Hero02 from '../../../components/sections/Hero02.astro';
import Hero03 from '../../../components/sections/Hero03.astro';
import PageHero from '../../../components/sections/PageHero.astro';
import SplitHero from '../../../components/sections/SplitHero.astro';
import DetailHero from '../../../components/sections/DetailHero.astro';
import CaseHero from '../../../components/sections/CaseHero.astro';
import FeaturedPostHero from '../../../components/sections/FeaturedPostHero.astro';
import PostHero from '../../../components/sections/PostHero.astro';
import ContactHero from '../../../components/sections/ContactHero.astro';
import SimpleHero from '../../../components/sections/SimpleHero.astro';
import LogoGrid from '../../../components/sections/LogoGrid.astro';
import Pillar01 from '../../../components/sections/Pillar01.astro';
import Pillar02 from '../../../components/sections/Pillar02.astro';
import Pillar03 from '../../../components/sections/Pillar03.astro';
import Principle01 from '../../../components/sections/Principle01.astro';
import Principle02 from '../../../components/sections/Principle02.astro';
import ServiceList from '../../../components/sections/ServiceList.astro';
import ServiceZigzag from '../../../components/sections/ServiceZigzag.astro';
import ServiceBody from '../../../components/sections/ServiceBody.astro';
import Stats01 from '../../../components/sections/Stats01.astro';
import Stats02 from '../../../components/sections/Stats02.astro';
import Stats03 from '../../../components/sections/Stats03.astro';
import Stats04 from '../../../components/sections/Stats04.astro';
import Stats05 from '../../../components/sections/Stats05.astro';
import Case01 from '../../../components/sections/Case01.astro';
import Case02 from '../../../components/sections/Case02.astro';
import Case03 from '../../../components/sections/Case03.astro';
import CaseList from '../../../components/sections/CaseList.astro';
import CaseProof from '../../../components/sections/CaseProof.astro';
import CaseReel from '../../../components/sections/CaseReel.astro';
import Process01 from '../../../components/sections/Process01.astro';
import Process02 from '../../../components/sections/Process02.astro';
import Process03 from '../../../components/sections/Process03.astro';
import Process04 from '../../../components/sections/Process04.astro';
import Process05 from '../../../components/sections/Process05.astro';
import Timeline01 from '../../../components/sections/Timeline01.astro';
import Timeline02 from '../../../components/sections/Timeline02.astro';
import Reach01 from '../../../components/sections/Reach01.astro';
import Reach02 from '../../../components/sections/Reach02.astro';
import Team01 from '../../../components/sections/Team01.astro';
import Team02 from '../../../components/sections/Team02.astro';
import TeamGrid from '../../../components/sections/TeamGrid.astro';
import TeamRoster from '../../../components/sections/TeamRoster.astro';
import QuoteCollage from '../../../components/sections/QuoteCollage.astro';
import Testimonial01 from '../../../components/sections/Testimonial01.astro';
import Testimonial02 from '../../../components/sections/Testimonial02.astro';
import Blog01 from '../../../components/sections/Blog01.astro';
import Blog02 from '../../../components/sections/Blog02.astro';
import BlogSlider from '../../../components/sections/BlogSlider.astro';
import BlogGrid from '../../../components/sections/BlogGrid.astro';
import Newsletter from '../../../components/sections/Newsletter.astro';
import CareersList from '../../../components/sections/CareersList.astro';
import Faq from '../../../components/sections/Faq.astro';
import ImageBanner from '../../../components/sections/ImageBanner.astro';
import Form01 from '../../../components/sections/Form01.astro';
import CTA from '../../../components/layout/CTA.astro';
import Callout from '../../../components/ui/Callout.astro';
import { milestones } from '../../../data/about';
import { allPosts } from '../../../data/posts';
import { services } from '../../../data/services';

export type Category = 'Hero' | 'Logos' | 'Pillars & Services' | 'Stats' | 'Case Studies' | 'Process & Timeline' | 'Team' | 'Testimonials' | 'Blog' | 'Forms & CTA' | 'Content';

export interface SectionEntry {
  id: string;
  name: string;
  category: Category;
  usedOn: string[];
  component: unknown;
  props?: Record<string, unknown>;
  /** Wrapper classes for blocks that a page places inside its own padded section. */
  wrap?: string;
  /** Approximate desktop height, used to size the preview before it loads. */
  height: number;
}

const featured = allPosts.find((p) => p.featured) ?? allPosts[0];
const service = services[0];

export const sections: SectionEntry[] = [
  { id: 'HERO-01', name: 'Centered photo hero', category: 'Hero', usedOn: ['/'], component: Hero01, height: 900 },
  { id: 'HERO-02', name: 'Left-aligned photo hero with marquee', category: 'Hero', usedOn: ['/home-2'], component: Hero02, height: 900 },
  { id: 'HERO-03', name: 'Inset rounded hero', category: 'Hero', usedOn: ['/home-3'], component: Hero03, height: 904 },
  { id: 'HERO-04', name: 'Centered page hero', category: 'Hero', usedOn: ['/about', '/services', '/case-studies', '/team', '/careers'], component: PageHero, props: { crumb: 'About', title: 'Architecting <br/>Institutional Resiliency', text: 'Clarity was founded to remove bloat in enterprise consulting. We avoid superficial slides and focus on operational integration to help leaders navigate volatility and build executive autonomy.' }, height: 520 },
  { id: 'HERO-05', name: 'Split hero with wide image', category: 'Hero', usedOn: ['/about-2'], component: SplitHero, props: { crumb: 'About', meta: '2019-2026', title: 'Architecting <br/>Institutional Resiliency', text: 'Clarity was founded to eliminate the structural bloat inherent in classic enterprise consulting models.' }, height: 940 },
  { id: 'HERO-06', name: 'Detail hero', category: 'Hero', usedOn: ['/services/[slug]'], component: DetailHero, props: { parent: { label: 'Services', href: '/services' }, crumb: service.title, title: service.title, text: service.text, cover: service.cover }, height: 800 },
  { id: 'HERO-07', name: 'Case study hero with metric', category: 'Hero', usedOn: ['/case-studies/[slug]'], component: CaseHero, props: { area: 'Network Logistics', title: 'Saving a multinational distribution system.', metric: '18.2%', metricLabel: 'EBITDA optimization', cover: '/images/lib/glass-prism.webp', meta: [{ label: 'Client Organization', value: 'Global Logistics Corp' }, { label: 'Deployed Practice Area', value: 'Operations & HR Advisory' }, { label: 'Transformation Frame', value: '180 Days' }] }, height: 900 },
  { id: 'HERO-08', name: 'Featured post hero', category: 'Hero', usedOn: ['/insights'], component: FeaturedPostHero, props: { post: featured }, height: 700 },
  { id: 'HERO-09', name: 'Article hero', category: 'Hero', usedOn: ['/insights/[slug]'], component: PostHero, props: { category: featured.category, title: featured.title, dek: featured.dek, author: featured.author, date: featured.longDate, readTime: featured.readTime, cover: featured.cover }, height: 900 },
  { id: 'HERO-10', name: 'Contact hero with form', category: 'Hero', usedOn: ['/contact', '/contact-2'], component: ContactHero, height: 1100 },
  { id: 'HERO-12', name: 'Simple title hero', category: 'Hero', usedOn: ['/404', '/password', '/template/*'], component: SimpleHero, props: { title: 'Style Guide', text: 'Control the website’s style from our guide.' }, height: 400 },
  { id: 'LOGO-02', name: 'Client logo grid', category: 'Logos', usedOn: ['/home-3'], component: LogoGrid, height: 660 },
  { id: 'PILLAR-01', name: 'Dark accordion with image stack', category: 'Pillars & Services', usedOn: ['/'], component: Pillar01, height: 1035 },
  { id: 'PILLAR-02', name: 'Icon grid card with portrait', category: 'Pillars & Services', usedOn: ['/home-2'], component: Pillar02, height: 920 },
  { id: 'PILLAR-03', name: 'Pillar cards with bullet lists', category: 'Pillars & Services', usedOn: ['/home-3'], component: Pillar03, height: 1340 },
  { id: 'PRINCIPLE-01', name: 'Principles accordion', category: 'Pillars & Services', usedOn: ['/about'], component: Principle01, height: 820 },
  { id: 'PRINCIPLE-02', name: 'Principles vertical tabs', category: 'Pillars & Services', usedOn: ['/about-2'], component: Principle02, height: 960 },
  { id: 'SERVICE-01', name: 'Stacked service cards', category: 'Pillars & Services', usedOn: ['/services'], component: ServiceList, height: 1300 },
  { id: 'SERVICE-02', name: 'Zig-zag services', category: 'Pillars & Services', usedOn: ['/services-2'], component: ServiceZigzag, wrap: 'bg-white px-4 py-12 md:px-10 lg:px-[max(40px,calc((100%-1132px)/2))] lg:py-[120px]', height: 2400 },
  { id: 'SERVICE-03', name: 'Service detail body', category: 'Pillars & Services', usedOn: ['/services/[slug]'], component: ServiceBody, props: { blocks: service.blocks, card: service.card, image: service.cover }, height: 760 },
  { id: 'STATS-01', name: 'Dark stats rows', category: 'Stats', usedOn: ['/'], component: Stats01, height: 585 },
  { id: 'STATS-02', name: 'Grey stat cards', category: 'Stats', usedOn: ['/home-2'], component: Stats02, wrap: 'bg-white px-4 py-12 md:px-10 lg:px-[max(40px,calc((100%-1200px)/2))] lg:py-24', height: 380 },
  { id: 'STATS-03', name: 'Centered stats with dividers', category: 'Stats', usedOn: ['/home-3'], component: Stats03, wrap: 'bg-white px-4 py-12 md:px-10 md:py-20', height: 320 },
  { id: 'STATS-04', name: 'Range benchmarks', category: 'Stats', usedOn: ['/services/[slug]'], component: Stats04, height: 560 },
  { id: 'STATS-05', name: 'Portfolio metrics', category: 'Stats', usedOn: ['/case-studies'], component: Stats05, height: 560 },
  { id: 'CASE-01', name: 'Dark coverflow carousel', category: 'Case Studies', usedOn: ['/'], component: Case01, height: 1130 },
  { id: 'CASE-02', name: 'Metric card grid', category: 'Case Studies', usedOn: ['/home-2'], component: Case02, height: 1076 },
  { id: 'CASE-03', name: 'Testimonial case slider', category: 'Case Studies', usedOn: ['/home-3'], component: Case03, wrap: 'bg-white px-4 py-12 md:px-10 md:py-20', height: 830 },
  { id: 'CASE-04', name: 'Filterable case rows', category: 'Case Studies', usedOn: ['/case-studies'], component: CaseList, height: 1900 },
  { id: 'CASE-05', name: 'Proof of execution cards', category: 'Case Studies', usedOn: ['/services/[slug]'], component: CaseProof, height: 720 },
  { id: 'CASE-06', name: 'Case portrait reel', category: 'Case Studies', usedOn: ['/home-2'], component: CaseReel, height: 590 },
  { id: 'PROCESS-01', name: 'Expanding process columns', category: 'Process & Timeline', usedOn: ['/'], component: Process01, height: 680 },
  { id: 'PROCESS-02', name: 'Auto-advancing process accordion', category: 'Process & Timeline', usedOn: ['/home-2'], component: Process02, height: 820 },
  { id: 'PROCESS-03', name: 'Scroll-spy process cards', category: 'Process & Timeline', usedOn: ['/home-3'], component: Process03, height: 1820 },
  { id: 'PROCESS-04', name: 'Expanding method tabs', category: 'Process & Timeline', usedOn: ['/services'], component: Process04, height: 700 },
  { id: 'PROCESS-05', name: 'Method step grid', category: 'Process & Timeline', usedOn: ['/services-2'], component: Process05, wrap: 'bg-white px-4 py-12 md:px-10 lg:px-[max(40px,calc((100%-1132px)/2))] lg:py-[92px]', height: 920 },
  { id: 'TIMELINE-01', name: 'Milestone timeline', category: 'Process & Timeline', usedOn: ['/about'], component: Timeline01, height: 620 },
  { id: 'TIMELINE-02', name: 'Ruler timeline', category: 'Process & Timeline', usedOn: ['/about-2'], component: Timeline02, props: { items: [milestones[0], { ...milestones[1], title: 'Fractional C-Suite Disruption' }, { ...milestones[2], title: 'Algorithmic Diagnostic Rollout' }] }, height: 670 },
  { id: 'REACH-01', name: 'Tile arc with stats', category: 'Process & Timeline', usedOn: ['/about'], component: Reach01, height: 688 },
  { id: 'REACH-02', name: 'Office map', category: 'Process & Timeline', usedOn: ['/about-2'], component: Reach02, height: 743 },
  { id: 'TEAM-01', name: 'Portrait slider', category: 'Team', usedOn: ['/'], component: Team01, height: 1040 },
  { id: 'TEAM-02', name: 'Portrait cards on gradient', category: 'Team', usedOn: ['/home-2'], component: Team02, wrap: 'bg-white px-4 py-12 md:px-10 lg:px-[max(40px,calc((100%-1200px)/2))] lg:py-24', height: 820 },
  { id: 'TEAM-02b', name: 'Portrait cards with CTA', category: 'Team', usedOn: ['/home-3'], component: TeamGrid, height: 850 },
  { id: 'TEAM-03', name: 'Full roster', category: 'Team', usedOn: ['/team'], component: TeamRoster, height: 1000 },
  { id: 'QUOTE-01', name: 'Statement quote with collage', category: 'Testimonials', usedOn: ['/team'], component: QuoteCollage, height: 590 },
  { id: 'TESTI-01', name: 'Split testimonial slider', category: 'Testimonials', usedOn: ['/'], component: Testimonial01, height: 670 },
  { id: 'TESTI-02', name: 'Centered testimonial slider', category: 'Testimonials', usedOn: ['/home-3'], component: Testimonial02, height: 680 },
  { id: 'BLOG-01', name: 'Latest briefings', category: 'Blog', usedOn: ['/', '/insights/[slug]'], component: Blog01, height: 850 },
  { id: 'BLOG-01b', name: 'Briefings with divided header', category: 'Blog', usedOn: ['/home-2'], component: Blog02, height: 905 },
  { id: 'BLOG-02', name: 'Briefing slider', category: 'Blog', usedOn: ['/home-3'], component: BlogSlider, height: 975 },
  { id: 'BLOG-03', name: 'Filterable blog grid', category: 'Blog', usedOn: ['/insights'], component: BlogGrid, height: 2250 },
  { id: 'NEWSLETTER-01', name: 'Newsletter signup', category: 'Forms & CTA', usedOn: ['/insights'], component: Newsletter, height: 584 },
  { id: 'FORM-01', name: 'Demo form (light)', category: 'Forms & CTA', usedOn: ['/', '/home-3'], component: Form01, height: 838 },
  { id: 'FORM-02', name: 'Demo form (photo)', category: 'Forms & CTA', usedOn: ['/home-2'], component: Form01, props: { variant: 'dark', width: 1200, class: 'px-4 py-12 md:px-10 md:py-20 lg:px-[max(40px,calc((100%-1200px)/2))]' }, height: 814 },
  { id: 'CTA-01', name: 'Closing call to action', category: 'Forms & CTA', usedOn: ['Most inner pages'], component: CTA, props: { title: 'Accelerate Your Operational Evolution', cta: 'Schedule an Initiative Mapping Call' }, height: 580 },
  { id: 'CALLOUT-01', name: 'Callout box', category: 'Forms & CTA', usedOn: ['/contact', '/team'], component: Callout, props: { eyebrow: '24/7 Crisis Support', title: 'Get direct executive assistance <br/>when the situation cannot wait.' }, height: 290 },
  { id: 'BANNER-01', name: 'Photo banner', category: 'Content', usedOn: ['/services', '/services-2'], component: ImageBanner, height: 720 },
  { id: 'FAQ-01', name: 'FAQ accordion', category: 'Content', usedOn: ['/services/[slug]'], component: Faq, height: 560 },
  { id: 'CAREERS-01', name: 'Filterable roles', category: 'Content', usedOn: ['/careers'], component: CareersList, height: 1000 },
];

export const categories = [...new Set(sections.map((s) => s.category))];
