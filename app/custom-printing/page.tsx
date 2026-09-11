"use client";

import React, { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Award,
  Clock,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  MessageCircle,
  Phone,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import CustomizerStudio from "@/components/CustomizerStudio";
import HowItWorks from "@/components/HowItWorks";
import { lookbookItems } from "@/data/gallery";
import { siteConfig, getWhatsAppLink, getTelLink } from "@/data/siteConfig";

function CustomPrintingContent() {
  return (
    <div className="space-y-16 sm:space-y-24 pb-12">
      {/* ============================================================ */}
      {/* HERO SECTION                                                 */}
      {/* ============================================================ */}
      <section className="bg-[#0B0B0B] text-white py-14 sm:py-20 px-4 sm:px-8 border-b border-[#222222] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#E11D2E_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A1A1A] border border-[#2B2B2B] text-[11px] font-mono font-bold tracking-widest text-[#FF4D5A]">
              <Sparkles className="w-3 h-3" />
              PRINT STUDIO // BESPOKE APPAREL
            </div>
            <h1 className="font-poppins font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.08]">
              CUSTOM T-SHIRT <br />
              <span className="text-[#E11D2E]">PRINTING STUDIO</span>
            </h1>
            <p className="font-montserrat text-xs sm:text-sm text-gray-300 max-w-xl leading-relaxed mx-auto lg:mx-0">
              Turn your memories, brand logos, or personal artwork into wearable luxury. Crafted with 100% premium combed cotton, fade-resistant reactive inks, and meticulous print precision.
            </p>

            {/* 4 Value Pills */}
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-gray-300 max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center gap-2 bg-[#151515] px-3.5 py-2.5 rounded-xl border border-[#262626]">
                <Award className="w-4 h-4 text-[#E11D2E] shrink-0" />
                <div className="text-left">
                  <div className="text-[11px] font-bold text-white leading-tight">High Density</div>
                  <div className="text-[9px] text-gray-400">100% Combed Cotton</div>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-[#151515] px-3.5 py-2.5 rounded-xl border border-[#262626]">
                <ShoppingBag className="w-4 h-4 text-[#E11D2E] shrink-0" />
                <div className="text-left">
                  <div className="text-[11px] font-bold text-white leading-tight">Zero Minimum</div>
                  <div className="text-[9px] text-gray-400">Single or Bulk</div>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-[#151515] px-3.5 py-2.5 rounded-xl border border-[#262626]">
                <Sparkles className="w-4 h-4 text-[#E11D2E] shrink-0" />
                <div className="text-left">
                  <div className="text-[11px] font-bold text-white leading-tight">Best Price</div>
                  <div className="text-[9px] text-gray-400">Starting ₹299</div>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-[#151515] px-3.5 py-2.5 rounded-xl border border-[#262626]">
                <Clock className="w-4 h-4 text-[#E11D2E] shrink-0" />
                <div className="text-left">
                  <div className="text-[11px] font-bold text-white leading-tight">Express Print</div>
                  <div className="text-[9px] text-gray-400">24-48h Dispatch</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual (T-shirt mockup) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[480px] aspect-[16/11] flex items-center justify-center group">
              <Image
                src="/assets/4.png"
                alt="Custom Printing Preview"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.85)] group-hover:scale-105 transition-transform duration-500"
                priority
              />
              <div className="absolute bottom-1 left-1 bg-[#0B0B0B]/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-[10px] text-gray-300 font-mono flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                Live Design Studio Ready
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* MAIN CUSTOMIZER STUDIO                                       */}
      {/* ============================================================ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <CustomizerStudio mode="full" />
      </section>

      {/* ============================================================ */}
      {/* HOW IT WORKS                                                 */}
      {/* ============================================================ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <SectionHeading
          label="THE CRAFT WORKFLOW"
          title="Get your custom T-shirt in 4 simple steps"
          description="A transparent, streamlined design-to-doorstep experience with zero surprises."
        />
        <HowItWorks />
      </section>

      {/* ============================================================ */}
      {/* GET INSPIRED (LOOKBOOK ROW WITH MOBILE SNAP RAIL)            */}
      {/* ============================================================ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="section-label mb-2">INSPIRATION GALLERY</div>
            <h2 className="font-poppins font-extrabold text-2xl sm:text-3xl text-[#0B0B0B]">
              Real Customer Creations
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Browse recent bespoke pieces printed right here at our Rapur studio.
            </p>
          </div>
          <Link
            href="/designs"
            className="inline-flex items-center gap-1.5 border border-[#E11D2E] text-[#E11D2E] hover:bg-[#FFF1F2] font-poppins font-semibold text-xs px-4 py-2 rounded-xl transition-colors"
          >
            <span>Explore 100+ Graphic Templates</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Horizontal Snap Rail / Desktop 6-Column Grid */}
        <div className="snap-rail-x flex sm:grid sm:grid-cols-3 lg:grid-cols-6 gap-3.5 overflow-x-auto pb-3 sm:pb-0">
          {lookbookItems.map((item) => (
            <div
              key={item.id}
              className="relative w-[190px] sm:w-auto aspect-square shrink-0 snap-start card-product overflow-hidden border border-[#E7E7E7] bg-[#F7F7F7] group hover:shadow-md transition-shadow"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 200px, 16vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <span className="text-white text-[11px] font-medium truncate">{item.title}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* STILL HAVE QUESTIONS? WE'RE HERE TO HELP                     */}
      {/* ============================================================ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <div className="bg-[#0B0B0B] text-white rounded-[24px] sm:rounded-[32px] p-6 sm:p-10 border border-[#222222] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#1A1A1A] border border-[#2B2B2B] text-[10px] font-mono text-[#FF4D5A]">
              PERSONALIZED ASSISTANCE
            </div>
            <h3 className="font-poppins font-bold text-xl sm:text-2xl text-white">
              Need Help With Your Custom Artwork?
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 max-w-xl leading-relaxed">
              Have a low-res image, want special foil/glow printing, or need 20+ t-shirts for your college or company? Our expert design team in Rapur assists you directly on WhatsApp.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <Link
              href={getWhatsAppLink(siteConfig.phones[0], "Hi Sri Penusila, I need help with a custom T-shirt design.")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-poppins font-semibold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp Design Team</span>
            </Link>

            <a
              href={getTelLink(siteConfig.phones[0])}
              className="w-full sm:w-auto flex items-center justify-center gap-2 border border-gray-700 hover:border-white text-white font-poppins font-semibold text-xs sm:text-sm px-5 py-3.5 rounded-xl transition-colors"
            >
              <Phone className="w-4 h-4 text-[#FF4D5A]" />
              <span>Call Now</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function CustomPrintingPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm text-gray-500 font-mono">Loading Customizer Studio...</div>}>
      <CustomPrintingContent />
    </Suspense>
  );
}
