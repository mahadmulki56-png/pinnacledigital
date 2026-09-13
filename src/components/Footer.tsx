import React from 'react';
import { AGENCY_INFO } from '../data/portfolioData.ts';

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 bg-[#050605] light:bg-[#f8faf8] border-t border-white/[0.08] light:border-black/[0.08] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Designer / Agency Credit */}
          <div className="text-xs sm:text-sm text-[#a0ada3] light:text-[#4a594e] text-center md:text-left">
            Designed & Developed by{' '}
            <span className="text-[#f4f7f4] light:text-[#0d140f] font-medium">
              {AGENCY_INFO.name}
            </span>{' '}
            © {new Date().getFullYear()}
          </div>

          {/* Center: Social Icons Circle Buttons matching reference */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Facebook / Figma */}
            <a
              href="https://figma.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Figma Profile"
              className="w-10 h-10 min-h-[44px] min-w-[44px] rounded-full bg-white/[0.06] light:bg-black/[0.05] border border-white/10 light:border-black/10 text-[#f4f7f4] light:text-[#0d140f] hover:text-[#39ff88] light:hover:text-[#075c32] hover:border-[#39ff88]/40 flex items-center justify-center text-xs font-bold transition-all"
            >
              F
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="w-10 h-10 min-h-[44px] min-w-[44px] rounded-full bg-white/[0.06] light:bg-black/[0.05] border border-white/10 light:border-black/10 text-[#f4f7f4] light:text-[#0d140f] hover:text-[#39ff88] light:hover:text-[#075c32] hover:border-[#39ff88]/40 flex items-center justify-center text-xs font-bold transition-all"
            >
              in
            </a>

            {/* X / Twitter */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X Profile"
              className="w-10 h-10 min-h-[44px] min-w-[44px] rounded-full bg-white/[0.06] light:bg-black/[0.05] border border-white/10 light:border-black/10 text-[#f4f7f4] light:text-[#0d140f] hover:text-[#39ff88] light:hover:text-[#075c32] hover:border-[#39ff88]/40 flex items-center justify-center text-xs font-bold transition-all"
            >
              𝕏
            </a>

            {/* Instagram / Dribbble */}
            <a
              href="https://dribbble.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Dribbble Profile"
              className="w-10 h-10 min-h-[44px] min-w-[44px] rounded-full bg-white/[0.06] light:bg-black/[0.05] border border-white/10 light:border-black/10 text-[#f4f7f4] light:text-[#0d140f] hover:text-[#39ff88] light:hover:text-[#075c32] hover:border-[#39ff88]/40 flex items-center justify-center text-xs font-bold transition-all"
            >
              Dr
            </a>
          </div>

          {/* Right: Meta Links matching reference */}
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-xs text-[#a0ada3] light:text-[#4a594e]">
            <a href="#hero" className="py-2 hover:text-[#39ff88] light:hover:text-[#075c32] transition-colors">
              Style Guide
            </a>
            <a href="#hero" className="py-2 hover:text-[#39ff88] light:hover:text-[#075c32] transition-colors">
              Changelog
            </a>
            <a href="#hero" className="py-2 hover:text-[#39ff88] light:hover:text-[#075c32] transition-colors">
              Licenses
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
