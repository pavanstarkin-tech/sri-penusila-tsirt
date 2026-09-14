"use client";

import React, { useState, useMemo, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Search,
  SlidersHorizontal,
  ChevronRight,
  Truck,
  ShieldCheck,
  Headphones,
  ArrowRight,
  X,
  Sparkles
} from "lucide-react";
import FilterSidebar from "@/components/FilterSidebar";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { storeSidebarCategories } from "@/data/categories";
import { getAssetPath } from "@/data/siteConfig";

function StoreContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || "";

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [maxPrice, setMaxPrice] = useState(999);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("popular");
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const handleToggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleClearFilters = () => {
    setSelectedCategory("all");
    setMaxPrice(999);
    setSelectedSizes([]);
    setSelectedColor(null);
    setSearchQuery("");
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (selectedCategory !== "all") {
        if (selectedCategory === "new-collection") {
          if (!product.image.includes("/newcollection/") && !product.id.startsWith("new-")) return false;
        } else if (selectedCategory === "trending") {
          if (!product.isTrending) return false;
        } else if (selectedCategory === "custom") {
          if (!product.isCustom) return false;
        } else if (product.categorySlug !== selectedCategory) {
          return false;
        }
      }

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
        const matchDesc = product.description.toLowerCase().includes(q);
        if (!matchName && !matchCategory && !matchDesc) return false;
      }

      return true;
    });
  }, [selectedCategory, maxPrice, selectedSizes, selectedColor, searchQuery]);

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
      {/* 1. CINEMATIC STORE HERO BANNER */}
      <section className="bg-[#0B0B0B] text-white py-10 sm:py-14 px-4 sm:px-8 border-b border-[#202020]">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="section-label text-[#FF4D5A] justify-center md:justify-start">
              FASHION CATALOGUE
            </div>
            <h1 className="font-poppins font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white">
              Our <span className="text-[#E11D2E]">Store</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 max-w-lg">
              Explore our latest T-shirt designs or customize your own. High quality prints on 100% cotton.
            </p>
          </div>

          <div className="relative w-full max-w-[440px] aspect-[16/9] rounded-2xl overflow-hidden border border-[#262626] bg-white shadow-xl group">
            <Image
              src={getAssetPath("/assets/3.png")}
              alt="Sri Penusila Store Collection"
              fill
              sizes="440px"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              priority
            />
          </div>
        </div>
      </section>

      {/* 2. MAIN STORE WORKSPACE */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-5">
          <Link href="/" className="hover:text-black">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="text-gray-900 font-semibold">Store</span>
        </div>

        {/* Sticky Mobile Filter & Sort Toolbar */}
        <div className="md:hidden sticky top-[68px] z-30 bg-white/95 backdrop-blur-md py-2.5 border-y border-gray-200 mb-6 flex items-center justify-between gap-3">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="flex-1 flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-xl text-xs font-bold text-gray-800 bg-white shadow-2xs"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#E11D2E]" />
            <span>Filters {selectedSizes.length > 0 || selectedColor ? "•" : ""}</span>
          </button>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="flex-1 border border-gray-300 py-2 px-3 rounded-xl text-xs font-semibold bg-white text-gray-800 focus:outline-none"
            aria-label="Sort by"
          >
            <option value="popular">Popular</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>

        {/* Desktop Search & Sort Toolbar */}
        <div className="hidden md:flex items-center justify-between gap-4 bg-white rounded-2xl border border-[#E7E7E7] p-4 mb-8 shadow-xs">
          <div className="flex-1 flex gap-2 max-w-lg">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search designs (e.g. Good Vibes, Crown, Birthday)..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#E11D2E]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <button className="bg-[#E11D2E] hover:bg-[#C51322] text-white font-poppins font-semibold text-xs px-5 py-2 rounded-xl transition-colors">
              Search
            </button>
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

        {/* Workspace: Sidebar + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-3 sticky top-24">
            <FilterSidebar
              selectedCategory={selectedCategory}
              onSelectCategory={(cat) => {
                setSelectedCategory(cat);
                setCurrentPage(1);
              }}
              maxPrice={maxPrice}
              onChangeMaxPrice={setMaxPrice}
              selectedSizes={selectedSizes}
              onToggleSize={handleToggleSize}
              selectedColor={selectedColor}
              onSelectColor={setSelectedColor}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Right Product Grid */}
          <div className="lg:col-span-9 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-poppins font-extrabold text-xl text-[#0B0B0B]">
                  All T-Shirts
                </h2>
                <p className="text-xs text-gray-500">
                  Showing 1–{paginatedProducts.length} of {sortedProducts.length} designs
                </p>
              </div>

              {(selectedSizes.length > 0 || selectedColor || selectedCategory !== "all") && (
                <button
                  onClick={handleClearFilters}
                  className="text-xs font-bold text-[#E11D2E] hover:underline"
                >
                  Reset Filters
                </button>
              )}
            </div>

            {sortedProducts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
                <h3 className="font-poppins font-bold text-lg text-gray-800 mb-1">
                  No products match your filters
                </h3>
                <p className="text-xs text-gray-500 mb-4 max-w-xs mx-auto">
                  Try adjusting the price range, size, or reset filters to browse the entire collection.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="bg-[#E11D2E] text-white text-xs font-semibold px-5 py-2.5 rounded-xl hover:bg-[#C51322]"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              /* Responsive Product Grid: 4 cols desktop, 3 cols tablet, 2 cols mobile */
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* Pagination Controls */}
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

      {/* 3. BOTTOM FASHION CTA */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <div className="card-feature bg-[#0B0B0B] text-white p-6 sm:p-10 border border-[#202020] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="text-[10px] font-bold text-[#FF4D5A] uppercase tracking-wider">
              Have a unique concept?
            </div>
            <h3 className="font-poppins font-extrabold text-xl sm:text-2xl text-white">
              Still can&apos;t find what you&apos;re looking for?
            </h3>
            <p className="text-xs text-gray-300">
              No problem! Print your own custom design with zero minimum order quantity.
            </p>
          </div>

          <Link
            href="/custom-printing"
            className="flex items-center gap-2 bg-[#E11D2E] hover:bg-[#C51322] text-white font-poppins font-semibold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg transition-all active:scale-95 shrink-0"
          >
            <span>Start Customizing</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Trust features — 3 in a single row on all screen sizes */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-6 text-center">
          <div className="card-ui bg-gray-50 p-2.5 sm:p-4 border border-gray-200 flex flex-col items-center justify-center gap-1 sm:gap-1.5 rounded-2xl shadow-xs">
            <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-[#E11D2E]" />
            <h4 className="font-poppins font-bold text-[10px] sm:text-xs text-[#0B0B0B] leading-tight">
              Fast Turnaround
            </h4>
            <p className="text-[9px] sm:text-[11px] text-gray-500 leading-tight">
              24–48h Dispatch
            </p>
          </div>

          <div className="card-ui bg-gray-50 p-2.5 sm:p-4 border border-gray-200 flex flex-col items-center justify-center gap-1 sm:gap-1.5 rounded-2xl shadow-xs">
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#E11D2E]" />
            <h4 className="font-poppins font-bold text-[10px] sm:text-xs text-[#0B0B0B] leading-tight">
              100% Bio-Washed
            </h4>
            <p className="text-[9px] sm:text-[11px] text-gray-500 leading-tight">
              Ultra-Soft Fabric
            </p>
          </div>

          <div className="card-ui bg-gray-50 p-2.5 sm:p-4 border border-gray-200 flex flex-col items-center justify-center gap-1 sm:gap-1.5 rounded-2xl shadow-xs">
            <Headphones className="w-4 h-4 sm:w-5 sm:h-5 text-[#E11D2E]" />
            <h4 className="font-poppins font-bold text-[10px] sm:text-xs text-[#0B0B0B] leading-tight">
              Direct Support
            </h4>
            <p className="text-[9px] sm:text-[11px] text-gray-500 leading-tight">
              WhatsApp Updates
            </p>
          </div>
        </div>
      </section>

      {/* MOBILE FILTER BOTTOM SHEET */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative bg-white rounded-t-3xl p-5 border-t border-gray-200 shadow-2xl z-10 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-250">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <h3 className="font-poppins font-bold text-base text-[#0B0B0B]">
                Filter Catalogue
              </h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 text-gray-500 hover:text-black"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <FilterSidebar
              selectedCategory={selectedCategory}
              onSelectCategory={(cat) => {
                setSelectedCategory(cat);
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

export default function StorePage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm text-gray-500">Loading Store...</div>}>
      <StoreContent />
    </Suspense>
  );
}
