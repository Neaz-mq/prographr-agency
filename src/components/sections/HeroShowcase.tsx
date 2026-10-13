import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { CloudImage } from "@/components/ui/CloudImage";
import { images } from "@/lib/images";
import { cn } from "@/lib/utils";

/* Figma-r card width (px) theke next/image-er `sizes` toiri. Layout 1440px-e fixed, tai boro screen-e card boro hoy na */
const sizesFor = (base: number) => `(min-width: 768px) ${base}px, ${Math.round(base * 0.82)}px`;

/* Figma theke export kora icon (public/icons/), card-er white box-er bhitore boshe */
function CardIcon({ src }: { src: string }) {
  return (
    <Image src={src} alt="" width={30} height={30} aria-hidden="true" className="size-[1.875em]" />
  );
}

type StatCardProps = {
  variant: "light" | "dark" | "tint";
  icon: React.ReactNode;
  label: string;
  value: string;
  description: string;
};

function StatCard({ variant, icon, label, value, description }: StatCardProps) {
  return (
    <div
      className={cn(
        "flex h-[20.3125em] w-[18.875em] shrink-0 flex-col justify-between rounded-[1.25em] p-[1.25em]",
        variant === "light" && "bg-chip text-ink",
        variant === "dark" && "bg-ink text-white",
        variant === "tint" && "bg-accent/10 text-ink"
      )}
    >
      <div className="flex items-center justify-between gap-[2.375em]">
        <span className="grid size-[4em] shrink-0 place-items-center rounded-[0.75em] bg-white">{icon}</span>
        <span className="text-right text-[1.25em] leading-none">{label}</span>
      </div>

      <div className="flex flex-col gap-[0.5em]">
        <p className={cn("text-[1.875em] font-medium leading-[1.233]", variant === "tint" && "text-accent")}>{value}</p>
        <p className={cn("leading-normal", variant === "dark" ? "text-white/70" : "text-ink/70")}>{description}</p>
      </div>
    </div>
  );
}

type ImageCardProps = {
  src: string;
  alt: string;
  widthClass: string;
  sizes: string;
  priority?: boolean;
};

function ImageCard({ src, alt, widthClass, sizes, priority }: ImageCardProps) {
  return (
    <div className={cn("relative h-[20.3125em] shrink-0 overflow-hidden rounded-[1.25em] bg-chip", widthClass)}>
      <CloudImage src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
    </div>
  );
}

function CardSet({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 gap-[1.5em] pr-[1.5em]">
      <li className="flex">
        <StatCard
          variant="light"
          icon={<CardIcon src="/icons/layer.svg" />}
          label="Total Project"
          value="120+"
          description="Ideas transformed into impactful digital products."
        />
      </li>
      <li className="flex">
        <ImageCard
          src={images.heroTeam}
          alt={hidden ? "" : "The Prographr team working together"}
          widthClass="w-[18.875em]"
          sizes={sizesFor(302)}
          priority={!hidden}
        />
      </li>
      <li className="flex">
        <ImageCard
          src={images.heroCuisine}
          alt={hidden ? "" : "Cuisine restaurant web app design"}
          widthClass="w-[26.375em]"
          sizes={sizesFor(422)}
          priority={!hidden}
        />
      </li>
      <li className="flex">
        <StatCard
          variant="dark"
          icon={<CardIcon src="/icons/people.svg" />}
          label="Total Clients"
          value="230+"
          description="Building Meaningful Partnerships That Last Through Design"
        />
      </li>
      <li className="flex">
        <ImageCard
          src={images.heroPaynex}
          alt={hidden ? "" : "Paynex crypto wallet website design"}
          widthClass="w-[28.625em]"
          sizes={sizesFor(458)}
        />
      </li>
      <li className="flex">
        <StatCard
          variant="tint"
          icon={<CardIcon src="/icons/medal-star.svg" />}
          label="Experience"
          value="6 Years+"
          description="Creating intuitive experiences that move businesses forward."
        />
      </li>
    </ul>
  );
}

export function HeroShowcase() {
  return (
    <div className="mt-10 md:mt-[3.75rem]">
      {/* Full-bleed marquee. Mobile-e card choto (em scale), 768px+ e Figma-r size */}
      <div className="marquee overflow-hidden text-[0.8125rem] md:text-base">
        <div className="marquee-track flex w-max">
          <CardSet />
          <CardSet hidden />
        </div>
      </div>

      <Container>
        <div className="mt-8 flex flex-col items-center gap-3 text-center md:mt-[3.5625rem] lg:flex-row lg:justify-center lg:gap-12 xl:gap-[12.7rem]">
          <p className="flex items-center gap-[0.5625rem] text-base leading-[1.2] text-ink/70 md:text-xl">
            {/* Plain block container (grid na). Ring ar core dui-i left/top 50% + nijer aadha size-er negative margin diye center kora,
                tai ring container-er cheye boro hole-o position nare na. */}
            <span className="relative size-[1.4375rem] shrink-0 rounded-full bg-accent/20" aria-hidden="true">
              {/* Ring: 2.125rem, aadha = 1.0625rem. Core-er pichone thake (age likha, tai niche porbe) */}
              <span className="status-ripple absolute left-1/2 top-1/2 -ml-[1.0625rem] -mt-[1.0625rem] size-[2.125rem] rounded-full bg-accent" />
              {/* Core dot: 0.625rem, aadha = 0.3125rem */}
              <span className="status-dot absolute left-1/2 top-1/2 -ml-[0.3125rem] -mt-[0.3125rem] size-2.5 rounded-full bg-accent shadow-[0_0_0.5rem_0.125rem_rgb(11_118_243/0.45)]" />
            </span>
            Open for new project and collaboration
          </p>
          <p className="text-base leading-[1.2] text-ink/70 md:text-xl">Get discount up to 60%, booking this month</p>
        </div>
      </Container>
    </div>
  );
}