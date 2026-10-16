import { Hero } from "@/components/sections/Hero";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Team } from "@/components/sections/Team";
import { Testimonials } from "@/components/sections/Testimonials";
import { ShowcaseMarquee } from "@/components/sections/ShowcaseMarquee";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustedBy />
      <Projects />
      <Services />
      <WhyChooseUs />
      <Team />
      <ShowcaseMarquee />
      <Testimonials />
      <Faq />
      <Contact />
    </main>
  );
}