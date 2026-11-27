import { Icon } from '../components/Icon'
import { ProjectDetails } from '../components/ProjectDetails'
import { SectionTitle } from '../components/SectionTitle'
import { projects } from '../data/portfolio'
import openFloatLogo from '../assets/openfloat.webp'
import clutchLogo from '../assets/clutch.webp'

const projectLogos: Record<string, string> = {
  openfloat: openFloatLogo,
  clutch: clutchLogo,
}

const projectIconStyles: Record<string, string> = {
  clutch: 'border border-[#deded8] bg-white',
  openfloat: 'bg-[#e1ead7]',
  tcp: 'bg-[#dfe8f3] text-[#385273]',
  elio: 'bg-[#ece5f2] text-[#79518d]',
  flow: 'bg-[#dee9f4] text-[#476a96]',
  color: 'bg-[#eee7da] text-[#625b4f]',
  pulse: 'bg-[#f8e6df] text-[#a55643]',
  sushi: 'bg-[#e3edde] text-[#537549]',
  serial: 'bg-[#e1e9ed] text-[#4d6c7a]',
}

const homeProjects = projects
  .map(({ homeTitle, homeContributions, ...project }) => ({
    ...project,
    title: homeTitle ?? project.title,
    contributions: homeContributions ?? project.contributions,
  }))
  .reverse()

export function Projects() {
  return (
    <section className="mb-10 sm:mb-13" aria-labelledby="projects">
      <SectionTitle id="projects" title="Projects" aside="2025 — 2026" />
      {homeProjects.map((project) => (
        <details
          className="project-entry group border-b border-line"
          name="portfolio-projects"
          key={project.id}
        >
          <summary className="grid grid-cols-[auto_1fr_auto] items-center gap-x-3 gap-y-1 px-0.5 py-4 hover:text-primary min-[501px]:grid-cols-[auto_1fr_auto_auto] min-[501px]:gap-4">
            <span
              className={`project-icon grid size-10 place-items-center rounded-lg ${project.id} ${projectIconStyles[project.id]}`}
            >
              {projectLogos[project.id] ? (
                <img
                  src={projectLogos[project.id]}
                  width="27"
                  height="27"
                  alt=""
                />
              ) : (
                <Icon name={project.id} size={23} />
              )}
            </span>
            <div>
              <h3 className="flex flex-wrap items-center gap-2">
                {project.title}
                {project.ongoing && <span className="project-status">Now</span>}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground group-open:hidden">
                {project.summary}
              </p>
            </div>
            <time
              className="col-start-2 row-start-2 font-mono text-xs whitespace-nowrap text-muted-foreground min-[501px]:col-auto min-[501px]:row-auto"
              dateTime={project.month}
            >
              {project.date}
            </time>
            <span className="col-start-3 row-start-1 text-muted-foreground transition-transform group-open:rotate-45 motion-reduce:transition-none min-[501px]:col-auto min-[501px]:row-auto">
              <Icon name="plus" size={14} />
            </span>
          </summary>
          <ProjectDetails project={project} />
        </details>
      ))}
    </section>
  )
}
