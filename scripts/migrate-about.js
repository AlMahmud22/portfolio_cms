import { createOrUpdateDocument, logInfo, logSuccess, logError, client } from './utils.js'

// About Data (without images - those need to be uploaded through Studio)
const aboutData = {
  _id: 'about-main',
  _type: 'about',
  // Note: profileImage needs to be uploaded through Sanity Studio
  bio: [
    {
      _type: 'block',
      _key: 'bio1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'span1',
          text: "Hi, I'm Sadik Al Mahmud, a passionate Full Stack Developer and Network Security Engineer with a love for creating innovative digital experiences. With expertise spanning web development, 3D visualizer, and network infrastructure, I bring a unique perspective to every strategic challenge.",
        },
      ],
    },
    {
      _type: 'block',
      _key: 'bio2',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'span2',
          text: "I specialize in building scalable applications using modern technologies like React, Next.js, and Node.js, while also designing immersive 3D experiences with Blender and Three.js. My background in networking adds a layer of understanding that helps me architect robust, secure solutions.",
        },
      ],
    },
    {
      _type: 'block',
      _key: 'bio3',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'span3',
          text: 'When I\'m not coding or designing, you can find me exploring new technologies, contributing to open-source projects, or experimenting with creative coding. I believe in continuous learning and pushing the boundaries of what\'s possible.',
        },
      ],
    },
  ],
  quickStats: {
    yearsExperience: '4+',
    projectsCompleted: '25+',
    technologiesUsed: '20+',
    linesOfCode: '100K+',
  },
  skills: {
    frontend: [
      'React',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Framer Motion',
      'Three.js',
      'HTML5',
      'CSS3',
    ],
    backend: [
      'Node.js',
      'Express',
      'MongoDB',
      'PostgreSQL',
      'REST APIs',
      'GraphQL',
      'Sanity CMS',
    ],
    devops: [
      'Git',
      'Docker',
      'Vercel',
      'AWS',
      'CI/CD',
      'Linux',
    ],
    networking: [
      'CCNA',
      'TCP/IP',
      'Network Security',
      'VLANs',
      'Routing & Switching',
      'Cisco Packet Tracer',
    ],
  },
  terminalCommands: [
    {
      _key: 'cmd1',
      command: 'whoami',
      output: [
        'Name: Sadik Al Mahmud',
        'Title: Full Stack Dev & Network Security Engineer',
        'Location: Kuala Lumpur, Malaysia 🇲🇾',
        'Tagline: Architecting the future, one line of strategic code at a time',
      ],
    },
    {
      _key: 'cmd2',
      command: 'skills --list',
      output: [
        'Languages: JavaScript, TypeScript, Python, C++',
        'Frontend: React, Next.js, Tailwind, Framer Motion',
        'Backend: Node.js, Express, MongoDB, PostgreSQL',
        'Databases: MongoDB, PostgreSQL, MySQL, Redis',
        'DevOps: Git, Docker, AWS, Vercel, CI/CD',
        '3D & Design: Blender, Three.js, Figma, Adobe Suite',
        'Networking: CCNA, TCP/IP, Network Security, VLANs',
      ],
    },
    {
      _key: 'cmd3',
      command: 'stats',
      output: [
        '────────────────────────────',
        'Years of Experience: 4+',
        'Projects Completed: 25+',
        'Technologies Mastered: 20+',
        'Lines of Code Written: 100K+',
        'Coffee Consumed: ∞',
        '────────────────────────────',
      ],
    },
    {
      _key: 'cmd4',
      command: 'location',
      output: [
        'Kuala Lumpur, Malaysia 🇲🇾',
        'Open to remote opportunities worldwide 🌍',
      ],
    },
    {
      _key: 'cmd5',
      command: 'interests',
      output: [
        '• Building 3D web experiences',
        '• Open-source contributions',
        '• Creative coding & generative art',
        '• Network security & infrastructure',
        '• Learning new technologies',
      ],
    },
    {
      _key: 'cmd6',
      command: 'education',
      output: [
        'BSC Computer Science',
        'Universiti Teknologi Malaysia (UTM)',
        '2018 - 2022 | Dean\'s List',
      ],
    },
  ],
  socialLinks: [
    { _ref: 'social-github', _type: 'reference' },
    { _ref: 'social-linkedin', _type: 'reference' },
    { _ref: 'social-twitter', _type: 'reference' },
    { _ref: 'social-email', _type: 'reference' },
  ],
}

async function migrateAbout() {
  logInfo('Starting About migration...')
  logInfo('Note: Profile image must be uploaded manually through Sanity Studio')

  try {
    await createOrUpdateDocument(aboutData)
    logSuccess('About migration completed!')
    logInfo('Next step: Upload profile image in Sanity Studio')
    return true
  } catch (error) {
    logError(`About migration failed: ${error.message}`)
    return false
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  migrateAbout()
    .then(() => process.exit(0))
    .catch(() => process.exit(1))
}

export { migrateAbout }
