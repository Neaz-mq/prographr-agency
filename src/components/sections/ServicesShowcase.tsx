import type { ComponentType } from "react";
import { CloudImage } from "@/components/ui/CloudImage";
import { RevealOnView } from "@/components/ui/RevealOnView";
import { Container } from "@/components/ui/Container";
import { reveal } from "@/lib/reveal";

/* Figma: "Desktop - 2014" (1440 x 2296). bg #FAFAFA, padding 100 80, column, gap 60.
   Protita row (1280 x 479): row, gap 24 = [white card 453 x 479, radius 20, padding 24, space-between] + [panel 802 x 479, bg #F0F0F0, radius 20]
   Card: title 24/120%/500 + desc 16/150% rgba(0,0,0,.7) (gap 6) | 3-4 ta chip (bg #FAFAFA, radius 12, padding 10 16, gap 6, text 18/160%)
   Panel: screenshot panel-er upor theke ~35px niche, panel-er bhitore overflow hidden (niche kete jay). Position % = Figma px / 802 (ba 479). */

type IconName = "design" | "mobile" | "trend" | "note";

type Service = {
  /* Nav "Services" hover menu-r link (/services#id) ei id-te scroll kore */
  id: string;
  title: string;
  description: string;
  items: { label: string; icon: IconName }[];
  /* Cloudinary public id (version shoho) */
  image: string;
  alt: string;
  /* Figma: panel width / top (%). White border + radius PNG-r bhitorei ache, tai CSS-e dewa hoy na */
  imageWidth: number;
  imageTop: number;
};

const services: Service[] = [
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    description:
      "We design intuitive, engaging digital experiences that make products easier to use and more enjoyable every user.",
    items: [
      { label: "Web Design", icon: "design" },
      { label: "Web/Mobile Application Design", icon: "mobile" },
      { label: "SAAS Design", icon: "trend" },
      { label: "UX/UI Audit", icon: "note" },
    ],
    image: "v1792250321/image_6350935_qk8ktj.png",
    alt: "UI/UX design preview: a landing page with the headline Building the future with AI and strategy",
    imageWidth: 92.07,
    imageTop: 7.47,
  },
  {
    id: "brand-identity-design",
    title: "Brand Identity Design",
    description: "We build distinctive brand identities that communicate your values, strengthen recognition.",
    items: [
      { label: "Logo & Branding Strategy", icon: "design" },
      { label: "Corporate Identity Design", icon: "mobile" },
      { label: "Content Design", icon: "trend" },
    ],
    image: "v1792250384/image_6349884_zamyaa.png",
    alt: "Brand identity preview: logo, colour and photography board for a brand",
    imageWidth: 93.14,
    imageTop: 5.75,
  },
  {
    id: "web-development",
    title: "Web development",
    description:
      "We build fast, scalable, and high-performing websites that deliver seamless experiences across every device.",
    items: [
      { label: "Web Development", icon: "design" },
      { label: "E-commerce Development", icon: "mobile" },
      { label: "Saas Product Development", icon: "trend" },
    ],
    image: "v1792250895/Header_ix5poj.png",
    alt: "Web development preview: a banking website with the headline Powerful Features for a Smarter Banking Experience",
    imageWidth: 92.55,
    imageTop: 7.47,
  },
  {
    id: "mobile-app-development",
    title: "Mobile App Development",
    description:
      "We turn ideas into powerful mobile applications that are intuitive, reliable, and built for real-world use.",
    items: [
      { label: "iOS App Development", icon: "design" },
      { label: "Android App Development", icon: "mobile" },
      { label: "Cross-Platform App Development", icon: "trend" },
    ],
    image: "v1792250951/Untitled_1_1_ya0x2h.png",
    alt: "Mobile app preview: three phone screens of a wellness app",
    imageWidth: 89.78,
    imageTop: 7.42,
  },
];

/* Figma-r exact vuesax/linear icon (24px, 1.5px stroke). Protita icon alada component */
const svgProps = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  className: "size-6 shrink-0",
  "aria-hidden": true,
} as const;

const stroke = { strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", stroke: "black" } as const;
const strokeMiter = { ...stroke, strokeMiterlimit: 10 } as const;

function DesignIcon() {
  return (
    <svg {...svgProps}>
      <path d="M21.81 3.94183C20.27 7.78183 16.41 13.0018 13.18 15.5918L11.21 17.1718C10.96 17.3518 10.71 17.5118 10.43 17.6218C10.43 17.4418 10.42 17.2418 10.39 17.0518C10.28 16.2118 9.90002 15.4318 9.23002 14.7618C8.55002 14.0818 7.72002 13.6818 6.87002 13.5718C6.67002 13.5618 6.47002 13.5418 6.27002 13.5618C6.38002 13.2518 6.55002 12.9618 6.76002 12.7218L8.32002 10.7518C10.9 7.52183 16.14 3.64183 19.97 2.11183C20.56 1.89183 21.13 2.05183 21.49 2.42183C21.87 2.79183 22.05 3.36183 21.81 3.94183Z" {...stroke} />
      <path d="M10.43 17.6188C10.43 18.7188 10.01 19.7688 9.22003 20.5688C8.61003 21.1788 7.78003 21.5988 6.79003 21.7288L4.33003 21.9988C2.99003 22.1488 1.84003 21.0088 2.00003 19.6488L2.27003 17.1888C2.51003 14.9988 4.34003 13.5988 6.28003 13.5588C6.48003 13.5488 6.69003 13.5588 6.88003 13.5688C7.73003 13.6788 8.56003 14.0688 9.24003 14.7588C9.91003 15.4288 10.29 16.2088 10.4 17.0488C10.41 17.2388 10.43 17.4288 10.43 17.6188Z" {...stroke} />
      <path d="M14.24 14.4683C14.24 11.8583 12.12 9.73828 9.51001 9.73828" {...stroke} />
      <path d="M20.12 12.7305L20.86 13.4605C22.35 14.9505 22.35 16.4205 20.86 17.9105L17.9 20.8705C16.43 22.3405 14.94 22.3405 13.47 20.8705" strokeWidth={1.5} strokeLinecap="round" stroke="black" />
      <path d="M3.10995 10.5086C1.63995 9.01859 1.63995 7.54859 3.10995 6.05859L6.06995 3.09859C7.53995 1.62859 9.02995 1.62859 10.4999 3.09859L11.2399 3.83859" strokeWidth={1.5} strokeLinecap="round" stroke="black" />
      <path d="M11.25 3.85156L7.55005 7.55156" strokeWidth={1.5} strokeLinecap="round" stroke="#292D32" />
      <path d="M20.12 12.7305L17.16 15.6805" strokeWidth={1.5} strokeLinecap="round" stroke="#292D32" />
    </svg>
  );
}

function MobileIcon() {
  return (
    <svg {...svgProps}>
      <path d="M8.92993 2L8.95993 3.53003C8.97993 4.34003 9.64993 5 10.4599 5H13.4799C14.3099 5 14.9799 4.32 14.9799 3.5V2" {...strokeMiter} />
      <path d="M17 17L15 19L17 21" {...strokeMiter} />
      <path d="M20 17L22 19L20 21" {...strokeMiter} />
      <path d="M13 22H8C4.5 22 3 20 3 17V7C3 4 4.5 2 8 2H16C19.5 2 21 4 21 7V14" {...strokeMiter} />
    </svg>
  );
}

function TrendIcon() {
  return (
    <svg {...svgProps}>
      <path d="M16.5 9.5L12.3 13.7L10.7 11.3L7.5 14.5" {...stroke} />
      <path d="M14.5 9.5H16.5V11.5" {...stroke} />
      <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" {...stroke} />
    </svg>
  );
}

function NoteIcon() {
  return (
    <svg {...svgProps}>
      <path d="M9.56006 18V13" {...strokeMiter} />
      <path d="M12 15.5H7" {...strokeMiter} />
      <path d="M8 2V5" {...strokeMiter} />
      <path d="M16 2V5" {...strokeMiter} />
      <path d="M15.81 3.42188C19.15 3.54187 20.84 4.77188 20.94 9.47188L21.07 15.6419C21.15 19.7619 20.2 21.8319 15.2 21.9419L9.19996 22.0619C4.19996 22.1619 3.15996 20.1219 3.07996 16.0119L2.93996 9.83187C2.83996 5.13188 4.48996 3.83187 7.80996 3.58187L15.81 3.42188Z" {...strokeMiter} />
    </svg>
  );
}

const icons: Record<IconName, ComponentType> = {
  design: DesignIcon,
  mobile: MobileIcon,
  trend: TrendIcon,
  note: NoteIcon,
};

function ChipIcon({ name }: { name: IconName }) {
  const Icon = icons[name];
  return <Icon />;
}

export function ServicesShowcase() {
  return (
    <section aria-label="Our services in detail" className="bg-[#FAFAFA] py-16 md:py-[6.25rem]">
      <Container>
        <ul className="flex flex-col gap-6 md:gap-[3.75rem]">
          {services.map((service) => (
            <li key={service.id} id={service.id} className="scroll-mt-24">
              <RevealOnView threshold={0.15}>
                <article
                  className="sr-up grid gap-4 lg:grid-cols-[28.3125rem_1fr] lg:gap-6"
                  style={reveal(0, { duration: 900, y: 36 })}
                >
                  {/* Left: white card */}
                  <div className="flex flex-col justify-between gap-8 rounded-[1.25rem] bg-white p-5 sm:p-6 lg:gap-[6.6875rem]">
                    <div className="flex flex-col gap-1.5">
                      <h3 className="text-2xl font-medium leading-[1.2] text-black">{service.title}</h3>
                      <p className="text-base leading-[1.5] text-black/70">{service.description}</p>
                    </div>
                    <ul className="flex flex-col gap-3">
                      {service.items.map((item) => (
                        <li
                          key={item.label}
                          className="flex items-center gap-1.5 rounded-xl bg-[#FAFAFA] px-4 py-2.5 text-black"
                        >
                          <ChipIcon name={item.icon} />
                          <span className="text-base leading-[1.6] sm:text-[1.125rem]">{item.label}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right: grey panel, screenshot upor theke ~35px niche, niche kete jay (overflow-hidden) */}
                  <div className="relative aspect-[802/479] overflow-hidden rounded-[1.25rem] bg-[#F0F0F0]">
                    <div
                      className="absolute left-1/2 -translate-x-1/2"
                      style={{ width: `${service.imageWidth}%`, top: `${service.imageTop}%` }}
                    >
                      <CloudImage
                        src={service.image}
                        alt={service.alt}
                        width={1500}
                        height={1200}
                        sizes="(min-width: 1280px) 740px, 92vw"
                        className="block h-auto w-full"
                      />
                    </div>
                  </div>
                </article>
              </RevealOnView>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}