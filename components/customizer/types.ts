export type TshirtStyleId =
  | "tshirt"
  | "kurta"
  | "kanduva"
  | "flag";

export type GarmentCategory = "tshirt" | "kurta" | "kanduva" | "flag";

export type GarmentSide = "front" | "back";

export interface PrintAreaConfig {
  x: number; // percentage from left, e.g. 28
  y: number; // percentage from top, e.g. 24
  width: number; // percentage of shirt width, e.g. 44
  height: number; // percentage of shirt height, e.g. 44
}

export interface GarmentColor {
  id: string;
  name: string;
  hex: string;
  textColor: string;
}

export interface TshirtStyleConfig {
  id: TshirtStyleId;
  category: GarmentCategory;
  name: string;
  tagline: string;
  basePrice: number;
  description: string;
  availableSizes: string[];
  colors: GarmentColor[];
  frontPrintArea: PrintAreaConfig;
  backPrintArea: PrintAreaConfig;
  defaultColorId: string;
}

export type LayerType = "image" | "text" | "element";

export interface BaseLayer {
  id: string;
  type: LayerType;
  side: GarmentSide;
  x: number; // percentage within print area (0-100)
  y: number; // percentage within print area (0-100)
  width: number; // percentage within print area (10-100)
  height: number; // percentage within print area (10-100)
  rotation: number; // degrees (-180 to 180)
  scale: number; // multiplier (0.3 to 3)
  opacity: number; // 0 to 1
  zIndex: number;
}

export interface ImageLayer extends BaseLayer {
  type: "image";
  src: string; // object URL or data URL
  fileName?: string;
  originalWidth: number;
  originalHeight: number;
  aspectRatio: number;
}

export interface TextLayer extends BaseLayer {
  type: "text";
  text: string;
  fontFamily: "Poppins" | "Montserrat" | "Caveat" | "Inter";
  fontSize: number; // base px
  color: string;
  isBold: boolean;
  isItalic: boolean;
  alignment: "left" | "center" | "right";
}

export interface ElementLayer extends BaseLayer {
  type: "element";
  elementId: string;
  title: string;
  svgPath?: string;
  src?: string;
  color?: string;
}

export type DesignLayer = ImageLayer | TextLayer | ElementLayer;

export interface SideCustomization {
  layers: DesignLayer[];
}

export interface CustomizerState {
  styleId: TshirtStyleId;
  colorId: string;
  size: string;
  quantity: number;
  activeSide: GarmentSide;
  front: SideCustomization;
  back: SideCustomization;
  selectedLayerId: string | null;
  isPreviewMode: boolean;
  isQuotationOpen: boolean;
  customerName?: string;
  customerPhone?: string;
  notes?: string;
}
