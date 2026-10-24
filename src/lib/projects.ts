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

export const projectCategories = [
  "Web Design",
  "Mobile App",
  "Dashboard",
  "Saas Product",
  "Hospital",
  "Artificial Intelligent",
  "EduTech",
] as const;
export type ProjectCategory = (typeof projectCategories)[number];

type Icon = ComponentType<{ className?: string }>;

/* Image card-er 628 x 375 (#F0F0F0) area-te kemon boshbe.
   - window (default): white-border-wala screenshot, 574px, niche porjonto cut kora, rounded top corner
   - inset: phone mockup (MoodMap, Finora). Cloudinary age charpashe-r faka kete image tight kore (e_trim), tarpor
     pashe `side`px ar upore `top`px padding diye boshe, bhitore image-er nijer ratio-te (kono crop nai). Niche card-er edge-e clip hoy.
     side/top Figma-r px (628 x 375 area-r bhitor), code-e % e convert hoy
   - full: image-i puro 628 x 375 area-r export hole (area-r puro jayga bhore)
   - free: transparent mockup, left/top/width/height diye exact position
   - natural: Figma layer-er exact export (border soho). left/top/width diye boshe, height image-er nijer ratio-te (kono crop nai),
     niche card-er edge-e clip hoy. Image-er ratio Figma-r height-er sathe na milleo kete jay na */
export type ProjectMedia =
  | { kind: "window" }
  | { kind: "inset"; side: number; top: number }
  | { kind: "full" }
  | { kind: "free"; left: number; top: number; width: number; height: number }
  | { kind: "natural"; left: number; top: number; width: number };

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
  /* /projects page-er filter chip-er jonno. Chip label-er sathe hubohu mile thakte hobe (projectCategories) */
  categories?: ProjectCategory[];
};

/* TODO: case study page ready hole href gula "/projects/<slug>" kore dao */
export const projects: Project[] = [
  {
    slug: "cuisine",
    categories: ["Web Design", "Dashboard", "Saas Product"],
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
    href: "https://www.behance.net/gallery/257439563/Restaurant-Management-Web-App-UIUX-Case-Study",
  },
  {
    slug: "filamento",
    categories: ["Web Design", "Dashboard", "Saas Product"],
    title: "E-commerce Webapp",
    description: "Filamento is a modern e-commerce management platform designed to help owners...",
    tags: [
      { label: "Smart Dashboard", icon: DashboardIcon },
      { label: "Order Management", icon: GavelIcon },
      { label: "Analytics", icon: ChartUpIcon },
    ],
    name: "Filamento",
    image: images.projectFilamento,
    imageAlt: "Filamento e-commerce web app design case study",
    href: "#",
  },
  {
    slug: "solvexai",
    categories: ["Web Design", "Saas Product", "Artificial Intelligent"],
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
    categories: ["Web Design", "Dashboard", "Saas Product"],
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
    slug: "mintora",
    categories: ["Dashboard"],
    title: "Business Management Dashboard",
    description: "Mintora is a modern e-commerce management platform designed to help owners...",
    tags: [
      { label: "Smart Dashboard", icon: DashboardIcon },
      { label: "Order Management", icon: GavelIcon },
      { label: "Analytics", icon: ChartUpIcon },
    ],
    name: "Mintora",
    image: images.projectBusiness,
    imageAlt: "Mintora business management dashboard design",
    href: "#",
  },
  {
    slug: "topper",
    categories: ["EduTech"],
    title: "Education Dashboard",
    description: "Topper is a modern education management platform designed to help owners...",
    tags: [
      { label: "Smart Dashboard", icon: DashboardIcon },
      { label: "AI Insights", icon: MagicPenIcon },
      { label: "Analytics", icon: ChartUpIcon },
    ],
    name: "Topper",
    image: images.projectEducation,
    imageAlt: "Topper education dashboard design",
    href: "#",
  },
  {
    slug: "moodmap",
    categories: ["Mobile App", "Hospital"],
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
    categories: ["Mobile App", "Artificial Intelligent"],
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

/* /projects page-er extra 4 ta card (Figma: 10 ta card). Title/description/tag/name Figma CSS theke neya.
   Tag-er icon Figma-r hubohu na (existing icon theke boshano), chaile icons.tsx-e Figma-r icon export kore bodlao */
export const moreProjects: Project[] = [
  {
    slug: "moneyboard",
    title: "Smart Financial Management",
    description: "A modern financial dashboard designed to simplify expense tracking...",
    categories: ["Web Design", "Dashboard"],
    tags: [
      { label: "Financial Dashboard", icon: DashboardIcon },
      { label: "Expense Management", icon: LayersStackIcon },
      { label: "Financial Analytics", icon: ChartUpIcon },
    ],
    name: "MoneyBoard",
    image: images.projectMoneyboard,
    imageAlt: "MoneyBoard financial management dashboard design",
    /* Figma "image 6350934": 576 x 440, area-r (628 x 375) majhe, upor theke 27px, niche clip hoy */
    media: { kind: "natural", left: 26, top: 27, width: 576 },
    href: "#",
  },
  {
    slug: "flowbank",
    title: "Smart Financial Management",
    description: "A modern financial dashboard designed to simplify expense tracking...",
    categories: ["Web Design", "Dashboard"],
    tags: [
      { label: "Financial Dashboard", icon: DashboardIcon },
      { label: "Expense Management", icon: LayersStackIcon },
      { label: "Financial Analytics", icon: ChartUpIcon },
    ],
    name: "FlowBank",
    image: images.projectFlowbank,
    imageAlt: "FlowBank financial management dashboard design",
    /* Figma: image 573 x 402, area-r majhe (+0.5px), upor theke 27px, niche clip hoy */
    media: { kind: "natural", left: 28, top: 27, width: 573 },
    href: "#",
  },
  {
    slug: "prographr-ai",
    title: "AI-Powered Business Transformation",
    description: "A modern AI platform designed to help businesses unlock growth...",
    categories: ["Web Design", "Saas Product", "Artificial Intelligent"],
    tags: [
      { label: "AI Strategy", icon: MagicStarIcon },
      { label: "Intelligent Automation", icon: MagicPenIcon },
      { label: "Business Growth", icon: ChartUpIcon },
    ],
    name: "PrographrAI",
    image: images.projectPrographr,
    imageAlt: "PrographrAI business transformation website design",
    /* Figma "image 6350935": 578 x 476, majhe (left 25), upor theke 28px */
    media: { kind: "natural", left: 25, top: 28, width: 578 },
    href: "#",
  },
  {
    slug: "risecap",
    title: "Powering Smarter Financial Decisions",
    description: "From intelligent financial insights and transaction tracking to smarter...",
    categories: ["Web Design", "Dashboard", "Saas Product"],
    tags: [
      { label: "Financial Intelligence", icon: MagicStarIcon },
      { label: "Smart Management", icon: LayersStackIcon },
      { label: "Data Analytics", icon: ChartUpIcon },
    ],
    name: "RiseCap",
    image: images.projectRisecap,
    imageAlt: "RiseCap smart financial decisions website design",
    /* Figma "image 6350936": 576 x 410, majhe (left 26), upor theke 28px */
    media: { kind: "natural", left: 26, top: 28, width: 576 },
    href: "#",
  },
];

/* /projects page: Figma-r order (10 ta card) + shesh-e notun 2 ta (Mintora | Topper), 2 ta kore row:
   Cuisine | Filamento, MoneyBoard | FlowBank, MoodMap | Finora, SolvexAI | NexBank, PrographrAI | RiseCap, Mintora | Topper.
   Home-e shudhu `projects` (6 ta) dekhay, tai oita bodlay ni */
const galleryOrder = [
  "cuisine",
  "filamento",
  "moneyboard",
  "flowbank",
  "moodmap",
  "finora",
  "solvexai",
  "nexbank",
  "prographr-ai",
  "risecap",
  "mintora",
  "topper",
];
const bySlug = new Map([...projects, ...moreProjects].map((p) => [p.slug, p]));
export const allProjects: Project[] = galleryOrder.map((slug) => bySlug.get(slug)!);