export interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  review: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Rakesh Varma",
    location: "Nellore",
    avatar: "/testimonials/avatar-1.png",
    rating: 5,
    review: "Excellent quality and print! Got custom T-shirts for our college event. Everyone loved it!"
  },
  {
    id: "2",
    name: "Sravani",
    location: "Rapur",
    avatar: "/testimonials/avatar-2.png",
    rating: 5,
    review: "Very professional and quick service. My birthday T-shirts came out amazing!"
  },
  {
    id: "3",
    name: "Mahesh",
    location: "Penubarthi",
    avatar: "/testimonials/avatar-3.png",
    rating: 5,
    review: "Best place for customized T-shirts in Nellore. Good quality and friendly support."
  }
];
