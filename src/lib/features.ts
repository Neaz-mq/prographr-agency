import type { ComponentType } from "react";
import {
  LayerBoldIcon,
  NoteBoldIcon,
  NoteFavoriteBoldIcon,
  ProgrammingArrowBoldIcon,
  StatusUpBoldIcon,
} from "@/components/ui/icons";

type Icon = ComponentType<{ className?: string }>;

export type Feature = {
  title: string;
  description: string;
  /* Inline SVG component (currentColor) ba Figma theke export kora SVG file (public/-er path), dutor ekta dao */
  icon?: Icon;
  iconSrc?: string;
};

/* Figma: "Why Choose Us" (Desktop - 2019). Card-er sequence Figma-r moto (3 x 2) */
export const features: Feature[] = [
  {
    title: "Strategy First",
    description: "We understand your goals, audience, and challenges before creating a solution.",
    icon: NoteBoldIcon,
  },
  {
    title: "Design That Works",
    description: "We create clean, intuitive, and engaging experiences that are easy to use.",
    icon: LayerBoldIcon,
  },
  {
    title: "One Team, One Process",
    description: "Design and development work together under one roof, keeping communication simple.",
    icon: ProgrammingArrowBoldIcon,
  },
  {
    title: "Built for Growth",
    /* Figma-te text ta "...evolve as your" porjonto kata chilo. Shesh ongsho ("business grows.") PLACEHOLDER, final copy diye replace koro */
    description: "Our solutions are scalable and flexible, allowing your digital product to evolve as your business grows.",
    icon: StatusUpBoldIcon,
  },
  {
    title: "Unlimited Revisions",
    description: "We\u2019re committed to your satisfaction with unlimited revisions at every step.",
    icon: NoteFavoriteBoldIcon,
  },
  {
    title: "Long-Term Partnership",
    description: "We don\u2019t just deliver a project\u2014we build lasting relationships and continue to support.",
    iconSrc: "/logos/messages-2.svg", /* Figma export, public/logos/messages-2.svg. Chaile public/icons/-e soriye path bodle nao */
  },
];