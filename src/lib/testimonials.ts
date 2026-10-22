import { images } from "@/lib/images";

export type Testimonial = {
  duration: string; // "1.5 Years of Collaboration"
  services: string[];
  quote: string;
  name: string;
  role: string;
  rating: string;
  screenshot: string; // Cloudinary public ID (client website-er screenshot)
  avatar?: string; // Cloudinary public ID. Na dile naam-er prothom okkhor dekhay
};

/* Protita card-er services (lib/services.ts-er title/tag theke), quote, naam, designation alada. Rating: 4th card 4.9, baki shob 5.0.
   Quote-gulo ekoi length-er rakha hoyeche (~160-180 okkhor), jeno card-er height/layout na bhange.
   Progress bar-er segment sonkha = ei array-er length. */
export const testimonials: Testimonial[] = [
  {
    duration: "1.5 Years of Collaboration",
    services: ["UI UX Design", "Prototyping"],
    quote: "\u201CPrographer transformed our initial idea into a polished digital experience. Their attention to detail, communication, and design thinking made the entire process smooth.\u201D",
    name: "Alex Morgan",
    role: "Founder & CEO, Nexora",
    rating: "5.0",
    screenshot: images.testimonialA,
  },
  {
    duration: "3.5 Years of Collaboration",
    services: ["Web development", "Performance & SEO"],
    quote: "\u201CThe team understood our product from day one and turned a messy brief into a clean, conversion-focused website. Every revision was fast and thoughtful.\u201D",
    name: "Sarah Mitchell",
    role: "Head of Marketing, Adapta",
    rating: "5.0",
    screenshot: images.testimonialB,
  },
  {
    duration: "2 Years of Collaboration",
    services: ["Brand Identity Design", "Logo Design"],
    quote: "\u201CTheir design work gave our brand a fresh, confident look. Launch went smoothly, and our customers keep telling us how easy the new site is to use.\u201D",
    name: "Daniel Carter",
    role: "Co-Founder, Brightwave",
    rating: "5.0",
    screenshot: images.testimonialC,
  },
  {
    duration: "1.5 Years of Collaboration",
    services: ["Products Solution", "SaaS Platforms"],
    quote: "\u201CCommunication was clear at every step and the final result exceeded what we pictured. A reliable partner we are happy to keep working with.\u201D",
    name: "Priya Sharma",
    role: "Product Director, Finora",
    rating: "4.9",
    screenshot: images.testimonialA,
  },
  {
    duration: "3.5 Years of Collaboration",
    services: ["Software Development", "API Development"],
    quote: "\u201CFrom wireframes to the final Webflow build, the quality stayed high. They hit every deadline and our traffic and sign-ups improved right after launch.\u201D",
    name: "James Whitaker",
    role: "CTO, Solvex",
    rating: "5.0",
    screenshot: images.testimonialB,
  },
  {
    duration: "2 Years of Collaboration",
    services: ["Mobile App Development", "App UI Design"],
    quote: "\u201CCreative, organized and genuinely invested in our success. They simplified a complex product story into a website our whole team is proud of.\u201D",
    name: "Emily Rodriguez",
    role: "CEO, Moodmap",
    rating: "5.0",
    screenshot: images.testimonialC,
  },
];