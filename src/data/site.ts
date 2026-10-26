/** Global settings, edited in Keystatic under "Site Settings". */
import settings from '../content/settings.json';

export const site = settings;

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
