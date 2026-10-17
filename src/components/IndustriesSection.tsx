import React from 'react';
import { 
  Cpu, 
  Sparkles, 
  Shirt, 
  Utensils, 
  Home, 
  Dumbbell, 
  Plane, 
  GraduationCap, 
  LayoutGrid,
  ArrowUpRight 
} from 'lucide-react';
import { analytics } from '../services/analytics';

interface IndustriesSectionProps {
  onSelectCategory: (categoryName: string) => void;
}

export const IndustriesSection: React.FC<IndustriesSectionProps> = ({ onSelectCategory }) => {
  const categories = [
    {
      id: 'tech',
      name: 'Technology',
      icon: Cpu,
      subtitle: 'Consumer hardware, studio audio, desk setups & applications',
      accent: 'from-[#4f5bff]/20 to-transparent',
    },
    {
      id: 'beauty',
      name: 'Beauty & Skincare',
      icon: Sparkles,
      subtitle: 'Dermatological storytelling, barrier repair & clean formulations',
      accent: 'from-[#ff7a45]/20 to-transparent',
    },
    {
      id: 'fashion',
      name: 'Fashion & Apparel',
      icon: Shirt,
      subtitle: 'Tailored menswear, capsule styling & luxury accessories',
      accent: 'from-[#6b7cff]/20 to-transparent',
    },
    {
      id: 'food',
      name: 'Food & Beverage',
      icon: Utensils,
      subtitle: 'Artisanal roasts, functional drinks & elevated culinary rituals',
      accent: 'from-[#ff9a62]/20 to-transparent',
    },
    {
      id: 'lifestyle',
      name: 'Home & Lifestyle',
      icon: Home,
      subtitle: 'Architectural interiors, modern ceramics & intentional living',
      accent: 'from-[#4f5bff]/20 to-transparent',
    },
    {
      id: 'fitness',
      name: 'Fitness & Sports',
      icon: Dumbbell,
      subtitle: 'Endurance gear, functional training & recovery equipment',
      accent: 'from-[#ff7a45]/20 to-transparent',
    },
    {
      id: 'travel',
      name: 'Travel & Hospitality',
      icon: Plane,
      subtitle: 'Design retreats, carry-on accessories & boutique stays',
      accent: 'from-[#6b7cff]/20 to-transparent',
    },
    {
      id: 'education',
      name: 'Education & Digital',
      icon: GraduationCap,
      subtitle: 'Creative software, productivity tools & online masterclasses',
      accent: 'from-[#ff9a62]/20 to-transparent',
    },
    {
      id: 'more',
      name: 'and More Products',
      icon: LayoutGrid,
      subtitle: 'Consumer goods, subscription boxes & fintech services',
      accent: 'from-[#4f5bff]/20 to-transparent',
    },
  ];

  const handleCategoryClick = (categoryName: string) => {
    analytics.track('service_inquiry', { category_name: categoryName });
    onSelectCategory(categoryName);
  };

  return (
    <section id="industries" className="relative py-28 lg:py-36 bg-[#070918] text-white border-t border-white/[0.06] overflow-hidden">
      
      {/* Background Soft Glow Shape */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none opacity-15"
        style={{
          background: 'radial-gradient(circle, #4f5bff 0%, transparent 65%)',
          filter: 'blur(120px)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-white/[0.08]">
          <div className="max-w-xl">
            <span className="text-[11px] uppercase tracking-[0.22em] text-[#6b7cff] font-mono font-medium block mb-3">
              Sector Specialization // 0.3
            </span>
            <h2 className="font-heading text-3xl sm:text-5xl font-semibold text-white tracking-tight">
              Product Categories
            </h2>
          </div>
          <p className="text-sm text-[#a9b0c8] max-w-sm mt-4 md:mt-0 font-normal leading-relaxed">
            STRYVEN is an all-category influencer agency, partnering brands with creators of verified credibility in their domain.
          </p>
        </div>

        {/* 9 Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const IconComponent = cat.icon;
            return (
              <div
                key={cat.id}
                onClick={() => handleCategoryClick(cat.name)}
                className="glass-panel p-7 rounded-2xl relative overflow-hidden group hover:border-[#6b7cff]/50 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                {/* Subtle top corner gradient highlight */}
                <div 
                  className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${cat.accent} pointer-events-none rounded-bl-full opacity-60 group-hover:opacity-100 transition-opacity`}
                />

                <div>
                  <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#6b7cff] group-hover:text-white group-hover:bg-[#4f5bff] group-hover:shadow-[0_0_20px_rgba(79,91,255,0.5)] transition-all mb-6">
                    <IconComponent className="w-5 h-5" />
                  </div>

                  <h3 className="font-heading text-xl font-semibold text-white mb-2 group-hover:text-[#6b7cff] transition-colors flex items-center justify-between">
                    <span>{cat.name}</span>
                    <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-[#6b7cff] transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </h3>

                  <p className="text-xs text-[#8a93b3] leading-relaxed font-normal mb-4">
                    {cat.subtitle}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-[#636c8a]">
                  <span>Vetted Creators</span>
                  <span className="text-[#6b7cff] group-hover:underline">Explore vertical →</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
