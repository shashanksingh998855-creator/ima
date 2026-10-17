import React from 'react';
import { ArrowRight, Sparkles, ArrowUpRight } from 'lucide-react';
import { analytics } from '../services/analytics';

interface HomeHeroProps {
  onStartCampaign: () => void;
  onExploreServices: () => void;
  onLearnHowItWorks: () => void;
}

export const HomeHero: React.FC<HomeHeroProps> = ({
  onStartCampaign,
  onExploreServices,
  onLearnHowItWorks,
}) => {
  const handlePrimaryClick = () => {
    analytics.track('start_campaign_click', { location: 'hero_primary_cta' });
    onStartCampaign();
  };

  const handleSecondaryClick = () => {
    analytics.track('service_inquiry', { location: 'hero_secondary_button' });
    onExploreServices();
  };

  return (
    <section className="relative w-full min-h-screen pt-28 pb-20 lg:pt-32 lg:pb-24 bg-[#05060f] text-white flex flex-col justify-between overflow-hidden">
      
      {/* 1. Background Grid of Hairlines with dots at intersections */}
      <div 
        className="absolute inset-0 bg-deep-grid pointer-events-none opacity-40 z-0" 
        aria-hidden="true" 
      />
      <div 
        className="absolute inset-0 bg-dot-pattern pointer-events-none opacity-25 z-0" 
        aria-hidden="true" 
      />

      {/* 2. Large Blurred Circular Orb: Blending Blue on left into Coral-Orange on right */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] sm:w-[620px] sm:h-[620px] lg:w-[880px] lg:h-[880px] rounded-full pointer-events-none z-0 animate-pulse-subtle"
        style={{
          background: 'radial-gradient(circle at 35% 50%, rgba(79, 91, 255, 0.42) 0%, rgba(107, 124, 255, 0.28) 40%, rgba(255, 122, 69, 0.32) 75%, transparent 95%)',
          filter: 'blur(95px)',
        }}
        aria-hidden="true"
      />

      {/* 3. Orbit Arcs, Light Streaks & Floating Spheres */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {/* Orbit Arc SVG */}
        <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] lg:w-[1100px] lg:h-[1100px] opacity-25" viewBox="0 0 1000 1000">
          <ellipse 
            cx="500" 
            cy="500" 
            rx="460" 
            ry="280" 
            fill="none" 
            stroke="url(#orbit-grad-1)" 
            strokeWidth="1.2" 
            strokeDasharray="6 8"
            transform="rotate(-22 500 500)"
          />
          <ellipse 
            cx="500" 
            cy="500" 
            rx="380" 
            ry="420" 
            fill="none" 
            stroke="url(#orbit-grad-2)" 
            strokeWidth="1" 
            transform="rotate(35 500 500)"
            opacity="0.6"
          />
          <defs>
            <linearGradient id="orbit-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4f5bff" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#6b7cff" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#ff7a45" stopOpacity="0.7" />
            </linearGradient>
            <linearGradient id="orbit-grad-2" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff9a62" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#4f5bff" stopOpacity="0.8" />
            </linearGradient>
          </defs>
        </svg>

        {/* Floating Orb Sphere 1 (Top Right) */}
        <div 
          className="absolute top-[22%] right-[14%] w-10 h-10 rounded-full animate-float-slow opacity-75 hidden sm:block"
          style={{
            background: 'radial-gradient(circle at 30% 30%, #ff9a62 0%, #ff7a45 60%, #150a1f 100%)',
            boxShadow: '0 0 20px rgba(255, 122, 69, 0.45)',
          }}
        />

        {/* Floating Orb Sphere 2 (Bottom Left) */}
        <div 
          className="absolute bottom-[28%] left-[12%] w-6 h-6 rounded-full animate-float-slow opacity-60 hidden sm:block"
          style={{
            background: 'radial-gradient(circle at 30% 30%, #6b7cff 0%, #4f5bff 70%, #05060f 100%)',
            boxShadow: '0 0 16px rgba(79, 91, 255, 0.5)',
            animationDelay: '-4s',
          }}
        />

        {/* Light streak */}
        <div 
          className="absolute top-1/3 left-1/4 w-[450px] h-[1px] bg-gradient-to-r from-transparent via-[#6b7cff]/40 to-transparent -rotate-12 blur-[0.5px]" 
        />
      </div>

      {/* Main Content Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Pill badge, Large Headline & Facts */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            {/* Pill Badge & "Learn how it works" */}
            <div className="flex items-center gap-3.5 mb-7">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-[#4f5bff]/15 text-[#8b98ff] border border-[#4f5bff]/30 backdrop-blur-md shadow-[0_0_12px_rgba(79,91,255,0.25)]">
                <Sparkles className="w-3 h-3 text-[#6b7cff]" />
                Influencer Marketing
              </span>
              <button
                onClick={onLearnHowItWorks}
                className="text-xs text-[#a9b0c8] hover:text-white transition-colors inline-flex items-center gap-1 font-medium cursor-pointer"
              >
                <span>Learn how it works</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Large Headline at ~72px in clean geometric sans */}
            <h1 className="font-heading text-4xl sm:text-6xl lg:text-[70px] xl:text-[74px] font-semibold text-white leading-[1.04] tracking-[-0.035em] mb-7 drop-shadow-[0_2px_24px_rgba(255,255,255,0.1)]">
              Your Brand. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#e2e7ff] to-[#a9b0c8]">
                The Right Influence.
              </span>
            </h1>

            {/* Mobile / Tablet Paragraph (shown here on small screens, right column on desktop) */}
            <p className="text-sm sm:text-base text-[#a9b0c8] leading-relaxed max-w-lg mb-8 lg:hidden font-normal">
              STRYVEN connects forward-thinking brands with authentic creators across consumer technology, beauty, fashion, culinary, and lifestyle verticals.
            </p>

            {/* Mobile CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10 lg:hidden">
              <button
                onClick={handlePrimaryClick}
                className="btn-glow-blue rounded-xl px-6 py-3.5 text-xs font-semibold flex items-center justify-center gap-2 group cursor-pointer shadow-lg"
              >
                <span>Start a Campaign</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={handleSecondaryClick}
                className="rounded-xl px-6 py-3.5 text-xs font-medium bg-[#0c0f24]/70 hover:bg-[#141838] text-white border border-white/[0.12] hover:border-[#6b7cff]/40 transition-all cursor-pointer text-center"
              >
                Explore Our Services
              </button>
            </div>

            {/* 3 True Facts at Bottom Left (Thin large numerals with tiny captions) */}
            <div className="pt-8 border-t border-white/[0.08] grid grid-cols-3 gap-6 max-w-lg">
              <div>
                <p className="font-heading text-2xl sm:text-3xl font-light text-white tracking-tight">
                  9
                </p>
                <p className="text-[11px] text-[#868ea8] mt-0.5 leading-snug">
                  Industries supported
                </p>
              </div>

              <div>
                <p className="font-heading text-2xl sm:text-3xl font-light text-white tracking-tight">
                  Brief→Report
                </p>
                <p className="text-[11px] text-[#868ea8] mt-0.5 leading-snug">
                  Full lifecycle support
                </p>
              </div>

              <div>
                <p className="font-heading text-2xl sm:text-3xl font-light text-white tracking-tight">
                  100%
                </p>
                <p className="text-[11px] text-[#868ea8] mt-0.5 leading-snug">
                  Brand & creator forms
                </p>
              </div>
            </div>

          </div>

          {/* Right Column / Center: Glowing Phone Illustration + Desktop Copy & CTAs */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-end justify-center relative">
            
            {/* Glowing Hand & Phone Silhouette Illustration */}
            <div className="relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px] aspect-[4/5] flex items-center justify-center mb-8 group">
              
              {/* Backlight halo behind phone */}
              <div 
                className="absolute inset-0 rounded-full pointer-events-none opacity-60"
                style={{
                  background: 'radial-gradient(circle, rgba(79, 91, 255, 0.5) 0%, rgba(255, 122, 69, 0.3) 65%, transparent 80%)',
                  filter: 'blur(45px)',
                }}
              />

              {/* Hand Silhouette Graphic SVG Wrapping Phone */}
              <div className="relative z-10 w-[240px] sm:w-[270px] lg:w-[290px] h-[440px] sm:h-[480px] lg:h-[510px]">
                
                {/* Modern Smartphone Mockup */}
                <div className="w-full h-full rounded-[44px] p-3.5 bg-gradient-to-b from-[#1c2242] via-[#0d1024] to-[#060814] border border-white/[0.18] shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(79,91,255,0.25)] relative overflow-hidden flex flex-col justify-between">
                  
                  {/* Speaker Ear Piece & Camera Pill */}
                  <div className="w-20 h-4 bg-black rounded-full mx-auto mb-3 flex items-center justify-center gap-1.5 shrink-0 z-20">
                    <div className="w-2 h-2 rounded-full bg-[#151936]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#202752]" />
                  </div>

                  {/* Phone Screen Canvas */}
                  <div className="flex-1 rounded-[32px] bg-[#070918] border border-white/[0.08] relative overflow-hidden flex flex-col items-center justify-center p-6 text-center">
                    
                    {/* Screen ambient cosmic glow */}
                    <div className="absolute inset-0 bg-radial from-[#4f5bff]/25 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Glowing Ring with STRYVEN Mark */}
                    <div className="relative mb-5 flex items-center justify-center">
                      {/* Outer pulsing ring */}
                      <div className="w-28 h-28 rounded-full border border-[#4f5bff]/40 animate-ping opacity-25" />
                      
                      {/* Glowing Gradient Circle */}
                      <div 
                        className="absolute w-24 h-24 rounded-full p-[2px] shadow-[0_0_28px_rgba(79,91,255,0.6)]"
                        style={{
                          background: 'conic-gradient(from 180deg at 50% 50%, #4f5bff 0deg, #ff7a45 180deg, #6b7cff 360deg)',
                        }}
                      >
                        <div className="w-full h-full rounded-full bg-[#070918] flex flex-col items-center justify-center">
                          {/* STRYVEN Monogram & Pulse */}
                          <span className="font-heading text-lg font-bold tracking-[0.16em] text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
                            STRYVEN
                          </span>
                          <span className="text-[9px] uppercase tracking-[0.2em] text-[#ff9a62] font-mono mt-0.5">
                            INFLUENCE
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Verified Metrics Badge Inside Screen */}
                    <div className="glass-panel px-3.5 py-1.5 rounded-full text-[10px] text-white/90 font-medium flex items-center gap-1.5 mb-2 shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4f5bff] animate-pulse" />
                      <span>Campaign Active · 9 Verticals</span>
                    </div>

                    <p className="text-[10px] text-[#868ea8] leading-tight max-w-[170px]">
                      Authentic creators matched to verified demographic intent.
                    </p>
                  </div>

                  {/* Bottom Home Indicator Bar */}
                  <div className="w-28 h-1 bg-white/20 rounded-full mx-auto mt-2 shrink-0 z-20" />
                </div>

                {/* Hand Silhouette Overlay (Cinematic Dark Silhouette grasping phone) */}
                <div 
                  className="absolute -bottom-8 -right-8 w-44 h-48 pointer-events-none opacity-85 z-20"
                  style={{
                    background: 'radial-gradient(ellipse at 70% 70%, rgba(5,6,15,0.95) 0%, rgba(10,12,31,0.85) 60%, transparent 100%)',
                    clipPath: 'polygon(20% 40%, 45% 30%, 80% 45%, 100% 70%, 90% 100%, 30% 100%, 0% 70%)',
                    filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.9))',
                  }}
                />
              </div>

            </div>

            {/* Desktop Paragraph & Buttons */}
            <div className="hidden lg:flex flex-col items-end text-right max-w-md">
              <p className="text-sm text-[#a9b0c8] leading-relaxed mb-6 font-normal">
                STRYVEN operates as an institutional creator marketing agency connecting ambitious brands with vetted voices across technology, skincare, apparel, food, and digital products.
              </p>

              <div className="flex items-center gap-4">
                <button
                  onClick={handleSecondaryClick}
                  className="rounded-xl px-5 py-3 text-xs font-medium bg-[#0c0f24]/80 hover:bg-[#141838] text-white border border-white/[0.12] hover:border-[#6b7cff]/40 transition-all cursor-pointer"
                >
                  Explore Our Services
                </button>

                <button
                  onClick={handlePrimaryClick}
                  className="btn-glow-blue rounded-xl px-6 py-3 text-xs font-semibold flex items-center gap-2 group cursor-pointer shadow-lg"
                >
                  <span>Start a Campaign</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>

    </section>
  );
};
