import React from 'react';
import { AGENCY_INFO } from '../data/portfolioData.ts';
import { PinnacleLogo } from './PinnacleLogo.tsx';

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 bg-[#050605] light:bg-[#f8faf8] border-t border-white/[0.08] light:border-black/[0.08] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Pinnacle Brand & Credit */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:text-left">
            <a href="#hero" className="hover:opacity-90 transition-opacity">
              <PinnacleLogo variant="full" className="h-7 sm:h-8 md:h-9 w-auto" />
            </a>
            <span className="hidden sm:inline text-white/20 light:text-black/20">|</span>
            <div className="text-xs sm:text-sm text-[#a0ada3] light:text-[#4a594e]">
              Designed & Developed © {new Date().getFullYear()}
            </div>
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
