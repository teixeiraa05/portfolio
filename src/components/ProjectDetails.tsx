import type { Project } from '../data/portfolio'
import { technologyIcons } from '../data/technologies'
import { Icon } from './Icon'
import { ProjectMedia } from './ProjectMedia'

export function ProjectDetails({ project }: { project: Project }) {
  const { course, detail, technologies, url, playUrl, youtubeId } = project

  return (
    <div className="grid gap-4 pb-6 min-[501px]:ml-14">
      <div>
        {course && (
          <div className="mb-1 font-mono text-xs text-muted">{course}</div>
        )}
        <p className="max-w-prose text-sm leading-relaxed">{detail}</p>
      </div>

      <ul className="flex list-none flex-wrap gap-x-4 gap-y-2 p-0">
        {technologies.map((tech) => (
          <li
            key={tech}
            className="flex items-center gap-1.5 whitespace-nowrap text-xs text-muted"
          >
            <img
              className="size-5 rounded-sm bg-white object-contain p-0.5"
              src={technologyIcons[tech]}
              alt=""
              loading="lazy"
            />
            {tech}
          </li>
        ))}
      </ul>

      {project.galleries?.length || youtubeId ? (
        <ProjectMedia project={project} />
      ) : null}

      {(url || playUrl || youtubeId) && (
        <div className="flex flex-wrap items-center gap-2">
          {url && (
            <a href={url} className="action-pill">
              <Icon name="github" size={15} />
              View repository
              <span className="sr-only"> for {project.title}</span>
            </a>
          )}
          {playUrl && (
            <a className="action-pill" href={playUrl}>
              Play {project.title}
            </a>
          )}
          {youtubeId && (
            <a
              className="action-pill"
              href={`https://www.youtube.com/watch?v=${youtubeId}`}
            >
              Watch on YouTube
            </a>
          )}
        </div>
      )}
    </div>
  )
}
