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
    <div className="card-feature bg-white border border-[#E7E7E7] overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-300 group h-full">
      {/* Large Featured Image Stage */}
      <div className="relative aspect-[4/3.5] sm:aspect-square w-full bg-[#F7F7F7] overflow-hidden flex items-center justify-center p-6 border-b border-[#EFEFEF]">
        {/* Floating Top Badges */}
        <div className="absolute top-3.5 left-3.5 z-10 flex items-center gap-2">
          <span className="bg-[#0B0B0B] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#FF4D5A]" />
            <span>Featured</span>
          </span>
          <span className="bg-red-50 text-[#E11D2E] text-[10px] font-bold px-2 py-0.5 rounded-full border border-red-100">
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
          className={`absolute top-3.5 right-3.5 z-10 w-9 h-9 rounded-full bg-white/95 backdrop-blur-xs border flex items-center justify-center shadow-xs transition-all active:scale-125 min-w-[36px] min-h-[36px] ${
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
      <div className="p-5 sm:p-7 flex-1 flex flex-col justify-between bg-white">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-[#E11D2E] uppercase tracking-wider">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-amber-400 text-xs">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span className="font-bold text-gray-800">{product.rating}</span>
              <span className="text-gray-400">({product.reviewsCount})</span>
            </div>
          </div>

          <h3 className="font-poppins font-extrabold text-xl sm:text-2xl text-[#111111] leading-tight group-hover:text-[#E11D2E] transition-colors">
            {product.name}
          </h3>

          <p className="text-xs sm:text-sm text-gray-500 mt-2 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          <div className="mt-4 flex items-baseline gap-2.5">
            <span className="font-poppins font-extrabold text-2xl text-[#0B0B0B]">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                ₹{product.originalPrice}
              </span>
            )}
            <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              Save ₹{(product.originalPrice || 699) - product.price}
            </span>
          </div>
        </div>

        {/* Featured Actions Tray */}
        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-3">
          <Link
            href={`/custom-printing?product=${product.id}`}
            className="flex-1 flex items-center justify-center gap-2 bg-[#E11D2E] hover:bg-[#C51322] text-white font-poppins font-bold text-sm py-3 px-5 rounded-xl shadow-md transition-all active:scale-95"
          >
            <span>Start Customizing</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <button
            onClick={handleAddToCart}
            className={`w-12 h-11 rounded-xl border flex items-center justify-center transition-all shrink-0 ${
              isAdded
                ? "bg-emerald-600 border-emerald-600 text-white"
                : "border-[#E11D2E] text-[#E11D2E] hover:bg-red-50 active:scale-90"
            }`}
            aria-label="Add to cart"
            title="Add to cart"
          >
            {isAdded ? (
              <Check className="w-5 h-5" />
            ) : (
              <ShoppingCart className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
