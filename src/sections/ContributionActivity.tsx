import { useEffect, useRef, useState } from 'react'
import { SectionTitle } from '../components/SectionTitle'
import activity from '../data/activity.json'

type Snapshot = {
  start: string
  end: string
  total: number
  levels: string
  counts?: number[]
}

const sources = [
  { id: 'github', label: 'GitHub', unit: 'contribution' },
  { id: 'gitlab', label: 'GitLab', unit: 'event' },
] as const
type Source = (typeof sources)[number]

const directusUrl =
  import.meta.env.VITE_DIRECTUS_URL?.replace(/\/$/, '') ||
  (import.meta.env.DEV ? 'http://127.0.0.1:8055' : undefined)

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
const refreshInterval = 60 * 60 * 1000

const isSnapshot = (value: unknown): value is Snapshot => {
  if (!value || typeof value !== 'object') return false
  const { start, end, levels, total, counts } = value as Partial<Snapshot>
  return (
    typeof start === 'string' &&
    typeof end === 'string' &&
    /^\d{4}-\d{2}-\d{2}$/.test(start) &&
    /^\d{4}-\d{2}-\d{2}$/.test(end) &&
    Date.parse(end) - Date.parse(start) === 364 * dayLength &&
    typeof levels === 'string' &&
    /^[0-4]{365}$/.test(levels) &&
    typeof total === 'number' &&
    Number.isSafeInteger(total) &&
    total >= 0 &&
    (counts === undefined ||
      (Array.isArray(counts) &&
        counts.length === levels.length &&
        counts.every((count) => Number.isSafeInteger(count) && count >= 0)))
  )
}

const activityAmount = (count: number, unit: Source['unit']) =>
  `${count.toLocaleString('en')} ${unit}${count === 1 ? '' : 's'}`

function ContributionCalendar({
  snapshot,
  source,
}: {
  snapshot: Snapshot
  source: Source
}) {
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
      count: snapshot.counts?.[index],
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
      aria-label={`${source.label} activity from ${snapshot.start} through ${snapshot.end}, ${activityAmount(snapshot.total, source.unit)}. Color intensity indicates daily activity.`}
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
          {hoveredDay.count === undefined
            ? `Activity level ${hoveredDay.level} of 4`
            : activityAmount(hoveredDay.count, source.unit)}{' '}
          on {dates.format(hoveredDay.date)}
        </span>
      )}
    </div>
  )
}

export function ContributionActivity() {
  const [source, setSource] = useState<Source>(sources[0])
  const [snapshots, setSnapshots] = useState<
    Partial<Record<Source['id'], Snapshot>>
  >({})
  const liveSnapshot = snapshots[source.id]
  const snapshot = liveSnapshot ?? activity[source.id]

  useEffect(() => {
    if (!directusUrl) return
    const controller = new AbortController()

    const loadActivity = async () => {
      try {
        const response = await fetch(
          `${directusUrl}/items/activity_calendars?fields=id,snapshot&limit=2`,
          {
            signal: AbortSignal.any([
              controller.signal,
              AbortSignal.timeout(10_000),
            ]),
          },
        )
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const { data } = await response.json()
        if (!Array.isArray(data)) throw new Error('Invalid activity response.')

        const updates: Partial<Record<Source['id'], Snapshot>> = {}
        for (const item of data) {
          if (
            (item?.id === 'github' || item?.id === 'gitlab') &&
            isSnapshot(item.snapshot)
          ) {
            const id: Source['id'] = item.id
            updates[id] = item.snapshot
          }
        }
        if (!controller.signal.aborted)
          setSnapshots((current) => ({ ...current, ...updates }))
      } catch (error) {
        if (!controller.signal.aborted)
          console.warn('Could not load code activity.', error)
      }
    }

    void loadActivity()
    const interval = window.setInterval(loadActivity, refreshInterval)
    return () => {
      controller.abort()
      window.clearInterval(interval)
    }
  }, [])

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
              <>
                <strong>{activityAmount(snapshot.total, source.unit)}</strong>
                {!liveSnapshot && (
                  <span className="ml-2 text-muted-foreground">
                    through <time dateTime={snapshot.end}>{snapshot.end}</time>
                  </span>
                )}
              </>
            )}
          </div>
        </div>
        {snapshot ? (
          <ContributionCalendar
            key={`${source.id}-${snapshot.start}`}
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
