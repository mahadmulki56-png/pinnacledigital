import { Project, Service, PricingPlan, Testimonial, FaqItem, InsightArticle, NavLinkItem } from '../types.ts';

export const NAV_LINKS: NavLinkItem[] = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Works', href: '#work' },
  { name: 'Pricing', href: '#pricing' },
];

export const AGENCY_INFO = {
  name: 'Pinnacle Digital',
  tagline: 'Remote Web Design & Web Development',
  leadName: 'Arion Vance',
  leadRole: 'Design Director & Lead Architect',
  location: 'Remote · London / San Francisco / Zurich',
  email: 'hello@pinnacledigital.com',
  availability: 'Available for Q2/Q3 Projects',
};

// IMPORTANT CONSTRAINT: EXACTLY TWO PROJECTS. Readily editable and configurable.
export const PROJECTS: Project[] = [
  {
    number: '01',
    title: 'Lumora Beauty Rebrand',
    category: 'Brand Identity · Digital Commerce · 3D Experience',
    description:
      'We transformed Lumora into a modern luxury skincare brand with refined visuals, sustainable packaging, and a conversion-focused eCommerce experience designed for growth.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1400&q=85',
    link: '#',
    tags: ['Next.js', 'Tailwind CSS', 'Shopify Plus', 'WebGL Interactive'],
    client: 'Lumora Skincare UK',
    year: '2025',
    deliverables: ['E-Commerce Architecture', 'Design System', '3D Packaging Mockups', '+140% Conversion Uplift'],
  },
  {
    number: '02',
    title: 'Aura Health & Diagnostics',
    category: 'UI/UX System · Clinical Web Platform · Mobile App',
    description:
      'Engineered an end-to-end diagnostic telemetry platform combining intuitive data visualization with clinical-grade workflows, helping clinicians reduce diagnostic friction by 42%.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=85',
    link: '#',
    tags: ['React & TypeScript', 'Telemetry Engine', 'Design System', 'WCAG AA Compliant'],
    client: 'Aura Diagnostics AG',
    year: '2025',
    deliverables: ['Complex Dashboard UI', 'Real-Time Telemetry', 'Clinical UX Research', 'Micro-Interactions'],
  },
];

export const SERVICES: Service[] = [
  {
    number: '01',
    title: 'Web Design',
    shortDescription: 'We create bespoke websites that captivate audiences, elevate brand equity, and convert visitors into loyal clients.',
    tags: ['Custom Art Direction', 'Editorial Grids', 'Responsive Layouts', 'Micro-Interactions'],
  },
  {
    number: '02',
    title: 'UI/UX Design',
    shortDescription: 'User-centered interfaces backed by behavioural research, structured design systems, and friction-free ergonomics.',
    tags: ['Figma Systems', 'User Journey Mapping', 'Interactive Prototyping', 'Usability Audits'],
  },
  {
    number: '03',
    title: 'Frontend Development',
    shortDescription: 'Fluid, lightning-fast web applications built on modern frameworks with accessible semantic markup and silky motion.',
    tags: ['React 19 & Next.js', 'TypeScript', 'Tailwind CSS', 'Accessible WCAG 2.1'],
  },
  {
    number: '04',
    title: 'Full-Stack Development',
    shortDescription: 'Robust serverless backends, secure REST/GraphQL APIs, headless CMS integrations, and continuous cloud deployment.',
    tags: ['Node.js & Edge APIs', 'Headless CMS', 'PostgreSQL & Firestore', 'Performance Optimization'],
  },
  {
    number: '05',
    title: 'Brand Identity',
    shortDescription: 'Strategic visual identities built for longevity—comprehensive typographic hierarchies, color logic, and digital guidelines.',
    tags: ['Logo Systems', 'Type Direction', 'Brand Strategy', 'Asset Toolkits'],
  },
  {
    number: '06',
    title: 'Digital Experiences',
    shortDescription: 'Immersive creative campaigns, interactive 3D elements, and high-impact editorial storytelling that sets industry benchmarks.',
    tags: ['Creative Direction', 'WebGL Canvas', 'Motion Systems', 'Campaign Launches'],
    highlight: true,
  },
];

export const CAPABILITY_METRICS = {
  yearsCrafting: '5+',
  partnerships: '20+',
  satisfactionScore: '120+',
  averageRating: '4.8',
  deliverablesCount: '150+',
  skills: ['Interface Design', 'Product Strategy', 'Clean Architecture', 'Brand Identity', 'Next.js & TypeScript', 'Motion Graphics'],
};

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter Sprint',
    price: '$1,800',
    period: '/Sprint',
    description: 'Perfect for startups and emerging brands needing consistent, high-velocity product design support and structured visual direction.',
    features: [
      'Full Website or Landing Page Design',
      'Core UI System & Typography Hierarchy',
      'Mobile-First Responsive Layouts',
      'Monthly Strategy Sync & Roadmap',
      'Two Revision Rounds per Deliverable',
      'Direct Private Slack Channel Communication',
    ],
    highlighted: false,
    ctaText: 'Get In Touch',
  },
  {
    id: 'growth',
    name: 'Growth Partner',
    price: '$3,200',
    period: '/Month',
    description: 'For scaling brands seeking advanced UX thinking, rapid engineering, conversion optimization, and continuous agile delivery.',
    features: [
      'Full Website & Web Application Engineering',
      'End-to-End UX Research & Wireframing',
      'High-Conversion Sales Funnel Optimization',
      'Custom Design System & Component Library',
      'Analytics Review & Actionable Insights',
      'Priority Design & Engineering Support',
      'Unlimited Requests (One active at a time)',
    ],
    highlighted: true,
    badge: 'Popular Engagement',
    ctaText: 'Reserve Your Slot',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    number: '01',
    quote:
      'Digital collaboration felt structured and seamless from start to finish. Every design decision was thoughtful, strategic, and clearly aligned with our product goals.',
    author: 'Amelia Hart',
    role: 'Head of Product',
    company: 'Nova Labs',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=85',
    stats: '+142% Signup Conversion',
  },
  {
    id: '2',
    number: '02',
    quote:
      'Pinnacle Digital brought a level of technical depth and aesthetic restraint that is rare to find. Our rebrand transformed how enterprise clients perceive our value.',
    author: 'Marcus Lindqvist',
    role: 'Co-Founder & CEO',
    company: 'Kinetix Software',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85',
    stats: '$4.2M Series A Closed',
  },
  {
    id: '3',
    number: '03',
    quote:
      'Fast, methodical, and profoundly creative. Working asynchronously across time zones was frictionless, and the frontend code delivered was pristine.',
    author: 'Elena Rostova',
    role: 'VP Design & Brand',
    company: 'Starlight Media',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=1000&q=85',
    stats: 'Awarded Site of the Day',
  },
];

export const FAQS: FaqItem[] = [
  {
    id: 'process',
    question: 'How does the collaboration process work?',
    answer:
      'We work in focused, transparent weekly sprints. After an initial onboarding discovery session, we define a clear roadmap with milestones. You receive regular interactive Figma prototypes and live staging previews with asynchronous Loom walk-throughs and a dedicated Slack channel.',
  },
  {
    id: 'timeline',
    question: 'How long does a typical website take?',
    answer:
      'Most boutique and high-end agency websites take between two to six weeks depending on scope, research depth, 3D/animation needs, and revision rounds. Clear timelines and sprint deliverables are shared before kickoff.',
  },
  {
    id: 'international',
    question: 'Do you work with international clients across timezones?',
    answer:
      'Yes, 100% of our engagements are remote. We collaborate smoothly with clients across North America, the UK, Europe, and Asia-Pacific using asynchronous communication, recorded walk-throughs, and flexible call scheduling.',
  },
  {
    id: 'prerequisites',
    question: 'What do you need from me to get started?',
    answer:
      'A clear understanding of your core goals, target audience, and any existing brand guidelines or content. If you do not have copy or visual guidelines yet, we can guide you through our brand strategy discovery workshop.',
  },
  {
    id: 'redesign',
    question: 'Can you redesign or refactor an existing website?',
    answer:
      'Absolutely. We frequently audit and re-architect existing platforms to modernize their aesthetics, improve core web vitals, enhance mobile responsiveness, and increase user conversions.',
  },
  {
    id: 'cost',
    question: 'How much does a custom website cost?',
    answer:
      'Our engagements start from $1,800 for focused custom sprints and websites, while full-scale digital experiences and ongoing monthly partnerships typically range between $3,200 to $7,500 depending on complexity.',
  },
];

export const INSIGHTS: InsightArticle[] = [
  {
    id: '1',
    title: 'Design Principles for High-Converting Digital Brands',
    category: 'Design Systems',
    badge: 'Featured',
    readTime: '4 min read',
    date: 'March 2026',
    image: 'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?auto=format&fit=crop&w=800&q=85',
  },
  {
    id: '2',
    title: 'Ergonomic UX: Turning Complex Data into Natural Workflows',
    category: 'User Experience',
    badge: 'Trending',
    readTime: '6 min read',
    date: 'February 2026',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=85',
  },
  {
    id: '3',
    title: 'Why Editorial Restraint Outperforms Visual Noise in 2026',
    category: 'Brand Strategy',
    badge: 'New',
    readTime: '5 min read',
    date: 'January 2026',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=85',
  },
];
