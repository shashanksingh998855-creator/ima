import React, { useState } from 'react';
import { Menu, X, ArrowRight, Shield } from 'lucide-react';
import { analytics } from '../services/analytics';

interface NavbarProps {
  onOpenAdmin: () => void;
  onNavigateToSection: (sectionId: string) => void;
  onOpenCreatorModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin, onNavigateToSection, onOpenCreatorModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    onNavigateToSection(sectionId);
  };

  const handleStartCampaign = () => {
    analytics.track('start_campaign_click', { location: 'navbar_primary_cta' });
    handleNavClick('contact');
  };

  const handleForCreators = () => {
    if (onOpenCreatorModal) {
      onOpenCreatorModal();
    } else {
      handleNavClick('for-creators');
    }
  };

  const navItems = [
    { num: '0.1', label: 'Services', target: 'services' },
    { num: '0.2', label: 'How it works', target: 'how-it-works' },
    { num: '0.3', label: 'Industries', target: 'industries' },
    { num: '0.4', label: 'Our work', target: 'work' },
    { num: '0.5', label: 'Contact', target: 'contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#05060f]/75 backdrop-blur-xl border-b border-white/[0.06] transition-colors">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between gap-8">
        
        {/* Left: STRYVEN wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick('home')}
            className="text-left font-heading text-xl font-bold tracking-[0.14em] text-white hover:text-[#6b7cff] transition-colors whitespace-nowrap shrink-0 cursor-pointer drop-shadow-[0_0_12px_rgba(107,124,255,0.4)]"
          >
            STRYVEN
          </button>
        </div>

        {/* Center: Numbered menu items with dim number and bright label */}
        <nav className="hidden lg:flex items-center gap-7">
          {navItems.map((item) => (
            <button
              key={item.target}
              onClick={() => handleNavClick(item.target)}
              className="group flex items-center gap-1.5 py-1 text-xs cursor-pointer transition-colors"
            >
              <span className="font-mono text-[11px] text-white/35 group-hover:text-[#6b7cff]/80 transition-colors">
                {item.num} /
              </span>
              <span className="text-white/85 group-hover:text-white font-medium tracking-tight transition-colors">
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        {/* Right: "For Creators" outline + glowing blue "Start a Campaign" button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenAdmin}
            title="CRM & Pipeline Portal"
            className="hidden sm:inline-flex items-center gap-1 text-[11px] text-white/40 hover:text-white/90 px-2 py-1.5 transition-colors cursor-pointer"
          >
            <Shield className="w-3.5 h-3.5" />
            <span className="font-mono text-[10px] uppercase">Portal</span>
          </button>

          <button
            onClick={handleForCreators}
            className="hidden sm:inline-flex items-center text-xs font-medium text-white/90 hover:text-white px-4 py-2.5 rounded-xl border border-white/[0.12] hover:border-[#6b7cff]/60 hover:bg-white/[0.04] transition-all cursor-pointer whitespace-nowrap shrink-0"
          >
            For Creators
          </button>

          <button
            onClick={handleStartCampaign}
            className="btn-glow-blue rounded-xl px-5 py-2.5 text-xs font-semibold flex items-center gap-2 group cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>Start a Campaign</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white/80 hover:text-white p-1.5 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-white/[0.08] bg-[#07091a]/95 backdrop-blur-2xl px-6 py-6 flex flex-col gap-4 text-xs">
          {navItems.map((item) => (
            <button
              key={item.target}
              onClick={() => handleNavClick(item.target)}
              className="flex items-center gap-2 text-left py-1 text-white/90 hover:text-white"
            >
              <span className="font-mono text-[11px] text-white/40">{item.num} /</span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
          <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between gap-3">
            <button
              onClick={handleForCreators}
              className="text-xs font-medium text-white/80 hover:text-white px-3 py-2 rounded-lg border border-white/10"
            >
              For Creators
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="text-xs text-white/40 flex items-center gap-1"
            >
              <Shield className="w-3.5 h-3.5" />
              Portal
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
