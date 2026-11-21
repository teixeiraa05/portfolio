import { SectionTitle } from '../components/SectionTitle'
import snapshot from '../data/github.json'

const months = new Intl.DateTimeFormat('en', {
  month: 'short',
  timeZone: 'UTC',
})
const dates = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
})
const dayLength = 86400000
const firstDay = Date.parse(snapshot.start)
const days = [...snapshot.levels].map((level, i) => ({
  level,
  date: new Date(firstDay + i * dayLength),
}))

function ContributionCalendar() {
  return (
    <div
      className="overflow-x-auto"
      role="img"
      aria-label={`${snapshot.total} GitHub contributions from ${snapshot.start} through ${snapshot.end}. Color intensity indicates daily activity.`}
    >
      <div className="min-w-132">
        <div
          className="mb-1.5 grid grid-cols-53 font-mono text-xs text-muted"
          aria-hidden="true"
        >
          {days.map(
            ({ date }, i) =>
              date.getUTCDate() === 1 && (
                <span key={i} style={{ gridColumn: Math.floor(i / 7) + 1 }}>
                  {months.format(date)}
                </span>
              ),
          )}
        </div>
        <div
          className="grid grid-flow-col grid-cols-53 grid-rows-[repeat(7,auto)] gap-[3px]"
          aria-hidden="true"
        >
          {days.map(({ level, date }, i) => (
            <span
              key={i}
              className="contribution-day"
              data-level={level}
              title={`${dates.format(date)} · Activity level ${level} of 4`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
export function GitHubActivity() {
  return (
    <section className="mb-10 sm:mb-13" aria-labelledby="activity">
      <SectionTitle id="activity" title="GitHub activity" />
      <div className="rounded-xl border border-line bg-surface p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <strong>{snapshot.total} contributions</strong>
        </div>
        <ContributionCalendar />
      </div>
    </section>
  )
}
