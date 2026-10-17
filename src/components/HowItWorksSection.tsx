import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface HowItWorksSectionProps {
  onStartCampaign: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ onStartCampaign }) => {
  const steps = [
    {
      num: '01',
      title: 'Submit Brief',
      desc: 'Define product launch goals, target demographic, and timeline through our structured brand intake portal.',
    },
    {
      num: '02',
      title: 'Strategy & Budget',
      desc: 'We align on optimal creator tiers, platform prioritization (Instagram, TikTok, YouTube), and commercial return targets.',
    },
    {
      num: '03',
      title: 'Talent Vetting',
      desc: 'Our talent directors audit audience authenticity, sentiment, and category authority—delivering a curated shortlist.',
    },
    {
      num: '04',
      title: 'Execution & Governance',
      desc: 'From contract execution and product logistics to draft review and FTC compliance, STRYVEN manages all details.',
    },
    {
      num: '05',
      title: 'Attribution & Debrief',
      desc: 'Receive verified platform performance data, engagement audits, and strategic recommendations for scaling ad creative.',
    },
  ];

  return (
    <section id="how-it-works" className="relative py-28 lg:py-36 bg-[#05060f] text-white border-t border-white/[0.06] overflow-hidden">
      
      {/* Background Soft Glow Shape */}
      <div 
        className="absolute top-1/2 right-[-100px] w-[500px] h-[500px] rounded-full pointer-events-none opacity-15"
        style={{
          background: 'radial-gradient(circle, #ff7a45 0%, transparent 70%)',
          filter: 'blur(110px)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16 pb-8 border-b border-white/[0.08]">
          <span className="text-[11px] uppercase tracking-[0.22em] text-[#6b7cff] font-mono font-medium block mb-3">
            Execution Roadmap // 0.2
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-semibold text-white tracking-tight mb-4">
            How a STRYVEN Campaign Operates
          </h2>
          <p className="text-sm text-[#a9b0c8] leading-relaxed">
            Institutional campaign rigor designed to protect your brand identity, enforce FTC guidelines, and guarantee measurable creator attribution.
          </p>
        </div>

        {/* 5-Step Pipeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
          {steps.map((st, idx) => (
            <div
              key={st.num}
              className="glass-panel p-6 sm:p-7 rounded-2xl flex flex-col justify-between group hover:border-[#6b7cff]/40 transition-all"
            >
              <div>
                <span className="font-mono text-xs text-[#6b7cff] tracking-widest font-semibold block mb-4">
                  STAGE {st.num}
                </span>
                <h3 className="font-heading text-lg font-semibold text-white mb-2 group-hover:text-[#6b7cff] transition-colors">
                  {st.title}
                </h3>
                <p className="text-xs text-[#8a93b3] leading-relaxed font-normal">
                  {st.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-[#636c8a]">
                <span>Phase {idx + 1} of 5</span>
                {idx < 4 && <ArrowRight className="w-3.5 h-3.5 text-[#4f5bff]/70" />}
              </div>
            </div>
          ))}
        </div>

        {/* Callout Strip */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl glass-panel flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h4 className="font-heading text-base font-semibold text-white">
              Ready to construct your campaign brief?
            </h4>
            <p className="text-xs text-[#8a93b3] mt-1">
              Submit your objectives, category, and desired schedule to receive a tailored creator shortlist.
            </p>
          </div>
          <button
            onClick={onStartCampaign}
            className="btn-glow-blue rounded-xl px-5 py-2.5 text-xs font-semibold flex items-center gap-2 group cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>Submit Campaign Brief</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

      </div>
    </section>
  );
};
