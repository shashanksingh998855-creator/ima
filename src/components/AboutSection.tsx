import React from 'react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-28 lg:py-36 bg-[#0E0D0C] text-[#FAF8F5] border-t border-[#1F1C18]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          <div className="lg:col-span-5">
            <span className="text-[11px] uppercase tracking-[0.28em] text-[#C5A880] font-light block mb-4">
              Agency Ethos
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#FAF8F5] font-normal leading-[1.08] tracking-[-0.02em]">
              The Right Influence.
            </h2>
          </div>

          <div className="lg:col-span-7 space-y-8">
            <p className="text-xl sm:text-2xl text-[#FAF8F5] leading-relaxed font-editorial font-light italic">
              STRYVEN was founded on a singular conviction: lasting consumer trust is earned through authentic category mastery, not transactional follower numbers.
            </p>

            <p className="text-xs sm:text-sm text-[#A89F91] leading-relaxed font-light">
              We connect forward-thinking brands with high-credibility creators across consumer tech, luxury fashion, clinical skincare, food, and design lifestyle. By orchestrating creative direction with institutional contract governance, we translate creator attention into verified commercial equity.
            </p>

            {/* 3 Core Operating Principles */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-[#26221E]">
              <div>
                <span className="font-mono text-xs text-[#C5A880] block mb-2">01</span>
                <h3 className="font-editorial text-lg text-[#FAF8F5] font-normal mb-1.5">Audited Audiences</h3>
                <p className="text-xs text-[#7A7165] leading-relaxed font-light">
                  Verified demographics with zero automated bot reach or inflated engagement.
                </p>
              </div>

              <div>
                <span className="font-mono text-xs text-[#C5A880] block mb-2">02</span>
                <h3 className="font-editorial text-lg text-[#FAF8F5] font-normal mb-1.5">All-Category Reach</h3>
                <p className="text-xs text-[#7A7165] leading-relaxed font-light">
                  Comprehensive vertical footprint spanning electronics, apparel, lifestyle and digital tools.
                </p>
              </div>

              <div>
                <span className="font-mono text-xs text-[#C5A880] block mb-2">03</span>
                <h3 className="font-editorial text-lg text-[#FAF8F5] font-normal mb-1.5">Full Attribution</h3>
                <p className="text-xs text-[#7A7165] leading-relaxed font-light">
                  Turnkey FTC compliance, explicit commercial licensing, and native metric verification.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
