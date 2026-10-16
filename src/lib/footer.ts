/* Footer menus: 4ti column (Navigation / Services / Resources / Company), kono column-er link repeat hoy na.
   href gulo page-er section id-r sathe mile (#services, #projects, #team, #testimonials, #faq, #contact, #why-choose-us). */
export type FooterColumn = { title: string; links: { label: string; href: string }[] };

export const footerColumns: FooterColumn[] = [
  {
    title: "Navigation",
    links: [
      { label: "Features", href: "#services" },
      { label: "How it works", href: "#why-choose-us" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "UI UX Design", href: "#services" },
      { label: "Web Development", href: "#services" },
      { label: "Brand Identity", href: "#services" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Our Work", href: "#projects" },
      { label: "Testimonials", href: "#testimonials" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#team" },
      { label: "Privacy", href: "#" },
      { label: "Contact", href: "#contact" },
    ],
  },
];

export const footerSocials = [
  { name: "Dribbble", href: "https://dribbble.com/" },
  { name: "Behance", href: "https://www.behance.net/" },
  { name: "Instagram", href: "https://www.instagram.com/" },
  { name: "LinkedIn", href: "https://www.linkedin.com/" },
  { name: "Facebook", href: "https://www.facebook.com/" },
  { name: "X", href: "https://x.com/" },
] as const;

export type SocialName = (typeof footerSocials)[number]["name"];

export const footerPartners = [
  { id: "framer", label: "Professional Partner" },
  { id: "webflow", label: "Professional Partner" },
  { id: "behance", label: "Top Team On Behance" },
  { id: "dribbble", label: "Top Team On Dribbble" },
  { id: "clutch", label: "Reviewed On", stars: true },
  { id: "google", label: "Reviewed On", stars: true },
] as const;