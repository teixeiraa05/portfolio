export function requiredEnvironment(name) {
  const value = process.env[name]?.trim()
  if (!value) throw new Error(`Set ${name} before running this command.`)
  return value
}

const base = new URL(requiredEnvironment('DIRECTUS_URL'))
const loopback = ['localhost', '127.0.0.1', '[::1]'].includes(base.hostname)
if (
  !(base.protocol === 'https:' || (base.protocol === 'http:' && loopback)) ||
  base.username ||
  base.password ||
  base.search ||
  base.hash
)
  throw new Error('DIRECTUS_URL must be an HTTPS base URL or a local HTTP URL.')

export async function directus(path, { method = 'GET', token, body } = {}) {
  const response = await fetch(base.href.replace(/\/$/, '') + path, {
    method,
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(body && { 'Content-Type': 'application/json' }),
    },
    body: body && JSON.stringify(body),
    redirect: 'error',
    signal: AbortSignal.timeout(20_000),
  })
  if (!response.ok) {
    const { errors } = await response.json().catch(() => ({}))
    throw new Error(
      `Directus ${method} ${path.split('?')[0]} returned HTTP ${response.status} (${errors?.[0]?.extensions?.code ?? response.statusText}).`,
    )
  }
  if (response.status !== 204) return (await response.json()).data
}
