import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";
import { FooterLink } from "@/components/layout/FooterLink";
import { NewsletterForm } from "@/components/layout/NewsletterForm";
import { CurrentYear } from "@/components/layout/CurrentYear";
import { RevealOnView } from "@/components/ui/RevealOnView";
import { reveal } from "@/lib/reveal";
import { footerColumns, footerPartners, footerSocials, type SocialName } from "@/lib/footer";

/* Figma: Footer "Container" (1280 x 487.97), column, gap 78.
   1) Content (row, space-between): left 381px (logo + text + newsletter) | right 726px (4 menu columns + social icons, space-between, items-end)
   2) Partners row (67.97px, space-between)
   3) Bottom bar (20px): Terms & Conditions | (c) 2026 | Privacy Policy
   Text color: #000 (heading/link), link opacity .7, partner + bottom text #525252 */

/* ---------- Social icons (42 x 42, #F0F0F0, radius 8) ----------
   Figma theke export kora asol SVG path (viewBox 0 0 42 42). Background (#F0F0F0, radius 8) <a> tag diye ashe,
   tai ekhane shudhu glyph path ache. */
function Glyph({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 42 42" fill="none" className="size-full" aria-hidden="true">
      <path d={d} fill="black" />
    </svg>
  );
}

const socialIcons: Record<SocialName, React.ReactNode> = {
  Dribbble: (
    <Glyph d="M21.9843 9.28125C19.736 9.28125 17.5384 9.94792 15.6691 11.1969C13.7998 12.446 12.3428 14.2213 11.4825 16.2983C10.6221 18.3754 10.397 20.6609 10.8356 22.866C11.2742 25.071 12.3568 27.0964 13.9465 28.6861C15.5363 30.2759 17.5617 31.3584 19.7667 31.797C21.9717 32.2356 24.2572 32.0105 26.3343 31.1501C28.4113 30.2898 30.1867 28.8329 31.4357 26.9636C32.6847 25.0943 33.3514 22.8966 33.3514 20.6483C33.3482 17.6345 32.1496 14.7452 30.0185 12.6141C27.8875 10.4831 24.9981 9.28443 21.9843 9.28125ZM31.5643 19.7936C31.286 19.7805 31.0073 19.7739 30.7282 19.7739C29.1062 19.7744 27.4915 19.989 25.9256 20.4123C25.5439 19.2795 25.0515 18.1871 24.4556 17.1508C26.0098 16.2136 27.4167 15.0515 28.6308 13.7024C30.3153 15.3096 31.358 17.4745 31.5643 19.7936ZM27.2612 12.6105C26.1691 13.8106 24.9067 14.8439 23.5145 15.6774C22.3484 14.0362 20.9223 12.5964 19.2923 11.4148C20.6294 11.0244 22.0355 10.9292 23.4131 11.1356C24.7907 11.3421 26.107 11.8453 27.2711 12.6105H27.2612ZM17.3555 12.2192C19.1421 13.3443 20.6997 14.7973 21.946 16.5015C19.7646 17.5069 17.3911 18.0268 14.9891 18.0252C14.2479 18.0248 13.5074 17.9755 12.7726 17.8777C13.5037 15.4659 15.1483 13.4354 17.3555 12.2192ZM12.366 20.6483C12.3659 20.2964 12.3853 19.9446 12.4239 19.5947C13.2738 19.714 14.1309 19.7739 14.9891 19.7739C17.7321 19.7765 20.4407 19.164 22.9155 17.9815C23.4608 18.923 23.9114 19.9164 24.261 20.9467C23.3321 21.2957 22.4333 21.7197 21.5734 22.2147C19.1742 23.6006 17.1173 25.5078 15.5542 27.7954C14.5505 26.895 13.7478 25.7931 13.1985 24.5616C12.6491 23.3302 12.3655 21.9968 12.366 20.6483ZM16.9565 28.8457C18.3756 26.7469 20.2534 24.9981 22.4478 23.7317C23.1814 23.3083 23.9469 22.9428 24.7376 22.6387C25.0081 23.8393 25.1448 25.0662 25.1452 26.2969C25.1458 27.4934 25.0179 28.6866 24.7638 29.8557C23.4649 30.2481 22.0976 30.361 20.7519 30.1869C19.4064 30.0128 18.1128 29.5558 16.9565 28.8457ZM26.6907 29.0349C26.8256 28.1302 26.8936 27.217 26.894 26.3024C26.8939 24.8868 26.7306 23.4759 26.4076 22.0976C27.8164 21.7175 29.269 21.5242 30.7282 21.5227C31.0051 21.5227 31.2823 21.5296 31.5599 21.5435C31.4136 23.0924 30.8942 24.5828 30.0462 25.8873C29.1983 27.1917 28.0469 28.2713 26.6907 29.0338V29.0349Z" />
  ),
  Behance: (
    <Glyph d="M23.8637 16.0177C23.8637 15.7858 23.9558 15.5634 24.1198 15.3994C24.2838 15.2354 24.5061 15.1433 24.7381 15.1433H31.7332C31.9652 15.1433 32.1875 15.2354 32.3515 15.3994C32.5155 15.5634 32.6076 15.7858 32.6076 16.0177C32.6076 16.2496 32.5155 16.472 32.3515 16.636C32.1875 16.8 31.9652 16.8921 31.7332 16.8921H24.7381C24.5061 16.8921 24.2838 16.8 24.1198 16.636C23.9558 16.472 23.8637 16.2496 23.8637 16.0177ZM21.2405 24.5431C21.2405 25.7605 20.7569 26.9281 19.896 27.789C19.0351 28.6499 17.8675 29.1336 16.6499 29.1336H9.87342C9.64152 29.1336 9.41911 29.0414 9.25513 28.8775C9.09115 28.7135 8.99902 28.4911 8.99902 28.2592V14.2689C8.99902 14.037 9.09115 13.8146 9.25513 13.6506C9.41911 13.4867 9.64152 13.3945 9.87342 13.3945H16.2128C17.049 13.3954 17.8656 13.6487 18.5556 14.1214C19.2455 14.594 19.7767 15.2639 20.0796 16.0434C20.3826 16.8229 20.4432 17.6756 20.2534 18.4902C20.0636 19.3046 19.6325 20.0429 19.0163 20.6083C19.695 21.0165 20.2565 21.5934 20.6462 22.2829C21.036 22.9725 21.2407 23.751 21.2405 24.5431ZM10.7478 19.9525H16.2128C16.8505 19.9525 17.4621 19.6991 17.913 19.2482C18.364 18.7973 18.6173 18.1856 18.6173 17.5479C18.6173 16.9102 18.364 16.2985 17.913 15.8476C17.4621 15.3966 16.8505 15.1433 16.2128 15.1433H10.7478V19.9525ZM19.4917 24.5431C19.4917 24.1698 19.4182 23.8003 19.2754 23.4555C19.1326 23.1108 18.9233 22.7975 18.6594 22.5336C18.3955 22.2698 18.0822 22.0604 17.7375 21.9176C17.3927 21.7748 17.0231 21.7012 16.6499 21.7012H10.7478V27.3848H16.6499C17.0231 27.3848 17.3927 27.3113 17.7375 27.1684C18.0822 27.0256 18.3955 26.8164 18.6594 26.5525C18.9233 26.2886 19.1326 25.9753 19.2754 25.6305C19.4182 25.2858 19.4917 24.9162 19.4917 24.5431ZM33.482 23.8872C33.482 24.1192 33.3899 24.3415 33.2259 24.5055C33.0619 24.6695 32.8396 24.7616 32.6076 24.7616H24.8474C25.012 25.3997 25.3535 25.9782 25.8325 26.4307C26.3115 26.883 26.9087 27.191 27.555 27.3189C28.2014 27.4469 28.8707 27.3896 29.486 27.1538C30.1013 26.9178 30.6374 26.513 31.0326 25.9858C31.1016 25.8939 31.188 25.8166 31.2868 25.758C31.3858 25.6996 31.4951 25.6612 31.6088 25.645C31.7226 25.6288 31.8384 25.6351 31.9497 25.6637C32.0609 25.6923 32.1654 25.7424 32.2574 25.8115C32.3492 25.8804 32.4265 25.9668 32.485 26.0657C32.5435 26.1645 32.5819 26.274 32.5981 26.3877C32.6143 26.5014 32.6079 26.6172 32.5793 26.7285C32.5509 26.8398 32.5006 26.9443 32.4316 27.0361C31.6839 28.0324 30.606 28.7302 29.391 29.0045C28.1758 29.2788 26.9028 29.1117 25.7994 28.5333C24.6962 27.9549 23.8348 27.0028 23.3693 25.8473C22.9039 24.6919 22.8647 23.4085 23.2589 22.2268C23.653 21.0451 24.4548 20.0422 25.5207 19.3976C26.5867 18.753 27.8471 18.5087 29.0768 18.7084C30.3063 18.9081 31.4247 19.5388 32.2318 20.4876C33.0389 21.4364 33.4821 22.6416 33.482 23.8872ZM31.6239 23.0128C31.4313 22.2605 30.9937 21.5936 30.3803 21.1175C29.7668 20.6413 29.0122 20.3828 28.2357 20.3828C27.4591 20.3828 26.7045 20.6413 26.091 21.1175C25.4776 21.5936 25.04 22.2605 24.8474 23.0128H31.6239Z" />
  ),
  LinkedIn: (
    <Glyph d="M31.6026 9.28125H12.366C11.9022 9.28125 11.4574 9.46549 11.1294 9.79345C10.8014 10.1214 10.6172 10.5662 10.6172 11.03V30.2667C10.6172 30.7304 10.8014 31.1753 11.1294 31.5032C11.4574 31.8312 11.9022 32.0154 12.366 32.0154H31.6026C32.0664 32.0154 32.5112 31.8312 32.8391 31.5032C33.1671 31.1753 33.3514 30.7304 33.3514 30.2667V11.03C33.3514 10.5662 33.1671 10.1214 32.8391 9.79345C32.5112 9.46549 32.0664 9.28125 31.6026 9.28125ZM31.6026 30.2667H12.366V11.03H31.6026V30.2667ZM18.4867 18.8996V25.8947C18.4867 26.1266 18.3946 26.349 18.2306 26.513C18.0666 26.677 17.8442 26.7691 17.6123 26.7691C17.3804 26.7691 17.158 26.677 16.994 26.513C16.8301 26.349 16.7379 26.1266 16.7379 25.8947V18.8996C16.7379 18.6676 16.8301 18.4453 16.994 18.2813C17.158 18.1173 17.3804 18.0252 17.6123 18.0252C17.8442 18.0252 18.0666 18.1173 18.2306 18.2813C18.3946 18.4453 18.4867 18.6676 18.4867 18.8996ZM28.105 21.9599V25.8947C28.105 26.1266 28.0129 26.349 27.8489 26.513C27.6849 26.677 27.4626 26.7691 27.2306 26.7691C26.9987 26.7691 26.7764 26.677 26.6124 26.513C26.4484 26.349 26.3562 26.1266 26.3562 25.8947V21.9599C26.3562 21.3801 26.1259 20.8241 25.716 20.4142C25.3061 20.0043 24.7501 19.7739 24.1703 19.7739C23.5905 19.7739 23.0345 20.0043 22.6245 20.4142C22.2146 20.8241 21.9843 21.3801 21.9843 21.9599V25.8947C21.9843 26.1266 21.8922 26.349 21.7282 26.513C21.5642 26.677 21.3418 26.7691 21.1099 26.7691C20.878 26.7691 20.6556 26.677 20.4916 26.513C20.3276 26.349 20.2355 26.1266 20.2355 25.8947V18.8996C20.2366 18.6854 20.3162 18.479 20.4593 18.3198C20.6024 18.1604 20.7991 18.0591 21.012 18.0351C21.2248 18.0111 21.439 18.066 21.614 18.1896C21.789 18.3131 21.9126 18.4964 21.9613 18.705C22.5529 18.3038 23.2425 18.0712 23.9562 18.0323C24.6699 17.9934 25.3807 18.1497 26.0124 18.4842C26.6439 18.8189 27.1725 19.3193 27.5411 19.9316C27.9099 20.5439 28.1048 21.2451 28.105 21.9599ZM18.9239 15.8392C18.9239 16.0986 18.847 16.3522 18.7029 16.5679C18.5588 16.7835 18.3539 16.9517 18.1143 17.0509C17.8746 17.1502 17.6109 17.1762 17.3564 17.1256C17.102 17.0749 16.8683 16.95 16.6849 16.7666C16.5015 16.5832 16.3765 16.3495 16.3259 16.0951C16.2753 15.8406 16.3013 15.5769 16.4006 15.3373C16.4998 15.0976 16.668 14.8928 16.8836 14.7486C17.0993 14.6045 17.3529 14.5276 17.6123 14.5276C17.9602 14.5276 18.2938 14.6658 18.5398 14.9118C18.7857 15.1577 18.9239 15.4913 18.9239 15.8392Z" />
  ),
};

/* ---------- Partner logos ----------
   Figma theke export kora SVG, /public/logos/ e rakha. Natural size-e dekhano hoy (Figma-r moto),
   tai height/width alada kore set kora hoyni. Slot 30px high, logo majhkhane. */
const partnerLogoFiles: Record<(typeof footerPartners)[number]["id"], { src: string; alt: string }> = {
  framer: { src: "/logos/framer.svg", alt: "Framer" },
  webflow: { src: "/logos/webflow.svg", alt: "Webflow" },
  behance: { src: "/logos/behance.svg", alt: "Behance" },
  dribbble: { src: "/logos/dribble.svg", alt: "Dribbble" },
  clutch: { src: "/logos/clutch.svg", alt: "Clutch" },
  google: { src: "/logos/google.svg", alt: "Google" },
};

function PartnerLogo({ id }: { id: keyof typeof partnerLogoFiles }) {
  const { src, alt } = partnerLogoFiles[id];
  /* eslint-disable-next-line @next/next/no-img-element -- static SVG, natural size dorkar; next/image-er fixed width/height lage na */
  return <img src={src} alt={alt} className="block max-w-none" draggable={false} />;
}

function Stars() {
  return (
    <span className="flex gap-[0.1875rem] text-[#E8B931]" aria-label="5 out of 5 stars" role="img">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" fill="currentColor" className="size-[0.9375rem]" aria-hidden="true">
          <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </span>
  );
}

const bottomText = "text-base leading-5 text-[#525252]";

export function Footer() {
  /* pb boro rakha: FloatingNav (fixed, bottom 24px, ~66px high) + BackToTop + chat button page-er shesh-e bottom bar-er upor na boshe,
  Figma-r moto bottom bar-er niche jaga thake. Nav-er upor ~48px gap rekhe. */
  return (
    <footer aria-label="Site footer" className="bg-white pb-28 pt-4 md:pb-[8.5rem] md:pt-8">
      <Container className="flex flex-col gap-12 md:gap-[4.875rem]">
        {/* 1) Content */}
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between lg:gap-[13.2rem]">
          {/* Left: Top (381px) */}
          <div className="flex w-full flex-col gap-6 lg:w-[23.8125rem] lg:shrink-0">
            <div className="flex flex-col gap-[1.875rem]">
              <Logo />
              <p className="text-base leading-[1.5] text-black/70">
                A gamified platform designed for real connection. We turn daily friction into shared joy through points,
                emotional intelligence, and high-fives.
              </p>
            </div>
            <NewsletterForm />
          </div>

          {/* Right: menus + socials (726px) */}
          <div className="flex w-full flex-col gap-10 lg:min-h-[15.25rem] lg:w-[45.375rem] lg:items-end lg:justify-between lg:gap-0">
            <nav aria-label="Footer" className="grid w-full grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 lg:flex lg:justify-between lg:gap-0">
              {footerColumns.map((col, i) => (
                <div key={`${col.title}-${i}`} className="flex flex-col gap-[0.9375rem]">
                  <h3 className="text-lg font-medium leading-[1.375rem] text-black">{col.title}</h3>
                  <ul className="flex flex-col gap-[0.4375rem]">
                    {col.links.map((l) => (
                      <li key={l.label}>
                        <FooterLink
                          href={l.href}
                          className="flex items-center text-sm font-medium leading-[1.625rem] tracking-[-0.4px] text-black opacity-70 transition-opacity hover:opacity-100"
                        >
                          {l.label}
                        </FooterLink>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>

            <ul className="flex items-center gap-4" aria-label="Social media">
              {footerSocials.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="grid size-[2.625rem] place-items-center rounded-lg bg-[#F0F0F0] text-black transition-colors hover:bg-[#e4e4e4]"
                  >
                    {socialIcons[s.name]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 2) Partners: scroll-e ek-ek kore blur + fade + rise (stagger), hover-e logo ektu uthe ashe */}
        <RevealOnView threshold={0.35}>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:flex lg:items-start lg:justify-between lg:gap-[3.125rem]">
            {footerPartners.map((p, i) => (
              <li
                key={p.id}
                className="sr group flex flex-col items-center gap-3.5 text-center"
                style={reveal(i * 90, { blur: 8, y: 18, duration: 800 })}
              >
                <div className="flex h-[1.875rem] items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 group-hover:scale-[1.06]">
                  <PartnerLogo id={p.id} />
                </div>
                {"stars" in p ? (
                  <div className="flex items-center gap-2 text-base capitalize leading-6 tracking-[0.02em] text-[#525252] transition-colors duration-300 group-hover:text-black">
                    {p.label}
                    <Stars />
                  </div>
                ) : (
                  <p className="text-base capitalize leading-6 tracking-[0.02em] text-[#525252] transition-colors duration-300 group-hover:text-black">
                    {p.label}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </RevealOnView>

        {/* 3) Bottom bar */}
        <div className="flex flex-col items-center gap-3 text-center md:grid md:grid-cols-[1fr_auto_1fr] md:gap-6">
          <Link href="#" className={`${bottomText} transition-colors hover:text-black md:justify-self-start`}>
            Terms &amp; Conditions
          </Link>
          <p className={`${bottomText} md:justify-self-center`}>
            © <CurrentYear /> Prographr, All Rights Reserved.
          </p>
          <Link href="#" className={`${bottomText} transition-colors hover:text-black md:justify-self-end`}>
            Privacy Policy
          </Link>
        </div>
      </Container>
    </footer>
  );
}