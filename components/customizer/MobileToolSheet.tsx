"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface MobileToolSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  stepIndicator?: string;
  onBack?: () => void;
  onNext?: () => void;
  backDisabled?: boolean;
  nextText?: string;
  nextDisabled?: boolean;
  children: React.ReactNode;
}

export default function MobileToolSheet({
  isOpen,
  onClose,
  title,
  subtitle,
  stepIndicator,
  onBack,
  onNext,
  backDisabled = false,
  nextText = "Next",
  nextDisabled = false,
  children
}: MobileToolSheetProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when sheet is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="lg:hidden fixed inset-0 z-[999] flex items-end justify-center animate-in fade-in duration-200">
      {/* Backdrop tap to close */}
      <div
        className="fixed inset-0 bg-black/65 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Sheet Content Card */}
      <div className="relative w-full max-w-lg max-h-[85vh] bg-white text-[#0B0B0B] rounded-t-[28px] shadow-[0_-12px_45px_rgba(0,0,0,0.5)] flex flex-col z-10 overflow-hidden animate-in slide-in-from-bottom duration-300 pb-[max(0.5rem,env(safe-area-inset-bottom,0.5rem))]">
        {/* Drag Handle Bar */}
        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mt-3 mb-1 shrink-0" />

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-white shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-poppins font-bold text-sm text-[#0B0B0B]">
                {title}
              </h3>
              {stepIndicator && (
                <span className="text-[10px] font-mono font-bold bg-[#E11D2E]/10 text-[#E11D2E] px-2 py-0.5 rounded-full">
                  {stepIndicator}
                </span>
              )}
            </div>
            {subtitle && (
              <p className="text-[11px] text-gray-500 mt-0.5">{subtitle}</p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors active:scale-95 shrink-0"
            aria-label="Close sheet"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-4 sm:p-5 overflow-y-auto max-h-[60vh] pb-6 overscroll-contain bg-white flex-1">
          {children}
        </div>

        {/* Bottom Navigation Footer (Only Back and Next Buttons) */}
        {(onBack || onNext) && (
          <div className="border-t border-gray-100 bg-white/95 backdrop-blur-md px-4 py-3 flex items-center justify-between gap-3 shrink-0 shadow-[0_-4px_16px_rgba(0,0,0,0.04)]">
            <button
              type="button"
              onClick={onBack}
              disabled={backDisabled || !onBack}
              className={`flex-1 py-3 px-4 rounded-xl font-poppins font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                backDisabled || !onBack
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200 opacity-60"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300 active:scale-95"
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              type="button"
              onClick={onNext}
              disabled={nextDisabled || !onNext}
              className={`flex-1 py-3 px-4 rounded-xl font-poppins font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                nextDisabled || !onNext
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-[#E11D2E] hover:bg-[#C51322] text-white shadow-md active:scale-95"
              }`}
            >
              <span>{nextText}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

