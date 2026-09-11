"use client";

import React from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { InstagramIcon, FacebookIcon, YoutubeIcon } from "@/components/SocialIcons";
import { siteConfig } from "@/data/siteConfig";

export default function TopBar() {
  return (
    <div className="bg-[#0B0B0B] text-white text-[11px] sm:text-xs py-1.5 px-4 sm:px-8 border-b border-[#222222]">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-4">
        {/* Left: Location */}
        <div className="flex items-center gap-1.5 text-gray-300">
          <MapPin className="w-3.5 h-3.5 text-[#E11D2E] shrink-0" />
          <span className="truncate">{siteConfig.address.short}</span>
        </div>

        {/* Center: Tagline */}
        <div className="hidden md:block font-medium text-gray-200 tracking-wide text-center">
          Custom T-Shirts for Every Idea, Every Moment!
        </div>

        {/* Right: Social icons + Brand phrase */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2.5 text-gray-300">
            <Link
              href={siteConfig.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-[#E11D2E] transition-colors"
            >
              <InstagramIcon className="w-3.5 h-3.5" />
            </Link>
            <Link
              href={siteConfig.socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-[#E11D2E] transition-colors"
            >
              <FacebookIcon className="w-3.5 h-3.5" />
            </Link>
            <Link
              href={siteConfig.socialLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="hover:text-[#E11D2E] transition-colors"
            >
              <YoutubeIcon className="w-3.5 h-3.5" />
            </Link>
          </div>
          <span className="hidden sm:inline-block text-gray-500">|</span>
          <span className="font-script text-sm text-[#FF4D5A] hidden sm:inline-block font-semibold">
            Wear Your Story ❤️
          </span>
        </div>
      </div>
    </div>
  );
}
