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
        <ProjectsHero />

        {/* Brand section: home page-er ekoi TrustedBy (Figma: hero-r pore) */}
        <TrustedBy />

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