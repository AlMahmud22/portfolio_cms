/**
 * seed-skills.mjs
 *
 * Seeds skill documents into Sanity CMS as published documents.
 * Uses createOrReplace() — safe to re-run any time (updates in place).
 *
 * To add a skill:   add an entry to the `skills` array below and re-run.
 * To edit a skill:  change it in the array and re-run.
 * To delete a skill: remove from the array, then delete the doc in Studio.
 *
 * Categories: Language | Framework | Library | Database | Networking | Methodology | Concept
 *
 * Usage (from portfolio_cms/ directory):
 *   node scripts/seed-skills.mjs
 */

import { createClient } from '@sanity/client'
import { readFileSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
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
  console.error('\x1b[31mERROR: No SANITY_API_TOKEN found in portfolio_cms/.env\x1b[0m')
  process.exit(1)
}

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || '7d6vxzye',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  apiVersion: '2024-02-22',
  token,
  useCdn: false,
})

// ─── SKILLS DATA ──────────────────────────────────────────────────────────────
// Edit this array freely. Re-run the script to apply changes.
// ─────────────────────────────────────────────────────────────────────────────

const skills = [
  // ── Languages
  { _id: 'skill-python',       name: 'Python',                  category: 'Language',    order: 1  },
  { _id: 'skill-typescript',   name: 'TypeScript',              category: 'Language',    order: 2  },
  { _id: 'skill-javascript',   name: 'JavaScript',              category: 'Language',    order: 3  },

  // ── Frameworks
  { _id: 'skill-react',        name: 'React',                   category: 'Framework',   order: 10 },
  { _id: 'skill-nextjs',       name: 'Next.js',                 category: 'Framework',   order: 11 },
  { _id: 'skill-nodejs',       name: 'Node.js',                 category: 'Framework',   order: 12 },
  { _id: 'skill-express',      name: 'Express',                 category: 'Framework',   order: 13 },
  { _id: 'skill-electron',     name: 'Electron',                category: 'Framework',   order: 14 },
  { _id: 'skill-tailwind',     name: 'Tailwind CSS',            category: 'Framework',   order: 15 },
  { _id: 'skill-vite',         name: 'Vite',                    category: 'Framework',   order: 16 },

  // ── Libraries
  { _id: 'skill-threejs',      name: 'Three.js',                category: 'Library',     order: 20 },
  { _id: 'skill-framer',       name: 'Framer Motion',           category: 'Library',     order: 21 },
  { _id: 'skill-nextauth',     name: 'NextAuth.js',             category: 'Library',     order: 22 },
  { _id: 'skill-zustand',      name: 'Zustand',                 category: 'Library',     order: 23 },
  { _id: 'skill-llamacpp',     name: 'llama.cpp',               category: 'Library',     order: 24 },

  // ── Databases
  { _id: 'skill-mongodb',      name: 'MongoDB',                 category: 'Database',    order: 30 },

  // ── Networking
  { _id: 'skill-cisco-ios',    name: 'Cisco IOS',               category: 'Networking',  order: 40 },
  { _id: 'skill-ospf',         name: 'OSPF',                    category: 'Networking',  order: 41 },
  { _id: 'skill-vlans',        name: 'VLANs',                   category: 'Networking',  order: 42 },
  { _id: 'skill-dhcp',         name: 'DHCP',                    category: 'Networking',  order: 43 },
  { _id: 'skill-subnetting',   name: 'Subnetting',              category: 'Networking',  order: 44 },

  // ── Concepts
  { _id: 'skill-ml',           name: 'Machine Learning',        category: 'Concept',     order: 50 },
  { _id: 'skill-security',     name: 'Security',                category: 'Concept',     order: 51 },
  { _id: 'skill-iot',          name: 'IoT',                     category: 'Concept',     order: 52 },
  { _id: 'skill-raspberry-pi', name: 'Raspberry Pi',            category: 'Concept',     order: 53 },
  { _id: 'skill-parallel',     name: 'Parallel Computing',      category: 'Concept',     order: 54 },
  { _id: 'skill-url-analysis', name: 'URL Analysis',            category: 'Concept',     order: 55 },

  // ── Methodology
  { _id: 'skill-uml',          name: 'UML',                     category: 'Methodology', order: 60 },
  { _id: 'skill-waterfall',    name: 'Waterfall SDLC',          category: 'Methodology', order: 61 },
  { _id: 'skill-sysdesign',    name: 'System Design',           category: 'Methodology', order: 62 },
  { _id: 'skill-req-eng',      name: 'Requirements Engineering', category: 'Methodology', order: 63 },
]

// ─── Runner ───────────────────────────────────────────────────────────────────

const ok   = (m) => console.log(`\x1b[32m✅ ${m}\x1b[0m`)
const fail = (m) => console.log(`\x1b[31m❌ ${m}\x1b[0m`)
const info = (m) => console.log(`\x1b[36mℹ️  ${m}\x1b[0m`)

async function seed() {
  info(`Seeding ${skills.length} skills...\n`)
  let created = 0, updated = 0, failed = 0

  for (const skill of skills) {
    const doc = {
      ...skill,
      _type: 'skill',
      slug: { _type: 'slug', current: skill._id.replace('skill-', '') },
    }
    try {
      const existing = await client.getDocument(doc._id)
      await client.createOrReplace(doc)
      if (existing) { ok(`Updated:  ${doc.name}`); updated++ }
      else           { ok(`Created:  ${doc.name}`); created++ }
    } catch (e) {
      fail(`Failed:   ${doc.name} — ${e.message}`)
      failed++
    }
  }

  console.log(`\n\x1b[36mDone — ${created} created, ${updated} updated, ${failed} failed.\x1b[0m`)
}

seed().catch((e) => { console.error(e); process.exit(1) })
