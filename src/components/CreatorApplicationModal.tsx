import React, { useState } from 'react';
import { api } from '../services/api';
import { analytics } from '../services/analytics';
import { X, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react';

interface CreatorApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreatorApplicationModal: React.FC<CreatorApplicationModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    socialProfileUrl: '',
    primaryPlatform: 'Instagram' as 'Instagram' | 'TikTok' | 'YouTube' | 'Pinterest' | 'Other',
    contentNiche: '',
    audienceSize: '10K - 50K',
    portfolioUrl: '',
    message: '',
    consentAccepted: false,
    honeypot: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.socialProfileUrl.trim() || !formData.contentNiche.trim()) {
      setErrorMessage('Please complete all mandatory profile fields.');
      return;
    }

    if (!formData.consentAccepted) {
      setErrorMessage('Please confirm your consent to the terms and privacy notice.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await api.submitCreatorApplication(formData);
      analytics.track('creator_application_submit', {
        platform: formData.primaryPlatform,
        audience_tier: formData.audienceSize,
      });
      setSubmittedMessage(res.message);
      setFormData({
        fullName: '',
        email: '',
        socialProfileUrl: '',
        primaryPlatform: 'Instagram',
        contentNiche: '',
        audienceSize: '10K - 50K',
        portfolioUrl: '',
        message: '',
        consentAccepted: false,
        honeypot: '',
      });
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred while submitting your application.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-[#0a0c1f] border border-white/[0.12] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-9 shadow-2xl relative text-white">
        
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white/50 hover:text-white p-1.5 rounded-lg hover:bg-white/[0.06] transition-colors"
          aria-label="Close creator modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6 pb-4 border-b border-white/[0.08]">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#6b7cff] block mb-1">
            STRYVEN Creator Community
          </span>
          <h3 className="font-heading text-2xl font-semibold text-white">
            Partner With Leading Global Brands
          </h3>
          <p className="text-xs text-[#a9b0c8] mt-1 leading-relaxed">
            Join the STRYVEN creator talent roster. We match authentic voices with brands who respect creative autonomy and prompt payment.
          </p>
        </div>

        {submittedMessage ? (
          <div className="py-10 px-4 text-center">
            <CheckCircle2 className="w-12 h-12 text-[#6b7cff] mx-auto mb-4" />
            <h4 className="font-heading text-xl font-semibold text-white mb-2">
              Application Received
            </h4>
            <p className="text-xs text-[#a9b0c8] max-w-md mx-auto mb-6 leading-relaxed">
              {submittedMessage}
            </p>
            <button
              onClick={() => setSubmittedMessage(null)}
              className="btn-glow-blue rounded-xl px-5 py-2.5 text-xs font-semibold"
            >
              Submit Another Profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
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
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maya Thorne"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 bg-[#070918] border border-white/[0.1] rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#6b7cff] focus:ring-1 focus:ring-[#6b7cff]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-white/80 mb-1.5">
                  Contact Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. maya@creator.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 bg-[#070918] border border-white/[0.1] rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#6b7cff] focus:ring-1 focus:ring-[#6b7cff]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-medium text-white/80 mb-1.5">
                  Primary Platform *
                </label>
                <select
                  value={formData.primaryPlatform}
                  onChange={(e) => setFormData({ ...formData, primaryPlatform: e.target.value as any })}
                  className="w-full text-xs px-3.5 py-2.5 bg-[#070918] border border-white/[0.1] rounded-xl text-white focus:outline-none focus:border-[#6b7cff] focus:ring-1 focus:ring-[#6b7cff]"
                >
                  <option value="Instagram">Instagram</option>
                  <option value="TikTok">TikTok</option>
                  <option value="YouTube">YouTube</option>
                  <option value="Pinterest">Pinterest</option>
                  <option value="Other">Other / Multi-Platform</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-white/80 mb-1.5">
                  Social Profile URL *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://instagram.com/yourhandle"
                  value={formData.socialProfileUrl}
                  onChange={(e) => setFormData({ ...formData, socialProfileUrl: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 bg-[#070918] border border-white/[0.1] rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#6b7cff] focus:ring-1 focus:ring-[#6b7cff]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-medium text-white/80 mb-1.5">
                  Content Niche / Vertical *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Minimalist Tech & Workspace"
                  value={formData.contentNiche}
                  onChange={(e) => setFormData({ ...formData, contentNiche: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 bg-[#070918] border border-white/[0.1] rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#6b7cff] focus:ring-1 focus:ring-[#6b7cff]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-white/80 mb-1.5">
                  Audience Size Tier *
                </label>
                <select
                  value={formData.audienceSize}
                  onChange={(e) => setFormData({ ...formData, audienceSize: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 bg-[#070918] border border-white/[0.1] rounded-xl text-white focus:outline-none focus:border-[#6b7cff] focus:ring-1 focus:ring-[#6b7cff]"
                >
                  <option value="1K - 10K (Nano)">1K - 10K (Nano Creator)</option>
                  <option value="10K - 50K (Micro)">10K - 50K (Micro Creator)</option>
                  <option value="50K - 250K (Mid-Tier)">50K - 250K (Mid-Tier Creator)</option>
                  <option value="250K - 1M (Macro)">250K - 1M (Macro Creator)</option>
                  <option value="1M+ (High-Profile)">1M+ (High-Profile Creator)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-white/80 mb-1.5">
                Media Kit or Portfolio URL (Optional)
              </label>
              <input
                type="url"
                placeholder="https://drive.google.com/... or your website"
                value={formData.portfolioUrl}
                onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                className="w-full text-xs px-3.5 py-2.5 bg-[#070918] border border-white/[0.1] rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#6b7cff] focus:ring-1 focus:ring-[#6b7cff]"
              />
            </div>

            {/* Fair Representation Notice */}
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-[11px] text-[#8a93b3] leading-relaxed">
              <strong>Fair Notice:</strong> Submitting an application enters your profile into the STRYVEN creator database for future brand brief consideration and does not guarantee paid sponsorships or representation.
            </div>

            {/* Consent */}
            <div>
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.consentAccepted}
                  onChange={(e) => setFormData({ ...formData, consentAccepted: e.target.checked })}
                  className="mt-0.5 rounded border-white/20 bg-[#070918] text-[#4f5bff] focus:ring-[#6b7cff]"
                />
                <span className="text-[11px] text-[#8a93b3] leading-tight">
                  I agree to the storage of my details in accordance with the STRYVEN Privacy Notice for campaign alignment.
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
              className="w-full py-3 btn-glow-blue rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Submitting Profile...</span>
              ) : (
                <>
                  <span>Submit Creator Application</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
