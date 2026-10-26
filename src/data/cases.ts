/** Case studies, read from the Keystatic-managed `caseStudies` collection. */
import { getCollection } from 'astro:content';

export const industries = ['Global Operations', 'Finance', 'High Tech Systems', 'Manufacturing', 'Logistics'];

export const caseStudies = (await getCollection('caseStudies'))
  .sort((a, b) => a.data.order - b.data.order)
  .map(({ id, data }) => ({ ...data, slug: id }));

export const portfolioStats = [
  { value: '$1.8B+', unit: '', label: 'Capital optimized and redirected into growth channels across operations.' },
  { value: '14,200+', unit: 'hours', label: 'Executive management capacity regained via automation and workflow changes.' },
];
