export interface MinimalService {
  id: string;
  number: string;
  title: string;
  description: string;
  deliverables: string[];
}

export interface MinimalCategory {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  tags: string[];
}

export const MINIMAL_SERVICES: MinimalService[] = [
  {
    id: 'influencer-marketing',
    number: '01',
    title: 'Influencer Marketing',
    description: 'Data-informed creator selection, verified audience demographics, and high-conversion endorsements across global markets.',
    deliverables: ['Demographic Audience Audits', 'Creator Vetting & Contracting', 'Multi-Platform Placement', 'Performance Tracking']
  },
  {
    id: 'ugc-content',
    number: '02',
    title: 'UGC Content',
    description: 'High-performing, authentic creator video tailored specifically for Meta, TikTok Spark Ads, and paid social performance.',
    deliverables: ['Direct-Response Hooks', 'Native 9:16 Video Production', 'A/B Creative Variations', 'Full Commercial Ad Rights']
  },
  {
    id: 'creator-partnerships',
    number: '03',
    title: 'Creator Partnerships',
    description: 'Enduring ambassador programs and multi-month collaborations that build genuine brand affinity and repeated advocacy.',
    deliverables: ['Long-Term Ambassador Contracts', 'Episodic Storytelling', 'Co-Branded Activations', 'Recurring Brand Integration']
  },
  {
    id: 'campaign-management',
    number: '04',
    title: 'Campaign Management',
    description: 'Complete operational execution from initial brief to contract negotiation, draft review, FTC compliance, and attribution.',
    deliverables: ['Dedicated Account Lead', 'Pre-Approval Workflow', 'FTC / Legal Compliance', 'Post-Campaign Reporting']
  }
];

export const MINIMAL_CATEGORIES: MinimalCategory[] = [
  {
    id: 'technology',
    name: 'Technology',
    subtitle: 'Consumer tech, audio, hardware & apps',
    image: '/src/assets/images/stryven_tech_concept_1792252181449.jpg',
    tags: ['Audio & Studio', 'Smart Hardware', 'Digital Platforms']
  },
  {
    id: 'beauty',
    name: 'Beauty',
    subtitle: 'Skincare, dermatological care & cosmetics',
    image: '/src/assets/images/stryven_beauty_concept_1792252182070.jpg',
    tags: ['Active Ingredients', 'Clinical Efficacy', 'Sensory Texture']
  },
  {
    id: 'fashion',
    name: 'Fashion',
    subtitle: 'Apparel, tailoring, footwear & accessories',
    image: '/src/assets/images/stryven_fashion_concept_1792252182149.jpg',
    tags: ['Capsule Wardrobes', 'Luxury Craft', 'Everyday Carry']
  },
  {
    id: 'food',
    name: 'Food & Beverage',
    subtitle: 'Specialty coffee, functional drinks & culinary',
    image: '/src/assets/images/stryven_hero_editorial_1792252180612.jpg',
    tags: ['Artisanal Roasts', 'Clean Nutrition', 'Tablescape Rituals']
  },
  {
    id: 'lifestyle',
    name: 'Lifestyle',
    subtitle: 'Interior design, modern home & living spaces',
    image: '/src/assets/images/stryven_hero_editorial_1792252180612.jpg',
    tags: ['Interior Objects', 'Home Rituals', 'Modern Architecture']
  },
  {
    id: 'more',
    name: 'and More',
    subtitle: 'Fitness, hospitality, wellness & digital services',
    image: '/src/assets/images/stryven_tech_concept_1792252181449.jpg',
    tags: ['Athletic Performance', 'Boutique Travel', 'Subscription Apps']
  }
];
