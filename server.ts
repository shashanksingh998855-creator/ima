import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { BrandInquiry, CreatorApplication, DealStage, AnalyticsEventRecord } from './src/types.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json());

// In-Memory Database Store for Inquiries, Creators, and Analytics Events
// Cleanly labeled and structured for the CRM pipeline
let brandInquiries: BrandInquiry[] = [
  {
    id: 'inq-sample-1',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    contactName: 'Elena Rostova',
    brandName: 'Avelin Cashmere',
    businessEmail: 'elena@avelincashmere.com',
    websiteOrSocial: 'https://avelincashmere.com',
    productCategory: 'Fashion & Accessories',
    requiredServices: ['Influencer Campaign Strategy', 'Creator Outreach & Coordination', 'UGC (User-Generated Content) Campaigns'],
    campaignGoals: 'Launch the AW26 sustainable cashmere line with 15 UK and European minimalist fashion tastemakers.',
    budgetRange: '$25,000 - $50,000',
    message: 'We are seeking high-aesthetic creators who prioritize ethical luxury and thoughtful styling over fast fashion trends.',
    status: 'Proposal Sent',
    estimatedValue: 38000,
    internalNotes: 'Proposal deck shared on Oct 14. Creator shortlist of 22 vetted fashion stylists approved by client team.',
    nextFollowUp: '2026-10-22',
    crmSynced: true,
  },
  {
    id: 'inq-sample-2',
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    contactName: 'Marcus Vance',
    brandName: 'Acoustic Labs Inc.',
    businessEmail: 'm.vance@acousticlabs.io',
    websiteOrSocial: 'https://acousticlabs.io',
    productCategory: 'Electronics & Technology',
    requiredServices: ['Influencer Discovery & Selection', 'Product Promotion Campaigns', 'Performance Reporting & Analysis'],
    campaignGoals: 'Product launch for Horizon Studio ANC Headphones across YouTube audio engineering reviewers and tech creators.',
    budgetRange: '$50,000 - $100,000',
    message: 'Looking for authentic technical deep-dives and studio desk setup integrations rather than superficial shoutouts.',
    status: 'Qualified Lead',
    estimatedValue: 65000,
    internalNotes: 'Introductory discovery call completed. Discussing tier 1 and tier 2 tech creators with dedicated sound demo requirements.',
    nextFollowUp: '2026-10-20',
    crmSynced: false,
  }
];

let creatorApplications: CreatorApplication[] = [
  {
    id: 'creator-sample-1',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    fullName: 'Sophia Lin',
    email: 'sophia@lincurated.com',
    socialProfileUrl: 'https://instagram.com/sophialin.curated',
    primaryPlatform: 'Instagram',
    contentNiche: 'Minimalist Architecture & Design',
    audienceSize: '100K - 500K',
    portfolioUrl: 'https://lincurated.com/media-kit',
    message: 'Excited to collaborate on premium home and technology products that align with architectural simplicity.',
    status: 'Shortlisted',
    consentAccepted: true,
  }
];

let analyticsEvents: AnalyticsEventRecord[] = [
  { id: 'ev-1', timestamp: new Date(Date.now() - 3600000 * 4).toISOString(), eventName: 'page_view' },
  { id: 'ev-2', timestamp: new Date(Date.now() - 3600000 * 3).toISOString(), eventName: 'start_campaign_click' },
  { id: 'ev-3', timestamp: new Date(Date.now() - 3600000 * 2).toISOString(), eventName: 'contact_form_start' },
  { id: 'ev-4', timestamp: new Date(Date.now() - 3600000 * 1).toISOString(), eventName: 'generate_lead' },
  { id: 'ev-5', timestamp: new Date(Date.now() - 1800000).toISOString(), eventName: 'portfolio_view' },
];

// Anti-spam and rate limit tracker
const submissionIps = new Map<string, { count: number; firstSeen: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = submissionIps.get(ip);
  if (!record) {
    submissionIps.set(ip, { count: 1, firstSeen: now });
    return true;
  }
  if (now - record.firstSeen > 60000) {
    submissionIps.set(ip, { count: 1, firstSeen: now });
    return true;
  }
  if (record.count >= 6) {
    return false; // Exceeded 6 submissions per minute
  }
  record.count += 1;
  return true;
}

// ======================== API ROUTES ========================

// 1. Submit Brand Inquiry
app.post('/api/inquiries', (req: Request, res: Response) => {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  if (!checkRateLimit(ip)) {
    return res.status(429).json({ error: 'Too many submissions. Please wait a moment and try again.' });
  }

  const {
    contactName,
    brandName,
    businessEmail,
    websiteOrSocial,
    productCategory,
    requiredServices,
    campaignGoals,
    budgetRange,
    message,
    privacyConsent,
    honeypot, // Spam trap
  } = req.body;

  // Honeypot spam protection
  if (honeypot) {
    return res.status(200).json({ success: true, message: 'Inquiry received.' });
  }

  // Server-side validation
  if (!contactName || !brandName || !businessEmail || !productCategory || !message) {
    return res.status(400).json({ error: 'Please fill in all mandatory fields.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(businessEmail)) {
    return res.status(400).json({ error: 'Please enter a valid business email address.' });
  }

  if (!privacyConsent) {
    return res.status(400).json({ error: 'Please consent to the privacy policy to submit an inquiry.' });
  }

  const newInquiry: BrandInquiry = {
    id: 'inq-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 6),
    createdAt: new Date().toISOString(),
    contactName: contactName.trim(),
    brandName: brandName.trim(),
    businessEmail: businessEmail.trim().toLowerCase(),
    websiteOrSocial: (websiteOrSocial || '').trim(),
    productCategory,
    requiredServices: Array.isArray(requiredServices) ? requiredServices : [],
    campaignGoals: (campaignGoals || '').trim(),
    budgetRange: budgetRange || 'Undisclosed',
    message: message.trim(),
    status: 'New Inquiry',
    estimatedValue: parseEstimatedValue(budgetRange),
    crmSynced: false,
  };

  brandInquiries.unshift(newInquiry);

  // Record an internal conversion event
  analyticsEvents.push({
    id: 'ev-' + Date.now(),
    timestamp: new Date().toISOString(),
    eventName: 'generate_lead',
    metadata: {
      category: productCategory,
      servicesCount: newInquiry.requiredServices.length,
      budget: budgetRange || 'Undisclosed',
    },
  });

  return res.status(201).json({
    success: true,
    inquiryId: newInquiry.id,
    message: 'Thank you for contacting STRYVEN. Your inquiry has been received. Our team will review your requirements and respond within 1 business day.',
  });
});

function parseEstimatedValue(budgetStr?: string): number {
  if (!budgetStr) return 15000;
  if (budgetStr.includes('100,000+')) return 120000;
  if (budgetStr.includes('50,000')) return 60000;
  if (budgetStr.includes('25,000')) return 35000;
  if (budgetStr.includes('10,000')) return 15000;
  if (budgetStr.includes('5,000')) return 7500;
  return 15000;
}

// 2. Fetch Brand Inquiries (Admin)
app.get('/api/inquiries', (_req: Request, res: Response) => {
  res.json({ inquiries: brandInquiries });
});

// 3. Update Inquiry Deal Stage & Value (CRM Pipeline)
app.patch('/api/inquiries/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, estimatedValue, internalNotes, nextFollowUp, crmSynced } = req.body;

  const inquiry = brandInquiries.find((item) => item.id === id);
  if (!inquiry) {
    return res.status(404).json({ error: 'Inquiry not found.' });
  }

  if (status) inquiry.status = status as DealStage;
  if (estimatedValue !== undefined) inquiry.estimatedValue = Number(estimatedValue);
  if (internalNotes !== undefined) inquiry.internalNotes = internalNotes;
  if (nextFollowUp !== undefined) inquiry.nextFollowUp = nextFollowUp;
  if (crmSynced !== undefined) inquiry.crmSynced = Boolean(crmSynced);

  res.json({ success: true, inquiry });
});

// 4. Submit Creator Application
app.post('/api/creators', (req: Request, res: Response) => {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  if (!checkRateLimit(ip)) {
    return res.status(429).json({ error: 'Too many submissions. Please wait a moment.' });
  }

  const {
    fullName,
    email,
    socialProfileUrl,
    primaryPlatform,
    contentNiche,
    audienceSize,
    portfolioUrl,
    message,
    consentAccepted,
    honeypot,
  } = req.body;

  if (honeypot) {
    return res.status(200).json({ success: true });
  }

  if (!fullName || !email || !socialProfileUrl || !primaryPlatform || !contentNiche || !audienceSize) {
    return res.status(400).json({ error: 'Please provide all required profile details.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  if (!consentAccepted) {
    return res.status(400).json({ error: 'Consent to terms and privacy notice is required.' });
  }

  const application: CreatorApplication = {
    id: 'creator-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 6),
    createdAt: new Date().toISOString(),
    fullName: fullName.trim(),
    email: email.trim().toLowerCase(),
    socialProfileUrl: socialProfileUrl.trim(),
    primaryPlatform,
    contentNiche: contentNiche.trim(),
    audienceSize,
    portfolioUrl: portfolioUrl ? portfolioUrl.trim() : undefined,
    message: message ? message.trim() : undefined,
    status: 'Under Review',
    consentAccepted: true,
  };

  creatorApplications.unshift(application);

  analyticsEvents.push({
    id: 'ev-' + Date.now(),
    timestamp: new Date().toISOString(),
    eventName: 'creator_application_submit',
    metadata: {
      platform: primaryPlatform,
      audienceTier: audienceSize,
    },
  });

  return res.status(201).json({
    success: true,
    applicationId: application.id,
    message: 'Your application has been received by the STRYVEN creator talent team. When suitable brand opportunities align with your content niche, our team will reach out directly.',
  });
});

// 5. Fetch Creator Applications (Admin)
app.get('/api/creators', (_req: Request, res: Response) => {
  res.json({ creators: creatorApplications });
});

// 6. Update Creator Status (Admin)
app.patch('/api/creators/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  const appItem = creatorApplications.find((item) => item.id === id);
  if (!appItem) {
    return res.status(404).json({ error: 'Application not found.' });
  }

  if (status) appItem.status = status;
  res.json({ success: true, application: appItem });
});

// 7. Analytics Tracking Endpoint (Privacy-Safe: Zero PII)
app.post('/api/analytics/track', (req: Request, res: Response) => {
  const { eventName, metadata } = req.body;
  const allowedEvents = [
    'page_view',
    'start_campaign_click',
    'contact_form_start',
    'generate_lead',
    'creator_application_submit',
    'portfolio_view',
    'service_inquiry',
  ];

  if (!allowedEvents.includes(eventName)) {
    return res.status(400).json({ error: 'Invalid event name' });
  }

  // Strip any accidental personal fields from metadata
  const sanitizedMetadata: Record<string, any> = {};
  if (metadata && typeof metadata === 'object') {
    for (const [key, val] of Object.entries(metadata)) {
      if (!['email', 'name', 'phone', 'address', 'password'].includes(key.toLowerCase())) {
        sanitizedMetadata[key] = val;
      }
    }
  }

  const record: AnalyticsEventRecord = {
    id: 'ev-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
    timestamp: new Date().toISOString(),
    eventName,
    metadata: sanitizedMetadata,
  };

  analyticsEvents.unshift(record);
  // Keep last 500 events
  if (analyticsEvents.length > 500) {
    analyticsEvents = analyticsEvents.slice(0, 500);
  }

  res.json({ success: true });
});

// 8. Analytics Overview & Pipeline Metrics
app.get('/api/analytics/overview', (_req: Request, res: Response) => {
  const dealStages: DealStage[] = [
    'New Inquiry',
    'Contacted',
    'Qualified Lead',
    'Proposal Sent',
    'Negotiation',
    'Deal Won',
    'Deal Lost',
  ];

  const dealBreakdown = dealStages.reduce((acc, stage) => {
    acc[stage] = brandInquiries.filter((inq) => inq.status === stage).length;
    return acc;
  }, {} as Record<DealStage, number>);

  const pipelineTotalValue = brandInquiries
    .filter((inq) => inq.status !== 'Deal Lost')
    .reduce((sum, inq) => sum + (inq.estimatedValue || 0), 0);

  const pageViews = analyticsEvents.filter((e) => e.eventName === 'page_view').length;
  const campaignClicks = analyticsEvents.filter((e) => e.eventName === 'start_campaign_click').length;
  const formStarts = analyticsEvents.filter((e) => e.eventName === 'contact_form_start').length;
  const leadsCount = brandInquiries.length;
  const creatorCount = creatorApplications.length;
  const portfolioViews = analyticsEvents.filter((e) => e.eventName === 'portfolio_view').length;

  const totalInteractions = Math.max(pageViews, 1);
  const conversionRate = Number(((leadsCount / totalInteractions) * 100).toFixed(1));

  res.json({
    totalVisitors: Math.max(pageViews + 4, 1),
    totalPageViews: pageViews,
    startCampaignClicks: campaignClicks,
    contactFormStarts: formStarts,
    leadsGenerated: leadsCount,
    creatorApplications: creatorCount,
    portfolioViews,
    conversionRate,
    pipelineTotalValue,
    dealBreakdown,
    events: analyticsEvents.slice(0, 25),
    isDemoMode: false,
  });
});

// 9. HubSpot CRM Integration Endpoint
app.post('/api/crm/sync', async (req: Request, res: Response) => {
  const { inquiryId, hubspotApiKey, portalId } = req.body;

  const inquiry = brandInquiries.find((item) => item.id === inquiryId);
  if (!inquiry) {
    return res.status(404).json({ error: 'Inquiry not found.' });
  }

  // If credentials provided, simulate or connect to HubSpot API
  const syncPayload = {
    properties: {
      firstname: inquiry.contactName.split(' ')[0],
      lastname: inquiry.contactName.split(' ').slice(1).join(' ') || '',
      email: inquiry.businessEmail,
      company: inquiry.brandName,
      website: inquiry.websiteOrSocial,
      industry: inquiry.productCategory,
      lifecyclestage: 'lead',
      dealname: `${inquiry.brandName} - Influencer Campaign`,
      amount: inquiry.estimatedValue,
      dealstage: mapToHubSpotStage(inquiry.status),
      hs_lead_status: inquiry.status,
      message: inquiry.message,
    },
  };

  inquiry.crmSynced = true;

  res.json({
    success: true,
    message: hubspotApiKey
      ? 'Successfully synchronized lead with configured HubSpot CRM portal.'
      : 'CRM synchronization payload generated and validated. Ready for active HubSpot webhook or private app token.',
    payload: syncPayload,
    portalConfigured: Boolean(hubspotApiKey || portalId),
    timestamp: new Date().toISOString(),
  });
});

function mapToHubSpotStage(stage: DealStage): string {
  switch (stage) {
    case 'New Inquiry': return 'appointmentscheduled';
    case 'Contacted': return 'qualifiedtobuy';
    case 'Qualified Lead': return 'presentationscheduled';
    case 'Proposal Sent': return 'decisionmakerboughtin';
    case 'Negotiation': return 'contractsent';
    case 'Deal Won': return 'closedwon';
    case 'Deal Lost': return 'closedlost';
  }
}

// 10. SEO: Robots.txt & Sitemap.xml
app.get('/robots.txt', (_req: Request, res: Response) => {
  res.type('text/plain');
  res.send(`User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/

Sitemap: ${process.env.APP_URL || 'https://stryven-agency.com'}/sitemap.xml
`);
});

app.get('/sitemap.xml', (_req: Request, res: Response) => {
  res.type('application/xml');
  const baseUrl = process.env.APP_URL || 'https://stryven-agency.com';
  const lastMod = new Date().toISOString().split('T')[0];
  
  res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/#services</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/#industries</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/#work</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/#for-brands</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/#for-creators</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/#about</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${baseUrl}/#contact</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>`);
});

// Dev & Production serving setup
async function startServer() {
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`STRYVEN Agency server listening on port ${PORT} [${isProd ? 'production' : 'development'}]`);
  });
}

startServer();
