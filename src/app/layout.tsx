import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { FloatingNav } from "@/components/layout/FloatingNav";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Preloader } from "@/components/layout/Preloader";
import { ScrollPerf } from "@/components/layout/ScrollPerf";

const clashGrotesk = localFont({
  src: "../fonts/ClashGrotesk-Variable.woff2",
  weight: "200 700",
  variable: "--font-clash",
  display: "swap",
});

// export

export const metadata: Metadata = {
  title: "Prographr — Product Design and Development Agency",
  description:
    "Prographr is a product design and development agency crafting intuitive digital products, stunning websites, and scalable solutions.",
  // TODO: launch-er din eta muche dite hobe, nahole Google-e site index hobe na
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={clashGrotesk.variable} data-preloading="">
      <body suppressHydrationWarning>
        <SmoothScroll />
        <ScrollPerf />
        <Preloader />
        {children}
        <FloatingNav />
      </body>
    </html>
  );
}