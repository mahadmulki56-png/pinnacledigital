import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Sparkles, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/portfolioData.ts';

export const TrustSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prevIdx) => (prevIdx === 0 ? TESTIMONIALS.length - 1 : prevIdx - 1));
  };

  const next = () => {
    setCurrentIndex((prevIdx) => (prevIdx === TESTIMONIALS.length - 1 ? 0 : prevIdx + 1));
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section className="py-20 sm:py-28 bg-[#050605] light:bg-[#f8faf8] border-t border-white/[0.06] light:border-black/[0.06] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] light:bg-black/[0.04] border border-white/10 light:border-black/10 text-xs font-semibold text-[#39ff88] light:text-[#075c32] uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Client Feedback</span>
          </div>
          <h2
            id="trust-heading"
            className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[52px] tracking-tight text-[#f4f7f4] light:text-[#0d140f]"
          >
            Trusted by ambitious <br className="hidden sm:inline" /> teams worldwide
          </h2>
        </div>

        {/* Testimonial Editorial Card Container matching reference */}
        <div className="max-w-5xl mx-auto rounded-3xl sm:rounded-[36px] glass-card border border-white/10 light:border-black/10 p-6 sm:p-10 lg:p-12 overflow-hidden shadow-2xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content Area */}
            <div className="lg:col-span-6 flex flex-col justify-between h-full">
              <div>
                {/* Header tag and index indicators */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/[0.06] light:bg-black/[0.06] border border-white/10 light:border-black/10 text-[#f4f7f4] light:text-[#0d140f]">
                    Customer Stories
                  </span>

                  {/* Bullet / numeric indicators (1, 2, 3) */}
                  <div className="flex items-center gap-1.5">
                    {TESTIMONIALS.map((item, idx) => (
                      <button
                        key={item.id}
                        onClick={() => setCurrentIndex(idx)}
                        aria-label={`Go to testimonial ${idx + 1}`}
                        className={`w-6 h-6 rounded-full text-[11px] font-bold flex items-center justify-center transition-all ${
                          currentIndex === idx
                            ? 'bg-[#12b85a] text-[#050605] shadow-sm'
                            : 'bg-white/[0.05] light:bg-black/[0.05] text-[#a0ada3] hover:text-[#f4f7f4]'
                        }`}
                      >
                        {idx + 1}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quote */}
                <div className="relative">
                  <p className="text-base sm:text-lg lg:text-xl text-[#f4f7f4] light:text-[#0d140f] font-normal leading-relaxed italic">
                    "{current.quote}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="mt-6 pt-6 border-t border-white/[0.08] light:border-black/[0.08]">
                  <h4 className="font-display font-bold text-base text-[#f4f7f4] light:text-[#0d140f]">
                    {current.author}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#a0ada3] light:text-[#4a594e]">
                    {current.role}, {current.company}
                  </p>
                  {current.stats && (
                    <span className="inline-block mt-2 text-xs font-semibold text-[#39ff88] light:text-[#075c32]">
                      ✦ {current.stats}
                    </span>
                  )}
                </div>
              </div>

              {/* Navigation Arrows (Prev / Next) */}
              <div className="flex items-center gap-3 mt-8">
                <button
                  onClick={prev}
                  id="testimonial-prev-btn"
                  aria-label="Previous testimonial"
                  className="w-10 h-10 rounded-full border border-white/15 light:border-black/15 bg-white/[0.03] light:bg-black/[0.03] text-[#f4f7f4] light:text-[#0d140f] flex items-center justify-center hover:border-[#39ff88]/50 hover:bg-[#12b85a]/15 transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={next}
                  id="testimonial-next-btn"
                  aria-label="Next testimonial"
                  className="w-10 h-10 rounded-full border border-white/15 light:border-black/15 bg-white/[0.03] light:bg-black/[0.03] text-[#f4f7f4] light:text-[#0d140f] flex items-center justify-center hover:border-[#39ff88]/50 hover:bg-[#12b85a]/15 transition-all"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Image Area (matching reference photo) */}
            <div className="lg:col-span-6">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 light:border-black/10 shadow-xl">
                <img
                  src={current.image}
                  alt={current.author}
                  className="w-full h-full object-cover object-center filter contrast-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050605]/40 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
