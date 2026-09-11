"use client";

import React, { useState, useRef } from "react";
import {
  GarmentSide,
  DesignLayer,
  ImageLayer,
  TextLayer,
  ElementLayer
} from "./types";
import { presetGraphics, PresetGraphic } from "./data/designLibrary";
import {
  Upload,
  Type,
  Sparkles,
  Layers,
  Trash2,
  Copy,
  ArrowUp,
  ArrowDown,
  Bold,
  Italic,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlertCircle
} from "lucide-react";

interface DesignToolsProps {
  activeSide: GarmentSide;
  layers: DesignLayer[];
  selectedLayerId: string | null;
  onSelectLayer: (id: string | null) => void;
  onAddImageLayer: (layer: ImageLayer) => void;
  onAddTextLayer: (layer: TextLayer) => void;
  onAddElementLayer: (graphic: PresetGraphic) => void;
  onUpdateLayer: (layer: DesignLayer) => void;
  onDeleteLayer: (id: string) => void;
  onDuplicateLayer: (id: string) => void;
  onReorderLayer: (id: string, direction: "up" | "down") => void;
  className?: string;
}

export default function DesignTools({
  activeSide,
  layers,
  selectedLayerId,
  onSelectLayer,
  onAddImageLayer,
  onAddTextLayer,
  onAddElementLayer,
  onUpdateLayer,
  onDeleteLayer,
  onDuplicateLayer,
  onReorderLayer,
  className = ""
}: DesignToolsProps) {
  const [activeTab, setActiveTab] = useState<"upload" | "text" | "graphics" | "layers">("upload");
  const [uploadError, setUploadError] = useState<string | null>(null);

  // New text state
  const [customText, setCustomText] = useState("");
  const [fontFamily, setFontFamily] = useState<"Poppins" | "Montserrat" | "Caveat">("Poppins");
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [isBold, setIsBold] = useState(true);
  const [isItalic, setIsItalic] = useState(false);
  const [alignment, setAlignment] = useState<"left" | "center" | "right">("center");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Selected layer reference
  const selectedLayer = layers.find((l) => l.id === selectedLayerId);

  // Handle Client-Side Image Upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size (<=10MB)
    if (file.size > 10 * 1024 * 1024) {
      setUploadError("Image exceeds 10MB limit. Please choose a smaller file.");
      return;
    }

    // Supported types
    const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp", "image/svg+xml"];
    if (!validTypes.includes(file.type)) {
      setUploadError("Unsupported format. Please upload PNG, JPG, or WebP.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      const img = new window.Image();
      img.onload = () => {
        const aspect = img.width / img.height;
        // Standard initial dimension fitting 75% of print area
        let initialWidth = 70;
        let initialHeight = 70;

        if (aspect >= 1) {
          initialHeight = initialWidth / aspect;
        } else {
          initialWidth = initialHeight * aspect;
        }

        const newLayer: ImageLayer = {
          id: `img-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          type: "image",
          side: activeSide,
          src: result,
          fileName: file.name,
          originalWidth: img.width,
          originalHeight: img.height,
          aspectRatio: aspect,
          x: 50, // Centered
          y: 50, // Centered
          width: Math.min(85, initialWidth),
          height: Math.min(85, initialHeight),
          rotation: 0,
          scale: 1,
          opacity: 1,
          zIndex: layers.length + 1
        };

        onAddImageLayer(newLayer);
        // Switch to layers tab so user sees it added
        setActiveTab("layers");
      };
      img.src = result;
    };
    reader.readAsDataURL(file);

    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Add Text Layer
  const handleAddText = () => {
    if (!customText.trim()) return;

    const newLayer: TextLayer = {
      id: `txt-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      type: "text",
      side: activeSide,
      text: customText,
      fontFamily: fontFamily,
      fontSize: 22,
      color: textColor,
      isBold: isBold,
      isItalic: isItalic,
      alignment: alignment,
      x: 50,
      y: 50,
      width: 70,
      height: 30,
      rotation: 0,
      scale: 1,
      opacity: 1,
      zIndex: layers.length + 1
    };

    onAddTextLayer(newLayer);
    setCustomText("");
    setActiveTab("layers");
  };

  return (
    <div className={`bg-white rounded-2xl border border-[#E7E7E7] overflow-hidden shadow-xs ${className}`}>
      {/* Tab Navigation */}
      <div className="grid grid-cols-4 border-b border-gray-200 bg-gray-50/70 p-1 gap-1">
        <button
          type="button"
          onClick={() => setActiveTab("upload")}
          className={`flex flex-col items-center gap-1 py-2 px-1 rounded-xl text-[11px] font-bold transition-all ${
            activeTab === "upload"
              ? "bg-white text-[#E11D2E] shadow-xs"
              : "text-gray-500 hover:text-gray-900"
          }`}
        >
          <Upload className="w-4 h-4" />
          <span>Upload</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("text")}
          className={`flex flex-col items-center gap-1 py-2 px-1 rounded-xl text-[11px] font-bold transition-all ${
            activeTab === "text"
              ? "bg-white text-[#E11D2E] shadow-xs"
              : "text-gray-500 hover:text-gray-900"
          }`}
        >
          <Type className="w-4 h-4" />
          <span>Text</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("graphics")}
          className={`flex flex-col items-center gap-1 py-2 px-1 rounded-xl text-[11px] font-bold transition-all ${
            activeTab === "graphics"
              ? "bg-white text-[#E11D2E] shadow-xs"
              : "text-gray-500 hover:text-gray-900"
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Graphics</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("layers")}
          className={`flex flex-col items-center gap-1 py-2 px-1 rounded-xl text-[11px] font-bold transition-all relative ${
            activeTab === "layers"
              ? "bg-white text-[#E11D2E] shadow-xs"
              : "text-gray-500 hover:text-gray-900"
          }`}
        >
          <div className="relative">
            <Layers className="w-4 h-4" />
            {layers.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#E11D2E] text-white text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                {layers.length}
              </span>
            )}
          </div>
          <span>Layers</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="p-4">
        {/* ============================================================ */}
        {/* 1. UPLOAD IMAGE TAB                                          */}
        {/* ============================================================ */}
        {activeTab === "upload" && (
          <div className="space-y-4">
            <div>
              <h4 className="font-poppins font-bold text-xs text-[#0B0B0B]">
                Upload Artwork to {activeSide.toUpperCase()} Side
              </h4>
              <p className="text-[11px] text-gray-500 mt-0.5">
                PNG, JPG, or WebP. Processed 100% locally on your device.
              </p>
            </div>

            {uploadError && (
              <div className="flex items-start gap-2 p-2.5 bg-red-50 border border-red-200 rounded-xl text-xs text-[#E11D2E]">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{uploadError}</span>
              </div>
            )}

            <label className="border-2 border-dashed border-gray-300 hover:border-[#E11D2E] rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-gray-50/50 hover:bg-red-50/30 group">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/webp"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="w-11 h-11 rounded-full bg-red-50 text-[#E11D2E] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Upload className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-gray-800">
                Tap or Drag Artwork Here
              </span>
              <span className="text-[10px] text-gray-400 mt-1">
                Transparent PNG recommended for best direct printing
              </span>
            </label>

            <div className="text-[11px] text-gray-400 space-y-1">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
                <span>Images are kept private & rendered client-side</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span>Automatically scales to fit 70-80% of chest area</span>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* 2. TEXT TOOL TAB                                             */}
        {/* ============================================================ */}
        {activeTab === "text" && (
          <div className="space-y-4">
            <div>
              <h4 className="font-poppins font-bold text-xs text-[#0B0B0B]">
                Add Custom Text / Name
              </h4>
              <p className="text-[11px] text-gray-500 mt-0.5">
                Choose typography, color, and alignment for {activeSide.toUpperCase()}.
              </p>
            </div>

            <div>
              <input
                type="text"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="Type your slogan, team name, or number..."
                className="w-full bg-[#FAFAFA] border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#E11D2E] focus:ring-1 focus:ring-[#E11D2E]"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAddText();
                }}
              />
            </div>

            {/* Typography Controls */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-bold text-gray-600 uppercase block mb-1">
                  Font Family
                </label>
                <select
                  value={fontFamily}
                  onChange={(e) => setFontFamily(e.target.value as any)}
                  className="w-full bg-white border border-gray-300 rounded-lg p-2 text-xs focus:outline-none focus:border-[#E11D2E]"
                >
                  <option value="Poppins">Poppins (Bold Clean)</option>
                  <option value="Montserrat">Montserrat (Modern)</option>
                  <option value="Caveat">Caveat (Handwritten)</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-600 uppercase block mb-1">
                  Text Color
                </label>
                <div className="flex items-center gap-1.5">
                  {["#FFFFFF", "#000000", "#E11D2E", "#FFD700", "#1E90FF"].map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setTextColor(c)}
                      className={`w-6 h-6 rounded-full border ${
                        textColor === c ? "ring-2 ring-offset-1 ring-[#E11D2E]" : "border-gray-300"
                      }`}
                      style={{ backgroundColor: c }}
                      title={c}
                    />
                  ))}
                  <input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-6 h-6 rounded-full cursor-pointer p-0 border-0"
                    title="Custom Color"
                  />
                </div>
              </div>
            </div>

            {/* Formatting: Bold, Italic, Align */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
                <button
                  type="button"
                  onClick={() => setIsBold(!isBold)}
                  className={`p-1.5 rounded ${isBold ? "bg-white shadow-xs text-[#E11D2E]" : "text-gray-600"}`}
                  title="Bold"
                >
                  <Bold className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsItalic(!isItalic)}
                  className={`p-1.5 rounded ${isItalic ? "bg-white shadow-xs text-[#E11D2E]" : "text-gray-600"}`}
                  title="Italic"
                >
                  <Italic className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
                <button
                  type="button"
                  onClick={() => setAlignment("left")}
                  className={`p-1.5 rounded ${alignment === "left" ? "bg-white shadow-xs text-[#E11D2E]" : "text-gray-600"}`}
                >
                  <AlignLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setAlignment("center")}
                  className={`p-1.5 rounded ${alignment === "center" ? "bg-white shadow-xs text-[#E11D2E]" : "text-gray-600"}`}
                >
                  <AlignCenter className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setAlignment("right")}
                  className={`p-1.5 rounded ${alignment === "right" ? "bg-white shadow-xs text-[#E11D2E]" : "text-gray-600"}`}
                >
                  <AlignRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAddText}
              disabled={!customText.trim()}
              className="w-full py-2.5 bg-[#E11D2E] hover:bg-[#C51322] disabled:opacity-40 text-white font-poppins font-bold text-xs rounded-xl transition-all shadow-sm"
            >
              Add Text Layer to {activeSide.toUpperCase()}
            </button>
          </div>
        )}

        {/* ============================================================ */}
        {/* 3. GRAPHICS PRESETS TAB                                      */}
        {/* ============================================================ */}
        {activeTab === "graphics" && (
          <div className="space-y-3">
            <div>
              <h4 className="font-poppins font-bold text-xs text-[#0B0B0B]">
                Preset Graphics & Badges
              </h4>
              <p className="text-[11px] text-gray-500 mt-0.5">
                Tap any design to place it onto {activeSide.toUpperCase()}.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5 max-h-[220px] overflow-y-auto pr-1">
              {presetGraphics.map((graphic) => (
                <button
                  key={graphic.id}
                  type="button"
                  onClick={() => {
                    onAddElementLayer(graphic);
                    setActiveTab("layers");
                  }}
                  className="p-2 border border-gray-200 rounded-xl hover:border-[#E11D2E] hover:bg-red-50/20 text-left transition-all group flex items-center gap-2"
                >
                  <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden relative shrink-0">
                    <img
                      src={graphic.previewUrl}
                      alt={graphic.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-bold text-gray-800 truncate">
                      {graphic.title}
                    </div>
                    <div className="text-[9px] text-gray-400">
                      {graphic.category}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* 4. LAYERS MANAGER TAB                                        */}
        {/* ============================================================ */}
        {activeTab === "layers" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-poppins font-bold text-xs text-[#0B0B0B]">
                  Active {activeSide.toUpperCase()} Layers ({layers.length})
                </h4>
                <p className="text-[11px] text-gray-500">
                  Select a layer to adjust position or delete.
                </p>
              </div>
            </div>

            {layers.length === 0 ? (
              <div className="text-center py-6 text-gray-400 text-xs border border-dashed border-gray-200 rounded-xl">
                No layers added on {activeSide} side yet.
              </div>
            ) : (
              <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                {layers.map((layer, index) => {
                  const isSelected = selectedLayerId === layer.id;

                  return (
                    <div
                      key={layer.id}
                      onClick={() => onSelectLayer(layer.id)}
                      className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 transition-all cursor-pointer ${
                        isSelected
                          ? "bg-red-50/50 border-[#E11D2E] ring-1 ring-[#E11D2E]/20"
                          : "bg-white border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="w-4 h-4 rounded-full bg-gray-200 text-gray-600 text-[9px] font-mono flex items-center justify-center shrink-0">
                          {index + 1}
                        </span>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-gray-800 truncate">
                            {layer.type === "image"
                              ? layer.fileName || "Uploaded Image"
                              : layer.type === "text"
                              ? `"${layer.text}"`
                              : layer.title || "Graphic Badge"}
                          </div>
                          <div className="text-[9px] text-gray-400 font-mono">
                            {layer.type.toUpperCase()} • {Math.round(layer.scale * 100)}% scale
                          </div>
                        </div>
                      </div>

                      {/* Layer Actions */}
                      <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          onClick={() => onReorderLayer(layer.id, "up")}
                          disabled={index === layers.length - 1}
                          className="p-1 text-gray-400 hover:text-gray-700 disabled:opacity-20"
                          title="Bring Forward"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onReorderLayer(layer.id, "down")}
                          disabled={index === 0}
                          className="p-1 text-gray-400 hover:text-gray-700 disabled:opacity-20"
                          title="Send Backward"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onDuplicateLayer(layer.id)}
                          className="p-1 text-gray-400 hover:text-[#E11D2E]"
                          title="Duplicate Layer"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onDeleteLayer(layer.id)}
                          className="p-1 text-red-500 hover:text-red-700"
                          title="Delete Layer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
