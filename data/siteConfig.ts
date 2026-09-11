export interface SiteConfig {
  name: string;
  shortName: string;
  tagline: string;
  secondaryTaglines: string[];
  description: string;
  address: {
    full: string;
    short: string;
    village: string;
    mandal: string;
    district: string;
    state: string;
    country: string;
    landmark: string;
    mapUrl: string;
  };
  phones: string[];
  whatsappNumbers: string[];
  email: string;
  openingHours: {
    weekdays: string;
    sunday: string;
  };
  stats: {
    happyCustomers: string;
    tshirtsPrinted: string;
    satisfactionRate: string;
    locations: string;
    locationNote: string;
    moreStories: string;
  };
  socialLinks: {
    instagram: string;
    facebook: string;
    youtube: string;
    whatsapp: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "SRI PENUSILA T-SHIRT PRINTING CENTRE",
  shortName: "Sri Penusila",
  tagline: "Wear Your Story",
  secondaryTaglines: [
    "Your Idea. Our Print.",
    "Custom T-Shirts for Every Idea, Every Moment!",
    "More Than Just T-Shirts. It's a Story.",
    "Your Design. Your T-Shirt."
  ],
  description: "Customized T-Shirts for Birthdays, College Events, Functions, Teams, Businesses and all your special moments. Quality printing delivered from Penubarthi, Rapur.",
  address: {
    full: "Penubarthi, Rapur (Mandal), Nellore District, Andhra Pradesh, India",
    short: "Penubarthi, Rapur (Mandal), Nellore District, A.P.",
    village: "Penubarthi",
    mandal: "Rapur (Mandal)",
    district: "Nellore District",
    state: "Andhra Pradesh",
    country: "India",
    landmark: "Near Main Area, Penubarthi",
    mapUrl: "https://maps.google.com/?q=Penubarthi,Rapur,Nellore,Andhra+Pradesh"
  },
  phones: ["8985065578", "9550151533"],
  whatsappNumbers: ["8985065578", "9550151533"],
  email: "mokshugunduluru@gmail.com",
  openingHours: {
    weekdays: "Mon - Sat: 9:00 AM - 9:00 PM",
    sunday: "Sunday: By Appointment"
  },
  stats: {
    happyCustomers: "500+",
    tshirtsPrinted: "1000+",
    satisfactionRate: "100%",
    locations: "1",
    locationNote: "Penubarthi, Rapur",
    moreStories: "Many More"
  },
  socialLinks: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    youtube: "https://youtube.com",
    whatsapp: "https://wa.me/918985065578"
  }
};

export function getWhatsAppLink(phone = "8985065578", message = "Hi Sri Penusila, I am interested in custom T-shirt printing.") {
  const cleanPhone = phone.replace(/[^0-9]/g, "");
  const countryCode = cleanPhone.startsWith("91") ? cleanPhone : `91${cleanPhone}`;
  return `https://wa.me/${countryCode}?text=${encodeURIComponent(message)}`;
}

export function getTelLink(phone = "8985065578") {
  return `tel:+91${phone.replace(/[^0-9]/g, "")}`;
}

export function getAssetPath(url: string) {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("data:") || url.startsWith("blob:")) return url;
  let basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  if (!basePath && typeof window !== "undefined" && window.location.pathname.startsWith("/sri-penusila-tsirt")) {
    basePath = "/sri-penusila-tsirt";
  }
  const cleanUrl = url.startsWith("/") ? url : `/${url}`;
  if (basePath && cleanUrl.startsWith(basePath)) return cleanUrl;
  return `${basePath}${cleanUrl}`;
}
