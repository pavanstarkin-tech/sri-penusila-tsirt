"use client";

import React, { forwardRef } from "react";
import {
  TshirtStyleConfig,
  GarmentColor,
  SideCustomization
} from "./types";
import TshirtMockupSvg from "./TshirtMockupSvg";
import PrintCanvas from "./PrintCanvas";
import { siteConfig } from "@/data/siteConfig";
import { Sparkles, MapPin, Phone, ShieldCheck } from "lucide-react";

interface QuotationExportCardProps {
  styleConfig: TshirtStyleConfig;
  activeColor: GarmentColor;
  size: string;
  quantity: number;
  frontCustomization: SideCustomization;
  backCustomization: SideCustomization;
  estimatedPrice: number;
  dateString: string;
}

export const QuotationExportCard = forwardRef<HTMLDivElement, QuotationExportCardProps>(
  function QuotationExportCard(
    {
      styleConfig,
      activeColor,
      size,
      quantity,
      frontCustomization,
      backCustomization,
      estimatedPrice,
      dateString
    },
    ref
  ) {
    const hasFrontPrint = frontCustomization.layers.length > 0;
    const hasBackPrint = backCustomization.layers.length > 0;

    return (
      <div
        ref={ref}
        className="w-[900px] bg-[#0B0B0B] text-white p-8 rounded-[28px] border-4 border-[#262626] font-sans shadow-2xl relative overflow-hidden select-none"
        style={{ minWidth: "900px", backgroundColor: "#0B0B0B", color: "#FFFFFF" }}
      >
        {/* 1. Header with Official Sri Penusila Branding */}
        <div className="flex items-center justify-between pb-6 border-b border-[#262626] relative z-10" style={{ borderColor: "#262626" }}>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[#FF4D5A] text-xs font-mono font-bold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#FF4D5A]" />
              <span>OFFICIAL BESPOKE PRINT QUOTATION</span>
            </div>
            <h2 className="font-poppins font-black text-2xl tracking-tight text-white">
              SRI PENUSILA <span className="text-[#E11D2E]">T-SHIRT PRINTING</span>
            </h2>
            <p className="text-[11px] text-[#A3A3A3]">
              Penubarthi, Rapur (Mandal), Nellore District, Andhra Pradesh
            </p>
          </div>

          <div className="text-right space-y-1">
            <div className="text-[10px] font-mono text-[#A3A3A3] uppercase tracking-wider">
              Date & Spec Reference
            </div>
            <div className="text-sm font-mono font-bold text-white">
              {dateString}
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#1A1A1A] border border-[#333333] text-[10px] font-mono text-[#D4D4D4]">
              <span className="w-2 h-2 rounded-full bg-[#25D366]" />
              Verified Client Mockup
            </div>
          </div>
        </div>

        {/* 2. Side-By-Side T-Shirt Visuals (Front & Back) */}
        <div className="py-6 grid grid-cols-2 gap-8 items-center relative z-10">
          {/* FRONT PREVIEW */}
          <div className="bg-[#151515] rounded-2xl p-4 border border-[#2B2B2B] flex flex-col items-center" style={{ backgroundColor: "#151515", borderColor: "#2B2B2B" }}>
            <div className="w-full flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-[#D4D4D4] uppercase">
                [ 01 FRONT VIEW ]
              </span>
              <span
                className="text-[10px] font-mono px-2 py-0.5 rounded"
                style={{
                  backgroundColor: hasFrontPrint ? "#3B0C10" : "#242424",
                  color: hasFrontPrint ? "#FF4D5A" : "#A3A3A3"
                }}
              >
                {hasFrontPrint ? "Custom Print Active" : "Plain Front"}
              </span>
            </div>

            <div className="relative w-[340px] aspect-square flex items-center justify-center">
              <TshirtMockupSvg
                styleId={styleConfig.id}
                side="front"
                colorHex={activeColor.hex}
                className="w-full h-full"
              />
              <PrintCanvas
                styleId={styleConfig.id}
                side="front"
                printArea={styleConfig.frontPrintArea}
                layers={frontCustomization.layers}
                selectedLayerId={null}
                onSelectLayer={() => {}}
                onUpdateLayer={() => {}}
                onDeleteLayer={() => {}}
                isPreviewMode={true}
              />
            </div>
          </div>

          {/* BACK PREVIEW */}
          <div className="bg-[#151515] rounded-2xl p-4 border border-[#2B2B2B] flex flex-col items-center" style={{ backgroundColor: "#151515", borderColor: "#2B2B2B" }}>
            <div className="w-full flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-[#D4D4D4] uppercase">
                [ 02 BACK VIEW ]
              </span>
              <span
                className="text-[10px] font-mono px-2 py-0.5 rounded"
                style={{
                  backgroundColor: hasBackPrint ? "#3B0C10" : "#242424",
                  color: hasBackPrint ? "#FF4D5A" : "#A3A3A3"
                }}
              >
                {hasBackPrint ? "Custom Print Active" : "Plain Back"}
              </span>
            </div>

            <div className="relative w-[340px] aspect-square flex items-center justify-center">
              <TshirtMockupSvg
                styleId={styleConfig.id}
                side="back"
                colorHex={activeColor.hex}
                className="w-full h-full"
              />
              <PrintCanvas
                styleId={styleConfig.id}
                side="back"
                printArea={styleConfig.backPrintArea}
                layers={backCustomization.layers}
                selectedLayerId={null}
                onSelectLayer={() => {}}
                onUpdateLayer={() => {}}
                onDeleteLayer={() => {}}
                isPreviewMode={true}
              />
            </div>
          </div>
        </div>

        {/* 3. Detailed Specifications Matrix */}
        <div className="grid grid-cols-4 gap-4 p-4 rounded-2xl bg-[#141414] border border-[#262626] relative z-10" style={{ backgroundColor: "#141414", borderColor: "#262626" }}>
          <div>
            <div className="text-[10px] font-mono text-[#A3A3A3] uppercase">Product Style</div>
            <div className="font-poppins font-bold text-sm text-white mt-0.5">{styleConfig.name}</div>
            <div className="text-[10px] text-[#737373]">{styleConfig.tagline.split("//")[0]}</div>
          </div>

          <div>
            <div className="text-[10px] font-mono text-[#A3A3A3] uppercase">Product Color</div>
            <div className="font-poppins font-bold text-sm text-white mt-0.5 flex items-center gap-1.5">
              <span
                className="w-3 h-3 rounded-full border border-[#737373] shrink-0"
                style={{ backgroundColor: activeColor.hex }}
              />
              <span>{activeColor.name}</span>
            </div>
            <div className="text-[10px] text-[#737373]">100% Combed Cotton</div>
          </div>

          <div>
            <div className="text-[10px] font-mono text-[#A3A3A3] uppercase">Size & Quantity</div>
            <div className="font-poppins font-bold text-sm text-white mt-0.5">
              Size: {size} <span className="text-[#737373] mx-1">|</span> Qty: {quantity}
            </div>
            <div className="text-[10px] text-[#737373]">
              {quantity >= 20 ? "Bulk tier discount applied" : "Individual piece print"}
            </div>
          </div>

          <div className="text-right">
            <div className="text-[10px] font-mono text-[#A3A3A3] uppercase">Est. Total Quotation</div>
            <div className="font-poppins font-black text-xl text-[#E11D2E] mt-0.5">
              ₹{estimatedPrice}
            </div>
            <div className="text-[9px] text-[#737373]">*Final pricing confirmed on WhatsApp</div>
          </div>
        </div>

        {/* 4. Footer & Contact Strip */}
        <div className="mt-5 pt-4 border-t border-[#262626] flex items-center justify-between text-[11px] text-[#A3A3A3] relative z-10" style={{ borderColor: "#262626" }}>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-[#E11D2E]" />
              <span>+91 8985065578 / 9550151533</span>
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#E11D2E]" />
              <span>Penubarthi, Rapur</span>
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[#D4D4D4] font-mono text-[10px]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#25D366]" />
            <span>Sri Penusila Certified Proof</span>
          </div>
        </div>
      </div>
    );
  }
);
