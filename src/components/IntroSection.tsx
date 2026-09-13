import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';

interface IntroSectionProps {
  onOpenContact: () => void;
}

export const IntroSection: React.FC<IntroSectionProps> = ({ onOpenContact }) => {
  return (
    <section
      id="about"
      className="section-fluid-py bg-[#050605] light:bg-[#f8faf8] border-t border-white/[0.06] light:border-black/[0.06] transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-16 items-start">
          {/* Left: Section Label with icon */}
          <div className="lg:col-span-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] light:bg-black/[0.04] border border-white/10 light:border-black/10 text-xs font-semibold text-[#39ff88] light:text-[#075c32] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>About Us</span>
            </div>
          </div>

          {/* Right: Giant Statement & Compact CTA */}
          <div className="lg:col-span-9 flex flex-col items-start">
            <h2
              id="intro-statement-heading"
              className="font-display font-medium text-[clamp(1.75rem,4.2vw,3.25rem)] tracking-tight text-[#f4f7f4] light:text-[#0d140f] leading-[1.18] max-w-4xl"
            >
              We create thoughtful digital experiences that connect{' '}
              <span className="text-[#39ff88] light:text-[#075c32]">strategy</span>,{' '}
              <span className="text-[#8dffb8] light:text-[#12b85a]">usability</span>, and{' '}
              <span className="underline decoration-[#12b85a]/40 underline-offset-8">visual clarity</span>.
            </h2>

            <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-[#a0ada3] light:text-[#4a594e] max-w-2xl leading-relaxed">
              We operate at the intersection of brand design and engineering rigour. Every project is crafted from first principles to ensure your brand stands out and delivers measurable business momentum.
            </p>

            <div className="mt-6 sm:mt-8">
              <button
                onClick={onOpenContact}
                id="intro-get-in-touch"
                className="group min-h-[44px] inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#121614] light:bg-[#0d140f] border border-white/15 light:border-black/15 text-sm font-semibold text-[#f4f7f4] hover:border-[#39ff88]/50 hover:bg-[#151c18] transition-all duration-300 shadow-md"
              >
                <span>Get In Touch</span>
                <div className="w-5 h-5 rounded-full bg-[#12b85a] group-hover:bg-[#39ff88] text-[#050605] flex items-center justify-center transition-colors">
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
