"use client";

import React from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { InstagramIcon, FacebookIcon, YoutubeIcon } from "@/components/SocialIcons";
import { siteConfig } from "@/data/siteConfig";

export default function TopBar() {
  return (
    <div className="bg-[#0B0B0B] text-white text-[10px] sm:text-xs py-1 sm:py-1.5 px-3 sm:px-8 border-b border-[#222222]">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Location with interactive map link */}
        <a
          href={siteConfig.address.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors min-w-0"
          title={siteConfig.address.full}
        >
          <MapPin className="w-3.5 h-3.5 text-[#E11D2E] shrink-0" />
          <span className="truncate">
            <span className="sm:hidden">Penubarthi, Rapur</span>
            <span className="hidden sm:inline">{siteConfig.address.short}</span>
          </span>
        </a>

        {/* Center: Tagline on desktop */}
        <div className="hidden md:block font-medium text-gray-300 tracking-wide text-center">
          Custom T-Shirts for Every Idea, Every Moment!
        </div>

        {/* Right: Social icons + Brand phrase */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="flex items-center gap-2 sm:gap-2.5 text-gray-300">
            <Link
              href={siteConfig.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-[#E11D2E] transition-colors p-0.5"
            >
              <InstagramIcon className="w-3.5 h-3.5" />
            </Link>
            <Link
              href={siteConfig.socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-[#E11D2E] transition-colors p-0.5"
            >
              <FacebookIcon className="w-3.5 h-3.5" />
            </Link>
            <Link
              href={siteConfig.socialLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="hover:text-[#E11D2E] transition-colors p-0.5"
            >
              <YoutubeIcon className="w-3.5 h-3.5" />
            </Link>
          </div>
          <span className="hidden sm:inline-block text-gray-600">|</span>
          <span className="font-script text-xs sm:text-sm text-[#FF4D5A] hidden sm:inline-block font-semibold">
            Wear Your Story ❤️
          </span>
        </div>
      </div>
    </div>
  );
}
