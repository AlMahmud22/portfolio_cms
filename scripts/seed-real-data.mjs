import { createClient } from '@sanity/client';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || '7d6vxzye',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  apiVersion: '2024-02-22',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const log = (msg, status = 'info') => {
  const colors = { info: '\x1b[36m', success: '\x1b[32m', skip: '\x1b[33m', error: '\x1b[31m', reset: '\x1b[0m' };
  console.log(`${colors[status]}${msg}${colors.reset}`);
};

const toBlock = (text) => [{
  _type: 'block',
  children: [{ _type: 'span', text }],
  markDefs: [],
  style: 'normal'
}];

const data = {
  hero: {
    _id: 'hero-singleton',
    _type: 'hero',
    fullName: { firstName: 'Sadik Al', lastName: 'Mahmud' },
    titles: ['Full-Stack Developer', 'Network Engineer', 'CS Graduate', 'Problem Solver'],
    terminalCommands: {
      greeting: '$ welcome --user visitor',
      output: ['Initializing portfolio...', 'Loading profile...', 'Status: Open to opportunities', 'Location: Kuala Lumpur, Malaysia', 'Ready.']
    },
    scrollHintText: 'Scroll to explore'
  },
  about: {
    _id: 'about-singleton',
    _type: 'about',
    bio: toBlock('Computer Science graduate from Universiti Teknologi Malaysia with experience in full-stack web development, network engineering, and production deployments. Built e-commerce systems, AI desktop apps, and network infrastructure. CCNA certified. Currently seeking full-time opportunities in software or network engineering.'),
    quickStats: {
      yearsExperience: '4',
      projectsCompleted: '8'
    },
    skills: {
      frontend: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Three.js', 'Framer Motion', 'Tailwind CSS', 'Bootstrap', 'HTML5', 'CSS3'],
      backend: ['Node.js', 'Express.js', 'PostgreSQL', 'MongoDB', 'MySQL', 'GraphQL', 'REST APIs', 'Docker', 'CI/CD'],
      networking: ['CCNA Certified', 'Cisco IOS', 'Network Security', 'VLANs', 'OSPF', 'DHCP', 'Subnetting', 'Packet Tracer']
    }
  },
  educations: [
    { _id: 'edu-ssc', _type: 'education', level: 'Other', institution: 'Adamjee Cantonment Public School', course: 'SSC — Secondary School Certificate (Science)', dateRange: { start: '2015-01-01', end: '2016-11-01' }, location: 'Dhaka Cantonment, Dhaka, Bangladesh', description: 'Secondary School Certificate with Science stream focus.', order: 1 },
    { _id: 'edu-hsc', _type: 'education', level: 'HSC', institution: 'Adamjee Cantonment College', course: 'HSC — Higher Secondary Certificate (Science)', dateRange: { start: '2017-01-01', end: '2019-03-01' }, location: 'Dhaka Cantonment, Dhaka, Bangladesh', description: 'Higher Secondary Certificate in Science stream. Physics, Chemistry, Mathematics, Biology.', order: 2 },
    { _id: 'edu-foundation', _type: 'education', level: 'Other', institution: 'Universiti Teknologi Malaysia (UTM)', course: 'Foundation in Science', dateRange: { start: '2020-02-01', end: '2020-08-01' }, location: 'Johor Bahru, Malaysia', description: 'Foundation programme covering Mathematics, Physics, Chemistry, and introductory Computer Science.', order: 3 },
    { _id: 'edu-bsc', _type: 'education', level: 'BSC', institution: 'Universiti Teknologi Malaysia (UTM)', course: 'Bachelor of Computer Science', dateRange: { start: '2021-02-01', end: '2026-08-01' }, location: 'Johor Bahru, Malaysia', description: 'BSc Computer Science specializing in Software Engineering and Network Systems. Projects spanning full-stack development, network infrastructure, IoT, and AI applications.', order: 4 }
  ],
  jobs: [
    { _id: 'job-winwin', _type: 'job', company: 'Win Win Food Industries Sdn Bhd', title: 'Multimedia & Web Development Intern', dateRange: { start: '2024-10-01', end: '2025-02-01', current: false }, location: 'Tebrau, Johor, Malaysia', description: 'Designed marketing visuals and digital content for food products. Built company e-commerce website with scroll animations.', responsibilities: ['Designed marketing visuals', 'Built e-commerce website', 'Deployed on Synology server'], techStack: ['Next.js', 'React', 'Tailwind CSS', 'Nginx', 'Figma'], order: 1 },
    { _id: 'job-jdt', _type: 'job', company: 'Johor Darul Takzim FC', title: 'Season Pass & Fan Registration Staff', dateRange: { start: '2024-02-01', end: '2024-03-01', current: false }, location: 'Tebrau, Johor, Malaysia', description: 'Assisted fans at registration counter during 2024-25 season pass renewal.', responsibilities: ['Assisted fan registration', 'Processed payments', 'Managed priority access'], techStack: ['Customer Service', 'Payment Processing'], order: 2 },
    { _id: 'job-apcw', _type: 'job', company: 'Asia Pacific Climate Week 2023', title: 'Protocol & Event Support Staff', dateRange: { start: '2023-11-01', end: '2023-11-30', current: false }, location: 'Persada, Johor Bahru, Malaysia', description: 'Supported international delegates and VIP guests at official government climate event.', responsibilities: ['Supported delegates', 'Managed registration', 'Logistics coordination'], techStack: ['Event Management', 'Protocol'], order: 3 }
  ],
  certifications: [
    { _id: 'cert-udemy', _type: 'certification', name: 'The Complete Full-Stack Web Development Bootcamp', issuer: 'Udemy', dateIssued: '2025-10-01', credentialId: 'UC-Oba0cc47-aed4-45ad-bd05-756042dcb62f', verificationUrl: 'https://ude.my/UC-Oba0cc47-aed4-45ad-bd05-756042dcb62f', description: 'Skills: Full-Stack Development, React, Node.js, MongoDB, REST APIs', order: 1 },
    { _id: 'cert-ccna-devnet', _type: 'certification', name: 'CCNA — DevNet Associate', issuer: 'Cisco Networking Academy / UTM', dateIssued: '2025-06-01', credentialId: '0fc6ecc0-b972-4669-8954-c2186526ec51', verificationUrl: 'https://www.credly.com/badges/0fc6ecc0-b972-4669-8954-c2186526ec51/public_url', description: 'Skills: Network Automation, Python, DevNet, SDN, REST APIs', order: 2 },
    { _id: 'cert-ccna-security', _type: 'certification', name: 'CCNA — Network Security', issuer: 'Cisco Networking Academy', dateIssued: '2025-02-01', description: 'Skills: Network Security, Firewall, VPN, Cisco IOS, Threat Defense', order: 3 }
  ],
  categories: [
    { _id: 'cat-websites', _type: 'projectCategory', name: 'Websites', slug: { current: 'websites' }, description: 'Web applications, landing pages, and online platforms', color: '#4a8b8d', order: 1, icon3DPath: '' },
    { _id: 'cat-desktop', _type: 'projectCategory', name: 'Desktop Apps', slug: { current: 'desktop' }, description: 'Native desktop applications built with Electron and other frameworks', color: '#3a6b6d', order: 2, icon3DPath: '' },
    { _id: 'cat-system', _type: 'projectCategory', name: 'System Design', slug: { current: 'system-design' }, description: 'Software architecture, IoT systems, and engineering projects', color: '#2a4b4d', order: 3, icon3DPath: '' },
    { _id: 'cat-network', _type: 'projectCategory', name: 'Network & Infrastructure', slug: { current: 'network' }, description: 'Cisco networking, VLANs, routing protocols, and infrastructure design', color: '#1a2b2d', order: 4, icon3DPath: '' },
    { _id: 'cat-digital', _type: 'projectCategory', name: 'Digital Design', slug: { current: 'digital-design' }, description: 'Posters, logos, motion graphics, and visual media', color: '#5a9b9d', order: 5, icon3DPath: '' },
    { _id: 'cat-other', _type: 'projectCategory', name: 'Academic & Other', slug: { current: 'other' }, description: 'University coursework, research, and miscellaneous projects', color: '#6aabae', order: 6, icon3DPath: '' }
  ],
  projects: [
    { _id: 'proj-gecko', _type: 'project', title: 'Gecko Chatbot', slug: { current: 'gecko-chatbot' }, category: { _type: 'reference', _ref: 'cat-desktop' }, description: 'Privacy-first desktop AI assistant built with Electron and llama.cpp. Runs large language models fully offline using GGUF/GGML formats.', techStack: ['Electron', 'React', 'Node.js', 'llama.cpp', 'Tailwind CSS', 'Vite', 'Zustand'], links: { github: 'https://github.com/AlMahmud22/gecko-chatbot', live: 'https://equators.tech/' }, featured: true, order: 1 },
    { _id: 'proj-equators', _type: 'project', title: 'Equators Platform', slug: { current: 'equators-platform' }, category: { _type: 'reference', _ref: 'cat-websites' }, description: 'Official brand website and platform for Equators. MERN stack monorepo with Next.js 15 frontend and standalone Express backend.', techStack: ['Next.js', 'React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'NextAuth.js', 'Tailwind CSS'], links: { github: 'https://github.com/AlMahmud22/equator-site', live: 'https://equator.tnpx.tech/' }, featured: true, order: 2 },
    { _id: 'proj-phishing', _type: 'project', title: 'AI Phishing Detection System', slug: { current: 'phishing-detection' }, category: { _type: 'reference', _ref: 'cat-websites' }, description: 'Security tool that analyzes URLs in real time to detect phishing attempts. Uses machine learning and behavioral analysis to identify malicious links.', techStack: ['Python', 'Machine Learning', 'Security', 'Node.js', 'URL Analysis'], links: { live: 'https://phish.tnpx.tech' }, featured: true, order: 3 },
    { _id: 'proj-network', _type: 'project', title: 'Virtual Campus Network Infrastructure', slug: { current: 'virtual-campus-network' }, category: { _type: 'reference', _ref: 'cat-network' }, description: 'University-level network infrastructure project using Cisco Packet Tracer. Designed multi-floor topology, implemented OSPF, VLANs, DHCP.', techStack: ['Cisco Packet Tracer', 'OSPF', 'VLANs', 'DHCP', 'Subnetting', 'Cisco IOS'], links: { github: 'https://github.com/AlMahmud22/Computer-Network-Project' }, featured: true, order: 4 },
    { _id: 'proj-powerplant', _type: 'project', title: 'Power Plant Emergency Shutdown System', slug: { current: 'power-plant-shutdown' }, category: { _type: 'reference', _ref: 'cat-system' }, description: 'IoT safety system for power plant emergency shutdowns triggered by seismic activity. Uses two Raspberry Pi units in parallel architecture.', techStack: ['Python', 'Raspberry Pi', 'MongoDB', 'IoT', 'Parallel Computing'], links: { github: 'https://github.com/AlMahmud22/High-performance-parallel-computing-Project' }, featured: false, order: 5 },
    { _id: 'proj-eventsys', _type: 'project', title: 'Event Management System — SE Design', slug: { current: 'event-management-system' }, category: { _type: 'reference', _ref: 'cat-system' }, description: 'Software Engineering project designing a complete Event Management System using the Waterfall development model. Includes UML, SRS, and test plans.', techStack: ['UML', 'Waterfall SDLC', 'System Design', 'Requirements Engineering'], links: { github: 'https://github.com/AlMahmud22/Software-Engineering-Project' }, featured: false, order: 6 },
    { _id: 'proj-portfolio', _type: 'project', title: 'Personal Portfolio + Sanity CMS', slug: { current: 'sam-portfolio' }, category: { _type: 'reference', _ref: 'cat-websites' }, description: 'Custom portfolio with Next.js 14 App Router, TypeScript, Tailwind CSS, and Sanity v3 CMS. Features Three.js 3D scenes and Lenis scroll.', techStack: ['Next.js', 'TypeScript', 'Three.js', 'Framer Motion', 'Sanity CMS', 'Tailwind CSS'], links: { live: 'https://mahmud22.vercel.app' }, featured: true, order: 7 },
    { _id: 'proj-4x6labels', _type: 'project', title: '4x6Labels Web Design Contest', slug: { current: '4x6labels-web-design' }, category: { _type: 'reference', _ref: 'cat-websites' }, description: 'Web design contest submission for 4x6Labels. Clean, modern landing page with responsive layout and conversion-focused design.', techStack: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript'], links: { live: 'https://4x6labels-redesign-contest.vercel.app/' }, featured: false, order: 8 }
  ],
  contact: {
    _id: 'contact-singleton',
    _type: 'contact',
    email: 'mahmud23k@gmail.com',
    availabilityStatus: 'available',
    formSuccessMessage: 'Thank you for your message! I will get back to you soon.'
  },
  socialLinks: [
    { _id: 'social-github', _type: 'socialLink', platform: 'GitHub', url: 'https://github.com/AlMahmud22', icon: 'Github', order: 1 },
    { _id: 'social-credly', _type: 'socialLink', platform: 'Credly', url: 'https://www.credly.com/badges/0fc6ecc0-b972-4669-8954-c2186526ec51/public_url', icon: 'Award', order: 2 },
    { _id: 'social-linkedin', _type: 'socialLink', platform: 'LinkedIn', url: 'https://linkedin.com/in/sadik-al-mahmud', icon: 'Linkedin', order: 3 }
  ]
};

async function seed() {
  if (!process.env.SANITY_API_TOKEN) {
    log('SANITY_API_TOKEN is not set. Please provide it to run the script.', 'error');
    process.exit(1);
  }

  const counts = {};

  const processDoc = async (doc) => {
    try {
      const existing = await client.getDocument(doc._id);
      if (existing) {
        log(`⏭ Skipped: ${doc._type} (${doc._id})`, 'skip');
        counts[doc._type] = (counts[doc._type] || 0) + 1;
        return;
      }
      await client.create(doc);
      log(`✅ Created: ${doc._type} (${doc._id})`, 'success');
      counts[doc._type] = (counts[doc._type] || 0) + 1;
    } catch (err) {
      log(`❌ Error: ${doc._type} (${doc._id}): ${err.message}`, 'error');
    }
  };

  log('Starting seeding process...');

  // Singletons
  await processDoc(data.hero);
  await processDoc(data.about);
  await processDoc(data.contact);

  // Lists
  for (const doc of data.educations) await processDoc(doc);
  for (const doc of data.jobs) await processDoc(doc);
  for (const doc of data.certifications) await processDoc(doc);
  for (const doc of data.categories) await processDoc(doc);
  for (const doc of data.projects) await processDoc(doc);
  for (const doc of data.socialLinks) await processDoc(doc);

  log('\nSeeding Summary:');
  Object.entries(counts).forEach(([type, count]) => {
    console.log(`${type}: ${count}`);
  });
}

seed().catch(err => {
  log(`Fatal error: ${err.message}`, 'error');
  process.exit(1);
});
