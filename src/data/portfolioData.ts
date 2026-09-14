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
  leadName: 'Mateo Sanchez',
  leadRole: 'Design Director & Lead Architect',
  location: 'Remote · London / San Francisco / Zurich',
  email: 'pinnacledigital701@gmail.com',
  availability: 'Available for Q2/Q3 Projects',
};

// IMPORTANT CONSTRAINT: EXACTLY TWO PROJECTS. Readily editable and configurable.
export const PROJECTS: Project[] = [
  {
    number: '01',
    title: 'Bjorbun Burgers Restaurant',
    category: 'Brand Identity · Digital Commerce · 3D Experience',
    description:
      'We transformed Bjorbun Burgers into a modern luxury skincare brand with refined visuals, sustainable packaging, and a conversion-focused eCommerce experience designed for growth.',
    image: '/bjorbun image.png',
    link: 'https://bjorbuneats.vercel.app/',
    tags: ['Next.js', 'Tailwind CSS', 'Shopify Plus', 'WebGL Interactive'],
    client: 'Bjorbun Burgers',
    year: '2026',
    deliverables: ['E-Commerce Architecture', 'Design System', '3D Packaging Mockups', '+140% Conversion Uplift'],
  },
  {
    number: '02',
    title: 'Tondo Pizza Restaurant',
    category: 'UI/UX System · Web Platform · Mobile App',
    description:
      'Engineered an end-to-end diagnostic telemetry platform combining intuitive data visualization with clinical-grade workflows, helping clinicians reduce diagnostic friction by 42%.',
    image: '/tondo pizza image.png',
    link: 'https://tondopizza.vercel.app/',
    tags: ['React & TypeScript', 'Telemetry Engine', 'Design System', 'WCAG AA Compliant'],
    client: 'Tondo Pizza',
    year: '2026',
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
    price: '$799',
    period: '',
    description: 'Perfect for startups and emerging brands needing consistent, high-velocity product design support and structured visual direction.',
    features: [
      'Custom Website / Landing Page',
      'Up to 5 Pages',
      'Custom UI Design',
      'Mobile, Tablet & Desktop Responsive',
      'Basic Animations & Interactions',
      'Contact / Inquiry Form',
      'Basic SEO & Performance Setup',
    ],
    highlighted: false,
    ctaText: 'Get In Touch',
  },
  {
    id: 'growth',
    name: 'Growth Studio',
    price: '$1599',
    period: '',
    description: 'Built for growing businesses ready to elevate their online presence with a more strategic, immersive website designed to support stronger engagement and business growth.',
    features: [
      'Everything in Starter Sprint',
      'Up to 10 Pages',
      'Free Logo Creation & And Brand Identity',
      'Advanced UI/UX Design',
      'Advanced Animations & Interactions',
      'CMS for Website Content',
      'Analytics & Advanced Forms',
      '30 Days Post-Launch Support',
    ],
    highlighted: true,
    badge: 'Popular Engagement',
    ctaText: 'Reserve Your Slot',
  },
  {
    id: 'premier',
    name: 'Pinnacle Experience',
    price: '$3200',
    period: '',
    description: 'Designed for ambitious brands that need a fully custom digital experience, combining strategic thinking, advanced functionality, and distinctive design built around their business goals.',
    features: [
      'Everything in Growth Studio',
      'Fully Custom Website Architecture',
      'Advanced CMS & Admin Dashboard',
      'Custom Features & Business Workflows',
      'Third-Party API / Service Integrations',
      'Advanced SEO, Performance & Accessibility',
      '60 Days Post-Launch Support',
    ],
    highlighted: false,
    ctaText: 'Get In Touch',
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
