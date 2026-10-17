import type { Metadata } from "next";
import { ServicesHero } from "@/components/sections/ServicesHero";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { ServicesShowcase } from "@/components/sections/ServicesShowcase";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Services — Prographr",
  description: "Design and development services from Prographr: UI/UX, web, mobile apps, brand identity and more.",
};

export default function ServicesPage() {
  return (
    <>
      <main>
        <ServicesHero />

        {/* Brand section: home/projects page-er ekoi TrustedBy (Figma: hero-r pore) */}
        <TrustedBy />

        {/* UI/UX, Brand Identity, Web development, Mobile App (Figma: Desktop - 2014, 1440 x 2296) */}
        <ServicesShowcase />

        {/* Testimonial: home page-er ekoi section */}
        <Testimonials />

        {/* FAQ: home page-er ekoi section */}
        <Faq />

        {/* "Let's talk" / "Book a call" (#contact) ei page-eo kaj korbe */}
        <Contact />
      </main>
      <Footer />
    </>
  );
}