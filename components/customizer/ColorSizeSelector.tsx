"use client";

import React from "react";
import { GarmentColor } from "./types";
import { Check, Minus, Plus } from "lucide-react";

interface ColorSizeSelectorProps {
  colors: GarmentColor[];
  selectedColorId: string;
  onSelectColor: (colorId: string) => void;
  availableSizes: string[];
  selectedSize: string;
  onSelectSize: (size: string) => void;
  quantity: number;
  onChangeQuantity: (qty: number) => void;
  className?: string;
}

export default function ColorSizeSelector({
  colors,
  selectedColorId,
  onSelectColor,
  availableSizes,
  selectedSize,
  onSelectSize,
  quantity,
  onChangeQuantity,
  className = ""
}: ColorSizeSelectorProps) {
  const activeColor = colors.find((c) => c.id === selectedColorId) || colors[0];

  return (
    <div className={`space-y-5 ${className}`}>
      {/* 1. COLOR SWATCHES */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
            Product Color
          </label>
          <span className="text-xs font-semibold text-[#E11D2E] font-mono">
            {activeColor.name}
          </span>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {colors.map((color) => {
            const isSelected = selectedColorId === color.id;
            const isWhite = color.hex === "#FFFFFF";

            return (
              <button
                key={color.id}
                type="button"
                onClick={() => onSelectColor(color.id)}
                title={color.name}
                className={`w-9 h-9 rounded-full relative flex items-center justify-center transition-all duration-150 active:scale-95 ${
                  isWhite ? "border border-gray-300" : ""
                } ${
                  isSelected
                    ? "ring-2 ring-offset-2 ring-[#E11D2E] scale-110 shadow-md"
                    : "hover:scale-105 opacity-90 hover:opacity-100"
                }`}
                style={{ backgroundColor: color.hex }}
              >
                {isSelected && (
                  <Check
                    className={`w-4 h-4 stroke-[3] ${
                      isWhite ? "text-[#111111]" : "text-white"
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. SIZE SELECTOR */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
            Select Size / Capacity
          </label>
          <span className="text-[11px] text-gray-500">
            Selected: <strong className="text-gray-900">{selectedSize}</strong>
          </span>
        </div>

        <div className={`grid gap-2 ${availableSizes.length <= 3 ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-3 sm:grid-cols-6"}`}>
          {availableSizes.map((size) => {
            const isSelected = selectedSize === size;

            return (
              <button
                key={size}
                type="button"
                onClick={() => onSelectSize(size)}
                className={`py-2 px-1 text-center text-xs font-bold rounded-xl transition-all ${
                  isSelected
                    ? "bg-[#E11D2E] text-white shadow-sm ring-1 ring-[#E11D2E]"
                    : "bg-white text-gray-700 border border-gray-300 hover:border-gray-500 hover:bg-gray-50"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. QUANTITY SELECTOR */}
      <div className="space-y-2.5 pt-1">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
            Order Quantity
          </label>
          <span className="text-[10px] text-gray-400 font-mono">
            {quantity >= 20 ? "🎉 Bulk Discount Eligible" : "Zero MOQ (1-1000)"}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center border border-gray-300 rounded-xl bg-white overflow-hidden shadow-xs">
            <button
              type="button"
              onClick={() => onChangeQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 disabled:opacity-30 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>

            <input
              type="number"
              min={1}
              max={1000}
              value={quantity}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                if (!isNaN(val)) {
                  onChangeQuantity(Math.max(1, Math.min(1000, val)));
                }
              }}
              className="w-16 h-10 text-center font-poppins font-bold text-sm text-[#0B0B0B] focus:outline-none border-x border-gray-200"
            />

            <button
              type="button"
              onClick={() => onChangeQuantity(Math.min(1000, quantity + 1))}
              disabled={quantity >= 1000}
              className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 disabled:opacity-30 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Quick preset pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {[1, 5, 10, 25, 50].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => onChangeQuantity(num)}
                className={`px-2.5 py-1 text-[11px] font-medium rounded-lg transition-colors ${
                  quantity === num
                    ? "bg-[#0B0B0B] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
