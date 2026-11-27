import { SectionTitle } from '../components/SectionTitle'
import { education } from '../data/portfolio'

export function Education() {
  return (
    <section className="mb-10 sm:mb-13" aria-labelledby="education">
      <SectionTitle id="education" title="Education" />
      <ol className="list-none p-0">
        {education.map(
          ({
            school,
            logo,
            qualification,
            dates,
            expectedGraduation,
            average,
          }) => (
            <li
              key={school}
              className="timeline-entry flex flex-col justify-between gap-1 pb-6 pl-5 last:pb-0 min-[501px]:flex-row min-[501px]:gap-4"
            >
              <div>
                <h3 className="flex items-center gap-2">
                  {logo && (
                    <img
                      className="organization-logo h-4 w-5 shrink-0 object-contain"
                      src={logo}
                      alt=""
                      loading="lazy"
                    />
                  )}
                  {school}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {qualification}
                  {average && <> · Average {average}</>}
                  {expectedGraduation && <> · Expected {expectedGraduation}</>}
                </p>
              </div>
              <span className="pt-0.5 font-mono text-xs whitespace-nowrap text-muted-foreground">
                {dates}
              </span>
            </li>
          ),
        )}
      </ol>
    </section>
  )
}
