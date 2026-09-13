import React from 'react';
import { Sparkles, ArrowUpRight } from 'lucide-react';
import { INSIGHTS } from '../data/portfolioData.ts';

export const InsightsSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-[#050605] light:bg-[#f8faf8] border-t border-white/[0.06] light:border-black/[0.06] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] light:bg-black/[0.04] border border-white/10 light:border-black/10 text-xs font-semibold text-[#39ff88] light:text-[#075c32] uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Latest Articles</span>
          </div>
          <h2
            id="insights-heading"
            className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[52px] tracking-tight text-[#f4f7f4] light:text-[#0d140f]"
          >
            Where strategy <br className="hidden sm:inline" /> meets creativity
          </h2>
        </div>

        {/* 3 Editorial Article Cards Grid matching reference */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {INSIGHTS.map((article) => (
            <article
              key={article.id}
              id={`insight-card-${article.id}`}
              className="group rounded-3xl glass-card border border-white/10 light:border-black/10 overflow-hidden flex flex-col justify-between hover:border-[#39ff88]/30 transition-all duration-300 shadow-xl cursor-pointer"
            >
              {/* Card Image Area */}
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#101512]">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter contrast-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050605]/60 via-transparent to-transparent opacity-60" />
              </div>

              {/* Bottom Details Bar matching reference */}
              <div className="p-6 flex items-center justify-between gap-3">
                <h3 className="font-display font-bold text-base sm:text-lg text-[#f4f7f4] light:text-[#0d140f] group-hover:text-[#39ff88] transition-colors line-clamp-1">
                  {article.title}
                </h3>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/[0.06] light:bg-black/[0.06] border border-white/10 light:border-black/10 text-[#a0ada3] light:text-[#4a594e] shrink-0">
                  {article.badge}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
