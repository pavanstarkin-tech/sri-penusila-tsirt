"use client";

import React from "react";
import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";
import { siteConfig, getWhatsAppLink, getTelLink } from "@/data/siteConfig";

interface CTASectionProps {
  label?: string;
  title?: string;
  highlightText?: string;
  subtitle?: string;
  whatsappMessage?: string;
  showNumbers?: boolean;
}

export default function CTASection({
  label = "LET'S CREATE SOMETHING AMAZING",
  title = "YOUR DESIGN. YOUR T-SHIRT.",
  highlightText,
  subtitle = "Custom T-Shirts for every idea, every team, every moment.",
  whatsappMessage = "Hi Sri Penusila, I am ready to order custom T-shirts.",
  showNumbers = true
}: CTASectionProps) {
  return (
    <section className="bg-[#0B0B0B] text-white py-12 sm:py-16 px-4 sm:px-8 relative overflow-hidden rounded-3xl my-8 border border-[#222222]">
      {/* Decorative red gradient glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#E11D2E]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#E11D2E]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        {/* Left Side: Text */}
        <div className="text-center md:text-left space-y-2 max-w-xl">
          {label && (
            <div className="section-label text-[#FF4D5A] justify-center md:justify-start">
              {label}
            </div>
          )}
          <h2 className="font-poppins font-extrabold text-2xl sm:text-4xl text-white tracking-tight leading-tight">
            {title}{" "}
            {highlightText && (
              <span className="text-[#E11D2E]">{highlightText}</span>
            )}
          </h2>
          <p className="font-montserrat text-xs sm:text-sm text-gray-300">
            {subtitle}
          </p>
        </div>

        {/* Right Side: CTAs + Phone Numbers */}
        <div className="flex flex-col items-center md:items-end gap-3.5">
          <div className="flex items-center gap-3 flex-wrap justify-center">
            {/* WhatsApp Button */}
            <Link
              href={getWhatsAppLink(siteConfig.phones[0], whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#E11D2E] hover:bg-[#C51322] text-white font-poppins font-semibold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp Us</span>
            </Link>

            {/* Call Now Button */}
            <a
              href={getTelLink(siteConfig.phones[0])}
              className="flex items-center gap-2 bg-transparent hover:bg-white/10 text-white border border-gray-600 hover:border-white font-poppins font-semibold text-xs sm:text-sm px-5 py-3 rounded-xl transition-all"
            >
              <Phone className="w-4 h-4 text-[#FF4D5A]" />
              <span>Call Now</span>
            </a>
          </div>

          {showNumbers && (
            <div className="text-xs sm:text-sm font-poppins font-bold text-gray-300 tracking-wider">
              {siteConfig.phones[0]} <span className="text-gray-500">|</span> {siteConfig.phones[1]}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
