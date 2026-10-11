import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { CloudImage } from "@/components/ui/CloudImage";
import { LayersIcon, MedalIcon } from "@/components/ui/icons";
import { images } from "@/lib/images";
import { cn } from "@/lib/utils";

/* Figma-r card width (px) theke next/image-er `sizes` toiri, jeno shob screen-e sharp ar halka thake */
const sizesFor = (base: number) =>
  `(min-width: 2200px) ${Math.round(base * 1.65)}px, (min-width: 1600px) ${Math.round(base * 1.3)}px, (min-width: 768px) ${base}px, ${Math.round(base * 0.82)}px`;

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
          icon={<LayersIcon className="size-[1.875em] text-accent" />}
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
          icon={
            <Image
              src="/icons/people.svg"
              alt=""
              width={30}
              height={30}
              aria-hidden="true"
              className="size-[1.875em]"
            />
          }
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
          icon={<MedalIcon className="size-[1.875em] text-accent" />}
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
            <span className="grid size-[1.4375rem] shrink-0 place-items-center rounded-full bg-accent/20" aria-hidden="true">
              <span className="size-2.5 rounded-full bg-accent blur-[1px]" />
            </span>
            Open for new project and collaboration
          </p>
          <p className="text-base leading-[1.2] text-ink/70 md:text-xl">Get discount up to 60%, booking this month</p>
        </div>
      </Container>
    </div>
  );
}