import type { Metadata } from "next";
import { ProjectsHero } from "@/components/sections/ProjectsHero";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { ProjectsGallery } from "@/components/sections/ProjectsGallery";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Projects — Prographr",
  description: "A selection of digital products, websites and brand experiences Prographr has designed and built.",
};

export default function ProjectsPage() {
  return (
    <>
      <main>
        {/* --h = home page-er moto usable height (100svh - nav-er jonno 5.75rem). Hero-r header-er pt ar TrustedBy-r height
            ei variable-er upor nirbhor kore (clamp + var(--h)). Eta na thakle ei duto invalid hoye TrustedBy strip bhenge jay, header-o nimne boshe. */}
        <div className="[--h:calc(100svh-5.75rem)]">
          <ProjectsHero />

          {/* Brand section: home page-er ekoi TrustedBy (Figma: hero-r pore) */}
          <TrustedBy />
        </div>

        {/* Filter chip + shob project (Figma: Desktop - 2014) */}
        <ProjectsGallery />

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