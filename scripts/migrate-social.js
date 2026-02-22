import {createOrUpdateDocument, logInfo, logSuccess, logError} from './utils.js'

// Social Links Data
const socialLinksData = [
  {
    _id: 'social-github',
    _type: 'socialLink',
    platform: 'GitHub',
    url: 'https://github.com/AlMahmud22',
    icon: 'Github',
    order: 1,
  },
  {
    _id: 'social-linkedin',
    _type: 'socialLink',
    platform: 'LinkedIn',
    url: 'https://linkedin.com/in/almahmud22',
    icon: 'Linkedin',
    order: 2,
  },
  {
    _id: 'social-twitter',
    _type: 'socialLink',
    platform: 'Twitter',
    url: 'https://twitter.com/almahmud22',
    icon: 'Twitter',
    order: 3,
  },
  {
    _id: 'social-email',
    _type: 'socialLink',
    platform: 'Email',
    url: 'mailto:contact@almahmud.com',
    icon: 'Mail',
    order: 4,
  },
]

async function migrateSocialLinks() {
  logInfo('Starting Social Links migration...')
  
  try {
    for (const link of socialLinksData) {
      await createOrUpdateDocument(link)
    }
    logSuccess(`Social Links migration completed! (${socialLinksData.length} links)`)
    return true
  } catch (error) {
    logError(`Social Links migration failed: ${error.message}`)
    return false
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  migrateSocialLinks()
    .then(() => process.exit(0))
    .catch(() => process.exit(1))
}

export {migrateSocialLinks, socialLinksData}
