import { Container } from "@/components/ui/Container";
import { CloudImage } from "@/components/ui/CloudImage";
import { Button } from "@/components/ui/Button";
import { SparkleIcon } from "@/components/ui/icons";
import { projects, type Project } from "@/lib/projects";

/* Figma: "Desktop - 2018" (1440 x 1734), bg #FAFAFA, padding 100px 80px, gap 60px. 1rem = 16px @1440 */

/* Image card-er 628px width-er 574px ongsho (~40vw @lg, 44vw @md, full-width mobile) */
const IMAGE_SIZES = "(min-width: 1440px) 574px, (min-width: 1024px) 40vw, (min-width: 768px) 44vw, 92vw";

/* "inset" image: card-er width minus dui pashe-r padding (~540-565px @1440) */
const INSET_SIZES = "(min-width: 1440px) 565px, (min-width: 768px) 42vw, 84vw";

/* "full" image: card-er puro width (628px @1440, tablet-e ~46vw, mobile-e ~92vw) */
const FULL_SIZES = "(min-width: 1440px) 628px, (min-width: 768px) 46vw, 92vw";

/* Figma image area (628 x 375). "free" media-r px-ke % e convert kori, tai card jotoi choto/boro hok proportion thik thake */
const AREA_W = 628;
const AREA_H = 375;

function ProjectMedia({ project }: { project: Project }) {
  const media = project.media ?? { kind: "window" as const };
  const imgClass = "origin-top object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]";

  if (media.kind === "inset") {
    /* Phone mockup: e_trim diye image tight, pashe `side`px / upore `top`px padding (Figma-r moto, SolvexAI/NexBank card-er moto gap).
       Image-er height natural (auto), tai ratio jai hok kono kata nai. Niche area-r edge-e clip hoy, jemon Figma-te */
    return (
      <div
        className="absolute"
        style={{
          left: `${(media.side / AREA_W) * 100}%`,
          right: `${(media.side / AREA_W) * 100}%`,
          top: `${(media.top / AREA_H) * 100}%`,
        }}
      >
        <CloudImage
          trim
          src={project.image}
          alt={project.imageAlt}
          width={0}
          height={0}
          sizes={INSET_SIZES}
          className={`block h-auto w-full ${imgClass}`}
        />
      </div>
    );
  }

  if (media.kind === "full") {
    /* Image-i puro area-r export: area-r puro jayga bhore (parent relative + overflow-hidden), kono inset/crop nai.
       object-top: height/ratio ektu alada hole-o upor alignment thik thake, shudhu niche (phone clip hoy ekhane) ektu kate */
    return <CloudImage src={project.image} alt={project.imageAlt} fill sizes={FULL_SIZES} className={imgClass} />;
  }

  if (media.kind === "free") {
    /* Phone mockup: card-er upor diye bairer dike barhe, parent-er overflow-hidden clip kore (Figma-r moto) */
    const { left, top, width, height } = media;
    return (
      <div
        className="absolute"
        style={{
          left: `${(left / AREA_W) * 100}%`,
          top: `${(top / AREA_H) * 100}%`,
          width: `${(width / AREA_W) * 100}%`,
          aspectRatio: `${width} / ${height}`,
        }}
      >
        <CloudImage
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes={`(min-width: 1440px) ${Math.round(width)}px, (min-width: 768px) ${Math.round((46 * width) / AREA_W)}vw, ${Math.round((92 * width) / AREA_W)}vw`}
          className={imgClass}
        />
      </div>
    );
  }

  /* Window: white-border-wala screenshot (574px), niche porjonto cut kora, top corner rounded */
  return (
    <div className="absolute inset-x-[4.3%] bottom-0 top-[7.07%] overflow-hidden rounded-t-[0.92rem]">
      <CloudImage src={project.image} alt={project.imageAlt} fill sizes={IMAGE_SIZES} className={imgClass} />
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex h-full w-full flex-col gap-5 rounded-[1.25rem] bg-white pb-4">
      {/* Image area: 628 x 375, bg #F0F0F0 */}
      <div className="relative aspect-[628/375] shrink-0 overflow-hidden rounded-t-[1.25rem] bg-chip">
        <ProjectMedia project={project} />
      </div>

      <div className="flex flex-1 flex-col justify-between gap-[1.875rem]">
        <div className="flex flex-col gap-3 px-4">
          <div className="flex flex-col gap-1.5">
            <h3 className="text-xl font-medium leading-[1.2] text-black lg:text-2xl">{project.title}</h3>
            <p className="line-clamp-2 text-base leading-normal text-black/70 lg:line-clamp-1">{project.description}</p>
          </div>

          <ul className="flex flex-wrap gap-3">
            {project.tags.map(({ label, icon: Icon }) => (
              <li
                key={label}
                className="flex items-center gap-1.5 rounded-full bg-[#FAFAFA] px-2 py-1.5 text-[0.6875rem] leading-[1.6] text-black"
              >
                <Icon className="size-3.5 shrink-0" />
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-between gap-4 px-4 pt-2">
          <p className="text-sm leading-[1.1] text-ink/70">
            Project : <span className="text-xl font-medium text-ink">{project.name}</span>
          </p>
          <Button href={project.href} className="shrink-0">
            Full view
            <span className="sr-only"> of {project.name}</span>
          </Button>
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="scroll-mt-24 bg-[#FAFAFA] py-16 md:py-[6.25rem]">
      <Container className="flex flex-col items-center gap-10 md:gap-[3.75rem]">
        {/* Header */}
        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-4">
            <p className="flex items-center gap-3 text-base font-medium leading-none text-ink">
              <span className="grid size-8 place-items-center rounded-full bg-accent" aria-hidden="true">
                <SparkleIcon className="size-4 text-white" />
              </span>
              Our Recent Projects
            </p>
            <h2
              id="projects-heading"
              className="max-w-[60.375rem] text-center text-[2rem] font-medium leading-[1.2] text-black sm:text-5xl lg:text-[3.75rem]"
            >
              Designing Digital Experiences That Connect Brands With
            </h2>
          </div>
          {/* TODO: all-projects page hole href="/projects" kore dao */}
          <Button href="#projects">Explore more</Button>
        </div>

        {/* 2 column grid (Figma: 628px card, gap 24px). Card barle row barhe */}
        <ul className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <li key={project.slug} className="flex">
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}