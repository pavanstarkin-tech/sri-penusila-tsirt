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
    id: "1",
    name: "Rakesh Varma",
    location: "Nellore (College Batch)",
    avatar: "/testimonials/avatar-1.png",
    rating: 5,
    review: "Excellent quality and print! Got 85 custom T-shirts for our college farewell event. The fabric feels premium and the print never faded even after multiple washes. Everyone in our batch loved it!",
    orderType: "85 pcs • College Batch Order",
    productImage: "/tshirts/1.png",
    verified: true
  },
  {
    id: "2",
    name: "Sravani",
    location: "Rapur (Birthday Squad)",
    avatar: "/testimonials/avatar-2.png",
    rating: 5,
    review: "Very professional and fast delivery within 24 hours. My family birthday celebration T-shirts came out amazing with crisp photo prints and vibrant custom colors!",
    orderType: "12 pcs • Birthday Family Set",
    productImage: "/tshirts/3.png",
    verified: true
  },
  {
    id: "3",
    name: "Mahesh Naidu",
    location: "Penubarthi (Corporate Team)",
    avatar: "/testimonials/avatar-3.png",
    rating: 5,
    review: "Best place for customized business T-shirts in Nellore district. The embroidery-style logo printing and comfortable combed cotton fabric are top notch.",
    orderType: "30 pcs • Corporate Staff Uniform",
    productImage: "/tshirts/2.png",
    verified: true
  }
];
