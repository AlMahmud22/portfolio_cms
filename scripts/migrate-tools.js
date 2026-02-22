// Migration script for tools
// Reads from tools.config.ts and creates Sanity documents
// NOTE: Must run AFTER projects migration (tools reference projects)

import {createOrUpdateDocument, logInfo, logSuccess, logError} from './utils.js'

// Tools data to migrate
const toolsData = [
  {
    _id: 'tool-blender',
    _type: 'tool',
    name: 'Blender',
    slug: {
      _type: 'slug',
      current: 'blender',
    },
    description: 'Professional 3D modeling, animation, and rendering software. Used for creating 3D assets, character design, product visualization, and architectural renders. Expertise in modeling, texturing, lighting, and animation workflows.',
    category: '3D',
    icon3DPath: '/models/tools/blender-logo.glb',
    relatedProjects: [
      {_type: 'reference', _ref: 'project-desktop-1'},
      {_type: 'reference', _ref: 'project-web-1'},
    ],
    website: 'https://www.blender.org',
    order: 1,
  },
  {
    _id: 'tool-premiere',
    _type: 'tool',
    name: 'Adobe Premiere Pro',
    slug: {
      _type: 'slug',
      current: 'premiere-pro',
    },
    description: 'Industry-standard video editing software for professional video production. Experienced in multi-track editing, color grading, motion graphics, audio mixing, and output optimization for various platforms.',
    category: 'Video',
    icon3DPath: '/models/tools/premiere-logo.glb',
    relatedProjects: [
      {_type: 'reference', _ref: 'project-web-2'},
      {_type: 'reference', _ref: 'project-desktop-2'},
    ],
    website: 'https://www.adobe.com/products/premiere.html',
    order: 2,
  },
  {
    _id: 'tool-illustrator',
    _type: 'tool',
    name: 'Adobe Illustrator',
    slug: {
      _type: 'slug',
      current: 'illustrator',
    },
    description: 'Vector graphics editor for creating logos, icons, illustrations, and brand identity materials. Proficient in logo design, typography, infographics, and scalable vector artwork.',
    category: 'Design',
    icon3DPath: '/models/tools/illustrator-logo.glb',
    relatedProjects: [
      {_type: 'reference', _ref: 'project-web-1'},
      {_type: 'reference', _ref: 'project-web-2'},
      {_type: 'reference', _ref: 'project-desktop-1'},
    ],
    website: 'https://www.adobe.com/products/illustrator.html',
    order: 3,
  },
  {
    _id: 'tool-figma',
    _type: 'tool',
    name: 'Figma',
    slug: {
      _type: 'slug',
      current: 'figma',
    },
    description: 'Collaborative interface design tool for UI/UX design, prototyping, and design systems. Skilled in creating wireframes, high-fidelity mockups, interactive prototypes, and maintaining design consistency across projects.',
    category: 'Design',
    icon3DPath: '/models/tools/figma-logo.glb',
    relatedProjects: [
      {_type: 'reference', _ref: 'project-web-1'},
      {_type: 'reference', _ref: 'project-web-2'},
      {_type: 'reference', _ref: 'project-web-3'},
    ],
    website: 'https://www.figma.com',
    order: 4,
  },
  {
    _id: 'tool-cisco-packet-tracer',
    _type: 'tool',
    name: 'Cisco Packet Tracer',
    slug: {
      _type: 'slug',
      current: 'cisco-packet-tracer',
    },
    description: 'Network simulation tool for designing, configuring, and troubleshooting network topologies. Experienced in creating complex network infrastructures, implementing routing protocols, VLANs, security policies, and testing network scenarios.',
    category: 'Networking',
    icon3DPath: '/models/tools/cisco-logo.glb',
    relatedProjects: [
      {_type: 'reference', _ref: 'project-network-1'},
      {_type: 'reference', _ref: 'project-network-2'},
    ],
    website: 'https://www.netacad.com/courses/packet-tracer',
    order: 5,
  },
  {
    _id: 'tool-vscode',
    _type: 'tool',
    name: 'Visual Studio Code',
    slug: {
      _type: 'slug',
      current: 'vscode',
    },
    description: 'Powerful code editor and development environment. Daily driver for full-stack development with customized workflows, extensions, and debugging configurations for JavaScript, TypeScript, Python, and more.',
    category: 'Development',
    icon3DPath: '/models/tools/vscode-logo.glb',
    relatedProjects: [
      {_type: 'reference', _ref: 'project-web-1'},
      {_type: 'reference', _ref: 'project-web-2'},
      {_type: 'reference', _ref: 'project-web-3'},
      {_type: 'reference', _ref: 'project-system-1'},
      {_type: 'reference', _ref: 'project-system-2'},
      {_type: 'reference', _ref: 'project-desktop-1'},
    ],
    website: 'https://code.visualstudio.com',
    order: 6,
  },
  {
    _id: 'tool-git',
    _type: 'tool',
    name: 'Git & GitHub',
    slug: {
      _type: 'slug',
      current: 'git-github',
    },
    description: 'Version control system and collaborative platform for code management. Proficient in branching strategies, pull requests, code reviews, CI/CD integration, and maintaining clean commit histories for team projects.',
    category: 'Development',
    icon3DPath: '/models/tools/git-logo.glb',
    relatedProjects: [
      {_type: 'reference', _ref: 'project-web-1'},
      {_type: 'reference', _ref: 'project-web-2'},
      {_type: 'reference', _ref: 'project-web-3'},
      {_type: 'reference', _ref: 'project-system-1'},
      {_type: 'reference', _ref: 'project-system-2'},
      {_type: 'reference', _ref: 'project-desktop-1'},
      {_type: 'reference', _ref: 'project-desktop-2'},
    ],
    website: 'https://github.com',
    order: 7,
  },
  {
    _id: 'tool-docker',
    _type: 'tool',
    name: 'Docker',
    slug: {
      _type: 'slug',
      current: 'docker',
    },
    description: 'Containerization platform for building, shipping, and running applications. Experienced in creating Dockerfiles, docker-compose orchestration, container optimization, and deployment workflows.',
    category: 'Development',
    icon3DPath: '/models/tools/docker-logo.glb',
    relatedProjects: [
      {_type: 'reference', _ref: 'project-system-1'},
      {_type: 'reference', _ref: 'project-system-2'},
    ],
    website: 'https://www.docker.com',
    order: 8,
  },
  {
    _id: 'tool-after-effects',
    _type: 'tool',
    name: 'Adobe After Effects',
    slug: {
      _type: 'slug',
      current: 'after-effects',
    },
    description: 'Motion graphics and visual effects software for creating animations, compositing, and post-production effects. Skilled in keyframe animation, expressions, particle systems, and creating dynamic motion graphics.',
    category: 'Video',
    icon3DPath: '/models/tools/after-effects-logo.glb',
    relatedProjects: [
      {_type: 'reference', _ref: 'project-web-2'},
    ],
    website: 'https://www.adobe.com/products/aftereffects.html',
    order: 9,
  },
]

export async function migrateTools() {
  logInfo('Starting Tools migration...')
  
  let toolsCount = 0
  
  try {
    for (const tool of toolsData) {
      await createOrUpdateDocument(tool)
      logInfo(`✓ Created tool: ${tool._id}`)
      toolsCount++
    }
    
    logSuccess(`Tools migration completed! (${toolsCount} tools)`)
    logInfo('⚠️  Note: Tool images and videos need to be uploaded manually through Sanity Studio')
    return true
  } catch (error) {
    logError('Failed to migrate tools:', error)
    throw error
  }
}
