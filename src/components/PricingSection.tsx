import React from 'react';
import { ArrowUpRight, Check, Sparkles, Zap } from 'lucide-react';
import { PRICING_PLANS } from '../data/portfolioData.ts';

interface PricingSectionProps {
  onOpenContact: (planId?: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenContact }) => {
  return (
    <section
      id="pricing"
      className="section-fluid-py bg-[#050605] light:bg-[#f8faf8] border-t border-white/[0.06] light:border-black/[0.06] transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] light:bg-black/[0.04] border border-white/10 light:border-black/10 text-xs font-semibold text-[#39ff88] light:text-[#075c32] uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pricing Plans</span>
          </div>
          <h2
            id="pricing-heading"
            className="font-display font-bold text-[clamp(1.75rem,4.2vw,3.25rem)] tracking-tight text-[#f4f7f4] light:text-[#0d140f]"
          >
            Flexible design support <br className="hidden sm:inline" /> for growing brands
          </h2>
          <p className="mt-3.5 sm:mt-4 text-xs sm:text-sm md:text-base text-[#a0ada3] light:text-[#4a594e] max-w-xl">
            Transparent, sprint-based partnerships. No hidden fees, no agency bureaucracy.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto items-stretch">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.id}
              id={`pricing-card-${plan.id}`}
              className={`relative rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-9 flex flex-col justify-between transition-all duration-300 ${
                plan.highlighted
                  ? 'glass-card border-2 border-[#12b85a]/50 light:border-[#12b85a]/70 shadow-2xl shadow-[#12b85a]/15'
                  : 'glass-card border border-white/10 light:border-black/10 hover:border-white/20'
              }`}
            >
              {/* Optional popular badge */}
              {plan.badge && (
                <div className="absolute -top-3.5 right-6 sm:right-8">
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#12b85a] text-[#050605] text-xs font-bold shadow-md shadow-[#12b85a]/30">
                    <Zap className="w-3 h-3 fill-current" />
                    <span>{plan.badge}</span>
                  </div>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-semibold text-[#a0ada3] light:text-[#4a594e]">
                    {plan.name}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-[#12b85a]" />
                </div>

                <div className="mt-3 sm:mt-4 flex items-baseline gap-1">
                  <span className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#f4f7f4] light:text-[#0d140f] tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-xs sm:text-sm text-[#a0ada3] light:text-[#78897d] font-medium">
                    {plan.period}
                  </span>
                </div>

                <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-[#a0ada3] light:text-[#4a594e] leading-relaxed pb-5 sm:pb-6 border-b border-white/[0.08] light:border-black/[0.08]">
                  {plan.description}
                </p>

                <div className="mt-5 sm:mt-6">
                  <span className="text-[11px] sm:text-xs font-semibold text-[#f4f7f4] light:text-[#0d140f] uppercase tracking-wider">
                    What's Included:
                  </span>
                  <ul className="mt-3.5 sm:mt-4 space-y-3 sm:space-y-3.5">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 sm:gap-3">
                        <div className="w-4 h-4 rounded-full bg-[#12b85a]/15 text-[#39ff88] light:text-[#075c32] flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                        <span className="text-xs sm:text-sm text-[#f4f7f4]/90 light:text-[#0d140f]/90">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 sm:mt-10 pt-3 sm:pt-4">
                <button
                  onClick={() => onOpenContact(plan.id)}
                  id={`pricing-btn-${plan.id}`}
                  className={`w-full min-h-[46px] group inline-flex items-center justify-center gap-3 py-3 px-6 rounded-full font-semibold text-sm transition-all duration-300 ${
                    plan.highlighted
                      ? 'bg-[#12b85a] hover:bg-[#39ff88] text-[#050605] shadow-lg shadow-[#12b85a]/25'
                      : 'bg-[#121614] light:bg-[#0d140f] text-[#f4f7f4] hover:bg-[#151c18] border border-white/15 light:border-black/15'
                  }`}
                >
                  <span>{plan.ctaText}</span>
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center transition-transform group-hover:rotate-45 ${
                      plan.highlighted
                        ? 'bg-[#050605] text-[#39ff88]'
                        : 'bg-[#12b85a] text-[#050605]'
                    }`}
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
