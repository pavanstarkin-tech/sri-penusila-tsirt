"use client";

import React, { useState, useMemo, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Flame,
  LayoutGrid,
  TrendingUp,
  Smile,
  Gamepad2,
  Sparkles,
  Quote,
  Gift,
  Heart,
  Users,
  PenTool,
  Search,
  SlidersHorizontal,
  ArrowRight,
  Zap,
  Tag,
  X
} from "lucide-react";
import FilterSidebar from "@/components/FilterSidebar";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { designsCategoryTabs } from "@/data/categories";
import { siteConfig, getWhatsAppLink } from "@/data/siteConfig";

const categoryIcons: Record<string, React.ReactNode> = {
  all: <LayoutGrid className="w-4 h-4" />,
  trending: <Flame className="w-4 h-4" />,
  motivational: <TrendingUp className="w-4 h-4" />,
  funny: <Smile className="w-4 h-4" />,
  anime: <Gamepad2 className="w-4 h-4" />,
  minimal: <Sparkles className="w-4 h-4" />,
  quotes: <Quote className="w-4 h-4" />,
  festival: <Gift className="w-4 h-4" />,
  couple: <Heart className="w-4 h-4" />,
  team: <Users className="w-4 h-4" />,
  custom: <PenTool className="w-4 h-4" />
};

function DesignsContent() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState(999);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [designStyle, setDesignStyle] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("popular");
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const handleToggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleClearFilters = () => {
    setActiveTab("all");
    setMaxPrice(999);
    setSelectedSizes([]);
    setSelectedColor(null);
    setDesignStyle(null);
    setSearchQuery("");
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (activeTab !== "all") {
        if (activeTab === "trending" && !product.isTrending) return false;
        if (activeTab === "custom" && !product.isCustom) return false;
        if (
          activeTab !== "trending" &&
          activeTab !== "custom" &&
          product.categorySlug !== activeTab
        ) {
          return false;
        }
      }

      if (designStyle && product.designStyle !== designStyle) return false;
      if (product.price > maxPrice) return false;

      if (
        selectedSizes.length > 0 &&
        !selectedSizes.some((s) => product.sizes.includes(s))
      ) {
        return false;
      }

      if (selectedColor && !product.colors.includes(selectedColor)) {
        return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(q);
        const matchCategory = product.category.toLowerCase().includes(q);
        if (!matchName && !matchCategory) return false;
      }

      return true;
    });
  }, [activeTab, designStyle, maxPrice, selectedSizes, selectedColor, searchQuery]);

  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === "price-low") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      list.sort((a, b) => b.rating - a.rating);
    } else {
      list.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
    }
    return list;
  }, [filteredProducts, sortBy]);

  const pageSize = 12;
  const totalPages = Math.ceil(sortedProducts.length / pageSize) || 1;
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="space-y-8 sm:space-y-12">
      {/* 1. CREATIVE HERO */}
      <section className="bg-[#0B0B0B] text-white py-10 sm:py-14 px-4 sm:px-8 border-b border-[#202020]">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-3 text-center lg:text-left">
            <div className="section-label text-[#FF4D5A] justify-center lg:justify-start">
              EXPLORE. CHOOSE. GET PRINTED.
            </div>
            <h1 className="font-poppins font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
              TRENDING <br />
              <span className="text-[#E11D2E]">T-SHIRT DESIGNS</span>
            </h1>
            <p className="font-montserrat text-xs sm:text-sm text-gray-300 max-w-lg leading-relaxed mx-auto lg:mx-0">
              From minimal aesthetics to bold typography, Japanese anime, and motivational slogans.
            </p>

            <div className="pt-2 flex items-center justify-center lg:justify-start gap-2 sm:gap-4 text-xs text-gray-300 flex-wrap">
              <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-[#E11D2E]" /> Unique Artwork</span>
              <span>•</span>
              <span className="flex items-center gap-1.5"><Tag className="w-3.5 h-3.5 text-[#E11D2E]" /> Customizable</span>
              <span>•</span>
              <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-[#E11D2E]" /> Premium Cotton</span>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[480px] aspect-[16/10] flex items-center justify-center rounded-2xl overflow-hidden shadow-2xl border border-[#262626] group">
              <Image
                src="/assets/1.png"
                alt="Trending Designs Visual"
                fill
                sizes="480px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. SWIPEABLE HORIZONTAL CATEGORY SELECTOR */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <div className="snap-rail-x gap-2 pb-2">
          {designsCategoryTabs.map((tab) => {
            const isSelected = activeTab === tab.slug;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.slug);
                  setCurrentPage(1);
                }}
                className={`snap-card flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                  isSelected
                    ? "bg-[#E11D2E] text-white border-[#E11D2E] shadow-sm scale-105"
                    : "bg-white text-gray-700 border-[#E7E7E7] hover:border-gray-400 hover:bg-gray-50"
                }`}
              >
                <span>{categoryIcons[tab.slug] || <Tag className="w-3.5 h-3.5" />}</span>
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. WORKSPACE: STICKY TOOLBAR & GRID */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        {/* Sticky Mobile Filter & Sort Bar */}
        <div className="md:hidden sticky top-[68px] z-30 bg-white/95 backdrop-blur-md py-2.5 border-y border-gray-200 mb-6 flex items-center justify-between gap-3">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="flex-1 flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-xl text-xs font-bold text-gray-800 bg-white shadow-2xs"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#E11D2E]" />
            <span>Style & Filter {designStyle ? "•" : ""}</span>
          </button>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="flex-1 border border-gray-300 py-2 px-3 rounded-xl text-xs font-semibold bg-white text-gray-800 focus:outline-none"
            aria-label="Sort designs"
          >
            <option value="popular">Popular First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>

        {/* Desktop Search & Sort */}
        <div className="hidden md:flex items-center justify-between gap-4 bg-white rounded-2xl border border-[#E7E7E7] p-4 mb-8 shadow-xs">
          <div className="flex-1 flex gap-2 max-w-md">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search designs (e.g. Good Vibes, Crown, Panda)..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2 text-xs focus:outline-none focus:border-[#E11D2E]"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span className="font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold text-gray-800 focus:outline-none"
              aria-label="Sort options"
            >
              <option value="popular">Popular First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Grid Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="hidden lg:block lg:col-span-3 sticky top-24">
            <FilterSidebar
              selectedCategory={activeTab}
              onSelectCategory={(cat) => {
                setActiveTab(cat);
                setCurrentPage(1);
              }}
              maxPrice={maxPrice}
              onChangeMaxPrice={setMaxPrice}
              selectedSizes={selectedSizes}
              onToggleSize={handleToggleSize}
              selectedColor={selectedColor}
              onSelectColor={setSelectedColor}
              onClearFilters={handleClearFilters}
              designStyle={designStyle}
              onSelectDesignStyle={setDesignStyle}
              showDesignStyles={true}
            />
          </div>

          <div className="lg:col-span-9 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-poppins font-extrabold text-xl text-[#0B0B0B]">
                  Design Gallery
                </h2>
                <p className="text-xs text-gray-500">
                  Showing 1–{paginatedProducts.length} of {sortedProducts.length} creative prints
                </p>
              </div>
              {(designStyle || selectedColor || activeTab !== "all") && (
                <button
                  onClick={handleClearFilters}
                  className="text-xs font-bold text-[#E11D2E] hover:underline"
                >
                  Clear Filters
                </button>
              )}
            </div>

            {sortedProducts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
                <h3 className="font-poppins font-bold text-lg text-gray-800 mb-1">
                  No designs match your filters
                </h3>
                <p className="text-xs text-gray-500 mb-4 max-w-xs mx-auto">
                  Try clearing some filters or searching for different keywords.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="bg-[#E11D2E] text-white text-xs font-semibold px-5 py-2.5 rounded-xl hover:bg-[#C51322]"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-6">
                {[...Array(totalPages)].map((_, i) => {
                  const pNum = i + 1;
                  const isCurrent = currentPage === pNum;
                  return (
                    <button
                      key={pNum}
                      onClick={() => setCurrentPage(pNum)}
                      className={`w-9 h-9 rounded-full text-xs font-bold transition-all ${
                        isCurrent
                          ? "bg-[#E11D2E] text-white shadow-xs scale-105"
                          : "bg-white border border-gray-200 text-gray-700 hover:border-gray-400"
                      }`}
                    >
                      {pNum}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4. WE'LL DESIGN IT FOR YOU BANNER */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-8 pb-10">
        <div className="card-feature bg-[#0B0B0B] text-white p-6 sm:p-10 border border-[#202020] flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-2 text-center md:text-left z-10">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Don&apos;t see what you want?
            </div>
            <h3 className="font-poppins font-extrabold text-2xl sm:text-3xl text-white">
              We&apos;ll Design It For You!
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 max-w-md">
              Share your idea, reference photo, or sketch and our creative team will design it for free.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-3 shrink-0 z-10">
            <Link
              href={getWhatsAppLink(siteConfig.phones[0], "Hi Sri Penusila, I want your team to create a custom T-shirt design.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white hover:bg-gray-100 text-[#0B0B0B] font-poppins font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 active:scale-95"
            >
              <span>Request Custom Design</span>
              <ArrowRight className="w-4 h-4 text-[#E11D2E]" />
            </Link>

            <div className="flex items-center gap-3 text-xs text-gray-400 pt-1">
              <span>Fast Turnaround</span>
              <span>•</span>
              <span>Free Design Proofs</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Filter Bottom Sheet */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative bg-white rounded-t-3xl p-5 border-t border-gray-200 shadow-2xl z-10 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-250">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <h3 className="font-poppins font-bold text-base text-[#0B0B0B]">
                Filter Designs
              </h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 text-gray-500 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <FilterSidebar
              selectedCategory={activeTab}
              onSelectCategory={(cat) => {
                setActiveTab(cat);
                setMobileFilterOpen(false);
              }}
              maxPrice={maxPrice}
              onChangeMaxPrice={setMaxPrice}
              selectedSizes={selectedSizes}
              onToggleSize={handleToggleSize}
              selectedColor={selectedColor}
              onSelectColor={setSelectedColor}
              onClearFilters={() => {
                handleClearFilters();
                setMobileFilterOpen(false);
              }}
              designStyle={designStyle}
              onSelectDesignStyle={setDesignStyle}
              showDesignStyles={true}
            />

            <div className="pt-4 border-t border-gray-100 mt-4">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full bg-[#0B0B0B] text-white font-bold text-xs py-3 rounded-xl"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function DesignsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm text-gray-500">Loading Designs...</div>}>
      <DesignsContent />
    </Suspense>
  );
}
