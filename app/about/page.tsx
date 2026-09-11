"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Eye,
  Rocket,
  Diamond,
  Users,
  Shirt,
  Star,
  MapPin,
  Heart,
  Play,
  ArrowRight,
  CheckCircle2,
  Check,
  Award,
  Sparkles,
  Tag,
  Clock,
  ShieldCheck,
  Plus
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import { siteConfig } from "@/data/siteConfig";

export default function AboutPage() {
  const [videoPlaying, setVideoPlaying] = useState(false);

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* ============================================================ */}
      {/* 1. HERO SECTION                                              */}
      {/* ============================================================ */}
      <section className="bg-[#0B0B0B] text-white py-16 sm:py-24 px-4 sm:px-8 border-b border-[#222222] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#E11D2E_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A1A1A] border border-[#2B2B2B] text-[11px] font-mono font-bold tracking-widest text-[#FF4D5A]">
              <Sparkles className="w-3 h-3" />
              OUR HERITAGE // PENUBARTHI, RAPUR
            </div>
            <h1 className="font-poppins font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.08]">
              MORE THAN APPAREL. <br />
              IT&apos;S YOUR <span className="text-[#E11D2E]">STORY.</span>
            </h1>
            <p className="font-montserrat text-xs sm:text-sm text-gray-300 max-w-xl leading-relaxed mx-auto lg:mx-0">
              At Sri Penusila T-Shirt Printing Centre, we celebrate individuality, local teams, and entrepreneurs by transforming concepts into high-definition wearable art.
            </p>
          </div>

          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[440px] aspect-[16/11] rounded-[24px] overflow-hidden border border-[#262626] bg-white shadow-2xl group">
              <Image
                src="/assets/5.png"
                alt="Sri Penusila Heritage Embroidered Tag"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                priority
              />
              <div className="absolute bottom-3 right-3 bg-[#0B0B0B]/85 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 text-[10px] text-gray-300 font-mono">
                Artisan Quality Guaranteed
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. OUR STORY SECTION (Narrative + Video Card + Quote Card)    */}
      {/* ============================================================ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left Narrative */}
          <div className="lg:col-span-4 card-feature bg-[#FAFAFA] border border-[#E7E7E7] p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="section-label mb-2">OUR ORIGIN</div>
              <h2 className="font-poppins font-extrabold text-2xl sm:text-3xl text-[#0B0B0B] leading-tight">
                From a Local Dream <br />
                to a Recognized Standard
              </h2>
              <div className="space-y-3 mt-4 text-xs sm:text-sm text-gray-600 leading-relaxed">
                <p>
                  Sri Penusila T-Shirts Printing Centre was established in Penubarthi, Rapur (Mandal), Nellore District, Andhra Pradesh with one clear vision: to bring metropolitan-grade customized fashion directly to our regional community.
                </p>
                <p>
                  Whether for birthdays, college batches, grassroots sports clubs, corporate branding, or temple festivals, we make top-tier prints accessible with zero minimum restrictions and honest prices.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/store"
                className="inline-flex items-center gap-2 bg-[#E11D2E] hover:bg-[#C51322] text-white font-poppins font-semibold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition-all hover:-translate-y-0.5"
              >
                <span>Explore Store Collection</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Center Video Card */}
          <div className="lg:col-span-5 relative card-feature overflow-hidden border border-[#E7E7E7] bg-black min-h-[280px] group shadow-sm">
            <Image
              src="/about/video-story-thumb.png"
              alt="Watch Our Story Video Thumbnail"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center">
              <button
                onClick={() => setVideoPlaying(true)}
                className="w-16 h-16 rounded-full bg-white text-[#E11D2E] flex items-center justify-center shadow-2xl hover:scale-110 transition-transform group-hover:bg-[#E11D2E] group-hover:text-white"
                aria-label="Play story video"
              >
                <Play className="w-6 h-6 fill-current ml-1" />
              </button>
            </div>
            <div className="absolute bottom-4 left-4 text-white text-xs font-semibold bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
              Watch Our Studio Journey (1:24)
            </div>
          </div>

          {/* Right Quote Card */}
          <div className="lg:col-span-3 bg-[#0B0B0B] text-white card-feature p-6 sm:p-7 border border-[#222222] flex flex-col justify-between shadow-sm">
            <div>
              <div className="text-4xl text-[#FF4D5A] font-serif leading-none mb-3">&ldquo;</div>
              <p className="font-poppins font-bold text-sm sm:text-base text-white leading-relaxed">
                Every T-shirt is a canvas of pride. We provide the precision so you can wear your memory with distinction.
              </p>
            </div>

            <div className="pt-6 border-t border-[#222222]">
              <div className="font-serif italic text-2xl text-[#FF4D5A]">
                Wear Your Story
              </div>
              <div className="w-12 h-0.5 bg-[#E11D2E] mt-2" />
              <div className="text-[10px] text-gray-400 font-mono uppercase tracking-wider mt-2">
                Sri Penusila Quality Seal
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. VISION, MISSION & CORE VALUES (3 ASYMMETRIC CARDS)        */}
      {/* ============================================================ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Our Vision */}
          <div className="bg-[#111111] text-white p-7 sm:p-8 card-feature border border-[#262626] hover:border-[#E11D2E]/40 transition-colors shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-red-950/70 border border-red-800/50 flex items-center justify-center text-[#FF4D5A] mb-5">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="font-poppins font-bold text-lg text-white mb-2">
                Our Vision
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                To establish Sri Penusila as the benchmark for customized garment printing across Andhra Pradesh through uncompromising fabric standards, vibrant colour fastness, and bespoke customer care.
              </p>
            </div>
            <div className="pt-4 text-[10px] font-mono text-[#FF4D5A]">
              VISION // 2026 & BEYOND
            </div>
          </div>

          {/* Card 2: Our Mission */}
          <div className="bg-[#111111] text-white p-7 sm:p-8 card-feature border border-[#262626] hover:border-[#E11D2E]/40 transition-colors shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-red-950/70 border border-red-800/50 flex items-center justify-center text-[#FF4D5A] mb-5">
                <Rocket className="w-6 h-6" />
              </div>
              <h3 className="font-poppins font-bold text-lg text-white mb-2">
                Our Mission
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                To eliminate high minimums and steep costs, empowering every student, creator, business owner, and sports team with instant custom apparel that looks and feels world-class.
              </p>
            </div>
            <div className="pt-4 text-[10px] font-mono text-[#FF4D5A]">
              MISSION // ACCESSIBLE LUXURY
            </div>
          </div>

          {/* Card 3: Our Core Values */}
          <div className="bg-[#111111] text-white p-7 sm:p-8 card-feature border border-[#262626] hover:border-[#E11D2E]/40 transition-colors shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-red-950/70 border border-red-800/50 flex items-center justify-center text-[#FF4D5A] mb-5">
                <Diamond className="w-6 h-6" />
              </div>
              <h3 className="font-poppins font-bold text-lg text-white mb-3">
                Our Core Values
              </h3>
              <ul className="space-y-2 text-xs text-gray-300">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#FF4D5A]" /> 100% Cotton & Breathable Blends
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#FF4D5A]" /> Creative Typography & Graphic Mastery
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#FF4D5A]" /> Transparent Fair Indian Pricing
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#FF4D5A]" /> On-Time Dispatch Before Every Event
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#FF4D5A]" /> Direct WhatsApp Human Support
                </li>
              </ul>
            </div>
            <div className="pt-4 text-[10px] font-mono text-[#FF4D5A]">
              PILLARS // ZERO COMPROMISE
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. STATS COUNTER ROW (HORIZONTAL SNAP RAIL ON MOBILE)         */}
      {/* ============================================================ */}
      <section className="bg-gray-50 border-y border-gray-200 py-10 px-4 sm:px-8">
        <div className="max-w-[1280px] mx-auto">
          <div className="snap-rail-x flex md:grid md:grid-cols-5 gap-4 overflow-x-auto pb-2 md:pb-0">
            <div className="min-w-[170px] md:min-w-0 bg-white p-4 rounded-xl border border-gray-200 text-center space-y-1 snap-start shrink-0">
              <div className="font-poppins font-extrabold text-2xl sm:text-3xl text-[#0B0B0B]">
                {siteConfig.stats.happyCustomers}
              </div>
              <div className="text-xs text-gray-500 font-medium">
                Happy Customers
              </div>
            </div>

            <div className="min-w-[170px] md:min-w-0 bg-white p-4 rounded-xl border border-gray-200 text-center space-y-1 snap-start shrink-0">
              <div className="font-poppins font-extrabold text-2xl sm:text-3xl text-[#0B0B0B]">
                {siteConfig.stats.tshirtsPrinted}
              </div>
              <div className="text-xs text-gray-500 font-medium">
                T-Shirts Printed
              </div>
            </div>

            <div className="min-w-[170px] md:min-w-0 bg-white p-4 rounded-xl border border-gray-200 text-center space-y-1 snap-start shrink-0">
              <div className="font-poppins font-extrabold text-2xl sm:text-3xl text-[#0B0B0B]">
                {siteConfig.stats.satisfactionRate}
              </div>
              <div className="text-xs text-gray-500 font-medium">
                Customer Satisfaction
              </div>
            </div>

            <div className="min-w-[170px] md:min-w-0 bg-white p-4 rounded-xl border border-gray-200 text-center space-y-1 snap-start shrink-0">
              <div className="font-poppins font-extrabold text-2xl sm:text-3xl text-[#0B0B0B]">
                {siteConfig.stats.locations}
              </div>
              <div className="text-xs text-gray-500 font-medium">
                Location ({siteConfig.stats.locationNote})
              </div>
            </div>

            <div className="min-w-[170px] md:min-w-0 bg-[#0B0B0B] text-white p-4 rounded-xl border border-[#222222] text-center space-y-1 snap-start shrink-0">
              <div className="font-poppins font-extrabold text-2xl sm:text-3xl text-[#FF4D5A]">
                {siteConfig.stats.moreStories}
              </div>
              <div className="text-xs text-gray-300 font-medium">
                Stories to Create
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. QUALITY PRINTS. HAPPIER PEOPLE. + FORMULA CARD            */}
      {/* ============================================================ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Feature Checklist */}
          <div className="lg:col-span-4 space-y-4">
            <div className="section-label">WHY SRI PENUSILA</div>
            <h2 className="font-poppins font-extrabold text-2xl sm:text-3xl text-[#0B0B0B] leading-tight">
              Quality Prints. <br />
              Happier People.
            </h2>
            <p className="text-xs text-gray-600 leading-relaxed">
              We combine high-grade cotton materials, rich reactive inks, and genuine care to deliver customized clothing you&apos;ll cherish wearing.
            </p>

            <ul className="space-y-2.5 pt-2 text-xs text-gray-700">
              <li className="flex items-center gap-2.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#E11D2E] shrink-0" /> Vibrant, Fade-Resistant Printing
              </li>
              <li className="flex items-center gap-2.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#E11D2E] shrink-0" /> Pre-Shrunk 180-240 GSM Cotton
              </li>
              <li className="flex items-center gap-2.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#E11D2E] shrink-0" /> Fair, Transparent Regional Pricing
              </li>
              <li className="flex items-center gap-2.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#E11D2E] shrink-0" /> Guaranteed On-Time Dispatch
              </li>
              <li className="flex items-center gap-2.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#E11D2E] shrink-0" /> Free Design Consultation & Mockup
              </li>
              <li className="flex items-center gap-2.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#E11D2E] shrink-0" /> Custom Orders for Any Group or Occasion
              </li>
            </ul>

            <div className="pt-2">
              <Link
                href="/custom-printing"
                className="inline-flex items-center gap-2 bg-[#E11D2E] hover:bg-[#C51322] text-white font-poppins font-semibold text-xs px-5 py-2.5 rounded-xl shadow-sm transition-transform hover:-translate-y-0.5"
              >
                <span>Design Yours Online</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Center 3 T-Shirts Photo */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[400px] aspect-[4/3] card-product overflow-hidden border border-[#E7E7E7] bg-[#F7F7F7] shadow-md group">
              <Image
                src="/about/why-choose-tshirts.png"
                alt="Sri Penusila Printed T-Shirts"
                fill
                sizes="400px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 bg-[#0B0B0B]/80 backdrop-blur-md px-2.5 py-1 rounded-md text-white text-[10px] font-mono border border-white/10">
                100% Quality Inspected
              </div>
            </div>
          </div>

          {/* Right Formula Card */}
          <div className="lg:col-span-3 bg-[#0B0B0B] text-white card-feature p-6 sm:p-7 border border-[#262626] flex flex-col justify-between space-y-6 shadow-md">
            <div>
              <div className="text-3xl text-[#FF4D5A] font-serif leading-none mb-2">&ldquo;</div>
              <p className="font-poppins font-bold text-sm text-white leading-snug">
                We don&apos;t just print T-shirts, we print happiness and unity.
              </p>
            </div>

            {/* Visual Formula: Your Idea + Our Printing + Your Story */}
            <div className="space-y-3 py-3 border-y border-[#262626] text-xs">
              <div className="flex items-center justify-between">
                <span className="text-gray-300 font-medium">Your Idea</span>
                <Shirt className="w-4 h-4 text-white" />
              </div>
              <div className="text-center text-xs text-[#FF4D5A] font-bold">+</div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300 font-medium">Our Craft</span>
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="text-center text-xs text-[#FF4D5A] font-bold">=</div>
              <div className="flex items-center justify-between">
                <span className="text-white font-bold">Wearable Story</span>
                <Heart className="w-4 h-4 text-[#E11D2E] fill-[#E11D2E]" />
              </div>
            </div>

            <div>
              <Link
                href="/custom-printing"
                className="w-full flex items-center justify-center gap-1.5 bg-[#E11D2E] hover:bg-[#C51322] text-white font-poppins font-bold text-xs py-3 rounded-xl transition-all shadow-md active:scale-95"
              >
                <span>Create Your Custom Print →</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. FINAL CTA BANNER                                          */}
      {/* ============================================================ */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 pb-10">
        <CTASection
          label="HAVE A DESIGN IN MIND?"
          title="LET'S BRING IT TO LIFE!"
          subtitle="Custom T-Shirts for Individuals, Teams, Events & Businesses."
        />
      </div>

      {/* Video Modal if clicked */}
      {videoPlaying && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-[#111111] border border-[#333333] rounded-2xl max-w-lg w-full p-6 text-white text-center space-y-4">
            <h3 className="font-poppins font-bold text-lg text-white">
              Watch Our Story
            </h3>
            <p className="text-xs text-gray-400">
              Welcome to Sri Penusila T-Shirt Printing Centre in Penubarthi, Rapur! We print premium custom t-shirts with love, precision, and the finest cotton fabrics.
            </p>
            <div className="relative aspect-video rounded-xl overflow-hidden border border-[#333333]">
              <Image
                src="/about/video-story-thumb.png"
                alt="Story video"
                fill
                className="object-cover"
              />
            </div>
            <button
              onClick={() => setVideoPlaying(false)}
              className="bg-[#E11D2E] hover:bg-[#C51322] text-white text-xs font-semibold px-6 py-2 rounded-xl"
            >
              Close Video
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
