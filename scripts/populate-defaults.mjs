import { createClient } from '@sanity/client';

// Sanity client configuration
const client = createClient({
  projectId: '7d6vxzye',
  dataset: 'production',
  apiVersion: '2024-02-22',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const log = (msg) => console.log(msg);

async function run() {
  log('Starting auto-population...');

  if (!process.env.SANITY_API_TOKEN) {
    log('ERROR: SANITY_API_TOKEN is not set. Please set it to proceed.');
    process.exit(1);
  }

  // --- SINGLETONS ---

  // Hero
  await populateSingleton('hero', 'hero-singleton', {
    fullName: {
      firstName: 'Sadik Al',
      lastName: 'Mahmud',
    },
    titles: ['Full-Stack Developer', 'Network Engineer', 'Problem Solver'],
    terminalCommands: {
      greeting: '$ welcome',
      output: [
        'Welcome to SAM_.portfolio',
        'Initializing creative workspace...',
        'Loading projects... [████████████████] 100%',
        'System ready. Explore my work below.',
      ],
    },
    scrollHintText: 'Scroll to explore',
  });

  // About
  await populateSingleton('about', 'about-singleton', {
    bio: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Full-stack developer and creative technologist passionate about building immersive digital experiences. With a background in Computer Science from UTM and professional experience in web development, I specialize in creating seamless interactions between 2D interfaces and 3D environments.',
          },
        ],
        markDefs: [],
        style: 'normal',
      },
    ],
    quickStats: {
      yearsExperience: '4+',
      projectsCompleted: '25+',
      technologiesUsed: '20+',
      linesOfCode: '100K+',
    },
    skills: {
      frontend: ['React', 'Next.js', 'Three.js', 'Framer Motion'],
      backend: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB'],
      devops: ['Docker', 'AWS', 'CI/CD'],
      networking: ['CCNA', 'Cisco Packet Tracer', 'Network Security'],
    },
    terminalCommands: [
      {
        command: 'whoami',
        output: ['Sadik Al Mahmud', 'Full Stack Developer & Creative Technologist'],
      },
      {
        command: 'location',
        output: ['Kuala Lumpur, Malaysia'],
      },
    ],
  });

  // Contact
  await populateSingleton('contact', 'contact-singleton', {
    email: 'contact@almahmud.dev',
    availabilityStatus: 'available',
    formSuccessMessage: 'Thank you for your message! I will get back to you soon.',
  });

  // Settings
  await populateSingleton('settings', 'settings-singleton', {
    siteTitle: 'Sadik Al Mahmud | Portfolio',
    siteDescription: 'Full-Stack Developer & Network Engineer portfolio showcasing immersive digital experiences.',
    siteUrl: 'https://almahmud.dev',
    theme: {
      primaryColor: '#DC143C',
      fontFamily: 'TechHeadlines',
    },
  });

  // --- COLLECTIONS ---

  // Project Categories
  const categoryMap = {};
  const categories = [
    { name: 'Desktop Applications', slug: 'desktop', id: 'cat-desktop', description: 'Cross-platform desktop applications and utilities' },
    { name: 'Web Development', slug: 'websites', id: 'cat-websites', description: 'Full-stack web applications and responsive websites' },
    { name: 'Systems Development', slug: 'systems', id: 'cat-systems', description: 'Backend systems, APIs, and infrastructure projects' },
    { name: 'Networking Projects', slug: 'networking', id: 'cat-networking', description: 'Network design, configuration, and security implementations' },
  ];

  for (const cat of categories) {
    const doc = await populateCollectionItem('projectCategory', cat.id, {
      name: cat.name,
      slug: { _type: 'slug', current: cat.slug },
      description: cat.description,
      order: categories.indexOf(cat),
    });
    categoryMap[cat.slug] = { _type: 'reference', _ref: doc._id };
  }

  // Projects
  const projects = [
    {
      id: 'web-1',
      title: 'E-Commerce Platform',
      slug: 'ecommerce-platform',
      description: 'Full-featured e-commerce platform with product catalog, shopping cart, payment integration, and admin dashboard. Implements modern authentication, order tracking, and inventory management.',
      category: categoryMap['websites'],
      featured: true,
      techStack: ['Next.js', 'React', 'TypeScript', 'Stripe', 'PostgreSQL'],
      links: { live: 'https://ecommerce-demo.vercel.app' },
      order: 0,
    },
    {
      id: 'desktop-1',
      title: 'Productivity Suite',
      slug: 'productivity-suite',
      description: 'A comprehensive productivity application built with Electron and React. Features include task management, note-taking, and calendar integration.',
      category: categoryMap['desktop'],
      featured: true,
      techStack: ['Electron', 'React', 'TypeScript', 'SQLite'],
      links: { github: 'https://github.com/almahmud22/productivity-suite' },
      order: 0,
    },
  ];

  for (const proj of projects) {
    await populateCollectionItem('project', proj.id, {
      title: proj.title,
      slug: { _type: 'slug', current: proj.slug },
      description: proj.description,
      category: proj.category,
      featured: proj.featured,
      techStack: proj.techStack,
      links: proj.links,
      order: proj.order,
      publishedAt: new Date().toISOString(),
    });
  }

  // Tools
  const tools = [
    { name: 'React', slug: 'react', category: 'Development', description: 'The library for web and native user interfaces' },
    { name: 'Next.js', slug: 'nextjs', category: 'Development', description: 'The React Framework for the Web' },
    { name: 'Docker', slug: 'docker', category: 'Development', description: 'Accelerate how you build, share, and run applications' },
  ];

  for (const tool of tools) {
    await populateCollectionItem('tool', `tool-${tool.slug}`, {
      name: tool.name,
      slug: { _type: 'slug', current: tool.slug },
      description: tool.description,
      category: tool.category,
      order: tools.indexOf(tool),
    });
  }

  // Certifications
  const certs = [
    { id: 'cert-1', name: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services', date: '2023-03-15', description: 'Validates expertise in designing distributed systems on AWS.' },
    { id: 'cert-2', name: 'CCNA', issuer: 'Cisco', date: '2022-08-20', description: 'Networking fundamentals and security certification.' },
  ];

  for (const cert of certs) {
    await populateCollectionItem('certification', cert.id, {
      name: cert.name,
      issuer: cert.issuer,
      dateIssued: cert.date,
      description: cert.description,
      order: certs.indexOf(cert),
    });
  }

  // Career (Education)
  const education = [
    { id: 'edu-bsc', level: 'BSC', institution: 'Universiti Teknologi Malaysia', course: 'Bachelor of Computer Science', start: '2018-09', end: '2022-06', location: 'Malaysia' },
  ];

  for (const edu of education) {
    await populateCollectionItem('education', edu.id, {
      level: edu.level,
      institution: edu.institution,
      course: edu.course,
      dateRange: { start: edu.start, end: edu.end },
      location: edu.location,
      order: education.indexOf(edu),
    });
  }

  // Career (Jobs)
  const jobs = [
    { id: 'job-1', title: 'Full Stack Developer', company: 'Tech Innovators', start: '2022-07', current: true, location: 'Kuala Lumpur', description: 'Developed full-stack web applications.' },
  ];

  for (const job of jobs) {
    await populateCollectionItem('job', job.id, {
      title: job.title,
      company: job.company,
      dateRange: { start: job.start, current: job.current },
      location: job.location,
      description: job.description,
      responsibilities: ['Developed APIs', 'Built frontends'],
      techStack: ['React', 'Node.js'],
      order: jobs.indexOf(job),
    });
  }

  log('Auto-population finished!');
}

async function populateSingleton(type, id, data) {
  const existing = await client.fetch(`*[_type == "${type}" && !(_id in path("drafts.**"))][0]`);
  if (existing) {
    log(`Skipped: ${type} (already exists)`);
    return existing;
  }
  const doc = { _id: id, _type: type, ...data };
  const result = await client.createOrReplace(doc);
  log(`Created: ${type}`);
  return result;
}

async function populateCollectionItem(type, id, data) {
  const existing = await client.fetch(`*[_type == "${type}" && _id == "${id}"]`);
  if (existing.length > 0) {
    log(`Skipped: ${type} item ${id} (already exists)`);
    return existing[0];
  }
  const doc = { _id: id, _type: type, ...data };
  const result = await client.createOrReplace(doc);
  log(`Created: ${type} item ${id}`);
  return result;
}

run().catch((err) => {
  console.error('Population failed:', err);
  process.exit(1);
});
