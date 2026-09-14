import React, { useState } from 'react';
import { Star, CheckCircle, Code2, Palette, Cpu, Sparkles } from 'lucide-react';
import { CAPABILITY_METRICS } from '../data/portfolioData.ts';

export const CapabilitiesSection: React.FC = () => {
  const [imgError, setImgError] = useState(false);
  const portraitUrl = '/omari.png';
  const fallbackUrl = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=85';

  const clientAvatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80',
  ];

  return (
    <section className="section-fluid-py bg-[#050605] light:bg-[#f8faf8] transition-colors border-t border-white/[0.06] light:border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Portrait photo with subtle dark gradient frame */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden glass-card border border-white/10 light:border-black/10 group">
              {/* Green subtle rim glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050605] via-transparent to-transparent z-10 opacity-80 light:from-[#f8faf8]" />
              <img
                src={imgError ? fallbackUrl : portraitUrl}
                onError={() => setImgError(true)}
                alt="Lead Architect & Design Director"
                className="w-full h-full object-cover object-center filter grayscale contrast-[1.05] group-hover:grayscale-0 transition-all duration-700"
              />

              {/* Inset badge at bottom of portrait */}
              <div className="absolute bottom-3 sm:bottom-5 left-3 sm:left-5 right-3 sm:right-5 z-20 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#0a0d0b]/85 light:bg-[#ffffff]/90 backdrop-blur-md border border-white/10 light:border-black/10 flex items-center justify-between">
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-[#f4f7f4] light:text-[#0d140f]">
                    Design & Code Precision
                  </h4>
                  <p className="text-[11px] sm:text-xs text-[#a0ada3] light:text-[#4a594e]">
                    Direct partner collaboration
                  </p>
                </div>
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#12b85a]/20 border border-[#39ff88]/30 flex items-center justify-center text-[#39ff88] shrink-0">
                  <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 2x2 Metric & Capability Card Cluster */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Card 1: Years Crafting */}
            <div className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl glass-card-interactive border border-white/10 light:border-black/10 flex flex-col justify-between min-h-[160px] sm:min-h-[190px]">
              <div className="flex flex-col">
                <span className="text-[11px] sm:text-xs font-semibold text-[#a0ada3] light:text-[#78897d] uppercase tracking-wider">
                  Years Crafting
                </span>
                <span className="text-xs sm:text-sm text-[#f4f7f4] light:text-[#0d140f] mt-0.5">
                  Digital Products
                </span>
              </div>
              <div className="mt-6 sm:mt-8 flex items-baseline justify-between">
                <span className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#39ff88] light:text-[#075c32]">
                  {CAPABILITY_METRICS.yearsCrafting}
                </span>
                <span className="text-[11px] sm:text-xs text-[#67756b] light:text-[#a0ada3]">
                  Since 2021
                </span>
              </div>
            </div>

            {/* Card 2: Successful Client Partnerships */}
            <div className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl glass-card-interactive border border-white/10 light:border-black/10 flex flex-col justify-between min-h-[160px] sm:min-h-[190px]">
              <div className="flex flex-col">
                <span className="text-[11px] sm:text-xs font-semibold text-[#a0ada3] light:text-[#78897d] uppercase tracking-wider">
                  Successful Client
                </span>
                <span className="text-xs sm:text-sm text-[#f4f7f4] light:text-[#0d140f] mt-0.5">
                  Partnerships
                </span>
              </div>
              <div className="mt-6 sm:mt-8 flex items-baseline justify-between">
                <span className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#f4f7f4] light:text-[#0d140f]">
                  {CAPABILITY_METRICS.partnerships}
                </span>
                <span className="text-[11px] sm:text-xs text-[#67756b] light:text-[#a0ada3]">
                  Across 8 Countries
                </span>
              </div>
            </div>

            {/* Card 3: 120+ Client Satisfaction Score */}
            <div className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl glass-card-interactive border border-white/10 light:border-black/10 flex flex-col justify-between min-h-[160px] sm:min-h-[190px]">
              <div>
                <span className="font-display font-bold text-xl sm:text-2xl text-[#f4f7f4] light:text-[#0d140f]">
                  {CAPABILITY_METRICS.satisfactionScore}
                </span>
                <p className="text-[11px] sm:text-xs text-[#a0ada3] light:text-[#4a594e] mt-1">
                  Client Satisfaction Score
                </p>
              </div>

              <div className="mt-4 sm:mt-6 flex items-center justify-between">
                {/* Star rating pill */}
                <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/[0.05] light:bg-black/[0.05] border border-white/10 light:border-black/10 text-xs font-semibold text-[#f4f7f4] light:text-[#0d140f]">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>{CAPABILITY_METRICS.averageRating}</span>
                </div>

                {/* Overlapping client avatars cluster */}
                <div className="flex -space-x-2">
                  {clientAvatars.map((avatar, idx) => (
                    <img
                      key={idx}
                      src={avatar}
                      alt="Client"
                      className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-[#101512] light:border-white object-cover"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Card 4: Strategic Thinking, Clean Execution with floating tag pills */}
            <div className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl glass-card-interactive border border-white/10 light:border-black/10 flex flex-col justify-between min-h-[160px] sm:min-h-[190px]">
              <div>
                <h3 className="font-display font-bold text-sm sm:text-base text-[#f4f7f4] light:text-[#0d140f] leading-snug">
                  Strategic Thinking, <br />
                  Clean Execution
                </h3>
              </div>

              <div className="mt-3 sm:mt-4 flex flex-wrap gap-1.5 sm:gap-2">
                <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-medium bg-white/[0.05] light:bg-black/[0.05] border border-white/10 light:border-black/10 text-[#f4f7f4] light:text-[#0d140f]">
                  Interface Design
                </span>
                <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-medium bg-[#12b85a]/10 border border-[#39ff88]/30 text-[#39ff88] light:text-[#075c32]">
                  Product Strategy
                </span>
                <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-medium bg-white/[0.05] light:bg-black/[0.05] border border-white/10 light:border-black/10 text-[#f4f7f4] light:text-[#0d140f]">
                  Next.js & React
                </span>
                <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-medium bg-white/[0.05] light:bg-black/[0.05] border border-white/10 light:border-black/10 text-[#f4f7f4] light:text-[#0d140f]">
                  Brand Systems
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
