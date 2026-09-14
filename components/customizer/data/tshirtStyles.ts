import { TshirtStyleConfig, GarmentColor } from "../types";

export const standardColors: GarmentColor[] = [
  { id: "white", name: "Classic White", hex: "#FFFFFF", textColor: "black" },
  { id: "black", name: "Jet Black", hex: "#181818", textColor: "white" },
  { id: "red", name: "Atelier Red", hex: "#C51322", textColor: "white" },
  { id: "navy", name: "Navy Blue", hex: "#1B2A4A", textColor: "white" },
  { id: "gray", name: "Heather Gray", hex: "#7E828A", textColor: "white" },
  { id: "green", name: "Forest Green", hex: "#1E4330", textColor: "white" }
];

export const kurtaColors: GarmentColor[] = [
  { id: "white", name: "Pure White", hex: "#FFFFFF", textColor: "black" },
  { id: "black", name: "Jet Black", hex: "#181818", textColor: "white" },
  { id: "saffron", name: "Saffron / Kesari", hex: "#FF7722", textColor: "white" },
  { id: "yellow", name: "Haldi Yellow", hex: "#F59E0B", textColor: "black" },
  { id: "navy", name: "Navy Blue", hex: "#1B2A4A", textColor: "white" },
  { id: "red", name: "Festive Red", hex: "#C51322", textColor: "white" }
];

export const kanduvaColors: GarmentColor[] = [
  { id: "white", name: "Zari White", hex: "#FFFFFF", textColor: "black" },
  { id: "yellow", name: "Golden Yellow", hex: "#F59E0B", textColor: "black" },
  { id: "saffron", name: "Sacred Saffron", hex: "#FF7722", textColor: "white" },
  { id: "red", name: "Auspicious Red", hex: "#C51322", textColor: "white" },
  { id: "navy", name: "Royal Navy", hex: "#1B2A4A", textColor: "white" },
  { id: "green", name: "Vibrant Green", hex: "#1E4330", textColor: "white" }
];

export const flagColors: GarmentColor[] = [
  { id: "white", name: "Pure White", hex: "#FFFFFF", textColor: "black" },
  { id: "saffron", name: "Bright Saffron", hex: "#FF7722", textColor: "white" },
  { id: "red", name: "Party / Fest Red", hex: "#C51322", textColor: "white" },
  { id: "yellow", name: "Vibrant Yellow", hex: "#F59E0B", textColor: "black" },
  { id: "navy", name: "Royal Blue", hex: "#1B2A4A", textColor: "white" },
  { id: "green", name: "Emerald Green", hex: "#1E4330", textColor: "white" },
  { id: "black", name: "Bold Black", hex: "#181818", textColor: "white" }
];

export const tshirtStyles: Record<string, TshirtStyleConfig> = {
  tshirt: {
    id: "tshirt",
    category: "tshirt",
    name: "Half-Hands T-Shirt",
    tagline: "Classic Regular Fit // 100% Combed Cotton",
    basePrice: 249,
    description: "Everyday staple half-sleeve t-shirt with ribbed collar, tailored sleeves, and breathable 180 GSM cotton.",
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

  kurta: {
    id: "kurta",
    category: "kurta",
    name: "Kurtas",
    tagline: "Traditional Cotton Kurta // Festive, Political & Occasion",
    basePrice: 299,
    description: "Elegant full-length cotton kurta with mandarin collar, 3-button placket, side slits, and high-definition chest/back custom printing.",
    availableSizes: ["S", "M", "L", "XL", "XXL", "3XL"],
    colors: kurtaColors,
    defaultColorId: "white",
    frontPrintArea: {
      x: 32,
      y: 28,
      width: 36,
      height: 48
    },
    backPrintArea: {
      x: 30,
      y: 24,
      width: 40,
      height: 52
    }
  },

  kanduva: {
    id: "kanduva",
    category: "kanduva",
    name: "Kanduvas",
    tagline: "Ceremonial Honour Kanduva // Golden Zari Border",
    basePrice: 199,
    description: "Traditional ceremonial stole for political campaigns, cultural felicitations, temple visits, and family celebrations with custom names & emblems.",
    availableSizes: ["Standard (2.25m)", "Large (2.5m)"],
    colors: kanduvaColors,
    defaultColorId: "white",
    frontPrintArea: {
      x: 28,
      y: 20,
      width: 44,
      height: 60
    },
    backPrintArea: {
      x: 28,
      y: 20,
      width: 44,
      height: 60
    }
  },

  flag: {
    id: "flag",
    category: "flag",
    name: "Flags",
    tagline: "Custom Campaign & Festival Flags // Double Stitched Hem",
    basePrice: 399,
    description: "Premium weather-resistant fabric flag with pole sleeve, brass eyelets, and vibrant full-bleed photo & logo printing.",
    availableSizes: ["Medium (2x3 ft)", "Standard (3x5 ft)", "Large (4x6 ft)"],
    colors: flagColors,
    defaultColorId: "white",
    frontPrintArea: {
      x: 20,
      y: 20,
      width: 60,
      height: 60
    },
    backPrintArea: {
      x: 20,
      y: 20,
      width: 60,
      height: 60
    }
  }
};

export const tshirtStylesList: TshirtStyleConfig[] = Object.values(tshirtStyles);
