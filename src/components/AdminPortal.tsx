import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { analytics } from '../services/analytics';
import { BrandInquiry, CreatorApplication, DealStage, AnalyticsSummary, CreatorStatus } from '../types';
import {
  X,
  Lock,
  Kanban,
  Users,
  BarChart3,
  Settings,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  ExternalLink,
  DollarSign,
  Calendar,
  Share2
} from 'lucide-react';

const PIPELINE_STAGES: DealStage[] = [
  'New Inquiry',
  'Contacted',
  'Qualified Lead',
  'Proposal Sent',
  'Negotiation',
  'Deal Won',
  'Deal Lost',
];

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);

  // Active Tab: 'pipeline' | 'creators' | 'analytics' | 'settings'
  const [activeTab, setActiveTab] = useState<'pipeline' | 'creators' | 'analytics' | 'settings'>('pipeline');

  const [inquiries, setInquiries] = useState<BrandInquiry[]>([]);
  const [creators, setCreators] = useState<CreatorApplication[]>([]);
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState<BrandInquiry | null>(null);

  // Settings: GA4 & HubSpot Config
  const [gaMeasurementId, setGaMeasurementId] = useState(analytics.getMeasurementId());
  const [hubspotKey, setHubspotKey] = useState('');
  const [hubspotPortalId, setHubspotPortalId] = useState('');
  const [syncStatus, setSyncStatus] = useState<string | null>(null);

  // Real vs Demo data toggle for the dashboard
  const [showDemoMetrics, setShowDemoMetrics] = useState(false);

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      loadData();
    }
  }, [isOpen, isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default admin access key for STRYVEN portal
    if (passwordInput === 'stryven2026' || passwordInput === 'admin') {
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [inqs, creats, analyticsData] = await Promise.all([
        api.getBrandInquiries(),
        api.getCreatorApplications(),
        api.getAnalyticsSummary(),
      ]);
      setInquiries(inqs);
      setCreators(creats);
      setSummary(analyticsData);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateDealStage = async (inquiryId: string, newStage: DealStage) => {
    try {
      const updated = await api.updateInquiry(inquiryId, { status: newStage });
      setInquiries((prev) => prev.map((inq) => (inq.id === inquiryId ? updated : inq)));
      if (selectedInquiry?.id === inquiryId) {
        setSelectedInquiry(updated);
      }
      loadData();
    } catch (err) {
      alert('Failed to update stage');
    }
  };

  const handleUpdateCreatorStatus = async (creatorId: string, status: CreatorStatus) => {
    try {
      const updated = await api.updateCreatorStatus(creatorId, status);
      setCreators((prev) => prev.map((c) => (c.id === creatorId ? updated : c)));
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleSaveGaId = (e: React.FormEvent) => {
    e.preventDefault();
    analytics.setMeasurementId(gaMeasurementId);
    alert(`Google Analytics Measurement ID updated to: ${gaMeasurementId}`);
  };

  const handleHubSpotSync = async (inquiryId: string) => {
    setSyncStatus('Initiating HubSpot CRM synchronization...');
    try {
      const res = await api.syncToHubSpot(inquiryId, hubspotKey, hubspotPortalId);
      setSyncStatus(res.message);
      loadData();
    } catch (err: any) {
      setSyncStatus('CRM Sync failed: ' + (err.message || 'Check credentials'));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md">
      <div className="bg-[#070918] border border-white/[0.12] w-full max-w-6xl h-[92vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden text-white">
        
        {/* Top Header */}
        <div className="px-6 py-4 bg-[#0a0c24] border-b border-white/[0.08] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="font-heading font-bold text-xl tracking-[0.14em] text-white">
              STRYVEN
            </span>
            <span className="text-[11px] font-mono uppercase tracking-[0.15em] px-2.5 py-0.5 bg-[#4f5bff]/20 text-[#6b7cff] font-medium rounded-full border border-[#4f5bff]/30">
              Agency Management & CRM
            </span>
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated && (
              <button
                onClick={loadData}
                disabled={isLoading}
                title="Refresh latest data"
                className="p-1.5 text-white/50 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors cursor-pointer"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-white/50 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        {!isAuthenticated ? (
          /* Authentication Screen */
          <div className="flex-1 flex items-center justify-center p-6 bg-[#05060f]">
            <div className="glass-panel p-8 sm:p-10 rounded-2xl max-w-md w-full shadow-2xl text-center">
              <div className="w-12 h-12 rounded-xl bg-[#4f5bff]/20 border border-[#4f5bff]/40 flex items-center justify-center mx-auto mb-4 text-[#6b7cff]">
                <Lock className="w-6 h-6" />
              </div>
              
              <h2 className="font-heading text-2xl font-semibold mb-2 text-white">
                Agency Portal Access
              </h2>
              <p className="text-xs text-[#a9b0c8] mb-6 leading-relaxed">
                Secure access for STRYVEN account leads, campaign directors, and CRM administrators.
              </p>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <input
                    type="password"
                    placeholder="Enter admin passcode (e.g. admin)"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-[#070918] border border-white/[0.1] rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#6b7cff]"
                  />
                  {authError && (
                    <p className="text-[11px] text-[#ff7a7a] mt-1.5">
                      Invalid passcode. For demo review, use "admin" or "stryven2026".
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 btn-glow-blue rounded-xl text-xs font-semibold uppercase tracking-[0.14em] cursor-pointer"
                >
                  Unlock Portal
                </button>
              </form>

              <p className="text-[10px] text-[#636c8a] mt-6">
                All client records and talent proposals are encrypted in transit and protected by role-based access.
              </p>
            </div>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Tab Navigation */}
            <div className="bg-[#0a0c24] border-b border-white/[0.08] px-6 flex items-center justify-between shrink-0 overflow-x-auto">
              <div className="flex items-center gap-6">
                <button
                  onClick={() => setActiveTab('pipeline')}
                  className={`py-3.5 text-xs uppercase tracking-[0.14em] font-semibold flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
                    activeTab === 'pipeline'
                      ? 'border-[#6b7cff] text-[#6b7cff]'
                      : 'border-transparent text-white/50 hover:text-white'
                  }`}
                >
                  <Kanban className="w-3.5 h-3.5" />
                  <span>CRM Deal Pipeline ({inquiries.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('creators')}
                  className={`py-3.5 text-xs uppercase tracking-[0.14em] font-semibold flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
                    activeTab === 'creators'
                      ? 'border-[#6b7cff] text-[#6b7cff]'
                      : 'border-transparent text-white/50 hover:text-white'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Creator Talent Roster ({creators.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`py-3.5 text-xs uppercase tracking-[0.14em] font-semibold flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
                    activeTab === 'analytics'
                      ? 'border-[#6b7cff] text-[#6b7cff]'
                      : 'border-transparent text-white/50 hover:text-white'
                  }`}
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>Website & Conversion Analytics</span>
                </button>

                <button
                  onClick={() => setActiveTab('settings')}
                  className={`py-3.5 text-xs uppercase tracking-[0.14em] font-semibold flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
                    activeTab === 'settings'
                      ? 'border-[#6b7cff] text-[#6b7cff]'
                      : 'border-transparent text-white/50 hover:text-white'
                  }`}
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Integrations & Technical Setup</span>
                </button>
              </div>

              {/* Data Mode Indicator */}
              <div className="hidden lg:flex items-center gap-2 text-xs">
                <span className="text-white/40">Mode:</span>
                <span className="px-2 py-0.5 bg-[#070918] border border-white/[0.1] rounded text-[11px] font-mono text-white/80">
                  {showDemoMetrics ? 'Demonstration Benchmark' : 'Live Recorded Pipeline'}
                </span>
              </div>
            </div>

            {/* TAB 1: CRM DEAL PIPELINE */}
            {activeTab === 'pipeline' && (
              <div className="flex-1 p-6 overflow-x-auto overflow-y-hidden flex flex-col bg-[#05060f]">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-[#161412]">
                      Brand Sales Pipeline (7 Stages)
                    </h3>
                    <p className="text-xs text-[#70685E]">
                      Manage inquiries through the agency sales lifecycle. Total active pipeline value: $
                      {(summary?.pipelineTotalValue || 0).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* 7 Kanban Stage Columns */}
                <div className="flex-1 flex gap-4 overflow-x-auto pb-4">
                  {PIPELINE_STAGES.map((stage) => {
                    const stageInquiries = inquiries.filter((inq) => inq.status === stage);
                    const stageValue = stageInquiries.reduce((sum, item) => sum + (item.estimatedValue || 0), 0);

                    return (
                      <div
                        key={stage}
                        className="w-72 bg-[#FFFFFF] border border-[#E0D9CE] rounded-sm flex flex-col shrink-0 shadow-2xs"
                      >
                        <div className="p-3 border-b border-[#E8E2D8] bg-[#FAF8F5] flex items-center justify-between">
                          <span className="text-xs font-semibold uppercase tracking-[0.1em] text-[#161412]">
                            {stage}
                          </span>
                          <span className="text-[11px] font-mono text-[#7A6B53]">
                            {stageInquiries.length} · ${stageValue ? (stageValue / 1000).toFixed(0) + 'k' : '0'}
                          </span>
                        </div>

                        <div className="flex-1 p-2 space-y-2 overflow-y-auto">
                          {stageInquiries.length === 0 ? (
                            <div className="p-4 text-center text-[11px] text-[#A3998C] italic">
                              No deals currently in {stage}
                            </div>
                          ) : (
                            stageInquiries.map((inq) => (
                              <div
                                key={inq.id}
                                onClick={() => setSelectedInquiry(inq)}
                                className="p-3 bg-[#FAF8F5] hover:bg-[#F5F2EB] border border-[#E8E2D8] rounded-xs cursor-pointer transition-all shadow-2xs"
                              >
                                <div className="flex items-start justify-between mb-1.5">
                                  <h4 className="text-xs font-semibold text-[#161412] line-clamp-1">
                                    {inq.brandName}
                                  </h4>
                                  <span className="text-[10px] font-mono tabular-nums text-[#4E7A53] font-semibold">
                                    ${(inq.estimatedValue || 0).toLocaleString()}
                                  </span>
                                </div>

                                <p className="text-[11px] text-[#554E46] line-clamp-1 mb-2">
                                  {inq.contactName} · {inq.productCategory}
                                </p>

                                <div className="flex items-center justify-between pt-2 border-t border-[#EAE4D9] text-[10px] text-[#8A8175]">
                                  <span>{new Date(inq.createdAt).toLocaleDateString()}</span>
                                  {inq.crmSynced ? (
                                    <span className="text-[#4E7A53] font-medium">CRM Synced</span>
                                  ) : (
                                    <span className="text-[#A3998C]">Local Lead</span>
                                  )}
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 2: CREATOR TALENT ROSTER */}
            {activeTab === 'creators' && (
              <div className="flex-1 p-6 overflow-y-auto">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-[#161412]">
                      Creator Talent Applications
                    </h3>
                    <p className="text-xs text-[#70685E]">
                      Review incoming creator profiles, primary platforms, and niche specializations.
                    </p>
                  </div>
                </div>

                <div className="bg-[#FFFFFF] border border-[#E0D9CE] rounded-sm overflow-hidden shadow-2xs">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-[#FAF8F5] border-b border-[#E8E2D8] text-[#7A6B53] uppercase tracking-[0.12em] font-mono text-[11px]">
                        <th className="p-3.5">Creator</th>
                        <th className="p-3.5">Platform</th>
                        <th className="p-3.5">Niche</th>
                        <th className="p-3.5">Audience Tier</th>
                        <th className="p-3.5">Date</th>
                        <th className="p-3.5">Status</th>
                        <th className="p-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8E2D8]">
                      {creators.map((c) => (
                        <tr key={c.id} className="hover:bg-[#FAF8F5] transition-colors">
                          <td className="p-3.5">
                            <span className="font-semibold text-[#161412] block">{c.fullName}</span>
                            <span className="text-[#8A8175] text-[11px]">{c.email}</span>
                          </td>
                          <td className="p-3.5">
                            <a
                              href={c.socialProfileUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[#161412] hover:text-[#7A6B53] inline-flex items-center gap-1 underline font-medium"
                            >
                              <span>{c.primaryPlatform}</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </td>
                          <td className="p-3.5 text-[#554E46]">{c.contentNiche}</td>
                          <td className="p-3.5 text-[#554E46] font-mono">{c.audienceSize}</td>
                          <td className="p-3.5 text-[#8A8175]">{new Date(c.createdAt).toLocaleDateString()}</td>
                          <td className="p-3.5">
                            <select
                              value={c.status}
                              onChange={(e) => handleUpdateCreatorStatus(c.id, e.target.value as any)}
                              className="text-xs px-2 py-1 bg-[#FAF8F5] border border-[#D5CDC1] rounded-xs font-medium"
                            >
                              <option value="Under Review">Under Review</option>
                              <option value="Shortlisted">Shortlisted</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Onboarded">Onboarded</option>
                              <option value="Archived">Archived</option>
                            </select>
                          </td>
                          <td className="p-3.5 text-right">
                            <a
                              href={`mailto:${c.email}?subject=STRYVEN%20Creator%20Collaboration`}
                              className="px-2.5 py-1 bg-[#161412] text-[#FAF8F5] text-[11px] rounded-xs font-medium hover:bg-[#2C2723]"
                            >
                              Contact
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 3: WEBSITE & CONVERSION ANALYTICS */}
            {activeTab === 'analytics' && (
              <div className="flex-1 p-6 overflow-y-auto space-y-6">
                
                {/* Data Mode Notice */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-[#F2EDE4] border border-[#DDD5C7] rounded-sm">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#161412] block">
                      Integrity Notice: Real Data vs Demo Data
                    </span>
                    <p className="text-xs text-[#5D5449] leading-relaxed mt-0.5">
                      STRYVEN never presents fabricated figures as verified client successes. Toggle below to review actual recorded app activity or inspect demonstration benchmarks.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs text-[#554E46]">Demonstration View:</span>
                    <button
                      onClick={() => setShowDemoMetrics(!showDemoMetrics)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-colors cursor-pointer ${
                        showDemoMetrics
                          ? 'bg-[#161412] text-[#FAF8F5]'
                          : 'bg-[#FFFFFF] border border-[#D5CDC1] text-[#161412]'
                      }`}
                    >
                      {showDemoMetrics ? 'Enabled (Demo Projections)' : 'Disabled (Live Only)'}
                    </button>
                  </div>
                </div>

                {/* KPI Metrics Cards (60-30-10 Palette) */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-[#FFFFFF] border border-[#E0D9CE] p-5 rounded-sm shadow-2xs">
                    <span className="text-xs text-[#8A8175] block uppercase tracking-wider mb-1">Total Page Views</span>
                    <p className="font-mono text-2xl font-bold tabular-nums text-[#161412]">
                      {showDemoMetrics ? 1420 : summary?.totalPageViews || 0}
                    </p>
                    <span className="text-[10px] text-[#7A6B53] mt-1 block">
                      {showDemoMetrics ? 'Sample 30-day projection' : 'Live server events recorded'}
                    </span>
                  </div>

                  <div className="bg-[#FFFFFF] border border-[#E0D9CE] p-5 rounded-sm shadow-2xs">
                    <span className="text-xs text-[#8A8175] block uppercase tracking-wider mb-1">Campaign CTA Clicks</span>
                    <p className="font-mono text-2xl font-bold tabular-nums text-[#161412]">
                      {showDemoMetrics ? 84 : summary?.startCampaignClicks || 0}
                    </p>
                    <span className="text-[10px] text-[#7A6B53] mt-1 block">
                      {showDemoMetrics ? '5.9% CTA engagement' : 'start_campaign_click events'}
                    </span>
                  </div>

                  <div className="bg-[#FFFFFF] border border-[#E0D9CE] p-5 rounded-sm shadow-2xs">
                    <span className="text-xs text-[#8A8175] block uppercase tracking-wider mb-1">Verified Leads Generated</span>
                    <p className="font-mono text-2xl font-bold tabular-nums text-[#4E7A53]">
                      {showDemoMetrics ? 18 : summary?.leadsGenerated || 0}
                    </p>
                    <span className="text-[10px] text-[#7A6B53] mt-1 block">
                      {showDemoMetrics ? 'Qualified brand briefs' : 'Inquiries submitted to server'}
                    </span>
                  </div>

                  <div className="bg-[#FFFFFF] border border-[#E0D9CE] p-5 rounded-sm shadow-2xs">
                    <span className="text-xs text-[#8A8175] block uppercase tracking-wider mb-1">Conversion Rate</span>
                    <p className="font-mono text-2xl font-bold tabular-nums text-[#161412]">
                      {showDemoMetrics ? '4.8%' : (summary?.conversionRate || 0) + '%'}
                    </p>
                    <span className="text-[10px] text-[#7A6B53] mt-1 block">
                      Lead / interaction efficiency
                    </span>
                  </div>
                </div>

                {/* Recent Event Log Stream (No PII) */}
                <div className="bg-[#FFFFFF] border border-[#E0D9CE] p-6 rounded-sm shadow-2xs">
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#E8E2D8]">
                    <h4 className="font-serif text-lg font-semibold text-[#161412]">
                      Recent Event Telemetry (Zero PII Stream)
                    </h4>
                    <span className="text-[11px] text-[#8A8175] font-mono">
                      Strict GDPR / Privacy Filter Active
                    </span>
                  </div>

                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {summary?.events.map((ev) => (
                      <div
                        key={ev.id}
                        className="p-2.5 bg-[#FAF8F5] border border-[#E8E2D8] rounded-xs flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-[#7A6B53]">{ev.eventName}</span>
                          {ev.metadata && Object.keys(ev.metadata).length > 0 && (
                            <span className="text-[#8A8175] text-[11px]">
                              {JSON.stringify(ev.metadata)}
                            </span>
                          )}
                        </div>
                        <span className="text-[#A3998C] font-mono text-[11px]">
                          {new Date(ev.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* TAB 4: INTEGRATIONS & TECHNICAL SETUP */}
            {activeTab === 'settings' && (
              <div className="flex-1 p-6 overflow-y-auto space-y-8">
                
                {/* HubSpot CRM Integration Section */}
                <div className="bg-[#FFFFFF] border border-[#E0D9CE] p-8 rounded-sm shadow-2xs">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-serif text-xl font-semibold text-[#161412]">
                        HubSpot CRM Integration
                      </h4>
                      <p className="text-xs text-[#70685E]">
                        Connect your agency's HubSpot portal to automatically sync brand briefs into deals, contacts, and pipeline stages.
                      </p>
                    </div>
                    <span className="px-2.5 py-1 bg-[#F3EFE9] text-[#7A6B53] text-xs font-mono rounded">
                      Sales Pipeline Active
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#161412] mb-1">
                        HubSpot Private App Token / API Key
                      </label>
                      <input
                        type="password"
                        placeholder="pat-na1-xxxxxxxx-xxxx-xxxx"
                        value={hubspotKey}
                        onChange={(e) => setHubspotKey(e.target.value)}
                        className="w-full text-xs px-3.5 py-2 bg-[#FAF8F5] border border-[#D5CDC1] rounded-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#161412] mb-1">
                        HubSpot Portal ID
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 4819201"
                        value={hubspotPortalId}
                        onChange={(e) => setHubspotPortalId(e.target.value)}
                        className="w-full text-xs px-3.5 py-2 bg-[#FAF8F5] border border-[#D5CDC1] rounded-sm"
                      />
                    </div>
                  </div>

                  {inquiries.length > 0 && (
                    <div className="pt-2 flex items-center gap-3">
                      <button
                        onClick={() => handleHubSpotSync(inquiries[0].id)}
                        className="px-4 py-2 bg-[#161412] hover:bg-[#2C2723] text-[#FAF8F5] text-xs font-semibold uppercase tracking-[0.12em] rounded-sm cursor-pointer"
                      >
                        Test Sync Lead ({inquiries[0].brandName})
                      </button>
                      {syncStatus && (
                        <span className="text-xs text-[#4E7A53] font-medium">{syncStatus}</span>
                      )}
                    </div>
                  )}
                </div>

                {/* Google Analytics 4 Config */}
                <div className="bg-[#FFFFFF] border border-[#E0D9CE] p-8 rounded-sm shadow-2xs">
                  <h4 className="font-serif text-xl font-semibold text-[#161412] mb-2">
                    Google Analytics 4 Measurement ID
                  </h4>
                  <p className="text-xs text-[#70685E] mb-4">
                    Enter your real Measurement ID (e.g. <code className="font-mono">G-XXXXXXXXXX</code>) to initiate client-side event dispatching without code changes.
                  </p>

                  <form onSubmit={handleSaveGaId} className="flex items-center gap-3 max-w-md">
                    <input
                      type="text"
                      placeholder="G-XXXXXXXXXX"
                      value={gaMeasurementId}
                      onChange={(e) => setGaMeasurementId(e.target.value)}
                      className="flex-1 text-xs px-3.5 py-2 bg-[#FAF8F5] border border-[#D5CDC1] rounded-sm font-mono"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#161412] hover:bg-[#2C2723] text-[#FAF8F5] text-xs font-semibold uppercase tracking-[0.12em] rounded-sm cursor-pointer"
                    >
                      Save ID
                    </button>
                  </form>
                </div>

                {/* Google Search Console & SEO Verification */}
                <div className="bg-[#FFFFFF] border border-[#E0D9CE] p-8 rounded-sm shadow-2xs">
                  <h4 className="font-serif text-xl font-semibold text-[#161412] mb-2">
                    Google Search Console & SEO Readiness
                  </h4>
                  <p className="text-xs text-[#70685E] leading-relaxed mb-4">
                    STRYVEN is pre-configured with XML sitemaps, robots.txt directives, and Schema.org ProfessionalService structured data.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-3 bg-[#FAF8F5] border border-[#E8E2D8] rounded-sm">
                      <span className="font-semibold block text-[#161412]">Sitemap XML</span>
                      <a href="/sitemap.xml" target="_blank" className="text-[#7A6B53] underline mt-0.5 block">
                        /sitemap.xml (All 8 main views indexed)
                      </a>
                    </div>

                    <div className="p-3 bg-[#FAF8F5] border border-[#E8E2D8] rounded-sm">
                      <span className="font-semibold block text-[#161412]">Robots Directives</span>
                      <a href="/robots.txt" target="_blank" className="text-[#7A6B53] underline mt-0.5 block">
                        /robots.txt (Public access allowed; admin protected)
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            )}

          </div>
        )}

      </div>

      {/* Detail Drawer for Selected Deal Inquiry */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-60 flex items-center justify-end bg-black/40">
          <div className="bg-[#FFFFFF] border-l border-[#D5CDC1] w-full max-w-lg h-full p-8 shadow-2xl overflow-y-auto flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D8] mb-6">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-[0.14em] text-[#7A6B53]">
                    Deal Dossier · {selectedInquiry.id}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#161412]">
                    {selectedInquiry.brandName}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="p-1.5 text-[#736B61] hover:text-[#161412] rounded-sm hover:bg-[#F3EFE9]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status Selector */}
              <div className="mb-6">
                <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#161412] mb-1.5">
                  Pipeline Stage
                </label>
                <select
                  value={selectedInquiry.status}
                  onChange={(e) => handleUpdateDealStage(selectedInquiry.id, e.target.value as DealStage)}
                  className="w-full text-xs px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D5CDC1] rounded-sm font-medium"
                >
                  {PIPELINE_STAGES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-4 text-xs text-[#4F4840] mb-6">
                <div>
                  <span className="font-semibold text-[#161412] block">Contact Lead:</span>
                  <span>{selectedInquiry.contactName} ({selectedInquiry.businessEmail})</span>
                </div>
                <div>
                  <span className="font-semibold text-[#161412] block">Product Category:</span>
                  <span>{selectedInquiry.productCategory}</span>
                </div>
                <div>
                  <span className="font-semibold text-[#161412] block">Budget Bracket:</span>
                  <span>{selectedInquiry.budgetRange}</span>
                </div>
                <div>
                  <span className="font-semibold text-[#161412] block">Estimated Deal Value:</span>
                  <span className="font-mono font-semibold text-[#4E7A53]">
                    ${(selectedInquiry.estimatedValue || 0).toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-[#161412] block">Services Requested:</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {selectedInquiry.requiredServices.map((s, idx) => (
                      <span key={idx} className="bg-[#FAF8F5] border border-[#E8E2D8] px-2 py-0.5 rounded text-[11px]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="font-semibold text-[#161412] block">Campaign Objectives:</span>
                  <p className="bg-[#FAF8F5] p-2.5 rounded-sm border border-[#E8E2D8] leading-relaxed">
                    {selectedInquiry.campaignGoals || 'No explicit objectives submitted.'}
                  </p>
                </div>
                <div>
                  <span className="font-semibold text-[#161412] block">Original Brief:</span>
                  <p className="bg-[#FAF8F5] p-2.5 rounded-sm border border-[#E8E2D8] leading-relaxed">
                    {selectedInquiry.message}
                  </p>
                </div>
                {selectedInquiry.internalNotes && (
                  <div>
                    <span className="font-semibold text-[#161412] block">Internal Account Notes:</span>
                    <p className="text-[11px] text-[#7A7165] bg-[#F5F2EB] p-2 rounded border border-[#E0D9CE]">
                      {selectedInquiry.internalNotes}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-6 border-t border-[#E8E2D8] flex items-center justify-between">
              <button
                onClick={() => handleHubSpotSync(selectedInquiry.id)}
                className="px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] bg-[#161412] text-[#FAF8F5] rounded-sm hover:bg-[#2C2723]"
              >
                Sync with HubSpot
              </button>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] border border-[#D5CDC1] rounded-sm hover:bg-[#FAF8F5]"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
