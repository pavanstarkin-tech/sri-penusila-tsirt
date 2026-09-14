"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  ShoppingCart,
  Sparkles,
  Shirt
} from "lucide-react";
import { WhatsappIcon } from "@/components/SocialIcons";
import { useCart } from "@/context/CartContext";
import { siteConfig, getWhatsAppLink } from "@/data/siteConfig";

export default function MobileBottomBar() {
  const pathname = usePathname();
  const { cartCount, setIsCartOpen } = useCart();

  const isHome = pathname === "/";
  const isStore = pathname === "/store" || pathname === "/designs";
  const isCustomize = pathname === "/custom-printing";

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-[80] pb-[max(0.75rem,env(safe-area-inset-bottom,0.75rem))] pointer-events-none flex items-center justify-between gap-2.5">
      {/* 1. LEFT NAVIGATION UNIT (Stretched from left edge, rounded on right) */}
      <nav
        aria-label="Mobile Navigation"
        className="flex-1 pointer-events-auto bg-[#0B0B0B]/95 backdrop-blur-md text-white rounded-r-[32px] rounded-l-none border border-[#262626] border-l-0 shadow-2xl pl-2.5 pr-4 py-1.5 flex items-center justify-around"
      >
        {/* HOME */}
        <Link
          href="/"
          className={`flex flex-col items-center gap-1 py-1 px-1.5 min-w-[50px] rounded-xl transition-all ${
            isHome
              ? "text-[#E11D2E]"
              : "text-gray-400 hover:text-white"
          }`}
        >
          <Home className={`w-5 h-5 transition-transform ${isHome ? "scale-110" : ""}`} />
          <span className="text-[10px] font-semibold tracking-tight">Home</span>
          {isHome && <span className="w-1 h-1 rounded-full bg-[#E11D2E] -mt-0.5" />}
        </Link>

        {/* STORE */}
        <Link
          href="/store"
          className={`flex flex-col items-center gap-1 py-1 px-1.5 min-w-[50px] rounded-xl transition-all ${
            isStore
              ? "text-[#E11D2E]"
              : "text-gray-400 hover:text-white"
          }`}
        >
          <Shirt className={`w-5 h-5 transition-transform ${isStore ? "scale-110" : ""}`} />
          <span className="text-[10px] font-semibold tracking-tight">Store</span>
          {isStore && <span className="w-1 h-1 rounded-full bg-[#E11D2E] -mt-0.5" />}
        </Link>

        {/* CUSTOMIZE STUDIO (Center Hero Action) */}
        <Link
          href="/custom-printing"
          className={`flex flex-col items-center gap-1 py-1 px-1.5 min-w-[56px] rounded-xl transition-all ${
            isCustomize
              ? "text-[#E11D2E]"
              : "text-gray-300 hover:text-white"
          }`}
        >
          <div className={`relative p-1 rounded-lg ${isCustomize ? "bg-[#E11D2E]/15" : "bg-[#1A1A1A]"}`}>
            <Sparkles className={`w-4 h-4 ${isCustomize ? "text-[#E11D2E]" : "text-[#FF4D5A]"}`} />
          </div>
          <span className="text-[10px] font-bold tracking-tight">Customize</span>
          {isCustomize && <span className="w-1 h-1 rounded-full bg-[#E11D2E] -mt-0.5" />}
        </Link>

        {/* CART */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center gap-1 py-1 px-1.5 min-w-[50px] rounded-xl text-gray-400 hover:text-white transition-all relative"
          aria-label={`Cart with ${cartCount} items`}
        >
          <div className="relative">
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#E11D2E] text-white text-[9px] font-bold min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center shadow-md animate-pulse">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-semibold tracking-tight">Cart</span>
        </button>
      </nav>

      {/* 2. RIGHT STANDALONE WHATSAPP BUTTON (Stretched to right edge, rounded on left with outline) */}
      <Link
        href={getWhatsAppLink(siteConfig.phones[0], "Hi Sri Penusila, I am interested in custom T-shirts.")}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto shrink-0 bg-[#0B0B0B]/95 backdrop-blur-md text-[#25D366] hover:text-[#1EBE5D] rounded-l-[32px] rounded-r-none border border-[#262626] hover:border-[#25D366]/50 border-r-0 shadow-2xl pl-4 pr-3 py-1.5 flex flex-col items-center justify-center gap-1 min-w-[68px] transition-all active:scale-95"
        aria-label="Direct WhatsApp Consultation"
      >
        <WhatsappIcon className="w-5 h-5" />
        <span className="text-[10px] font-bold tracking-tight text-[#25D366]">WhatsApp</span>
      </Link>
    </div>
  );
}

