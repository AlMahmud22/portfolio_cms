// Migration script for project categories and projects
// Reads from projects.config.ts and creates Sanity documents

import {createOrUpdateDocument, logInfo, logSuccess, logError} from './utils.js'

// Project categories to migrate
const categoriesData = [
  {
    _id: 'category-desktop',
    _type: 'projectCategory',
    name: 'Desktop Applications',
    slug: {
      _type: 'slug',
      current: 'desktop-applications',
    },
    description: 'Cross-platform desktop applications and utilities',
    icon3DPath: '/models/projects/laptop.glb',
    order: 1,
  },
  {
    _id: 'category-websites',
    _type: 'projectCategory',
    name: 'Web Development',
    slug: {
      _type: 'slug',
      current: 'web-development',
    },
    description: 'Full-stack web applications and responsive websites',
    icon3DPath: '/models/projects/browser.glb',
    order: 2,
  },
  {
    _id: 'category-systems',
    _type: 'projectCategory',
    name: 'Systems Development',
    slug: {
      _type: 'slug',
      current: 'systems-development',
    },
    description: 'Backend systems, APIs, and infrastructure projects',
    icon3DPath: '/models/projects/server.glb',
    order: 3,
  },
  {
    _id: 'category-networking',
    _type: 'projectCategory',
    name: 'Networking Projects',
    slug: {
      _type: 'slug',
      current: 'networking-projects',
    },
    description: 'Network design, configuration, and security implementations',
    icon3DPath: '/models/projects/router.glb',
    order: 4,
  },
]

// Projects data to migrate
const projectsData = [
  // Desktop Applications
  {
    _id: 'project-desktop-1',
    _type: 'project',
    title: 'Productivity Suite',
    slug: {
      _type: 'slug',
      current: 'productivity-suite',
    },
    description: 'A comprehensive productivity application built with Electron and React. Features include task management, note-taking, and calendar integration. Supports offline functionality with local storage and cloud sync capabilities.',
    category: {
      _type: 'reference',
      _ref: 'category-desktop',
    },
    featured: true,
    techStack: ['Electron', 'React', 'TypeScript', 'SQLite', 'Node.js'],
    links: {
      github: 'https://github.com/almahmud22/productivity-suite',
    },
    order: 1,
  },
  {
    _id: 'project-desktop-2',
    _type: 'project',
    title: 'Media Converter',
    slug: {
      _type: 'slug',
      current: 'media-converter',
    },
    description: 'Desktop application for converting and processing media files. Supports multiple formats including video, audio, and images. Built with cross-platform compatibility for Windows, macOS, and Linux.',
    category: {
      _type: 'reference',
      _ref: 'category-desktop',
    },
    featured: false,
    techStack: ['Electron', 'FFmpeg', 'React', 'Node.js', 'Sharp'],
    links: {
      github: 'https://github.com/almahmud22/media-converter',
    },
    order: 2,
  },
  {
    _id: 'project-desktop-3',
    _type: 'project',
    title: 'System Monitor',
    slug: {
      _type: 'slug',
      current: 'system-monitor',
    },
    description: 'Real-time system monitoring tool with performance metrics, resource usage graphs, and process management. Features customizable alerts and detailed hardware information.',
    category: {
      _type: 'reference',
      _ref: 'category-desktop',
    },
    featured: false,
    techStack: ['Electron', 'React', 'Chart.js', 'Node.js', 'systeminformation'],
    links: {},
    order: 3,
  },

  // Websites
  {
    _id: 'project-web-1',
    _type: 'project',
    title: 'E-Commerce Platform',
    slug: {
      _type: 'slug',
      current: 'e-commerce-platform',
    },
    description: 'Full-featured e-commerce platform with product catalog, shopping cart, payment integration, and admin dashboard. Implements modern authentication, order tracking, and inventory management.',
    category: {
      _type: 'reference',
      _ref: 'category-websites',
    },
    featured: true,
    techStack: ['Next.js', 'React', 'TypeScript', 'Stripe', 'PostgreSQL', 'Prisma', 'Tailwind CSS'],
    links: {
      live: 'https://ecommerce-demo.vercel.app',
      github: 'https://github.com/almahmud22/ecommerce-platform',
    },
    order: 1,
  },
  {
    _id: 'project-web-2',
    _type: 'project',
    title: 'Social Media Dashboard',
    slug: {
      _type: 'slug',
      current: 'social-media-dashboard',
    },
    description: 'Analytics dashboard for managing multiple social media accounts. Real-time metrics, post scheduling, and engagement tracking across platforms.',
    category: {
      _type: 'reference',
      _ref: 'category-websites',
    },
    featured: true,
    techStack: ['React', 'TypeScript', 'Firebase', 'Chart.js', 'Material-UI'],
    links: {
      live: 'https://social-dash-demo.netlify.app',
    },
    order: 2,
  },
  {
    _id: 'project-web-3',
    _type: 'project',
    title: 'Learning Management System',
    slug: {
      _type: 'slug',
      current: 'learning-management-system',
    },
    description: 'Educational platform with course creation, video hosting, quizzes, and progress tracking. Includes instructor dashboard and student enrollment system.',
    category: {
      _type: 'reference',
      _ref: 'category-websites',
    },
    featured: false,
    techStack: ['Next.js', 'React', 'MongoDB', 'Express', 'Node.js', 'AWS S3'],
    links: {
      github: 'https://github.com/almahmud22/lms-platform',
    },
    order: 3,
  },

  // Systems
  {
    _id: 'project-system-1',
    _type: 'project',
    title: 'Microservices API Gateway',
    slug: {
      _type: 'slug',
      current: 'microservices-api-gateway',
    },
    description: 'Scalable API gateway for microservices architecture with load balancing, rate limiting, authentication, and monitoring. Handles service discovery and routing.',
    category: {
      _type: 'reference',
      _ref: 'category-systems',
    },
    featured: true,
    techStack: ['Node.js', 'Express', 'Redis', 'Docker', 'Nginx', 'PostgreSQL'],
    links: {
      github: 'https://github.com/almahmud22/api-gateway',
    },
    order: 1,
  },
  {
    _id: 'project-system-2',
    _type: 'project',
    title: 'Real-time Chat Server',
    slug: {
      _type: 'slug',
      current: 'real-time-chat-server',
    },
    description: 'High-performance WebSocket-based chat server supporting rooms, private messages, file sharing, and presence indicators. Built for scalability with Redis pub/sub.',
    category: {
      _type: 'reference',
      _ref: 'category-systems',
    },
    featured: false,
    techStack: ['Node.js', 'Socket.io', 'Redis', 'MongoDB', 'Docker'],
    links: {
      github: 'https://github.com/almahmud22/chat-server',
    },
    order: 2,
  },

  // Networking
  {
    _id: 'project-network-1',
    _type: 'project',
    title: 'Enterprise Network Design',
    slug: {
      _type: 'slug',
      current: 'enterprise-network-design',
    },
    description: 'Complete network infrastructure design for a multi-floor enterprise environment. Includes VLAN segmentation, redundancy, security zones, and disaster recovery setup.',
    category: {
      _type: 'reference',
      _ref: 'category-networking',
    },
    featured: true,
    techStack: ['Cisco Packet Tracer', 'VLAN', 'OSPF', 'ACL', 'VPN'],
    links: {},
    order: 1,
  },
  {
    _id: 'project-network-2',
    _type: 'project',
    title: 'Network Security Implementation',
    slug: {
      _type: 'slug',
      current: 'network-security-implementation',
    },
    description: 'Security hardening project implementing firewalls, IDS/IPS, network access control, and security monitoring. Includes penetration testing and vulnerability assessment.',
    category: {
      _type: 'reference',
      _ref: 'category-networking',
    },
    featured: false,
    techStack: ['pfSense', 'Snort', 'Wireshark', 'Nmap', 'Cisco ASA'],
    links: {},
    order: 2,
  },
]

export async function migrateProjects() {
  logInfo('Starting Projects migration...')
  
  let categoriesCount = 0
  let projectsCount = 0
  
  try {
    // First, create all categories
    logInfo('Creating project categories...')
    for (const category of categoriesData) {
      await createOrUpdateDocument(category)
      logInfo(`✓ Created category: ${category._id}`)
      categoriesCount++
    }
    
    // Then, create all projects (they reference categories)
    logInfo('Creating projects...')
    for (const project of projectsData) {
      await createOrUpdateDocument(project)
      logInfo(`✓ Created project: ${project._id}`)
      projectsCount++
    }
    
    logSuccess(`Projects migration completed! (${categoriesCount} categories, ${projectsCount} projects)`)
    logInfo('⚠️  Note: Project images and videos need to be uploaded manually through Sanity Studio')
    return true
  } catch (error) {
    logError('Failed to migrate projects:', error)
    throw error
  }
}
