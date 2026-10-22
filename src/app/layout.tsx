import type { Metadata } from "next";
import localFont from "next/font/local";
import { Bricolage_Grotesque } from "next/font/google";
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

/* Testimonial card-er rating (5.0 / 4.9) Figma-te Bricolage Grotesque-e */
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bricolage",
  display: "swap",
});

// export

export const metadata: Metadata = {
  metadataBase: new URL("https://prographr.com"),
  title: "Prographr — Product Design and Development Agency",
  description:
    "Prographr is a product design and development agency crafting intuitive digital products, stunning websites, and scalable solutions.",
  /* "./" mane proti page-er nijer URL canonical hoy (/projects -> https://prographr.com/projects). www noy, shobshomoy non-www */
  alternates: { canonical: "./" },
  openGraph: {
    type: "website",
    siteName: "Prographr",
    title: "Prographr — Product Design and Development Agency",
    description:
      "Prographr is a product design and development agency crafting intuitive digital products, stunning websites, and scalable solutions.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${clashGrotesk.variable} ${bricolage.variable}`} data-preloading="">
      <head>
        {/* Cloudinary-r shathe connection age-i khule rakhe (DNS + TLS), tai reload-e image gulo-r prothom byte tara-tari ashe */}
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      </head>
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