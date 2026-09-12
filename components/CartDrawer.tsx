"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, Trash2, ShoppingBag, MessageCircle, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { getAssetPath } from "@/data/siteConfig";

export default function CartDrawer() {
  const [mounted, setMounted] = useState(false);

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

  // Lock body scroll when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  if (!isCartOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[999] overflow-hidden flex justify-end animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-250">
        {/* Cart Header */}
        <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50 shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#E11D2E]" />
            <h2 className="font-poppins font-bold text-base text-[#0B0B0B]">
              Your Cart ({cartCount})
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setIsCartOpen(false)}
            className="w-8 h-8 rounded-full bg-gray-200/70 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 divide-y divide-gray-100">
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-poppins font-semibold text-gray-800 text-lg mb-1">
                Your cart is empty
              </h3>
              <p className="text-xs text-gray-500 max-w-xs mx-auto mb-6">
                Explore our catalog or create your custom T-shirt today!
              </p>
              <div className="flex flex-col gap-2 max-w-xs mx-auto">
                <Link
                  href="/store"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full bg-[#E11D2E] hover:bg-[#C51322] text-white font-poppins font-semibold text-xs py-3 rounded-xl shadow-sm transition-colors text-center"
                >
                  Browse Store
                </Link>
                <Link
                  href="/custom-printing"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full bg-[#0B0B0B] hover:bg-black text-white font-poppins font-semibold text-xs py-3 rounded-xl transition-colors text-center"
                >
                  Custom Printing Studio
                </Link>
              </div>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="pt-4 first:pt-0 flex gap-3.5">
                {/* Product Thumbnail */}
                <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-50 border border-gray-200 shrink-0 p-1">
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
                      <h4 className="font-poppins font-bold text-xs sm:text-sm text-[#0B0B0B] leading-tight line-clamp-1">
                        {item.name}
                      </h4>
                      <div className="text-[11px] text-gray-500 font-mono mt-0.5">
                        {item.size} • {item.color}
                        {item.isCustom && (
                          <span className="ml-1 text-[10px] text-[#E11D2E] font-bold">
                            (Custom)
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-600 p-1 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex justify-between items-center mt-2">
                    {/* Quantity Control */}
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2.5 font-mono text-xs font-bold text-[#0B0B0B]">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="font-poppins font-bold text-sm text-[#0B0B0B]">
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
          <div className="p-4 sm:p-5 border-t border-gray-200 bg-gray-50 space-y-3 shrink-0 pb-[max(1rem,env(safe-area-inset-bottom,1rem))]">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-poppins font-bold text-base text-[#0B0B0B]">
                ₹{cartSubtotal}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs text-gray-500 pb-1">
              <span>Estimated Delivery</span>
              <span className="text-emerald-600 font-medium">Standard / Local Delivery</span>
            </div>

            {/* Checkout via WhatsApp Button */}
            <button
              type="button"
              onClick={checkoutViaWhatsApp}
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-poppins font-bold text-sm py-3.5 rounded-xl shadow-md transition-all active:scale-95"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>Order / Enquire via WhatsApp</span>
            </button>

            <div className="text-center text-[11px] text-gray-500">
              Direct chat with our printing team in Rapur for instant confirmation.
            </div>

            <div className="flex justify-center gap-4 text-xs font-semibold text-gray-600 pt-1">
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="hover:text-[#E11D2E] underline underline-offset-2"
              >
                Continue Browsing
              </button>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
