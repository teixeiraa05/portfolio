import { rename, writeFile } from 'node:fs/promises'

const dayLength = 86_400_000
const now = new Date()
const today = Date.parse(now.toISOString().slice(0, 10))
const dateKey = (timestamp) => new Date(timestamp).toISOString().slice(0, 10)
const dates = Array.from({ length: 365 }, (_, index) =>
  dateKey(today - (364 - index) * dayLength),
)
const start = dates[0]
const end = dates.at(-1)
const githubLevels = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
}

function requiredEnvironment(name) {
  const value = process.env[name]?.trim()
  if (!value) throw new Error(`Set ${name} before refreshing activity.`)
  return value
}

async function request(source, url, options) {
  const response = await fetch(url, {
    ...options,
    redirect: 'error',
    signal: AbortSignal.timeout(20_000),
  })
  if (!response.ok)
    throw new Error(`${source} API returned HTTP ${response.status}.`)
  return response
}

function snapshot(days) {
  const counts = dates.map((date) => days.get(date)?.count ?? 0)
  return {
    start,
    end,
    levels: dates.map((date) => days.get(date)?.level ?? 0).join(''),
    counts,
    total: counts.reduce((sum, count) => sum + count, 0),
  }
}

async function githubActivity(token) {
  const response = await request('GitHub', 'https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query Calendar($login: String!, $from: DateTime!, $to: DateTime!) {
          user(login: $login) {
            contributionsCollection(from: $from, to: $to) {
              contributionCalendar {
                weeks {
                  contributionDays { date contributionCount contributionLevel }
                }
              }
            }
          }
        }
      `,
      variables: {
        login: 'teixeiraa05',
        from: `${start}T00:00:00Z`,
        to: now.toISOString(),
      },
    }),
  })
  const { data, errors } = await response.json()
  const weeks = data?.user?.contributionsCollection?.contributionCalendar?.weeks
  if (errors?.length || !weeks?.length)
    throw new Error(
      'GitHub returned no contribution calendar. Check the token permissions.',
    )

  const days = new Map()
  for (const { contributionDays } of weeks) {
    for (const {
      date,
      contributionCount: count,
      contributionLevel,
    } of contributionDays) {
      const level = githubLevels[contributionLevel]
      if (!Number.isInteger(count) || count < 0 || !Number.isInteger(level))
        throw new Error('GitHub returned an invalid calendar entry.')
      days.set(date, { count, level })
    }
  }
  if (!dates.some((date) => days.has(date)))
    throw new Error('GitHub returned no dates in the requested range.')
  return snapshot(days)
}

function gitlabEventsUrl(profileUrl) {
  const url = URL.parse(profileUrl)
  const profilePath = url?.pathname.replace(/\/+$/, '')
  const username = profilePath?.split('/').at(-1)
  if (
    url?.protocol !== 'https:' ||
    !username ||
    url.username ||
    url.password ||
    url.search ||
    url.hash
  )
    throw new Error(
      'GITLAB_PROFILE_URL must be the HTTPS address of your GitLab profile.',
    )
  const instancePath = profilePath.slice(0, -username.length)
  url.pathname = `${instancePath}api/v4/users/${username}/events`
  return url
}

async function gitlabActivity(url, token) {
  const pageSize = 100
  url.search = new URLSearchParams({
    after: dateKey(Date.parse(start) - dayLength),
    before: dateKey(today + dayLength),
    per_page: String(pageSize),
    sort: 'asc',
  })
  const counts = new Map()
  const seen = new Set()
  for (let page = 1; ; page++) {
    url.searchParams.set('page', String(page))
    const response = await request('GitLab', url, {
      headers: { 'PRIVATE-TOKEN': token },
    })
    const events = await response.json()
    if (!Array.isArray(events))
      throw new Error('GitLab returned an invalid events response.')
    for (const { id, created_at: createdAt } of events) {
      const timestamp = Date.parse(createdAt)
      if (!Number.isInteger(id) || !Number.isFinite(timestamp))
        throw new Error('GitLab returned an invalid event.')
      const date = dateKey(timestamp)
      if (seen.has(id) || date < start || date > end) continue
      seen.add(id)
      counts.set(date, (counts.get(date) ?? 0) + 1)
    }

    // GitLab.com can omit X-Next-Page. The link also covers sparse pages after visibility filtering.
    const nextPage = response.headers.get('x-next-page')
    const links = response.headers.get('link')
    const hasNextPage = nextPage || /rel="next"/.test(links ?? '')
    if (
      !hasNextPage &&
      (nextPage !== null || links || events.length < pageSize)
    )
      break
  }

  const days = new Map(
    [...counts].map(([date, count]) => [
      date,
      {
        count,
        level: [0, 5, 10, 20].filter((threshold) => count > threshold).length,
      },
    ]),
  )
  return snapshot(days)
}

const githubToken = requiredEnvironment('ACTIVITY_GITHUB_TOKEN')
const gitlabToken = requiredEnvironment('ACTIVITY_GITLAB_TOKEN')
const gitlabUrl = gitlabEventsUrl(requiredEnvironment('GITLAB_PROFILE_URL'))
const [github, gitlab] = await Promise.all([
  githubActivity(githubToken),
  gitlabActivity(gitlabUrl, gitlabToken),
])

const file = new URL('../src/data/activity.json', import.meta.url)
const temporary = new URL(`${file.href}.${process.pid}.tmp`)
await writeFile(temporary, JSON.stringify({ github, gitlab }, null, 2) + '\n')
await rename(temporary, file)
console.log(`Refreshed GitHub and GitLab activity through ${end}.`)
