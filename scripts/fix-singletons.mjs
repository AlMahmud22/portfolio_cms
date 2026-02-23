import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'

const env = Object.fromEntries(
  readFileSync('../sanity/.env', 'utf-8')
    .split('\n')
    .filter(l => l.includes('='))
    .map(l => l.split('=').map(s => s.trim()))
)

const client = createClient({
  projectId: env.SANITY_STUDIO_PROJECT_ID ?? env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '7d6vxzye',
  dataset: env.SANITY_STUDIO_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  token: env.SANITY_API_TOKEN ?? env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

const singletons = [
  { type: 'hero', id: 'hero-singleton' },
  { type: 'about', id: 'about-singleton' },
  { type: 'contact', id: 'contact-singleton' },
  { type: 'settings', id: 'settings-singleton' },
]

async function run() {
  if (!client.config().token) {
    console.error('ERROR: No token found. Please set SANITY_API_TOKEN in ../sanity/.env')
    process.exit(1)
  }

  for (const { type, id } of singletons) {
    // Check if singleton ID already exists
    const existing = await client.fetch(`*[_type == $type && _id == $id][0]`, { type, id })
    if (existing) {
      console.log(`✅ ${type}: singleton already correct (${id})`)
      continue
    }

    // Get the most recently updated document of this type
    const latest = await client.fetch(
      `*[_type == $type && !(_id in path("drafts.**"))] | order(_updatedAt desc)[0]`,
      { type }
    )

    if (latest) {
      // Create with correct singleton ID, copying all fields
      const { _id, _rev, ...fields } = latest
      await client.createOrReplace({ ...fields, _id: id, _type: type })
      console.log(`✅ ${type}: created singleton from existing document`)

      // Delete the old document with wrong ID (optional - comment out if unsure)
      // await client.delete(_id)
    } else {
      console.log(`⚠️  ${type}: no existing document found — create one in Studio`)
    }
  }

  console.log('Done. Refresh Sanity Studio.')
}

run().catch(err => {
  console.error(err)
  process.exit(1)
})
