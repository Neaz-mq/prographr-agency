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

/* Figma-te ekoi quote/author 3 ta card-e. Ekhane placeholder data, asol client-er naam/quote/avatar boshiye nio.
   Progress bar-er segment sonkha = ei array-er length. */
const quote =
  "\u201CPrographer transformed our initial idea into a polished digital experience. Their attention to detail, communication, and design thinking made the entire process smooth.\u201D";

export const testimonials: Testimonial[] = [
  { duration: "1.5 Years of Collaboration", services: ["Web Design", "Webflow Development"], quote, name: "Alex Morgan", role: "Founder & CEO, Nexora", rating: "5.0", screenshot: images.testimonialA },
  { duration: "3.5 Years of Collaboration", services: ["Web Design", "Webflow Development"], quote, name: "Alex Morgan", role: "Founder & CEO, Nexora", rating: "5.0", screenshot: images.testimonialB },
  { duration: "2 Years of Collaboration", services: ["Web Design", "Webflow Development"], quote, name: "Alex Morgan", role: "Founder & CEO, Nexora", rating: "5.0", screenshot: images.testimonialC },
  { duration: "1.5 Years of Collaboration", services: ["Web Design", "Webflow Development"], quote, name: "Alex Morgan", role: "Founder & CEO, Nexora", rating: "5.0", screenshot: images.testimonialA },
  { duration: "3.5 Years of Collaboration", services: ["Web Design", "Webflow Development"], quote, name: "Alex Morgan", role: "Founder & CEO, Nexora", rating: "5.0", screenshot: images.testimonialB },
  { duration: "2 Years of Collaboration", services: ["Web Design", "Webflow Development"], quote, name: "Alex Morgan", role: "Founder & CEO, Nexora", rating: "5.0", screenshot: images.testimonialC },
];
