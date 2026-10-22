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
  /** cover (default): card puro bhore, image-er ratio card-er theke alada hole dui pash kate.
      contain: puro image dekha jay, kono kata nai (ratio alada hole upor-niche/dui pashe card-er #F0F0F0 faka thake) */
  fit?: "cover" | "contain";
  /** true hole Cloudinary image-er charpashe-r white/faka margin kete dey (e_trim), tai image-er asol design (plate) card-er edge porjonto bhore.
      Shudhu jei image-e white margin ache segulote dao (jemon heroGalleryA). Margin na thakle kono effect nai */
  trim?: boolean | number;
  /** true hole height fixed (card-er moto) thake, kintu width image-er nijer ratio onujayi auto hoy, tai image kothao kate na (width boro hole somoshya nai).
      Ei mode-e `widthClass`-e `w-` na diye `min-w-[...]` dao (image load howar age card jeno 0 width-e na jay). `sizes` generous rakho (boro width-er hishab) */
  autoWidth?: boolean;
  /** (autoWidth mode-e image shob shomoy loading="eager", `priority` prop-er dorkar nai: marquee-r majhe thaka image lazy hole reload-e faka jayga dekhay) */
  /** true hole card-er #F0F0F0 background thake na. Image-er transparent charpash (jemon rounded frame-er kon/margin) tokhon page-er rong (shada) dekhay,
      tai image-er bairer "gray border" dekha jay na. Shudhu transparent PNG-r jonno (autoWidth-er shathe) */
  transparent?: boolean;
  /** autoWidth image-er upor-niche transparent/halka margin thakle dashboard onno card-er cheye chhoto dekhay.
      bleed (em) dile image upor ar niche-e oi poriman boro hoye card-er bhitore clip hoy, tai frame card-er puro height-e bhore jay (width-o ratio onujayi barhe).
      0.3 = ~5px kore. Ekhono chhoto lagle 0.4/0.5, beshi kata gele 0.2 koro */
  bleed?: number;
};

function ImageCard({ src, alt, widthClass, sizes, priority, fit = "cover", trim = false, autoWidth = false, transparent = false, bleed = 0 }: ImageCardProps) {
  if (autoWidth) {
    return (
      <div className={cn("relative h-[20.3125em] shrink-0 overflow-hidden rounded-[1.25em]", transparent ? "bg-transparent" : "bg-chip", widthClass)}>
        <CloudImage
          src={src}
          alt={alt}
          width={0}
          height={0}
          sizes={sizes}
          loading="eager"
          decoding="async"
          trim={trim}
          style={{ height: `calc(100% + ${bleed * 2}em)`, width: "auto", marginTop: `${-bleed}em` }}
          className="block max-w-none"
        />
      </div>
    );
  }

  return (
    <div className={cn("relative h-[20.3125em] shrink-0 overflow-hidden rounded-[1.25em] bg-chip", widthClass)}>
      <CloudImage
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        trim={trim}
        className={fit === "contain" ? "object-contain" : "object-cover"}
      />
    </div>
  );
}

/* Notun 3 ta image-er width (Figma-r em). Ager 3 ta image-er size ager moto-i, shegulo-te kono change nai.
   Figma-te ei 3 tar width alada hole ekhane bodlao (302 = w-[18.875em], 422 = w-[26.375em], 458 = w-[28.625em]) */
const GALLERY_WIDTH_CLASS = "w-[26.375em]";
const GALLERY_SIZES = sizesFor(422);
/* autoWidth image-er asol width ~420-520px (height 325px-e ratio onujayi). Age 900px dhorechilam, tai Cloudinary boro (1080-1920w) e_trim image toiri korto, reload-e dheri hoto.
   600 mane 1x-e 640w, retina-te 1200w, kom size, tai tara-tari load hoy. Blur dekhale 700 koro */
const AUTO_WIDTH_SIZES = "(min-width: 768px) 600px, 480px";

/* Order: protita stat card-er age ar pore image thake, duto stat card pashapashi hoy na.
   Cuisine, Total Clients, Filamento, Experience, [MoneyBoard], Total Project, [Image C], [Business Dashboard], Happy Clients, [Education Dashboard], Success Rate, tarpor loop */
function CardSet({ hidden = false }: { hidden?: boolean }) {
  const galleryAlt = hidden ? "" : "Prographr project design showcase";

  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 gap-[1.5em] pr-[1.5em]">
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
          src={images.heroFilamento}
          alt={hidden ? "" : "Filamento case study website design"}
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
      <li className="flex">
        {/* MoneyBoard dashboard (heroGalleryA), Experience-er pore. Original-e charpashe ~100px white margin ache (3086x2402 -> trim-er pore 2886x2202, ratio ~1.31 = card-er ratio),
            tai trim diye margin kete cover kora: plate card-er edge porjonto bhore, Cuisine/Filamento-er moto full-bleed dekhay */}
        <ImageCard src={images.heroGalleryA} alt={galleryAlt} widthClass={GALLERY_WIDTH_CLASS} sizes={GALLERY_SIZES} trim />
      </li>
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
        <ImageCard src={images.heroGalleryC} alt={galleryAlt} widthClass={GALLERY_WIDTH_CLASS} sizes={GALLERY_SIZES} />
      </li>
      <li className="flex">
        <ImageCard
          src={images.heroBusinessDashboard}
          alt={hidden ? "" : "Business management dashboard design"}
          widthClass="min-w-[26.375em]"
          sizes={AUTO_WIDTH_SIZES}
          autoWidth
          transparent
          bleed={0.3}
          trim={30}
        />
      </li>
      <li className="flex">
        <StatCard
          variant="light"
          icon={<CardIcon src="/icons/profile-2user.svg" />}
          label="Happy Clients"
          value="220+"
          description="Building lasting partnerships through great digital experiences."
        />
      </li>
      <li className="flex">
        <ImageCard
          src={images.heroEducationDashboard}
          alt={hidden ? "" : "Education dashboard design"}
          widthClass="min-w-[26.375em]"
          sizes={AUTO_WIDTH_SIZES}
          autoWidth
          transparent
          bleed={0.3}
          trim={30}
        />
      </li>
      <li className="flex">
        <StatCard
          variant="light"
          icon={<CardIcon src="/icons/cup.svg" />}
          label="Success Rate"
          value="98%"
          description="Delivering quality solutions that exceed expectations."
        />
      </li>
    </ul>
  );
}

export function HeroShowcase() {
  return (
    <div className="mt-10 md:mt-[clamp(2rem,calc(var(--h)*0.06349_-_20.70px),3.25rem)]">
      {/* Full-bleed marquee. Mobile-e card choto (em scale), 768px+ e Figma-r size.
          Direction: left -> right (`marquee-track-reverse`). Eta -50% theke shuru hoy, tai prothom screen-e DUI number set dekha jay.
          Ei karone real set (priority image shoho) dui number-e, ar hidden copy age. Visual-e kono parthokko nai (dui set ek-i). */}
      <div className="marquee overflow-hidden text-[0.8125rem] md:text-[length:max(clamp(0.65rem,calc(var(--h)*0.01778_-_4.36px),1rem),min(2.75rem,calc(var(--h)*0.035_-_24.1px)))]" suppressHydrationWarning>
        <div className="marquee-track-reverse flex w-max">
          <CardSet hidden />
          <CardSet />
        </div>
      </div>

      <Container>
        <div className="mt-8 flex flex-col items-center gap-3 text-center md:mt-[clamp(2.75rem,calc(var(--h)*0.01587_+_30.83px),3.062rem)] lg:flex-row lg:justify-center lg:gap-12 xl:gap-[12.7rem]">
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
          <p className="text-base leading-[1.2] text-ink/70 md:text-xl">This Month&rsquo;s Best Deals Are Here</p>
        </div>
      </Container>
    </div>
  );
}