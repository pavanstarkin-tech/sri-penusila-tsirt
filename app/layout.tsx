import type { Metadata } from "next";
import { Poppins, Montserrat, Caveat } from "next/font/google";
import "./globals.css";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import MobileBottomBar from "@/components/MobileBottomBar";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { siteConfig } from "@/data/siteConfig";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap"
});

const montserrat = Montserrat({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap"
});

const caveat = Caveat({
  weight: ["600", "700"],
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap"
});

export const metadata: Metadata = {
  title: {
    default: "Sri Penusila T-Shirt Printing Centre | Custom T-Shirts in Rapur",
    template: "%s | Sri Penusila T-Shirt Printing Centre"
  },
  description:
    "Customized T-Shirts for Birthdays, College Events, Functions, Teams, Businesses and all special occasions. Penubarthi, Rapur (Mandal), Nellore District, Andhra Pradesh.",
  keywords: [
    "Sri Penusila",
    "T-shirt printing",
    "Rapur",
    "Nellore",
    "Penubarthi",
    "Customized T-shirts",
    "College T-shirts",
    "Birthday T-shirts",
    "Andhra Pradesh"
  ],
  authors: [{ name: "Sri Penusila T-Shirts Printing Centre" }],
  icons: {
    icon: "/logo/logo-emblem.png",
    apple: "/logo/logo-emblem.png"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${montserrat.variable} ${caveat.variable}`}
    >
      <body className="min-h-screen flex flex-col font-montserrat antialiased text-[#0B0B0B] bg-[#050505] overflow-x-hidden">
        <CartProvider>
          <WishlistProvider>
            {/* 3D Transformable App Content Shell */}
            <div id="app-root-shell" className="min-h-screen flex flex-col w-full bg-white relative">
              {/* Level 1: Dark TopBar */}
              <TopBar />

              {/* Level 2: Main White Header */}
              <Header />

              {/* Main Content */}
              <main className="flex-1">{children}</main>

              {/* Global Slide-Over Cart Drawer */}
              <CartDrawer />

              {/* Global Dark 5-Column Footer */}
              <Footer />

              {/* Floating Mobile Context-Aware Bottom Bar */}
              <MobileBottomBar />
            </div>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
