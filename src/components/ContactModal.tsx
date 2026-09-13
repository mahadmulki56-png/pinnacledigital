import React, { useState } from 'react';
import { X, ArrowUpRight, CheckCircle2, Sparkles, Send } from 'lucide-react';
import { AGENCY_INFO } from '../data/portfolioData.ts';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: 'Web Design & Development',
    budget: '$2,000 - $5,000',
    message: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl rounded-3xl glass-card border border-white/15 light:border-black/15 p-6 sm:p-8 md:p-10 shadow-2xl bg-[#0a0d0b] light:bg-[#ffffff] text-[#f4f7f4] light:text-[#0d140f] my-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle glowing halo in modal top right */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#12b85a]/15 rounded-full blur-3xl pointer-events-none -z-0" />

        {/* Close Button */}
        <button
          onClick={onClose}
          id="contact-modal-close"
          aria-label="Close Contact Modal"
          className="absolute top-5 right-5 p-2 rounded-full text-[#a0ada3] hover:text-[#f4f7f4] hover:bg-white/[0.08] light:hover:bg-black/[0.05] transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-[#12b85a]/20 border border-[#39ff88]/40 flex items-center justify-center text-[#39ff88] mb-6">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#f4f7f4] light:text-[#0d140f]">
              Inquiry Received
            </h3>
            <p className="mt-3 text-sm text-[#a0ada3] light:text-[#4a594e] max-w-md leading-relaxed">
              Thank you for reaching out to {AGENCY_INFO.name}. Arion and our team will review your project requirements and reply within 24 hours.
            </p>
            <button
              onClick={handleReset}
              className="mt-8 px-6 py-2.5 rounded-full bg-[#12b85a] hover:bg-[#39ff88] text-[#050605] font-semibold text-sm transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] light:bg-black/[0.06] border border-white/10 light:border-black/10 text-xs font-semibold text-[#39ff88] light:text-[#075c32] uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Initiate Project</span>
            </div>

            <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#f4f7f4] light:text-[#0d140f]">
              Let's create something better.
            </h3>
            <p className="text-xs sm:text-sm text-[#a0ada3] light:text-[#4a594e] mt-1.5 mb-6">
              Tell us about your brand vision, scope, and timeline.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#a0ada3] light:text-[#4a594e] mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] light:bg-black/[0.03] border border-white/10 light:border-black/10 text-sm text-[#f4f7f4] light:text-[#0d140f] placeholder-[#67756b] focus:outline-none focus:border-[#39ff88]/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#a0ada3] light:text-[#4a594e] mb-1.5">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="sarah@company.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] light:bg-black/[0.03] border border-white/10 light:border-black/10 text-sm text-[#f4f7f4] light:text-[#0d140f] placeholder-[#67756b] focus:outline-none focus:border-[#39ff88]/50 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#a0ada3] light:text-[#4a594e] mb-1.5">
                    Primary Service
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#101512] light:bg-[#ffffff] border border-white/10 light:border-black/10 text-sm text-[#f4f7f4] light:text-[#0d140f] focus:outline-none focus:border-[#39ff88]/50 transition-colors"
                  >
                    <option value="Web Design & Development">Web Design & Development</option>
                    <option value="UI/UX Product Design">UI/UX Product Design</option>
                    <option value="Brand Identity">Brand Identity</option>
                    <option value="Full-Stack Engineering">Full-Stack Engineering</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#a0ada3] light:text-[#4a594e] mb-1.5">
                    Estimated Budget
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#101512] light:bg-[#ffffff] border border-white/10 light:border-black/10 text-sm text-[#f4f7f4] light:text-[#0d140f] focus:outline-none focus:border-[#39ff88]/50 transition-colors"
                  >
                    <option value="$1,800 - $3,500">$1,800 - $3,500 (Starter Sprint)</option>
                    <option value="$3,500 - $7,000">$3,500 - $7,000 (Growth Partner)</option>
                    <option value="$7,000+">$7,000+ (Full Enterprise)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#a0ada3] light:text-[#4a594e] mb-1.5">
                  Project Overview & Goals *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share details about what you want to achieve, timeline, and current challenges..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] light:bg-black/[0.03] border border-white/10 light:border-black/10 text-sm text-[#f4f7f4] light:text-[#0d140f] placeholder-[#67756b] focus:outline-none focus:border-[#39ff88]/50 transition-colors resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  id="contact-form-submit"
                  className="w-full group inline-flex items-center justify-center gap-3 py-3.5 px-6 rounded-full bg-[#12b85a] hover:bg-[#39ff88] text-[#050605] font-semibold text-sm transition-all duration-300 shadow-lg shadow-[#12b85a]/25"
                >
                  <span>Submit Inquiry</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>

              <p className="text-center text-[11px] text-[#67756b] light:text-[#a0ada3]">
                Strict NDA respected. Response guaranteed within 24 hours.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
