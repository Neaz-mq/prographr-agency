type IconProps = { className?: string };

export function ArrowUpRight({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" />
    </svg>
  );
}

export function ArrowUp({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  );
}

export function MenuIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={className} aria-hidden="true">
      <path d="M4 8h16M4 16h16" />
    </svg>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={className} aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

/* ---------- Projects section icons (Figma: vuesax/linear, 14px, 1px stroke) ---------- */
const lineProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

/* Badge-er blue circle-er bhitor-er white sparkle (Figma: "Our Recent Projects") */
export function SparkleIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 1.5c.7 5.9 4.6 9.8 10.5 10.5-5.9.7-9.8 4.6-10.5 10.5C11.3 16.6 7.4 12.7 1.5 12 7.4 11.3 11.3 7.4 12 1.5Z" />
    </svg>
  );
}

export function MagicPenIcon({ className }: IconProps) {
  return (
    <svg {...lineProps} className={className}>
      <path d="M3 17.5 15.5 5l3.5 3.5L6.5 21 3 17.5ZM13 7.5l3.5 3.5" />
      <path d="M8 2.5v3M6.5 4h3M21 13v3M19.5 14.5h3M4.5 8v2M3.5 9h2" />
    </svg>
  );
}

export function UsersIcon({ className }: IconProps) {
  return (
    <svg {...lineProps} className={className}>
      <circle cx="9" cy="7.5" r="3.5" />
      <path d="M2.5 20.5c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" />
      <path d="M16 4.3a3.5 3.5 0 0 1 0 6.4M18.5 14.8c1.9.7 3 2.6 3 5.2" />
    </svg>
  );
}

export function DashboardIcon({ className }: IconProps) {
  return (
    <svg {...lineProps} className={className}>
      <rect x="2.5" y="2.5" width="8" height="6" rx="2" />
      <rect x="13.5" y="2.5" width="8" height="11" rx="2" />
      <rect x="2.5" y="11" width="8" height="10.5" rx="2" />
      <rect x="13.5" y="16" width="8" height="5.5" rx="2" />
    </svg>
  );
}

/* Figma "judge" icon (24x24): 45° ghorano rounded head, divider, handle, ar base line */
export function GavelIcon({ className }: IconProps) {
  return (
    <svg {...lineProps} className={className}>
      <g transform="translate(11.53 10.04) rotate(-45)">
        <rect x="-6.8" y="-4" width="13.6" height="8" rx="1.6" />
        <path d="M-3.6 -4V4" />
      </g>
      <path d="m15.06 13.56 4.95 4.95M2 21h6" />
    </svg>
  );
}

export function ChartUpIcon({ className }: IconProps) {
  return (
    <svg {...lineProps} className={className}>
      <path d="M3 21h18M6 17v-3M11 17V9M16 17v-5" />
      <path d="m5 8 4-4 3 3 6-5M14.5 2H19v4.5" />
    </svg>
  );
}

export function LayersStackIcon({ className }: IconProps) {
  return (
    <svg {...lineProps} className={className}>
      <path d="m12 2.5 9 4.7-9 4.7-9-4.7 9-4.7Z" />
      <path d="m3 12 9 4.7 9-4.7M3 16.8l9 4.7 9-4.7" />
    </svg>
  );
}

export function TeamIcon({ className }: IconProps) {
  return (
    <svg {...lineProps} className={className}>
      <circle cx="5.5" cy="6" r="2.5" />
      <circle cx="18.5" cy="6" r="2.5" />
      <circle cx="12" cy="11.5" r="3" />
      <path d="M2 14c.5-1.6 1.8-2.5 3.5-2.5M22 14c-.5-1.6-1.8-2.5-3.5-2.5M6.5 21.5c0-2.8 2.4-4.8 5.5-4.8s5.5 2 5.5 4.8" />
    </svg>
  );
}

export function DocumentIcon({ className }: IconProps) {
  return (
    <svg {...lineProps} className={className}>
      <path d="M20 8.5v7c0 4.5-2 6.5-6.5 6.5h-3C6 22 4 20 4 15.5v-7C4 4 6 2 10.5 2h3C18 2 20 4 20 8.5Z" />
      <path d="M14.5 2v3.5c0 1.4 1.1 2.5 2.5 2.5h3M8 13h4M8 17h8" />
    </svg>
  );
}

/* ---------- Why Choose Us section icons (Figma: vuesax/bold, 30px, fill = accent) ----------
   Cutout color: icon-er bhitore "kata" ongsho (jemon badge-er gap) card-er icon box-er bg (#FAFAFA) er moto hoy.
   Onno bg-te boshale --icon-cutout CSS variable diye bodlano jay. */
const CUTOUT = "var(--icon-cutout, #FAFAFA)";

const boldProps = {
  viewBox: "0 0 30 30",
  fill: "currentColor",
  "aria-hidden": true,
} as const;

/* vuesax/bold/note: clipboard */
export function NoteBoldIcon({ className }: IconProps) {
  return (
    <svg {...boldProps} className={className}>
      <path
        fillRule="evenodd"
        d="M9.5 5.7h11A4.5 4.5 0 0 1 25 10.2V23a4.5 4.5 0 0 1-4.5 4.5h-11A4.5 4.5 0 0 1 5 23V10.2a4.5 4.5 0 0 1 4.5-4.5ZM10 14h10v1.8H10V14Zm0 4.5h6.5v1.8H10v-1.8Z"
      />
      <rect x="10" y="2.5" width="10" height="5.6" rx="2.8" style={{ stroke: CUTOUT, strokeWidth: 1.6 }} />
    </svg>
  );
}

/* vuesax/bold/layer: Figma export-er hubohu path (public/icons/layer.svg) */
export function LayerBoldIcon({ className }: IconProps) {
  return (
    <svg {...boldProps} className={className}>
      <path d="M24.2126 6.11094L16.8876 2.84844C15.8126 2.37344 14.1876 2.37344 13.1126 2.84844L5.7876 6.11094C3.9376 6.93594 3.6626 8.06094 3.6626 8.66094C3.6626 9.26094 3.9376 10.3859 5.7876 11.2109L13.1126 14.4734C13.6501 14.7109 14.3251 14.8359 15.0001 14.8359C15.6751 14.8359 16.3501 14.7109 16.8876 14.4734L24.2126 11.2109C26.0626 10.3859 26.3376 9.26094 26.3376 8.66094C26.3376 8.06094 26.0751 6.93594 24.2126 6.11094Z" />
      <path d="M14.9999 21.3C14.5249 21.3 14.0499 21.2 13.6124 21.0125L5.1874 17.2625C3.8999 16.6875 2.8999 15.15 2.8999 13.7375C2.8999 13.225 3.3124 12.8125 3.8249 12.8125C4.3374 12.8125 4.7499 13.225 4.7499 13.7375C4.7499 14.4125 5.3124 15.2875 5.9374 15.5625L14.3624 19.3125C14.7624 19.4875 15.2249 19.4875 15.6249 19.3125L24.0499 15.5625C24.6749 15.2875 25.2374 14.425 25.2374 13.7375C25.2374 13.225 25.6499 12.8125 26.1624 12.8125C26.6749 12.8125 27.0874 13.225 27.0874 13.7375C27.0874 15.1375 26.0874 16.6875 24.7999 17.2625L16.3749 21.0125C15.9499 21.2 15.4749 21.3 14.9999 21.3Z" />
      <path d="M14.9999 27.4992C14.5249 27.4992 14.0499 27.3992 13.6124 27.2117L5.1874 23.4617C3.7999 22.8492 2.8999 21.4617 2.8999 19.9367C2.8999 19.4242 3.3124 19.0117 3.8249 19.0117C4.3374 19.0117 4.7499 19.4242 4.7499 19.9367C4.7499 20.7242 5.2124 21.4367 5.9374 21.7617L14.3624 25.5117C14.7624 25.6867 15.2249 25.6867 15.6249 25.5117L24.0499 21.7617C24.7624 21.4492 25.2374 20.7242 25.2374 19.9367C25.2374 19.4242 25.6499 19.0117 26.1624 19.0117C26.6749 19.0117 27.0874 19.4242 27.0874 19.9367C27.0874 21.4617 26.1874 22.8367 24.7999 23.4617L16.3749 27.2117C15.9499 27.3992 15.4749 27.4992 14.9999 27.4992Z" />
    </svg>
  );
}

/* vuesax/bold/programming-arrow: branch + merge arrow */
export function ProgrammingArrowBoldIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 30 30" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="6" cy="5.5" r="3" />
      <circle cx="6" cy="24.5" r="3" />
      <circle cx="24" cy="24.5" r="3" />
      <path d="M6 8.5v13M24 21.5V13a5 5 0 0 0-5-5h-5M17.5 4.8 14 8l3.5 3.2" />
    </svg>
  );
}

/* vuesax/bold/status-up: bar chart in rounded square */
export function StatusUpBoldIcon({ className }: IconProps) {
  return (
    <svg {...boldProps} className={className}>
      <path
        fillRule="evenodd"
        d="M7.5 2.5h15a5 5 0 0 1 5 5v15a5 5 0 0 1-5 5h-15a5 5 0 0 1-5-5v-15a5 5 0 0 1 5-5ZM8 17h2.4v5H8v-5Zm5.8-4h2.4v9h-2.4v-9Zm5.8-4H22v13h-2.4V9Z"
      />
    </svg>
  );
}

/* vuesax/bold/note-favorite: calendar + check badge */
export function NoteFavoriteBoldIcon({ className }: IconProps) {
  return (
    <svg {...boldProps} className={className}>
      <rect x="2.5" y="4.4" width="22.5" height="23.1" rx="5" />
      <rect x="7.9" y="1.8" width="2.2" height="5" rx="1.1" style={{ stroke: CUTOUT, strokeWidth: 1.4 }} />
      <rect x="17.9" y="1.8" width="2.2" height="5" rx="1.1" style={{ stroke: CUTOUT, strokeWidth: 1.4 }} />
      <circle cx="23" cy="23" r="5.6" style={{ stroke: CUTOUT, strokeWidth: 1.8 }} />
      <path d="M20.2 23.1l1.1-1.1 1.7 1.7 3.2-3.2 1.1 1.1-4.3 4.3-2.8-2.8Z" style={{ fill: CUTOUT }} />
    </svg>
  );
}

/* ---------- Team section icons ---------- */

/* vuesax/bold/verify: blue verified badge (20px). Check ta white stroke */
export function VerifyBoldIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden="true">
      <rect x="2.4" y="2.4" width="15.2" height="15.2" rx="4.2" />
      <rect x="2.4" y="2.4" width="15.2" height="15.2" rx="4.2" transform="rotate(45 10 10)" />
      <path d="m6.9 10.2 2.2 2.2 4-4.3" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* akar-icons:linkedin-fill (Figma: 20px box, glyph 8.33% padding) */
export function LinkedinIcon({ className }: IconProps) {
  return (
    <svg viewBox="-2 -2 28 28" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

/* vuesax/linear/arrow-right (16px). Prev button-e -scale-x-100 diye ulte nao */
export function ChevronRightIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="m5.94 2.72 4.73 5.28-4.73 5.28" />
    </svg>
  );
}

/* ---------- MoodMap / Finora card tag icons (Figma: vuesax/linear, 14px) ---------- */
export function EmojiHappyIcon({ className }: IconProps) {
  return (
    <svg {...lineProps} className={className}>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M8.5 9.3v1.4M15.5 9.3v1.4" />
      <path d="M8.2 14.2c.9 1.9 2.2 2.8 3.8 2.8s2.9-.9 3.8-2.8z" />
    </svg>
  );
}

export function CoinIcon({ className }: IconProps) {
  return (
    <svg {...lineProps} className={className}>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M8.4 9a4.6 4.6 0 0 0 0 6M15.6 9a4.6 4.6 0 0 1 0 6" />
      <path d="M10 12h4M12 9.6v4.8" />
    </svg>
  );
}

export function WalletIcon({ className }: IconProps) {
  return (
    <svg {...lineProps} className={className}>
      <path d="M17.5 7.5V6.2c0-1.2-1-2.2-2.2-2.2H6.5A3.5 3.5 0 0 0 3 7.5" />
      <rect x="3" y="7.5" width="18" height="13" rx="3.5" />
      <path d="M21 12.5h-4a2 2 0 0 0 0 4h4M7.5 14h4" />
    </svg>
  );
}

export function MagicStarIcon({ className }: IconProps) {
  return (
    <svg {...lineProps} className={className}>
      <path d="M10.5 3.5l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" />
      <path d="M19 16.5v4M17 18.5h4" />
    </svg>
  );
}