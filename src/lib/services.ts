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
  /* Image-er width / height (jemon 3000x1000 = 3). Dile desktop-e (sm+) image kono crop chara pura dekha jay:
     image nijer ratio-te frame-er majhe boshe, uporniche ektu black ongsho thake (frame-er black-er-i moto, tai noticeable noy).
     Frame (~2.8:1) er cheye wide image hole frame fixed thake (uporniche black), kom wide (jemon 2:1) hole frame-er height image onujayi barhe (chhoto soman padding). Dui-i code nije thik kore.
     Na dile image frame bhore `cover` hoy (kichu ongsho kate).
     Mobile-e (4:3 frame) ager moto cover-i thake. */
  ratio?: number;
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
    image: { src: images.serviceUiUx, alt: "UI UX design showcase: full monitor with app and website interface screens in Figma" }, // wide (2.82:1) image, kono crop lage na
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
    image: { src: images.serviceWeb, alt: "Web development showcase: responsive website and code", ratio: 3 }, // 3:1 original, sides kata jay na
  },
  {
    id: "mobile-app-development",
    title: "Mobile App Development",
    tags: ["iOS & Android", "Cross-Platform Apps", "App UI Design", "Maintenance & Support"], // PLACEHOLDER
    image: { src: images.serviceMobile, alt: "Mobile app development showcase: banking app on a smartphone with feature cards", ratio: 3 }, // 3:1, web-er moto frame-er height soman
  },
  {
    id: "products-solution",
    title: "Products Solution",
    tags: ["MVP Development", "SaaS Platforms", "Dashboards", "Product Strategy"], // PLACEHOLDER
    image: { src: images.serviceProducts, alt: "Product solution showcase: digital product and dashboard design", ratio: 1983 / 793 }, // 2.5:1 (1983x793), frame-er cheye uchu: frame height ektu barbe, upor-niche kata jabe na
  },
  {
    id: "software-development",
    title: "Software Development",
    tags: ["Custom Software", "API Development", "Cloud & DevOps", "Quality Assurance"], // PLACEHOLDER
    image: { src: images.serviceSoftware, alt: "Software development showcase: custom software and analytics dashboard", ratio: 2132 / 738 }, // 2.89:1 (2132x738), sides kata jabe na
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