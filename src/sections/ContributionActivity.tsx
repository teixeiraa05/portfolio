import { useState } from 'react'
import { SectionTitle } from '../components/SectionTitle'
import activity from '../data/activity.json'

type Snapshot = {
  start: string
  end: string
  total: number
  levels: string
}

const sources = [
  { id: 'github', label: 'GitHub', unit: 'contribution' },
  { id: 'gitlab', label: 'GitLab', unit: 'event' },
] as const
type Source = (typeof sources)[number]

const snapshots: Record<Source['id'], Snapshot | null> = activity

const months = new Intl.DateTimeFormat('en', {
  month: 'short',
  timeZone: 'UTC',
})
const dayLength = 86400000

const activityAmount = (count: number, unit: Source['unit']) =>
  `${count.toLocaleString('en')} ${unit}${count === 1 ? '' : 's'}`

function ContributionCalendar({
  snapshot,
  source,
}: {
  snapshot: Snapshot
  source: Source
}) {
  const firstDay = new Date(snapshot.start)
  const firstWeekday = firstDay.getUTCDay()
  const weekCount = Math.ceil((firstWeekday + snapshot.levels.length) / 7)
  const days = [...snapshot.levels].map((level, index) => {
    const offset = firstWeekday + index
    return {
      level,
      date: new Date(firstDay.getTime() + index * dayLength),
      column: weekCount - Math.floor(offset / 7),
      row: (offset % 7) + 1,
    }
  })
  const monthLabels = new Map(
    days
      .filter(
        ({ date }, index) =>
          date.getUTCMonth() !== days[index + 1]?.date.getUTCMonth(),
      )
      .map(({ date, column }) => [column, months.format(date)]),
  )

  return (
    <div
      className="overflow-x-auto"
      role="img"
      aria-label={`${source.label} activity from ${snapshot.start} through ${snapshot.end}, ${activityAmount(snapshot.total, source.unit)}. Color intensity indicates daily activity.`}
    >
      <div className="min-w-132">
        <div
          className="mb-1.5 grid grid-cols-53 gap-x-[3px] font-mono text-xs text-muted-foreground"
          aria-hidden="true"
        >
          {[...monthLabels].map(([column, label]) => (
            <span
              key={column}
              className="row-start-1"
              style={{ gridColumn: column }}
            >
              {label}
            </span>
          ))}
        </div>
        <div
          className="grid grid-cols-53 grid-rows-[repeat(7,auto)] gap-[3px]"
          aria-hidden="true"
        >
          {days.map(({ level, date, column, row }) => (
            <span
              key={date.getTime()}
              className="contribution-day"
              data-level={level}
              style={{ gridColumn: column, gridRow: row }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export function ContributionActivity() {
  const [source, setSource] = useState<Source>(sources[0])
  const snapshot = snapshots[source.id]

  return (
    <section className="mb-10 sm:mb-13" aria-labelledby="activity">
      <SectionTitle id="activity" title="Code activity" />
      <div className="rounded-xl border border-line bg-surface p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <div
            role="group"
            aria-label="Activity source"
            className="flex gap-1 rounded-lg border border-line p-0.5"
          >
            {sources.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={item.id === source.id}
                onClick={() => setSource(item)}
                className="cursor-pointer appearance-none rounded-md border-0 bg-transparent px-2.5 py-1 font-mono text-sm text-muted-foreground hover:bg-accent aria-pressed:bg-accent aria-pressed:text-primary"
              >
                {item.label}
              </button>
            ))}
          </div>
          <div aria-live="polite" className="text-sm">
            {snapshot && (
              <strong>{activityAmount(snapshot.total, source.unit)}</strong>
            )}
          </div>
        </div>
        {snapshot ? (
          <ContributionCalendar
            key={source.id}
            snapshot={snapshot}
            source={source}
          />
        ) : (
          <p role="status" className="text-sm text-muted-foreground">
            {source.label} activity will appear after the first successful
            refresh.
          </p>
        )}
      </div>
    </section>
  )
}
