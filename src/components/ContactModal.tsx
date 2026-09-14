import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  Send,
  ChevronDown,
  Search,
  Copy,
  Check,
  Mail,
  MessageCircle,
  FileText,
  DollarSign,
  Briefcase,
  Phone,
} from 'lucide-react';
import { COUNTRY_CODES, CountryCode } from '../data/countryCodes.ts';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPlanId?: string;
}

const INDUSTRY_OPTIONS = [
  'Restaurants & Food / Beverage',
  'E-Commerce & Retail Brands',
  'Hospitality, Cafes & Lounges',
  'Health, Fitness & Wellness',
  'Technology, SaaS & AI',
  'Real Estate & Architecture',
  'Fashion, Beauty & Luxury',
  'Professional & Financial Services',
  'Media, Entertainment & Creative',
  'Other / Emerging Industry',
];

const BUDGET_PRESETS = [
  { id: '799', label: '$799', subtext: 'Starter Sprint', value: '$799 (Starter Sprint)' },
  { id: '1599', label: '$1,599', subtext: 'Growth Studio · Popular', value: '$1,599 (Growth Studio)' },
  { id: '3200', label: '$3,200', subtext: 'Pinnacle Experience', value: '$3,200 (Pinnacle Experience)' },
  { id: 'custom', label: 'Custom Price', subtext: 'Choose desired budget', value: 'Custom Price' },
];

const QUICK_CUSTOM_BUDGETS = ['$500 – $750', '$1,000 – $1,500', '$2,000 – $3,000', '$4,000+'];

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, defaultPlanId }) => {
  const [submitted, setSubmitted] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>(
    COUNTRY_CODES.find((c) => c.code === '+254') || COUNTRY_CODES[0]
  );
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsappNumber: '',
    industry: INDUSTRY_OPTIONS[0],
    budgetType: '1599',
    customBudget: '',
    message: '',
  });

  const countryDropdownRef = useRef<HTMLDivElement>(null);

  // Close country dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(event.target as Node)
      ) {
        setCountryDropdownOpen(false);
      }
    };
    if (countryDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [countryDropdownOpen]);

  // Sync default plan if passed
  useEffect(() => {
    if (defaultPlanId === 'starter') setFormData((prev) => ({ ...prev, budgetType: '799' }));
    else if (defaultPlanId === 'growth') setFormData((prev) => ({ ...prev, budgetType: '1599' }));
    else if (defaultPlanId === 'premier') setFormData((prev) => ({ ...prev, budgetType: '3200' }));
  }, [defaultPlanId, isOpen]);

  // Lock body scroll and listen for Escape key to close modal
  useEffect(() => {
    if (!isOpen) return;
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalStyle;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredCountries = COUNTRY_CODES.filter(
    (c) =>
      c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
      c.code.includes(countrySearch) ||
      c.iso.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('pinnacledigital701@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('+254119731229');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const selectedBudgetText =
    formData.budgetType === 'custom'
      ? formData.customBudget
        ? `Custom: ${formData.customBudget}`
        : 'Custom Budget'
      : BUDGET_PRESETS.find((b) => b.id === formData.budgetType)?.value || '$1,599 (Growth Studio)';

  const fullWhatsAppNumber = `${selectedCountry.code} ${formData.whatsappNumber.trim()}`;

  const whatsappMessageUrl = `https://wa.me/254119731229?text=${encodeURIComponent(
    `Hello Pinnacle Digital! I am ${formData.name || 'a client'}. I just submitted a website inquiry for my business in ${formData.industry} (Budget: ${selectedBudgetText}). I am sending our project details and asset document over to pinnacledigital701@gmail.com.`
  )}`;

  const mailtoUrl = `mailto:pinnacledigital701@gmail.com?subject=${encodeURIComponent(
    `Project Documents & Assets - ${formData.name || 'Website Inquiry'} (${formData.industry})`
  )}&body=${encodeURIComponent(
    `Hello Pinnacle Team,\n\nHere are the details and assets for our project:\n\n- Client Name: ${formData.name}\n- Work Email: ${formData.email}\n- WhatsApp: ${fullWhatsAppNumber}\n- Industry: ${formData.industry}\n- Budget: ${selectedBudgetText}\n\nProject Overview:\n${formData.message}\n\nPlease find our attached documents / Google Drive link with our brand images, logo, and copy below:\n[INSERT ATTACHMENTS OR DRIVE LINK HERE]\n\nThank you!`
  )}`;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Floating Viewport Exit Button - Always visible regardless of scroll depth */}
      <button
        onClick={onClose}
        id="contact-modal-floating-close"
        aria-label="Close modal (Escape)"
        className="fixed top-3 sm:top-5 right-3 sm:right-6 z-[60] w-11 h-11 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-[#121c15]/90 light:bg-white/95 border border-white/20 light:border-black/15 text-[#a0ada3] hover:text-[#39ff88] light:hover:text-[#075c32] hover:bg-[#1a281e] light:hover:bg-gray-100 hover:scale-105 active:scale-95 transition-all shadow-xl cursor-pointer"
        title="Close (Escape)"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Scrollable container starting from top with comfortable padding */}
      <div className="min-h-full w-full flex items-start justify-center p-3 sm:p-5 md:p-6 pt-6 sm:pt-10 pb-16">
        <div
          className="relative w-full max-w-2xl rounded-[32px] clay-modal border border-white/15 light:border-black/15 p-5 sm:p-8 md:p-10 text-[#f4f7f4] light:text-[#0d140f] overflow-hidden transition-all shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Claymorphic Background Ambient Lights */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#12b85a]/15 rounded-full blur-3xl pointer-events-none -z-0" />
          <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-[#39ff88]/10 rounded-full blur-3xl pointer-events-none -z-0" />

          {/* Close Button inside card with pillowy clay styling */}
          <button
            onClick={onClose}
            id="contact-modal-close"
            aria-label="Close Contact Modal"
            className="absolute top-4 sm:top-6 right-4 sm:right-6 w-11 h-11 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-white/[0.08] light:bg-black/[0.06] border border-white/15 light:border-black/12 text-[#a0ada3] hover:text-[#39ff88] light:hover:text-[#075c32] hover:bg-white/[0.16] light:hover:bg-black/[0.1] transition-all z-30 shadow-sm cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

        {submitted ? (
          /* ==========================================================================
             Post-Submission Next Steps Popup (Document format email & WhatsApp prompt)
             ========================================================================== */
          <div className="py-2 sm:py-4 animate-in fade-in zoom-in-95 duration-300">
            {/* Header Badge */}
            <div className="flex flex-col items-center text-center mb-6 sm:mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2ee87a] to-[#0d9b4b] p-0.5 shadow-[0_12px_24px_-6px_rgba(18,184,90,0.5),inset_0_2px_4px_rgba(255,255,255,0.6)] flex items-center justify-center mb-4">
                <div className="w-full h-full bg-[#07170e] light:bg-[#ffffff] rounded-[14px] flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-[#39ff88] light:text-[#075c32]" />
                </div>
              </div>
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-[2rem] text-[#f4f7f4] light:text-[#0d140f] tracking-tight">
                Inquiry Submitted!
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#a0ada3] light:text-[#4a594e] max-w-lg leading-relaxed">
                Thank you, <span className="text-[#39ff88] light:text-[#075c32] font-semibold">{formData.name}</span>! To fast-track your project and allow our design architect to prepare your custom scope, please complete the two steps below:
              </p>
            </div>

            {/* Step 1: Send Documents & Assets Card */}
            <div className="space-y-4">
              <div className="clay-box p-5 sm:p-6 relative overflow-hidden group border border-white/15 light:border-black/10">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-b from-[#12b85a]/30 to-[#075c32]/30 border border-[#39ff88]/30 flex items-center justify-center shrink-0 text-[#39ff88] light:text-[#075c32] shadow-inner">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#39ff88] light:text-[#075c32]">
                        Step 01 · Essential
                      </span>
                    </div>
                    <h4 className="font-display font-bold text-base sm:text-lg text-[#f4f7f4] light:text-[#0d140f] mb-1.5">
                      Send your website brief, requirements & brand assets
                    </h4>
                    <p className="text-xs sm:text-sm text-[#a0ada3] light:text-[#4a594e] leading-relaxed mb-3.5">
                      Please compile what you would want for your website, reference links, and any images, logos, and assets in a document format (PDF, Word, or Google Drive / Docs link) and send it directly to our official email:
                    </p>

                    {/* Email Display & Actions */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 p-3 rounded-xl bg-black/40 light:bg-black/[0.03] border border-white/10 light:border-black/10">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Mail className="w-4 h-4 text-[#39ff88] light:text-[#075c32] shrink-0" />
                        <span className="font-mono text-xs sm:text-sm font-semibold text-[#f4f7f4] light:text-[#0d140f] truncate select-all">
                          pinnacledigital701@gmail.com
                        </span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={handleCopyEmail}
                          className="min-h-[38px] px-3.5 py-1.5 rounded-lg clay-btn-secondary text-xs font-semibold text-[#f4f7f4] light:text-[#0d140f] flex items-center gap-1.5 hover:text-[#39ff88]"
                        >
                          {copiedEmail ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-[#39ff88]" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy Email</span>
                            </>
                          )}
                        </button>
                        <a
                          href={mailtoUrl}
                          className="min-h-[38px] px-3.5 py-1.5 rounded-lg bg-[#12b85a] hover:bg-[#39ff88] text-[#050605] text-xs font-bold flex items-center gap-1.5 transition-colors"
                        >
                          <span>Open Email</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Send WhatsApp Message Card */}
              <div className="clay-box p-5 sm:p-6 relative overflow-hidden group border border-white/15 light:border-black/10">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-b from-[#25D366]/30 to-[#075c32]/30 border border-[#25D366]/40 flex items-center justify-center shrink-0 text-[#25D366] shadow-inner">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#25D366]">
                        Step 02 · Fast Track
                      </span>
                    </div>
                    <h4 className="font-display font-bold text-base sm:text-lg text-[#f4f7f4] light:text-[#0d140f] mb-1.5">
                      Send us a confirmation message on WhatsApp
                    </h4>
                    <p className="text-xs sm:text-sm text-[#a0ada3] light:text-[#4a594e] leading-relaxed mb-3.5">
                      After emailing your document, send us a quick message to our official WhatsApp number so our team can immediately acknowledge receipt and schedule your strategy call:
                    </p>

                    {/* WhatsApp Display & Actions */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 p-3 rounded-xl bg-black/40 light:bg-black/[0.03] border border-white/10 light:border-black/10">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-lg">🇰🇪</span>
                        <span className="font-mono text-xs sm:text-sm font-semibold text-[#f4f7f4] light:text-[#0d140f] select-all">
                          +254 119 731 229
                        </span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={handleCopyPhone}
                          className="min-h-[38px] px-3.5 py-1.5 rounded-lg clay-btn-secondary text-xs font-semibold text-[#f4f7f4] light:text-[#0d140f] flex items-center gap-1.5 hover:text-[#39ff88]"
                        >
                          {copiedPhone ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-[#39ff88]" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy Number</span>
                            </>
                          )}
                        </button>
                        <a
                          href={whatsappMessageUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="min-h-[38px] px-4 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-[#050605] text-xs font-bold flex items-center gap-1.5 transition-colors shadow-md shadow-[#25D366]/20"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Chat on WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Inquiry Summary Mini Card */}
              <div className="px-4 py-3 rounded-xl bg-white/[0.03] light:bg-black/[0.02] border border-white/10 light:border-black/10 text-xs text-[#a0ada3] light:text-[#4a594e] flex flex-wrap items-center justify-between gap-2">
                <span>
                  <strong className="text-[#f4f7f4] light:text-[#0d140f]">Industry:</strong> {formData.industry}
                </span>
                <span>
                  <strong className="text-[#f4f7f4] light:text-[#0d140f]">Budget:</strong> {selectedBudgetText}
                </span>
                <span>
                  <strong className="text-[#f4f7f4] light:text-[#0d140f]">Your WhatsApp:</strong> {fullWhatsAppNumber || 'Not provided'}
                </span>
              </div>
            </div>

            {/* Done Action */}
            <div className="mt-6 sm:mt-8 flex justify-center">
              <button
                type="button"
                onClick={handleReset}
                id="contact-modal-done-btn"
                className="clay-btn-submit min-h-[48px] px-8 py-3 text-[#050605] font-bold text-sm"
              >
                Done & Return to Site
              </button>
            </div>
          </div>
        ) : (
          /* ==========================================================================
             Interactive Claymorphic Form
             ========================================================================== */
          <div>
            {/* Modal Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] light:bg-black/[0.05] border border-white/15 light:border-black/10 text-xs font-bold text-[#39ff88] light:text-[#075c32] uppercase tracking-wider mb-3 shadow-inner">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Initiate Project</span>
            </div>

            <h3 className="font-display font-extrabold text-2xl sm:text-3xl md:text-[2.1rem] text-[#f4f7f4] light:text-[#0d140f] tracking-tight">
              Let's create something better.
            </h3>
            <p className="text-xs sm:text-sm text-[#a0ada3] light:text-[#4a594e] mt-1.5 mb-6 leading-relaxed">
              Tell us about your brand vision, industry, and project scope.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {/* Row 1: Your Name & Work Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#a0ada3] light:text-[#4a594e] mb-1.5">
                    Your Name <span className="text-[#39ff88]">*</span>
                  </label>
                  <div className="clay-field px-3.5 py-2 flex items-center">
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Mateo Sanchez"
                      className="w-full bg-transparent text-sm text-[#f4f7f4] light:text-[#0d140f] placeholder-[#67756b] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#a0ada3] light:text-[#4a594e] mb-1.5">
                    Work Email <span className="text-[#39ff88]">*</span>
                  </label>
                  <div className="clay-field px-3.5 py-2 flex items-center">
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. client@company.com"
                      className="w-full bg-transparent text-sm text-[#f4f7f4] light:text-[#0d140f] placeholder-[#67756b] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: WhatsApp Number with Scrollable / Searchable Country Code Selector */}
              <div>
                <label className="block text-xs font-bold text-[#a0ada3] light:text-[#4a594e] mb-1.5">
                  WhatsApp Number <span className="text-[#39ff88]">*</span>
                  <span className="ml-1.5 text-[11px] font-normal text-[#67756b] light:text-[#78897d]">
                    (Select country code & enter phone number)
                  </span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 sm:gap-3">
                  {/* Country Code Picker Dropdown Button */}
                  <div className="sm:col-span-5 relative" ref={countryDropdownRef}>
                    <button
                      type="button"
                      onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
                      id="country-code-selector"
                      className="w-full clay-field px-3.5 py-2.5 min-h-[46px] flex items-center justify-between text-xs sm:text-sm text-[#f4f7f4] light:text-[#0d140f] hover:border-[#39ff88]/50 transition-colors"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="text-base">{selectedCountry.flag}</span>
                        <span className="font-semibold">{selectedCountry.code}</span>
                        <span className="text-[#a0ada3] light:text-[#4a594e] text-xs truncate max-w-[80px]">
                          {selectedCountry.name}
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-[#a0ada3] transition-transform duration-200 ${
                          countryDropdownOpen ? 'rotate-180 text-[#39ff88]' : ''
                        }`}
                      />
                    </button>

                    {/* Scrollable & Searchable Country List Dropdown */}
                    {countryDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 sm:w-72 mt-2 z-30 clay-modal p-2.5 border border-white/20 light:border-black/15 shadow-2xl max-h-64 overflow-hidden flex flex-col animate-in fade-in slide-in-from-top-2 duration-150">
                        {/* Search input */}
                        <div className="clay-field px-2.5 py-1.5 mb-2 flex items-center gap-2">
                          <Search className="w-3.5 h-3.5 text-[#a0ada3]" />
                          <input
                            type="text"
                            value={countrySearch}
                            onChange={(e) => setCountrySearch(e.target.value)}
                            placeholder="Search country or code..."
                            className="w-full bg-transparent text-xs text-[#f4f7f4] light:text-[#0d140f] placeholder-[#67756b] focus:outline-none"
                            autoFocus
                          />
                        </div>

                        {/* Country items scroll list */}
                        <div className="overflow-y-auto space-y-0.5 pr-1 max-h-48 text-xs">
                          {filteredCountries.length > 0 ? (
                            filteredCountries.map((c) => (
                              <button
                                key={`${c.iso}-${c.code}`}
                                type="button"
                                onClick={() => {
                                  setSelectedCountry(c);
                                  setCountryDropdownOpen(false);
                                  setCountrySearch('');
                                }}
                                className={`w-full px-2.5 py-2 rounded-lg flex items-center justify-between transition-colors text-left ${
                                  selectedCountry.code === c.code && selectedCountry.iso === c.iso
                                    ? 'bg-[#12b85a]/20 text-[#39ff88] font-bold'
                                    : 'text-[#f4f7f4] light:text-[#0d140f] hover:bg-white/[0.08] light:hover:bg-black/[0.05]'
                                }`}
                              >
                                <div className="flex items-center gap-2 truncate">
                                  <span className="text-base">{c.flag}</span>
                                  <span className="truncate">{c.name}</span>
                                </div>
                                <span className="font-mono text-[11px] text-[#a0ada3] light:text-[#78897d] ml-2 shrink-0">
                                  {c.code}
                                </span>
                              </button>
                            ))
                          ) : (
                            <div className="py-4 text-center text-xs text-[#a0ada3]">
                              No matching country
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Phone number digits */}
                  <div className="sm:col-span-7">
                    <div className="clay-field px-3.5 py-2.5 min-h-[46px] flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#39ff88] light:text-[#075c32] shrink-0" />
                      <input
                        type="tel"
                        required
                        value={formData.whatsappNumber}
                        onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                        placeholder="e.g. 119 731 229"
                        className="w-full bg-transparent text-sm text-[#f4f7f4] light:text-[#0d140f] placeholder-[#67756b] focus:outline-none font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 3: Business Industry Selection (replacing previous service) */}
              <div>
                <label className="block text-xs font-bold text-[#a0ada3] light:text-[#4a594e] mb-1.5">
                  Business Industry <span className="text-[#39ff88]">*</span>
                </label>
                <div className="clay-field px-3.5 py-2 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-[#39ff88] light:text-[#075c32] shrink-0" />
                  <select
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full bg-transparent text-xs sm:text-sm text-[#f4f7f4] light:text-[#0d140f] focus:outline-none cursor-pointer py-1"
                  >
                    {INDUSTRY_OPTIONS.map((ind) => (
                      <option
                        key={ind}
                        value={ind}
                        className="bg-[#0c100e] light:bg-[#ffffff] text-[#f4f7f4] light:text-[#0d140f]"
                      >
                        {ind}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 4: Estimated Budget (Updated Prices + Custom Option) */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
                  <label className="block text-xs font-bold text-[#a0ada3] light:text-[#4a594e]">
                    Estimated Budget <span className="text-[#39ff88]">*</span>
                  </label>
                  <span className="text-[11px] text-[#67756b] light:text-[#78897d]">
                    Choose one of our updated packages or select Custom Price
                  </span>
                </div>

                {/* 4 Claymorphic Budget Pills */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {BUDGET_PRESETS.map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, budgetType: b.id })}
                      className={`clay-chip-budget p-2.5 sm:p-3 text-left flex flex-col justify-between min-h-[64px] ${
                        formData.budgetType === b.id ? 'selected' : ''
                      }`}
                    >
                      <span className="font-display font-extrabold text-sm sm:text-base text-[#f4f7f4] light:text-[#0d140f] tracking-tight">
                        {b.label}
                      </span>
                      <span className="text-[10px] sm:text-[11px] text-[#a0ada3] light:text-[#4a594e] truncate mt-0.5">
                        {b.subtext}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Custom Budget Input when "custom" is active */}
                {formData.budgetType === 'custom' && (
                  <div className="mt-3 p-3.5 rounded-2xl bg-white/[0.04] light:bg-black/[0.03] border border-[#39ff88]/30 animate-in fade-in duration-200">
                    <label className="block text-[11px] font-bold text-[#39ff88] light:text-[#075c32] mb-1.5">
                      Enter Your Desired Budget Price ($)
                    </label>
                    <div className="clay-field px-3 py-2 flex items-center gap-2 mb-2">
                      <DollarSign className="w-4 h-4 text-[#39ff88] light:text-[#075c32] shrink-0" />
                      <input
                        type="text"
                        required={formData.budgetType === 'custom'}
                        value={formData.customBudget}
                        onChange={(e) => setFormData({ ...formData, customBudget: e.target.value })}
                        placeholder="e.g. $2,500 or $5,000+"
                        className="w-full bg-transparent text-xs sm:text-sm text-[#f4f7f4] light:text-[#0d140f] placeholder-[#67756b] focus:outline-none font-semibold"
                        autoFocus
                      />
                    </div>
                    {/* Quick suggest chips */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[10px] text-[#67756b] mr-1">Quick Select:</span>
                      {QUICK_CUSTOM_BUDGETS.map((chip) => (
                        <button
                          key={chip}
                          type="button"
                          onClick={() => setFormData({ ...formData, customBudget: chip })}
                          className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-white/[0.06] light:bg-black/[0.05] hover:bg-[#39ff88]/20 hover:text-[#39ff88] text-[#a0ada3] border border-white/10 transition-colors"
                        >
                          {chip}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Row 5: Project Overview & Goals */}
              <div>
                <label className="block text-xs font-bold text-[#a0ada3] light:text-[#4a594e] mb-1.5">
                  Project Overview & Goals <span className="text-[#39ff88]">*</span>
                </label>
                <div className="clay-field px-3.5 py-2.5">
                  <textarea
                    rows={3}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Share what you would want for your website, key goals, challenges, and any visual inspirations..."
                    className="w-full bg-transparent text-xs sm:text-sm text-[#f4f7f4] light:text-[#0d140f] placeholder-[#67756b] focus:outline-none resize-none leading-relaxed"
                  />
                </div>
              </div>

              {/* Submit and Cancel Action Row */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  id="contact-form-cancel"
                  className="min-h-[50px] px-5 sm:px-6 rounded-full clay-btn-secondary text-[#f4f7f4] light:text-[#0d140f] font-semibold text-xs sm:text-sm hover:border-[#39ff88]/40 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  id="contact-form-submit"
                  className="flex-1 min-h-[50px] clay-btn-submit inline-flex items-center justify-center gap-3 py-3.5 px-6 text-[#050605] font-extrabold text-sm tracking-wide transition-all cursor-pointer"
                >
                  <span>Submit Inquiry</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>

              <p className="text-center text-[11px] text-[#67756b] light:text-[#a0ada3]">
                Strict NDA respected · Response & scope delivered within 24 hours.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  </div>
  );
};
