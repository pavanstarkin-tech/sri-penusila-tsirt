"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  TshirtStyleConfig,
  GarmentColor,
  SideCustomization
} from "./types";
import { siteConfig, getWhatsAppLink } from "@/data/siteConfig";
import {
  MessageCircle,
  Download,
  Edit3,
  X,
  CheckCircle2,
  AlertCircle,
  Share2,
  FileCheck,
  Phone
} from "lucide-react";

interface QuotationModalProps {
  isOpen: boolean;
  onClose: () => void;
  renderedDataUrl: string | null;
  renderedBlob: Blob | null;
  styleConfig: TshirtStyleConfig;
  activeColor: GarmentColor;
  size: string;
  quantity: number;
  frontCustomization: SideCustomization;
  backCustomization: SideCustomization;
  estimatedPrice: number;
  isGenerating: boolean;
}

export default function QuotationModal({
  isOpen,
  onClose,
  renderedDataUrl,
  renderedBlob,
  styleConfig,
  activeColor,
  size,
  quantity,
  frontCustomization,
  backCustomization,
  estimatedPrice,
  isGenerating
}: QuotationModalProps) {
  const [mounted, setMounted] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [sharedDirectly, setSharedDirectly] = useState(false);
  const [selectedPhone, setSelectedPhone] = useState(siteConfig.phones[0]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen) return null;

  const hasFront = frontCustomization.layers.length > 0;
  const hasBack = backCustomization.layers.length > 0;

  // Formatted WhatsApp quotation message
  const quotationText = `Hello Sri Penusila T-Shirt Printing Centre,

I would like to get an official quotation for my custom ${styleConfig.name} order:

• Product / Style: ${styleConfig.name}
• Color: ${activeColor.name} (${activeColor.hex})
• Size: ${size}
• Quantity: ${quantity}
• Front Custom Design: ${hasFront ? "Yes" : "None"}
• Back Custom Design: ${hasBack ? "Yes" : "None"}
• Estimated Total: ₹${estimatedPrice}

Please check my customized design preview image and provide the final price and delivery schedule.

Thank you!`;

  // 1. Download PNG Fallback
  const handleDownloadPng = () => {
    if (!renderedDataUrl) return;
    const link = document.createElement("a");
    link.href = renderedDataUrl;
    link.download = `sri-penusila-${styleConfig.id}-quotation.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloaded(true);
  };

  // 2. Web Share API or WhatsApp Redirection
  const handleShareWhatsApp = async () => {
    // Attempt native file sharing if available (Android Chrome / iOS Safari)
    if (renderedBlob && typeof navigator !== "undefined" && navigator.share) {
      try {
        const file = new File(
          [renderedBlob],
          `sri-penusila-${styleConfig.id}-quotation.png`,
          { type: "image/png" }
        );

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: `Sri Penusila Custom ${styleConfig.name} Quotation`,
            text: quotationText,
            files: [file]
          });
          setSharedDirectly(true);
          return;
        }
      } catch (err) {
        // User cancelled or browser rejected share, fallback below
      }
    }

    // Fallback workflow: Download image + Open WhatsApp with honest instruction
    handleDownloadPng();

    // Open WhatsApp
    const waUrl = getWhatsAppLink(selectedPhone, quotationText);
    window.open(waUrl, "_blank");
  };

  return createPortal(
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0B0B0B] text-white rounded-[28px] border border-[#262626] shadow-2xl overflow-hidden flex flex-col my-auto max-h-[95vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#262626] bg-[#121212]">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#FF4D5A]">
              READY FOR QUOTATION
            </div>
            <h3 className="font-poppins font-bold text-lg text-white">
              Your Customized {styleConfig.name} Is Ready!
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          {/* Loading state while rendering */}
          {isGenerating ? (
            <div className="py-16 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-12 h-12 border-4 border-[#E11D2E] border-t-transparent rounded-full animate-spin" />
              <div className="space-y-1">
                <div className="font-poppins font-bold text-base text-white">
                  Generating High-Res Quotation Card...
                </div>
                <div className="text-xs text-gray-400">
                  Rendering front and back print placements at 300 DPI
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Rendered Preview Card Image */}
              {renderedDataUrl ? (
                <div className="relative rounded-2xl overflow-hidden border border-[#333333] shadow-lg bg-black">
                  <img
                    src={renderedDataUrl}
                    alt="Sri Penusila Custom T-Shirt Quotation Card"
                    className="w-full h-auto object-contain max-h-[380px]"
                  />
                  <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-xs text-green-400 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border border-green-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-green-400" />
                    Verified Quotation
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center bg-gray-900 rounded-2xl border border-gray-800">
                  <AlertCircle className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-400">
                    Preview generated. Tap below to share directly to WhatsApp.
                  </p>
                </div>
              )}

              {/* Order Quick Summary Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="bg-[#151515] p-2.5 rounded-xl border border-[#222222]">
                  <span className="text-gray-400 text-[10px] block">Style</span>
                  <span className="font-bold text-white truncate block">{styleConfig.name}</span>
                </div>
                <div className="bg-[#151515] p-2.5 rounded-xl border border-[#222222]">
                  <span className="text-gray-400 text-[10px] block">Color & Size</span>
                  <span className="font-bold text-white">{activeColor.name} • {size}</span>
                </div>
                <div className="bg-[#151515] p-2.5 rounded-xl border border-[#222222]">
                  <span className="text-gray-400 text-[10px] block">Quantity</span>
                  <span className="font-bold text-white">{quantity} pcs</span>
                </div>
                <div className="bg-[#151515] p-2.5 rounded-xl border border-[#222222]">
                  <span className="text-gray-400 text-[10px] block">Est. Total</span>
                  <span className="font-bold text-[#FF4D5A]">₹{estimatedPrice}</span>
                </div>
              </div>

              {/* Destination WhatsApp Phone Picker */}
              <div className="bg-[#151515] p-3 rounded-xl border border-[#222222] space-y-1.5">
                <label className="text-[11px] font-bold text-gray-400 flex items-center gap-1">
                  <Phone className="w-3 h-3 text-[#25D366]" />
                  <span>Send to Sri Penusila Printing Desk:</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {siteConfig.whatsappNumbers.map((phone) => (
                    <button
                      key={phone}
                      type="button"
                      onClick={() => setSelectedPhone(phone)}
                      className={`text-xs font-mono font-bold py-1.5 px-3 rounded-lg border transition-all ${
                        selectedPhone === phone
                          ? "bg-[#25D366]/20 border-[#25D366] text-white"
                          : "bg-[#1F1F1F] border-transparent text-gray-400 hover:text-white"
                      }`}
                    >
                      +91 {phone}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Modal Actions Footer */}
        {!isGenerating && (
          <div className="p-4 sm:p-5 border-t border-[#262626] bg-[#121212] flex flex-col sm:flex-row items-center justify-end gap-3">
            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-poppins font-bold text-xs sm:text-sm py-3.5 px-6 rounded-xl shadow-lg transition-transform active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Share to WhatsApp Now →</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadPng}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#222222] hover:bg-[#333333] text-white font-poppins font-semibold text-xs py-3.5 px-5 rounded-xl border border-gray-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download PNG</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto flex items-center justify-center gap-2 text-gray-400 hover:text-white font-poppins text-xs py-3.5 px-4 transition-colors"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit Design</span>
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
