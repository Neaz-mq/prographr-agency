import { Hero } from "@/components/sections/Hero";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Team } from "@/components/sections/Team";
import { ShowcaseMarquee } from "@/components/sections/ShowcaseMarquee";

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
    </main>
  );
}