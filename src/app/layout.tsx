import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const clashGrotesk = localFont({
  src: "../fonts/ClashGrotesk-Variable.woff2",
  weight: "200 700",
  variable: "--font-clash",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Prographr — Product Design and Development Agency",
  description:
    "Prographr is a product design and development agency crafting intuitive digital products, stunning websites, and scalable solutions.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={clashGrotesk.variable}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}