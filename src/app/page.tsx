import { Hero } from "@/components/sections/Hero";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { Projects } from "@/components/sections/Projects";

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustedBy />
      <Projects />
    </main>
  );
}