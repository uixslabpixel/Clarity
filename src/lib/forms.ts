/**
 * Form wiring. With no `formEndpoint` in Site Settings, forms are detected by
 * Netlify Forms at deploy time (data-netlify). Otherwise they POST to the
 * configured endpoint (Formspree, Basin, a serverless function, …).
 * Submission is progressively enhanced in scripts/forms.ts.
 */
import { site } from '../data/site';

export function formAttrs(name: string) {
  const endpoint = site.formEndpoint?.trim();
  return endpoint
    ? { name, method: 'post', action: endpoint, 'data-form': name }
    : { name, method: 'post', action: '/thank-you/', 'data-form': name, 'data-netlify': 'true', 'netlify-honeypot': 'company-website' };
}
