/** Services, read from the Keystatic-managed `services` collection. */
import { getCollection } from 'astro:content';

export const services = (await getCollection('services'))
  .sort((a, b) => a.data.order - b.data.order)
  .map(({ id, data }) => ({ ...data, slug: id, text: data.summary }));

export const methodSteps = [
  { label: 'Step 01', title: 'Raw Diagnostic Inputs', text: 'Ingesting and auditing raw governance data and operational signals to eliminate baseline structural blindness.', icon: 'split' },
  { label: 'Step 02', title: 'Optimization', text: 'Applying algorithmic modeling to restructure legacy workflows and maximize corporate asset protection.', icon: 'chart' },
  { label: 'Step 03', title: 'Efficiency Layer', text: 'Executing frictionless, automated governance protocols to stabilize transitions and drive long-term yield.', icon: 'shield' },
];
