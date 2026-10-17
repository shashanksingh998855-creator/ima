import React from 'react';
import { ArrowRight, Sparkles, Check } from 'lucide-react';
import { analytics } from '../services/analytics';

interface ServicesSectionProps {
  onSelectServiceToInquire: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceToInquire }) => {
  const services = [
    {
      num: '01',
      title: 'Influencer Marketing',
      desc: 'Data-informed creator selection, verified demographic vetting, and multi-tier audience activations across international consumer markets.',
      deliverables: ['Audience Bot-Filtering Audits', 'FTC-Compliant Talent Contracting', 'Multi-Platform Distribution', 'Native Attribution Scorecards'],
    },
    {
      num: '02',
      title: 'UGC Content',
      desc: 'High-performing, native 9:16 mobile video engineered specifically for Meta Ads, TikTok Spark Ads, and paid social performance funnels.',
      deliverables: ['Direct-Response Hook Variations', 'Raw + Color-Graded Deliverables', 'A/B Creative Iterations', 'Full Commercial Ad Rights'],
    },
    {
      num: '03',
      title: 'Creator Partnerships',
      desc: 'Long-term brand ambassadorships and multi-month creator collaborations that build enduring brand equity and recurring community advocacy.',
      deliverables: ['Quarterly & Annual Contracts', 'Episodic Content Narrative', 'Exclusive Product Briefs', 'Performance Affiliate Tiers'],
    },
    {
      num: '04',
      title: 'Campaign Management',
      desc: 'Turnkey operational execution from strategic briefing to talent negotiation, draft pre-approvals, product shipping, and post-campaign analysis.',
      deliverables: ['Dedicated Account Supervisor', 'Pre-Approval Workflow Gates', 'Real-Time Link & Code Tracking', 'Post-Campaign Executive Report'],
    },
  ];

  const handleServiceClick = (title: string) => {
    analytics.track('service_inquiry', { service: title });
    onSelectServiceToInquire(title);
  };

  return (
    <section id="services" className="relative py-28 lg:py-36 bg-[#070918] text-white border-t border-white/[0.06] overflow-hidden">
      
      {/* Background Soft Glow Shape */}
      <div 
        className="absolute top-1/3 left-[-150px] w-[500px] h-[500px] rounded-full pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle, #4f5bff 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-white/[0.08]">
          <div className="max-w-xl">
            <span className="text-[11px] uppercase tracking-[0.22em] text-[#6b7cff] font-mono font-medium block mb-3">
              Capabilities // 0.1
            </span>
            <h2 className="font-heading text-3xl sm:text-5xl font-semibold text-white tracking-tight">
              Agency Services
            </h2>
          </div>
          <p className="text-sm text-[#a9b0c8] max-w-sm mt-4 md:mt-0 font-normal leading-relaxed">
            Four specialized disciplines engineered to turn creator voice into verified, measurable commercial growth.
          </p>
        </div>

        {/* 4 Dark Glass Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((item) => (
            <div
              key={item.num}
              className="glass-panel p-8 sm:p-10 rounded-2xl flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs text-[#6b7cff] tracking-widest font-semibold">
                    {item.num}
                  </span>
                  <button
                    onClick={() => handleServiceClick(item.title)}
                    className="text-xs text-[#a9b0c8] group-hover:text-white inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Inquire</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#6b7cff] transition-transform duration-200 group-hover:translate-x-1" />
                  </button>
                </div>

                <h3 className="font-heading text-2xl sm:text-3xl font-semibold text-white mb-4 group-hover:text-[#6b7cff] transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm text-[#a9b0c8] leading-relaxed mb-8 font-normal">
                  {item.desc}
                </p>
              </div>

              {/* Deliverable points */}
              <div className="pt-6 border-t border-white/[0.06] grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#8a93b3]">
                {item.deliverables.map((deliv, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4f5bff] shrink-0" />
                    <span className="truncate">{deliv}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
