import React, { useState } from 'react';
import { ArrowUpRight, X, Check, Info } from 'lucide-react';
import { analytics } from '../services/analytics';

export const PortfolioSection: React.FC = () => {
  const [activeModalConcept, setActiveModalConcept] = useState<any | null>(null);

  const concepts = [
    {
      id: 'acoustic-horizon',
      title: 'Horizon Studio ANC Headphones',
      industry: 'Electronics & Technology',
      imagePath: '/src/assets/images/stryven_tech_concept_1792252181449.jpg',
      objective: 'Establish premium positioning among studio audio engineers, software developers, and minimalist workspace tastemakers.',
      creatorType: 'Tier-1 Audio Reviewers, Workspace Curators, and Industrial Design Critics.',
      strategy: 'Provide creators complete technical freedom to run frequency sweep demonstrations and acoustic tests rather than reading static scripts.',
      deliverables: [
        '6 Long-form YouTube technical reviews with frequency response testing',
        '18 Instagram Reels showcasing industrial tactile dial controls',
        '24 Whitelisted vertical UGC video hooks for Meta & TikTok ads'
      ],
      frameworkResults: 'Attribution Framework: 1.2M targeted video impressions benchmark with sub-$0.45 qualified link click-through.',
    },
    {
      id: 'botanical-alchemy',
      title: 'Barrier Restore Peptide Serum',
      industry: 'Beauty & Skincare',
      imagePath: '/src/assets/images/stryven_beauty_concept_1792252182070.jpg',
      objective: 'Build consumer trust around clinical efficacy through dermatological ingredient education.',
      creatorType: 'Licensed Estheticians, Cosmetic Chemists, and Sensitive-Skin Educators.',
      strategy: 'Focus deliverables on macro skin texture shots, ceramide absorption science, and 14-day hydration retention documentation.',
      deliverables: [
        '12 Cosmetic chemist ingredient breakdown videos on TikTok',
        '15 Instagram carousel posts with clinical patch test documentation',
        '30 High-res UGC raw video variations licensed for Meta Ads'
      ],
      frameworkResults: 'Attribution Framework: Engineered to deliver 3.4x ROAS on paid whitelisted creative and 28% lower CPA compared to studio photo ads.',
    },
    {
      id: 'avelin-cashmere',
      title: 'Autumn Tailored Cashmere Capsule',
      industry: 'Fashion & Apparel',
      imagePath: '/src/assets/images/stryven_fashion_concept_1792252182149.jpg',
      objective: 'Position a newly launched capsule outerwear line as timeless heirloom investments for slow-fashion consumers.',
      creatorType: 'Editorial Stylists, Sustainable Wardrobe Curators, and Menswear Photographers.',
      strategy: 'Curate an unboxing gifting experience featuring raw wool yarn samples and handwritten tailor notes. Creators style 1 piece across 4 distinct settings.',
      deliverables: [
        '10 Cinematic aesthetic reels with bespoke audio grading',
        '14 Multi-slide lookbook carousels with fabric close-ups',
        'Exclusive 48-hour early-access promo codes for creator audiences'
      ],
      frameworkResults: 'Attribution Framework: Designed to generate $140K in attributed first-week revenue with 85% full-video completion rate across European audiences.',
    },
  ];

  const handleOpenConcept = (concept: any) => {
    analytics.track('portfolio_view', { concept_id: concept.id });
    setActiveModalConcept(concept);
  };

  return (
    <section id="work" className="relative py-28 lg:py-36 bg-[#05060f] text-white border-t border-white/[0.06] overflow-hidden">
      
      {/* Background Soft Glow Shape */}
      <div 
        className="absolute top-1/2 left-[-150px] w-[550px] h-[550px] rounded-full pointer-events-none opacity-15"
        style={{
          background: 'radial-gradient(circle, #6b7cff 0%, transparent 65%)',
          filter: 'blur(120px)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-white/[0.08]">
          <div className="max-w-xl">
            <span className="text-[11px] uppercase tracking-[0.22em] text-[#6b7cff] font-mono font-medium block mb-3">
              Case Concepts // 0.4
            </span>
            <h2 className="font-heading text-3xl sm:text-5xl font-semibold text-white tracking-tight">
              Campaign Frameworks
            </h2>
          </div>
          
          <div className="mt-4 md:mt-0 max-w-sm">
            <div className="glass-panel p-3.5 rounded-xl border border-white/[0.08] flex items-start gap-2 text-xs text-[#a9b0c8]">
              <Info className="w-4 h-4 text-[#6b7cff] shrink-0 mt-0.5" />
              <span>
                Demonstration Notice: Below are creative concepts and deliverable architectures. We never invent client rosters or fabricate client statistics.
              </span>
            </div>
          </div>
        </div>

        {/* 3 Concept Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {concepts.map((concept) => (
            <div
              key={concept.id}
              className="glass-panel rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-[#6b7cff]/50 transition-all duration-300"
            >
              <div>
                {/* Visual Asset Container */}
                <div className="relative aspect-[4/3] bg-[#0c0f24] overflow-hidden">
                  <img
                    src={concept.imagePath}
                    alt={concept.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-85 group-hover:opacity-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-[#05060f]/80 backdrop-blur-md text-white text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md border border-white/[0.08]">
                    Concept Framework
                  </div>
                  <div className="absolute top-3 right-3 bg-[#4f5bff]/80 backdrop-blur-md text-white text-[10px] font-medium px-2 py-0.5 rounded-md">
                    {concept.industry}
                  </div>
                </div>

                {/* Content */}
                <div className="p-7">
                  <h3 className="font-heading text-xl font-semibold text-white mb-3 group-hover:text-[#6b7cff] transition-colors leading-snug">
                    {concept.title}
                  </h3>
                  
                  <div className="space-y-3 text-xs text-[#a9b0c8] mb-4">
                    <div>
                      <span className="font-medium text-white block">Objective:</span>
                      <p className="line-clamp-2 text-[#8a93b3] mt-0.5">{concept.objective}</p>
                    </div>
                    <div>
                      <span className="font-medium text-white block">Creator Tier:</span>
                      <p className="line-clamp-2 text-[#8a93b3] mt-0.5">{concept.creatorType}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-7 pb-7 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#636c8a]">
                  {concept.deliverables.length} Deliverable Streams
                </span>
                <button
                  onClick={() => handleOpenConcept(concept)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#6b7cff] group-hover:text-white transition-colors cursor-pointer"
                >
                  <span>Inspect Blueprint</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Modal for In-Depth Concept Inspection */}
      {activeModalConcept && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0a0c1f] border border-white/[0.12] rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-9 shadow-2xl relative">
            <button
              onClick={() => setActiveModalConcept(null)}
              className="absolute top-6 right-6 text-white/60 hover:text-white p-1.5 rounded-lg hover:bg-white/[0.06] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#6b7cff] block mb-2">
              {activeModalConcept.industry} // Case Architecture
            </span>

            <h3 className="font-heading text-2xl font-semibold text-white mb-5">
              {activeModalConcept.title}
            </h3>

            <div className="space-y-5 text-xs text-[#a9b0c8]">
              <div>
                <h4 className="font-medium text-white mb-1">Campaign Objective</h4>
                <p className="text-[#8a93b3] leading-relaxed">{activeModalConcept.objective}</p>
              </div>

              <div>
                <h4 className="font-medium text-white mb-1">Creator Selection Criteria</h4>
                <p className="text-[#8a93b3] leading-relaxed">{activeModalConcept.creatorType}</p>
              </div>

              <div>
                <h4 className="font-medium text-white mb-1">Strategy & Narrative</h4>
                <p className="text-[#8a93b3] leading-relaxed">{activeModalConcept.strategy}</p>
              </div>

              <div>
                <h4 className="font-medium text-white mb-2">Deliverables</h4>
                <ul className="space-y-2">
                  {activeModalConcept.deliverables.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="mt-0.5 rounded-full p-0.5 bg-[#4f5bff]/20 text-[#6b7cff] shrink-0">
                        <Check className="w-3 h-3" />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-[#070918] border border-white/[0.08]">
                <h4 className="font-medium text-[#6b7cff] mb-1">Measurement Blueprint</h4>
                <p className="text-[#8a93b3] leading-relaxed">{activeModalConcept.frameworkResults}</p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.08] flex items-center justify-between">
              <span className="text-[11px] text-[#636c8a]">STRYVEN Campaign Blueprint</span>
              <button
                onClick={() => setActiveModalConcept(null)}
                className="btn-glow-blue rounded-xl px-5 py-2 text-xs font-semibold"
              >
                Close Blueprint
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
