"use client";

import React from "react";
import {
  Tag,
  Flame,
  Cake,
  GraduationCap,
  Users,
  Heart,
  Briefcase,
  Sparkles,
  TrendingUp,
  Smile,
  PenTool,
  RotateCcw
} from "lucide-react";
import { storeSidebarCategories } from "@/data/categories";

const categoryIconMap: Record<string, React.ReactNode> = {
  all: <Tag className="w-4 h-4" />,
  trending: <Flame className="w-4 h-4" />,
  birthday: <Cake className="w-4 h-4" />,
  college: <GraduationCap className="w-4 h-4" />,
  team: <Users className="w-4 h-4" />,
  couple: <Heart className="w-4 h-4" />,
  business: <Briefcase className="w-4 h-4" />,
  festival: <Sparkles className="w-4 h-4" />,
  motivational: <TrendingUp className="w-4 h-4" />,
  funny: <Smile className="w-4 h-4" />,
  custom: <PenTool className="w-4 h-4" />
};

const availableColors = [
  { name: "Black", hex: "#0B0B0B" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Gray", hex: "#9E9E9E" },
  { name: "Red", hex: "#E11D2E" },
  { name: "Blue", hex: "#1E3A8A" },
  { name: "Green", hex: "#16A34A" },
  { name: "Yellow", hex: "#EAB308" },
  { name: "Pink", hex: "#EC4899" },
  { name: "Purple", hex: "#9333EA" },
  { name: "Brown", hex: "#78350F" }
];

const availableSizes = ["S", "M", "L", "XL", "XXL", "3XL"];

interface FilterSidebarProps {
  selectedCategory: string;
  onSelectCategory: (slug: string) => void;
  maxPrice: number;
  onChangeMaxPrice: (price: number) => void;
  selectedSizes: string[];
  onToggleSize: (size: string) => void;
  selectedColor: string | null;
  onSelectColor: (hex: string | null) => void;
  onClearFilters: () => void;
  designStyle?: string | null;
  onSelectDesignStyle?: (style: string | null) => void;
  showDesignStyles?: boolean;
}

export default function FilterSidebar({
  selectedCategory,
  onSelectCategory,
  maxPrice,
  onChangeMaxPrice,
  selectedSizes,
  onToggleSize,
  selectedColor,
  onSelectColor,
  onClearFilters,
  designStyle,
  onSelectDesignStyle,
  showDesignStyles = false
}: FilterSidebarProps) {
  return (
    <div className="w-full bg-white rounded-2xl border border-[#E5E5E5] p-5 shadow-xs divide-y divide-gray-100 space-y-6">
      {/* 1. Categories Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-poppins font-bold text-sm text-[#0B0B0B] uppercase tracking-wide flex items-center gap-2">
            <Tag className="w-4 h-4 text-[#E11D2E]" />
            <span>Categories</span>
          </h3>
        </div>

        <div className="space-y-1">
          {storeSidebarCategories.map((cat) => {
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.slug)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left ${
                  isSelected
                    ? "bg-red-50 text-[#E11D2E] font-bold border border-red-100"
                    : "text-gray-700 hover:bg-gray-50 hover:text-black"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={isSelected ? "text-[#E11D2E]" : "text-gray-500"}>
                    {categoryIconMap[cat.id] || <Tag className="w-3.5 h-3.5" />}
                  </span>
                  <span>{cat.name}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Price Range Slider */}
      <div className="pt-5">
        <h3 className="font-poppins font-bold text-sm text-[#0B0B0B] mb-3 flex items-center gap-2">
          <span className="text-[#E11D2E] font-bold">₹</span>
          <span>Price Range</span>
        </h3>
        <input
          type="range"
          min="199"
          max="999"
          step="50"
          value={maxPrice}
          onChange={(e) => onChangeMaxPrice(Number(e.target.value))}
          className="w-full accent-[#E11D2E] cursor-pointer"
        />
        <div className="flex items-center justify-between text-xs font-semibold text-gray-700 mt-2">
          <span>₹199</span>
          <span className="text-[#E11D2E] font-bold bg-red-50 px-2 py-0.5 rounded">
            Up to ₹{maxPrice}
          </span>
          <span>₹999</span>
        </div>
      </div>

      {/* 3. Size Filter */}
      <div className="pt-5">
        <h3 className="font-poppins font-bold text-sm text-[#0B0B0B] mb-3 flex items-center gap-2">
          <span className="text-[#E11D2E] font-bold">📏</span>
          <span>Size</span>
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {availableSizes.map((size) => {
            const isSelected = selectedSizes.includes(size);
            return (
              <button
                key={size}
                onClick={() => onToggleSize(size)}
                className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all ${
                  isSelected
                    ? "bg-[#E11D2E] text-white border-[#E11D2E] shadow-xs"
                    : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Color Swatches */}
      <div className="pt-5">
        <h3 className="font-poppins font-bold text-sm text-[#0B0B0B] mb-3 flex items-center gap-2">
          <span className="text-[#E11D2E] font-bold">🎨</span>
          <span>Color</span>
        </h3>
        <div className="grid grid-cols-5 gap-2.5">
          {availableColors.map((col) => {
            const isSelected = selectedColor === col.hex;
            return (
              <button
                key={col.name}
                onClick={() => onSelectColor(isSelected ? null : col.hex)}
                className={`w-7 h-7 rounded-full border relative transition-transform hover:scale-110 ${
                  isSelected
                    ? "ring-2 ring-offset-2 ring-[#E11D2E] scale-110"
                    : "border-gray-300"
                }`}
                style={{ backgroundColor: col.hex }}
                title={col.name}
                aria-label={`Filter by ${col.name}`}
              />
            );
          })}
        </div>
      </div>

      {/* 5. Optional Design Style (for Designs page) */}
      {showDesignStyles && onSelectDesignStyle && (
        <div className="pt-5">
          <h3 className="font-poppins font-bold text-sm text-[#0B0B0B] mb-3">
            Design Style
          </h3>
          <div className="space-y-1.5">
            {["Graphic", "Text Only", "Illustration", "Vintage", "Minimal"].map((style) => (
              <label
                key={style}
                className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer hover:text-black"
              >
                <input
                  type="checkbox"
                  checked={designStyle === style}
                  onChange={() => onSelectDesignStyle(designStyle === style ? null : style)}
                  className="rounded text-[#E11D2E] focus:ring-[#E11D2E] accent-[#E11D2E]"
                />
                <span>{style}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Clear Filters Button */}
      <div className="pt-5">
        <button
          onClick={onClearFilters}
          className="w-full flex items-center justify-center gap-2 bg-[#E11D2E] hover:bg-[#C51322] text-white font-poppins font-semibold text-xs py-2.5 px-4 rounded-xl shadow-xs transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Clear Filters</span>
        </button>
      </div>
    </div>
  );
}
