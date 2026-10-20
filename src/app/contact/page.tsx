import type { Metadata } from "next";
import { ContactHero } from "@/components/sections/ContactHero";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { ContactFormSection } from "@/components/sections/ContactFormSection";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Contact Us — Prographr",
  description:
    "Get in touch with Prographr. Book a free 20-minute call to talk about your project, goals and the digital experience you want to build.",
};

export default function ContactPage() {
  return (
    <>
      <main>
        {/* --h = home page-er moto usable height (100svh - nav-er jonno 5.75rem). ContactHero-r header-er pt ar TrustedBy-r height
            ei variable-er upor nirbhor kore, tai duto-i ei wrapper-er bhitore thakte hobe. (/services, /pricing-er ekoi structure: min-height/flex nai, tai hero ar strip-er majhe extra gap hoy na) */}
        <div className="[--h:calc(100svh-5.75rem)]">
          <ContactHero />

          {/* Brand section: home/projects/services/pricing page-er ekoi TrustedBy (Figma: hero-r pore) */}
          <TrustedBy />
        </div>

        {/* "Have a Project in Mind? Let's Talk" form section (Figma: Desktop - 2014, #contact). Footer-er "Contact" link-o ekhane kaj korbe */}
        <ContactFormSection />

        {/* FAQ: home/services/pricing/projects-er ekoi section (Figma: Contact form-er pore, footer-er age). Ei page-e nijer form-i ache,
            tai home-er moto alada "Contact" CTA section lage na. FAQ-er "Let's start talk" button (#contact) ei page-er form-e smooth scroll kore niye jay. */}
        <Faq />
      </main>
      <Footer />
    </>
  );
}