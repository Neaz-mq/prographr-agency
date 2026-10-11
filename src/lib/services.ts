import { images } from "@/lib/images";

export type ServiceImage = {
  /* provider "cloudinary" (default) = Cloudinary public ID, "unsplash" = Unsplash photo ID. Dutoi lib/images.ts-e rakho */
  src: string;
  alt: string;
  provider?: "cloudinary" | "unsplash";
};

export type Service = {
  id: string;
  title: string;
  tags: string[];
  /* Optional. Image na thakle dark placeholder panel dekhabe */
  image?: ServiceImage;
};

/* Figma-te shudhu "Brand Identity Design" open state ache, tai oitar tag/image Figma theke.
   Baki service-er tag PLACEHOLDER, image Unsplash PLACEHOLDER. Real design ashle Cloudinary-te upload kore
   lib/images.ts-e ID diye `image: { src: images.<key>, alt: "..." }` dao (provider lagbe na). */
export const services: Service[] = [
  {
    id: "ui-ux-design",
    title: "UI UX Design",
    tags: ["User Research", "Wireframing", "Prototyping", "Design Systems"], // PLACEHOLDER
    image: { src: images.serviceUiUx, alt: "Computer monitor showing a UI design system on a designer's desk", provider: "unsplash" },
  },
  {
    id: "brand-identity-design",
    title: "Brand Identity Design",
    tags: ["Logo Design", "Brand Guideline", "Stationery Design", "2D, 3D Illustration Design"],
    image: { src: images.serviceBrandIdentity, alt: "Cultt brand identity design: logo, social stories and brand pattern" },
  },
  {
    id: "web-development",
    title: "Web development",
    tags: ["Frontend Development", "CMS Integration", "Performance & SEO", "Web Applications"], // PLACEHOLDER
    image: { src: images.serviceWeb, alt: "MacBook with lines of code on its screen on a busy desk", provider: "unsplash" },
  },
  {
    id: "mobile-app-development",
    title: "Mobile App Development",
    tags: ["iOS & Android", "Cross-Platform Apps", "App UI Design", "Maintenance & Support"], // PLACEHOLDER
    image: { src: images.serviceMobile, alt: "Smartphone showing an app interface beside a laptop keyboard", provider: "unsplash" },
  },
  {
    id: "products-solution",
    title: "Products Solution",
    tags: ["MVP Development", "SaaS Platforms", "Dashboards", "Product Strategy"], // PLACEHOLDER
    image: { src: images.serviceProducts, alt: "Monitor displaying digital products", provider: "unsplash" },
  },
  {
    id: "software-development",
    title: "Software Development",
    tags: ["Custom Software", "API Development", "Cloud & DevOps", "Quality Assurance"], // PLACEHOLDER
    image: { src: images.serviceSoftware, alt: "SaaS analytics dashboard with graphs on a laptop screen", provider: "unsplash" },
  },
  {
    id: "software-maintenance",
    title: "Software Maintenance",
    tags: ["Bug Fixing", "Performance Monitoring", "Security Updates", "Ongoing Support"], // PLACEHOLDER
    image: { src: images.serviceMaintenance, alt: "Developer working on code in a modern workspace", provider: "unsplash" },
  },
];

/* Figma-te ei service-ta shuru theke open */
export const defaultOpenServiceId = "brand-identity-design";