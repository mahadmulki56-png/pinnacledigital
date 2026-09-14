import React, { useState, useEffect, useRef } from 'react';
import {
  Lock,
  Trash2,
  ChevronDown,
  ChevronUp,
  Inbox,
  Clock,
  Mail,
  Phone,
  Briefcase,
  DollarSign,
  AlertCircle,
  Check,
  RefreshCw,
} from 'lucide-react';
import { PinnacleLogo } from './PinnacleLogo.tsx';
import { Inquiry } from '../types.ts';

interface InquiriesDashboardProps {
  onLock: () => void;
}

export const InquiriesDashboard: React.FC<InquiriesDashboardProps> = ({ onLock }) => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [connectionStatus, setConnectionStatus] = useState<'live' | 'reconnecting'>('reconnecting');
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);
  const [newlyArrivedIds, setNewlyArrivedIds] = useState<Set<string>>(new Set());

  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Initial Data Fetch
  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/inquiries');
      if (res.status === 401) {
        onLock();
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setInquiries(data.inquiries || []);
      }
    } catch (err) {
      console.error('Error fetching inquiries list:', err);
    } finally {
      setLoading(false);
    }
  };

  // 2. Setup Real-time SSE Stream
  const connectSSE = () => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    const es = new EventSource('/api/inquiries/stream');
    eventSourceRef.current = es;

    es.addEventListener('connected', () => {
      setConnectionStatus('live');
    });

    es.onopen = () => {
      setConnectionStatus('live');
    };

    es.addEventListener('new-inquiry', (e: MessageEvent) => {
      try {
        const newInq: Inquiry = JSON.parse(e.data);
        setInquiries((prev) => {
          // Avoid duplicates
          if (prev.some((item) => item.id === newInq.id)) return prev;
          return [newInq, ...prev];
        });

        // Flash highlight for newly arrived item
        setNewlyArrivedIds((prev) => new Set(prev).add(newInq.id));
        setTimeout(() => {
          setNewlyArrivedIds((prev) => {
            const copy = new Set(prev);
            copy.delete(newInq.id);
            return copy;
          });
        }, 3000);
      } catch (err) {
        console.error('SSE new-inquiry parse error:', err);
      }
    });

    es.addEventListener('delete-inquiry', (e: MessageEvent) => {
      try {
        const { id } = JSON.parse(e.data);
        setInquiries((prev) => prev.filter((item) => item.id !== id));
      } catch (err) {
        console.error('SSE delete-inquiry parse error:', err);
      }
    });

    es.addEventListener('read-inquiry', (e: MessageEvent) => {
      try {
        const { id } = JSON.parse(e.data);
        setInquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, read: true } : item))
        );
      } catch (err) {
        console.error('SSE read-inquiry parse error:', err);
      }
    });

    es.onerror = () => {
      setConnectionStatus('reconnecting');
      es.close();

      // Exponential or steady reconnect backoff
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = setTimeout(() => {
        connectSSE();
      }, 4000);
    };
  };

  useEffect(() => {
    fetchInquiries();
    connectSSE();

    return () => {
      if (eventSourceRef.current) eventSourceRef.current.close();
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
    };
  }, []);

  // Format relative timestamp
  const formatRelativeTime = (isoString: string): string => {
    try {
      const date = new Date(isoString);
      const diffMs = Date.now() - date.getTime();
      const diffMinutes = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMinutes / 60);
      const diffDays = Math.floor(diffHours / 24);

      if (diffMinutes < 1) return 'just now';
      if (diffMinutes < 60) return `${diffMinutes}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      if (diffDays === 1) return 'yesterday';
      return `${diffDays}d ago`;
    } catch {
      return 'recently';
    }
  };

  // Toggle card message expansion and mark as read
  const handleToggleExpand = async (id: string, currentlyRead: boolean) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });

    if (!currentlyRead) {
      try {
        await fetch(`/api/inquiries/${id}/read`, { method: 'PATCH' });
        setInquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, read: true } : item))
        );
      } catch (err) {
        console.error('Error marking inquiry as read:', err);
      }
    }
  };

  // Delete handler
  const handleDelete = async (id: string) => {
    setIsDeletingId(id);
    try {
      const res = await fetch(`/api/inquiries/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setInquiries((prev) => prev.filter((item) => item.id !== id));
        setConfirmDeleteId(null);
      }
    } catch (err) {
      console.error('Error deleting inquiry:', err);
    } finally {
      setIsDeletingId(null);
    }
  };

  // Lock session handler
  const handleLock = async () => {
    try {
      await fetch('/api/auth/lock', { method: 'POST' });
    } catch (err) {
      console.error('Lock error:', err);
    }
    onLock();
  };

  const totalCount = inquiries.length;
  const unreadCount = inquiries.filter((inq) => !inq.read).length;

  return (
    <div className="min-h-screen bg-[#050605] text-[#f4f7f4] flex flex-col selection:bg-[#39ff88]/30 selection:text-[#39ff88]">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-[#050605]/85 backdrop-blur-md border-b border-white/[0.08] px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Brand & Page Title */}
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <PinnacleLogo variant="mark" className="h-8 w-auto shrink-0" />
            <div className="min-w-0">
              <div className="flex items-center gap-2 sm:gap-3">
                <h1 className="font-display font-extrabold text-base sm:text-xl tracking-tight truncate">
                  Live Inquiries
                </h1>
                {/* Live Stream Status Pill */}
                <div
                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide border transition-all ${
                    connectionStatus === 'live'
                      ? 'bg-[#12b85a]/15 text-[#39ff88] border-[#39ff88]/30'
                      : 'bg-amber-500/15 text-amber-300 border-amber-500/30 animate-pulse'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      connectionStatus === 'live' ? 'bg-[#39ff88] animate-ping' : 'bg-amber-400'
                    }`}
                  />
                  <span>{connectionStatus === 'live' ? 'Live' : 'Reconnecting…'}</span>
                </div>
              </div>
              <p className="text-[11px] text-[#a0ada3] hidden sm:block">
                Encrypted at rest · Real-time push delivery
              </p>
            </div>
          </div>

          {/* Counters & Lock Button */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Counts Badge */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs">
              <span className="text-[#a0ada3]">Total:</span>
              <span className="font-bold text-[#f4f7f4]">{totalCount}</span>
              {unreadCount > 0 && (
                <>
                  <span className="text-white/20">·</span>
                  <span className="text-[#39ff88] font-bold">{unreadCount} new</span>
                </>
              )}
            </div>

            {/* Lock Dashboard Button */}
            <button
              onClick={handleLock}
              id="inquiries-dashboard-lock-btn"
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/12 text-xs sm:text-sm font-semibold text-[#f4f7f4] hover:text-[#39ff88] transition-all cursor-pointer shadow-sm active:scale-95"
              title="Lock Dashboard (Clear Session)"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Lock</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <RefreshCw className="w-8 h-8 text-[#39ff88] animate-spin mb-4" />
            <p className="text-sm text-[#a0ada3]">Decrypting live inquiries storage...</p>
          </div>
        ) : inquiries.length === 0 ? (
          /* Finished Empty State */
          <div className="flex flex-col items-center justify-center py-20 sm:py-28 text-center max-w-md mx-auto px-4 animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 flex items-center justify-center mb-5 shadow-inner text-[#a0ada3]">
              <Inbox className="w-8 h-8 text-[#39ff88]/60" />
            </div>
            <h3 className="font-display font-bold text-xl text-[#f4f7f4] mb-2">
              No inquiries yet
            </h3>
            <p className="text-xs sm:text-sm text-[#a0ada3] leading-relaxed">
              New submissions from your contact form will appear here instantly with real-time push delivery.
            </p>
          </div>
        ) : (
          /* Responsive Grid of Glass Cards */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {inquiries.map((inq) => {
              const isExpanded = expandedIds.has(inq.id);
              const isNewArrival = newlyArrivedIds.has(inq.id);
              const isUnread = !inq.read;
              const isConfirmingDelete = confirmDeleteId === inq.id;
              const isDeletingThis = isDeletingId === inq.id;

              return (
                <div
                  key={inq.id}
                  className={`relative rounded-2xl p-5 sm:p-6 transition-all duration-300 backdrop-blur-md ${
                    isUnread
                      ? 'bg-[#101713] border border-[#39ff88]/35 shadow-[0_8px_30px_-6px_rgba(18,184,90,0.18)]'
                      : 'bg-[#101512] border border-white/[0.08] hover:border-white/20'
                  } ${
                    isNewArrival
                      ? 'ring-2 ring-[#39ff88] shadow-[0_0_35px_rgba(57,255,136,0.35)] animate-in fade-in slide-in-from-top-4'
                      : ''
                  }`}
                >
                  {/* Card Header: Relative Time, Unread Chip, and Delete */}
                  <div className="flex items-center justify-between gap-2 mb-3.5">
                    <div className="flex items-center gap-2">
                      {isUnread && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-[#12b85a] text-[#050605] shadow-sm">
                          New
                        </span>
                      )}
                      <div className="flex items-center gap-1.5 text-xs text-[#a0ada3]">
                        <Clock className="w-3 h-3 text-[#39ff88]/70" />
                        <span>{formatRelativeTime(inq.receivedAt)}</span>
                      </div>
                    </div>

                    {/* Delete Action (with inline confirmation) */}
                    <div className="relative">
                      {isConfirmingDelete ? (
                        <div className="flex items-center gap-1.5 bg-rose-950/80 border border-rose-500/40 rounded-full px-2 py-1 animate-in fade-in duration-150">
                          <span className="text-[10px] font-semibold text-rose-300 pl-1">Delete?</span>
                          <button
                            type="button"
                            disabled={isDeletingThis}
                            onClick={() => handleDelete(inq.id)}
                            className="px-2 py-0.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white text-[10px] font-bold transition-all cursor-pointer"
                          >
                            {isDeletingThis ? '…' : 'Yes'}
                          </button>
                          <button
                            type="button"
                            onClick={() => setConfirmDeleteId(null)}
                            className="px-1.5 py-0.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 text-[10px] font-semibold transition-all cursor-pointer"
                          >
                            No
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteId(inq.id)}
                          aria-label="Delete inquiry"
                          className="w-8 h-8 rounded-full bg-white/[0.03] hover:bg-rose-500/20 border border-white/5 hover:border-rose-500/40 text-[#a0ada3] hover:text-rose-400 flex items-center justify-center transition-all cursor-pointer"
                          title="Delete inquiry"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Client Name & Contact Info */}
                  <div className="mb-4">
                    <h3 className="font-display font-bold text-lg text-[#f4f7f4] leading-snug">
                      {inq.name}
                    </h3>

                    <div className="mt-2 space-y-1.5 text-xs">
                      {/* Email */}
                      <a
                        href={`mailto:${inq.email}`}
                        className="flex items-center gap-2 text-[#a0ada3] hover:text-[#39ff88] transition-colors truncate"
                      >
                        <Mail className="w-3.5 h-3.5 text-[#39ff88]/80 shrink-0" />
                        <span className="truncate">{inq.email}</span>
                      </a>

                      {/* WhatsApp / Phone */}
                      {inq.whatsappNumber && (
                        <a
                          href={`https://wa.me/${inq.whatsappNumber.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-[#a0ada3] hover:text-[#39ff88] transition-colors truncate"
                        >
                          <Phone className="w-3.5 h-3.5 text-[#39ff88]/80 shrink-0" />
                          <span className="truncate">{inq.whatsappNumber}</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Industry & Budget Chips */}
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-[11px] font-medium text-[#d3ddd5]">
                      <Briefcase className="w-3 h-3 text-[#39ff88]" />
                      <span className="truncate max-w-[140px]">{inq.industry}</span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#12b85a]/10 border border-[#39ff88]/20 text-[11px] font-semibold text-[#39ff88]">
                      <DollarSign className="w-3 h-3" />
                      <span className="truncate max-w-[130px]">{inq.budget}</span>
                    </div>
                  </div>

                  {/* Project Overview / Message (Truncated with Click to Expand) */}
                  <div className="pt-3 border-t border-white/[0.06]">
                    <div
                      onClick={() => handleToggleExpand(inq.id, inq.read)}
                      className="cursor-pointer group select-none"
                    >
                      <p
                        className={`text-xs text-[#a0ada3] group-hover:text-[#f4f7f4] transition-colors leading-relaxed ${
                          isExpanded ? 'whitespace-pre-wrap' : 'line-clamp-3'
                        }`}
                      >
                        {inq.message || 'No project description provided.'}
                      </p>

                      <div className="mt-2 flex items-center justify-between text-[11px] text-[#39ff88]/80 group-hover:text-[#39ff88]">
                        <span>{isExpanded ? 'Show less' : 'Read full message'}</span>
                        {isExpanded ? (
                          <ChevronUp className="w-3.5 h-3.5 transition-transform" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5 transition-transform" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};
