import { images } from "@/lib/images";

export type ServiceImage = {
  /* Cloudinary public ID (extension chara). ID gula lib/images.ts-e rakho */
  src: string;
  alt: string;
  /* true = Figma theke black background + padding + rounded corner shoho export kora (jemon Brand Identity).
     false/na dile raw photo dhore code theke black panel + padding + rounded corner deya hoy */
  preFramed?: boolean;
  /* Fixed frame-e image `cover` hoy, tai ratio na mille kichu ongsho kate. Kon dik-ta dekhabe seta ekhane bolo.
     Default "center". Jemon "center top", "center bottom", "left center", "50% 30%" */
  position?: string;
};

export type Service = {
  id: string;
  title: string;
  tags: string[];
  /* Optional. Image na thakle dark placeholder panel dekhabe */
  image?: ServiceImage;
};

/* Figma-te shudhu "Brand Identity Design" open state ache, tai oitar tag Figma theke.
   Baki service-er tag PLACEHOLDER (design ashle replace koro). Sob image Cloudinary (prographr folder) theke. */
export const services: Service[] = [
  {
    id: "ui-ux-design",
    title: "UI UX Design",
    tags: ["User Research", "Wireframing", "Prototyping", "Design Systems"], // PLACEHOLDER
    image: { src: images.serviceUiUx, alt: "UI UX design showcase: app and website interface screens" },
  },
  {
    id: "brand-identity-design",
    title: "Brand Identity Design",
    tags: ["Logo Design", "Brand Guideline", "Stationery Design", "2D, 3D Illustration Design"],
    image: { src: images.serviceBrandIdentity, alt: "Cultt brand identity design: logo, social stories and brand pattern", preFramed: true },
  },
  {
    id: "web-development",
    title: "Web development",
    tags: ["Frontend Development", "CMS Integration", "Performance & SEO", "Web Applications"], // PLACEHOLDER
    image: { src: images.serviceWeb, alt: "Web development showcase: responsive website and code" },
  },
  {
    id: "mobile-app-development",
    title: "Mobile App Development",
    tags: ["iOS & Android", "Cross-Platform Apps", "App UI Design", "Maintenance & Support"], // PLACEHOLDER
    image: { src: images.serviceMobile, alt: "Mobile app development showcase: app screens on smartphones" },
  },
  {
    id: "products-solution",
    title: "Products Solution",
    tags: ["MVP Development", "SaaS Platforms", "Dashboards", "Product Strategy"], // PLACEHOLDER
    image: { src: images.serviceProducts, alt: "Product solution showcase: digital product and dashboard design" },
  },
  {
    id: "software-development",
    title: "Software Development",
    tags: ["Custom Software", "API Development", "Cloud & DevOps", "Quality Assurance"], // PLACEHOLDER
    image: { src: images.serviceSoftware, alt: "Software development showcase: custom software and analytics dashboard" },
  },
  {
    id: "software-maintenance",
    title: "Software Maintenance",
    tags: ["Bug Fixing", "Performance Monitoring", "Security Updates", "Ongoing Support"], // PLACEHOLDER
    image: { src: images.serviceMaintenance, alt: "Software maintenance dashboard: maintenance checklist, server health, security updates and recent activity" },
  },
];

/* Figma-te ei service-ta shuru theke open */
export const defaultOpenServiceId = "brand-identity-design";