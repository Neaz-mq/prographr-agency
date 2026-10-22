/* Footer menus: 4ti column (Navigation / Services / Resources / Company), kono column-er link repeat hoy na.
   href gulo page-er section id-r sathe mile ("/#team" = home-er section, onno page theke holeo kaj kore) (#services, #projects, #team, #testimonials, #faq, #contact, #why-choose-us). */
export type FooterColumn = {
  title: string;
  links: { label: string; href: string }[];
};

export const footerColumns: FooterColumn[] = [
  {
    title: "Navigation",
    links: [
      { label: "Features", href: "/services" },
      { label: "Why Choose Us", href: "/#why-choose-us" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "UI UX Design", href: "/services#ui-ux-design" },
      { label: "Web Development", href: "/services#web-development" },
      { label: "Brand Identity", href: "/services#brand-identity-design" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Our Work", href: "/projects" },
      { label: "Testimonials", href: "#testimonials" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Brands", href: "/#trusted-by" },
      { label: "Our Team", href: "/#team" },
      { label: "Contact", href: "#contact" },
    ],
  },
];

export const footerSocials = [
  { name: "Dribbble", href: "https://dribbble.com/prographr" },
  { name: "Behance", href: "https://www.behance.net/prographr" },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/prographr/" },
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