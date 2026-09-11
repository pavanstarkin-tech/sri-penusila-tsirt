"use client";

import React, { useState } from "react";
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
  const [downloaded, setDownloaded] = useState(false);
  const [sharedDirectly, setSharedDirectly] = useState(false);
  const [selectedPhone, setSelectedPhone] = useState(siteConfig.phones[0]);

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
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
              <div className="w-12 h-12 border-3 border-[#E11D2E] border-t-transparent rounded-full animate-spin" />
              <div className="space-y-1">
                <div className="font-poppins font-bold text-sm text-white">
                  Preparing High-Resolution Quotation Card...
                </div>
                <div className="text-xs text-gray-400">
                  Rendering Front & Back mockups at print quality
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Image Preview Container */}
              {renderedDataUrl && (
                <div className="relative rounded-2xl overflow-hidden border border-[#2A2A2A] bg-[#151515] p-2 group shadow-inner">
                  <img
                    src={renderedDataUrl}
                    alt="Customized T-Shirt Quotation Card"
                    className="w-full h-auto rounded-xl object-contain max-h-[340px]"
                  />
                  <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 text-[10px] text-gray-300 font-mono">
                    High-Res 300 DPI Export
                  </div>
                </div>
              )}

              {/* Order Quick Summary */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-[#151515] border border-[#262626] text-xs">
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase">Style</span>
                  <strong className="text-white">{styleConfig.name}</strong>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase">Color & Size</span>
                  <strong className="text-white">{activeColor.name} / {size}</strong>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase">Quantity</span>
                  <strong className="text-white">{quantity} pcs</strong>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase">Estimated Price</span>
                  <strong className="text-[#FF4D5A] font-bold">₹{estimatedPrice}</strong>
                </div>
              </div>

              {/* WhatsApp Phone Selector */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-gray-400 uppercase tracking-wider block">
                  Send Quotation to WhatsApp Contact:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {siteConfig.phones.map((phone) => (
                    <button
                      key={phone}
                      type="button"
                      onClick={() => setSelectedPhone(phone)}
                      className={`p-2.5 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition-all ${
                        selectedPhone === phone
                          ? "bg-red-950/40 border-[#E11D2E] text-white ring-1 ring-[#E11D2E]"
                          : "bg-[#151515] border-[#2B2B2B] text-gray-400 hover:text-white"
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-[#E11D2E]" />
                        <span>+91 {phone}</span>
                      </span>
                      {selectedPhone === phone && (
                        <span className="w-2 h-2 rounded-full bg-[#E11D2E]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Transparent instructions regarding browser WhatsApp limits */}
              <div className="p-3.5 rounded-xl bg-[#1A1A1A] border border-[#2B2B2B] text-xs text-gray-300 space-y-1">
                <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>How WhatsApp Sharing Works:</span>
                </div>
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  Tapping <strong>&quot;Share on WhatsApp&quot;</strong> will launch WhatsApp with all your design details. On devices that support native file sharing, the image is attached automatically. Otherwise, the image is automatically saved to your downloads — simply attach it to the chat!
                </p>
              </div>

              {downloaded && (
                <div className="flex items-center gap-2 p-2.5 bg-emerald-950/60 border border-emerald-600 rounded-xl text-xs text-emerald-400">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Quotation PNG downloaded to your device successfully!</span>
                </div>
              )}
            </>
          )}
        </div>

        {/* Action Buttons */}
        {!isGenerating && (
          <div className="p-4 sm:p-6 border-t border-[#262626] bg-[#121212] flex flex-col sm:flex-row items-center gap-3">
            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="w-full sm:flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-poppins font-bold text-xs sm:text-sm py-3.5 rounded-xl shadow-lg transition-transform active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Share on WhatsApp</span>
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
    </div>
  );
}
