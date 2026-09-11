"use client";

import React, { useState, useRef, useEffect } from "react";
import html2canvas from "html2canvas-pro";
import confetti from "canvas-confetti";
import {
  TshirtStyleId,
  GarmentSide,
  DesignLayer,
  ImageLayer,
  TextLayer,
  SideCustomization
} from "./customizer/types";
import { tshirtStyles, tshirtStylesList } from "./customizer/data/tshirtStyles";
import { PresetGraphic } from "./customizer/data/designLibrary";
import TshirtMockupSvg from "./customizer/TshirtMockupSvg";
import PrintCanvas from "./customizer/PrintCanvas";
import StyleSelector from "./customizer/StyleSelector";
import ColorSizeSelector from "./customizer/ColorSizeSelector";
import DesignTools from "./customizer/DesignTools";
import MobileToolSheet from "./customizer/MobileToolSheet";
import { QuotationExportCard } from "./customizer/QuotationExportCard";
import QuotationModal from "./customizer/QuotationModal";
import { useCart } from "@/context/CartContext";
import {
  Sparkles,
  Eye,
  EyeOff,
  Check,
  ChevronRight,
  ChevronLeft,
  FileText,
  ShoppingBag,
  RotateCcw,
  Palette,
  Shirt,
  Upload,
  Type,
  Layers,
  ArrowRight
} from "lucide-react";

interface CustomizerStudioProps {
  mode?: "home" | "full";
}

export default function CustomizerStudio({ mode = "full" }: CustomizerStudioProps) {
  const { addToCart } = useCart();

  // 1. CONFIGURATION & STATE
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedStyleId, setSelectedStyleId] = useState<TshirtStyleId>("normal");
  const activeStyle = tshirtStyles[selectedStyleId] || tshirtStyles.normal;

  const [selectedColorId, setSelectedColorId] = useState<string>(activeStyle.defaultColorId);
  const activeColor = activeStyle.colors.find((c) => c.id === selectedColorId) || activeStyle.colors[0];

  const [selectedSize, setSelectedSize] = useState<string>("M");
  const [quantity, setQuantity] = useState<number>(1);

  const [activeSide, setActiveSide] = useState<GarmentSide>("front");
  const [frontCustomization, setFrontCustomization] = useState<SideCustomization>({ layers: [] });
  const [backCustomization, setBackCustomization] = useState<SideCustomization>({ layers: [] });

  const [selectedLayerId, setSelectedLayerId] = useState<string | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(false);

  // Mobile Bottom Sheet Active Tool
  const [mobileSheet, setMobileSheet] = useState<"style" | "color" | "upload" | "text" | "graphics" | "layers" | null>(null);

  // Quotation Modal & HTML-to-Canvas
  const [isQuotationOpen, setIsQuotationOpen] = useState(false);
  const [isGeneratingQuotation, setIsGeneratingQuotation] = useState(false);
  const [renderedDataUrl, setRenderedDataUrl] = useState<string | null>(null);
  const [renderedBlob, setRenderedBlob] = useState<Blob | null>(null);
  const exportCardRef = useRef<HTMLDivElement>(null);

  // Current active side layers
  const activeLayers = activeSide === "front" ? frontCustomization.layers : backCustomization.layers;

  // Sync color and size when style changes
  const handleSelectStyle = (id: TshirtStyleId) => {
    setSelectedStyleId(id);
    const newStyle = tshirtStyles[id];
    if (newStyle) {
      if (!newStyle.colors.some((c) => c.id === selectedColorId)) {
        setSelectedColorId(newStyle.defaultColorId);
      }
      if (!newStyle.availableSizes.includes(selectedSize)) {
        setSelectedSize(newStyle.availableSizes[0] || "M");
      }
    }
  };

  // Pricing calculation
  const basePrice = activeStyle.basePrice;
  const printAddon =
    (frontCustomization.layers.length > 0 ? 50 : 0) +
    (backCustomization.layers.length > 0 ? 70 : 0);
  const singleUnitPrice = basePrice + printAddon;
  const estimatedTotalPrice = singleUnitPrice * quantity;

  // Layer Mutators
  const updateActiveLayers = (updater: (prev: DesignLayer[]) => DesignLayer[]) => {
    if (activeSide === "front") {
      setFrontCustomization((prev) => ({ layers: updater(prev.layers) }));
    } else {
      setBackCustomization((prev) => ({ layers: updater(prev.layers) }));
    }
  };

  const handleAddImageLayer = (layer: ImageLayer) => {
    updateActiveLayers((prev) => [...prev, layer]);
    setSelectedLayerId(layer.id);
  };

  const handleAddTextLayer = (layer: TextLayer) => {
    updateActiveLayers((prev) => [...prev, layer]);
    setSelectedLayerId(layer.id);
  };

  const handleAddElementLayer = (graphic: PresetGraphic) => {
    const newLayer: DesignLayer = {
      id: `elem-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      type: "element",
      side: activeSide,
      elementId: graphic.id,
      title: graphic.title,
      src: graphic.previewUrl,
      x: 50,
      y: 50,
      width: 60,
      height: 60,
      rotation: 0,
      scale: 1,
      opacity: 1,
      zIndex: activeLayers.length + 1
    };
    updateActiveLayers((prev) => [...prev, newLayer]);
    setSelectedLayerId(newLayer.id);
  };

  const handleUpdateLayer = (updated: DesignLayer) => {
    updateActiveLayers((prev) =>
      prev.map((l) => (l.id === updated.id ? updated : l))
    );
  };

  const handleDeleteLayer = (id: string) => {
    updateActiveLayers((prev) => prev.filter((l) => l.id !== id));
    if (selectedLayerId === id) setSelectedLayerId(null);
  };

  const handleDuplicateLayer = (id: string) => {
    const target = activeLayers.find((l) => l.id === id);
    if (!target) return;
    const duplicated: DesignLayer = {
      ...target,
      id: `dup-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      x: Math.min(80, target.x + 5),
      y: Math.min(80, target.y + 5),
      zIndex: activeLayers.length + 1
    };
    updateActiveLayers((prev) => [...prev, duplicated]);
    setSelectedLayerId(duplicated.id);
  };

  const handleReorderLayer = (id: string, direction: "up" | "down") => {
    updateActiveLayers((prev) => {
      const idx = prev.findIndex((l) => l.id === id);
      if (idx === -1) return prev;
      const targetIdx = direction === "up" ? idx + 1 : idx - 1;
      if (targetIdx < 0 || targetIdx >= prev.length) return prev;
      const copy = [...prev];
      const [moved] = copy.splice(idx, 1);
      copy.splice(targetIdx, 0, moved);
      return copy.map((l, i) => ({ ...l, zIndex: i + 1 }));
    });
  };

  // Reset current side layers
  const handleResetSide = () => {
    if (confirm(`Clear all custom layers on the ${activeSide} side?`)) {
      updateActiveLayers(() => []);
      setSelectedLayerId(null);
    }
  };

  // HTML-TO-CANVAS GENERATOR
  const handleGenerateQuotation = async () => {
    setIsQuotationOpen(true);
    setIsGeneratingQuotation(true);

    try {
      // Confetti burst for satisfaction
      confetti({
        particleCount: 40,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {}

    // Allow offscreen export card to mount
    setTimeout(async () => {
      if (!exportCardRef.current) {
        setIsGeneratingQuotation(false);
        return;
      }

      try {
        const canvas = await html2canvas(exportCardRef.current, {
          scale: 2, // High DPI for crystal-clear text & graphics
          useCORS: true,
          allowTaint: true,
          backgroundColor: "#0B0B0B",
          logging: false
        });

        const dataUrl = canvas.toDataURL("image/png");
        setRenderedDataUrl(dataUrl);

        canvas.toBlob((blob) => {
          if (blob) setRenderedBlob(blob);
          setIsGeneratingQuotation(false);
        }, "image/png");
      } catch (err) {
        console.error("html2canvas generation error:", err);
        // Guaranteed canvas fallback card
        try {
          const fallbackCanvas = document.createElement("canvas");
          fallbackCanvas.width = 1600;
          fallbackCanvas.height = 1000;
          const ctx = fallbackCanvas.getContext("2d");
          if (ctx) {
            ctx.fillStyle = "#0B0B0B";
            ctx.fillRect(0, 0, 1600, 1000);

            // Header Banner
            ctx.fillStyle = "#E11D2E";
            ctx.font = "bold 44px sans-serif";
            ctx.fillText("SRI PENUSILA T-SHIRT PRINTING", 80, 110);

            ctx.fillStyle = "#A3A3A3";
            ctx.font = "24px sans-serif";
            ctx.fillText("Official Custom Order Quotation Card", 80, 160);

            // Spec Matrix Box
            ctx.fillStyle = "#151515";
            ctx.fillRect(80, 220, 1440, 520);

            ctx.fillStyle = "#D4D4D4";
            ctx.font = "bold 32px sans-serif";
            ctx.fillText(`Product Style:  ${activeStyle.name}`, 120, 310);
            ctx.fillText(`Selected Color:  ${activeColor.name} (${activeColor.hex})`, 120, 380);
            ctx.fillText(`Size / Capacity:  ${selectedSize}`, 120, 450);
            ctx.fillText(`Order Quantity:  ${quantity} pcs`, 120, 520);
            ctx.fillText(`Front Customization:  ${frontCustomization.layers.length > 0 ? "Active Print" : "Plain"}`, 120, 590);
            ctx.fillText(`Back Customization:  ${backCustomization.layers.length > 0 ? "Active Print" : "Plain"}`, 120, 660);

            // Total Price Badge
            ctx.fillStyle = "#222222";
            ctx.fillRect(960, 280, 480, 200);
            ctx.fillStyle = "#A3A3A3";
            ctx.font = "24px sans-serif";
            ctx.fillText("Estimated Total Price", 1000, 340);
            ctx.fillStyle = "#FF4D5A";
            ctx.font = "bold 64px sans-serif";
            ctx.fillText(`₹${estimatedTotalPrice}`, 1000, 430);

            // Footer
            ctx.fillStyle = "#737373";
            ctx.font = "22px sans-serif";
            ctx.fillText("Penubarthi, Rapur (Mandal), Nellore District, A.P. | WhatsApp: +91 8985065578 / 9550151533", 80, 840);
            ctx.fillText(`Generated Date: ${new Date().toLocaleDateString("en-IN")}`, 80, 880);

            const fallbackUrl = fallbackCanvas.toDataURL("image/png");
            setRenderedDataUrl(fallbackUrl);
            fallbackCanvas.toBlob((b) => {
              if (b) setRenderedBlob(b);
              setIsGeneratingQuotation(false);
            }, "image/png");
          } else {
            setIsGeneratingQuotation(false);
          }
        } catch {
          setIsGeneratingQuotation(false);
        }
      }
    }, 450);
  };

  // Add to Website Cart Drawer
  const handleAddToCart = () => {
    addToCart({
      productId: `custom-${selectedStyleId}`,
      name: `Custom ${activeStyle.name} (${activeColor.name})`,
      price: singleUnitPrice,
      image: "/products/custom-design.png",
      size: selectedSize,
      color: activeColor.hex,
      quantity: quantity,
      customText: frontCustomization.layers.some((l) => l.type === "text")
        ? "Custom Text & Art"
        : undefined
    });

    try {
      confetti({ particleCount: 35, spread: 60, origin: { y: 0.7 } });
    } catch {}
  };

  return (
    <div className="space-y-6">
      {/* ============================================================ */}
      {/* 4-STEP PROGRESS HEADER (Tap to open corresponding sheet)      */}
      {/* ============================================================ */}
      <div className="bg-white rounded-2xl border border-[#E7E7E7] p-2.5 sm:p-4 shadow-xs">
        <div className="grid grid-cols-4 gap-1.5 sm:gap-4">
          {[
            { num: 1, label: "Style", fullLabel: "Choose Style", sub: activeStyle.name, sheet: "style" as const },
            { num: 2, label: "Specs", fullLabel: "Size & Color", sub: `${activeColor.name} • ${selectedSize}`, sheet: "color" as const },
            { num: 3, label: "Artwork", fullLabel: "Add Artwork", sub: `${frontCustomization.layers.length + backCustomization.layers.length} Layers`, sheet: "upload" as const },
            { num: 4, label: "Quote", fullLabel: "Get Quotation", sub: `₹${estimatedTotalPrice}`, sheet: null }
          ].map((step) => {
            const isActive = currentStep === step.num;
            const isCompleted = currentStep > step.num;

            return (
              <button
                key={step.num}
                type="button"
                onClick={() => {
                  setCurrentStep(step.num as any);
                  if (step.sheet) {
                    setMobileSheet(step.sheet);
                  } else if (step.num === 4) {
                    handleGenerateQuotation();
                  }
                }}
                className={`text-left p-2 sm:p-2.5 rounded-xl border transition-all ${
                  isActive
                    ? "bg-red-50/60 border-[#E11D2E] ring-1 ring-[#E11D2E]/20"
                    : isCompleted
                    ? "bg-gray-50 border-gray-200"
                    : "bg-transparent border-transparent hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span
                    className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold shrink-0 ${
                      isActive
                        ? "bg-[#E11D2E] text-white"
                        : isCompleted
                        ? "bg-emerald-600 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : step.num}
                  </span>
                  <span
                    className={`font-poppins font-bold text-xs truncate ${
                      isActive ? "text-[#E11D2E]" : "text-[#0B0B0B]"
                    }`}
                  >
                    <span className="sm:hidden">{step.label}</span>
                    <span className="hidden sm:inline">{step.fullLabel}</span>
                  </span>
                </div>
                <div className="hidden sm:block text-[10px] text-gray-500 font-mono mt-1 truncate pl-7">
                  {step.sub}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ============================================================ */}
      {/* MAIN 3-COLUMN DESKTOP & RESPONSIVE MOBILE STUDIO            */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ============================================================ */}
        {/* LEFT COLUMN: STYLE, COLOR, SIZE & SPECS (Desktop Col 4)      */}
        {/* ============================================================ */}
        <div className="hidden lg:block lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl border border-[#E7E7E7] p-5 shadow-xs space-y-6">
            {/* Style Selector */}
            <StyleSelector
              selectedStyleId={selectedStyleId}
              currentColorHex={activeColor.hex}
              onSelectStyle={handleSelectStyle}
            />

            <hr className="border-gray-100" />

            {/* Color, Size & Quantity */}
            <ColorSizeSelector
              colors={activeStyle.colors}
              selectedColorId={selectedColorId}
              onSelectColor={setSelectedColorId}
              availableSizes={activeStyle.availableSizes}
              selectedSize={selectedSize}
              onSelectSize={setSelectedSize}
              quantity={quantity}
              onChangeQuantity={setQuantity}
            />
          </div>

          {/* Pricing Summary Card */}
          <div className="bg-[#0B0B0B] text-white rounded-2xl border border-[#262626] p-5 space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-400">Garment Base ({activeStyle.name})</span>
              <span>₹{basePrice}</span>
            </div>
            {frontCustomization.layers.length > 0 && (
              <div className="flex items-center justify-between text-xs text-gray-300">
                <span>Front Print Addon</span>
                <span>+₹50</span>
              </div>
            )}
            {backCustomization.layers.length > 0 && (
              <div className="flex items-center justify-between text-xs text-gray-300">
                <span>Back Print Addon</span>
                <span>+₹70</span>
              </div>
            )}

            <div className="pt-3 border-t border-[#262626] flex items-center justify-between">
              <div>
                <span className="text-[10px] text-gray-400 uppercase font-mono block">Estimated Total</span>
                <span className="text-[11px] text-gray-400">₹{singleUnitPrice} × {quantity} pcs</span>
              </div>
              <div className="font-poppins font-black text-2xl text-[#FF4D5A]">
                ₹{estimatedTotalPrice}
              </div>
            </div>

            <button
              type="button"
              onClick={handleGenerateQuotation}
              className="w-full flex items-center justify-center gap-2 bg-[#E11D2E] hover:bg-[#C51322] text-white font-poppins font-bold text-xs py-3 rounded-xl shadow-lg transition-transform active:scale-95"
            >
              <FileText className="w-4 h-4" />
              <span>Get WhatsApp Quotation →</span>
            </button>
          </div>
        </div>

        {/* ============================================================ */}
        {/* CENTER COLUMN: LIVE INTERACTIVE T-SHIRT CANVAS (Col 5)       */}
        {/* ============================================================ */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#121212] rounded-3xl border border-[#262626] p-3.5 sm:p-6 relative shadow-xl overflow-hidden">
            {/* Top Canvas Bar: Front/Back Segmented Control + Preview Mode */}
            <div className="flex items-center justify-between gap-2 pb-3.5 border-b border-[#262626]">
              {/* Segmented Control [ FRONT ] [ BACK ] */}
              <div className="flex items-center bg-[#1F1F1F] p-1 rounded-xl border border-[#333333]">
                <button
                  type="button"
                  onClick={() => {
                    setActiveSide("front");
                    setSelectedLayerId(null);
                  }}
                  className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeSide === "front"
                      ? "bg-[#E11D2E] text-white shadow-md"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <span>FRONT</span>
                  {frontCustomization.layers.length > 0 && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveSide("back");
                    setSelectedLayerId(null);
                  }}
                  className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeSide === "back"
                      ? "bg-[#E11D2E] text-white shadow-md"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <span>BACK</span>
                  {backCustomization.layers.length > 0 && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </button>
              </div>

              {/* Preview Toggle & Clear Side */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  type="button"
                  onClick={() => setIsPreviewMode(!isPreviewMode)}
                  className={`flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                    isPreviewMode
                      ? "bg-white text-black border-white"
                      : "bg-[#1F1F1F] text-gray-300 border-[#333333] hover:border-gray-500"
                  }`}
                >
                  {isPreviewMode ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{isPreviewMode ? "Edit" : "Preview"}</span>
                </button>

                {activeLayers.length > 0 && !isPreviewMode && (
                  <button
                    type="button"
                    onClick={handleResetSide}
                    className="p-1.5 text-gray-400 hover:text-red-400 transition-colors"
                    title={`Clear ${activeSide} layers`}
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* MAIN STAGE: The T-Shirt Mockup + Printable Region */}
            <div className="relative w-full aspect-square max-w-[340px] sm:max-w-[440px] mx-auto flex items-center justify-center my-2">
              {/* Base SVG Mockup with Shading & Folds */}
              <TshirtMockupSvg
                styleId={selectedStyleId}
                side={activeSide}
                colorHex={activeColor.hex}
                className="w-full h-full object-contain filter drop-shadow-2xl"
              />

              {/* Active Printable Boundary Canvas */}
              <PrintCanvas
                styleId={selectedStyleId}
                side={activeSide}
                printArea={
                  activeSide === "front"
                    ? activeStyle.frontPrintArea
                    : activeStyle.backPrintArea
                }
                layers={activeLayers}
                selectedLayerId={selectedLayerId}
                onSelectLayer={setSelectedLayerId}
                onUpdateLayer={handleUpdateLayer}
                onDeleteLayer={handleDeleteLayer}
                isPreviewMode={isPreviewMode}
              />
            </div>

            {/* Bottom Surface Switcher Thumbnails */}
            <div className="pt-3 border-t border-[#262626] flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3">
                {/* FRONT THUMBNAIL */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveSide("front");
                    setSelectedLayerId(null);
                  }}
                  className={`flex items-center gap-1.5 sm:gap-2 p-1.5 rounded-xl border transition-all ${
                    activeSide === "front"
                      ? "border-[#E11D2E] bg-red-950/20"
                      : "border-[#262626] bg-[#171717] hover:border-gray-500"
                  }`}
                >
                  <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-lg overflow-hidden bg-black/40 p-0.5">
                    <TshirtMockupSvg
                      styleId={selectedStyleId}
                      side="front"
                      colorHex={activeColor.hex}
                      className="w-full h-full"
                    />
                    {frontCustomization.layers.length > 0 && (
                      <span className="absolute bottom-0.5 right-0.5 w-2 h-2 rounded-full bg-[#E11D2E]" />
                    )}
                  </div>
                  <div className="text-left text-[10px] sm:text-[11px] pr-1.5">
                    <div className="font-bold text-white leading-tight">Front</div>
                    <div className="text-[9px] text-gray-400">
                      {frontCustomization.layers.length} items
                    </div>
                  </div>
                </button>

                {/* BACK THUMBNAIL */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveSide("back");
                    setSelectedLayerId(null);
                  }}
                  className={`flex items-center gap-1.5 sm:gap-2 p-1.5 rounded-xl border transition-all ${
                    activeSide === "back"
                      ? "border-[#E11D2E] bg-red-950/20"
                      : "border-[#262626] bg-[#171717] hover:border-gray-500"
                  }`}
                >
                  <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-lg overflow-hidden bg-black/40 p-0.5">
                    <TshirtMockupSvg
                      styleId={selectedStyleId}
                      side="back"
                      colorHex={activeColor.hex}
                      className="w-full h-full"
                    />
                    {backCustomization.layers.length > 0 && (
                      <span className="absolute bottom-0.5 right-0.5 w-2 h-2 rounded-full bg-[#E11D2E]" />
                    )}
                  </div>
                  <div className="text-left text-[10px] sm:text-[11px] pr-1.5">
                    <div className="font-bold text-white leading-tight">Back</div>
                    <div className="text-[9px] text-gray-400">
                      {backCustomization.layers.length} items
                    </div>
                  </div>
                </button>
              </div>

              {/* Status Hint */}
              <div className="text-[10px] text-gray-400 font-mono">
                {activeSide.toUpperCase()} Canvas
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* MOBILE 6-TOOL GRID (Fast access to all customizer features)  */}
          {/* ============================================================ */}
          <div className="lg:hidden grid grid-cols-3 sm:grid-cols-6 gap-2 pt-1">
            <button
              type="button"
              onClick={() => {
                setCurrentStep(1);
                setMobileSheet("style");
              }}
              className="p-2.5 bg-white border border-gray-200 rounded-xl flex flex-col items-center gap-1 text-xs font-bold text-gray-800 shadow-xs active:bg-gray-50 hover:border-[#E11D2E] transition-all"
            >
              <Shirt className="w-4 h-4 text-[#E11D2E]" />
              <span className="text-[10px] truncate max-w-full">Style ({activeStyle.name.split(" ")[0]})</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setCurrentStep(2);
                setMobileSheet("color");
              }}
              className="p-2.5 bg-white border border-gray-200 rounded-xl flex flex-col items-center gap-1 text-xs font-bold text-gray-800 shadow-xs active:bg-gray-50 hover:border-[#E11D2E] transition-all"
            >
              <div className="flex items-center gap-1">
                <span
                  className="w-3.5 h-3.5 rounded-full border border-gray-300"
                  style={{ backgroundColor: activeColor.hex }}
                />
                <span className="text-[10px]">{selectedSize}</span>
              </div>
              <span className="text-[10px] truncate max-w-full">Color & Size</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setCurrentStep(3);
                setMobileSheet("upload");
              }}
              className="p-2.5 bg-white border border-gray-200 rounded-xl flex flex-col items-center gap-1 text-xs font-bold text-gray-800 shadow-xs active:bg-gray-50 hover:border-[#E11D2E] transition-all"
            >
              <Upload className="w-4 h-4 text-[#E11D2E]" />
              <span className="text-[10px]">Upload</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setCurrentStep(3);
                setMobileSheet("text");
              }}
              className="p-2.5 bg-white border border-gray-200 rounded-xl flex flex-col items-center gap-1 text-xs font-bold text-gray-800 shadow-xs active:bg-gray-50 hover:border-[#E11D2E] transition-all"
            >
              <Type className="w-4 h-4 text-[#E11D2E]" />
              <span className="text-[10px]">Add Text</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setCurrentStep(3);
                setMobileSheet("graphics");
              }}
              className="p-2.5 bg-white border border-gray-200 rounded-xl flex flex-col items-center gap-1 text-xs font-bold text-gray-800 shadow-xs active:bg-gray-50 hover:border-[#E11D2E] transition-all"
            >
              <Sparkles className="w-4 h-4 text-[#E11D2E]" />
              <span className="text-[10px]">Graphics</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setCurrentStep(3);
                setMobileSheet("layers");
              }}
              className="p-2.5 bg-white border border-gray-200 rounded-xl flex flex-col items-center gap-1 text-xs font-bold text-gray-800 shadow-xs active:bg-gray-50 hover:border-[#E11D2E] transition-all relative"
            >
              <div className="relative">
                <Layers className="w-4 h-4 text-[#E11D2E]" />
                {activeLayers.length > 0 && (
                  <span className="absolute -top-1 -right-2.5 bg-[#E11D2E] text-white text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                    {activeLayers.length}
                  </span>
                )}
              </div>
              <span className="text-[10px]">Layers</span>
            </button>
          </div>

          {/* ============================================================ */}
          {/* MOBILE DOCKED ACTIONS BAR (Sticky / Floating)                 */}
          {/* ============================================================ */}
          <div className="lg:hidden bg-[#0B0B0B] text-white rounded-2xl border border-[#262626] p-3.5 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] text-gray-400 font-mono block uppercase">
                  {activeStyle.name} • {activeColor.name} ({selectedSize})
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="font-poppins font-black text-lg text-[#FF4D5A]">
                    ₹{estimatedTotalPrice}
                  </span>
                  <span className="text-[10px] text-gray-400">
                    (₹{singleUnitPrice} × {quantity} pcs)
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className="py-2 px-3 bg-white/10 hover:bg-white/20 text-white font-poppins font-semibold text-xs rounded-xl border border-white/15 flex items-center gap-1.5 transition-colors"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-[#FF4D5A]" />
                <span>Add to Bag</span>
              </button>
            </div>

            <button
              type="button"
              onClick={handleGenerateQuotation}
              className="w-full py-3 bg-[#E11D2E] hover:bg-[#C51322] text-white font-poppins font-bold text-xs rounded-xl shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95"
            >
              <FileText className="w-4 h-4" />
              <span>Get WhatsApp Quotation Proof (₹{estimatedTotalPrice}) →</span>
            </button>
          </div>
        </div>

        {/* ============================================================ */}
        {/* RIGHT COLUMN: DESIGN TOOLS & LAYERS (Desktop Col 3)          */}
        {/* ============================================================ */}
        <div className="hidden lg:block lg:col-span-3 space-y-6">
          <DesignTools
            activeSide={activeSide}
            layers={activeLayers}
            selectedLayerId={selectedLayerId}
            onSelectLayer={setSelectedLayerId}
            onAddImageLayer={handleAddImageLayer}
            onAddTextLayer={handleAddTextLayer}
            onAddElementLayer={handleAddElementLayer}
            onUpdateLayer={handleUpdateLayer}
            onDeleteLayer={handleDeleteLayer}
            onDuplicateLayer={handleDuplicateLayer}
            onReorderLayer={handleReorderLayer}
          />

          {/* Direct Add to Cart Action */}
          <div className="bg-white rounded-2xl border border-[#E7E7E7] p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-gray-700">Add to Store Bag</span>
              <span className="text-gray-500 font-mono text-[11px]">Direct Checkout</span>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              className="w-full py-3 bg-[#0B0B0B] hover:bg-[#1A1A1A] text-white font-poppins font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95"
            >
              <ShoppingBag className="w-4 h-4 text-[#FF4D5A]" />
              <span>Add Custom {activeStyle.name} to Bag</span>
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* MOBILE BOTTOM SHEETS (Slide up for touch editing)            */}
      {/* ============================================================ */}
      {/* 1. Style Selector Sheet */}
      <MobileToolSheet
        isOpen={mobileSheet === "style"}
        onClose={() => setMobileSheet(null)}
        title="Select Garment Style"
      >
        <StyleSelector
          selectedStyleId={selectedStyleId}
          currentColorHex={activeColor.hex}
          onSelectStyle={(id) => {
            handleSelectStyle(id);
            setMobileSheet(null);
          }}
        />
      </MobileToolSheet>

      {/* 2. Color & Size Sheet */}
      <MobileToolSheet
        isOpen={mobileSheet === "color"}
        onClose={() => setMobileSheet(null)}
        title="Choose Color, Size & Quantity"
      >
        <ColorSizeSelector
          colors={activeStyle.colors}
          selectedColorId={selectedColorId}
          onSelectColor={setSelectedColorId}
          availableSizes={activeStyle.availableSizes}
          selectedSize={selectedSize}
          onSelectSize={setSelectedSize}
          quantity={quantity}
          onChangeQuantity={setQuantity}
        />
      </MobileToolSheet>

      {/* 3. Upload & Design Tools Sheet */}
      <MobileToolSheet
        isOpen={
          mobileSheet === "upload" ||
          mobileSheet === "text" ||
          mobileSheet === "graphics" ||
          mobileSheet === "layers"
        }
        onClose={() => setMobileSheet(null)}
        title={`${
          mobileSheet === "layers"
            ? "Manage Layers"
            : mobileSheet === "text"
            ? "Add Custom Text"
            : mobileSheet === "graphics"
            ? "Preset Graphics"
            : "Upload Artwork"
        } (${activeSide.toUpperCase()})`}
      >
        <DesignTools
          activeSide={activeSide}
          layers={activeLayers}
          selectedLayerId={selectedLayerId}
          initialTab={
            mobileSheet === "text"
              ? "text"
              : mobileSheet === "graphics"
              ? "graphics"
              : mobileSheet === "layers"
              ? "layers"
              : "upload"
          }
          onSelectLayer={setSelectedLayerId}
          onAddImageLayer={(l) => {
            handleAddImageLayer(l);
            setMobileSheet(null);
          }}
          onAddTextLayer={(l) => {
            handleAddTextLayer(l);
            setMobileSheet(null);
          }}
          onAddElementLayer={(g) => {
            handleAddElementLayer(g);
            setMobileSheet(null);
          }}
          onUpdateLayer={handleUpdateLayer}
          onDeleteLayer={handleDeleteLayer}
          onDuplicateLayer={handleDuplicateLayer}
          onReorderLayer={handleReorderLayer}
        />
      </MobileToolSheet>

      {/* ============================================================ */}
      {/* OFFSCREEN QUOTATION EXPORT CARD FOR HTML-TO-CANVAS           */}
      {/* ============================================================ */}
      <div style={{ position: "fixed", left: "-9999px", top: 0, width: "900px", zIndex: -100 }}>
        <QuotationExportCard
          ref={exportCardRef}
          styleConfig={activeStyle}
          activeColor={activeColor}
          size={selectedSize}
          quantity={quantity}
          frontCustomization={frontCustomization}
          backCustomization={backCustomization}
          estimatedPrice={estimatedTotalPrice}
          dateString={new Date().toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric"
          })}
        />
      </div>

      {/* ============================================================ */}
      {/* QUOTATION MODAL (WhatsApp Share & Download PNG)             */}
      {/* ============================================================ */}
      <QuotationModal
        isOpen={isQuotationOpen}
        onClose={() => setIsQuotationOpen(false)}
        renderedDataUrl={renderedDataUrl}
        renderedBlob={renderedBlob}
        styleConfig={activeStyle}
        activeColor={activeColor}
        size={selectedSize}
        quantity={quantity}
        frontCustomization={frontCustomization}
        backCustomization={backCustomization}
        estimatedPrice={estimatedTotalPrice}
        isGenerating={isGeneratingQuotation}
      />
    </div>
  );
}
