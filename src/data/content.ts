/**
 * Section copy. Team, briefings and testimonials come from Keystatic
 * collections; the remaining arrays are template copy edited in code.
 */
import { getCollection } from 'astro:content';
import { allPosts } from './posts';

export const clients = ['Veeta', 'Owlearn', 'Deepstack', 'Wellnex', 'Botanic', 'Sonance', 'Vexum'];

export const pillars = [
  {
    title: 'Agent Canvas',
    short: 'Agent Canvas',
    icon: 'split',
    text: 'Deconstruct structural legacy gaps, modernise corporate governance models, and plot asset-protecting market positions.',
    summary: 'Deconstruct legacy gaps, modernise governance, and secure market positions.',
    bullets: [
      'Identify and eliminate structural vulnerabilities in older systems.',
      'Update governance models to modern standards.',
      'Visualise architectures to plot asset protection.',
      'Identify bottlenecks to create secure, strong strategies.',
    ],
  },
  {
    title: 'Fractional Executive Leadership',
    short: 'Part-time Lead',
    card: 'Fractional Leadership',
    icon: 'user',
    text: 'Immediate deployment of veteran, board-vetted CxO assets to stabilize transitions and lead critical pivots.',
    summary: 'Deploy veteran CxO assets to stabilize transitions and lead pivots.',
    bullets: [
      'Rapidly onboard veteran, board-vetted CxO assets during critical transitions.',
      'Provide decisive leadership and direction during complex operational shifts.',
      'Gain seamless access to top-tier strategic management on a flexible basis.',
      'Ensure expert executive guidance without the overhead of full-time hiring.',
    ],
  },
  {
    title: 'Operations & HR Advisory',
    short: 'Ops & HR Advisory',
    icon: 'network',
    text: 'Rigorous workflow automation alignment, localized supply chain fortification, and workforce restructuring.',
    summary: 'Workflow automation, supply chain strengthening, and workforce restructuring.',
    bullets: [
      'Drive rigorous alignment and optimization of automated internal workflows.',
      'Secure and localize supply structures against disruptions.',
      'Use targeted strategies to maximize workforce capability.',
      'Eliminate redundancies and improve collaboration across departments.',
    ],
  },
  {
    title: 'Corporate Training & Capability Building',
    short: 'Corporate Training',
    icon: 'users',
    text: 'Bespoke elite corporate coaching pipelines built to transfer sophisticated management methods to leadership teams.',
    summary: 'Elite coaching transfers advanced management methods.',
    bullets: [
      'Deliver elite, customized training pipelines tailored to organizational needs.',
      'Apply advanced management methods to leadership teams.',
      'Eliminate operational and strategic knowledge gaps within the workforce.',
      'Build long-term independence by continually upgrading future leaders.',
    ],
  },
];

export const stats = [
  { value: '34%', label: 'Average operational efficiency gain across client portfolio organizations.' },
  { value: '$420M+', label: 'Aggregate corporate capital optimized and overhead expenses trimmed.' },
  { value: '2.4x', label: 'Accelerated deployment speed for enterprise-wide technology and governance pivots.' },
];

export const caseHighlights = [
  { value: '89%', label: 'Retention rate of critical supply chain assets during sudden macroeconomic market disruptions.', client: 'Owlearn' },
  { value: '2.5×', label: 'Faster transition turnaround secured by deploying Fractional Executive Leadership.', client: 'Wellnex' },
  {
    value: '34%',
    label: 'Average operational efficiency gain across client portfolio organizations.',
    client: 'Veeta',
    title: 'Saving a multinational distribution system from failure.',
    text: 'Ensuring stability of a multinational distribution system by implementing strategies to prevent failures and maintain supply chain performance.',
    href: '/case-studies/saving-a-multinational-distribution-system',
  },
  { value: '34%', label: 'Average operational efficiency gain across client portfolio organizations.', client: 'Botanic' },
  { value: '42%', label: 'Average reduction in operational friction across automated enterprise workflows.', client: 'Deepstack' },
];

export const process = [
  { title: 'Diagnostic Assessment', text: 'Blind data collection, legacy systemic audit, and boardroom threat-vector mapping.' },
  { title: 'Blueprint Engineering', text: 'Constructing mathematical, milestone-locked operational blueprints tailored to current fiscal demands.' },
  { title: 'Operational Integration', text: 'Direct, hands-on co-execution of restructuring initiatives alongside internal key management assets.' },
  { title: 'Governance Auditing', text: 'Implementation of continuous automated auditing layers to lock in operational efficiency loops permanently.' },
];

export const team = (await getCollection('team')).sort((a, b) => a.data.order - b.data.order).map(({ id, data }) => ({ ...data, slug: id }));

/** Latest three briefings (the featured one is reserved for the Insights hero). */
export const posts = allPosts.filter((p) => !p.featured).slice(0, 3);

export const testimonials = (await getCollection('testimonials')).map(({ data }) => data);

export const frictionPoints = [
  'Supply chain fragility',
  'Leadership transition',
  'Regulatory exposure',
  'Workflow automation',
  'Capital reallocation',
];
