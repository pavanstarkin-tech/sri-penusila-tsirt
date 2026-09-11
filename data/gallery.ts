export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
}

export const lookbookItems: GalleryItem[] = [
  {
    id: "lookbook-1",
    title: "Discipline Creates Freedom",
    category: "Motivational",
    image: "/gallery/lookbook-1.png"
  },
  {
    id: "lookbook-2",
    title: "Smile More :)",
    category: "Casual / Everyday",
    image: "/gallery/lookbook-2.png"
  },
  {
    id: "lookbook-3",
    title: "Premium Fabric Stack",
    category: "Cotton Quality",
    image: "/gallery/lookbook-3.png"
  },
  {
    id: "lookbook-4",
    title: "Legends Are Born In College",
    category: "College Batch",
    image: "/gallery/lookbook-4.png"
  },
  {
    id: "lookbook-5",
    title: "Good People Good Times",
    category: "Squad Vibes",
    image: "/gallery/lookbook-5.png"
  },
  {
    id: "lookbook-6",
    title: "Mental Health Matters",
    category: "Awareness & Quotes",
    image: "/gallery/lookbook-6.png"
  }
];
