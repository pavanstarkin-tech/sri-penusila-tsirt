"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Plus,
  Minus
} from "lucide-react";
import { InstagramIcon, FacebookIcon, YoutubeIcon, WhatsappIcon } from "@/components/SocialIcons";
import { siteConfig, getWhatsAppLink, getTelLink, getAssetPath } from "@/data/siteConfig";

export default function Footer() {
  const [mobileSection, setMobileSection] = useState<string | null>(null);

  const toggleMobileSection = (sec: string) => {
    setMobileSection(mobileSection === sec ? null : sec);
  };

  return (
    <footer className="bg-[#0B0B0B] text-gray-300 pt-16 pb-28 sm:pb-16 border-t border-[#202020]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        {/* DESKTOP ASYMMETRIC GRID (Wider Brand Column + Hairline Dividers) */}
        <div className="hidden lg:grid grid-cols-12 gap-8 pb-14 border-b border-[#202020]">
          {/* Col 1: Brand & Identity (4 cols) */}
          <div className="col-span-4 space-y-4 pr-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-11 h-11 shrink-0 transition-transform duration-200 group-hover:scale-105">
                <Image
                  src={getAssetPath("/logo/logo-emblem.png")}
                  alt="Sri Penusila Logo"
                  fill
                  sizes="44px"
                  className="object-contain filter drop-shadow-xs"
                />
              </div>
              <div>
                <span className="font-poppins font-extrabold text-base text-white leading-none block">
                  SRI PENUSILA
                </span>
                <span className="font-poppins font-semibold text-[9px] text-gray-400 uppercase tracking-widest block mt-0.5">
                  T-SHIRT PRINTING CENTRE
                </span>
              </div>
            </Link>

            <div className="flex items-start gap-2.5 text-xs text-gray-400 leading-relaxed">
              <MapPin className="w-4 h-4 text-[#E11D2E] shrink-0 mt-0.5" />
              <p>
                {siteConfig.address.village}, {siteConfig.address.mandal},<br />
                {siteConfig.address.district}, {siteConfig.address.state}.
              </p>
            </div>

            <p className="text-xs text-gray-400 italic">
              &quot;Custom T-Shirts for Every Idea, Every Moment!&quot;
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-2">
              <Link
                href={siteConfig.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-[#1A1A1A] hover:bg-[#E11D2E] flex items-center justify-center text-white transition-colors"
              >
                <InstagramIcon className="w-4 h-4" />
              </Link>
              <Link
                href={siteConfig.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-[#1A1A1A] hover:bg-[#E11D2E] flex items-center justify-center text-white transition-colors"
              >
                <FacebookIcon className="w-4 h-4" />
              </Link>
              <Link
                href={siteConfig.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 rounded-full bg-[#1A1A1A] hover:bg-[#E11D2E] flex items-center justify-center text-white transition-colors"
              >
                <YoutubeIcon className="w-4 h-4" />
              </Link>
              <Link
                href={getWhatsAppLink(siteConfig.phones[0])}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-8 h-8 rounded-full bg-[#1A1A1A] hover:bg-[#25D366] flex items-center justify-center text-white transition-colors"
              >
                <WhatsappIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="col-span-2 space-y-3 pl-4 border-l border-[#202020]">
            <h4 className="font-poppins font-bold text-xs text-white uppercase tracking-widest">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <Link href="/" className="hover:text-[#E11D2E] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/store" className="hover:text-[#E11D2E] transition-colors">
                  Store
                </Link>
              </li>
              <li>
                <Link href="/custom-printing" className="hover:text-[#E11D2E] transition-colors">
                  Custom Printing
                </Link>
              </li>
              <li>
                <Link href="/designs" className="hover:text-[#E11D2E] transition-colors">
                  Designs
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#E11D2E] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#E11D2E] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Services (3 cols) */}
          <div className="col-span-3 space-y-3 pl-4 border-l border-[#202020]">
            <h4 className="font-poppins font-bold text-xs text-white uppercase tracking-widest">
              Our Services
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <Link href="/custom-printing" className="hover:text-[#E11D2E] transition-colors">
                  T-Shirt Printing & Photos
                </Link>
              </li>
              <li>
                <Link href="/custom-printing" className="hover:text-[#E11D2E] transition-colors">
                  Names, Numbers & Typography
                </Link>
              </li>
              <li>
                <Link href="/custom-printing" className="hover:text-[#E11D2E] transition-colors">
                  Logos & Corporate Uniforms
                </Link>
              </li>
              <li>
                <Link href="/designs" className="hover:text-[#E11D2E] transition-colors">
                  College Batches & Events
                </Link>
              </li>
              <li>
                <Link href="/designs" className="hover:text-[#E11D2E] transition-colors">
                  Team & Squad T-Shirts
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Brand Signature (3 cols) */}
          <div className="col-span-3 space-y-4 pl-4 border-l border-[#202020]">
            <h4 className="font-poppins font-bold text-xs text-white uppercase tracking-widest">
              Direct Contact
            </h4>
            <div className="space-y-2 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#E11D2E]" />
                <a href={getTelLink(siteConfig.phones[0])} className="hover:text-white">
                  {siteConfig.phones[0]}
                </a>
                <span>/</span>
                <a href={getTelLink(siteConfig.phones[1])} className="hover:text-white">
                  {siteConfig.phones[1]}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#E11D2E]" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-white truncate">
                  {siteConfig.email}
                </a>
              </div>
            </div>

            {/* Visual Signature: WEAR YOUR STORY */}
            <div className="pt-3">
              <div className="font-script text-3xl text-white tracking-wide">
                Wear Your Story
              </div>
              <div className="w-24 h-1 bg-[#E11D2E] rounded-full mt-1 transform -rotate-1" />
            </div>
          </div>
        </div>

        {/* MOBILE ACCORDION FOOTER */}
        <div className="lg:hidden space-y-6 pb-8 border-b border-[#202020]">
          {/* Brand header */}
          <div className="space-y-3 text-center sm:text-left">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="relative w-10 h-10 shrink-0">
                <Image
                  src={getAssetPath("/logo/logo-emblem.png")}
                  alt="Sri Penusila Logo"
                  fill
                  sizes="40px"
                  className="object-contain filter drop-shadow-xs"
                />
              </div>
              <div>
                <span className="font-poppins font-extrabold text-sm text-white block">
                  SRI PENUSILA
                </span>
                <span className="font-poppins font-semibold text-[9px] text-gray-400 uppercase block">
                  T-SHIRT PRINTING CENTRE
                </span>
              </div>
            </Link>
            <p className="text-xs text-gray-400">
              {siteConfig.address.short}
            </p>
          </div>

          {/* Accordion 1: Quick Links */}
          <div className="border-t border-[#202020] pt-3">
            <button
              onClick={() => toggleMobileSection("links")}
              className="w-full flex items-center justify-between py-2 text-xs font-bold text-white uppercase tracking-wider"
            >
              <span>Quick Links</span>
              {mobileSection === "links" ? <Minus className="w-4 h-4 text-[#E11D2E]" /> : <Plus className="w-4 h-4 text-gray-400" />}
            </button>
            {mobileSection === "links" && (
              <ul className="space-y-2 py-2 text-xs text-gray-400 animate-in fade-in">
                <li><Link href="/" className="hover:text-white">Home</Link></li>
                <li><Link href="/store" className="hover:text-white">Store</Link></li>
                <li><Link href="/custom-printing" className="hover:text-white">Custom Printing</Link></li>
                <li><Link href="/designs" className="hover:text-white">Designs</Link></li>
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            )}
          </div>

          {/* Accordion 2: Services */}
          <div className="border-t border-[#202020] pt-3">
            <button
              onClick={() => toggleMobileSection("services")}
              className="w-full flex items-center justify-between py-2 text-xs font-bold text-white uppercase tracking-wider"
            >
              <span>Services</span>
              {mobileSection === "services" ? <Minus className="w-4 h-4 text-[#E11D2E]" /> : <Plus className="w-4 h-4 text-gray-400" />}
            </button>
            {mobileSection === "services" && (
              <ul className="space-y-2 py-2 text-xs text-gray-400 animate-in fade-in">
                <li><Link href="/custom-printing" className="hover:text-white">T-Shirt Printing</Link></li>
                <li><Link href="/custom-printing" className="hover:text-white">Photo & Name Printing</Link></li>
                <li><Link href="/designs" className="hover:text-white">College & Events Squad</Link></li>
                <li><Link href="/custom-printing" className="hover:text-white">Corporate Uniforms</Link></li>
              </ul>
            )}
          </div>

          {/* Accordion 3: Contact */}
          <div className="border-t border-[#202020] pt-3">
            <button
              onClick={() => toggleMobileSection("contact")}
              className="w-full flex items-center justify-between py-2 text-xs font-bold text-white uppercase tracking-wider"
            >
              <span>Contact Us</span>
              {mobileSection === "contact" ? <Minus className="w-4 h-4 text-[#E11D2E]" /> : <Plus className="w-4 h-4 text-gray-400" />}
            </button>
            {mobileSection === "contact" && (
              <div className="space-y-2 py-2 text-xs text-gray-400 animate-in fade-in">
                <div>Phone: <a href={getTelLink(siteConfig.phones[0])} className="text-white">{siteConfig.phones[0]}</a></div>
                <div>WhatsApp: <a href={getWhatsAppLink(siteConfig.phones[0])} className="text-[#25D366]">{siteConfig.phones[0]}</a></div>
                <div>Email: <a href={`mailto:${siteConfig.email}`} className="text-white">{siteConfig.email}</a></div>
              </div>
            )}
          </div>

          {/* Handwritten signature on mobile */}
          <div className="text-center pt-2">
            <div className="font-script text-2xl text-white">Wear Your Story</div>
            <div className="w-20 h-0.5 bg-[#E11D2E] mx-auto mt-1" />
          </div>
        </div>

        {/* Minimal Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <div>
            © {new Date().getFullYear()} Sri Penusila T-Shirts Printing Centre.
          </div>
          <div className="flex items-center gap-1.5">
            <span>Designed with</span>
            <span className="text-[#E11D2E]">❤️</span>
            <span>for creative people in Andhra Pradesh.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
