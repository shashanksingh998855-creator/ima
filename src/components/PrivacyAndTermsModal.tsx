import React from 'react';
import { X, ShieldCheck, FileText, Globe, CheckCircle } from 'lucide-react';

interface PrivacyAndTermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyAndTermsModal: React.FC<PrivacyAndTermsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-[#0a0c1f] border border-white/[0.12] w-full max-w-3xl max-h-[88vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden text-white">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#070918] border-b border-white/[0.08] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#6b7cff]" />
            <h3 className="font-heading text-lg font-semibold text-white">
              Privacy Policy, Terms of Service & Technical Compliance
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/50 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Policy Body */}
        <div className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-6 text-xs sm:text-sm text-[#a9b0c8] leading-relaxed">
          
          <section>
            <h4 className="font-heading text-sm font-semibold text-white mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#6b7cff]" />
              <span>1. Data Protection & Brand Confidentiality</span>
            </h4>
            <p>
              STRYVEN processes commercial brand inquiries, product briefing details, and creator talent submissions solely for evaluating and managing influencer marketing partnerships. We adhere to GDPR and CCPA data privacy frameworks.
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-xs text-[#8a93b3]">
              <li><strong>Zero Public Exposure:</strong> Submitted brand budgets, launch schedules, unreleased SKU documents, and contact details are stored securely on the agency server and are never exposed publicly.</li>
              <li><strong>Zero PII in Analytics:</strong> Our client-side and server-side analytics pipelines completely sanitize telemetry, stripping names, emails, addresses, and messages from event metadata.</li>
              <li><strong>Right of Rectification / Removal:</strong> Brands and creators may request immediate deletion of their dossier by emailing privacy@stryven-agency.com.</li>
            </ul>
          </section>

          <section>
            <h4 className="font-heading text-sm font-semibold text-white mb-2 flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#6b7cff]" />
              <span>2. Creator Roster Terms & Fair Representation</span>
            </h4>
            <p>
              Submission of a creator profile through our creator portal constitutes an opt-in to be indexed in the STRYVEN internal talent roster.
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-xs text-[#8a93b3]">
              <li>Submitting an application does not guarantee paid brand sponsorships, seeding shipments, or agency representation.</li>
              <li>Placements are awarded based upon mutual commercial brief requirements, editorial quality, and demographic fit.</li>
              <li>STRYVEN guarantees FTC and ASA disclosure compliance requirements across all sponsored deliverables.</li>
            </ul>
          </section>

          <section>
            <h4 className="font-heading text-sm font-semibold text-white mb-2 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#6b7cff]" />
              <span>3. Search Console Verification & Deployment Guide</span>
            </h4>
            <p>
              To claim and verify this website in Google Search Console:
            </p>
            <ol className="list-decimal pl-5 mt-2 space-y-1 text-xs text-[#8a93b3]">
              <li>Navigate to Google Search Console and select <strong>URL prefix</strong> with your domain.</li>
              <li>Choose <strong>HTML Tag</strong> or <strong>Sitemap XML</strong> verification.</li>
              <li>The sitemap is live and accessible at <code>/sitemap.xml</code>.</li>
              <li>The robots exclusion protocol is accessible at <code>/robots.txt</code>.</li>
              <li>Structured Schema.org <code>ProfessionalService</code> JSON-LD is embedded in <code>index.html</code>.</li>
            </ol>
          </section>

          <section className="p-4 rounded-xl bg-[#070918] border border-white/[0.08] text-xs text-[#8a93b3]">
            <strong>Notice Regarding Client Claims:</strong> STRYVEN conducts business with absolute integrity. In accordance with professional advertising standards, all sample campaigns displayed in the portfolio are designated as creative concept archetypes to illustrate deliverable architecture until commissioned brand activations are publicly authorized.
          </section>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#070918] border-t border-white/[0.08] flex items-center justify-end">
          <button
            onClick={onClose}
            className="btn-glow-blue rounded-xl px-5 py-2 text-xs font-semibold cursor-pointer"
          >
            Acknowledge & Close
          </button>
        </div>

      </div>
    </div>
  );
};
