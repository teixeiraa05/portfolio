import { useRef, useState, type ReactNode } from 'react'
import { SectionTitle } from '../components/SectionTitle'
import snapshot, { type Snapshot } from 'virtual:github-calendar'

const months = new Intl.DateTimeFormat('en', {
  month: 'short',
  timeZone: 'UTC',
})
const dates = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
})
const dayLength = 86400000

const activityAmount = (count: number) =>
  `${count.toLocaleString('en')} contribution${count === 1 ? '' : 's'}`

function ContributionCalendar({ snapshot }: { snapshot: Snapshot }) {
  const graph = useRef<HTMLDivElement>(null)
  const [tooltip, setTooltip] = useState<{
    day: number
    left: number
    top: number
  } | null>(null)
  const firstDay = new Date(snapshot.start)
  const firstWeekday = firstDay.getUTCDay()
  const weekCount = Math.ceil((firstWeekday + snapshot.levels.length) / 7)
  const days = [...snapshot.levels].map((level, index) => {
    const offset = firstWeekday + index
    return {
      level,
      date: new Date(firstDay.getTime() + index * dayLength),
      count: snapshot.counts[index],
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

  const showTooltip = (cell: HTMLElement, day: number) => {
    const graphBounds = graph.current?.getBoundingClientRect()
    if (!graphBounds) return
    const cellBounds = cell.getBoundingClientRect()
    setTooltip({
      day,
      left: cellBounds.left + cellBounds.width / 2 - graphBounds.left,
      top: cellBounds.top - graphBounds.top - 6,
    })
  }

  const hoveredDay = tooltip && days[tooltip.day]

  return (
    <div
      ref={graph}
      className="relative"
      role="img"
      aria-label={`GitHub activity from ${snapshot.start} through ${snapshot.end}, ${activityAmount(snapshot.total)}. Color intensity indicates daily activity.`}
    >
      <div
        className="overflow-x-auto"
        onPointerLeave={() => setTooltip(null)}
        onScroll={() => setTooltip(null)}
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
            {days.map(({ level, date, column, row }, index) => (
              <span
                key={date.getTime()}
                className="contribution-day hover:outline hover:outline-primary"
                data-level={level}
                style={{ gridColumn: column, gridRow: row }}
                onPointerEnter={(event) =>
                  showTooltip(event.currentTarget, index)
                }
                onPointerLeave={() => setTooltip(null)}
              />
            ))}
          </div>
        </div>
      </div>
      {tooltip && hoveredDay && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute z-10 w-max max-w-full -translate-x-1/2 -translate-y-full rounded-md border border-line bg-muted px-2.5 py-1.5 text-center text-xs text-ink shadow-lg"
          style={{
            left: `clamp(min(8rem, 50%), ${tooltip.left}px, max(calc(100% - 8rem), 50%))`,
            top: tooltip.top,
          }}
        >
          {hoveredDay.count == null
            ? `Activity level ${hoveredDay.level} of 4`
            : activityAmount(hoveredDay.count)}{' '}
          on {dates.format(hoveredDay.date)}
        </span>
      )}
    </div>
  )
}

export function ContributionActivity({ scene }: { scene?: ReactNode }) {
  return (
    <section
      className="activity-layout mb-10 grid items-center sm:mb-13"
      aria-labelledby="activity"
    >
      <div className="activity-content min-w-0">
        <SectionTitle id="activity" title="GitHub activity" />
        <div className="rounded-xl border border-line bg-surface p-5">
          {snapshot ? (
            <>
              <p className="mb-4 text-right text-sm font-semibold">
                {activityAmount(snapshot.total)}
              </p>
              <ContributionCalendar snapshot={snapshot} />
            </>
          ) : (
            <p className="text-sm text-muted-foreground">
              GitHub activity is currently unavailable.
            </p>
          )}
        </div>
      </div>
      {scene}
    </section>
  )
}
