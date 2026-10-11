import { Container } from "@/components/ui/Container";
import { CloudImage } from "@/components/ui/CloudImage";
import { Button } from "@/components/ui/Button";
import { SparkleIcon } from "@/components/ui/icons";
import { projects, type Project } from "@/lib/projects";

/* Figma: "Desktop - 2018" (1440 x 1734), bg #FAFAFA, padding 100px 80px, gap 60px. 1rem = 16px @1440 */

/* Image card-er 628px width-er 574px ongsho (~40vw @lg, 44vw @md, full-width mobile) */
const IMAGE_SIZES = "(min-width: 1024px) 40vw, (min-width: 768px) 44vw, 92vw";

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex h-full w-full flex-col gap-5 rounded-[1.25rem] bg-white pb-4">
      {/* Image area: 628 x 375, bg #F0F0F0. Bhitore white-border-wala screenshot (574px) niche porjonto cut kora */}
      <div className="relative aspect-[628/375] shrink-0 overflow-hidden rounded-t-[1.25rem] bg-chip">
        <div className="absolute inset-x-[4.3%] bottom-0 top-[7.07%] overflow-hidden rounded-t-[0.92rem]">
          <CloudImage
            src={project.image}
            alt={project.imageAlt}
            fill
            sizes={IMAGE_SIZES}
            className="origin-top object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        </div>
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

        {/* 2 x 2 grid (Figma: 628px card, gap 24px) */}
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