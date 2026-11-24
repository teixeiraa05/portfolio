import { SectionTitle } from '../components/SectionTitle'
import { experience } from '../data/portfolio'
export function Experience() {
  return (
    <section className="mb-10 sm:mb-13" aria-labelledby="experience">
      <SectionTitle id="experience" title="Experience" />
      <ol className="list-none p-0">
        {experience.map((item) => (
          <li
            className="timeline-entry flex flex-col justify-between gap-1 pb-6 pl-5 last:pb-0 min-[501px]:flex-row min-[501px]:gap-4"
            key={item.role}
          >
            <div>
              <h3>{item.role}</h3>
              <ul className="my-1 flex list-none flex-wrap gap-x-4 gap-y-1 p-0">
                {item.organizations.map(({ name, logo }) => (
                  <li
                    key={name}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <img
                      className="organization-logo h-4 w-5 shrink-0 object-contain"
                      src={logo}
                      alt=""
                      loading="lazy"
                    />
                    {name}
                  </li>
                ))}
              </ul>
              <small className="text-sm text-muted-foreground">
                {item.context}
              </small>
              {item.responsibilities && (
                <p className="mt-1 max-w-prose text-sm leading-relaxed">
                  {item.responsibilities}
                </p>
              )}
            </div>
            <span className="pt-0.5 font-mono text-xs whitespace-nowrap text-muted-foreground">
              {item.start} - now
            </span>
          </li>
        ))}
      </ol>
    </section>
  )
}
