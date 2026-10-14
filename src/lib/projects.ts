import type { ComponentType } from "react";
import {
  ChartUpIcon,
  CoinIcon,
  DashboardIcon,
  DocumentIcon,
  EmojiHappyIcon,
  GavelIcon,
  LayersStackIcon,
  MagicPenIcon,
  MagicStarIcon,
  TeamIcon,
  UsersIcon,
  WalletIcon,
} from "@/components/ui/icons";
import { images } from "@/lib/images";

type Icon = ComponentType<{ className?: string }>;

/* Image card-er 628 x 375 (#F0F0F0) area-te kemon boshbe.
   - window (default): white-border-wala screenshot, 574px, niche porjonto cut kora, rounded top corner
   - inset: phone mockup (MoodMap, Finora). Cloudinary age charpashe-r faka kete image tight kore (e_trim), tarpor
     pashe `side`px ar upore `top`px padding diye boshe, bhitore image-er nijer ratio-te (kono crop nai). Niche card-er edge-e clip hoy.
     side/top Figma-r px (628 x 375 area-r bhitor), code-e % e convert hoy
   - full: image-i puro 628 x 375 area-r export hole (area-r puro jayga bhore)
   - free: transparent mockup, left/top/width/height diye exact position */
export type ProjectMedia =
  | { kind: "window" }
  | { kind: "inset"; side: number; top: number }
  | { kind: "full" }
  | { kind: "free"; left: number; top: number; width: number; height: number };

export type Project = {
  slug: string;
  title: string;
  description: string;
  tags: { label: string; icon: Icon }[];
  name: string; // "Project : <name>"
  image: string; // Cloudinary public ID
  imageAlt: string;
  media?: ProjectMedia; // default: window
  href: string;
};

/* TODO: case study page ready hole href gula "/projects/<slug>" kore dao */
export const projects: Project[] = [
  {
    slug: "paynex",
    title: "AI Client Management Web Design",
    description: "Paynex is a modern smart banking and financial management platform designed...",
    tags: [
      { label: "AI Automation", icon: MagicPenIcon },
      { label: "Client Management", icon: UsersIcon },
      { label: "Smart Dashboard", icon: DashboardIcon },
    ],
    name: "Paynex",
    image: images.projectPaynex,
    imageAlt: "Paynex crypto wallet website design",
    href: "#",
  },
  {
    slug: "cuisine",
    title: "Restaurant Management Web App",
    description: "Cuisine is a modern restaurant management platform designed to help owners...",
    tags: [
      { label: "Smart Dashboard", icon: DashboardIcon },
      { label: "Order Management", icon: GavelIcon },
      { label: "Analytics", icon: ChartUpIcon },
    ],
    name: "Cuisine",
    image: images.projectCuisine,
    imageAlt: "Cuisine restaurant management web app design",
    href: "#",
  },
  {
    slug: "solvexai",
    title: "Smart Client Management",
    description: "From intelligent client onboarding and automated workflows to seamless...",
    tags: [
      { label: "AI Automation", icon: MagicPenIcon },
      { label: "Workflow Management", icon: LayersStackIcon },
      { label: "Team Collaboration", icon: TeamIcon },
    ],
    name: "SolvexAI",
    image: images.projectSolvex,
    imageAlt: "SolvexAI client management website design",
    href: "#",
  },
  {
    slug: "nexbank",
    title: "Smart Banking & Financial Management Platform",
    description: "NexBank is a modern smart banking and financial management platform...",
    tags: [
      { label: "Financial Dashboard", icon: DashboardIcon },
      { label: "Income & Expense Tracking", icon: ChartUpIcon },
      { label: "Financial Reports", icon: DocumentIcon },
    ],
    name: "NexBank",
    image: images.projectNexbank,
    imageAlt: "NexBank smart banking website design",
    href: "#",
  },
  {
    slug: "moodmap",
    title: "Personalized Mental Wellness",
    description: "A thoughtful mental wellness experience designed to help users...",
    tags: [
      { label: "Mental Wellness", icon: EmojiHappyIcon },
      { label: "Mood Tracking", icon: LayersStackIcon },
      { label: "Personalized Therapy", icon: TeamIcon },
    ],
    name: "MoodMap",
    image: images.projectMoodmap,
    imageAlt: "MoodMap mental wellness mobile app design on three phones",
    media: { kind: "inset", side: 45, top: 34.5 },
    href: "#",
  },
  {
    slug: "finora",
    title: "Intelligent Finance, Simplified",
    description: "From seamless crypto transactions and real-time market insights...",
    tags: [
      { label: "Crypto Management", icon: CoinIcon },
      { label: "Digital Wallet", icon: WalletIcon },
      { label: "AI Finance", icon: MagicStarIcon },
    ],
    name: "Finora",
    image: images.projectFinora,
    imageAlt: "Finora crypto wallet and AI finance mobile app design on three phones",
    media: { kind: "inset", side: 32, top: 40.5 },
    href: "#",
  },
];