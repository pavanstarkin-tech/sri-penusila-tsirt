export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const faqs: FAQItem[] = [
  {
    id: "order",
    question: "How can I place a custom T-shirt order?",
    answer: "You can easily customize your T-shirt directly on our website, click 'WhatsApp / Enquire' to share your idea with us, or call our team at 8985065578 / 9550151533. We will guide you with designs, fabric choices, and fast turnaround."
  },
  {
    id: "design",
    question: "Can I send my own design or photo?",
    answer: "Yes, absolutely! You can upload high-resolution photos, logos, artwork, quotes, or vector graphics (PNG, JPG, SVG, PDF). If you only have an idea or rough sketch, our team will help design it for you free of charge."
  },
  {
    id: "moq",
    question: "What is the minimum order quantity?",
    answer: "There is no minimum order quantity (No MOQ)! You can print a single personalized T-shirt for a birthday or personal gift, or order hundreds of T-shirts for college events, corporate gatherings, and sports teams."
  },
  {
    id: "time",
    question: "How long does it take to complete an order?",
    answer: "Single customized T-shirts are typically printed and ready within 24 to 48 hours. Bulk college or corporate orders usually take 2 to 4 business days depending on quantity and finishing requirements."
  },
  {
    id: "delivery",
    question: "Do you deliver outside Rapur?",
    answer: "Yes! While our printing centre is physically based in Penubarthi, Rapur (Nellore District), we deliver all across Nellore District, Andhra Pradesh, and throughout India via reliable courier and speed post partners."
  },
  {
    id: "sample",
    question: "Can I get a sample before bulk order?",
    answer: "Yes, for bulk college, team, or corporate orders, we can provide a sample print piece or high-resolution digital proof so you can verify print sharpness, colors, and fabric feel before full production."
  }
];
