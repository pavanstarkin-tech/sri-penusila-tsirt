"use client";

import React from "react";
import { TshirtStyleId } from "./types";
import { tshirtStylesList } from "./data/tshirtStyles";
import TshirtMockupSvg from "./TshirtMockupSvg";
import { Check, Shirt, Flag, Sparkles } from "lucide-react";

interface StyleSelectorProps {
  selectedStyleId: TshirtStyleId;
  currentColorHex: string;
  onSelectStyle: (id: TshirtStyleId) => void;
  className?: string;
}

export default function StyleSelector({
  selectedStyleId,
  currentColorHex,
  onSelectStyle,
  className = ""
}: StyleSelectorProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
          <span>Choose Product to Customize</span>
          <span className="text-[10px] text-gray-400 font-mono">(4 Items Available)</span>
        </label>
      </div>

      {/* 2-Column Responsive Product Cards Grid for the 4 Items */}
      <div className="grid grid-cols-2 gap-2.5 max-h-[420px] overflow-y-auto pr-1">
        {tshirtStylesList.map((style) => {
          const isSelected = selectedStyleId === style.id;

          return (
            <button
              key={style.id}
              type="button"
              onClick={() => onSelectStyle(style.id)}
              className={`relative text-left p-2.5 rounded-xl border transition-all duration-150 flex flex-col justify-between group active:scale-[0.98] ${
                isSelected
                  ? "bg-white border-[#E11D2E] shadow-sm ring-2 ring-[#E11D2E]/25"
                  : "bg-[#FAFAFA] border-[#E5E5E5] hover:border-gray-400 hover:bg-white"
              }`}
            >
              {/* Selected Checkmark Badge */}
              {isSelected && (
                <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#E11D2E] text-white flex items-center justify-center shadow-xs z-10">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
              )}

              {/* Vector Mockup Thumbnail */}
              <div className="relative w-full aspect-[4/3] rounded-lg bg-gray-100 overflow-hidden flex items-center justify-center p-1.5 mb-2">
                <TshirtMockupSvg
                  styleId={style.id}
                  side="front"
                  colorHex={currentColorHex}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Title & Pricing */}
              <div className="w-full">
                <div className="font-poppins font-bold text-[12px] text-[#0B0B0B] leading-snug line-clamp-1">
                  {style.name}
                </div>
                <div className="text-[9px] text-gray-500 line-clamp-1 mt-0.5 font-mono">
                  {style.tagline.split("//")[0]}
                </div>

                <div className="mt-2 pt-1.5 flex items-center justify-between border-t border-gray-100">
                  <span className="text-[9px] text-gray-400 uppercase font-mono">Custom Base</span>
                  <span className="font-poppins font-extrabold text-[12px] text-[#E11D2E]">
                    ₹{style.basePrice}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
