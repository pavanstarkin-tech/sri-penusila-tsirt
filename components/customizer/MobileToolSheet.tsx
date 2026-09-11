"use client";

import React from "react";
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
  if (!isOpen) return null;

  return (
    <div className="md:hidden fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      {/* Backdrop tap to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Sheet Content */}
      <div className="relative w-full max-h-[85vh] bg-white rounded-t-[28px] border-t border-gray-200 shadow-2xl flex flex-col z-10 overflow-hidden animate-in slide-in-from-bottom duration-300">
        {/* Drag Handle Bar */}
        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mt-3 mb-1" />

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
          <h3 className="font-poppins font-bold text-sm text-[#0B0B0B]">
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500"
            aria-label="Close sheet"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 overflow-y-auto max-h-[70vh] pb-8">
          {children}
        </div>
      </div>
    </div>
  );
}
