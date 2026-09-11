"use client";

import React, { useState, useEffect } from "react";
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
  MessageCircle,
  ArrowUpRight,
  ArrowRight
} from "lucide-react";
import { siteConfig, getWhatsAppLink, getTelLink, getAssetPath } from "@/data/siteConfig";
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

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
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-1 text-[#111111] hover:text-[#E11D2E] focus:outline-none min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 shrink-0 rounded-full overflow-hidden border border-amber-300/40 shadow-xs">
                <Image
                  src={getAssetPath("/logo/logo-emblem.png")}
                  alt="Sri Penusila Logo"
                  fill
                  sizes="44px"
                  className="object-contain"
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

            {/* WhatsApp / Enquire Button (Desktop) */}
            <Link
              href={getWhatsAppLink(siteConfig.phones[0], "Hi Sri Penusila, I want to enquire about custom t-shirt printing.")}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 bg-[#E11D2E] hover:bg-[#C51322] text-white font-poppins font-semibold text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl shadow-xs transition-all hover:translate-y-[-1px]"
            >
              <MessageCircle className="w-4 h-4 fill-white text-white" />
              <span>WhatsApp / Enquire</span>
            </Link>

            {/* Circular WhatsApp Button (Mobile) */}
            <Link
              href={getWhatsAppLink(siteConfig.phones[0], "Hi Sri Penusila, I have a t-shirt question.")}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="md:hidden flex items-center justify-center w-9 h-9 bg-[#25D366] text-white rounded-full shadow-sm active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-white text-white" />
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

      {/* FULL-HEIGHT EDITORIAL MOBILE NAVIGATION DRAWER (#0B0B0B) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Body */}
          <div className="relative w-full max-w-sm bg-[#0B0B0B] text-white shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-300">
            {/* Drawer Top Header */}
            <div className="p-5 border-b border-[#222222] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative w-9 h-9 rounded-full overflow-hidden border border-amber-300/40">
                  <Image
                    src={getAssetPath("/logo/logo-emblem.png")}
                    alt="Sri Penusila Logo"
                    fill
                    sizes="36px"
                    className="object-contain"
                  />
                </div>
                <div>
                  <div className="font-poppins font-extrabold text-sm text-white leading-none">
                    SRI PENUSILA
                  </div>
                  <div className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider mt-0.5">
                    T-SHIRT PRINTING CENTRE
                  </div>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-gray-400 hover:text-white rounded-lg min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Editorial Numbered Navigation Links */}
            <div className="flex-1 overflow-y-auto py-6 px-5 space-y-2">
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">
                Navigation
              </div>
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between py-3.5 px-3 rounded-xl border transition-all min-h-[48px] ${
                      isActive
                        ? "bg-[#1A1A1A] border-[#E11D2E] text-white"
                        : "border-transparent text-gray-300 hover:text-white hover:bg-[#141414]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-[#E11D2E] font-bold">
                        {link.num}
                      </span>
                      <span className="font-poppins font-bold text-lg">
                        {link.name}
                      </span>
                    </div>
                    <ArrowUpRight
                      className={`w-5 h-5 transition-transform ${
                        isActive ? "text-[#E11D2E]" : "text-gray-500"
                      }`}
                    />
                  </Link>
                );
              })}

              {/* Brand Handwritten Phrase */}
              <div className="pt-6 pb-2 text-center">
                <div className="font-script text-2xl text-gray-400">
                  Wear Your Story
                </div>
                <div className="text-[11px] text-gray-500 mt-0.5">
                  {siteConfig.address.short}
                </div>
              </div>
            </div>

            {/* Drawer Bottom CTAs */}
            <div className="p-5 border-t border-[#222222] space-y-2.5 bg-[#111111]">
              <Link
                href={getWhatsAppLink(siteConfig.phones[0], "Hi Sri Penusila, I want to discuss a custom T-shirt print.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-poppins font-bold text-sm py-3 rounded-xl shadow-md min-h-[44px]"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp Us</span>
              </Link>

              <a
                href={getTelLink(siteConfig.phones[0])}
                className="w-full flex items-center justify-center gap-2 border border-gray-700 hover:border-gray-500 text-white font-poppins font-semibold text-sm py-3 rounded-xl min-h-[44px]"
              >
                <Phone className="w-4 h-4 text-[#FF4D5A]" />
                <span>Call {siteConfig.phones[0]}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
