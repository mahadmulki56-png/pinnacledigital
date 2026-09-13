import React, { useState } from 'react';
import { ArrowUpRight, Plus, Minus, HelpCircle } from 'lucide-react';
import { FAQS } from '../data/portfolioData.ts';

interface FaqSectionProps {
  onOpenContact: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenContact }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="faq"
      className="py-20 sm:py-28 bg-[#050605] light:bg-[#f8faf8] border-t border-white/[0.06] light:border-black/[0.06] transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Card: Glowing atmospheric prompt card matching reference */}
          <div className="lg:col-span-5 rounded-3xl p-8 sm:p-10 relative overflow-hidden glass-card border border-white/10 light:border-black/10 min-h-[380px] flex flex-col justify-between shadow-2xl">
            {/* Green glowing backdrop gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#075c32]/50 via-[#062b18]/30 to-[#050605] pointer-events-none -z-0" />
            <div className="absolute -top-10 -left-10 w-60 h-60 bg-[#39ff88]/20 rounded-full blur-3xl pointer-events-none -z-0" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.08] light:bg-black/[0.06] border border-white/10 light:border-black/10 text-xs font-semibold text-[#39ff88] light:text-[#075c32] uppercase tracking-wider mb-6">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>FAQ Questions</span>
              </div>

              <h3
                id="faq-left-heading"
                className="font-display font-bold text-3xl sm:text-4xl text-[#f4f7f4] light:text-[#0d140f] tracking-tight leading-tight"
              >
                Got questions about working together?
              </h3>

              <p className="text-xs sm:text-sm text-[#a0ada3] light:text-[#4a594e] mt-4 leading-relaxed">
                Everything you need to know about our sprints, pricing, deliverables, and communication cadence.
              </p>
            </div>

            <div className="relative z-10 mt-8 pt-4">
              <button
                onClick={onOpenContact}
                id="faq-get-in-touch-btn"
                className="group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#12b85a] hover:bg-[#39ff88] text-[#050605] font-semibold text-sm transition-all duration-300 shadow-lg shadow-[#12b85a]/25"
              >
                <span>Get In Touch</span>
                <div className="w-5 h-5 rounded-full bg-[#050605] text-[#39ff88] flex items-center justify-center transition-transform group-hover:rotate-45">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </button>
            </div>
          </div>

          {/* Right Accordion List matching reference */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            {FAQS.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={faq.id}
                  id={`faq-item-${faq.id}`}
                  className="rounded-2xl glass-card border border-white/10 light:border-black/10 overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    aria-expanded={isOpen}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none hover:bg-white/[0.02] light:hover:bg-black/[0.02]"
                  >
                    <span className="font-display font-medium text-base sm:text-lg text-[#f4f7f4] light:text-[#0d140f]">
                      {faq.question}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border transition-all ${
                        isOpen
                          ? 'border-[#39ff88] bg-[#12b85a]/20 text-[#39ff88]'
                          : 'border-white/10 light:border-black/10 text-[#a0ada3]'
                      }`}
                    >
                      {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-[#a0ada3] light:text-[#4a594e] leading-relaxed border-t border-white/[0.05] light:border-black/[0.05] animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
