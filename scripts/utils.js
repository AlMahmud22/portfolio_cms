import {createClient} from '@sanity/client'

// Sanity client configuration
const client = createClient({
  projectId: '7d6vxzye',
  dataset: 'production',
  apiVersion: '2024-02-22',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, // Set this in environment
})

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
}

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

function logSuccess(message) {
  log(`✓ ${message}`, 'green')
}

function logError(message) {
  log(`✗ ${message}`, 'red')
}

function logInfo(message) {
  log(`ℹ ${message}`, 'cyan')
}

function logWarning(message) {
  log(`⚠ ${message}`, 'yellow')
}

// Helper to create or update document
async function createOrUpdateDocument(doc) {
  try {
    const existing = await client.fetch(
      `*[_type == "${doc._type}" && _id == "${doc._id}"][0]`
    )
    
    if (existing) {
      const updated = await client
        .patch(doc._id)
        .set(doc)
        .commit()
      logSuccess(`Updated ${doc._type}: ${doc._id}`)
      return updated
    } else {
      const created = await client.create(doc)
      logSuccess(`Created ${doc._type}: ${doc._id}`)
      return created
    }
  } catch (error) {
    logError(`Failed to create/update ${doc._type}: ${error.message}`)
    throw error
  }
}

// Helper to delete all documents of a type
async function deleteAllOfType(type) {
  try {
    const docs = await client.fetch(`*[_type == "${type}"][]._id`)
    if (docs.length > 0) {
      await Promise.all(docs.map(id => client.delete(id)))
      logWarning(`Deleted ${docs.length} ${type} documents`)
    }
  } catch (error) {
    logError(`Failed to delete ${type}: ${error.message}`)
  }
}

export {
  client,
  log,
  logSuccess,
  logError,
  logInfo,
  logWarning,
  createOrUpdateDocument,
  deleteAllOfType,
}
