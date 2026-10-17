import type { Metadata } from "next";
import { PricingHero } from "@/components/sections/PricingHero";
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
        <PricingHero />

        {/* "Let's talk" / "Book a call" (#contact) ei page-eo kaj korbe. Baki section Figma-r porer frame onujayi pore jog hobe */}
        <Contact />
      </main>
      <Footer />
    </>
  );
}