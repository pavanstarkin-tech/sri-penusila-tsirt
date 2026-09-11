"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Clock,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  Star,
  Users,
  CheckCircle2,
  Image as ImageIcon,
  Type,
  Palette,
  Check,
  Shirt,
  ChevronRight,
  Plus,
  Minus,
  ArrowUpRight
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ProductCard from "@/components/ProductCard";
import CTASection from "@/components/CTASection";
import { products } from "@/data/products";
import { homeCategoryPills } from "@/data/categories";
import { services, occasions, whyChooseFeatures, processSteps } from "@/data/services";
import { lookbookItems } from "@/data/gallery";
import { testimonials } from "@/data/testimonials";
import { siteConfig, getWhatsAppLink, getTelLink, getAssetPath } from "@/data/siteConfig";

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("trending");
  const [activeService, setActiveService] = useState<string | null>("photos");
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  // Category products (4 uniform cards)
  const categoryProducts = products.filter((p) => {
    if (activeCategory === "trending") return p.isTrending || p.isPopular;
    return p.categorySlug === activeCategory;
  });

  const displayProducts = categoryProducts.length >= 4
    ? categoryProducts.slice(0, 4)
    : products.slice(0, 4);

  const activeTestimonial = testimonials[testimonialIdx] || testimonials[0];

  return (
    <div className="space-y-16 sm:space-y-28">
      {/* ============================================================ */}
      {/* 1. HERO — EDITORIAL FASHION CAMPAIGN                         */}
      {/* ============================================================ */}
      <section className="relative bg-[#0B0B0B] text-white pt-8 pb-16 sm:pt-14 sm:pb-24 overflow-hidden border-b border-[#202020]">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#E11D2E]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-6 z-10 text-center lg:text-left">
              {/* Eyebrow */}
              <div className="section-label text-[#FF4D5A] justify-center lg:justify-start">
                CUSTOM T-SHIRTS. BIGGER STORIES.
              </div>

              {/* Large Editorial Headline with fluid clamp */}
              <h1 className="font-poppins font-extrabold text-hero-headline tracking-tight text-white">
                WEAR YOUR <br />
                <span className="text-[#E11D2E]">IDEA.</span>
              </h1>

              {/* Supporting Copy */}
              <p className="font-montserrat text-sm sm:text-base text-gray-300 max-w-lg leading-relaxed mx-auto lg:mx-0">
                Customized T-Shirts for Birthdays, College Events, Functions,
                Teams, Businesses and all your special moments.
              </p>

              {/* CTAs */}
              <div className="flex items-center justify-center lg:justify-start gap-3.5 pt-2 flex-wrap">
                <Link
                  href="/custom-printing"
                  className="flex items-center gap-2 bg-[#E11D2E] hover:bg-[#C51322] text-white font-poppins font-semibold text-sm px-7 py-3.5 rounded-xl shadow-lg transition-all hover:-translate-y-0.5 active:scale-95 min-h-[48px]"
                >
                  <span>Start Customizing</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href={getWhatsAppLink(siteConfig.phones[0], "Hi Sri Penusila, I want to order custom T-shirts.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#171717] hover:bg-[#222222] text-white border border-[#333333] hover:border-gray-500 font-poppins font-semibold text-sm px-6 py-3.5 rounded-xl transition-all min-h-[48px]"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
                  <span>WhatsApp Us</span>
                </Link>
              </div>

              {/* Thin Horizontal Floating Information Strip */}
              <div className="pt-6 border-t border-[#222222] flex items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-gray-300 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E11D2E]" />
                  <span className="font-semibold">100% Custom</span>
                </div>
                <span className="text-gray-600 hidden sm:inline">•</span>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E11D2E]" />
                  <span className="font-semibold">Fast Service</span>
                </div>
                <span className="text-gray-600 hidden sm:inline">•</span>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E11D2E]" />
                  <span className="font-semibold">Quality Cotton</span>
                </div>
                <span className="text-gray-600 hidden sm:inline">•</span>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#E11D2E]" />
                  <span>Rapur, Nellore Dt.</span>
                </div>
              </div>
            </div>

            {/* Right Visual Column (Model) */}
            <div className="lg:col-span-6 relative flex items-center justify-center lg:justify-end">
              <div className="relative w-full max-w-[540px] aspect-[4/3] sm:aspect-[16/11] flex items-center justify-center group">
                <Image
                  src={getAssetPath("/assets/2.png")}
                  alt="Sri Penusila Custom T-Shirts Fashion Visual"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform duration-500"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. TRENDING PRODUCTS — ASYMMETRIC GRID / MOBILE SNAP RAIL     */}
      {/* ============================================================ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <SectionHeading
          label="TRENDING NOW"
          title="Popular T-Shirt Designs"
          description="Get inspired by our trending designs or create your own unique style."
        />

        {/* Category Navigation Pills with animated active pill */}
        <div className="flex items-center justify-center gap-2 sm:gap-2.5 flex-wrap mb-8">
          {homeCategoryPills.map((pill) => {
            const isActive = activeCategory === pill.slug;
            return (
              <button
                key={pill.id}
                onClick={() => setActiveCategory(pill.slug)}
                className={`text-xs font-poppins font-semibold px-4 py-2 rounded-full border transition-all ${
                  isActive
                    ? "bg-[#E11D2E] text-white border-[#E11D2E] shadow-sm scale-105"
                    : "bg-white text-gray-700 border-[#E7E7E7] hover:border-gray-400"
                }`}
              >
                {pill.name}
              </button>
            );
          })}
        </div>

        {/* UNIFORM PRODUCT GRID (Desktop 4-col, Tablet 2-col, Mobile 2-col) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {displayProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. OUR SERVICES — EDITORIAL HORIZONTAL ROWS / MOBILE ACCORDION */}
      {/* ============================================================ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Title & Description */}
          <div className="lg:col-span-5 space-y-3">
            <div className="section-label">OUR SERVICES</div>
            <h2 className="font-poppins font-extrabold text-section-headline text-[#0B0B0B]">
              Customized <br />
              <span className="text-[#E11D2E]">T-Shirt Printing</span>
            </h2>
            <p className="font-montserrat text-xs sm:text-sm text-gray-600 max-w-md leading-relaxed">
              Bring your ideas to life. We print what matters to you — from personal memories to college batches and company branding.
            </p>
            <div className="pt-2">
              <Link
                href="/custom-printing"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#E11D2E] hover:underline"
              >
                <span>Explore all customization options →</span>
              </Link>
            </div>
          </div>

          {/* Right Column: 4 Interactive Horizontal Service Rows */}
          <div className="lg:col-span-7 space-y-3">
            {services.map((service, idx) => {
              const isSelected = activeService === service.id;
              const iconElement =
                service.id === "photos" ? (
                  <ImageIcon className="w-5 h-5" />
                ) : service.id === "names-text" ? (
                  <Type className="w-5 h-5" />
                ) : service.id === "logos" ? (
                  <ShieldCheck className="w-5 h-5" />
                ) : (
                  <Palette className="w-5 h-5" />
                );

              return (
                <div
                  key={service.id}
                  onClick={() => setActiveService(isSelected ? null : service.id)}
                  className={`card-ui p-4 sm:p-5 border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-red-50/50 border-[#E11D2E] shadow-xs"
                      : "bg-white border-[#E7E7E7] hover:border-gray-300 hover:bg-gray-50/50"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <span className="font-mono text-xs font-bold text-gray-400">
                        0{idx + 1}
                      </span>
                      <div className={`p-2 rounded-xl border transition-colors ${
                        isSelected ? "bg-[#E11D2E] text-white border-[#E11D2E]" : "bg-gray-100 text-gray-800 border-gray-200"
                      }`}>
                        {iconElement}
                      </div>
                      <div>
                        <h3 className="font-poppins font-bold text-sm sm:text-base text-[#111111]">
                          {service.title}
                        </h3>
                        <p className="text-xs text-gray-500 sm:hidden mt-0.5">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    <div className="hidden sm:block text-xs text-gray-500 max-w-xs text-right truncate">
                      {service.description}
                    </div>

                    <div className="text-gray-400 shrink-0">
                      {isSelected ? <Minus className="w-4 h-4 text-[#E11D2E]" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </div>

                  {/* Expanded description on mobile or selection */}
                  {isSelected && (
                    <div className="mt-3 pt-3 border-t border-red-100 text-xs text-gray-600 sm:block leading-relaxed animate-in fade-in">
                      {service.description} Ready in 24–48 hours with premium fade-proof ink.
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. OCCASIONS — ASYMMETRIC VISUAL GRID / MOBILE SNAP RAIL     */}
      {/* ============================================================ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <SectionHeading
          label="MADE FOR EVERY MOMENT"
          title="Custom T-Shirts for Every Occasion"
          description="From birthdays to corporate uniforms — tailored memories that unite your squad."
        />

        {/* DESKTOP 6-CARD GRID */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6">
          {occasions.map((occ, idx) => (
            <Link
              key={occ.id}
              href="/custom-printing"
              className="group relative block rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 focus:outline-none focus:ring-2 focus:ring-[#FF4D5A]/40"
            >
              <div className="relative aspect-[556/469] w-full overflow-hidden bg-gray-50">
                <Image
                  src={getAssetPath(occ.image)}
                  alt={occ.title}
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  priority={idx < 3}
                />

                {/* Subtle bottom hover action bar */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-between text-white">
                  <span className="text-xs font-medium tracking-wide">
                    Customize for {occ.title}
                  </span>
                  <span className="w-8 h-8 rounded-full bg-[#FF4D5A] text-white flex items-center justify-center shadow-md transform translate-x-2 group-hover:translate-x-0 transition-transform duration-300">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* MOBILE SNAP CAROUSEL */}
        <div className="md:hidden snap-rail-x gap-4 -mx-4 px-4 pb-4">
          {occasions.map((occ) => (
            <Link
              key={occ.id}
              href="/custom-printing"
              className="snap-card w-[80vw] max-w-[320px] relative rounded-2xl overflow-hidden shadow-md border border-gray-100 block shrink-0"
            >
              <div className="relative aspect-[556/469] w-full bg-gray-50">
                <Image
                  src={getAssetPath(occ.image)}
                  alt={occ.title}
                  fill
                  sizes="80vw"
                  className="object-cover"
                />
                <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 shadow-sm">
                  <span>Customize</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#FF4D5A]" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. HOW IT WORKS — CONNECTED TIMELINE                         */}
      {/* ============================================================ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <SectionHeading
          label="HOW IT WORKS"
          title="From Idea to T-Shirt in 4 Simple Steps"
          description="Our streamlined printing workflow makes custom ordering effortless."
        />

        {/* Desktop Connected Horizontal Timeline */}
        <div className="hidden lg:block relative py-6">
          <div className="absolute top-1/2 left-[8%] right-[8%] h-[2px] bg-gray-200 -translate-y-5 z-0" />
          <div className="grid grid-cols-4 gap-6 relative z-10">
            {processSteps.map((step) => (
              <div key={step.step} className="flex flex-col items-center text-center group">
                <div className="w-14 h-14 rounded-full bg-[#E11D2E] text-white flex items-center justify-center font-poppins font-extrabold text-base shadow-md group-hover:scale-110 transition-transform mb-4 border-4 border-white">
                  {step.step}
                </div>
                <h3 className="font-poppins font-bold text-base text-[#111111] mb-1">
                  {step.title}
                </h3>
                <p className="text-xs text-gray-500 max-w-[200px] leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Vertical Timeline */}
        <div className="lg:hidden space-y-4 max-w-md mx-auto">
          {processSteps.map((step) => (
            <div key={step.step} className="card-ui p-4 bg-gray-50 border border-gray-200 flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-full bg-[#E11D2E] text-white flex items-center justify-center font-bold text-xs shrink-0">
                {step.step}
              </div>
              <div>
                <h3 className="font-poppins font-bold text-sm text-[#111111]">
                  {step.title}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. WHY CHOOSE US — DARK CINEMATIC SECTION                    */}
      {/* ============================================================ */}
      <section className="bg-[#0B0B0B] text-white py-16 sm:py-24 px-4 sm:px-8 border-y border-[#202020] relative">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Image (Emblem) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center group">
              <Image
                src={getAssetPath("/hero/home-why-choose.png")}
                alt="Why Choose Sri Penusila T-Shirts"
                fill
                sizes="420px"
                className="object-contain drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)] rounded-2xl group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Right Editorial List */}
          <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
            <div className="section-label text-[#FF4D5A] justify-center lg:justify-start">
              WHY CHOOSE SRI PENUSILA
            </div>
            <h2 className="font-poppins font-extrabold text-section-headline text-white">
              More Than Just Printing. <br />
              <span className="text-[#E11D2E]">It&apos;s a Promise.</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 max-w-lg mx-auto lg:mx-0">
              We combine craft, premium cotton, and advanced print precision to ensure you love what you wear.
            </p>

            <div className="pt-4 space-y-3">
              {whyChooseFeatures.map((feat) => (
                <div
                  key={feat.title}
                  className="card-ui p-3.5 bg-[#141414] border border-[#222222] hover:border-[#E11D2E] transition-all flex items-start gap-3 group text-left"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#E11D2E] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-poppins font-bold text-xs sm:text-sm text-white group-hover:text-[#FF4D5A] transition-colors">
                      {feat.title}
                    </h4>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      {feat.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 8. GALLERY — EDITORIAL MASONRY / MOBILE SNAP RAIL            */}
      {/* ============================================================ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="section-label mb-2">OUR GALLERY</div>
            <h2 className="font-poppins font-extrabold text-section-headline text-[#0B0B0B]">
              T-Shirt Lookbook
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Real Designs. Real People. Real Stories.
            </p>
          </div>
          <Link
            href="/designs"
            className="inline-flex items-center gap-1.5 border border-[#E11D2E] text-[#E11D2E] hover:bg-red-50 font-poppins font-semibold text-xs px-5 py-2.5 rounded-xl transition-colors"
          >
            <span>View All Designs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Desktop Asymmetric Masonry */}
        <div className="hidden sm:grid grid-cols-6 gap-3.5">
          {lookbookItems.map((item, idx) => {
            const isLarge = idx === 0 || idx === 3;
            return (
              <div
                key={item.id}
                className={`relative rounded-2xl overflow-hidden border border-gray-200 group hover:shadow-md transition-shadow ${
                  isLarge ? "col-span-2 row-span-2 aspect-square" : "col-span-2 aspect-[4/3]"
                }`}
              >
                <Image
                  src={getAssetPath(item.image)}
                  alt={item.title}
                  fill
                  sizes="33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            );
          })}
        </div>

        {/* Mobile Snap Rail */}
        <div className="sm:hidden snap-rail-x gap-3 -mx-4 px-4 pb-4">
          {lookbookItems.map((item) => (
            <div key={item.id} className="snap-card w-[65vw] max-w-[240px] aspect-square relative rounded-2xl overflow-hidden border border-gray-200">
              <Image
                src={getAssetPath(item.image)}
                alt={item.title}
                fill
                sizes="65vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 9. TESTIMONIALS — LARGE FEATURED QUOTE + CONTROLS           */}
      {/* ============================================================ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <SectionHeading
          label="CUSTOMER LOVE"
          title="What Our Customers Say"
          description="Real stories from happy customers across Rapur and Nellore District."
        />

        <div className="card-feature bg-gray-50 border border-[#E7E7E7] p-6 sm:p-10 max-w-3xl mx-auto shadow-xs">
          {/* 5 Stars */}
          <div className="flex items-center gap-1 text-amber-400 mb-4 justify-center">
            {[...Array(activeTestimonial.rating)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-amber-400" />
            ))}
          </div>

          <p className="font-poppins font-medium text-base sm:text-xl text-[#111111] text-center leading-relaxed italic mb-6">
            &ldquo;{activeTestimonial.review}&rdquo;
          </p>

          <div className="flex flex-col items-center gap-2">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-xs">
              <Image
                src={getAssetPath(activeTestimonial.avatar)}
                alt={activeTestimonial.name}
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>
            <div className="text-center">
              <div className="font-poppins font-bold text-sm text-[#0B0B0B]">
                {activeTestimonial.name}
              </div>
              <div className="text-xs text-[#E11D2E] font-semibold">
                {activeTestimonial.location}
              </div>
            </div>
          </div>

          {/* Testimonial Indicator Dots */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setTestimonialIdx(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  testimonialIdx === i ? "bg-[#E11D2E] w-6" : "bg-gray-300"
                }`}
                aria-label={`Show testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 10. CAMPAIGN FULL-BLEED CTA BANNER                           */}
      {/* ============================================================ */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <CTASection
          label="LET'S CREATE SOMETHING AMAZING"
          title="YOUR DESIGN. YOUR T-SHIRT."
          subtitle="Custom T-Shirts for every idea, every team, every moment."
        />
      </div>

      {/* ============================================================ */}
      {/* 11. LOCATION — SPLIT EDITORIAL STOREFRONT                    */}
      {/* ============================================================ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-8 pb-10">
        <SectionHeading
          label="VISIT OUR STORE"
          title="We're Here for You"
          description="Drop by our printing centre in Rapur or connect with us directly."
        />

        <div className="card-feature bg-white border border-[#E7E7E7] p-5 sm:p-8 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Details */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-[#E11D2E] flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-poppins font-bold text-sm text-[#0B0B0B]">
                  Sri Penusila Printing Centre
                </h4>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  {siteConfig.address.full}
                </p>
                <div className="text-[11px] text-gray-500 mt-1">
                  Landmark: {siteConfig.address.landmark}
                </div>
              </div>
            </div>

            <div className="pt-1 flex flex-col gap-2 text-xs text-gray-700">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#E11D2E]" />
                <a href={getTelLink(siteConfig.phones[0])} className="font-semibold hover:underline">
                  {siteConfig.phones[0]}
                </a>
                <span>/</span>
                <a href={getTelLink(siteConfig.phones[1])} className="font-semibold hover:underline">
                  {siteConfig.phones[1]}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#E11D2E]" />
                <a href={`mailto:${siteConfig.email}`} className="hover:underline">
                  {siteConfig.email}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={siteConfig.address.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E11D2E] hover:underline"
              >
                <span>View on Google Maps →</span>
              </a>
            </div>
          </div>

          {/* Right Map & Storefront Photo */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-gray-200">
              <Image
                src={getAssetPath("/store/map-preview.png")}
                alt="Penubarthi Rapur Map"
                fill
                sizes="340px"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-gray-200">
              <Image
                src={getAssetPath("/store/storefront.png")}
                alt="Physical Storefront"
                fill
                sizes="340px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
