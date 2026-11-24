import { readFile } from 'node:fs/promises'
import { directus, requiredEnvironment } from './directus.mjs'

const writerToken = requiredEnvironment('DIRECTUS_WRITE_TOKEN')
const { access_token: token } = await directus('/auth/login', {
  method: 'POST',
  body: {
    email: requiredEnvironment('DIRECTUS_ADMIN_EMAIL'),
    password: requiredEnvironment('DIRECTUS_ADMIN_PASSWORD'),
  },
})
const get = (path) => directus(path, { token })
const create = (path, body) => directus(path, { token, method: 'POST', body })
const collection = 'activity_calendars'
const items = `/items/${collection}`
const collections = await get('/collections')
if (!collections.some((item) => item.collection === collection)) {
  await create('/collections', {
    collection,
    schema: {},
    fields: [
      {
        field: 'id',
        type: 'string',
        meta: { collection, field: 'id' },
        schema: { is_primary_key: true },
      },
      {
        field: 'snapshot',
        type: 'json',
        meta: { collection, field: 'snapshot' },
        schema: { is_nullable: false },
      },
    ],
  })
}

const seeds = JSON.parse(
  await readFile(new URL('../src/data/activity.json', import.meta.url), 'utf8'),
)
const records = await get(`${items}?fields=id`)
for (const [id, snapshot] of Object.entries(seeds)) {
  if (!records.some((record) => record.id === id))
    await create(items, { id, snapshot })
}

// Stable IDs let a rerun finish an interrupted setup without duplicating policies or users.
const publicPolicy = 'abf8a154-5b1c-4a46-ac9c-7300570f4f17'
const writerPolicy = '990fe933-e433-45e1-bc20-c56eec90be81'
const writer = 'cec6ff37-47ef-4cb1-a484-487fac3049cf'
if (!(await get(`/policies?filter[id][_eq]=${writerPolicy}`)).length) {
  await create('/policies', {
    id: writerPolicy,
    name: 'Portfolio activity writer',
  })
}
const permissions = await get(
  `/permissions?filter[collection][_eq]=${collection}`,
)
for (const [policy, action, fields] of [
  [publicPolicy, 'read', ['id', 'snapshot']],
  [writerPolicy, 'update', ['snapshot']],
]) {
  if (
    !permissions.some(
      (rule) => rule.policy === policy && rule.action === action,
    )
  ) {
    await create('/permissions', {
      collection,
      policy,
      action,
      fields,
      permissions: { id: { _in: ['github', 'gitlab'] } },
    })
  }
}
if (!(await get(`/users?fields=id&filter[id][_eq]=${writer}`)).length) {
  await create('/users', {
    id: writer,
    first_name: 'Activity sync',
    token: writerToken,
    policies: [{ policy: writerPolicy }],
  })
}
console.log('The GitHub and GitLab calendars are ready in Directus.')
