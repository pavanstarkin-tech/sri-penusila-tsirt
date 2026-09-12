"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  ShoppingCart,
  MessageCircle,
  Sparkles,
  Shirt,
  Phone
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { siteConfig, getWhatsAppLink } from "@/data/siteConfig";

export default function MobileBottomBar() {
  const pathname = usePathname();
  const { cartCount, setIsCartOpen } = useCart();

  const isHome = pathname === "/";
  const isStore = pathname === "/store" || pathname === "/designs";
  const isCustomize = pathname === "/custom-printing";
  const isContact = pathname === "/contact";

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-[80] px-3 pb-[max(0.75rem,env(safe-area-inset-bottom,0.75rem))] pointer-events-none">
      <nav
        aria-label="Mobile Navigation"
        className="max-w-md mx-auto pointer-events-auto bg-[#0B0B0B]/95 backdrop-blur-md text-white rounded-2xl border border-[#262626] shadow-2xl px-2 py-1.5 flex items-center justify-around"
      >
        {/* 1. HOME */}
        <Link
          href="/"
          className={`flex flex-col items-center gap-1 py-1 px-2 min-w-[54px] rounded-xl transition-all ${
            isHome
              ? "text-[#E11D2E]"
              : "text-gray-400 hover:text-white"
          }`}
        >
          <Home className={`w-5 h-5 transition-transform ${isHome ? "scale-110" : ""}`} />
          <span className="text-[10px] font-semibold tracking-tight">Home</span>
          {isHome && <span className="w-1 h-1 rounded-full bg-[#E11D2E] -mt-0.5" />}
        </Link>

        {/* 2. STORE */}
        <Link
          href="/store"
          className={`flex flex-col items-center gap-1 py-1 px-2 min-w-[54px] rounded-xl transition-all ${
            isStore
              ? "text-[#E11D2E]"
              : "text-gray-400 hover:text-white"
          }`}
        >
          <Shirt className={`w-5 h-5 transition-transform ${isStore ? "scale-110" : ""}`} />
          <span className="text-[10px] font-semibold tracking-tight">Store</span>
          {isStore && <span className="w-1 h-1 rounded-full bg-[#E11D2E] -mt-0.5" />}
        </Link>

        {/* 3. CUSTOMIZE STUDIO (Center Hero Action) */}
        <Link
          href="/custom-printing"
          className={`flex flex-col items-center gap-1 py-1 px-2 min-w-[58px] rounded-xl transition-all ${
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

        {/* 4. CART */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center gap-1 py-1 px-2 min-w-[54px] rounded-xl text-gray-400 hover:text-white transition-all relative"
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

        {/* 5. WHATSAPP / CONTACT */}
        <Link
          href={getWhatsAppLink(siteConfig.phones[0], "Hi Sri Penusila, I am interested in custom T-shirts.")}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 py-1 px-2 min-w-[54px] rounded-xl text-[#25D366] hover:text-[#1EBE5D] transition-all"
          aria-label="Direct WhatsApp Consultation"
        >
          <div className="w-5 h-5 rounded-full bg-[#25D366]/20 flex items-center justify-center">
            <MessageCircle className="w-3.5 h-3.5 fill-[#25D366] text-[#25D366]" />
          </div>
          <span className="text-[10px] font-bold tracking-tight">WhatsApp</span>
        </Link>
      </nav>
    </div>
  );
}

