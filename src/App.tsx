/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomeHero } from './components/HomeHero';
import { ServicesSection } from './components/ServicesSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { IndustriesSection } from './components/IndustriesSection';
import { PortfolioSection } from './components/PortfolioSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdminPortal } from './components/AdminPortal';
import { CreatorApplicationModal } from './components/CreatorApplicationModal';
import { PrivacyAndTermsModal } from './components/PrivacyAndTermsModal';
import { analytics } from './services/analytics';

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isCreatorModalOpen, setIsCreatorModalOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [selectedServiceForInquiry, setSelectedServiceForInquiry] = useState<string | undefined>(undefined);
  const [selectedCategoryForInquiry, setSelectedCategoryForInquiry] = useState<string | undefined>(undefined);

  useEffect(() => {
    analytics.track('page_view', { path: window.location.pathname });

    if (window.location.hash) {
      const targetId = window.location.hash.replace('#', '');
      const el = document.getElementById(targetId);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      history.pushState(null, '', '/');
      return;
    }

    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      history.pushState(null, '', `#${sectionId}`);
    }
  };

  const handleSelectService = (serviceTitle: string) => {
    setSelectedServiceForInquiry(serviceTitle);
    scrollToSection('contact');
  };

  const handleSelectCategory = (categoryName: string) => {
    setSelectedCategoryForInquiry(categoryName);
    scrollToSection('contact');
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden flex flex-col bg-[#05060f] text-[#a9b0c8] font-sans selection:bg-[#4f5bff] selection:text-white">
      
      {/* 1. Transparent Top Bar Navigation with Numbered Menu Items */}
      <Navbar
        onOpenAdmin={() => setIsAdminOpen(true)}
        onNavigateToSection={scrollToSection}
        onOpenCreatorModal={() => setIsCreatorModalOpen(true)}
      />

      <main className="flex-1">
        {/* 2. Full-Screen Dark "Deep Space" Tech Hero */}
        <HomeHero
          onStartCampaign={() => scrollToSection('contact')}
          onExploreServices={() => scrollToSection('services')}
          onLearnHowItWorks={() => scrollToSection('how-it-works')}
        />

        {/* 3. Services // 0.1: Influencer Marketing, UGC, Partnerships, Management */}
        <ServicesSection onSelectServiceToInquire={handleSelectService} />

        {/* 4. How It Works // 0.2: 5-Stage Campaign Methodology */}
        <HowItWorksSection onStartCampaign={() => scrollToSection('contact')} />

        {/* 5. Industries // 0.3: Tech, Beauty, Fashion, Food, Lifestyle & More */}
        <IndustriesSection onSelectCategory={handleSelectCategory} />

        {/* 6. Case Concepts // 0.4: Portfolio Frameworks */}
        <PortfolioSection />

        {/* 7. Contact // 0.5: Brand Inquiry Form & Lead Capture */}
        <ContactSection
          initialService={selectedServiceForInquiry}
          initialCategory={selectedCategoryForInquiry}
        />
      </main>

      {/* 8. Minimal Deep Space Footer */}
      <Footer
        onNavigateToSection={scrollToSection}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        onOpenCreatorModal={() => setIsCreatorModalOpen(true)}
      />

      {/* Admin Portal Modal (CRM Pipeline, Analytics, Integrations) */}
      <AdminPortal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      {/* Creator Application Modal */}
      <CreatorApplicationModal
        isOpen={isCreatorModalOpen}
        onClose={() => setIsCreatorModalOpen(false)}
      />

      {/* Privacy & Compliance Modal */}
      <PrivacyAndTermsModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />
    </div>
  );
}
