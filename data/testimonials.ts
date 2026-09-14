export interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  review: string;
  orderType: string;
  productImage: string;
  verified?: boolean;
}

export const testimonials: Testimonial[] = [
  {
    id: "nc-1",
    name: "Vikram & Batch 2026",
    location: "Nellore (Engineering College)",
    avatar: "/testimonials/avatar-1.png",
    rating: 5,
    review: "Ordered 95 pcs of the New Collection College Batch T-shirts for our fest. The fabric weight is fantastic (240 GSM) and the front-back graphics came out razor sharp. Delivered right on schedule in Rapur!",
    orderType: "95 pcs • College Batch Order",
    productImage: "/newcollection/3.png",
    verified: true
  },
  {
    id: "nc-2",
    name: "Sneha & Friends",
    location: "Rapur (Birthday Squad)",
    avatar: "/testimonials/avatar-2.png",
    rating: 5,
    review: "The custom photo and name printing from the new collection was breathtaking. We got matching squad tees for my sister's birthday and the colors are super rich. Best printing centre in Nellore!",
    orderType: "15 pcs • Birthday Squad Set",
    productImage: "/newcollection/5.png",
    verified: true
  },
  {
    id: "nc-3",
    name: "Karthik Reddy",
    location: "Gudur (Tech Startup Team)",
    avatar: "/testimonials/avatar-3.png",
    rating: 5,
    review: "Sri Penusila printed our company staff uniforms with precision embroidery-style DTF logos. Breathable cotton, modern collar fit, and great bulk pricing. Highly recommended for corporate orders.",
    orderType: "40 pcs • Corporate Staff Uniform",
    productImage: "/newcollection/4.png",
    verified: true
  },
  {
    id: "nc-4",
    name: "Ananya & Rahul",
    location: "Nellore (Pre-Wedding Duo)",
    avatar: "/testimonials/avatar-2.png",
    rating: 5,
    review: "We ordered the New Collection Soulmate Matching Couple tees for our pre-wedding photoshoot. The illustration quality and soft bio-washed fabric made our shoot look incredible!",
    orderType: "2 pcs • Custom Couple Edition",
    productImage: "/newcollection/6.png",
    verified: true
  },
  {
    id: "nc-5",
    name: "Sai Charan",
    location: "Penubarthi (Streetwear Lover)",
    avatar: "/testimonials/avatar-1.png",
    rating: 5,
    review: "The Heavyweight Drop-Shoulder boxy tee is legit streetwear standard. 260 GSM fabric, solid ribbing, and the graphic doesn't crack or peel after repeated washing.",
    orderType: "Custom Streetwear Drop-Shoulder",
    productImage: "/newcollection/55.png",
    verified: true
  },
  {
    id: "nc-6",
    name: "Praveen Naidu",
    location: "Rapur (Sports Club)",
    avatar: "/testimonials/avatar-3.png",
    rating: 5,
    review: "Customized sports squad jerseys with player names and numbers on back. Perfect fit, breathable fabric, and finished in just 2 days. Super satisfied with the service!",
    orderType: "25 pcs • Champions Cricket Squad",
    productImage: "/newcollection/7.png",
    verified: true
  }
];
