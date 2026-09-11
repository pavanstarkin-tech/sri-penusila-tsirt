"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, ArrowRight, Check } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import confetti from "canvas-confetti";

import { getAssetPath } from "@/data/siteConfig";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className = "" }: ProductCardProps) {
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useWishlist();
  const [isAdded, setIsAdded] = useState(false);

  const isFav = isFavorite(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: "L",
      color: product.colors[0] || "#0B0B0B",
      quantity: 1
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);

    try {
      confetti({
        particleCount: 25,
        spread: 40,
        origin: { y: 0.8 },
        colors: ["#E11D2E", "#0B0B0B", "#FFFFFF"]
      });
    } catch {}
  };

  return (
    <div
      className={`group bg-white border border-[#E7E7E7] overflow-hidden flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-gray-300 card-product ${className}`}
    >
      {/* 1. IMAGE STAGE */}
      <div className="relative aspect-[4/3.8] sm:aspect-square w-full bg-[#F8F8F8] overflow-hidden flex items-center justify-center p-3 border-b border-[#EFEFEF]">
        {/* Floating Heart Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(product.id);
          }}
          className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs border flex items-center justify-center shadow-2xs transition-all active:scale-125 min-w-[36px] min-h-[36px] ${
            isFav
              ? "text-[#E11D2E] border-red-200 bg-red-50/70"
              : "text-gray-400 border-gray-200 hover:text-[#E11D2E] hover:border-red-200"
          }`}
          aria-label={isFav ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={`w-4 h-4 transition-transform ${isFav ? "fill-[#E11D2E] scale-110" : ""}`}
          />
        </button>

        {/* Product Image with smooth 1.03 hover scale */}
        <div className="relative w-full h-full transition-transform duration-300 group-hover:scale-[1.03]">
          <Image
            src={getAssetPath(product.image)}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain"
          />
        </div>
      </div>

      {/* 2. LAYERED PRODUCT INFO & ACTION TRAY */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between bg-white">
        <div>
          <div className="text-[10px] sm:text-[11px] font-bold text-[#E11D2E] uppercase tracking-wider mb-1 truncate">
            {product.category}
          </div>
          <h3 className="font-poppins font-bold text-sm sm:text-[15px] text-[#111111] leading-snug truncate group-hover:text-[#E11D2E] transition-colors">
            {product.name}
          </h3>

          {/* Price Row */}
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-poppins font-extrabold text-base sm:text-lg text-[#0B0B0B]">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>
        </div>

        {/* 3. INTEGRATED BOTTOM ACTION TRAY */}
        <div className="mt-3.5 pt-3 border-t border-gray-100 flex items-center gap-2">
          <Link
            href={`/custom-printing?product=${product.id}`}
            className="flex-1 flex items-center justify-center gap-1.5 bg-[#E11D2E] hover:bg-[#C51322] text-white font-poppins font-semibold text-xs py-2 px-3 rounded-xl shadow-xs transition-all active:scale-95 text-center min-h-[38px]"
          >
            <span>Customize</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>

          <button
            onClick={handleAddToCart}
            className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all shrink-0 min-w-[38px] min-h-[38px] ${
              isAdded
                ? "bg-emerald-600 border-emerald-600 text-white"
                : "border-[#E11D2E] text-[#E11D2E] hover:bg-red-50 active:scale-90"
            }`}
            aria-label="Add to cart"
            title="Add to cart"
          >
            {isAdded ? (
              <Check className="w-4 h-4" />
            ) : (
              <ShoppingCart className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
