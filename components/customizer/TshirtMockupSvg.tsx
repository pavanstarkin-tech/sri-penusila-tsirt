"use client";

import React from "react";
import { TshirtStyleId, GarmentSide } from "./types";

interface TshirtMockupSvgProps {
  styleId: TshirtStyleId;
  side: GarmentSide;
  colorHex: string;
  className?: string;
}

export default function TshirtMockupSvg({
  styleId,
  side,
  colorHex,
  className = "w-full h-full"
}: TshirtMockupSvgProps) {
  const isLight = colorHex === "#FFFFFF" || colorHex === "#7E828A";
  const shadowOpacity = isLight ? 0.2 : 0.38;
  const highlightOpacity = isLight ? 0.25 : 0.12;

  return (
    <svg
      viewBox="0 0 500 500"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        {/* Soft 3D Studio Lighting Gradients */}
        <linearGradient id={`studio-light-${styleId}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#000000" stopOpacity={isLight ? 0.14 : 0.25} />
          <stop offset="18%" stopColor="#ffffff" stopOpacity={highlightOpacity} />
          <stop offset="50%" stopColor="#ffffff" stopOpacity={highlightOpacity * 0.4} />
          <stop offset="82%" stopColor="#000000" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#000000" stopOpacity={isLight ? 0.16 : 0.28} />
        </linearGradient>

        <linearGradient id={`vertical-shade-${styleId}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.12" />
          <stop offset="25%" stopColor="#ffffff" stopOpacity={highlightOpacity * 0.5} />
          <stop offset="75%" stopColor="#000000" stopOpacity="0.02" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.18" />
        </linearGradient>

        <linearGradient id="gold-zari-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D97706" />
          <stop offset="30%" stopColor="#FBBF24" />
          <stop offset="60%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>

        <linearGradient id="flag-wave" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.15" />
          <stop offset="25%" stopColor="#ffffff" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#000000" stopOpacity="0.12" />
          <stop offset="75%" stopColor="#ffffff" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.22" />
        </linearGradient>
      </defs>

      {/* ============================================================ */}
      {/* 1. HALF-HANDS T-SHIRT (Single Plain Half Sleeve T-Shirt)     */}
      {/* ============================================================ */}
      {styleId === "tshirt" && (
        <g id="tshirt-garment">
          {/* Subtle Studio Drop Shadow */}
          <path
            d="M 180 75 L 105 110 L 70 195 L 120 220 L 152 180 L 152 435 Q 250 444 348 435 L 348 180 L 380 220 L 430 195 L 395 110 L 320 75 Z"
            fill="#000000"
            opacity="0.12"
            transform="translate(0, 5)"
          />

          {/* Inner Back Neck Crescent (Front view) */}
          {side === "front" && (
            <path
              d="M 180 75 Q 250 58 320 75 Q 250 92 180 75 Z"
              fill="#141414"
              opacity="0.75"
            />
          )}

          {/* Main Anatomical Silhouette */}
          <path
            d="
              M 180 75
              L 105 110
              L 70 195
              L 120 220
              L 152 180
              L 152 435
              Q 250 444 348 435
              L 348 180
              L 380 220
              L 430 195
              L 395 110
              L 320 75
              Z
            "
            fill={colorHex}
            stroke="#1a1a1a"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />

          {/* Front Specific Crew Collar & Placket Shading */}
          {side === "front" && (
            <g id="tshirt-front-collar">
              <path
                d="M 180 75 Q 250 128 320 75 Q 250 114 180 75 Z"
                fill={colorHex}
                stroke="#1a1a1a"
                strokeWidth="1.4"
              />
              <path
                d="M 182 78 Q 250 124 318 78"
                stroke="#1a1a1a"
                strokeWidth="0.8"
                strokeDasharray="2,2"
                fill="none"
              />
            </g>
          )}

          {/* Back Specific Collar */}
          {side === "back" && (
            <g id="tshirt-back-collar">
              <path
                d="M 180 75 Q 250 62 320 75 Q 250 82 180 75 Z"
                fill={colorHex}
                stroke="#1a1a1a"
                strokeWidth="1.4"
              />
            </g>
          )}

          {/* Natural Fabric Wrinkles & Underarm Seams */}
          <g stroke="#000000" opacity={shadowOpacity} strokeWidth="1.2" strokeLinecap="round" fill="none">
            <path d="M 152 180 L 120 220" />
            <path d="M 348 180 L 380 220" />
            <path d="M 152 185 Q 165 240 156 295" />
            <path d="M 348 185 Q 335 240 344 295" />
            <path d="M 160 415 Q 250 425 340 415" />
          </g>

          {/* Shading Overlays */}
          <path
            d="M 180 75 L 105 110 L 70 195 L 120 220 L 152 180 L 152 435 Q 250 444 348 435 L 348 180 L 380 220 L 430 195 L 395 110 L 320 75 Z"
            fill={`url(#studio-light-${styleId})`}
            pointerEvents="none"
          />
        </g>
      )}

      {/* ============================================================ */}
      {/* 2. TRADITIONAL INDIAN KURTA (Mandarin Collar & Long Cut)     */}
      {/* ============================================================ */}
      {styleId === "kurta" && (
        <g id="kurta-garment">
          {/* Drop Shadow */}
          <path
            d="M 185 68 L 115 105 L 85 210 L 132 230 L 156 195 L 156 465 Q 250 472 344 465 L 344 195 L 368 230 L 415 210 L 385 105 L 315 68 Z"
            fill="#000000"
            opacity="0.14"
            transform="translate(0, 6)"
          />

          {/* Main Kurta Body & Full Length Cut */}
          <path
            d="
              M 185 68
              L 115 105
              L 85 210
              L 132 230
              L 156 195
              L 156 465
              Q 250 472 344 465
              L 344 195
              L 368 230
              L 415 210
              L 385 105
              L 315 68
              Z
            "
            fill={colorHex}
            stroke="#1a1a1a"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />

          {/* Mandarin Band Collar (Front view) */}
          {side === "front" && (
            <g id="kurta-mandarin-collar">
              {/* Standup Collar Band */}
              <path
                d="M 185 68 Q 250 56 315 68 L 310 82 Q 250 72 190 82 Z"
                fill={colorHex}
                stroke="#1a1a1a"
                strokeWidth="1.3"
              />
              {/* Button Placket strip */}
              <rect
                x="240"
                y="80"
                width="20"
                height="115"
                rx="3"
                fill={colorHex}
                stroke="#1a1a1a"
                strokeWidth="1.2"
              />
              {/* 3 Kurta Buttons */}
              <circle cx="250" cy="98" r="3.2" fill="#D4AF37" stroke="#111" strokeWidth="0.8" />
              <circle cx="250" cy="132" r="3.2" fill="#D4AF37" stroke="#111" strokeWidth="0.8" />
              <circle cx="250" cy="166" r="3.2" fill="#D4AF37" stroke="#111" strokeWidth="0.8" />
            </g>
          )}

          {/* Back Collar */}
          {side === "back" && (
            <path
              d="M 185 68 Q 250 58 315 68 L 315 78 Q 250 68 185 78 Z"
              fill={colorHex}
              stroke="#1a1a1a"
              strokeWidth="1.3"
            />
          )}

          {/* Side Slits on Kurta Bottom */}
          <g stroke="#1a1a1a" strokeWidth="1.4" opacity="0.6">
            <line x1="156" y1="360" x2="156" y2="465" />
            <line x1="344" y1="360" x2="344" y2="465" />
          </g>

          {/* Kurta Texture & Folds */}
          <g stroke="#000000" opacity={shadowOpacity} strokeWidth="1.1" strokeLinecap="round" fill="none">
            <path d="M 156 195 L 132 230" />
            <path d="M 344 195 L 368 230" />
            <path d="M 190 280 Q 250 295 310 280" />
            <path d="M 210 390 Q 250 405 290 390" />
          </g>

          {/* Lighting Shading */}
          <path
            d="M 185 68 L 115 105 L 85 210 L 132 230 L 156 195 L 156 465 Q 250 472 344 465 L 344 195 L 368 230 L 415 210 L 385 105 L 315 68 Z"
            fill={`url(#studio-light-${styleId})`}
            pointerEvents="none"
          />
        </g>
      )}

      {/* ============================================================ */}
      {/* 3. CEREMONIAL KANDUVA (Traditional Folded & Draped Stole)    */}
      {/* ============================================================ */}
      {styleId === "kanduva" && (
        <g id="kanduva-garment">
          {/* Drop Shadow */}
          <rect
            x="115"
            y="55"
            width="270"
            height="390"
            rx="16"
            fill="#000000"
            opacity="0.14"
            transform="translate(0, 6)"
          />

          {/* Main Kanduva Body Fabric */}
          <rect
            x="115"
            y="55"
            width="270"
            height="390"
            rx="14"
            fill={colorHex}
            stroke="#1a1a1a"
            strokeWidth="1.5"
          />

          {/* Golden Zari Borders on Top and Bottom */}
          <rect x="115" y="65" width="270" height="22" fill="url(#gold-zari-gradient)" />
          <rect x="115" y="413" width="270" height="22" fill="url(#gold-zari-gradient)" />

          {/* Decorative Zari Pinstripes */}
          <line x1="115" y1="92" x2="385" y2="92" stroke="#B45309" strokeWidth="2" />
          <line x1="115" y1="408" x2="385" y2="408" stroke="#B45309" strokeWidth="2" />

          {/* Side Golden Fringe Lines */}
          <g stroke="#D97706" strokeWidth="1.5" opacity="0.8">
            <line x1="125" y1="55" x2="125" y2="445" />
            <line x1="375" y1="55" x2="375" y2="445" />
          </g>

          {/* Traditional Pleats & Folds */}
          <g stroke="#000000" opacity={shadowOpacity} strokeWidth="1.2" fill="none">
            <path d="M 160 95 L 160 405" />
            <path d="M 205 95 L 205 405" />
            <path d="M 250 95 L 250 405" />
            <path d="M 295 95 L 295 405" />
            <path d="M 340 95 L 340 405" />
          </g>

          {/* Lighting Shading */}
          <rect
            x="115"
            y="55"
            width="270"
            height="390"
            rx="14"
            fill={`url(#studio-light-${styleId})`}
            pointerEvents="none"
          />
        </g>
      )}

      {/* ============================================================ */}
      {/* 4. CUSTOM EVENT & CAMPAIGN FLAG (Waving Cloth on Pole)       */}
      {/* ============================================================ */}
      {styleId === "flag" && (
        <g id="flag-garment">
          {/* Flag Pole / Mast on the Left */}
          <rect x="55" y="40" width="14" height="430" rx="4" fill="#3A3A3A" stroke="#111" strokeWidth="1.2" />
          {/* Pole Brass Finial / Top Knob */}
          <circle cx="62" cy="38" r="9" fill="url(#gold-zari-gradient)" stroke="#B45309" strokeWidth="1" />
          {/* Pole Bottom Cap */}
          <rect x="52" y="465" width="20" height="8" rx="2" fill="#555" />

          {/* Flag Fastener Rings */}
          <rect x="67" y="65" width="8" height="12" rx="2" fill="#D4AF37" />
          <rect x="67" y="385" width="8" height="12" rx="2" fill="#D4AF37" />

          {/* Flag Shadow */}
          <path
            d="M 75 60 Q 180 45 280 62 Q 380 75 440 60 L 440 380 Q 380 395 280 382 Q 180 365 75 380 Z"
            fill="#000000"
            opacity="0.15"
            transform="translate(0, 6)"
          />

          {/* Flag Waving Main Fabric Body */}
          <path
            d="
              M 75 60
              Q 180 45 280 62
              Q 380 75 440 60
              L 440 380
              Q 380 395 280 382
              Q 180 365 75 380
              Z
            "
            fill={colorHex}
            stroke="#1a1a1a"
            strokeWidth="1.5"
          />

          {/* Double Stitched Reinforcement Border */}
          <path
            d="M 85 70 Q 180 55 280 72 Q 380 85 430 70 L 430 370 Q 380 385 280 372 Q 180 355 85 370 Z"
            stroke="#1a1a1a"
            strokeWidth="0.8"
            strokeDasharray="3,3"
            fill="none"
            opacity="0.5"
          />

          {/* Dynamic 3D Wave Shadow Overlays */}
          <path
            d="M 75 60 Q 180 45 280 62 Q 380 75 440 60 L 440 380 Q 380 395 280 382 Q 180 365 75 380 Z"
            fill="url(#flag-wave)"
            pointerEvents="none"
          />
        </g>
      )}
    </svg>
  );
}
