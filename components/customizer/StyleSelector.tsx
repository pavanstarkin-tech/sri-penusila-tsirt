"use client";

import React, { useState } from "react";
import { TshirtStyleId, GarmentCategory } from "./types";
import { tshirtStylesList } from "./data/tshirtStyles";
import TshirtMockupSvg from "./TshirtMockupSvg";
import { Check, Shirt, Sparkles, Coffee } from "lucide-react";

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
  const [activeCategory, setActiveCategory] = useState<"all" | GarmentCategory>("all");

  const filteredStyles = tshirtStylesList.filter((s) => {
    if (activeCategory === "all") return true;
    return s.category === activeCategory;
  });

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Header with count */}
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
          <span>Choose Product Style</span>
          <span className="text-[10px] text-gray-400 font-mono">({filteredStyles.length} of {tshirtStylesList.length})</span>
        </label>
      </div>

      {/* Category Pills (All, T-Shirts, Hoodies, Mugs) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 -mx-1 px-1">
        {[
          { id: "all", label: "All (7)", icon: Sparkles },
          { id: "tshirt", label: "T-Shirts (5)", icon: Shirt },
          { id: "hoodie", label: "Hoodies (1)", icon: Shirt },
          { id: "mug", label: "Mugs (1)", icon: Coffee }
        ].map((cat) => {
          const isCatActive = activeCategory === cat.id;
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id as any)}
              className={`flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-lg border transition-all shrink-0 ${
                isCatActive
                  ? "bg-[#0B0B0B] text-white border-[#0B0B0B]"
                  : "bg-gray-100 text-gray-600 border-transparent hover:bg-gray-200"
              }`}
            >
              <Icon className="w-3 h-3" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* 2-Column Responsive Product Cards Grid (Fits perfectly in 4-col sidebar) */}
      <div className="grid grid-cols-2 gap-2.5 max-h-[380px] overflow-y-auto pr-1">
        {filteredStyles.map((style) => {
          const isSelected = selectedStyleId === style.id;

          return (
            <button
              key={style.id}
              type="button"
              onClick={() => onSelectStyle(style.id)}
              className={`relative text-left p-2.5 rounded-xl border transition-all duration-150 flex flex-col justify-between group ${
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

              {/* Garment / Mug Visual Thumbnail */}
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
                <div className="font-poppins font-bold text-[11px] text-[#0B0B0B] leading-snug line-clamp-1">
                  {style.name}
                </div>
                <div className="text-[9px] text-gray-500 line-clamp-1 mt-0.5 font-mono">
                  {style.tagline.split("//")[0]}
                </div>

                <div className="mt-1.5 pt-1.5 flex items-center justify-between border-t border-gray-100">
                  <span className="text-[9px] text-gray-400 uppercase font-mono">Base</span>
                  <span className="font-poppins font-extrabold text-[11px] text-[#E11D2E]">
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
