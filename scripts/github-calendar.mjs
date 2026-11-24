const moduleId = 'virtual:github-calendar'
const resolvedId = '\0' + moduleId

async function fetchCalendar() {
  const response = await fetch(
    'https://github.com/users/teixeiraa05/contributions',
    {
      signal: AbortSignal.timeout(10_000),
    },
  )
  if (!response.ok) throw new Error(`GitHub returned HTTP ${response.status}.`)

  const html = await response.text()
  const counts = new Map(
    [
      ...html.matchAll(
        /<tool-tip\b[^>]*\bfor="([^"]+)"[^>]*>\s*(No|[\d,]+) contributions? on /gi,
      ),
    ].map(([, id, count]) => [
      id,
      count === 'No' ? 0 : Number(count.replaceAll(',', '')),
    ]),
  )
  const days = [
    ...html.matchAll(
      /<td\b[^>]*\bdata-date="(\d{4}-\d{2}-\d{2})"[^>]*\bid="([^"]+)"[^>]*\bdata-level="([0-4])"[^>]*>/g,
    ),
  ]
    .map(([, date, id, level]) => ({ date, level, count: counts.get(id) }))
    .sort((a, b) => a.date.localeCompare(b.date))

  const total = html.match(/([\d,]+)\s+contributions?\s+in the last year/i)
  if (days.length < 365 || !total)
    throw new Error('Unexpected GitHub calendar format.')

  return {
    start: days[0].date,
    end: days.at(-1).date,
    levels: days.map(({ level }) => level).join(''),
    counts: days.map(({ count }) => count ?? null),
    total: Number(total[1].replaceAll(',', '')),
  }
}

export function githubCalendar() {
  /** @type {import('vite').Plugin} */
  const plugin = {
    name: 'portfolio-github-calendar',
    resolveId(id) {
      if (id === moduleId) return resolvedId
    },
    async load(id) {
      if (id !== resolvedId) return
      try {
        return `export default ${JSON.stringify(await fetchCalendar())}`
      } catch (error) {
        this.warn(`GitHub activity is unavailable. ${error.message}`)
        return 'export default null'
      }
    },
  }
  return plugin
}
