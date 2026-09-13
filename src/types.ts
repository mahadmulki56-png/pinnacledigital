export interface Project {
  number: string;
  title: string;
  category: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
  deliverables?: string[];
  client?: string;
  year?: string;
}

export interface Service {
  number: string;
  title: string;
  shortDescription: string;
  tags: string[];
  features?: string[];
  highlight?: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted: boolean;
  ctaText: string;
  badge?: string;
}

export interface Testimonial {
  id: string;
  number: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  image: string;
  stats?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface InsightArticle {
  id: string;
  title: string;
  category: string;
  badge: string;
  readTime: string;
  date: string;
  image: string;
}

export interface NavLinkItem {
  name: string;
  href: string;
}
