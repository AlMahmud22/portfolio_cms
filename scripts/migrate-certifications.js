// Migration script for certifications
// Reads from certifications.config.ts and creates Sanity documents

import {createOrUpdateDocument, logInfo, logSuccess, logError} from './utils.js'

// Certifications data to migrate
const certificationsData = [
  {
    _id: 'cert-aws',
    _type: 'certification',
    name: 'AWS Certified Solutions Architect - Associate',
    issuer: 'Amazon Web Services',
    dateIssued: '2023-03-15',
    description: 'Validates expertise in designing distributed systems on AWS. Demonstrates proficiency in compute, networking, storage, and database AWS services, as well as AWS deployment and management services.',
    verificationUrl: 'https://aws.amazon.com/verification',
    credentialId: 'AWS-12345-ABCDE',
    order: 1,
  },
  {
    _id: 'cert-ccna',
    _type: 'certification',
    name: 'CCNA: Cisco Certified Network Associate',
    issuer: 'Cisco',
    dateIssued: '2022-08-20',
    description: 'Certification covering networking fundamentals, IP services, security fundamentals, automation and programmability. Validates the ability to install, configure, operate, and troubleshoot medium-size routed and switched networks.',
    verificationUrl: 'https://www.cisco.com/c/en/us/training-events/training-certifications/certifications.html',
    credentialId: 'CSCO-54321-FGHIJ',
    order: 2,
  },
  {
    _id: 'cert-psm',
    _type: 'certification',
    name: 'Professional Scrum Master (PSM I)',
    issuer: 'Scrum.org',
    dateIssued: '2023-06-10',
    description: 'Demonstrates fundamental level of Scrum mastery. Covers Scrum framework, practices, and theory, including the Scrum Master role and responsibilities in facilitating Scrum.',
    verificationUrl: 'https://www.scrum.org/certificates',
    credentialId: 'PSM-98765-KLMNO',
    order: 3,
  },
  {
    _id: 'cert-mongodb',
    _type: 'certification',
    name: 'MongoDB Certified Developer Associate',
    issuer: 'MongoDB University',
    dateIssued: '2022-11-05',
    description: 'Validates skills in building applications with MongoDB. Covers CRUD operations, aggregation framework, data modeling, indexes, and application performance optimization.',
    verificationUrl: 'https://university.mongodb.com/verification',
    credentialId: 'MONGO-24680-PQRST',
    order: 4,
  },
  {
    _id: 'cert-react',
    _type: 'certification',
    name: 'React Developer Certification',
    issuer: 'Meta (Facebook)',
    dateIssued: '2023-01-20',
    description: 'Professional certification demonstrating proficiency in React fundamentals, hooks, state management, routing, and modern React patterns. Includes advanced topics like performance optimization and testing.',
    verificationUrl: 'https://www.coursera.org/account/accomplishments/verify',
    credentialId: 'META-13579-UVWXY',
    order: 5,
  },
]

export async function migrateCertifications() {
  logInfo('Starting Certifications migration...')
  
  let certificationsCount = 0
  
  try {
    for (const cert of certificationsData) {
      await createOrUpdateDocument(cert)
      logInfo(`✓ Created certification: ${cert._id}`)
      certificationsCount++
    }
    
    logSuccess(`Certifications migration completed! (${certificationsCount} certifications)`)
    logInfo('⚠️  Note: Certificate images need to be uploaded manually through Sanity Studio')
    return true
  } catch (error) {
    logError('Failed to migrate certifications:', error)
    throw error
  }
}
