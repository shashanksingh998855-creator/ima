import React from 'react';
import { Shield } from 'lucide-react';

interface FooterProps {
  onNavigateToSection: (sectionId: string) => void;
  onOpenAdmin: () => void;
  onOpenPrivacy: () => void;
  onOpenCreatorModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onNavigateToSection, 
  onOpenAdmin, 
  onOpenPrivacy,
  onOpenCreatorModal 
}) => {
  return (
    <footer className="bg-[#04050d] text-white border-t border-white/[0.06] py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/[0.08]">
          
          {/* Brand Wordmark & Tagline */}
          <div className="md:col-span-5 space-y-3">
            <span className="font-heading text-xl font-bold tracking-[0.16em] text-white block">
              STRYVEN
            </span>
            <p className="text-xs text-[#6b7cff] font-mono">
              "Your Brand. The Right Influence."
            </p>
            <p className="text-xs text-[#8a93b3] max-w-sm leading-relaxed">
              A premier deep-space creator marketing agency connecting high-growth brands with verified voices across consumer technology, beauty, fashion, culinary, and digital products.
            </p>
          </div>

          {/* Numbered Nav Mirror */}
          <div className="md:col-span-4 space-y-2.5">
            <span className="text-[10px] uppercase font-mono tracking-widest text-white/40 block mb-2">
              Navigation
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => onNavigateToSection('services')}
                className="text-left text-[#a9b0c8] hover:text-white transition-colors cursor-pointer"
              >
                0.1 / Services
              </button>
              <button
                onClick={() => onNavigateToSection('how-it-works')}
                className="text-left text-[#a9b0c8] hover:text-white transition-colors cursor-pointer"
              >
                0.2 / How it works
              </button>
              <button
                onClick={() => onNavigateToSection('industries')}
                className="text-left text-[#a9b0c8] hover:text-white transition-colors cursor-pointer"
              >
                0.3 / Industries
              </button>
              <button
                onClick={() => onNavigateToSection('work')}
                className="text-left text-[#a9b0c8] hover:text-white transition-colors cursor-pointer"
              >
                0.4 / Our work
              </button>
              <button
                onClick={() => onNavigateToSection('contact')}
                className="text-left text-[#a9b0c8] hover:text-white transition-colors cursor-pointer"
              >
                0.5 / Contact
              </button>
              {onOpenCreatorModal && (
                <button
                  onClick={onOpenCreatorModal}
                  className="text-left text-[#6b7cff] hover:text-white transition-colors cursor-pointer"
                >
                  Apply as Creator →
                </button>
              )}
            </div>
          </div>

          {/* Portal & Setup */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-[10px] uppercase font-mono tracking-widest text-white/40 block mb-2">
              Agency Controls
            </span>
            <div className="flex flex-col gap-2">
              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1.5 text-xs text-[#a9b0c8] hover:text-white transition-colors cursor-pointer"
              >
                <Shield className="w-3.5 h-3.5 text-[#6b7cff]" />
                <span>Admin & CRM Pipeline</span>
              </button>
              <button
                onClick={onOpenPrivacy}
                className="text-xs text-[#636c8a] hover:text-[#a9b0c8] text-left transition-colors cursor-pointer"
              >
                Privacy, Terms & Compliance
              </button>
            </div>
          </div>

        </div>

        {/* Quiet Sub-Footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#636c8a] gap-4">
          <p>© {new Date().getFullYear()} STRYVEN Influencer Marketing Agency. All rights reserved.</p>
          <p className="text-center sm:text-right">
            Verified creator partnerships · FTC disclosure compliant · Zero fake metrics
          </p>
        </div>

      </div>
    </footer>
  );
};
