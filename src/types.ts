export type DealStage =
  | 'New Inquiry'
  | 'Contacted'
  | 'Qualified Lead'
  | 'Proposal Sent'
  | 'Negotiation'
  | 'Deal Won'
  | 'Deal Lost';

export interface BrandInquiry {
  id: string;
  createdAt: string;
  contactName: string;
  brandName: string;
  businessEmail: string;
  websiteOrSocial: string;
  productCategory: string;
  requiredServices: string[];
  campaignGoals: string;
  budgetRange: string;
  message: string;
  status: DealStage;
  estimatedValue?: number;
  internalNotes?: string;
  nextFollowUp?: string;
  crmSynced?: boolean;
}

export type CreatorStatus = 'Under Review' | 'Shortlisted' | 'Contacted' | 'Onboarded' | 'Archived';

export interface CreatorApplication {
  id: string;
  createdAt: string;
  fullName: string;
  email: string;
  socialProfileUrl: string;
  primaryPlatform: 'Instagram' | 'TikTok' | 'YouTube' | 'Pinterest' | 'Other';
  contentNiche: string;
  audienceSize: string;
  portfolioUrl?: string;
  message?: string;
  status: CreatorStatus;
  consentAccepted: boolean;
}

export interface AnalyticsEventRecord {
  id: string;
  timestamp: string;
  eventName:
    | 'page_view'
    | 'start_campaign_click'
    | 'contact_form_start'
    | 'generate_lead'
    | 'creator_application_submit'
    | 'portfolio_view'
    | 'service_inquiry';
  metadata?: Record<string, string | number | boolean>;
}

export interface AnalyticsSummary {
  totalVisitors: number;
  totalPageViews: number;
  startCampaignClicks: number;
  contactFormStarts: number;
  leadsGenerated: number;
  creatorApplications: number;
  portfolioViews: number;
  conversionRate: number;
  pipelineTotalValue: number;
  dealBreakdown: Record<DealStage, number>;
  events: AnalyticsEventRecord[];
  isDemoMode: boolean;
}

export interface ServiceDetail {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  deliverables: string[];
  idealFor: string;
}

export interface IndustryCategory {
  id: string;
  name: string;
  description: string;
  creatorArchetypes: string[];
  popularFormats: string[];
  sampleDeliverables: string[];
}

export interface CaseStudyConcept {
  id: string;
  title: string;
  industry: string;
  imagePath: string;
  objective: string;
  creatorType: string;
  strategy: string;
  deliverables: string[];
  frameworkResults: string;
  isConceptArchetype: boolean;
}
