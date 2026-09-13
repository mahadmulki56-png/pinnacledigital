import React from 'react';
import { ArrowUpRight, Home, Users, FolderKanban, BookOpen } from 'lucide-react';
import { AGENCY_INFO } from '../data/portfolioData.ts';

interface FinalCtaSectionProps {
  onOpenContact: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ onOpenContact }) => {
  return (
    <section className="relative section-fluid-py overflow-hidden bg-[#050605] light:bg-[#f8faf8] border-t border-white/[0.06] light:border-black/[0.06] transition-colors">
      {/* The Strongest Emerald Glow on the Page (matching reference's intense atmospheric blue glow) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#062b18]/60 via-[#075c32]/35 to-[#050605] pointer-events-none -z-0 opacity-90" />
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[400px] sm:h-[500px] bg-[#39ff88]/20 rounded-full blur-[140px] pointer-events-none -z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Main Headline */}
          <h2
            id="final-cta-heading"
            className="font-display font-extrabold text-[clamp(2rem,5vw,4.25rem)] tracking-tight text-[#f4f7f4] light:text-[#0d140f] leading-[1.08]"
          >
            Ready To Start <br />
            Something Great?
          </h2>

          <p className="mt-4 sm:mt-6 text-xs sm:text-sm md:text-base lg:text-lg text-[#a0ada3] light:text-[#4a594e] max-w-xl leading-relaxed">
            Let's create a digital experience that actually represents your business, commands industry authority, and accelerates growth.
          </p>

          <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              onClick={onOpenContact}
              id="final-book-call-btn"
              className="min-h-[48px] group inline-flex items-center gap-3 px-6 sm:px-7 py-3 rounded-full bg-[#12b85a] hover:bg-[#39ff88] text-[#050605] font-semibold text-sm sm:text-base shadow-xl shadow-[#12b85a]/30 transition-all duration-300 hover:shadow-[#39ff88]/50 hover:-translate-y-0.5"
            >
              <span>Book a Call</span>
              <div className="w-6 h-6 rounded-full bg-[#050605] text-[#39ff88] flex items-center justify-center transition-transform group-hover:rotate-45">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </button>

            <a
              href="#work"
              className="min-h-[48px] inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-full border border-white/20 light:border-black/20 text-sm sm:text-base font-medium text-[#f4f7f4] light:text-[#0d140f] hover:bg-white/[0.08] light:hover:bg-black/[0.05] transition-colors"
            >
              <span>View Our Work</span>
            </a>
          </div>
        </div>

        {/* 4 Bottom Navigation Tile Cards matching the reference */}
        <div className="mt-12 sm:mt-20 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <a
            href="#hero"
            id="cta-tile-home"
            className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#ffffff] light:bg-[#0d140f] text-[#050605] light:text-[#f4f7f4] shadow-2xl flex flex-col justify-between min-h-[96px] sm:min-h-[120px] transition-transform hover:-translate-y-1"
          >
            <Home className="w-4 sm:w-5 h-4 sm:h-5 text-[#075c32] light:text-[#39ff88]" />
            <span className="font-display font-bold text-sm sm:text-base lg:text-lg">Home</span>
          </a>

          <a
            href="#services"
            id="cta-tile-services"
            className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#0a0d0b]/70 light:bg-[#ffffff]/80 backdrop-blur-md border border-white/10 light:border-black/10 text-[#f4f7f4] light:text-[#0d140f] flex flex-col justify-between min-h-[96px] sm:min-h-[120px] transition-transform hover:-translate-y-1 hover:border-[#39ff88]/40"
          >
            <Users className="w-4 sm:w-5 h-4 sm:h-5 text-[#39ff88] light:text-[#075c32]" />
            <span className="font-display font-bold text-sm sm:text-base lg:text-lg">Services</span>
          </a>

          <a
            href="#work"
            id="cta-tile-portfolio"
            className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#0a0d0b]/70 light:bg-[#ffffff]/80 backdrop-blur-md border border-white/10 light:border-black/10 text-[#f4f7f4] light:text-[#0d140f] flex flex-col justify-between min-h-[96px] sm:min-h-[120px] transition-transform hover:-translate-y-1 hover:border-[#39ff88]/40"
          >
            <FolderKanban className="w-4 sm:w-5 h-4 sm:h-5 text-[#39ff88] light:text-[#075c32]" />
            <span className="font-display font-bold text-sm sm:text-base lg:text-lg">Portfolio</span>
          </a>

          <a
            href="#faq"
            id="cta-tile-faq"
            className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#0a0d0b]/70 light:bg-[#ffffff]/80 backdrop-blur-md border border-white/10 light:border-black/10 text-[#f4f7f4] light:text-[#0d140f] flex flex-col justify-between min-h-[96px] sm:min-h-[120px] transition-transform hover:-translate-y-1 hover:border-[#39ff88]/40"
          >
            <BookOpen className="w-4 sm:w-5 h-4 sm:h-5 text-[#39ff88] light:text-[#075c32]" />
            <span className="font-display font-bold text-sm sm:text-base lg:text-lg">FAQ & Info</span>
          </a>
        </div>
      </div>
    </section>
  );
};
