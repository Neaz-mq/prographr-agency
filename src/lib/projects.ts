import type { ComponentType } from "react";
import {
  ChartUpIcon,
  DashboardIcon,
  DocumentIcon,
  GavelIcon,
  LayersStackIcon,
  MagicPenIcon,
  TeamIcon,
  UsersIcon,
} from "@/components/ui/icons";
import { images } from "@/lib/images";

type Icon = ComponentType<{ className?: string }>;

export type Project = {
  slug: string;
  title: string;
  description: string;
  tags: { label: string; icon: Icon }[];
  name: string; // "Project : <name>"
  image: string; // Cloudinary public ID
  imageAlt: string;
  href: string;
};

/* TODO: case study page ready hole href gula "/projects/<slug>" kore dao */
export const projects: Project[] = [
  {
    slug: "paynex",
    title: "AI Clint Management Web Design",
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
    description: "Paynex is a modern smart banking and financial management platform...",
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
];