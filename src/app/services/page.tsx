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
        {/* --h = home page-er moto usable height (100svh - nav-er jonno 5.75rem). Hero-r header-er pt ar TrustedBy-r height
            ei variable-er upor nirbhor kore. Eta na thakle TrustedBy strip bhenge jay, header-o nimne boshe. */}
        <div className="[--h:calc(100svh-5.75rem)]">
          <ServicesHero />

          {/* Brand section: home/projects page-er ekoi TrustedBy (Figma: hero-r pore) */}
          <TrustedBy />
        </div>

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