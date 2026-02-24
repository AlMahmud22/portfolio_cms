/**
 * fix-singletons.mjs
 *
 * Ensures each singleton (hero, about, contact, settings) is published at the
 * correct _id (e.g. "hero-singleton"). Documents seeded via client.create()
 * can end up as drafts or under the wrong _id — this script repairs that.
 *
 * Priority order for content:
 *   1. Already correct published doc → skip
 *   2. Existing draft at "drafts.<id>" → publish it
 *   3. Any published doc of that type with a different _id → copy to correct id
 *   4. Built-in fallback seed data → create fresh
 *
 * Usage (from portfolio_cms/ directory):
 *   node scripts/fix-singletons.mjs
 * Requires SANITY_API_TOKEN in portfolio_cms/.env or as an env var.
 */

import { createClient } from '@sanity/client'
import { readFileSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Load .env from portfolio_cms/ (one level up from scripts/)
const envPath = resolve(__dirname, '../.env')
if (existsSync(envPath)) {
  readFileSync(envPath, 'utf-8')
    .split('\n')
    .filter((l) => l.includes('=') && !l.startsWith('#'))
    .forEach((l) => {
      const [key, ...rest] = l.split('=')
      process.env[key.trim()] = rest.join('=').trim()
    })
}

const token = process.env.SANITY_API_TOKEN || process.env.SANITY_API_WRITE_TOKEN
if (!token) {
  console.error('\x1b[31mERROR: No SANITY_API_TOKEN found.\x1b[0m')
  console.error('Add it to portfolio_cms/.env or pass as env var:')
  console.error('  SANITY_API_TOKEN=xxx node scripts/fix-singletons.mjs')
  process.exit(1)
}

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || '7d6vxzye',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  apiVersion: '2024-02-22',
  token,
  useCdn: false,
})

// ─── Fallback seed data (used only when no existing doc is found) ─────────────

const toBlock = (text) => [{
  _type: 'block',
  children: [{ _type: 'span', text }],
  markDefs: [],
  style: 'normal',
}]

const fallbackData = {
  hero: {
    _id: 'hero-singleton',
    _type: 'hero',
    fullName: { firstName: 'Sadik Al', lastName: 'Mahmud' },
    titles: ['Full-Stack Developer', 'Network Engineer', 'CS Graduate', 'Problem Solver'],
    terminalCommands: {
      greeting: '$ welcome --user visitor',
      output: [
        'Initializing portfolio...',
        'Loading profile...',
        'Status: Open to opportunities',
        'Location: Kuala Lumpur, Malaysia',
        'Ready.',
      ],
    },
    scrollHintText: 'Scroll to explore',
  },
  about: {
    _id: 'about-singleton',
    _type: 'about',
    bio: toBlock(
      'Computer Science graduate from Universiti Teknologi Malaysia with experience in full-stack web development, network engineering, and production deployments. Built e-commerce systems, AI desktop apps, and network infrastructure. CCNA certified. Currently seeking full-time opportunities in software or network engineering.'
    ),
    quickStats: {
      yearsExperience: '4',
      projectsCompleted: '8',
    },
    skills: {
      frontend: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Three.js', 'Framer Motion', 'Tailwind CSS', 'HTML5', 'CSS3'],
      backend: ['Node.js', 'Express.js', 'PostgreSQL', 'MongoDB', 'MySQL', 'REST APIs', 'Docker'],
      networking: ['CCNA Certified', 'Cisco IOS', 'Network Security', 'VLANs', 'OSPF', 'DHCP', 'Subnetting', 'Packet Tracer'],
    },
  },
  contact: {
    _id: 'contact-singleton',
    _type: 'contact',
    email: 'mahmud23k@gmail.com',
    availabilityStatus: 'available',
    formSuccessMessage: 'Thank you for your message! I will get back to you soon.',
  },
  settings: {
    _id: 'settings-singleton',
    _type: 'settings',
    siteTitle: 'Sadik Al Mahmud — Portfolio',
    siteDescription: 'Full-Stack Developer & Network Engineer based in Kuala Lumpur, Malaysia.',
    siteUrl: 'https://mahmud22.vercel.app',
  },
}

// ─── Singleton definitions ────────────────────────────────────────────────────

const singletons = [
  { type: 'hero',     id: 'hero-singleton' },
  { type: 'about',   id: 'about-singleton' },
  { type: 'contact', id: 'contact-singleton' },
  { type: 'settings', id: 'settings-singleton' },
]

const ok   = (msg) => console.log(`\x1b[32m✅ ${msg}\x1b[0m`)
const warn = (msg) => console.log(`\x1b[33m⚠️  ${msg}\x1b[0m`)
const info = (msg) => console.log(`\x1b[36mℹ️  ${msg}\x1b[0m`)
const fail = (msg) => console.log(`\x1b[31m❌ ${msg}\x1b[0m`)

// ─── Main ─────────────────────────────────────────────────────────────────────

async function run() {
  info('Checking singleton documents...\n')

  for (const { type, id } of singletons) {
    try {
      // 1. Published singleton already at the correct ID?
      const published = await client.getDocument(id)
      if (published) {
        ok(`${type}: already published at "${id}" — skipping`)
        continue
      }

      // 2. Draft at "drafts.<id>"?
      const draft = await client.getDocument(`drafts.${id}`)
      let sourceData, sourceLabel

      if (draft) {
        const { _id, _rev, _updatedAt, _createdAt, ...fields } = draft
        sourceData = { ...fields, _id: id, _type: type }
        sourceLabel = `existing draft (drafts.${id})`
      } else {
        // 3. Any published doc of this type with a different _id?
        const legacy = await client.fetch(
          `*[_type == $type && !(_id in path("drafts.**"))] | order(_updatedAt desc)[0]`,
          { type }
        )
        if (legacy && legacy._id !== id) {
          const { _id: oldId, _rev, ...fields } = legacy
          sourceData = { ...fields, _id: id, _type: type }
          sourceLabel = `existing document (old id: ${oldId})`
        } else {
          // 4. Fall back to built-in seed data
          sourceData = fallbackData[type]
          sourceLabel = 'built-in fallback seed data'
          if (!sourceData) {
            warn(`${type}: no fallback data defined — skipping`)
            continue
          }
        }
      }

      await client.createOrReplace(sourceData)
      ok(`${type}: published at "${id}" using ${sourceLabel}`)

    } catch (e) {
      fail(`${type}: ${e.message}`)
    }
  }

  console.log('\n\x1b[36mDone. Restart Sanity Studio and refresh the browser.\x1b[0m')
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
