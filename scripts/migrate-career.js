// Migration script for career data (education + jobs)
// Reads from career.config.ts and creates Sanity documents

import {createOrUpdateDocument, logInfo, logSuccess, logError} from './utils.js'

// Education data to migrate
const educationData = [
  {
    _id: 'education-hsc',
    _type: 'education',
    level: 'HSC',
    institution: 'Dhaka College',
    course: 'Higher Secondary Certificate - Science',
    dateRange: {
      start: '2016-06',
      end: '2018-05',
    },
    location: 'Dhaka, Bangladesh',
    description: 'Completed Higher Secondary Certificate with focus on Science. Studied Physics, Chemistry, Mathematics, and Biology. Participated in science fairs and mathematics olympiads.',
    order: 1,
  },
  {
    _id: 'education-bsc',
    _type: 'education',
    level: 'BSC',
    institution: 'Universiti Teknologi Malaysia (UTM)',
    course: 'Bachelor of Computer Science',
    dateRange: {
      start: '2018-09',
      end: '2022-06',
    },
    location: 'Johor Bahru, Malaysia',
    description: 'Graduated with Bachelor of Computer Science degree, specializing in Software Engineering and Network Systems. Achieved Dean\'s List recognition. Completed capstone project on distributed systems architecture. Active member of Computer Science Society and participated in hackathons and coding competitions.',
    order: 2,
  },
]

// Job data to migrate
const jobsData = [
  {
    _id: 'job-1',
    _type: 'job',
    title: 'Full Stack Developer',
    company: 'Tech Innovators Sdn Bhd',
    dateRange: {
      start: '2022-07',
      end: '2023-12',
      current: false,
    },
    location: 'Kuala Lumpur, Malaysia',
    description: 'Developed and maintained full-stack web applications for clients in e-commerce and fintech sectors. Led frontend development initiatives and mentored junior developers.',
    responsibilities: [
      'Designed and implemented RESTful APIs using Node.js and Express',
      'Built responsive web interfaces with React and TypeScript',
      'Managed PostgreSQL databases and optimized query performance',
      'Implemented CI/CD pipelines using GitHub Actions and Docker',
      'Collaborated with UX designers to translate designs into functional components',
      'Conducted code reviews and established coding standards for the team',
    ],
    techStack: [
      'React',
      'TypeScript',
      'Node.js',
      'Express',
      'PostgreSQL',
      'MongoDB',
      'Docker',
      'AWS',
      'Git',
    ],
    order: 2,
  },
  {
    _id: 'job-2',
    _type: 'job',
    title: 'Software Engineer',
    company: 'Digital Solutions Inc',
    dateRange: {
      start: '2024-01',
      end: null,
      current: true,
    },
    location: 'Remote',
    description: 'Currently working as a Software Engineer specializing in modern web technologies and cloud infrastructure. Focus on building scalable applications and improving developer experience.',
    responsibilities: [
      'Architecting and developing microservices-based applications',
      'Implementing real-time features using WebSockets and Redis',
      'Optimizing application performance and reducing load times by 40%',
      'Designing and maintaining cloud infrastructure on AWS',
      'Leading migration from monolith to microservices architecture',
      'Contributing to open-source projects and internal tooling',
      'Mentoring 3 junior developers and conducting technical interviews',
    ],
    techStack: [
      'Next.js',
      'React',
      'TypeScript',
      'Node.js',
      'GraphQL',
      'PostgreSQL',
      'Redis',
      'Docker',
      'Kubernetes',
      'AWS',
      'Terraform',
    ],
    order: 1,
  },
]

export async function migrateCareer() {
  logInfo('Starting Career (Education + Jobs) migration...')
  
  let educationCount = 0
  let jobsCount = 0
  
  try {
    // Migrate education entries
    for (const education of educationData) {
      await createOrUpdateDocument(education)
      logInfo(`✓ Created education: ${education._id}`)
      educationCount++
    }
    
    // Migrate job entries
    for (const job of jobsData) {
      await createOrUpdateDocument(job)
      logInfo(`✓ Created job: ${job._id}`)
      jobsCount++
    }
    
    logSuccess(`Career migration completed! (${educationCount} education entries, ${jobsCount} jobs)`)
    logInfo('⚠️  Note: Images and videos need to be uploaded manually through Sanity Studio')
    return true
  } catch (error) {
    logError('Failed to migrate career data:', error)
    throw error
  }
}
