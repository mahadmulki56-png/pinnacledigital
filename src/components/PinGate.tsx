import React, { useState, useEffect, useRef } from 'react';
import { X, Lock, Delete } from 'lucide-react';
import { PinnacleLogo } from './PinnacleLogo.tsx';

interface PinGateProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const PinGate: React.FC<PinGateProps> = ({ isOpen, onClose, onSuccess }) => {
  const [pin, setPin] = useState<string>('');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [shake, setShake] = useState<boolean>(false);
  const [lockoutSeconds, setLockoutSeconds] = useState<number>(0);
  const lockoutTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Handle countdown if locked
  useEffect(() => {
    if (lockoutSeconds > 0) {
      lockoutTimerRef.current = setTimeout(() => {
        setLockoutSeconds((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (lockoutTimerRef.current) clearTimeout(lockoutTimerRef.current);
    };
  }, [lockoutSeconds]);

  // Keyboard entry support
  useEffect(() => {
    if (!isOpen || lockoutSeconds > 0 || isVerifying) return;

    const handleKey = (e: KeyboardEvent) => {
      if (/^[0-9]$/.test(e.key)) {
        e.preventDefault();
        handleDigit(e.key);
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        handleBackspace();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (pin.length === 4) {
          verifyPin(pin);
        }
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, pin, lockoutSeconds, isVerifying]);

  if (!isOpen) return null;

  const handleDigit = (digit: string) => {
    if (lockoutSeconds > 0 || isVerifying) return;
    if (pin.length < 4) {
      const next = pin + digit;
      setPin(next);
      if (next.length === 4) {
        verifyPin(next);
      }
    }
  };

  const handleBackspace = () => {
    if (lockoutSeconds > 0 || isVerifying) return;
    setPin((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    if (lockoutSeconds > 0 || isVerifying) return;
    setPin('');
  };

  const verifyPin = async (candidatePin: string) => {
    setIsVerifying(true);
    try {
      const res = await fetch('/api/auth/verify-pin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: candidatePin }),
      });

      if (res.ok) {
        setPin('');
        onSuccess();
      } else {
        const data = await res.json().catch(() => ({}));
        if (data.locked && data.remainingSeconds) {
          setLockoutSeconds(data.remainingSeconds);
        }
        // Shake feedback and clear
        setShake(true);
        setTimeout(() => {
          setShake(false);
          setPin('');
        }, 500);
      }
    } catch (err) {
      console.error('PIN verification request error:', err);
      setShake(true);
      setTimeout(() => {
        setShake(false);
        setPin('');
      }, 500);
    } finally {
      setIsVerifying(false);
    }
  };

  const keypadNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050605]/95 backdrop-blur-xl animate-in fade-in duration-200 p-4"
      onClick={onClose}
    >
      {/* Viewport exit button */}
      <button
        onClick={onClose}
        id="pin-gate-close-btn"
        aria-label="Close"
        className="fixed top-5 right-5 w-11 h-11 min-h-[44px] min-w-[44px] rounded-full bg-white/[0.06] border border-white/15 text-[#a0ada3] hover:text-[#39ff88] hover:bg-white/[0.12] flex items-center justify-center transition-all cursor-pointer shadow-lg"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Main Glass Panel */}
      <div
        className="w-full max-w-sm rounded-3xl bg-[rgba(16,21,18,0.7)] border border-white/[0.12] p-6 sm:p-8 shadow-[0_24px_64px_-16px_rgba(0,0,0,0.85)] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Pinnacle Logo Centered at Top */}
        <div className="mb-8 flex justify-center">
          <PinnacleLogo variant="full" className="h-9 w-auto" />
        </div>

        {/* 4 Masked Indicator Dots */}
        <div className={`flex items-center justify-center gap-4 mb-8 ${shake ? 'animate-shake' : ''}`}>
          {[0, 1, 2, 3].map((idx) => {
            const filled = pin.length > idx;
            return (
              <div
                key={idx}
                className={`w-3.5 h-3.5 rounded-full transition-all duration-200 ${
                  filled
                    ? 'bg-[#39ff88] shadow-[0_0_12px_#39ff88] scale-110'
                    : 'bg-white/20 border border-white/30'
                }`}
              />
            );
          })}
        </div>

        {/* Lockout status message if triggered */}
        {lockoutSeconds > 0 && (
          <div className="mb-5 text-center text-xs font-semibold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-4 py-2 rounded-full">
            Keypad locked. Try again in {lockoutSeconds}s.
          </div>
        )}

        {/* Numeric Keypad Grid */}
        <div className="grid grid-cols-3 gap-3 w-full max-w-[260px]">
          {keypadNumbers.map((num) => (
            <button
              key={num}
              type="button"
              disabled={lockoutSeconds > 0 || isVerifying}
              onClick={() => handleDigit(num)}
              className="h-14 rounded-2xl bg-white/[0.04] hover:bg-white/[0.1] active:bg-[#39ff88]/20 border border-white/10 hover:border-[#39ff88]/50 text-xl font-display font-bold text-[#f4f7f4] active:text-[#39ff88] transition-all flex items-center justify-center cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed select-none shadow-sm active:scale-95"
            >
              {num}
            </button>
          ))}

          {/* Clear Key */}
          <button
            type="button"
            disabled={lockoutSeconds > 0 || isVerifying || pin.length === 0}
            onClick={handleClear}
            className="h-14 rounded-2xl bg-white/[0.02] hover:bg-white/[0.08] border border-white/5 text-xs font-semibold text-[#a0ada3] hover:text-[#f4f7f4] transition-all flex items-center justify-center cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed select-none active:scale-95"
          >
            Clear
          </button>

          {/* 0 Key */}
          <button
            type="button"
            disabled={lockoutSeconds > 0 || isVerifying}
            onClick={() => handleDigit('0')}
            className="h-14 rounded-2xl bg-white/[0.04] hover:bg-white/[0.1] active:bg-[#39ff88]/20 border border-white/10 hover:border-[#39ff88]/50 text-xl font-display font-bold text-[#f4f7f4] active:text-[#39ff88] transition-all flex items-center justify-center cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed select-none shadow-sm active:scale-95"
          >
            0
          </button>

          {/* Backspace Key */}
          <button
            type="button"
            disabled={lockoutSeconds > 0 || isVerifying || pin.length === 0}
            onClick={handleBackspace}
            aria-label="Backspace"
            className="h-14 rounded-2xl bg-white/[0.02] hover:bg-white/[0.08] active:bg-white/[0.12] border border-white/5 text-[#a0ada3] hover:text-[#f4f7f4] transition-all flex items-center justify-center cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed select-none active:scale-95"
          >
            <Delete className="w-5 h-5" />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-8px); }
          40%, 80% { transform: translateX(8px); }
        }
        .animate-shake {
          animation: shake 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        }
      `}</style>
    </div>
  );
};
