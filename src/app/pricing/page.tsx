import type { Metadata } from "next";
import { PricingHero } from "@/components/sections/PricingHero";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { PricingPlans } from "@/components/sections/PricingPlans";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Pricing — Prographr",
  description:
    "Flexible pricing options from Prographr, designed to fit your goals, project needs and budget for meaningful digital experiences.",
};

export default function PricingPage() {
  return (
    <>
      <main>
        {/* --h = home page-er moto usable height (100svh - nav-er jonno 5.75rem). PricingHero-r header-er pt ar TrustedBy-r height
            ei variable-er upor nirbhor kore, tai duto-i ei wrapper-er bhitore thakte hobe. */}
        <div className="[--h:calc(100svh-5.75rem)]">
          <PricingHero />

          {/* Brand section: home/projects/services page-er ekoi TrustedBy (Figma: hero-r pore, 1440 Fill x 112.47 Hug) */}
          <TrustedBy />
        </div>

        {/* Pricing plans: tab row + Launch / Most Popular / Custom card (Figma: Desktop - 2014, 1440 x 1081) */}
        <PricingPlans />

        {/* Testimonial: home / projects / services page-er ekoi section */}
        <Testimonials />

        {/* FAQ: home / projects / services page-er ekoi section */}
        <Faq />

        {/* "Let's talk" / "Book a call" (#contact) ei page-eo kaj korbe */}
        <Contact />
      </main>
      <Footer />
    </>
  );
}