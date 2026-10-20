import type { CSSProperties } from "react";
import { images } from "@/lib/images";

export type TeamMember = {
  name: string;
  role: string;
  image: string; // Cloudinary public ID (version shoho)
  imageStyle: CSSProperties; // Figma-r image size/position (card-er bhitore)
  imagePosition?: string; // object-position (shudhu fill/cover framing-e kaje lage). Default center
  fadeTop?: number; // px: image-er upor-er edge-e ei porjonto fade (source photo-te matha-r upore faka na thakle flat cut lukanor jonno)
  captionLow?: boolean; // optional: caption-er bottom padding 12px (default 20px, Figma-r shob card-e 20px)
  linkedin: string;
};

/* Framing: image gulo card-e puro bhore (cover) boshe, matha-r headroom image-er nijer theke ashe (Figma-r card export, caption chhara).
   fillShift(dy): image-ke dy px niche (+) ba upore (-) soray, kono dike faka rakhe na. Shobar matha ek line-e na hole shudhu oi member-er dy bodlalei hobe. */
const fillShift = (dy: number): CSSProperties =>
  dy >= 0
    ? { left: 0, top: `${dy}px`, width: "100%", height: "100%" }
    : { left: 0, top: `${dy}px`, width: "100%", height: `calc(100% + ${-dy}px)` };

/* TODO: LinkedIn profile URL gula boshao ("#" placeholder). */
export const team: TeamMember[] = [
  { name: "Mahamudul Islam", role: "CEO at Prographr", image: images.teamMember1, imageStyle: fillShift(0), imagePosition: "center top", linkedin: "#" },
  { name: "Neaz Morshed", role: "Web App Developer", image: images.teamMember2, imageStyle: fillShift(0), imagePosition: "center top", linkedin: "#" },
  { name: "Raihan Uddin", role: "Sr. Graphic Designer", image: images.teamMember3, imageStyle: fillShift(0), imagePosition: "center top", linkedin: "#" },
  { name: "Kawsar Ahmed", role: "UI UX Designer", image: images.teamMember4, imageStyle: fillShift(0), imagePosition: "center top", linkedin: "#" },
  { name: "Nahid Hasan", role: "Graphic Designer", image: images.teamMember5, imageStyle: fillShift(2.2), imagePosition: "center top", linkedin: "#" },
  { name: "Ali Hasan Sagor", role: "Presentation Designer", image: images.teamMember6, imageStyle: fillShift(11.7), imagePosition: "center top", linkedin: "#" },
];