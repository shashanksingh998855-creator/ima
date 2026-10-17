import { BrandInquiry, CreatorApplication, AnalyticsSummary, DealStage, CreatorStatus } from '../types';

export const api = {
  // Brand Inquiry Submission
  async submitBrandInquiry(data: {
    contactName: string;
    brandName: string;
    businessEmail: string;
    websiteOrSocial: string;
    productCategory: string;
    requiredServices: string[];
    campaignGoals: string;
    budgetRange: string;
    message: string;
    privacyConsent: boolean;
    honeypot?: string;
  }) {
    const res = await fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.error || 'Failed to submit inquiry');
    }
    return result;
  },

  // Fetch all Inquiries (CRM Pipeline)
  async getBrandInquiries(): Promise<BrandInquiry[]> {
    const res = await fetch('/api/inquiries');
    if (!res.ok) throw new Error('Failed to fetch inquiries');
    const data = await res.json();
    return data.inquiries;
  },

  // Update Deal Stage / Value / Notes
  async updateInquiry(id: string, updates: {
    status?: DealStage;
    estimatedValue?: number;
    internalNotes?: string;
    nextFollowUp?: string;
    crmSynced?: boolean;
  }): Promise<BrandInquiry> {
    const res = await fetch(`/api/inquiries/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error('Failed to update deal');
    const data = await res.json();
    return data.inquiry;
  },

  // Creator Application Submission
  async submitCreatorApplication(data: {
    fullName: string;
    email: string;
    socialProfileUrl: string;
    primaryPlatform: 'Instagram' | 'TikTok' | 'YouTube' | 'Pinterest' | 'Other';
    contentNiche: string;
    audienceSize: string;
    portfolioUrl?: string;
    message?: string;
    consentAccepted: boolean;
    honeypot?: string;
  }) {
    const res = await fetch('/api/creators', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.error || 'Failed to submit creator application');
    }
    return result;
  },

  // Fetch Creator Applications
  async getCreatorApplications(): Promise<CreatorApplication[]> {
    const res = await fetch('/api/creators');
    if (!res.ok) throw new Error('Failed to fetch creator applications');
    const data = await res.json();
    return data.creators;
  },

  // Update Creator Application Status
  async updateCreatorStatus(id: string, status: CreatorStatus): Promise<CreatorApplication> {
    const res = await fetch(`/api/creators/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error('Failed to update creator application');
    const data = await res.json();
    return data.application;
  },

  // Fetch Analytics & Pipeline Summary
  async getAnalyticsSummary(): Promise<AnalyticsSummary> {
    const res = await fetch('/api/analytics/overview');
    if (!res.ok) throw new Error('Failed to fetch analytics');
    return await res.json();
  },

  // HubSpot CRM Test Sync
  async syncToHubSpot(inquiryId: string, hubspotApiKey?: string, portalId?: string) {
    const res = await fetch('/api/crm/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ inquiryId, hubspotApiKey, portalId }),
    });
    if (!res.ok) throw new Error('Failed to synchronize with CRM');
    return await res.json();
  },
};
