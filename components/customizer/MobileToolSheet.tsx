"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface MobileToolSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function MobileToolSheet({
  isOpen,
  onClose,
  title,
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
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Sheet Content Card */}
      <div className="relative w-full max-w-lg max-h-[85vh] bg-white text-[#0B0B0B] rounded-t-[28px] shadow-[0_-12px_45px_rgba(0,0,0,0.5)] flex flex-col z-10 overflow-hidden animate-in slide-in-from-bottom duration-300 pb-[max(1rem,env(safe-area-inset-bottom,1rem))]">
        {/* Drag Handle Bar */}
        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mt-3 mb-1 shrink-0" />

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-white shrink-0">
          <h3 className="font-poppins font-bold text-sm text-[#0B0B0B]">
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors active:scale-95"
            aria-label="Close sheet"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-4 sm:p-5 overflow-y-auto max-h-[70vh] pb-6 overscroll-contain bg-white">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
