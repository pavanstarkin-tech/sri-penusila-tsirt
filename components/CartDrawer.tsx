"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, Trash2, ShoppingBag, MessageCircle, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { getAssetPath } from "@/data/siteConfig";

export default function CartDrawer() {
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

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-250">
          {/* Cart Header */}
          <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#E11D2E]" />
              <h2 className="font-poppins font-bold text-base text-[#0B0B0B]">
                Your Cart ({cartCount})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-200 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
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
                <p className="text-sm text-gray-500 mb-6 max-w-xs mx-auto">
                  Explore our trending T-shirt designs or start a custom print from scratch.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-[#E11D2E] hover:bg-[#C51322] text-white font-semibold text-sm px-6 py-2.5 rounded-lg shadow-sm"
                >
                  Browse Designs
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="pt-4 first:pt-0 flex gap-3.5 items-start">
                  {/* Item Image */}
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-50 border border-gray-200 shrink-0">
                    <Image
                      src={getAssetPath(item.image)}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="object-contain p-1"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-poppins font-semibold text-sm text-[#0B0B0B] truncate">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-[#E11D2E] transition-colors p-0.5"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                      <span>Size: <strong>{item.size}</strong></span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        Color:
                        <span
                          className="w-3 h-3 rounded-full border border-gray-300 inline-block"
                          style={{ backgroundColor: item.color }}
                        />
                      </span>
                    </div>

                    {item.customText && (
                      <div className="text-[11px] text-gray-600 bg-gray-50 px-2 py-0.5 rounded mt-1 truncate border border-gray-200">
                        Text: &quot;{item.customText}&quot;
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-gray-200 rounded-md bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-gray-500 hover:text-black transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 text-xs font-semibold text-gray-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-gray-500 hover:text-black transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
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
            <div className="p-4 sm:p-5 border-t border-gray-200 bg-gray-50 space-y-3">
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
                onClick={checkoutViaWhatsApp}
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-poppins font-bold text-sm py-3 rounded-xl shadow-md transition-all hover:translate-y-[-1px]"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Order / Enquire via WhatsApp</span>
              </button>

              <div className="text-center text-[11px] text-gray-500">
                Direct chat with our printing team in Rapur for instant confirmation.
              </div>

              <div className="flex justify-center gap-4 text-xs font-semibold text-gray-600 pt-1">
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="hover:text-[#E11D2E] underline underline-offset-2"
                >
                  Continue Browsing
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
