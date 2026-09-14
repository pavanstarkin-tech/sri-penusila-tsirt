"use client";

import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { WhatsappIcon } from "@/components/SocialIcons";
import { useCart } from "@/context/CartContext";
import { getAssetPath } from "@/data/siteConfig";

export default function CartDrawer() {
  const [mounted, setMounted] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const {
    cart,
    cartCount,
    cartSubtotal,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    checkoutViaWhatsApp
  } = useCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Smooth 3D Close Lifecycle Handler
  const handleClose = useCallback(() => {
    setIsClosing(true);
    if (typeof document !== "undefined") {
      document.body.classList.remove("cart-drawer-open");
    }
    setTimeout(() => {
      setIsCartOpen(false);
      setIsClosing(false);
    }, 340);
  }, [setIsCartOpen]);

  // Manage 3D body suppression class
  useEffect(() => {
    if (isCartOpen && !isClosing) {
      document.body.classList.add("cart-drawer-open");
    } else if (!isCartOpen) {
      document.body.classList.remove("cart-drawer-open");
    }
    return () => {
      if (typeof document !== "undefined") {
        document.body.classList.remove("cart-drawer-open");
      }
    };
  }, [isCartOpen, isClosing]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isCartOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCartOpen, handleClose]);

  if (!isCartOpen && !isClosing) return null;
  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[999] overflow-hidden flex justify-end">
      {/* 3D Backdrop overlay */}
      <div
        className={`fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300 ${
          isClosing ? "opacity-0" : "opacity-100"
        }`}
        onClick={handleClose}
      />

      {/* 3D Perspective Cart Sidebar */}
      <div
        className={`relative w-[285px] sm:w-[340px] lg:w-[380px] max-w-[85vw] h-full bg-[#0E0E0E] text-white shadow-2xl flex flex-col z-10 border-l border-[#222222] overflow-hidden ${
          isClosing ? "cart-drawer-3d-exit" : "cart-drawer-3d-enter"
        }`}
      >
        {/* Cart Header */}
        <div className="p-3.5 sm:p-4 border-b border-[#222222] flex items-center justify-between bg-[#141414] shrink-0 gap-2">
          <div className="flex items-center gap-2 min-w-0 pr-1">
            <div className="w-8 h-8 rounded-lg bg-[#E11D2E]/15 border border-[#E11D2E]/30 flex items-center justify-center shrink-0">
              <ShoppingBag className="w-4 h-4 text-[#FF4D5A]" />
            </div>
            <div className="min-w-0 truncate">
              <h2 className="font-poppins font-bold text-xs sm:text-sm text-white leading-tight truncate">
                Your Shopping Bag ({cartCount})
              </h2>
              <span className="text-[8px] sm:text-[9px] text-gray-400 font-mono tracking-wide truncate block">
                Sri Penusila Rapur Studio
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-400 hover:text-white transition-colors shrink-0"
            aria-label="Close cart"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Cart Items List with Staggered 3D Cascade */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 divide-y divide-[#1F1F1F]">
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-[#181818] text-gray-400 flex items-center justify-center mx-auto mb-4 border border-[#262626]">
                <ShoppingBag className="w-8 h-8 text-[#FF4D5A]" />
              </div>
              <h3 className="font-poppins font-semibold text-white text-lg mb-1">
                Your cart is empty
              </h3>
              <p className="text-xs text-gray-400 max-w-xs mx-auto mb-6">
                Explore our trending catalog or create your custom T-shirt today!
              </p>
              <div className="flex flex-col gap-2 max-w-xs mx-auto">
                <Link
                  href="/store"
                  onClick={handleClose}
                  className="w-full bg-[#E11D2E] hover:bg-[#C51322] text-white font-poppins font-semibold text-xs py-3 rounded-xl shadow-sm transition-colors text-center"
                >
                  Browse Store Catalog
                </Link>
                <Link
                  href="/custom-printing"
                  onClick={handleClose}
                  className="w-full bg-[#181818] hover:bg-[#222222] text-white font-poppins font-semibold text-xs py-3 rounded-xl border border-gray-700 transition-colors text-center"
                >
                  Custom Printing Studio
                </Link>
              </div>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div
                key={item.id}
                style={{ animationDelay: `${idx * 45 + 60}ms` }}
                className="cart-item-3d pt-3.5 first:pt-0 flex gap-3.5 group bg-[#131313] p-3 rounded-2xl border border-[#222222]"
              >
                {/* Product Thumbnail */}
                <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-[#1A1A1A] border border-[#2B2B2B] shrink-0 p-1">
                  <Image
                    src={getAssetPath(item.image)}
                    alt={item.name}
                    fill
                    sizes="80px"
                    className="object-contain"
                  />
                </div>

                {/* Info & Quantity */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h4 className="font-poppins font-bold text-xs sm:text-sm text-white leading-tight line-clamp-1">
                        {item.name}
                      </h4>
                      <div className="text-[11px] text-gray-400 font-mono mt-0.5">
                        {item.size} • {item.color}
                        {item.isCustom && (
                          <span className="ml-1 text-[10px] text-[#FF4D5A] font-bold">
                            (Custom Print)
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-[#FF4D5A] p-1 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex justify-between items-center mt-2">
                    {/* Quantity Control */}
                    <div className="flex items-center border border-[#333333] rounded-lg overflow-hidden bg-[#1A1A1A]">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-1 text-gray-300 hover:bg-[#282828] transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2.5 font-mono text-xs font-bold text-white">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 text-gray-300 hover:bg-[#282828] transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="font-poppins font-bold text-sm text-[#FF4D5A]">
                      ₹{item.price * item.quantity}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Footer */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-[#222222] bg-[#121212] space-y-3 shrink-0 pb-[max(1rem,env(safe-area-inset-bottom,1rem))]">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">Order Subtotal</span>
              <span className="font-poppins font-bold text-base text-white">
                ₹{cartSubtotal}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs text-gray-400 pb-1">
              <span>Estimated Delivery</span>
              <span className="text-emerald-400 font-medium">Standard / Local Rapur Delivery</span>
            </div>

            {/* Checkout via WhatsApp Button */}
            <button
              type="button"
              onClick={() => {
                checkoutViaWhatsApp();
                handleClose();
              }}
              className="w-full flex items-center justify-center gap-1.5 sm:gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-poppins font-bold text-xs sm:text-sm py-3 px-2.5 sm:px-3 rounded-xl shadow-lg transition-transform active:scale-95 text-center min-h-[44px]"
            >
              <WhatsappIcon className="w-4 h-4 shrink-0" />
              <span className="whitespace-nowrap">Checkout on WhatsApp →</span>
            </button>

            <div className="text-center text-[11px] text-gray-400">
              Direct chat with Sri Penusila team in Rapur for instant order confirmation.
            </div>

            <div className="flex justify-center gap-4 text-xs font-semibold text-gray-400 pt-1">
              <button
                type="button"
                onClick={handleClose}
                className="hover:text-[#FF4D5A] underline underline-offset-2 transition-colors"
              >
                ← Continue Browsing
              </button>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
