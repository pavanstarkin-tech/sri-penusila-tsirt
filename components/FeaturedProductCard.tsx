"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, ArrowRight, Check, Star, Sparkles } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import confetti from "canvas-confetti";
import { getAssetPath } from "@/data/siteConfig";

interface FeaturedProductCardProps {
  product: Product;
}

export default function FeaturedProductCard({ product }: FeaturedProductCardProps) {
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
        particleCount: 35,
        spread: 50,
        origin: { y: 0.7 }
      });
    } catch {}
  };

  return (
    <div className="card-feature bg-white border border-[#E7E7E7] overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-300 group h-full rounded-2xl sm:rounded-3xl">
      {/* Large Featured Image Stage */}
      <div className="relative aspect-[4/3.5] sm:aspect-square w-full bg-[#F7F7F7] overflow-hidden flex items-center justify-center p-4 sm:p-6 border-b border-[#EFEFEF]">
        {/* Floating Top Badges */}
        <div className="absolute top-2.5 left-2.5 sm:top-3.5 sm:left-3.5 z-10 flex items-center gap-1.5 sm:gap-2">
          <span className="bg-[#0B0B0B] text-white text-[9px] sm:text-[10px] font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#FF4D5A]" />
            <span>Featured</span>
          </span>
          <span className="bg-red-50 text-[#E11D2E] text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full border border-red-100">
            100% Cotton
          </span>
        </div>

        {/* Favorite Action Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(product.id);
          }}
          className={`absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/95 backdrop-blur-xs border flex items-center justify-center shadow-xs transition-all active:scale-125 min-w-[32px] sm:min-w-[36px] min-h-[32px] sm:min-h-[36px] ${
            isFav
              ? "text-[#E11D2E] border-red-200 bg-red-50/70"
              : "text-gray-400 border-gray-200 hover:text-[#E11D2E] hover:border-red-200"
          }`}
          aria-label={isFav ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform ${isFav ? "fill-[#E11D2E] scale-110" : ""}`}
          />
        </button>

        {/* Product Visual */}
        <div className="relative w-full h-full transition-transform duration-300 group-hover:scale-[1.04]">
          <Image
            src={getAssetPath(product.image)}
            alt={product.name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Featured Details & Large Actions */}
      <div className="p-4 sm:p-7 flex-1 flex flex-col justify-between bg-white">
        <div>
          <div className="flex items-center justify-between mb-1 sm:mb-1.5">
            <span className="text-[10px] sm:text-xs font-bold text-[#E11D2E] uppercase tracking-wider">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-amber-400 text-xs">
              <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400" />
              <span className="font-bold text-gray-800 text-[11px] sm:text-xs">{product.rating}</span>
              <span className="text-gray-400 text-[10px] sm:text-xs">({product.reviewsCount})</span>
            </div>
          </div>

          <h3 className="font-poppins font-extrabold text-lg sm:text-2xl text-[#111111] leading-tight group-hover:text-[#E11D2E] transition-colors">
            {product.name}
          </h3>

          <p className="text-xs sm:text-sm text-gray-500 mt-1.5 sm:mt-2 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          <div className="mt-3 sm:mt-4 flex items-baseline gap-2 sm:gap-2.5 flex-wrap">
            <span className="font-poppins font-extrabold text-xl sm:text-2xl text-[#0B0B0B]">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs sm:text-sm text-gray-400 line-through">
                ₹{product.originalPrice}
              </span>
            )}
            <span className="text-[10px] sm:text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              Save ₹{(product.originalPrice || 699) - product.price}
            </span>
          </div>
        </div>

        {/* Featured Actions Tray */}
        <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-100 flex items-center gap-2 sm:gap-3">
          <Link
            href={`/custom-printing?product=${product.id}`}
            className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 bg-[#E11D2E] hover:bg-[#C51322] text-white font-poppins font-bold text-xs sm:text-sm py-2.5 sm:py-3 px-3 sm:px-5 rounded-xl shadow-md transition-all active:scale-95 text-center min-h-[40px] sm:min-h-[44px]"
          >
            <span>Start Customizing</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <button
            onClick={handleAddToCart}
            className={`w-10 h-10 sm:w-12 sm:h-11 rounded-xl border flex items-center justify-center transition-all shrink-0 min-w-[40px] sm:min-w-[48px] min-h-[40px] sm:min-h-[44px] ${
              isAdded
                ? "bg-emerald-600 border-emerald-600 text-white"
                : "border-[#E11D2E] text-[#E11D2E] hover:bg-red-50 active:scale-90"
            }`}
            aria-label="Add to cart"
            title="Add to cart"
          >
            {isAdded ? (
              <Check className="w-4 h-4 sm:w-5 sm:h-5" />
            ) : (
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
