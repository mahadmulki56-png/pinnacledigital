import React, { useState } from 'react';
import { ArrowUpRight, Sparkles, Layers, Globe, ShieldCheck } from 'lucide-react';
import { AGENCY_INFO, CAPABILITY_METRICS } from '../data/portfolioData.ts';

interface HeroProps {
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenContact }) => {
  // Portrait image matching the reference subject style
  const [imgError, setImgError] = useState(false);
  const heroPortraitUrl = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85';
  const fallbackPortraitUrl = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=85';

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] lg:min-h-screen flex flex-col justify-between pt-28 sm:pt-32 pb-12 sm:pb-16 overflow-hidden bg-[#050605] light:bg-[#f8faf8] transition-colors"
    >
      {/* Subtle Atmospheric Watermark Typography matching the reference's 'DESIGNER' */}
      <div className="absolute top-12 sm:top-16 left-0 right-0 pointer-events-none select-none overflow-hidden flex justify-center z-0">
        <span className="font-display font-black text-[17vw] sm:text-[15vw] md:text-[14vw] tracking-tighter text-white/[0.03] light:text-black/[0.03] whitespace-nowrap uppercase leading-none">
          DESIGNER
        </span>
      </div>

      {/* Atmospheric Ambient Glow behind hero */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/4 w-[340px] sm:w-[540px] md:w-[680px] h-[340px] sm:h-[540px] md:h-[680px] hero-halo light:hero-halo-light rounded-full blur-3xl pointer-events-none -z-0 opacity-80" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-between">
        {/* Central Composition: Portrait + Halo + Floating annotations */}
        <div className="relative w-full flex justify-center items-center my-4 sm:my-8">
          <div className="relative flex items-center justify-center">
            {/* Glowing circular backdrop / halo behind portrait */}
            <div className="absolute -inset-4 sm:-inset-8 rounded-full bg-gradient-to-b from-[#39ff88]/35 via-[#12b85a]/25 to-transparent blur-2xl -z-10" />

            {/* Circular halo outline ring */}
            <div className="absolute w-[270px] h-[270px] sm:w-[380px] sm:h-[380px] md:w-[440px] md:h-[440px] rounded-full border border-[#39ff88]/20 bg-gradient-to-tr from-[#062b18]/70 via-[#101512]/40 to-transparent -z-10" />

            {/* Portrait Image container */}
            <div className="relative w-[230px] h-[270px] sm:w-[310px] sm:h-[360px] md:w-[360px] md:h-[420px] rounded-full sm:rounded-[48%] overflow-hidden flex items-end justify-center shadow-2xl shadow-black/80">
              <img
                src={imgError ? fallbackPortraitUrl : heroPortraitUrl}
                onError={() => setImgError(true)}
                alt="Agency Creative Director"
                className="w-full h-full object-cover object-top filter contrast-[1.03] brightness-[0.98] transition-transform duration-700 hover:scale-105"
              />
              {/* Bottom fade gradient to merge portrait into darkness */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#050605] via-[#050605]/60 to-transparent light:from-[#f8faf8] light:via-[#f8faf8]/60" />
            </div>

            {/* Floating Annotation Pill 1: Top Left */}
            <div className="absolute -top-3 left-0 sm:-left-12 md:-left-20 transform -rotate-6 transition-transform hover:scale-105 duration-300">
              <div className="floating-pill flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-[#39ff88] animate-pulse" />
                <span>Web design</span>
              </div>
            </div>

            {/* Floating Annotation Pill 2: Top Right */}
            <div className="absolute -top-4 right-0 sm:-right-8 md:-right-16 transform rotate-6 transition-transform hover:scale-105 duration-300">
              <div className="floating-pill flex items-center gap-2 px-3.5 sm:px-4.5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium">
                <Layers className="w-3.5 h-3.5 text-[#39ff88]" />
                <span>UI/UX Strategy</span>
              </div>
            </div>

            {/* Floating Annotation Pill 3: Mid Right */}
            <div className="hidden sm:flex absolute bottom-16 -right-10 md:-right-24 transform -rotate-3 transition-transform hover:scale-105 duration-300">
              <div className="floating-pill flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium">
                <Sparkles className="w-3.5 h-3.5 text-[#2ee87a]" />
                <span>Clean Architecture</span>
              </div>
            </div>
          </div>
        </div>

        {/* Lower Editorial Split: Large Headline (Left) & Metrics Card (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mt-6 sm:mt-10">
          {/* Left: Introduction label + Massive Headline + CTA */}
          <div className="lg:col-span-8 flex flex-col items-start">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] light:bg-black/[0.04] border border-white/10 light:border-black/10 text-xs font-medium text-[#a0ada3] light:text-[#4a594e] mb-3 sm:mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#12b85a]" />
              <span>Hey, we are {AGENCY_INFO.name}</span>
            </div>

            <h1
              id="hero-main-heading"
              className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-[68px] tracking-tight text-[#f4f7f4] light:text-[#0d140f] leading-[1.08] max-w-2xl"
            >
              Web experiences <br className="hidden sm:inline" />
              built to move <br className="hidden sm:inline" />
              business forward.
            </h1>

            <p className="mt-4 sm:mt-5 text-sm sm:text-base text-[#a0ada3] light:text-[#4a594e] max-w-lg leading-relaxed">
              We design and engineer bespoke digital products, brand identities, and high-performance websites for ambitious companies worldwide.
            </p>

            <div className="mt-6 sm:mt-7 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenContact}
                id="hero-primary-cta"
                className="group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#12b85a] hover:bg-[#39ff88] text-[#050605] font-semibold text-sm sm:text-base shadow-lg shadow-[#12b85a]/25 transition-all duration-300 hover:shadow-[#39ff88]/40 hover:-translate-y-0.5"
              >
                <span>Start a Project</span>
                <div className="w-6 h-6 rounded-full bg-[#050605] text-[#39ff88] flex items-center justify-center transition-transform group-hover:rotate-45">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </button>

              <a
                href="#work"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/15 light:border-black/15 text-sm sm:text-base font-medium text-[#f4f7f4] light:text-[#0d140f] hover:bg-white/[0.05] light:hover:bg-black/[0.05] transition-colors"
              >
                <span>View Selected Work</span>
              </a>
            </div>
          </div>

          {/* Right: Floating Metrics Pill Card (matching reference layout) */}
          <div className="lg:col-span-4 flex justify-start lg:justify-end">
            <div
              id="hero-stats-card"
              className="w-full sm:w-auto min-w-[280px] p-5 sm:p-6 rounded-2xl glass-card border border-white/10 light:border-black/10 flex flex-col gap-4 shadow-xl"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.07] light:border-black/[0.07]">
                <div className="flex flex-col">
                  <span className="text-xs text-[#a0ada3] light:text-[#78897d] font-medium uppercase tracking-wider">
                    Years Crafting
                  </span>
                  <span className="text-xs text-[#67756b] light:text-[#a0ada3]">
                    Digital Products
                  </span>
                </div>
                <span className="font-display font-extrabold text-2xl sm:text-3xl text-[#39ff88] light:text-[#075c32]">
                  {CAPABILITY_METRICS.yearsCrafting}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-xs text-[#a0ada3] light:text-[#78897d] font-medium uppercase tracking-wider">
                    Successful Client
                  </span>
                  <span className="text-xs text-[#67756b] light:text-[#a0ada3]">
                    Partnerships
                  </span>
                </div>
                <span className="font-display font-extrabold text-2xl sm:text-3xl text-[#f4f7f4] light:text-[#0d140f]">
                  {CAPABILITY_METRICS.partnerships}
                </span>
              </div>

              <div className="pt-2 flex items-center gap-2 text-xs text-[#a0ada3] light:text-[#78897d]">
                <Globe className="w-3.5 h-3.5 text-[#12b85a]" />
                <span>100% Remote Global Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
