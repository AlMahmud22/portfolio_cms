/**
 * seed-tools.mjs
 *
 * Seeds tool documents into Sanity CMS.
 * Uses createOrReplace() so documents are always published (never drafts).
 * Running this multiple times is safe — it will update existing tools in place.
 *
 * To add a tool:   add an entry to the `tools` array below.
 * To edit a tool:  change the fields in the `tools` array, re-run the script.
 * To delete a tool: remove it from the array, then delete it manually in Studio.
 *
 * Usage (from portfolio_cms/ directory):
 *   node scripts/seed-tools.mjs
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
  console.error('  SANITY_API_TOKEN=xxx node scripts/seed-tools.mjs')
  process.exit(1)
}

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || '7d6vxzye',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  apiVersion: '2024-02-22',
  token,
  useCdn: false,
})

// ─── TOOLS DATA ───────────────────────────────────────────────────────────────
// Edit this array to add / modify / reorder tools.
// To delete a tool: remove it here, then delete the document in Sanity Studio.
//
// Categories: '3D' | 'Video' | 'Design' | 'Development' | 'Networking' | 'Cloud & Deployment'
// icon3DPath: path inside portfolio/public/ (e.g. /models/tools/blender.glb)
// ─────────────────────────────────────────────────────────────────────────────

const tools = [
  {
    _id: 'tool-blender',
    _type: 'tool',
    name: 'Blender',
    slug: { _type: 'slug', current: 'blender' },
    description:
      'Professional 3D modeling, animation, and rendering software. Used for creating 3D assets, character design, product visualization, and architectural renders. Expertise in modeling, texturing, lighting, and animation workflows.',
    category: '3D',
    icon3DPath: '/models/tools/blender-logo.glb',
    website: 'https://www.blender.org',
    order: 1,
  },
  {
    _id: 'tool-premiere',
    _type: 'tool',
    name: 'Adobe Premiere Pro',
    slug: { _type: 'slug', current: 'premiere-pro' },
    description:
      'Industry-standard video editing software for professional video production. Experienced in multi-track editing, color grading, motion graphics, audio mixing, and output optimization for various platforms.',
    category: 'Video',
    icon3DPath: '/models/tools/premiere-logo.glb',
    website: 'https://www.adobe.com/products/premiere.html',
    order: 2,
  },
  {
    _id: 'tool-after-effects',
    _type: 'tool',
    name: 'Adobe After Effects',
    slug: { _type: 'slug', current: 'after-effects' },
    description:
      'Motion graphics and visual effects software for creating animations, compositing, and post-production effects. Skilled in keyframe animation, expressions, particle systems, and creating dynamic motion graphics.',
    category: 'Video',
    icon3DPath: '/models/tools/after-effects-logo.glb',
    website: 'https://www.adobe.com/products/aftereffects.html',
    order: 3,
  },
  {
    _id: 'tool-illustrator',
    _type: 'tool',
    name: 'Adobe Illustrator',
    slug: { _type: 'slug', current: 'illustrator' },
    description:
      'Vector graphics editor for creating logos, icons, illustrations, and brand identity materials. Proficient in logo design, typography, infographics, and scalable vector artwork.',
    category: 'Design',
    icon3DPath: '/models/tools/illustrator-logo.glb',
    website: 'https://www.adobe.com/products/illustrator.html',
    order: 4,
  },
  {
    _id: 'tool-figma',
    _type: 'tool',
    name: 'Figma',
    slug: { _type: 'slug', current: 'figma' },
    description:
      'Collaborative interface design tool for UI/UX design, prototyping, and design systems. Skilled in creating wireframes, high-fidelity mockups, interactive prototypes, and maintaining design consistency across projects.',
    category: 'Design',
    icon3DPath: '/models/tools/figma-logo.glb',
    website: 'https://www.figma.com',
    order: 5,
  },
  {
    _id: 'tool-vscode',
    _type: 'tool',
    name: 'Visual Studio Code',
    slug: { _type: 'slug', current: 'vscode' },
    description:
      'Powerful code editor and development environment. Daily driver for full-stack development with customized workflows, extensions, and debugging configurations for JavaScript, TypeScript, Python, and more.',
    category: 'Development',
    icon3DPath: '/models/tools/vscode-logo.glb',
    website: 'https://code.visualstudio.com',
    order: 6,
  },
  {
    _id: 'tool-git',
    _type: 'tool',
    name: 'Git & GitHub',
    slug: { _type: 'slug', current: 'git-github' },
    description:
      'Version control system and collaborative platform for code management. Proficient in branching strategies, pull requests, code reviews, CI/CD integration, and maintaining clean commit histories for team projects.',
    category: 'Development',
    icon3DPath: '/models/tools/git-logo.glb',
    website: 'https://github.com',
    order: 7,
  },
  {
    _id: 'tool-docker',
    _type: 'tool',
    name: 'Docker',
    slug: { _type: 'slug', current: 'docker' },
    description:
      'Containerization platform for building, shipping, and running applications. Experienced in creating Dockerfiles, docker-compose orchestration, container optimization, and deployment workflows.',
    category: 'Development',
    icon3DPath: '/models/tools/docker-logo.glb',
    website: 'https://www.docker.com',
    order: 8,
  },
  {
    _id: 'tool-cisco-packet-tracer',
    _type: 'tool',
    name: 'Cisco Packet Tracer',
    slug: { _type: 'slug', current: 'cisco-packet-tracer' },
    description:
      'Network simulation tool for designing, configuring, and troubleshooting network topologies. Experienced in creating complex network infrastructures, implementing routing protocols, VLANs, security policies, and testing network scenarios.',
    category: 'Networking',
    icon3DPath: '/models/tools/cisco-logo.glb',
    website: 'https://www.netacad.com/courses/packet-tracer',
    order: 9,
  },
  {
    _id: 'tool-vercel',
    _type: 'tool',
    name: 'Vercel',
    slug: { _type: 'slug', current: 'vercel' },
    description:
      'Platform for frontend developers providing the speed and reliability needed to deploy at the edge. Expert in Next.js deployment, preview environments, edge functions, and CI/CD pipeline configuration.',
    category: 'Cloud & Deployment',
    icon3DPath: '/models/tools/vercel-logo.glb',
    website: 'https://vercel.com',
    order: 10,
  },
  {
    _id: 'tool-digitalocean',
    _type: 'tool',
    name: 'DigitalOcean',
    slug: { _type: 'slug', current: 'digitalocean' },
    description:
      'Cloud infrastructure provider focused on simplifying web scaling for developers. Experienced in droplet management, load balancers, managed databases, and self-hosted deployment workflows.',
    category: 'Cloud & Deployment',
    icon3DPath: '/models/tools/digitalocean-logo.glb',
    website: 'https://www.digitalocean.com',
    order: 11,
  },
  {
    _id: 'tool-github-actions',
    _type: 'tool',
    name: 'GitHub Actions',
    slug: { _type: 'slug', current: 'github-actions' },
    description:
      'CI/CD automation platform integrated directly into GitHub. Used for automating builds, tests, linting, deployment pipelines, and scheduled workflows across multiple projects.',
    category: 'Cloud & Deployment',
    icon3DPath: '/models/tools/github-actions-logo.glb',
    website: 'https://github.com/features/actions',
    order: 12,
  },
  {
    _id: 'tool-sanity-cms',
    _type: 'tool',
    name: 'Sanity CMS',
    slug: { _type: 'slug', current: 'sanity' },
    description:
      'Headless CMS with a real-time content lake. Used to build structured content backends for portfolio, e-commerce, and editorial projects. Experienced with GROQ queries, schema design, and custom Studio configurations.',
    category: 'Cloud & Deployment',
    icon3DPath: '/models/tools/sanity-logo.glb',
    website: 'https://www.sanity.io',
    order: 13,
  },
]

// ─── Seed runner ──────────────────────────────────────────────────────────────

const ok   = (msg) => console.log(`\x1b[32m✅ ${msg}\x1b[0m`)
const info = (msg) => console.log(`\x1b[36mℹ️  ${msg}\x1b[0m`)
const fail = (msg) => console.log(`\x1b[31m❌ ${msg}\x1b[0m`)

async function seed() {
  info(`Seeding ${tools.length} tools...\n`)

  let created = 0
  let updated = 0
  let failed  = 0

  for (const tool of tools) {
    try {
      const existing = await client.getDocument(tool._id)
      await client.createOrReplace(tool)

      if (existing) {
        ok(`Updated:  ${tool.name} (${tool._id})`)
        updated++
      } else {
        ok(`Created:  ${tool.name} (${tool._id})`)
        created++
      }
    } catch (e) {
      fail(`Failed:   ${tool.name} — ${e.message}`)
      failed++
    }
  }

  console.log(`\n\x1b[36mDone — ${created} created, ${updated} updated, ${failed} failed.\x1b[0m`)
  if (failed > 0) {
    console.log('\x1b[33mCheck failed tools above and re-run if needed.\x1b[0m')
  }
}

seed().catch((e) => {
  console.error(e)
  process.exit(1)
})
