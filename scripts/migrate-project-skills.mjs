/**
 * migrate-project-skills.mjs
 *
 * Converts existing project.techStack string arrays into proper
 * skill and tool references on the project documents.
 *
 * Must be run AFTER seed-skills.mjs and seed-tools.mjs.
 * Safe to re-run — it checks existing skills/projectTools first.
 *
 * Usage (from portfolio_cms/ directory):
 *   node scripts/migrate-project-skills.mjs
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

// ─── techStack string → skill _id mapping ────────────────────────────────────
// Maps each free-text techStack value to the correct skill document _id.
// If a value maps to a tool instead (e.g. Cisco Packet Tracer), it goes into
// projectTools. Values with no mapping are skipped.

const SKILL_MAP = {
  'Python':                   'skill-python',
  'TypeScript':               'skill-typescript',
  'JavaScript':               'skill-javascript',
  'React':                    'skill-react',
  'Next.js':                  'skill-nextjs',
  'Node.js':                  'skill-nodejs',
  'Express':                  'skill-express',
  'Electron':                 'skill-electron',
  'Tailwind CSS':             'skill-tailwind',
  'Vite':                     'skill-vite',
  'Three.js':                 'skill-threejs',
  'Framer Motion':            'skill-framer',
  'NextAuth.js':              'skill-nextauth',
  'Zustand':                  'skill-zustand',
  'llama.cpp':                'skill-llamacpp',
  'MongoDB':                  'skill-mongodb',
  'Cisco IOS':                'skill-cisco-ios',
  'OSPF':                     'skill-ospf',
  'VLANs':                    'skill-vlans',
  'DHCP':                     'skill-dhcp',
  'Subnetting':               'skill-subnetting',
  'Machine Learning':         'skill-ml',
  'Security':                 'skill-security',
  'IoT':                      'skill-iot',
  'Raspberry Pi':             'skill-raspberry-pi',
  'Parallel Computing':       'skill-parallel',
  'URL Analysis':             'skill-url-analysis',
  'UML':                      'skill-uml',
  'Waterfall SDLC':           'skill-waterfall',
  'System Design':            'skill-sysdesign',
  'Requirements Engineering': 'skill-req-eng',
}

// Values that map to tool documents (from seed-tools.mjs)
const TOOL_MAP = {
  'Cisco Packet Tracer': 'tool-cisco-packet-tracer',
  'Sanity CMS':          'tool-sanity-cms',
  'Docker':              'tool-docker',
  'Git & GitHub':        'tool-git',
}

// ─── Runner ───────────────────────────────────────────────────────────────────

const ok   = (m) => console.log(`\x1b[32m✅ ${m}\x1b[0m`)
const skip = (m) => console.log(`\x1b[33m⏭  ${m}\x1b[0m`)
const warn = (m) => console.log(`\x1b[33m⚠️  ${m}\x1b[0m`)
const fail = (m) => console.log(`\x1b[31m❌ ${m}\x1b[0m`)
const info = (m) => console.log(`\x1b[36mℹ️  ${m}\x1b[0m`)

const ref = (id) => ({ _type: 'reference', _ref: id, _key: id })

async function migrate() {
  // Fetch all published projects that still have techStack data
  const projects = await client.fetch(
    `*[_type == "project" && !(_id in path("drafts.**"))] { _id, title, techStack, skills, projectTools }`
  )

  info(`Found ${projects.length} projects to process.\n`)

  for (const project of projects) {
    const techStack = project.techStack ?? []

    // Skip if already migrated (has skills or projectTools set, no techStack)
    if ((project.skills?.length > 0 || project.projectTools?.length > 0) && techStack.length === 0) {
      skip(`${project.title} — already migrated`)
      continue
    }

    if (techStack.length === 0) {
      skip(`${project.title} — no techStack to migrate`)
      continue
    }

    const skillRefs = []
    const toolRefs  = []
    const unmapped  = []

    for (const tech of techStack) {
      if (SKILL_MAP[tech]) {
        skillRefs.push(ref(SKILL_MAP[tech]))
      } else if (TOOL_MAP[tech]) {
        toolRefs.push(ref(TOOL_MAP[tech]))
      } else {
        unmapped.push(tech)
      }
    }

    if (unmapped.length > 0) {
      warn(`${project.title} — unmapped values (skipped): ${unmapped.join(', ')}`)
    }

    try {
      await client
        .patch(project._id)
        .set({ skills: skillRefs, projectTools: toolRefs })
        .unset(['techStack'])
        .commit()

      ok(`${project.title} → ${skillRefs.length} skills, ${toolRefs.length} tools`)
    } catch (e) {
      fail(`${project.title} — ${e.message}`)
    }
  }

  console.log('\n\x1b[36mDone. Refresh Sanity Studio to see the changes.\x1b[0m')
}

migrate().catch((e) => { console.error(e); process.exit(1) })
