"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Plus,
  Minus,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Headphones,
  Sparkles,
  Check
} from "lucide-react";
import { InstagramIcon, FacebookIcon, YoutubeIcon, WhatsappIcon } from "@/components/SocialIcons";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import { siteConfig, getWhatsAppLink, getTelLink, getAssetPath } from "@/data/siteConfig";
import { faqs } from "@/data/faqs";
import confetti from "canvas-confetti";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<string | null>("order");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) return;

    setSubmitted(true);
    try {
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.7 }
      });
    } catch {}

    // Also offer to forward to WhatsApp
    const waText = `*New Website Inquiry*\n- Name: ${formData.name}\n- Phone: ${formData.phone}\n- Email: ${formData.email || "N/A"}\n- Subject: ${formData.subject || "General Inquiry"}\n- Message: ${formData.message}`;
    setTimeout(() => {
      window.open(getWhatsAppLink(siteConfig.phones[0], waText), "_blank");
    }, 1000);
  };

  return (
    <div className="space-y-14 sm:space-y-20">
      {/* ============================================================ */}
      {/* 1. HERO SECTION                                              */}
      {/* ============================================================ */}
      <section className="bg-[#0B0B0B] text-white py-14 sm:py-20 px-4 sm:px-8 border-b border-[#222222] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#E11D2E_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A1A1A] border border-[#2B2B2B] text-[11px] font-mono font-bold tracking-widest text-[#FF4D5A]">
              <Sparkles className="w-3 h-3" />
              DIRECT CONCIERGE // WE&apos;RE HERE TO HELP
            </div>
            <h1 className="font-poppins font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.08]">
              LET&apos;S CREATE <br />
              SOMETHING <span className="text-[#E11D2E]">EXTRAORDINARY</span>
            </h1>
            <p className="font-montserrat text-xs sm:text-sm text-gray-300 max-w-xl leading-relaxed mx-auto lg:mx-0">
              Have a bulk inquiry, need custom artwork support, or want to check physical sample fabrics? Reach out directly to our printing master in Penubarthi, Rapur.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-gray-300">
              <div className="flex items-center gap-2 bg-[#151515] px-3 py-1.5 rounded-lg border border-[#262626]">
                <Clock className="w-4 h-4 text-[#E11D2E]" />
                <span className="font-medium">Reply within 15 mins</span>
              </div>
              <div className="flex items-center gap-2 bg-[#151515] px-3 py-1.5 rounded-lg border border-[#262626]">
                <Headphones className="w-4 h-4 text-[#E11D2E]" />
                <span className="font-medium">Direct Human Call</span>
              </div>
              <div className="flex items-center gap-2 bg-[#151515] px-3 py-1.5 rounded-lg border border-[#262626]">
                <ShieldCheck className="w-4 h-4 text-[#E11D2E]" />
                <span className="font-medium">100% Quality Checked</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[480px] aspect-[16/10] flex items-center justify-center group">
              <Image
                src={getAssetPath("/assets/6.png")}
                alt="Contact Sri Penusila Visual"
                fill
                sizes="480px"
                className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.85)] group-hover:scale-105 transition-transform duration-500"
                priority
              />
              <div className="absolute bottom-1 left-1 bg-[#0B0B0B]/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-[10px] text-gray-300 font-mono flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping" />
                Store Open Today: 9 AM - 9 PM
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. TOP 4 CONTACT ACTION TILES (MOBILE SNAP RAIL)              */}
      {/* ============================================================ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <div className="snap-rail-x flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto pb-2 sm:pb-0">
          {/* Card 1: Call Us */}
          <div className="min-w-[240px] sm:min-w-0 bg-white p-5 card-feature border border-[#E7E7E7] flex items-start gap-4 hover:shadow-md transition-shadow snap-start shrink-0">
            <div className="w-11 h-11 rounded-xl bg-red-50 text-[#E11D2E] flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-poppins font-bold text-xs text-[#0B0B0B]">
                Direct Phone
              </h4>
              <div className="text-xs font-semibold text-gray-800 mt-1 flex flex-col space-y-0.5">
                <a href={getTelLink(siteConfig.phones[0])} className="hover:text-[#E11D2E] transition-colors">
                  +91 {siteConfig.phones[0]}
                </a>
                <a href={getTelLink(siteConfig.phones[1])} className="hover:text-[#E11D2E] transition-colors">
                  +91 {siteConfig.phones[1]}
                </a>
              </div>
              <p className="text-[10px] text-gray-400 mt-1.5">
                Mon - Sat, 9:00 AM - 9:00 PM
              </p>
            </div>
          </div>

          {/* Card 2: WhatsApp Us */}
          <div className="min-w-[240px] sm:min-w-0 bg-white p-5 card-feature border border-[#E7E7E7] flex items-start gap-4 hover:shadow-md transition-shadow snap-start shrink-0">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-[#25D366] flex items-center justify-center shrink-0">
              <WhatsappIcon className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-poppins font-bold text-xs text-[#0B0B0B]">
                WhatsApp Master
              </h4>
              <div className="text-xs font-semibold text-gray-800 mt-1 flex flex-col space-y-0.5">
                <a
                  href={getWhatsAppLink(siteConfig.phones[0])}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#25D366] transition-colors"
                >
                  +91 {siteConfig.phones[0]}
                </a>
                <a
                  href={getWhatsAppLink(siteConfig.phones[1])}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#25D366] transition-colors"
                >
                  +91 {siteConfig.phones[1]}
                </a>
              </div>
              <p className="text-[10px] text-emerald-600 font-medium mt-1.5">
                ⚡ Instant WhatsApp Chat
              </p>
            </div>
          </div>

          {/* Card 3: Email Us */}
          <div className="min-w-[240px] sm:min-w-0 bg-white p-5 card-feature border border-[#E7E7E7] flex items-start gap-4 hover:shadow-md transition-shadow snap-start shrink-0">
            <div className="w-11 h-11 rounded-xl bg-red-50 text-[#E11D2E] flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h4 className="font-poppins font-bold text-xs text-[#0B0B0B]">
                Official Email
              </h4>
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-xs font-semibold text-gray-800 mt-1 block hover:text-[#E11D2E] truncate transition-colors"
                title={siteConfig.email}
              >
                {siteConfig.email}
              </a>
              <p className="text-[10px] text-gray-400 mt-1.5">
                Replies within 24 business hours
              </p>
            </div>
          </div>

          {/* Card 4: Visit Store */}
          <div className="min-w-[240px] sm:min-w-0 bg-white p-5 card-feature border border-[#E7E7E7] flex items-start gap-4 hover:shadow-md transition-shadow snap-start shrink-0">
            <div className="w-11 h-11 rounded-xl bg-red-50 text-[#E11D2E] flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-poppins font-bold text-xs text-[#0B0B0B]">
                Physical Atelier
              </h4>
              <p className="text-[11px] text-gray-600 mt-0.5 leading-snug">
                Penubarthi, Rapur (Mandal), Nellore Dist.
              </p>
              <a
                href={siteConfig.address.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-[#E11D2E] font-bold mt-1.5 inline-flex items-center gap-1 hover:underline"
              >
                <span>Navigate on Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. MAIN CONTACT AREA: FORM (LEFT) + MAP & DETAILS (RIGHT)    */}
      {/* ============================================================ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Contact Form */}
          <div className="lg:col-span-6 bg-white card-feature border border-[#E7E7E7] p-6 sm:p-8 shadow-xs">
            <div className="section-label mb-2">SEND AN INQUIRY</div>
            <h2 className="font-poppins font-extrabold text-2xl text-[#0B0B0B]">
              Direct Print Consultation
            </h2>
            <p className="text-xs text-gray-500 mb-6">
              Fill out this quick form. Upon submission, we&apos;ll immediately open WhatsApp with your exact order brief for an instant reply!
            </p>

            {submitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-poppins font-bold text-sm text-emerald-900">
                  Inquiry Dispatched Successfully!
                </h4>
                <p className="text-xs text-emerald-700 max-w-sm mx-auto">
                  Thank you, {formData.name}. WhatsApp has been launched with your brief. Our master printer will review your design requirements promptly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", phone: "", email: "", subject: "", message: "" });
                  }}
                  className="text-xs font-semibold text-emerald-800 underline pt-2 hover:text-emerald-950 transition-colors"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rajesh Kumar"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#FAFAFA] border border-[#E0E0E0] rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:bg-white focus:border-[#E11D2E] focus:ring-2 focus:ring-[#E11D2E]/15 transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9550151533"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#FAFAFA] border border-[#E0E0E0] rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:bg-white focus:border-[#E11D2E] focus:ring-2 focus:ring-[#E11D2E]/15 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#FAFAFA] border border-[#E0E0E0] rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:bg-white focus:border-[#E11D2E] focus:ring-2 focus:ring-[#E11D2E]/15 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Order Subject / Event Type *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 25 College Fest T-Shirts, Birthday Gift, Shop Staff Uniform"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-[#FAFAFA] border border-[#E0E0E0] rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:bg-white focus:border-[#E11D2E] focus:ring-2 focus:ring-[#E11D2E]/15 transition-all"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Project Requirements / Notes *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Specify quantity, preferred apparel color, printing location (front/back), deadline, or any questions..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#FAFAFA] border border-[#E0E0E0] rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:bg-white focus:border-[#E11D2E] focus:ring-2 focus:ring-[#E11D2E]/15 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-[#E11D2E] hover:bg-[#C51322] text-white font-poppins font-bold text-xs sm:text-sm py-3.5 rounded-xl shadow-md transition-all active:scale-95"
                >
                  <span>Submit Inquiry & Connect on WhatsApp</span>
                  <Send className="w-3.5 h-3.5" />
                </button>

                <div className="text-center pt-2">
                  <span className="text-[11px] text-gray-500">
                    Prefer direct chat?{" "}
                    <a
                      href={getWhatsAppLink(siteConfig.phones[0], "Hi Sri Penusila, I want to discuss a customized T-shirt order.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#25D366] font-bold hover:underline"
                    >
                      Open WhatsApp Directly
                    </a>
                  </span>
                </div>
              </form>
            )}
          </div>

          {/* RIGHT: Map Panel & Physical Storefront */}
          <div className="lg:col-span-6 space-y-6">
            {/* Map Preview Card */}
            <div className="bg-white card-feature border border-[#E7E7E7] p-5 shadow-xs overflow-hidden">
              <div className="relative aspect-[16/8] card-product overflow-hidden border border-[#E7E7E7]">
                <Image
                  src={getAssetPath("/store/map-preview.png")}
                  alt="Sri Penusila Location Map"
                  fill
                  sizes="500px"
                  className="object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#0B0B0B]/90 backdrop-blur-md p-3 rounded-xl border border-white/10 text-white shadow-lg flex items-start gap-2.5 max-w-xs">
                  <MapPin className="w-4 h-4 text-[#FF4D5A] shrink-0 mt-0.5" />
                  <div className="text-[11px] leading-tight">
                    <div className="font-poppins font-bold text-white">
                      Sri Penusila T-Shirt Printing Centre
                    </div>
                    <div className="text-gray-300 text-[10px] mt-0.5">
                      Penubarthi, Rapur (Mandal), Nellore District
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-3.5 flex items-center justify-between">
                <span className="text-xs text-gray-500 font-mono text-[11px]">Pin: Rapur - Nellore Rd</span>
                <a
                  href={siteConfig.address.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E11D2E] hover:underline"
                >
                  <span>Open Live Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Store Details & Storefront Photo Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center bg-white card-feature border border-[#E7E7E7] p-5 shadow-xs">
              <div className="space-y-3">
                <h3 className="font-poppins font-bold text-sm text-[#0B0B0B]">
                  Atelier Hours & Location
                </h3>

                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#E11D2E] shrink-0 mt-0.5" />
                    <span>{siteConfig.address.full}</span>
                  </div>

                  <div className="flex items-start gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#E11D2E] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-800">{siteConfig.openingHours.weekdays}</div>
                      <div className="text-gray-500">{siteConfig.openingHours.sunday}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Physical Storefront Photo */}
              <div className="relative aspect-[4/3] card-product overflow-hidden border border-[#E7E7E7] shadow-xs group">
                <Image
                  src={getAssetPath("/store/storefront.png")}
                  alt="Sri Penusila Physical Store Front"
                  fill
                  sizes="260px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-2 left-2 bg-[#0B0B0B]/80 backdrop-blur-md px-2 py-0.5 rounded text-white text-[9px] font-mono">
                  Physical Storefront
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. FREQUENTLY ASKED QUESTIONS (FAQ ACCORDION)                */}
      {/* ============================================================ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="section-label mb-2">FAQS & POLICIES</div>
            <h2 className="font-poppins font-extrabold text-2xl sm:text-3xl text-[#0B0B0B]">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Transparent answers regarding fabric choices, delivery timelines, and design file submission.
            </p>
          </div>
          <Link
            href="/custom-printing"
            className="inline-flex items-center gap-1.5 border border-[#E11D2E] text-[#E11D2E] hover:bg-[#FFF1F2] text-xs font-semibold px-4 py-2 rounded-xl transition-colors shrink-0"
          >
            <span>Launch Design Studio</span>
          </Link>
        </div>

        <div className="space-y-3 max-w-3xl mx-auto">
          {faqs.map((faq) => {
            const isOpen = openFaq === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white card-product border border-[#E7E7E7] overflow-hidden transition-all hover:border-[#E11D2E]/30"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 hover:bg-gray-50/80 transition-colors"
                >
                  <span className="font-poppins font-semibold text-xs sm:text-sm text-[#0B0B0B]">
                    {faq.question}
                  </span>
                  <span className="text-[#E11D2E] shrink-0 w-6 h-6 rounded-full bg-red-50 flex items-center justify-center">
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-gray-600 leading-relaxed border-t border-gray-100 pt-3 bg-gray-50/40">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. OTHER WAYS TO REACH US (SOCIAL CARDS)                     */}
      {/* ============================================================ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <SectionHeading
          label="COMMUNITY & SHOWCASE"
          title="Connect with Our Atelier"
          description="Follow our daily print deliveries, watch behind-the-scenes videos, or find directions."
        />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link
            href={siteConfig.socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white card-feature border border-[#E7E7E7] p-5 flex flex-col items-center text-center hover:-translate-y-1 hover:shadow-md transition-all group"
          >
            <div className="w-11 h-11 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
              <InstagramIcon className="w-5 h-5" />
            </div>
            <h4 className="font-poppins font-bold text-xs text-[#0B0B0B]">
              Instagram
            </h4>
            <p className="text-[10px] text-gray-500 mt-0.5">@sripenusilaprints</p>
          </Link>

          <Link
            href={siteConfig.socialLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white card-feature border border-[#E7E7E7] p-5 flex flex-col items-center text-center hover:-translate-y-1 hover:shadow-md transition-all group"
          >
            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
              <FacebookIcon className="w-5 h-5" />
            </div>
            <h4 className="font-poppins font-bold text-xs text-[#0B0B0B]">
              Facebook
            </h4>
            <p className="text-[10px] text-gray-500 mt-0.5">Sri Penusila Community</p>
          </Link>

          <Link
            href={siteConfig.socialLinks.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white card-feature border border-[#E7E7E7] p-5 flex flex-col items-center text-center hover:-translate-y-1 hover:shadow-md transition-all group"
          >
            <div className="w-11 h-11 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
              <YoutubeIcon className="w-5 h-5" />
            </div>
            <h4 className="font-poppins font-bold text-xs text-[#0B0B0B]">
              YouTube
            </h4>
            <p className="text-[10px] text-gray-500 mt-0.5">Print Process Videos</p>
          </Link>

          <Link
            href={siteConfig.address.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white card-feature border border-[#E7E7E7] p-5 flex flex-col items-center text-center hover:-translate-y-1 hover:shadow-md transition-all group"
          >
            <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
              <MapPin className="w-5 h-5" />
            </div>
            <h4 className="font-poppins font-bold text-xs text-[#0B0B0B]">
              Google Maps
            </h4>
            <p className="text-[10px] text-gray-500 mt-0.5">Get GPS Directions</p>
          </Link>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. FINAL CTA BANNER                                          */}
      {/* ============================================================ */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 pb-10">
        <CTASection
          label="BULK ORDERS & SPECIAL REQUIREMENTS"
          title="LET'S DISCUSS!"
          subtitle="We're here to help you with the best solutions, fast turnaround, and bulk discounts."
          whatsappMessage="Hi Sri Penusila, I have a bulk order inquiry."
        />
      </div>
    </div>
  );
}
