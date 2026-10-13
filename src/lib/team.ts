import type { CSSProperties } from "react";
import { images } from "@/lib/images";

export type TeamMember = {
  name: string;
  role: string;
  image: string; // Cloudinary public ID
  imageStyle: CSSProperties; // Figma-r image size/position (card-er majhkhane center kora)
  captionLow?: boolean; // Figma: Kawsar-er card-e bottom padding 12px (baki 20px)
  linkedin: string;
};

/* Figma-te protita portrait card-er theke horizontally CENTER kora (left = (302 - width) / 2). Tai left % na diye 50% + translate use kora hoyeche.
   Image-er size (rem) ar top fix, aspect-ratio thik thake. Card choto/boro hole matha kate na.
   Card Figma-r 302px-er cheye choura hole image proportionally boro hoy (max(100%, designW)), tai kono dike faka thake na. */
const frame = (width: number, height: number, top: number): CSSProperties => ({
  left: "50%",
  top: `${top / 16}rem`,
  width: `max(100%, ${width / 16}rem)`,
  aspectRatio: `${width} / ${height}`,
  transform: "translateX(-50%)",
});

/* Protita portrait-er Figma framing (width, height, top). Same image onno member-e reuse hole same framing.
   UP = browser-e matha ektu niche dekhacchilo, tai protita top-e kichu px upore tola hoyeche. Aro upore chaile UP baro, niche chaile komao. */
const UP = { A: 9, B: 26, C: 22 };
const framingA = frame(549, 549, 0 - UP.A); // image 6350928
const framingB = frame(337, 451, -23 - UP.B); // image 6350930
const framingC = frame(331, 498, 0 - UP.C); // image 6350926
const framingB2 = frame(337, 451, -25.47 - UP.B); // Kawsar: frame (top -4) + image (top -21.47)

/* TODO: LinkedIn profile URL gula boshao ("#" placeholder) */
export const team: TeamMember[] = [
  { name: "Mahamudul Islam", role: "CEO at Prographr", image: images.teamPortraitA, imageStyle: framingA, linkedin: "#" },
  { name: "Neaz Morshed", role: "Web App Developer", image: images.teamPortraitB, imageStyle: framingB, linkedin: "#" },
  { name: "Raihan Uddin", role: "Sr. Graphic Designer", image: images.teamPortraitC, imageStyle: framingC, linkedin: "#" },
  { name: "Kawsar Ahmed", role: "UI UX Designer", image: images.teamPortraitB, imageStyle: framingB2, captionLow: true, linkedin: "#" },
  { name: "Nahid Hasan", role: "Graphic Designer", image: images.teamPortraitA, imageStyle: framingA, linkedin: "#" },
  { name: "Ali Hasan Sagor", role: "Presentation Designer", image: images.teamPortraitC, imageStyle: framingC, linkedin: "#" },
];