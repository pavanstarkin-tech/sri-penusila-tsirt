export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  tag?: string;
}

export const lookbookItems: GalleryItem[] = [
  {
    id: "lookbook-1",
    title: "College Legends 2026 Batch",
    category: "College Batch",
    image: "/tshirts/1.png",
    tag: "Batch 2026"
  },
  {
    id: "lookbook-2",
    title: "Business & Corporate Pro Tee",
    category: "Corporate Uniforms",
    image: "/tshirts/2.png",
    tag: "Pro Fit"
  },
  {
    id: "lookbook-3",
    title: "Birthday Squad Celebration",
    category: "Birthday Specials",
    image: "/tshirts/3.png",
    tag: "Festive"
  },
  {
    id: "lookbook-4",
    title: "Soulmates & Couples Tee",
    category: "Couple T-Shirts",
    image: "/tshirts/4.png",
    tag: "Matching Pair"
  },
  {
    id: "lookbook-5",
    title: "Urban Streetwear Heavyweight",
    category: "Drop Shoulder",
    image: "/tshirts/5.png",
    tag: "240 GSM"
  },
  {
    id: "lookbook-6",
    title: "Champions Team & Sports Tee",
    category: "Sports & Squads",
    image: "/tshirts/6.png",
    tag: "Athletic"
  },
  {
    id: "lookbook-7",
    title: "Festival & Cultural Special Tee",
    category: "Festival Vibes",
    image: "/tshirts/7.png",
    tag: "Special"
  },
  {
    id: "lookbook-8",
    title: "Full-Sleeve Winter Edition",
    category: "Winter Comfort",
    image: "/tshirts/8.png",
    tag: "Full Sleeve"
  }
];
