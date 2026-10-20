"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { RevealOnView } from "@/components/ui/RevealOnView";
import { RollButton } from "@/components/ui/RollButton";
import { cn } from "@/lib/utils";
import { reveal } from "@/lib/reveal";

/* Figma: "Desktop - 2014" (1440 x 1081 hug), bg #FAFAFA, padding 100px 80px, gap 60px.
   1) Tab row (1280 x 40, center, gap 16): chip 40px high, padding 12 16, radius 12, text 16px / 100% / 500.
      Active = bg #121212 + inset shadow (3 3 10 rgba(255,255,255,.2)) + white text. Baki = bg #F0F0F0 + text #121212.
   2) Card row (gap 24, 3 ta soman column, 410.67px each). Protita column = upore ekta "label" tab (Launch / Most Popular / Custom) + niche shada card.
      - Label: 410.67 x 237, radius 30, padding 12 10 16, text 20px / 100% / 500 center. Figma-te -193px margin diye shada card-er pichone dhuke thake,
        shudhu upor-er 44px dekha jay. Tai ekhane label absolute (237px lomba) ar card 44px niche theke shuru (pt-11) hoy.
        Shada card-er upor-er duto kon (radius 20) theke label-er gray/kalo kon (radius 30) dekha jay, Figma-r moto.
      - Card: bg #FFF, radius 20, padding 20, gap 28, 737px. Ordering: info (gap 24) -> divider (1px #F0F0F0) -> list + button (space-between)
        Info: title 24px/100%/500 + sub 16px/100% rgba(18,18,18,.7) (gap 12); price 30px/100%/500 + unit 16px (gap 13, items-end);
        "Add Development" box (bg #FAFAFA, radius 16, padding 16, gap 10, toggle 33 x 17).
        List: "What's included:" 16px/500 #000, gap 26, tick-circle 18px + text 16px/100% rgba(0,0,0,.7) (row gap 12, list gap 20).
        Button: 370.67 x 46, padding 6 6 6 16, radius 12, 34px white arrow box. Launch/Custom = bg #FAFAFA, Most Popular = bg #000. */

const TABS = ["Website", "Web App", "Mobile App", "Branding", "Graphic Design"] as const;
type Tab = (typeof TABS)[number];

type Plan = {
  tag: string;
  title: string;
  description: string;
  /* value = USD number, from = "From" prefix dekhabe kina. Add-on toggle on hole value + addon.extra dekhay */
  price?: { value: number; from?: boolean; unit: string };
  /* extra = toggle on hole price-e jog hoy (USD). detail text-e (+$xxx) alada kore lekha thake */
  addon?: { label: string; detail: string; extra: number };
  features: string[];
  popular?: boolean;
};

/* Figma-te shudhu "Website" tab-er content ache. */
const websitePlans: Plan[] = [
  {
    tag: "Launch",
    title: "Landing Page",
    description: "Get your MVP live and validated, fast",
    price: { value: 1000, from: true, unit: "One-time" },
    addon: { label: "Add Development", detail: "React.js/Next.js or No Code (+$850)", extra: 850 },
    features: [
      "Website copy and wireframes",
      "Custom, conversion-focused design",
      "Visual assets, custom illustrations",
      "Motion and interactive animations",
      "2 rounds of revisions included.",
      "Responsive on all devices",
      "10-14 Days turnaround time",
    ],
  },
  {
    tag: "Most Popular",
    title: "Dedicated Team",
    description: "Your on-demand product team, always shipping",
    price: { value: 5490, unit: "/month" },
    addon: { label: "Add Development", detail: "Full-stack developer (+$2,000/mo)", extra: 2000 },
    features: [
      "2 senior designers",
      "Unlimited requests, 2 active at a time",
      "Access to all design services",
      "Dedicated project manager",
      "Unlimited revisions",
      "Updates every 48 hours",
      "End-to-end project management",
      "Slack, Discord, or WhatsApp access",
      "Pause or cancel anytime, no lock-in",
    ],
    popular: true,
  },
  {
    tag: "Custom",
    title: "Custom Project",
    description: "For larger, complex products that need a tailored plan.",
    features: [
      "Design plus full custom development",
      "Design systems and architecture",
      "Multiple concurrent projects",
      "Built with React, Next.js, and Node.js",
      "Go-to-market strategy plan",
      "Predefined scope of work (SOW)",
      "Framer or Webflow option available",
      "Custom scope, timeline, and quote",
      "Priority support and maintenance",
      "50/25/25 or milestone-based payment",
    ],
  },
];

/* Web App: product design (SaaS, dashboard, MVP) + optional development.
   Market reference (international agencies, USD): MVP design 4-8k, design subscription 5-8k/mo, full custom build 25k+. */
const webAppPlans: Plan[] = [
  {
    tag: "Launch",
    title: "MVP Design",
    description: "Design your SaaS or dashboard, ready to build",
    price: { value: 4500, from: true, unit: "One-time" },
    addon: { label: "Add Development", detail: "Next.js + Node.js backend (+$6,500)", extra: 6500 },
    features: [
      "User flows and product wireframes",
      "High-fidelity UI/UX for up to 12 screens",
      "Clickable, interactive prototype",
      "Starter design system and UI kit",
      "2 rounds of revisions included.",
      "Developer-ready Figma handoff",
      "3-4 Weeks turnaround time",
    ],
  },
  {
    tag: "Most Popular",
    title: "Dedicated Team",
    description: "Your product squad for ongoing releases",
    price: { value: 6490, unit: "/month" },
    addon: { label: "Add Development", detail: "Full-stack developer (+$2,500/mo)", extra: 2500 },
    features: [
      "2 senior product designers",
      "Unlimited requests, 2 active at a time",
      "UX research and usability testing",
      "Design system maintenance",
      "Dedicated project manager",
      "Unlimited revisions",
      "Weekly demos, updates every 48 hours",
      "Slack, Discord, or WhatsApp access",
      "Pause or cancel anytime, no lock-in",
    ],
    popular: true,
  },
  {
    tag: "Custom",
    title: "Custom Project",
    description: "For complex platforms that need a tailored plan.",
    features: [
      "Product strategy and technical discovery",
      "Design plus full web app development",
      "Scalable architecture and APIs",
      "Auth, payments, and integrations",
      "Admin dashboards and user roles",
      "Built with React, Next.js, and Node.js",
      "QA testing and performance tuning",
      "Cloud deployment and CI/CD setup",
      "Post-launch support and maintenance",
      "50/25/25 or milestone-based payment",
    ],
  },
];

/* Mobile App: iOS + Android design + optional development.
   Market reference (USD): app design 5-10k, cross-platform MVP build 20k+, native builds 40k+. */
const mobileAppPlans: Plan[] = [
  {
    tag: "Launch",
    title: "MVP Design",
    description: "Design your iOS and Android app, fast",
    price: { value: 5000, from: true, unit: "One-time" },
    addon: { label: "Add Development", detail: "React Native or Flutter (+$8,000)", extra: 8000 },
    features: [
      "User flows and app wireframes",
      "High-fidelity UI for iOS and Android",
      "Up to 15 screens designed",
      "Interactive, tappable prototype",
      "App icon and store listing visuals",
      "2 rounds of revisions included.",
      "4-5 Weeks turnaround time",
    ],
  },
  {
    tag: "Most Popular",
    title: "Dedicated Team",
    description: "Your on-demand mobile team, always shipping",
    price: { value: 6990, unit: "/month" },
    addon: { label: "Add Development", detail: "Mobile developer (+$3,000/mo)", extra: 3000 },
    features: [
      "2 senior product designers",
      "Unlimited requests, 2 active at a time",
      "iOS and Android design guidelines",
      "Prototyping and usability testing",
      "Dedicated project manager",
      "Unlimited revisions",
      "Updates every 48 hours",
      "Slack, Discord, or WhatsApp access",
      "Pause or cancel anytime, no lock-in",
    ],
    popular: true,
  },
  {
    tag: "Custom",
    title: "Custom Project",
    description: "For larger apps that need a tailored plan.",
    features: [
      "Design plus full app development",
      "Native or cross-platform development",
      "React Native, Flutter, Swift, or Kotlin",
      "Backend, APIs, and database setup",
      "Push notifications and in-app payments",
      "App Store and Google Play submission",
      "QA testing on real devices",
      "Predefined scope of work (SOW)",
      "Post-launch support and maintenance",
      "50/25/25 or milestone-based payment",
    ],
  },
];

/* Branding: identity projects are one-time. Market reference (USD): logo + basics 1-3k, full identity 4-12k, rebrand 15k+. */
const brandingPlans: Plan[] = [
  {
    tag: "Launch",
    title: "Brand Essentials",
    description: "A sharp identity to start with confidence",
    price: { value: 1500, from: true, unit: "One-time" },
    addon: { label: "Add Brand Guidelines", detail: "Full brand book PDF (+$900)", extra: 900 },
    features: [
      "Brand discovery workshop",
      "Logo design, 3 initial concepts",
      "Color palette and typography",
      "Logo suite: primary, icon, and mono",
      "2 rounds of revisions included.",
      "All source and export files",
      "7-10 Days turnaround time",
    ],
  },
  {
    tag: "Most Popular",
    title: "Brand Identity",
    description: "A complete identity that stands out",
    price: { value: 4500, from: true, unit: "One-time" },
    addon: { label: "Add Brand Collateral", detail: "Stationery and social kit (+$1,200)", extra: 1200 },
    features: [
      "Brand strategy and positioning",
      "Competitor and market research",
      "Logo design, 5 initial concepts",
      "Complete visual identity system",
      "Brand voice and messaging pillars",
      "Complete brand guidelines (PDF)",
      "Social media templates",
      "3 rounds of revisions included.",
      "3-4 Weeks turnaround time",
    ],
    popular: true,
  },
  {
    tag: "Custom",
    title: "Full Rebrand",
    description: "For rebrands and larger brands needing a custom plan.",
    features: [
      "Brand audit and stakeholder workshops",
      "Naming and tagline development",
      "Brand architecture and strategy",
      "Complete visual identity system",
      "Illustration and iconography set",
      "Motion logo and brand animations",
      "Packaging and collateral design",
      "Brand launch rollout plan",
      "Dedicated brand manager",
      "50/25/25 or milestone-based payment",
    ],
  },
];

/* Graphic Design: per-project + flat-rate subscription. Market reference (USD): single project 300-1,000, subscription 1,000-3,000/mo. */
const graphicDesignPlans: Plan[] = [
  {
    tag: "Launch",
    title: "Design Project",
    description: "Print and digital designs, delivered fast",
    price: { value: 490, from: true, unit: "One-time" },
    addon: { label: "Add Rush Delivery", detail: "48-hour turnaround (+$250)", extra: 250 },
    features: [
      "Brief review and creative direction",
      "Up to 5 custom designs",
      "Social posts, flyers, or brochures",
      "Print-ready and web-optimized files",
      "2 rounds of revisions included.",
      "Editable source files included",
      "3-5 Days turnaround time",
    ],
  },
  {
    tag: "Most Popular",
    title: "Design Subscription",
    description: "Unlimited design, one flat monthly fee",
    price: { value: 1990, unit: "/month" },
    addon: { label: "Add Motion Graphics", detail: "Animated social and video (+$800/mo)", extra: 800 },
    features: [
      "1 dedicated senior designer",
      "Unlimited requests, 1 active at a time",
      "Social, ads, decks, and print design",
      "24-48 hour turnaround per request",
      "Unlimited revisions",
      "Brand consistency across all assets",
      "Shared task board and Slack access",
      "Editable source files included",
      "Pause or cancel anytime, no lock-in",
    ],
    popular: true,
  },
  {
    tag: "Custom",
    title: "Custom Project",
    description: "For campaigns and large-volume design needs.",
    features: [
      "Campaign and creative direction",
      "Multi-channel design systems",
      "Packaging and label design",
      "Pitch decks and annual reports",
      "Infographics and data visualization",
      "Illustration and icon sets",
      "Print production support",
      "Dedicated design lead",
      "Custom scope, timeline, and quote",
      "Priority support",
    ],
  },
];

const plansByTab: Record<Tab, Plan[]> = {
  Website: websitePlans,
  "Web App": webAppPlans,
  "Mobile App": mobileAppPlans,
  Branding: brandingPlans,
  "Graphic Design": graphicDesignPlans,
};

/* vuesax/linear/tick-circle: Figma-te 18 x 18 box, stroke 1.2px #000. Vector: circle inset 8.33% (r 7.5), tick = 32.29% / 38.22% inset.
   Native 18px viewBox-e (scale chhara) aanka, tai pixel-e boshe, edge bhange na. */
function TickCircle() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      shapeRendering="geometricPrecision"
      aria-hidden="true"
      className="block size-[1.125rem] shrink-0 text-black"
    >
      <circle cx="9" cy="9" r="7.5" />
      <path d="M5.8125 9L7.935 11.1225L12.1875 6.8775" />
    </svg>
  );
}

/* Explicit "en-US": server ar browser-e ek-i format (hydration mismatch hoy na) */
function formatUsd(n: number) {
  return `$${n.toLocaleString("en-US")}`;
}

function PlanCard({ plan, index }: { plan: Plan; index: number }) {
  const [addDev, setAddDev] = useState(false);

  return (
    <RevealOnView className="h-full" threshold={0.1}>
      <div className="sr-up relative h-full pt-11" style={reveal(index * 120, { duration: 800, y: 24 })}>
        {/* Label tab: 237px lomba, shada card-er pichone (shudhu upor-er 44px dekha jay) */}
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-x-0 top-0 h-[14.8125rem] rounded-[1.875rem] px-2.5 pb-4 pt-3 text-center text-xl font-medium leading-none",
            plan.popular ? "bg-black text-white" : "bg-chip text-ink"
          )}
        >
          {plan.tag}
        </div>

        <article
          aria-label={`${plan.tag}: ${plan.title}`}
          className="relative flex h-full flex-col gap-7 rounded-[1.25rem] bg-white p-5"
        >
          <span className="sr-only">{plan.tag}</span>

          {/* Info */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <h3 className="text-2xl font-medium leading-none text-ink">{plan.title}</h3>
              <p className="text-base leading-none text-ink/70">{plan.description}</p>
            </div>

            {plan.price ? (
              <p aria-live="polite" className="flex items-end gap-[0.8125rem]">
                <span className="text-[1.875rem] font-medium leading-none text-ink">
                  {plan.price.from ? "From " : ""}
                  {formatUsd(plan.price.value + (addDev && plan.addon ? plan.addon.extra : 0))}
                </span>
                <span className="text-base leading-none text-ink/70">{plan.price.unit}</span>
              </p>
            ) : null}

            {plan.addon ? (
              <div className="flex flex-col gap-2.5 rounded-2xl bg-[#FAFAFA] p-4">
                <div className="flex items-center justify-between gap-4">
                  <span id={`addon-${plan.tag}`} className="text-base font-medium leading-none text-ink">
                    {plan.addon.label}
                  </span>
                  {/* Figma "Frame 2147237448": 33 x 17, padding 2, radius 100, bg #F0F0F0 + knob 13 x 13.
                      Knob ekhon SVG na, CSS rounded-full span (SVG rect fractional size-e edge bhange).
                      Knob transform diye na, margin diye soray (transform/compositing layer-e edge bhange) */}
                  <button
                    type="button"
                    role="switch"
                    aria-checked={addDev}
                    aria-labelledby={`addon-${plan.tag}`}
                    onClick={() => setAddDev((v) => !v)}
                    className={cn(
                      "flex h-[1.0625rem] w-[2.0625rem] shrink-0 items-center rounded-full p-0.5 transition-colors duration-300",
                      addDev ? "bg-black" : "bg-chip"
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "block aspect-square size-[0.8125rem] shrink-0 rounded-full transition-[margin,background-color] duration-300",
                        addDev ? "ml-4 bg-white" : "ml-0 bg-black"
                      )}
                    />
                  </button>
                </div>
                <p className="text-base leading-none text-ink/70">{plan.addon.detail}</p>
              </div>
            ) : null}
          </div>

          <div aria-hidden="true" className="h-px w-full bg-chip" />

          {/* List + button: card-er baki jayga bhore, button shobsomoy niche */}
          <div className="flex flex-1 flex-col justify-between gap-[1.5625rem]">
            <div className="flex flex-col gap-[1.625rem]">
              <p className="text-base font-medium leading-none text-black">What&rsquo;s included:</p>
              <ul className="flex flex-col gap-5">
                {plan.features.map((feature, i) => (
                  <li key={`${feature}-${i}`} className="flex items-center gap-3">
                    <TickCircle />
                    <span className="text-base leading-none text-black/70">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <RollButton
              href="/contact#contact" /* /contact page-er form section-e (id="contact") direct niye jay, pricing page-er nicher CTA-te na */
              className={cn(
                "w-full justify-between pr-1.5! h-[2.875rem]!",
                plan.popular ? "bg-black!" : "bg-[#FAFAFA]! text-black!"
              )}
            >
              Start Your Project
            </RollButton>
          </div>
        </article>
      </div>
    </RevealOnView>
  );
}

export function PricingPlans() {
  const [active, setActive] = useState<Tab>("Website");
  const plans = plansByTab[active];

  return (
    <section id="pricing-plans" aria-label="Pricing plans" className="bg-[#FAFAFA] py-16 md:py-[6.25rem]">
      <Container className="flex flex-col gap-10 md:gap-[3.75rem]">
        {/* Tab row: desktop-e majhkhane, choto screen-e scroll hoy */}
        <ul
          role="list"
          aria-label="Pricing category"
          className="mx-auto flex w-fit max-w-full gap-4 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {TABS.map((tab) => {
            const isActive = tab === active;
            return (
              <li key={tab} className="shrink-0">
                <button
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActive(tab)}
                  className={cn(
                    "flex h-10 items-center justify-center rounded-xl px-4 text-base font-medium leading-none transition-colors duration-300",
                    isActive
                      ? "bg-ink text-white shadow-[inset_3px_3px_10px_rgba(255,255,255,0.2)]"
                      : "bg-chip text-ink hover:bg-[#e6e6e6]"
                  )}
                >
                  {tab}
                </button>
              </li>
            );
          })}
        </ul>

        {/* key={active}: tab bodlale card-er toggle state reset hoy */}
        <div key={active} className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <PlanCard key={plan.tag} plan={plan} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}