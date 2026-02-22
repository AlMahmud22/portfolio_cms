import {createOrUpdateDocument, logInfo, logSuccess, logError} from './utils.js'

// Contact Data
const contactData = {
  _id: 'contact-main',
  _type: 'contact',
  email: 'contact@almahmud.com',
  availabilityStatus: 'available',
  formSuccessMessage: 'Thank you for reaching out! I will get back to you within 24 hours.',
  socialLinks: [
    {_ref: 'social-github', _type: 'reference'},
    {_ref: 'social-linkedin', _type: 'reference'},
    {_ref: 'social-twitter', _type: 'reference'},
    {_ref: 'social-email', _type: 'reference'},
  ],
}

async function migrateContact() {
  logInfo('Starting Contact migration...')
  
  try {
    await createOrUpdateDocument(contactData)
    logSuccess('Contact migration completed!')
    return true
  } catch (error) {
    logError(`Contact migration failed: ${error.message}`)
    return false
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  migrateContact()
    .then(() => process.exit(0))
    .catch(() => process.exit(1))
}

export {migrateContact}
