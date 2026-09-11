import { TshirtStyleConfig, GarmentColor } from "../types";

export const standardColors: GarmentColor[] = [
  { id: "white", name: "Classic White", hex: "#FFFFFF", textColor: "black" },
  { id: "black", name: "Jet Black", hex: "#181818", textColor: "white" },
  { id: "red", name: "Atelier Red", hex: "#C51322", textColor: "white" },
  { id: "navy", name: "Navy Blue", hex: "#1B2A4A", textColor: "white" },
  { id: "gray", name: "Heather Gray", hex: "#7E828A", textColor: "white" },
  { id: "green", name: "Forest Green", hex: "#1E4330", textColor: "white" }
];

export const mugColors: GarmentColor[] = [
  { id: "white", name: "Glossy White", hex: "#FFFFFF", textColor: "black" },
  { id: "black", name: "Midnight Black", hex: "#181818", textColor: "white" },
  { id: "red", name: "Ruby Red", hex: "#C51322", textColor: "white" },
  { id: "navy", name: "Cobalt Blue", hex: "#1B2A4A", textColor: "white" },
  { id: "green", name: "Emerald Green", hex: "#1E4330", textColor: "white" }
];

export const tshirtStyles: Record<string, TshirtStyleConfig> = {
  normal: {
    id: "normal",
    category: "tshirt",
    name: "Normal Plain T-Shirt",
    tagline: "Classic Regular Fit // 100% Combed Cotton",
    basePrice: 299,
    description: "Everyday staple t-shirt with ribbed collar, tailored sleeves, and breathable 180 GSM cotton.",
    availableSizes: ["S", "M", "L", "XL", "XXL", "3XL"],
    colors: standardColors,
    defaultColorId: "white",
    frontPrintArea: {
      x: 30,
      y: 24,
      width: 40,
      height: 44
    },
    backPrintArea: {
      x: 30,
      y: 22,
      width: 40,
      height: 46
    }
  },

  oversized: {
    id: "oversized",
    category: "tshirt",
    name: "Oversized Plain T-Shirt",
    tagline: "Relaxed Streetwear Boxy // 240 GSM Heavyweight",
    basePrice: 399,
    description: "Modern street-style boxy silhouette with dropped armholes, wide torso, and substantial drape.",
    availableSizes: ["S", "M", "L", "XL", "XXL", "3XL"],
    colors: standardColors,
    defaultColorId: "black",
    frontPrintArea: {
      x: 27,
      y: 22,
      width: 46,
      height: 48
    },
    backPrintArea: {
      x: 27,
      y: 20,
      width: 46,
      height: 50
    }
  },

  "drop-shoulder": {
    id: "drop-shoulder",
    category: "tshirt",
    name: "Down-Shoulder T-Shirt",
    tagline: "Low-Seam Drop Silhouette // Relaxed Urban Cut",
    basePrice: 379,
    description: "Tailored with sleeves originating lower on the bicep for an effortless casual, trendy streetwear hang.",
    availableSizes: ["S", "M", "L", "XL", "XXL", "3XL"],
    colors: standardColors,
    defaultColorId: "white",
    frontPrintArea: {
      x: 28,
      y: 22,
      width: 44,
      height: 48
    },
    backPrintArea: {
      x: 28,
      y: 20,
      width: 44,
      height: 50
    }
  },

  "crop-top": {
    id: "crop-top",
    category: "tshirt",
    name: "Half-End / Crop T-Shirt",
    tagline: "Shortened Waist Hem // Modern Retro Summer Fit",
    basePrice: 279,
    description: "Shortened waistline cropped t-shirt cut above the hip, ideal for dance groups, college fests, and casual lifestyle wear.",
    availableSizes: ["XS", "S", "M", "L", "XL"],
    colors: standardColors,
    defaultColorId: "white",
    frontPrintArea: {
      x: 28,
      y: 24,
      width: 44,
      height: 38
    },
    backPrintArea: {
      x: 28,
      y: 22,
      width: 44,
      height: 40
    }
  },

  "full-sleeve": {
    id: "full-sleeve",
    category: "tshirt",
    name: "Full-Length / Sleeve T-Shirt",
    tagline: "Full-Sleeve Winter Comfort // Tapered Ribbed Cuffs",
    basePrice: 349,
    description: "Extended long-sleeve tee with flexible wrist cuffs and double-needle hem for year-round styling.",
    availableSizes: ["S", "M", "L", "XL", "XXL", "3XL"],
    colors: standardColors,
    defaultColorId: "white",
    frontPrintArea: {
      x: 30,
      y: 24,
      width: 40,
      height: 44
    },
    backPrintArea: {
      x: 30,
      y: 22,
      width: 40,
      height: 46
    }
  },

  hoodie: {
    id: "hoodie",
    category: "hoodie",
    name: "Classic Fleece Hoodie",
    tagline: "Warm Brushed Fleece // Kangaroo Pocket & Drawstrings",
    basePrice: 699,
    description: "Cozy 320 GSM fleece hoodie with double-lined hood, metallic aglet drawstrings, and front pouch.",
    availableSizes: ["S", "M", "L", "XL", "XXL", "3XL"],
    colors: standardColors,
    defaultColorId: "black",
    frontPrintArea: {
      x: 28,
      y: 26,
      width: 44,
      height: 34
    },
    backPrintArea: {
      x: 28,
      y: 28,
      width: 44,
      height: 46
    }
  },

  mug: {
    id: "mug",
    category: "mug",
    name: "Custom Ceramic Mug",
    tagline: "Glossy Ceramic // 360° Photo & Logo Wrap",
    basePrice: 199,
    description: "Premium microwave & dishwasher safe glossy ceramic coffee mug with ergonomic C-handle and dual-side printable surfaces.",
    availableSizes: ["11 oz (Standard)", "15 oz (Jumbo)"],
    colors: mugColors,
    defaultColorId: "white",
    frontPrintArea: {
      x: 24,
      y: 26,
      width: 42,
      height: 48
    },
    backPrintArea: {
      x: 34,
      y: 26,
      width: 42,
      height: 48
    }
  }
};

export const tshirtStylesList: TshirtStyleConfig[] = Object.values(tshirtStyles);
