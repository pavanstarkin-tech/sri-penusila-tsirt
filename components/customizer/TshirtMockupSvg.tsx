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

        <linearGradient id="mug-specular" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.3" />
          <stop offset="20%" stopColor="#ffffff" stopOpacity="0.45" />
          <stop offset="35%" stopColor="#ffffff" stopOpacity="0.08" />
          <stop offset="80%" stopColor="#000000" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.35" />
        </linearGradient>
      </defs>

      {/* ============================================================ */}
      {/* 1. NORMAL PLAIN T-SHIRT (Classic Regular Fit Catalog Cut)    */}
      {/* ============================================================ */}
      {styleId === "normal" && (
        <g id="normal-tshirt">
          {/* Subtle Studio Drop Shadow behind the garment */}
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

          {/* 3D Studio Lighting Overlays */}
          <path
            d="M 180 75 L 105 110 L 70 195 L 120 220 L 152 180 L 152 435 Q 250 444 348 435 L 348 180 L 380 220 L 430 195 L 395 110 L 320 75 Z"
            fill={`url(#studio-light-${styleId})`}
          />
          <path
            d="M 180 75 L 105 110 L 70 195 L 120 220 L 152 180 L 152 435 Q 250 444 348 435 L 348 180 L 380 220 L 430 195 L 395 110 L 320 75 Z"
            fill={`url(#vertical-shade-${styleId})`}
          />

          {/* Armhole Seam Lines */}
          <path d="M 105 110 C 122 135, 140 155, 152 180" fill="none" stroke="#000000" strokeOpacity="0.22" strokeWidth="1.2" strokeDasharray="3,1.5" />
          <path d="M 395 110 C 378 135, 360 155, 348 180" fill="none" stroke="#000000" strokeOpacity="0.22" strokeWidth="1.2" strokeDasharray="3,1.5" />

          {/* Sleeve Cuff Hem Stitch */}
          <path d="M 75 198 L 118 218" fill="none" stroke="#000000" strokeOpacity="0.25" strokeWidth="1.2" strokeDasharray="3,1.5" />
          <path d="M 425 198 L 382 218" fill="none" stroke="#000000" strokeOpacity="0.25" strokeWidth="1.2" strokeDasharray="3,1.5" />

          {/* Bottom Hem Stitch Line */}
          <path d="M 152 427 Q 250 436 348 427" fill="none" stroke="#000000" strokeOpacity="0.25" strokeWidth="1.2" strokeDasharray="4,2" />

          {/* Soft Fabric Folds radiating from underarm */}
          <path d="M 152 185 Q 170 205, 185 225" fill="none" stroke="#000000" strokeOpacity="0.12" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 348 185 Q 330 205, 315 225" fill="none" stroke="#000000" strokeOpacity="0.12" strokeWidth="1.5" strokeLinecap="round" />

          {/* Collar */}
          {side === "front" ? (
            <g id="normal-front-collar">
              <path
                d="M 180 75 Q 250 118 320 75 Q 250 96 180 75 Z"
                fill={colorHex}
                stroke="#1a1a1a"
                strokeWidth="1.4"
              />
              <path d="M 180 75 Q 250 118 320 75" fill="none" stroke="#000000" strokeOpacity="0.3" strokeWidth="1.8" />
              {/* Atelier Red Tag in collar */}
              <rect x="244" y="70" width="12" height="7" rx="1" fill="#E11D2E" opacity="0.9" />
            </g>
          ) : (
            <g id="normal-back-collar">
              <path
                d="M 180 75 Q 250 86 320 75 Q 250 78 180 75 Z"
                fill={colorHex}
                stroke="#1a1a1a"
                strokeWidth="1.4"
              />
              <path d="M 180 75 Q 250 86 320 75" fill="none" stroke="#000000" strokeOpacity="0.35" strokeWidth="2" />
            </g>
          )}
        </g>
      )}

      {/* ============================================================ */}
      {/* 2. OVERSIZED PLAIN T-SHIRT (Boxy Heavyweight Streetwear Cut) */}
      {/* ============================================================ */}
      {styleId === "oversized" && (
        <g id="oversized-tshirt">
          {/* Subtle Studio Drop Shadow */}
          <path
            d="M 175 75 L 90 120 L 55 240 L 115 258 L 140 215 L 138 440 Q 250 448 362 440 L 360 215 L 385 258 L 445 240 L 410 120 L 325 75 Z"
            fill="#000000"
            opacity="0.12"
            transform="translate(0, 5)"
          />

          {side === "front" && (
            <path
              d="M 175 75 Q 250 56 325 75 Q 250 92 175 75 Z"
              fill="#141414"
              opacity="0.75"
            />
          )}

          {/* Broad, Boxy Dropped Silhouette */}
          <path
            d="
              M 175 75
              L 90 120
              L 55 240
              L 115 258
              L 140 215
              L 138 440
              Q 250 448 362 440
              L 360 215
              L 385 258
              L 445 240
              L 410 120
              L 325 75
              Z
            "
            fill={colorHex}
            stroke="#1a1a1a"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />

          <path
            d="M 175 75 L 90 120 L 55 240 L 115 258 L 140 215 L 138 440 Q 250 448 362 440 L 360 215 L 385 258 L 445 240 L 410 120 L 325 75 Z"
            fill={`url(#studio-light-${styleId})`}
          />
          <path
            d="M 175 75 L 90 120 L 55 240 L 115 258 L 140 215 L 138 440 Q 250 448 362 440 L 360 215 L 385 258 L 445 240 L 410 120 L 325 75 Z"
            fill={`url(#vertical-shade-${styleId})`}
          />

          {/* Dropped Shoulder Seam */}
          <path d="M 90 120 C 110 150, 128 180, 140 215" fill="none" stroke="#000000" strokeOpacity="0.25" strokeWidth="1.4" strokeDasharray="3,1.5" />
          <path d="M 410 120 C 390 150, 372 180, 360 215" fill="none" stroke="#000000" strokeOpacity="0.25" strokeWidth="1.4" strokeDasharray="3,1.5" />

          {/* Wide Elbow Sleeve Hem Stitch */}
          <path d="M 60 236 L 110 252" fill="none" stroke="#000000" strokeOpacity="0.25" strokeWidth="1.2" strokeDasharray="3,1.5" />
          <path d="M 440 236 L 390 252" fill="none" stroke="#000000" strokeOpacity="0.25" strokeWidth="1.2" strokeDasharray="3,1.5" />

          {/* Bottom Hem Stitch */}
          <path d="M 138 430 Q 250 438 362 430" fill="none" stroke="#000000" strokeOpacity="0.25" strokeWidth="1.2" strokeDasharray="4,2" />

          {/* Collar */}
          {side === "front" ? (
            <g id="oversized-front-collar">
              <path
                d="M 175 75 Q 250 116 325 75 Q 250 95 175 75 Z"
                fill={colorHex}
                stroke="#1a1a1a"
                strokeWidth="1.4"
              />
              <path d="M 175 75 Q 250 116 325 75" fill="none" stroke="#000000" strokeOpacity="0.3" strokeWidth="1.8" />
              <rect x="244" y="70" width="12" height="7" rx="1" fill="#E11D2E" opacity="0.9" />
            </g>
          ) : (
            <g id="oversized-back-collar">
              <path
                d="M 175 75 Q 250 86 325 75 Q 250 78 175 75 Z"
                fill={colorHex}
                stroke="#1a1a1a"
                strokeWidth="1.4"
              />
              <path d="M 175 75 Q 250 86 325 75" fill="none" stroke="#000000" strokeOpacity="0.35" strokeWidth="2" />
            </g>
          )}
        </g>
      )}

      {/* ============================================================ */}
      {/* 3. DOWN-SHOULDER / DROP-SHOULDER T-SHIRT                    */}
      {/* ============================================================ */}
      {styleId === "drop-shoulder" && (
        <g id="drop-shoulder-tshirt">
          {/* Studio Shadow */}
          <path
            d="M 175 75 L 85 130 L 60 230 L 115 250 L 145 200 L 145 435 Q 250 444 355 435 L 355 200 L 385 250 L 440 230 L 415 130 L 325 75 Z"
            fill="#000000"
            opacity="0.12"
            transform="translate(0, 5)"
          />

          {side === "front" && (
            <path
              d="M 175 75 Q 250 56 325 75 Q 250 92 175 75 Z"
              fill="#141414"
              opacity="0.75"
            />
          )}

          {/* Low Drop-Shoulder Contour */}
          <path
            d="
              M 175 75
              L 85 130
              L 60 230
              L 115 250
              L 145 200
              L 145 435
              Q 250 444 355 435
              L 355 200
              L 385 250
              L 440 230
              L 415 130
              L 325 75
              Z
            "
            fill={colorHex}
            stroke="#1a1a1a"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />

          <path
            d="M 175 75 L 85 130 L 60 230 L 115 250 L 145 200 L 145 435 Q 250 444 355 435 L 355 200 L 385 250 L 440 230 L 415 130 L 325 75 Z"
            fill={`url(#studio-light-${styleId})`}
          />
          <path
            d="M 175 75 L 85 130 L 60 230 L 115 250 L 145 200 L 145 435 Q 250 444 355 435 L 355 200 L 385 250 L 440 230 L 415 130 L 325 75 Z"
            fill={`url(#vertical-shade-${styleId})`}
          />

          {/* Prominent Low Drop-Shoulder Topstitch Line */}
          <path d="M 85 130 L 145 200" fill="none" stroke="#000000" strokeOpacity="0.35" strokeWidth="1.6" strokeDasharray="4,2" />
          <path d="M 415 130 L 355 200" fill="none" stroke="#000000" strokeOpacity="0.35" strokeWidth="1.6" strokeDasharray="4,2" />

          {/* Sleeve Hem Stitch */}
          <path d="M 65 226 L 110 244" fill="none" stroke="#000000" strokeOpacity="0.25" strokeWidth="1.2" strokeDasharray="3,1.5" />
          <path d="M 435 226 L 390 244" fill="none" stroke="#000000" strokeOpacity="0.25" strokeWidth="1.2" strokeDasharray="3,1.5" />

          {/* Bottom Hem Stitch */}
          <path d="M 145 427 Q 250 436 355 427" fill="none" stroke="#000000" strokeOpacity="0.25" strokeWidth="1.2" strokeDasharray="4,2" />

          {/* Collar */}
          {side === "front" ? (
            <g id="drop-front-collar">
              <path
                d="M 175 75 Q 250 118 325 75 Q 250 96 175 75 Z"
                fill={colorHex}
                stroke="#1a1a1a"
                strokeWidth="1.4"
              />
              <path d="M 175 75 Q 250 118 325 75" fill="none" stroke="#000000" strokeOpacity="0.3" strokeWidth="1.8" />
              <rect x="244" y="70" width="12" height="7" rx="1" fill="#E11D2E" opacity="0.9" />
            </g>
          ) : (
            <g id="drop-back-collar">
              <path
                d="M 175 75 Q 250 86 325 75 Q 250 78 175 75 Z"
                fill={colorHex}
                stroke="#1a1a1a"
                strokeWidth="1.4"
              />
              <path d="M 175 75 Q 250 86 325 75" fill="none" stroke="#000000" strokeOpacity="0.35" strokeWidth="2" />
            </g>
          )}
        </g>
      )}

      {/* ============================================================ */}
      {/* 4. HALF-END / CROP-TOP T-SHIRT (Clean Shortened Waistline)   */}
      {/* ============================================================ */}
      {styleId === "crop-top" && (
        <g id="crop-top-tshirt">
          {/* Shadow */}
          <path
            d="M 180 75 L 105 110 L 70 195 L 120 220 L 152 180 L 155 345 Q 250 354 345 345 L 348 180 L 380 220 L 430 195 L 395 110 L 320 75 Z"
            fill="#000000"
            opacity="0.12"
            transform="translate(0, 5)"
          />

          {side === "front" && (
            <path
              d="M 180 75 Q 250 58 320 75 Q 250 92 180 75 Z"
              fill="#141414"
              opacity="0.75"
            />
          )}

          {/* Cropped Torso Cut */}
          <path
            d="
              M 180 75
              L 105 110
              L 70 195
              L 120 220
              L 152 180
              L 155 345
              Q 250 354 345 345
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

          <path
            d="M 180 75 L 105 110 L 70 195 L 120 220 L 152 180 L 155 345 Q 250 354 345 345 L 348 180 L 380 220 L 430 195 L 395 110 L 320 75 Z"
            fill={`url(#studio-light-${styleId})`}
          />

          {/* Armhole Seams */}
          <path d="M 105 110 C 122 135, 140 155, 152 180" fill="none" stroke="#000000" strokeOpacity="0.22" strokeWidth="1.2" strokeDasharray="3,1.5" />
          <path d="M 395 110 C 378 135, 360 155, 348 180" fill="none" stroke="#000000" strokeOpacity="0.22" strokeWidth="1.2" strokeDasharray="3,1.5" />

          {/* Bottom Crop Hem Stitch */}
          <path d="M 155 338 Q 250 346 345 338" fill="none" stroke="#000000" strokeOpacity="0.25" strokeWidth="1.2" strokeDasharray="4,2" />

          {/* Collar */}
          {side === "front" ? (
            <g id="crop-front-collar">
              <path
                d="M 180 75 Q 250 118 320 75 Q 250 96 180 75 Z"
                fill={colorHex}
                stroke="#1a1a1a"
                strokeWidth="1.4"
              />
              <path d="M 180 75 Q 250 118 320 75" fill="none" stroke="#000000" strokeOpacity="0.3" strokeWidth="1.8" />
              <rect x="244" y="70" width="12" height="7" rx="1" fill="#E11D2E" opacity="0.9" />
            </g>
          ) : (
            <g id="crop-back-collar">
              <path
                d="M 180 75 Q 250 86 320 75 Q 250 78 180 75 Z"
                fill={colorHex}
                stroke="#1a1a1a"
                strokeWidth="1.4"
              />
              <path d="M 180 75 Q 250 86 320 75" fill="none" stroke="#000000" strokeOpacity="0.35" strokeWidth="2" />
            </g>
          )}
        </g>
      )}

      {/* ============================================================ */}
      {/* 5. FULL-LENGTH / FULL-SLEEVE T-SHIRT (Clean Tapered Sleeves) */}
      {/* ============================================================ */}
      {styleId === "full-sleeve" && (
        <g id="full-sleeve-tshirt">
          {/* Studio Shadow */}
          <path
            d="M 180 75 L 105 110 L 68 415 L 102 422 L 152 180 L 152 435 Q 250 444 348 435 L 348 180 L 398 422 L 432 415 L 395 110 L 320 75 Z"
            fill="#000000"
            opacity="0.12"
            transform="translate(0, 5)"
          />

          {side === "front" && (
            <path
              d="M 180 75 Q 250 58 320 75 Q 250 92 180 75 Z"
              fill="#141414"
              opacity="0.75"
            />
          )}

          {/* Long Tapered Sleeves Silhouette */}
          <path
            d="
              M 180 75
              L 105 110
              L 68 415
              L 102 422
              L 152 180
              L 152 435
              Q 250 444 348 435
              L 348 180
              L 398 422
              L 432 415
              L 395 110
              L 320 75
              Z
            "
            fill={colorHex}
            stroke="#1a1a1a"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />

          <path
            d="M 180 75 L 105 110 L 68 415 L 102 422 L 152 180 L 152 435 Q 250 444 348 435 L 348 180 L 398 422 L 432 415 L 395 110 L 320 75 Z"
            fill={`url(#studio-light-${styleId})`}
          />
          <path
            d="M 180 75 L 105 110 L 68 415 L 102 422 L 152 180 L 152 435 Q 250 444 348 435 L 348 180 L 398 422 L 432 415 L 395 110 L 320 75 Z"
            fill={`url(#vertical-shade-${styleId})`}
          />

          {/* Ribbed Wrist Cuffs */}
          <path d="M 72 402 L 100 408" fill="none" stroke="#000000" strokeOpacity="0.3" strokeWidth="1.2" strokeDasharray="3,1.5" />
          <path d="M 428 402 L 400 408" fill="none" stroke="#000000" strokeOpacity="0.3" strokeWidth="1.2" strokeDasharray="3,1.5" />

          {/* Bottom Hem Stitch Line */}
          <path d="M 152 427 Q 250 436 348 427" fill="none" stroke="#000000" strokeOpacity="0.25" strokeWidth="1.2" strokeDasharray="4,2" />

          {/* Collar */}
          {side === "front" ? (
            <g id="full-front-collar">
              <path
                d="M 180 75 Q 250 118 320 75 Q 250 96 180 75 Z"
                fill={colorHex}
                stroke="#1a1a1a"
                strokeWidth="1.4"
              />
              <path d="M 180 75 Q 250 118 320 75" fill="none" stroke="#000000" strokeOpacity="0.3" strokeWidth="1.8" />
              <rect x="244" y="70" width="12" height="7" rx="1" fill="#E11D2E" opacity="0.9" />
            </g>
          ) : (
            <g id="full-back-collar">
              <path
                d="M 180 75 Q 250 86 320 75 Q 250 78 180 75 Z"
                fill={colorHex}
                stroke="#1a1a1a"
                strokeWidth="1.4"
              />
              <path d="M 180 75 Q 250 86 320 75" fill="none" stroke="#000000" strokeOpacity="0.35" strokeWidth="2" />
            </g>
          )}
        </g>
      )}

      {/* ============================================================ */}
      {/* 6. PREMIUM STREETWEAR HOODIE (Clean Pullover Hoodie)         */}
      {/* ============================================================ */}
      {styleId === "hoodie" && (
        <g id="hoodie-garment">
          {/* Studio Shadow */}
          <path
            d="M 170 85 L 105 118 L 65 415 L 100 422 L 145 190 L 142 435 Q 250 444 358 435 L 355 190 L 400 422 L 435 415 L 395 118 L 330 85 Z"
            fill="#000000"
            opacity="0.12"
            transform="translate(0, 5)"
          />

          {/* Hoodie Body & Arms */}
          <path
            d="
              M 170 85
              L 105 118
              L 65 415
              L 100 422
              L 145 190
              L 142 435
              Q 250 444 358 435
              L 355 190
              L 400 422
              L 435 415
              L 395 118
              L 330 85
              Z
            "
            fill={colorHex}
            stroke="#1a1a1a"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />

          <path
            d="M 170 85 L 105 118 L 65 415 L 100 422 L 145 190 L 142 435 Q 250 444 358 435 L 355 190 L 400 422 L 435 415 L 395 118 L 330 85 Z"
            fill={`url(#studio-light-${styleId})`}
          />
          <path
            d="M 170 85 L 105 118 L 65 415 L 100 422 L 145 190 L 142 435 Q 250 444 358 435 L 355 190 L 400 422 L 435 415 L 395 118 L 330 85 Z"
            fill={`url(#vertical-shade-${styleId})`}
          />

          {/* Ribbed Bottom Band */}
          <path d="M 142 408 Q 250 416 358 408" fill="none" stroke="#000000" strokeOpacity="0.25" strokeWidth="1.4" />

          {/* FRONT-ONLY: Kangaroo Pocket, Hood Arcs & Drawstrings */}
          {side === "front" && (
            <g id="hoodie-front-details">
              {/* Kangaroo Pocket */}
              <path
                d="M 195 325 L 305 325 L 332 408 L 168 408 Z"
                fill={colorHex}
                stroke="#1a1a1a"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
              <path d="M 195 325 L 305 325" fill="none" stroke="#000000" strokeOpacity="0.3" strokeWidth="1.2" strokeDasharray="3,1.5" />
              <path d="M 168 408 L 195 325" fill="none" stroke="#000000" strokeOpacity="0.3" strokeWidth="1.2" strokeDasharray="3,1.5" />
              <path d="M 332 408 L 305 325" fill="none" stroke="#000000" strokeOpacity="0.3" strokeWidth="1.2" strokeDasharray="3,1.5" />

              {/* Hood Outer Contour */}
              <path
                d="
                  M 170 85
                  C 170 42, 210 32, 250 32
                  C 290 32, 330 42, 330 85
                  C 310 74, 275 68, 250 68
                  C 225 68, 190 74, 170 85
                  Z
                "
                fill={colorHex}
                stroke="#1a1a1a"
                strokeWidth="1.6"
              />
              <path
                d="M 170 85 C 170 42, 210 32, 250 32 C 290 32, 330 42, 330 85 C 310 74, 275 68, 250 68 C 225 68, 190 74, 170 85 Z"
                fill="url(#vertical-shade-hoodie)"
                opacity="0.6"
              />

              {/* Hood Neck Opening */}
              <path
                d="M 198 85 Q 250 115 302 85 Q 250 96 198 85 Z"
                fill="#141414"
                opacity="0.8"
              />

              {/* Drawstring Eyelets */}
              <circle cx="232" cy="100" r="2.8" fill="#D4D4D4" stroke="#444" strokeWidth="0.8" />
              <circle cx="268" cy="100" r="2.8" fill="#D4D4D4" stroke="#444" strokeWidth="0.8" />

              {/* Clean Woven Drawstrings with Silver Tips */}
              <path d="M 232 103 L 230 195" fill="none" stroke="#F0F0F0" strokeWidth="2.5" strokeLinecap="round" />
              <rect x="228.5" y="195" width="3" height="10" rx="0.8" fill="#C0C0C0" stroke="#666" strokeWidth="0.5" />

              <path d="M 268 103 L 270 195" fill="none" stroke="#F0F0F0" strokeWidth="2.5" strokeLinecap="round" />
              <rect x="268.5" y="195" width="3" height="10" rx="0.8" fill="#C0C0C0" stroke="#666" strokeWidth="0.5" />
            </g>
          )}

          {/* BACK-ONLY: Hood Fold over Upper Back */}
          {side === "back" && (
            <g id="hoodie-back-details">
              <path
                d="
                  M 170 85
                  C 170 42, 210 32, 250 32
                  C 290 32, 330 42, 330 85
                  C 310 110, 275 125, 250 125
                  C 225 125, 190 110, 170 85
                  Z
                "
                fill={colorHex}
                stroke="#1a1a1a"
                strokeWidth="1.6"
              />
              <path
                d="M 170 85 C 170 42, 210 32, 250 32 C 290 32, 330 42, 330 85 C 310 110, 275 125, 250 125 C 225 125, 190 110, 170 85 Z"
                fill="url(#vertical-shade-hoodie)"
                opacity="0.65"
              />
            </g>
          )}
        </g>
      )}

      {/* ============================================================ */}
      {/* 7. CUSTOM CERAMIC MUG (3D Specular Cylinder + C-Handle)      */}
      {/* ============================================================ */}
      {styleId === "mug" && (
        <g id="ceramic-mug">
          {/* Surface Contact Shadow */}
          <ellipse cx="250" cy="405" rx="105" ry="14" fill="#000000" opacity="0.22" />

          {/* Handle (Rendered on Right for Front, on Left for Back) */}
          {side === "front" ? (
            <g id="mug-handle-right">
              <path
                d="
                  M 330 155
                  C 415 155, 420 310, 330 320
                  C 330 288, 385 278, 380 238
                  C 375 198, 330 188, 330 155
                  Z
                "
                fill={colorHex}
                stroke="#1a1a1a"
                strokeWidth="1.6"
              />
              <path
                d="M 330 155 C 415 155, 420 310, 330 320 C 330 288, 385 278, 380 238 C 375 198, 330 188, 330 155 Z"
                fill="url(#mug-specular)"
              />
            </g>
          ) : (
            <g id="mug-handle-left">
              <path
                d="
                  M 170 155
                  C 85 155, 80 310, 170 320
                  C 170 288, 115 278, 120 238
                  C 125 198, 170 188, 170 155
                  Z
                "
                fill={colorHex}
                stroke="#1a1a1a"
                strokeWidth="1.6"
              />
              <path
                d="M 170 155 C 85 155, 80 310, 170 320 C 170 288, 115 278, 120 238 C 125 198, 170 188, 170 155 Z"
                fill="url(#mug-specular)"
              />
            </g>
          )}

          {/* Mug Cylindrical Body */}
          <path
            d="
              M 165 125
              L 335 125
              L 335 365
              Q 250 388 165 365
              Z
            "
            fill={colorHex}
            stroke="#1a1a1a"
            strokeWidth="1.6"
          />

          {/* Ceramic Specular Sheen */}
          <path
            d="M 165 125 L 335 125 L 335 365 Q 250 388 165 365 Z"
            fill="url(#mug-specular)"
          />

          {/* Top Porcelain Rim Ellipse & Dark Cavity */}
          <ellipse cx="250" cy="125" rx="85" ry="20" fill={colorHex} stroke="#1a1a1a" strokeWidth="1.6" />
          <ellipse cx="250" cy="125" rx="77" ry="15" fill="#141414" opacity="0.85" />
          <ellipse cx="250" cy="126" rx="72" ry="11" fill="#0a0a0a" opacity="0.95" />

          {/* Glossy Ceramic Highlight Streak */}
          <rect x="200" y="132" width="14" height="235" rx="7" fill="#ffffff" opacity="0.32" />
        </g>
      )}
    </svg>
  );
}
