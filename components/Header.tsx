"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Search,
  User,
  ShoppingCart,
  Menu,
  X,
  Phone,
  ArrowUpRight,
  ArrowRight
} from "lucide-react";
import { siteConfig, getWhatsAppLink, getTelLink, getAssetPath } from "@/data/siteConfig";
import { WhatsappIcon } from "@/components/SocialIcons";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { num: "01", name: "Home", href: "/" },
  { num: "02", name: "Store", href: "/store" },
  { num: "03", name: "Custom Printing", href: "/custom-printing" },
  { num: "04", name: "Designs", href: "/designs" },
  { num: "05", name: "About", href: "/about" },
  { num: "06", name: "Contact", href: "/contact" }
];

export default function Header() {
  const pathname = usePathname();
  const { cartCount, setIsCartOpen } = useCart();
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const openMobileMenu = () => {
    setIsClosing(false);
    setMobileMenuOpen(true);
    if (typeof document !== "undefined") {
      document.body.classList.add("mobile-menu-open");
    }
  };

  const closeMobileMenu = () => {
    if (isClosing) return;
    setIsClosing(true);
    if (typeof document !== "undefined") {
      document.body.classList.remove("mobile-menu-open");
    }
    setTimeout(() => {
      setMobileMenuOpen(false);
      setIsClosing(false);
    }, 360);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      closeMobileMenu();
    }
  }, [pathname]);

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      if (typeof document !== "undefined") {
        document.body.classList.remove("mobile-menu-open");
      }
    };
  }, []);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        closeMobileMenu();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/store?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 bg-white/95 backdrop-blur-md transition-all duration-200 ${
          isScrolled
            ? "shadow-sm py-2.5 border-b border-[#E7E7E7]"
            : "border-b border-[#E7E7E7] py-3.5"
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 flex items-center justify-between gap-4">
          {/* Left: Mobile hamburger & Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={openMobileMenu}
              className="lg:hidden p-2 -ml-1 text-[#111111] hover:text-[#E11D2E] focus:outline-none min-w-[44px] min-h-[44px] flex items-center justify-center transition-transform active:scale-90"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
              <div className="relative w-11 h-11 sm:w-12 sm:h-12 shrink-0 transition-transform duration-200 group-hover:scale-105">
                <Image
                  src={getAssetPath("/logo/logo-emblem.png")}
                  alt="Sri Penusila Custom Apparel & Printing Logo"
                  fill
                  sizes="(max-width: 640px) 44px, 48px"
                  className="object-contain filter drop-shadow-xs"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="font-poppins font-extrabold text-sm sm:text-base tracking-tight text-[#0B0B0B] group-hover:text-[#E11D2E] transition-colors leading-none">
                  SRI PENUSILA
                </span>
                <span className="font-poppins font-semibold text-[9px] sm:text-[10px] tracking-wider text-gray-500 uppercase mt-0.5 leading-tight">
                  T-SHIRT PRINTING CENTRE
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Desktop Navigation with animated sliding underline */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`nav-link-underline font-montserrat text-sm font-semibold tracking-wide transition-colors py-1 ${
                    isActive
                      ? "text-[#E11D2E] active"
                      : "text-[#111111] hover:text-[#E11D2E]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right: Search, Account, Cart, WhatsApp */}
          <div className="flex items-center gap-2 sm:gap-3.5">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-gray-700 hover:text-[#E11D2E] hover:bg-gray-100 rounded-full transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center"
              aria-label="Search designs"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <Link
              href="/contact"
              className="hidden sm:flex p-2 text-gray-700 hover:text-[#E11D2E] hover:bg-gray-100 rounded-full transition-colors min-w-[40px] min-h-[40px] items-center justify-center"
              aria-label="Contact & Account"
            >
              <User className="w-5 h-5" />
            </Link>

            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-gray-700 hover:text-[#E11D2E] hover:bg-gray-100 rounded-full relative transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center"
              aria-label={`Shopping cart with ${cartCount} items`}
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
              {cartCount > 0 && (
                <span className="absolute 0 top-0.5 right-0.5 bg-[#E11D2E] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>

            {/* WhatsApp / Enquire Button (Desktop only) */}
            <Link
              href={getWhatsAppLink(siteConfig.phones[0], "Hi Sri Penusila, I want to enquire about custom t-shirt printing.")}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 bg-[#E11D2E] hover:bg-[#C51322] text-white font-poppins font-semibold text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl shadow-xs transition-all hover:translate-y-[-1px]"
            >
              <WhatsappIcon className="w-4 h-4" />
              <span>WhatsApp / Enquire</span>
            </Link>
          </div>
        </div>

        {/* Expandable Search Input Bar */}
        {searchOpen && (
          <div className="border-t border-[#E7E7E7] bg-gray-50/95 py-3 px-4 sm:px-8 animate-in slide-in-from-top-2 duration-200">
            <form onSubmit={handleSearchSubmit} className="max-w-[800px] mx-auto flex gap-2">
              <input
                type="text"
                placeholder="Search for designs, categories, or ideas (e.g. Good Vibes, Birthday, Team)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="flex-1 bg-white border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#E11D2E] focus:ring-1 focus:ring-[#E11D2E]"
              />
              <button
                type="submit"
                className="bg-[#E11D2E] hover:bg-[#C51322] text-white font-semibold text-sm px-5 py-2 rounded-xl transition-colors"
              >
                Search
              </button>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="p-2 text-gray-500 hover:text-gray-800"
                aria-label="Close search"
              >
                <X className="w-5 h-5" />
              </button>
            </form>
          </div>
        )}
      </header>

      {/* 3D INTERACTIVE EDITORIAL LEFT NAVIGATION DRAWER (Portaled to document.body) */}
      {mounted && mobileMenuOpen && createPortal(
        <div className="fixed inset-0 z-[999] flex">
          {/* Backdrop (tap to smoothly dismiss and expand background shell back) */}
          <div
            className={`fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-350 ${
              isClosing ? "opacity-0" : "opacity-100 animate-in fade-in"
            }`}
            onClick={closeMobileMenu}
          />

          {/* 3D Drawer Body (Responsive and aligned with 3D perspective shift) */}
          <div
            className={`relative w-[285px] sm:w-[340px] lg:w-[380px] max-w-[85vw] h-full bg-[#0E0E0E] text-white shadow-2xl flex flex-col z-10 border-r border-[#222222] overflow-hidden ${
              isClosing ? "drawer-3d-exit" : "drawer-3d-enter"
            }`}
          >
            {/* Drawer Top Header */}
            <div className="p-3.5 sm:p-4 border-b border-[#222222] flex items-center justify-between bg-[#141414] shrink-0 gap-2">
              <div className="flex items-center gap-2 min-w-0 pr-1">
                <div className="relative w-9 h-9 shrink-0">
                  <Image
                    src={getAssetPath("/logo/logo-emblem.png")}
                    alt="Sri Penusila Logo"
                    fill
                    sizes="36px"
                    className="object-contain filter drop-shadow-xs"
                  />
                </div>
                <div className="min-w-0 truncate">
                  <div className="font-poppins font-extrabold text-xs sm:text-sm text-white leading-tight truncate">
                    SRI PENUSILA
                  </div>
                  <div className="text-[8px] sm:text-[9px] font-semibold text-gray-400 uppercase tracking-wider mt-0.5 truncate">
                    T-SHIRT PRINTING CENTRE
                  </div>
                </div>
              </div>
              <button
                onClick={closeMobileMenu}
                className="p-1.5 text-gray-400 hover:text-white rounded-lg bg-white/10 hover:bg-white/20 min-w-[34px] min-h-[34px] flex items-center justify-center shrink-0 transition-all active:scale-90"
                aria-label="Close menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Editorial Numbered Navigation Links with Staggered 3D Cascade */}
            <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1.5">
              <div className="text-[10px] font-mono font-bold text-[#FF4D5A] uppercase tracking-widest px-2 mb-2 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E11D2E]" />
                Navigation Menu
              </div>

              {navLinks.map((link, idx) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={closeMobileMenu}
                    style={{
                      animationDelay: `${idx * 40 + 50}ms`
                    }}
                    className={`nav-item-3d flex items-center justify-between py-2.5 px-3 rounded-xl border transition-all duration-200 min-h-[44px] active:scale-[0.98] ${
                      isActive
                        ? "bg-gradient-to-r from-[#1E1E1E] to-[#141414] border-[#E11D2E] text-white shadow-xs"
                        : "border-white/5 text-gray-300 hover:text-white hover:bg-[#141414] hover:border-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="font-mono text-xs text-[#E11D2E] font-bold shrink-0">
                        {link.num}
                      </span>
                      <span className="font-poppins font-bold text-sm sm:text-base tracking-tight truncate">
                        {link.name}
                      </span>
                    </div>
                    <ArrowUpRight
                      className={`w-4 h-4 shrink-0 transition-transform ${
                        isActive ? "text-[#E11D2E] translate-x-0.5 -translate-y-0.5" : "text-gray-500"
                      }`}
                    />
                  </Link>
                );
              })}

              {/* Brand Signature Card */}
              <div className="pt-4 pb-2 text-center px-2">
                <div className="font-script text-xl sm:text-2xl text-gray-300 leading-tight">
                  Wear Your Story
                </div>
                <div className="text-[9px] text-gray-500 font-mono mt-0.5 truncate">
                  {siteConfig.address.short}
                </div>
              </div>
            </div>

            {/* Drawer Bottom CTAs with Safe Area Clearance */}
            <div className="p-3 border-t border-[#222222] space-y-2 bg-[#0E0E0E] pb-[max(1rem,env(safe-area-inset-bottom,1rem))] shrink-0">
              <Link
                href={getWhatsAppLink(siteConfig.phones[0], "Hi Sri Penusila, I want to discuss a custom T-shirt print.")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobileMenu}
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-poppins font-bold text-xs py-3 rounded-xl shadow-md min-h-[44px] active:scale-[0.98] transition-transform"
              >
                <WhatsappIcon className="w-4 h-4" />
                <span>WhatsApp Us Direct</span>
              </Link>

              <a
                href={getTelLink(siteConfig.phones[0])}
                className="w-full flex items-center justify-center gap-2 border border-gray-800 hover:border-gray-600 bg-white/5 text-white font-poppins font-semibold text-xs py-2 rounded-xl min-h-[40px] active:scale-[0.98] transition-transform"
              >
                <Phone className="w-3.5 h-3.5 text-[#FF4D5A]" />
                <span>Call {siteConfig.phones[0]}</span>
              </a>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
