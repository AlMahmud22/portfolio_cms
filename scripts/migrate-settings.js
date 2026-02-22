import {createOrUpdateDocument, logInfo, logSuccess, logError, client} from './utils.js'

// Settings Data
const settingsData = {
  _id: 'settings-main',
  _type: 'settings',
  siteTitle: 'SAM_.portfolio',
  siteDescription: 'Full Stack Developer | Network Engineer | 3D Designer - Building innovative solutions with cutting-edge technologies',
  siteUrl: 'https://almahmud.com',
  seo: {
    keywords: [
      'Full Stack Developer',
      'Network Engineer',
      '3D Designer',
      'React',
      'Next.js',
      'Node.js',
      'TypeScript',
      'Blender',
      'Three.js',
      'Networking',
      'CCNA',
    ],
    twitterHandle: 'almahmud22',
  },
  analytics: {
    googleAnalyticsId: '', // Add your GA4 ID here
    googleTagManagerId: '', // Add your GTM ID here
  },
  theme: {
    primaryColor: '#DC143C',
    fontFamily: 'TechHeadlines',
  },
}

async function migrateSettings() {
  logInfo('Starting Settings migration...')
  
  try {
    await createOrUpdateDocument(settingsData)
    logSuccess('Settings migration completed!')
    return true
  } catch (error) {
    logError(`Settings migration failed: ${error.message}`)
    return false
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  migrateSettings()
    .then(() => process.exit(0))
    .catch(() => process.exit(1))
}

export {migrateSettings}
