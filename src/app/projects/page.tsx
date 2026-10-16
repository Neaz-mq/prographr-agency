import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ProjectsHero } from "@/components/sections/ProjectsHero";
import { ProjectStack } from "@/components/sections/Projects";
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

        {/* Shob project: home-er Projects section-er ekoi stacking card */}
        <section aria-label="All projects" className="bg-[#FAFAFA] py-16 md:py-[6.25rem]">
          <Container className="flex flex-col items-center">
            <ProjectStack />
          </Container>
        </section>

        {/* "Let's talk" / "Book a call" (#contact) ei page-eo kaj korbe */}
        <Contact />
      </main>
      <Footer />
    </>
  );
}
