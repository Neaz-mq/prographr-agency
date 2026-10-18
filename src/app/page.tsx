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
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <main>
        {/* Hero + TrustedBy = "first screen". Figma: TrustedBy-r niche-e FloatingNav-er jonno ~92px (5.75rem) faka, jekhane porer section-er
            top blur hoye dekha jay. Tai min-height = 100svh - 5.75rem, ar --h (usable height) Hero/HeroShowcase-er fluid sizing-e use hoy.
            Boro screen-e hero + strip ei height bhore, strip nav-er upore boshe. Choto screen-e content-ei lomba, tai kono bodol nai. */}
        <div className="flex min-h-[calc(100svh-5.75rem)] flex-col [--h:calc(100svh-5.75rem)]">
          <Hero />
          <TrustedBy />
        </div>
        {/* Figma: FloatingNav-er pichone soft blur + fade (shudhu first screen-e, scroll korle mile jay). CSS: globals.css `.first-screen-blur` */}
        <div aria-hidden="true" className="first-screen-blur" />
        <Projects />
        <Services />
        <WhyChooseUs />
        <Team />
        <ShowcaseMarquee />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}