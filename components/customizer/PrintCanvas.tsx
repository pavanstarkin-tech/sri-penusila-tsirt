"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import {
  TshirtStyleId,
  GarmentSide,
  PrintAreaConfig,
  DesignLayer,
  ImageLayer,
  TextLayer,
  ElementLayer
} from "./types";
import {
  RotateCw,
  Move,
  Trash2,
  Maximize2,
  ZoomIn,
  ZoomOut,
  Sparkles
} from "lucide-react";

interface PrintCanvasProps {
  styleId: TshirtStyleId;
  side: GarmentSide;
  printArea: PrintAreaConfig;
  layers: DesignLayer[];
  selectedLayerId: string | null;
  onSelectLayer: (id: string | null) => void;
  onUpdateLayer: (layer: DesignLayer) => void;
  onDeleteLayer: (id: string) => void;
  isPreviewMode: boolean;
  className?: string;
}

export default function PrintCanvas({
  styleId,
  side,
  printArea,
  layers,
  selectedLayerId,
  onSelectLayer,
  onUpdateLayer,
  onDeleteLayer,
  isPreviewMode,
  className = ""
}: PrintCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const [initialLayerPos, setInitialLayerPos] = useState<{ x: number; y: number } | null>(null);

  const selectedLayer = layers.find((l) => l.id === selectedLayerId);

  // Handle pointer down on a layer
  const handleLayerPointerDown = (
    e: React.PointerEvent,
    layer: DesignLayer
  ) => {
    if (isPreviewMode) return;
    e.stopPropagation();
    onSelectLayer(layer.id);
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setInitialLayerPos({ x: layer.x, y: layer.y });
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  // Handle pointer move while dragging
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !dragStart || !initialLayerPos || !selectedLayer || !containerRef.current) {
      return;
    }

    const rect = containerRef.current.getBoundingClientRect();
    const deltaX = ((e.clientX - dragStart.x) / rect.width) * 100;
    const deltaY = ((e.clientY - dragStart.y) / rect.height) * 100;

    // Constrain layer inside printable area bounds
    const newX = Math.max(-20, Math.min(100, initialLayerPos.x + deltaX));
    const newY = Math.max(-20, Math.min(100, initialLayerPos.y + deltaY));

    onUpdateLayer({
      ...selectedLayer,
      x: newX,
      y: newY
    });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDragging) {
      setIsDragging(false);
      setDragStart(null);
      setInitialLayerPos(null);
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {}
    }
  };

  // Quick helper transformations
  const handleScale = (factor: number) => {
    if (!selectedLayer) return;
    const newScale = Math.max(0.3, Math.min(3.0, selectedLayer.scale + factor));
    onUpdateLayer({ ...selectedLayer, scale: Number(newScale.toFixed(2)) });
  };

  const handleRotate = (angle: number) => {
    if (!selectedLayer) return;
    const newRot = (selectedLayer.rotation + angle) % 360;
    onUpdateLayer({ ...selectedLayer, rotation: newRot });
  };

  const handleCenter = () => {
    if (!selectedLayer) return;
    onUpdateLayer({ ...selectedLayer, x: 50, y: 50, rotation: 0 });
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onClick={() => {
        if (!isPreviewMode) onSelectLayer(null);
      }}
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{
        left: `${printArea.x}%`,
        top: `${printArea.y}%`,
        width: `${printArea.width}%`,
        height: `${printArea.height}%`
      }}
    >
      {/* Subtle dashed guide line during editing mode */}
      {!isPreviewMode && (
        <div className="absolute inset-0 border border-dashed border-[#E11D2E]/40 pointer-events-none rounded-lg flex flex-col justify-between p-1.5 transition-opacity">
          <div className="flex justify-between items-center text-[9px] font-mono uppercase tracking-widest text-[#E11D2E]/70 select-none">
            <span>PRINT AREA</span>
            <span>{side.toUpperCase()}</span>
          </div>

          {layers.length === 0 && (
            <div className="flex flex-col items-center justify-center space-y-1 my-auto text-center pointer-events-none select-none">
              <Sparkles className="w-5 h-5 text-gray-400/60" />
              <div className="text-[11px] font-semibold text-gray-400">
                Add Design or Text
              </div>
              <div className="text-[9px] text-gray-400/70 max-w-[140px]">
                Artwork will be centered here automatically
              </div>
            </div>
          )}

          <div className="text-[8px] font-mono text-gray-400/50 text-right select-none">
            300 DPI DIRECT PRINT
          </div>
        </div>
      )}

      {/* Render Design Layers */}
      {layers.map((layer) => {
        const isSelected = !isPreviewMode && selectedLayerId === layer.id;

        return (
          <div
            key={layer.id}
            onPointerDown={(e) => handleLayerPointerDown(e, layer)}
            className={`absolute select-none cursor-move touch-none transition-shadow ${
              isSelected
                ? "ring-2 ring-[#E11D2E] ring-offset-1 rounded shadow-lg z-30"
                : "hover:ring-1 hover:ring-black/20"
            }`}
            style={{
              left: `${layer.x}%`,
              top: `${layer.y}%`,
              transform: `translate(-50%, -50%) rotate(${layer.rotation}deg) scale(${layer.scale})`,
              transformOrigin: "center center",
              opacity: layer.opacity,
              zIndex: isSelected ? 30 : layer.zIndex
            }}
          >
            {/* 1. Image Layer */}
            {layer.type === "image" && (
              <div
                className="relative flex items-center justify-center"
                style={{
                  width: `${layer.width * 2.2}px`,
                  height: `${layer.height * 2.2}px`,
                  maxWidth: "280px",
                  maxHeight: "280px"
                }}
              >
                <img
                  src={layer.src}
                  alt="Custom Print Artwork"
                  className="w-full h-full object-contain pointer-events-none drop-shadow-sm"
                  draggable={false}
                />
              </div>
            )}

            {/* 2. Text Layer */}
            {layer.type === "text" && (
              <div
                className="px-2 py-1 whitespace-pre-wrap leading-tight drop-shadow-sm"
                style={{
                  fontFamily: layer.fontFamily,
                  fontSize: `${layer.fontSize}px`,
                  color: layer.color,
                  fontWeight: layer.isBold ? "bold" : "normal",
                  fontStyle: layer.isItalic ? "italic" : "normal",
                  textAlign: layer.alignment
                }}
              >
                {layer.text || "Your Text"}
              </div>
            )}

            {/* 3. Element Layer (Badge / Clipart) */}
            {layer.type === "element" && (
              <div className="w-24 h-24 relative flex items-center justify-center p-1">
                {layer.svgPath ? (
                  <svg viewBox="0 0 100 100" className="w-full h-full fill-current" style={{ color: layer.color || "#000" }}>
                    <path d={layer.svgPath} />
                  </svg>
                ) : (
                  <img
                    src={layer.src || ""}
                    alt={layer.title}
                    className="w-full h-full object-contain pointer-events-none"
                  />
                )}
              </div>
            )}

            {/* Editing Quick Controls (Appears above selected layer) */}
            {isSelected && !isPreviewMode && (
              <div
                className="absolute -top-11 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-[#0B0B0B] text-white px-2 py-1 rounded-full shadow-2xl border border-[#333333] pointer-events-auto z-40"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => handleScale(0.1)}
                  className="w-6 h-6 rounded-full hover:bg-white/20 flex items-center justify-center text-xs"
                  title="Scale Up"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleScale(-0.1)}
                  className="w-6 h-6 rounded-full hover:bg-white/20 flex items-center justify-center text-xs"
                  title="Scale Down"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleRotate(-15)}
                  className="w-6 h-6 rounded-full hover:bg-white/20 flex items-center justify-center text-xs"
                  title="Rotate Left"
                >
                  <RotateCw className="w-3 h-3 -scale-x-100" />
                </button>
                <button
                  type="button"
                  onClick={() => handleRotate(15)}
                  className="w-6 h-6 rounded-full hover:bg-white/20 flex items-center justify-center text-xs"
                  title="Rotate Right"
                >
                  <RotateCw className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={handleCenter}
                  className="w-6 h-6 rounded-full hover:bg-white/20 flex items-center justify-center text-xs"
                  title="Center Alignment"
                >
                  <Maximize2 className="w-3 h-3" />
                </button>
                <div className="w-px h-3.5 bg-gray-700 mx-0.5" />
                <button
                  type="button"
                  onClick={() => onDeleteLayer(layer.id)}
                  className="w-6 h-6 rounded-full bg-red-600/80 hover:bg-red-600 flex items-center justify-center text-white text-xs"
                  title="Delete Layer"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
