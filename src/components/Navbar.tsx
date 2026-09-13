import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X, Sun, Moon } from 'lucide-react';
import { NAV_LINKS, AGENCY_INFO } from '../data/portfolioData.ts';

interface NavbarProps {
  darkMode: boolean;
  onToggleTheme: () => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ darkMode, onToggleTheme, onOpenContact }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      id="navbar-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3.5 bg-[#050605]/85 light:bg-[#f8faf8]/85 backdrop-blur-md border-b border-white/[0.08] light:border-black/[0.08]'
          : 'py-5 sm:py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Wordmark */}
          <a
            href="#hero"
            id="nav-logo"
            className="group flex items-center gap-2.5 focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#12b85a] to-[#075c32] p-0.5 flex items-center justify-center shadow-sm shadow-[#12b85a]/20 group-hover:shadow-[#39ff88]/40 transition-all duration-300">
              <div className="w-full h-full bg-[#0a0d0b] light:bg-[#ffffff] rounded-[6px] flex items-center justify-center">
                <span className="font-display font-extrabold text-sm text-[#39ff88] light:text-[#075c32] tracking-tighter">
                  P
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-base tracking-tight text-[#f4f7f4] light:text-[#0d140f] group-hover:text-[#39ff88] transition-colors">
                Pinnacle Digital
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav id="nav-desktop-links" className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-[#a0ada3] light:text-[#4a594e] hover:text-[#39ff88] light:hover:text-[#075c32] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#39ff88] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Actions: Theme toggle & CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle Button with minimum touch target */}
            <button
              id="theme-toggle-btn"
              onClick={onToggleTheme}
              aria-label={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="w-10 h-10 min-h-[44px] min-w-[44px] rounded-full border border-white/10 light:border-black/10 flex items-center justify-center text-[#a0ada3] light:text-[#4a594e] hover:text-[#39ff88] light:hover:text-[#075c32] hover:border-[#12b85a]/40 transition-all bg-white/[0.03] light:bg-black/[0.03]"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Desktop CTA */}
            <button
              id="nav-cta-btn"
              onClick={onOpenContact}
              className="group hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs md:text-sm font-semibold text-[#f4f7f4] bg-[#121614] light:bg-[#0d140f] border border-white/15 light:border-black/15 rounded-full hover:border-[#39ff88]/50 hover:bg-[#151c18] light:hover:bg-[#1a231e] transition-all duration-300 shadow-sm"
            >
              <span>Get In Touch</span>
              <div className="w-5 h-5 rounded-full bg-[#12b85a] group-hover:bg-[#39ff88] text-[#050605] flex items-center justify-center transition-colors">
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </button>

            {/* Mobile menu hamburger with minimum touch target */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="md:hidden w-11 h-11 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-[#a0ada3] hover:text-[#f4f7f4] hover:bg-white/[0.05] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-panel"
          className="md:hidden bg-[#0a0d0b] light:bg-[#ffffff] border-b border-white/10 light:border-black/10 px-5 sm:px-6 py-6 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200"
        >
          <div className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-[#f4f7f4] light:text-[#0d140f] hover:text-[#39ff88] transition-colors min-h-[44px] flex items-center px-2 rounded-lg hover:bg-white/[0.04]"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 mt-2 border-t border-white/10 light:border-black/10 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="w-full min-h-[48px] flex items-center justify-center gap-2 py-3 px-4 bg-[#12b85a] hover:bg-[#39ff88] text-[#050605] font-semibold rounded-full text-sm transition-colors shadow-lg shadow-[#12b85a]/20"
              >
                <span>Get In Touch</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <div className="text-xs text-[#a0ada3] text-center pt-1">
                {AGENCY_INFO.availability}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
