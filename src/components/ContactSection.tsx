import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { analytics } from '../services/analytics';
import { CheckCircle2, AlertCircle, ArrowRight, Shield, Mail } from 'lucide-react';

interface ContactSectionProps {
  initialService?: string;
  initialCategory?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialService, initialCategory }) => {
  const [formData, setFormData] = useState({
    contactName: '',
    brandName: '',
    businessEmail: '',
    websiteOrSocial: '',
    productCategory: initialCategory || 'Technology',
    requiredServices: initialService ? [initialService] : ['Influencer Marketing'],
    campaignGoals: '',
    budgetRange: '$25,000 - $50,000',
    message: '',
    privacyConsent: false,
    honeypot: '',
  });

  const [hasStartedTyping, setHasStartedTyping] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successResponse, setSuccessResponse] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({
        ...prev,
        requiredServices: [initialService],
      }));
    }
  }, [initialService]);

  useEffect(() => {
    if (initialCategory) {
      setFormData((prev) => ({
        ...prev,
        productCategory: initialCategory,
      }));
    }
  }, [initialCategory]);

  const handleFocus = () => {
    if (!hasStartedTyping) {
      setHasStartedTyping(true);
      analytics.track('contact_form_start');
    }
  };

  const handleServiceSelect = (serviceTitle: string) => {
    setFormData((prev) => {
      const exists = prev.requiredServices.includes(serviceTitle);
      if (exists) {
        return {
          ...prev,
          requiredServices: prev.requiredServices.filter((s) => s !== serviceTitle),
        };
      } else {
        return {
          ...prev,
          requiredServices: [...prev.requiredServices, serviceTitle],
        };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.contactName.trim() || !formData.brandName.trim() || !formData.businessEmail.trim() || !formData.message.trim()) {
      setErrorMessage('Please complete all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.businessEmail)) {
      setErrorMessage('Please enter a valid business email address.');
      return;
    }

    if (!formData.privacyConsent) {
      setErrorMessage('Please consent to the privacy policy to submit your campaign brief.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await api.submitBrandInquiry(formData);
      analytics.track('generate_lead', {
        category: formData.productCategory,
        budget: formData.budgetRange,
      });

      setSuccessResponse(res.message);
      setFormData({
        contactName: '',
        brandName: '',
        businessEmail: '',
        websiteOrSocial: '',
        productCategory: 'Technology',
        requiredServices: ['Influencer Marketing'],
        campaignGoals: '',
        budgetRange: '$25,000 - $50,000',
        message: '',
        privacyConsent: false,
        honeypot: '',
      });
      setHasStartedTyping(false);
    } catch (err: any) {
      setErrorMessage(err.message || 'Unable to transmit your brief. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const servicesList = [
    'Influencer Marketing',
    'UGC Content',
    'Creator Partnerships',
    'Campaign Management',
  ];

  const categoriesList = [
    'Technology',
    'Beauty & Skincare',
    'Fashion & Apparel',
    'Food & Beverage',
    'Home & Lifestyle',
    'Fitness & Sports',
    'Travel & Hospitality',
    'Education & Digital',
    'Other Consumer Products',
  ];

  return (
    <section id="contact" className="relative py-28 lg:py-36 bg-[#070918] text-white border-t border-white/[0.06] overflow-hidden">
      
      {/* Background Soft Glow Shape */}
      <div 
        className="absolute top-1/2 right-[-120px] w-[600px] h-[600px] rounded-full pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle, #4f5bff 0%, transparent 65%)',
          filter: 'blur(120px)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Direct Agency Narrative */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-[11px] uppercase tracking-[0.22em] text-[#6b7cff] font-mono font-medium block mb-3">
                Inquiry & Briefing // 0.5
              </span>
              <h2 className="font-heading text-3xl sm:text-5xl font-semibold text-white tracking-tight mb-4">
                Start a Campaign
              </h2>
              <p className="text-sm text-[#a9b0c8] leading-relaxed font-normal">
                Tell us about your brand vision, target demographic, and launch schedule. Our team evaluates requirements and provides a vetted creator roadmap and feasibility brief.
              </p>
            </div>

            <div className="pt-8 border-t border-white/[0.08] space-y-4 text-xs text-[#8a93b3]">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#6b7cff] shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-white block">Direct Inquiries:</span>
                  <span>inquiries@stryven-agency.com</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Shield className="w-4 h-4 text-[#6b7cff] shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-white block">Commercial NDA:</span>
                  <span>All unreleased product formulas and briefs remain strictly confidential.</span>
                </div>
              </div>

              <div className="p-4 rounded-xl glass-panel mt-4 text-[11px] leading-relaxed">
                <span className="text-white font-medium block mb-1">Looking to apply as a creator?</span>
                <span>Please use the Creator Application portal from the top navigation.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Dark Glass Brand Inquiry Form */}
          <div className="lg:col-span-7 glass-panel p-8 sm:p-11 rounded-2xl shadow-2xl relative">
            
            {successResponse ? (
              <div className="py-12 px-4 text-center">
                <CheckCircle2 className="w-12 h-12 text-[#6b7cff] mx-auto mb-4" />
                <h3 className="font-heading text-2xl font-semibold text-white mb-2">
                  Campaign Brief Received
                </h3>
                <p className="text-xs sm:text-sm text-[#a9b0c8] max-w-md mx-auto mb-8 leading-relaxed">
                  {successResponse}
                </p>
                <button
                  onClick={() => setSuccessResponse(null)}
                  className="btn-glow-blue rounded-xl px-6 py-2.5 text-xs font-semibold cursor-pointer"
                >
                  Submit Additional Information
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} onFocus={handleFocus} className="space-y-5">
                
                {/* Honeypot Spam Trap */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-medium text-white/80 mb-1.5">
                      Contact Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Julian Vance"
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 bg-[#070918]/80 border border-white/[0.1] rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#6b7cff] focus:ring-1 focus:ring-[#6b7cff]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-white/80 mb-1.5">
                      Brand / Company *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Avelin Studio"
                      value={formData.brandName}
                      onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 bg-[#070918]/80 border border-white/[0.1] rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#6b7cff] focus:ring-1 focus:ring-[#6b7cff]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-medium text-white/80 mb-1.5">
                      Business Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. j.vance@avelinstudio.com"
                      value={formData.businessEmail}
                      onChange={(e) => setFormData({ ...formData, businessEmail: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 bg-[#070918]/80 border border-white/[0.1] rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#6b7cff] focus:ring-1 focus:ring-[#6b7cff]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-white/80 mb-1.5">
                      Website or Social Handle
                    </label>
                    <input
                      type="text"
                      placeholder="https://avelinstudio.com"
                      value={formData.websiteOrSocial}
                      onChange={(e) => setFormData({ ...formData, websiteOrSocial: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 bg-[#070918]/80 border border-white/[0.1] rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#6b7cff] focus:ring-1 focus:ring-[#6b7cff]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-medium text-white/80 mb-1.5">
                      Product Category *
                    </label>
                    <select
                      value={formData.productCategory}
                      onChange={(e) => setFormData({ ...formData, productCategory: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 bg-[#070918] border border-white/[0.1] rounded-xl text-white focus:outline-none focus:border-[#6b7cff] focus:ring-1 focus:ring-[#6b7cff]"
                    >
                      {categoriesList.map((c) => (
                        <option key={c} value={c} className="bg-[#0a0c1f] text-white">{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-white/80 mb-1.5">
                      Budget Bracket (USD)
                    </label>
                    <select
                      value={formData.budgetRange}
                      onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 bg-[#070918] border border-white/[0.1] rounded-xl text-white focus:outline-none focus:border-[#6b7cff] focus:ring-1 focus:ring-[#6b7cff]"
                    >
                      <option value="$10,000 - $25,000" className="bg-[#0a0c1f]">$10,000 – $25,000 (Emerging sprint)</option>
                      <option value="$25,000 - $50,000" className="bg-[#0a0c1f]">$25,000 – $50,000 (Standard launch)</option>
                      <option value="$50,000 - $100,000" className="bg-[#0a0c1f]">$50,000 – $100,000 (Tier-1 creator wave)</option>
                      <option value="$100,000+" className="bg-[#0a0c1f]">$100,000+ (Comprehensive enterprise push)</option>
                    </select>
                  </div>
                </div>

                {/* Required Services Selection */}
                <div>
                  <label className="block text-[11px] font-medium text-white/80 mb-2">
                    Services Needed (Select all that apply)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {servicesList.map((service) => {
                      const isSelected = formData.requiredServices.includes(service);
                      return (
                        <button
                          type="button"
                          key={service}
                          onClick={() => handleServiceSelect(service)}
                          className={`p-2.5 text-left text-xs rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                            isSelected
                              ? 'bg-[#4f5bff]/20 text-white border-[#6b7cff] shadow-[0_0_12px_rgba(79,91,255,0.3)]'
                              : 'bg-[#070918]/60 text-[#8a93b3] border-white/[0.08] hover:border-white/20'
                          }`}
                        >
                          <span className="font-medium truncate">{service}</span>
                          <span className="text-[10px] font-mono">{isSelected ? '✓' : '+'}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-white/80 mb-1.5">
                    Campaign Objectives & Deliverable Brief *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your product launch, desired creators, timing, and targets."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 bg-[#070918]/80 border border-white/[0.1] rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#6b7cff] focus:ring-1 focus:ring-[#6b7cff]"
                  />
                </div>

                {/* Consent */}
                <div className="pt-1">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.privacyConsent}
                      onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.checked })}
                      className="mt-0.5 rounded border-white/20 bg-[#070918] text-[#4f5bff] focus:ring-[#6b7cff]"
                    />
                    <span className="text-[11px] text-[#8a93b3] leading-tight font-normal">
                      I consent to STRYVEN processing this campaign brief and storing business details in accordance with applicable privacy regulations.
                    </span>
                  </label>
                </div>

                {errorMessage && (
                  <div className="p-3 rounded-xl bg-red-950/40 border border-red-800/60 text-red-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 btn-glow-blue rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Transmitting Brief...</span>
                  ) : (
                    <>
                      <span>Transmit Campaign Brief</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
