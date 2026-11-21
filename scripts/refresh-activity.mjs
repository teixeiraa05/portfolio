// Refresh the checked-in fallback from GitHub. Builds can run fully offline.
import { writeFile, rename } from 'node:fs/promises'

const username = 'teixeiraa05'
const url = `https://github.com/users/${username}/contributions`
const response = await fetch(url, { signal: AbortSignal.timeout(20000) })
if (!response.ok)
  throw new Error(`GitHub returned ${response.status} for ${url}`)
const calendar = await response.text()
const cells = [
  ...calendar.matchAll(
    /<td\b[^>]*\bdata-date="(\d{4}-\d{2}-\d{2})"[^>]*\bdata-level="([0-4])"[^>]*>/g,
  ),
]
  .map(([, date, level]) => ({ date, level }))
  .sort((a, b) => a.date.localeCompare(b.date))
const total = calendar.match(/([\d,]+)\s+contributions?\s+in the last year/i)
if (cells.length < 365 || !total)
  throw new Error('Unexpected GitHub activity format')
const snapshot = {
  start: cells[0].date,
  end: cells.at(-1).date,
  levels: cells.map((cell) => cell.level).join(''),
  total: Number(total[1].replaceAll(',', '')),
}
const file = new URL('../src/data/github.json', import.meta.url)
const tmpFile = new URL(file.href + '.' + process.pid + '.tmp')
await writeFile(tmpFile, JSON.stringify(snapshot, null, 2) + '\n')
await rename(tmpFile, file)
