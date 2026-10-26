export const site = {
  name: 'Clarity',
  tagline: 'Operational governance and fractional leadership for high-stakes enterprise transitions.',
  owner: 'Slabpixel',
  email: 'hello@clarity.com',
  talentEmail: 'talent@clarity.com',
  legalEmail: 'legal@clarity.com',
  linkedin: 'https://www.linkedin.com',
  x: 'https://x.com',
  announcement: { text: 'The Clarity Agent is live', cta: 'Read now', href: '/insights/ai-joins-the-boardroom-table' },
};

export const nav = [
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Team', href: '/team' },
  { label: 'Insights', href: '/insights' },
];

export const footerColumns = [
  { title: 'Overview', links: nav },
  {
    title: 'Contact',
    links: [
      { label: 'Email', href: `mailto:${site.email}` },
      { label: 'LinkedIn', href: site.linkedin },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms and Conditions', href: '/legal/terms' },
      { label: 'Privacy Policy', href: '/legal/privacy' },
    ],
  },
];

export const legalLinks = [
  { label: 'Privacy Policy', href: '/legal/privacy' },
  { label: 'Cookie Policy', href: '/legal/cookies' },
];
