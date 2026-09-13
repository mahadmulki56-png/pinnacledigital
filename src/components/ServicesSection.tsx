import React from 'react';
import { ArrowUpRight, Sparkles, Smartphone, Monitor, Code, Cpu, Layers } from 'lucide-react';
import { SERVICES } from '../data/portfolioData.ts';

interface ServicesSectionProps {
  onOpenContact: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenContact }) => {
  return (
    <section
      id="services"
      className="py-20 sm:py-28 bg-[#050605] light:bg-[#f8faf8] border-t border-white/[0.06] light:border-black/[0.06] transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] light:bg-black/[0.04] border border-white/10 light:border-black/10 text-xs font-semibold text-[#39ff88] light:text-[#075c32] uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Core Services</span>
          </div>
          <h2
            id="services-heading"
            className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[52px] tracking-tight text-[#f4f7f4] light:text-[#0d140f]"
          >
            Design Solutions Built <br className="hidden sm:inline" /> For Growth
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#a0ada3] light:text-[#4a594e] max-w-xl">
            A cohesive suite of design and engineering disciplines crafted to take your product from concept to category leader.
          </p>
        </div>

        {/* Asymmetric Multi-Card Bento Grid matching the reference */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch perspective-container">
          {/* Left Column Area (Cards 1, 2, 3, 4, 5) */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1: Brand Identity */}
            <div className="p-7 rounded-3xl glass-card card-tilt-left border border-white/10 light:border-black/10 flex flex-col justify-between min-h-[300px] group">
              <div>
                <span className="text-xs font-semibold text-[#39ff88] light:text-[#075c32] tracking-wider uppercase">
                  05 Brand Identity
                </span>
                <h3 className="font-display font-bold text-xl text-[#f4f7f4] light:text-[#0d140f] mt-2">
                  Brand Identity
                </h3>
                <p className="text-xs sm:text-sm text-[#a0ada3] light:text-[#4a594e] mt-1.5 leading-relaxed">
                  Strategic brand systems built for clarity and market authority.
                </p>
              </div>

              {/* Miniature UI Pills (matching reference layout) */}
              <div className="mt-8 pt-4 border-t border-white/[0.06] light:border-black/[0.06] flex flex-wrap gap-2 justify-center">
                <span className="px-3 py-1 rounded-full text-xs bg-white/[0.06] light:bg-black/[0.05] border border-white/10 light:border-black/10 text-[#f4f7f4] light:text-[#0d140f]">
                  Marketing
                </span>
                <span className="px-3 py-1 rounded-full text-xs bg-[#12b85a]/15 border border-[#39ff88]/30 text-[#39ff88] light:text-[#075c32] font-medium">
                  Taxes & Fees
                </span>
                <span className="px-3 py-1 rounded-full text-xs bg-white/[0.06] light:bg-black/[0.05] border border-white/10 light:border-black/10 text-[#f4f7f4] light:text-[#0d140f]">
                  Software
                </span>
                <span className="px-2.5 py-1 rounded-full text-[11px] bg-white/[0.04] light:bg-black/[0.04] text-[#a0ada3]">
                  Utility
                </span>
                <span className="px-2.5 py-1 rounded-full text-[11px] bg-white/[0.04] light:bg-black/[0.04] text-[#a0ada3]">
                  Income
                </span>
                <span className="px-2.5 py-1 rounded-full text-[11px] bg-white/[0.04] light:bg-black/[0.04] text-[#a0ada3]">
                  Operations
                </span>
              </div>
            </div>

            {/* Card 2: UI/UX Design with Miniature Phone Mockup */}
            <div className="p-7 rounded-3xl glass-card card-tilt-right border border-white/10 light:border-black/10 flex flex-col justify-between min-h-[300px] group">
              <div>
                <span className="text-xs font-semibold text-[#39ff88] light:text-[#075c32] tracking-wider uppercase">
                  02 UI/UX Design
                </span>
                <h3 className="font-display font-bold text-xl text-[#f4f7f4] light:text-[#0d140f] mt-2">
                  UI/UX Design
                </h3>
                <p className="text-xs sm:text-sm text-[#a0ada3] light:text-[#4a594e] mt-1.5 leading-relaxed">
                  We craft intuitive interfaces that captivate users and maximize conversion.
                </p>
              </div>

              {/* Miniature Smartphone UI Preview */}
              <div className="mt-6 flex justify-center items-center py-2">
                <div className="relative w-44 h-24 rounded-xl bg-[#0a0d0b] light:bg-[#ffffff] border border-white/15 light:border-black/15 p-2 shadow-lg flex flex-col justify-between overflow-hidden group-hover:border-[#39ff88]/40 transition-colors">
                  <div className="flex items-center justify-between pb-1 border-b border-white/[0.08] light:border-black/[0.08]">
                    <div className="w-2 h-2 rounded-full bg-[#12b85a]" />
                    <div className="h-1.5 w-12 bg-white/20 rounded-full" />
                  </div>
                  <div className="space-y-1.5">
                    <div className="h-2 w-28 bg-[#39ff88]/30 rounded-full" />
                    <div className="h-2 w-20 bg-white/10 rounded-full" />
                  </div>
                  <div className="flex justify-between items-center pt-1">
                    <span className="text-[9px] text-[#39ff88] font-mono">$4,850.00</span>
                    <span className="text-[9px] text-[#a0ada3]">Pay</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Web Design / Web Experience */}
            <div className="p-7 rounded-3xl glass-card card-tilt-left border border-white/10 light:border-black/10 flex flex-col justify-between min-h-[300px] group">
              <div>
                <span className="text-xs font-semibold text-[#39ff88] light:text-[#075c32] tracking-wider uppercase">
                  01 Web Design
                </span>
                <h3 className="font-display font-bold text-xl text-[#f4f7f4] light:text-[#0d140f] mt-2">
                  Web Experience
                </h3>
                <p className="text-xs sm:text-sm text-[#a0ada3] light:text-[#4a594e] mt-1.5 leading-relaxed">
                  Websites that balance editorial beauty with lightning-quick responsiveness.
                </p>
              </div>

              {/* Miniature staggered preview cards (matching reference) */}
              <div className="mt-6 flex items-center justify-center gap-2 overflow-hidden py-1">
                <div className="w-16 h-20 rounded-lg bg-[#151c18] border border-white/10 light:border-black/10 p-1 flex flex-col justify-between shadow-md transform -rotate-3">
                  <div className="w-full h-8 bg-white/5 rounded" />
                  <div className="w-10 h-1.5 bg-[#39ff88]/40 rounded-full" />
                </div>
                <div className="w-20 h-22 rounded-lg bg-[#151c18] border border-white/15 light:border-black/15 p-1.5 flex flex-col justify-between shadow-xl z-10">
                  <div className="w-full h-10 bg-gradient-to-br from-[#12b85a]/20 to-transparent rounded" />
                  <div className="w-12 h-2 bg-[#39ff88] rounded-full" />
                </div>
                <div className="w-16 h-20 rounded-lg bg-[#151c18] border border-white/10 light:border-black/10 p-1 flex flex-col justify-between shadow-md transform rotate-3">
                  <div className="w-full h-8 bg-white/5 rounded" />
                  <div className="w-8 h-1.5 bg-white/20 rounded-full" />
                </div>
              </div>
            </div>

            {/* Card 4: Frontend & Full-Stack Development */}
            <div className="p-7 rounded-3xl glass-card card-tilt-right border border-white/10 light:border-black/10 flex flex-col justify-between min-h-[300px] group">
              <div>
                <span className="text-xs font-semibold text-[#39ff88] light:text-[#075c32] tracking-wider uppercase">
                  03 & 04 Development
                </span>
                <h3 className="font-display font-bold text-xl text-[#f4f7f4] light:text-[#0d140f] mt-2">
                  Frontend & Full-Stack
                </h3>
                <p className="text-xs sm:text-sm text-[#a0ada3] light:text-[#4a594e] mt-1.5 leading-relaxed">
                  Clean, scalable code engineered with TypeScript, React 19, and cloud architectures.
                </p>
              </div>

              {/* Tech stack node network (matching reference's circular badges) */}
              <div className="mt-6 flex items-center justify-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#151c18] border border-white/15 light:border-black/15 flex items-center justify-center text-xs font-bold text-[#39ff88] shadow-md">
                  TS
                </div>
                <div className="w-10 h-10 rounded-full bg-[#12b85a]/20 border border-[#39ff88]/40 flex items-center justify-center text-xs font-bold text-[#39ff88] shadow-md shadow-[#12b85a]/20">
                  ⚛
                </div>
                <div className="w-9 h-9 rounded-full bg-[#151c18] border border-white/15 light:border-black/15 flex items-center justify-center text-xs font-bold text-[#8dffb8] shadow-md">
                  Vite
                </div>
                <div className="w-9 h-9 rounded-full bg-[#151c18] border border-white/15 light:border-black/15 flex items-center justify-center text-xs font-bold text-[#f4f7f4] light:text-[#0d140f] shadow-md">
                  API
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Tall Editorial Hero Card (06 Digital Experiences) */}
          <div className="lg:col-span-4 rounded-3xl glass-card card-tilt-tall border border-white/10 light:border-black/10 overflow-hidden flex flex-col justify-between p-7 sm:p-8 relative group">
            {/* Background subtle green atmosphere */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#062b18]/40 via-transparent to-[#0a0d0b] pointer-events-none -z-0" />

            {/* Editorial visual image on top (hands touching / architectural touch) */}
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 border border-white/10 light:border-black/10">
              <img
                src="https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=1000&q=85"
                alt="Digital collaboration and impact"
                className="w-full h-full object-cover object-center filter brightness-95 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101512] via-transparent to-transparent" />
            </div>

            {/* Content matching reference */}
            <div className="relative z-10 flex flex-col justify-between flex-1">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] light:bg-black/[0.06] border border-white/10 light:border-black/10 text-[11px] font-semibold text-[#39ff88] light:text-[#075c32] uppercase tracking-wider mb-4">
                  <span>Trusted By Global Partners</span>
                </div>

                <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#f4f7f4] light:text-[#0d140f] tracking-tight">
                  Let's Create Impact
                </h3>

                <p className="text-xs sm:text-sm text-[#a0ada3] light:text-[#4a594e] mt-2 leading-relaxed">
                  Let's create meaningful and lasting digital impact that turns your website into a growth engine.
                </p>
              </div>

              <div className="mt-8 pt-4">
                <button
                  onClick={onOpenContact}
                  id="services-start-project-btn"
                  className="w-full group inline-flex items-center justify-center gap-3 px-6 py-3 rounded-full bg-[#12b85a] hover:bg-[#39ff88] text-[#050605] font-semibold text-sm transition-all duration-300 shadow-lg shadow-[#12b85a]/25 hover:shadow-[#39ff88]/40"
                >
                  <span>Start A Project</span>
                  <div className="w-5 h-5 rounded-full bg-[#050605] text-[#39ff88] flex items-center justify-center transition-transform group-hover:rotate-45">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
