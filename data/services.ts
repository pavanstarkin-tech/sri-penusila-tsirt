export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface OccasionItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  icon: string;
}

export const services: ServiceItem[] = [
  {
    id: "photos",
    title: "Photos",
    description: "Print your favorite photos on T-shirts.",
    icon: "Image"
  },
  {
    id: "names-text",
    title: "Names & Text",
    description: "Add names, quotes, or any text.",
    icon: "Type"
  },
  {
    id: "logos",
    title: "Logos",
    description: "Print your brand or organization logo.",
    icon: "ShieldCheck"
  },
  {
    id: "custom-artwork",
    title: "Custom Artwork",
    description: "Your design, our expertise. We print it for you.",
    icon: "Palette"
  }
];

export const occasions: OccasionItem[] = [
  {
    id: "birthdays",
    title: "Birthdays",
    subtitle: "Make birthdays special",
    image: "/assets/categories/1.png"
  },
  {
    id: "college-events",
    title: "College Events",
    subtitle: "Unite your squad",
    image: "/assets/categories/2.png"
  },
  {
    id: "functions",
    title: "Functions",
    subtitle: "For your special gatherings",
    image: "/assets/categories/3.png"
  },
  {
    id: "teams",
    title: "Teams",
    subtitle: "Stronger together",
    image: "/assets/categories/4.png"
  },
  {
    id: "businesses",
    title: "Businesses",
    subtitle: "Your brand, Our tees",
    image: "/assets/categories/5.png"
  },
  {
    id: "celebrations",
    title: "Celebrations",
    subtitle: "Custom Tees For Every Occasion",
    image: "/assets/categories/6.png"
  }
];

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Share Your Idea",
    description: "Tell us your design, photo, name or requirement.",
    icon: "Lightbulb"
  },
  {
    step: "02",
    title: "Choose T-Shirt",
    description: "Select style, size, color and quantity.",
    icon: "Shirt"
  },
  {
    step: "03",
    title: "We Print",
    description: "Our expert team brings your design to life.",
    icon: "Printer"
  },
  {
    step: "04",
    title: "You Wear",
    description: "Get your custom T-shirt and show it off!",
    icon: "Gift"
  }
];

export const whyChooseFeatures = [
  {
    title: "Quality",
    description: "Premium materials and long-lasting prints.",
    icon: "Award"
  },
  {
    title: "Creativity",
    description: "Bring any idea to life.",
    icon: "Sparkles"
  },
  {
    title: "Affordable Pricing",
    description: "Best value for everyone.",
    icon: "Tag"
  },
  {
    title: "Timely Service",
    description: "On-time delivery always.",
    icon: "Clock"
  },
  {
    title: "Trust & Reliability",
    description: "Your satisfaction is our priority.",
    icon: "ShieldCheck"
  }
];
