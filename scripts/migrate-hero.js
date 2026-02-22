import {createOrUpdateDocument, logInfo, logSuccess, logError} from './utils.js'

// Sample Hero Data
const heroData = {
  _id: 'hero-main',
  _type: 'hero',
  fullName: {
    firstName: 'SAM',
    lastName: 'Al Mahmud',
  },
  titles: [
    'Full Stack Developer',
    'Network Engineer',
    '3D Designer',
    'UI/UX Enthusiast',
  ],
  terminalCommands: {
    greeting: '$ welcome',
    output: [
      'Welcome to SAM_.portfolio',
      'Initializing creative workspace...',
      'Loading projects... [████████████████] 100%',
      'System ready. Explore my work below.',
    ],
  },
  scrollHintText: 'Scroll to explore my journey',
}

async function migrateHero() {
  logInfo('Starting Hero migration...')
  
  try {
    await createOrUpdateDocument(heroData)
    logSuccess('Hero migration completed!')
    return true
  } catch (error) {
    logError(`Hero migration failed: ${error.message}`)
    return false
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  migrateHero()
    .then(() => process.exit(0))
    .catch(() => process.exit(1))
}

export {migrateHero}
