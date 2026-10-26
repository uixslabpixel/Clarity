export const categories = ['Corporate Governance Hub', 'Strategy Hub', 'Operations', 'Capital Trends', 'Executive Pay'];

export interface Post {
  slug: string;
  title: string;
  category: string;
  date: string;
  author: string;
  excerpt: string;
  featured?: boolean;
}

export const allPosts: Post[] = [
  { slug: 'impact-of-new-corporate-laws', title: 'Impact of new corporate laws', category: 'Corporate Governance Hub', date: '18/06/26', author: 'Arthur Sterling', excerpt: 'An executive overview mapping the incoming 2026 regulatory shifts and their immediate mathematical effects on corporate equity valuations across global jurisdictions.', featured: true },
  { slug: 'integrating-ai-into-fiduciary-oversight', title: 'Integrating AI into fiduciary oversight', category: 'Corporate Governance Hub', date: '18/06/26', author: 'Eleanor Vance', excerpt: 'Examining the legal and operational ramifications of deploying machine learning models in executive workflows...' },
  { slug: 'handling-sudden-changes', title: 'Handling sudden changes', category: 'Strategy Hub', date: '04/05/26', author: 'Helena Rousseau', excerpt: 'A tactical framework for boards to stabilize operations during unexpected leadership gaps.' },
  { slug: 'strengthening-supply-chains', title: 'Strengthening supply chains', category: 'Operations', date: '22/04/26', author: 'Marcus Reed', excerpt: 'Analyzing structural bottlenecks and implementing automated risk mitigation protocols.' },
  { slug: 'restructuring-legacy-debt-structures', title: 'Restructuring legacy debt structures', category: 'Capital Trends', date: '11/03/26', author: 'Arthur Sterling', excerpt: 'Modernizing corporate capital models to retain agility and protect enterprise valuations.' },
  { slug: 'performance-linked-equity-architectures', title: 'Performance-linked equity architectures', category: 'Executive Pay', date: '28/02/26', author: 'Victoria Chen', excerpt: 'Structuring fractional executive compensation models that align long-term incentives.' },
  { slug: 'regulatory-compliance-in-autonomous-tech', title: 'Regulatory compliance in autonomous tech', category: 'Corporate Governance Hub', date: '15/01/26', author: 'Jonathan Kane', excerpt: 'Safeguarding institutional liability while scaling next-generation software platforms.' },
  { slug: 'ai-joins-the-boardroom-table', title: 'AI joins the boardroom table', category: 'Corporate Governance Hub', date: '03/07/26', author: 'Naia Pradipta', excerpt: 'Examining the legal and operational ramifications of deploying machine learning models in executive decision-making pipelines.' },
  { slug: 'navigating-sudden-c-suite-transitions', title: 'Navigating sudden C-suite transitions', category: 'Strategy Hub', date: '04/05/26', author: 'Helena Rousseau', excerpt: 'A tactical framework for boards to stabilize operations and deploy interim leadership assets.' },
  { slug: 'fortifying-cross-border-supply-chains', title: 'Fortifying cross-border supply chains', category: 'Operations', date: '22/04/26', author: 'Marcus Reed', excerpt: 'Analyzing structural bottlenecks and implementing automated risk mitigation protocols.' },
];
