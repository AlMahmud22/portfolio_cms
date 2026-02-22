import {migrateHero} from './migrate-hero.js'
import {migrateSocialLinks} from './migrate-social.js'
import {migrateSettings} from './migrate-settings.js'
import {migrateAbout} from './migrate-about.js'
import {migrateContact} from './migrate-contact.js'
import {migrateCareer} from './migrate-career.js'
import {migrateProjects} from './migrate-projects.js'
import {migrateTools} from './migrate-tools.js'
import {migrateCertifications} from './migrate-certifications.js'
import {log, logSuccess, logError, logInfo} from './utils.js'

async function migrateAll() {
  log('\n========================================', 'cyan')
  log('Portfolio CMS Migration', 'cyan')
  log('========================================\n', 'cyan')
  
  // IMPORTANT: Projects must run before Tools (tools reference projects)
  const migrations = [
    {name: 'Social Links', fn: migrateSocialLinks},
    {name: 'Hero', fn: migrateHero},
    {name: 'Settings', fn: migrateSettings},
    {name: 'About', fn: migrateAbout},
    {name: 'Contact', fn: migrateContact},
    {name: 'Career (Education + Jobs)', fn: migrateCareer},
    {name: 'Projects (Categories + Projects)', fn: migrateProjects},
    {name: 'Tools', fn: migrateTools},
    {name: 'Certifications', fn: migrateCertifications},
  ]
  
  let successful = 0
  let failed = 0
  
  for (const migration of migrations) {
    try {
      const result = await migration.fn()
      if (result) {
        successful++
      } else {
        failed++
      }
    } catch (error) {
      logError(`${migration.name} migration error: ${error.message}`)
      failed++
    }
    log('') // Empty line for spacing
  }
  
  log('\n========================================', 'cyan')
  log('Migration Summary', 'cyan')
  log('========================================\n', 'cyan')
  logSuccess(`Successful: ${successful}/${migrations.length}`)
  if (failed > 0) {
    logError(`Failed: ${failed}/${migrations.length}`)
  }
  
  log('\n📝 Next Steps:', 'yellow')
  log('1. Open Sanity Studio: http://localhost:3333', 'yellow')
  log('2. Upload images and videos for all content:', 'yellow')
  log('   - Hero: Profile image, resume PDF', 'yellow')
  log('   - About: Profile image', 'yellow')
  log('   - Education: Institution images (2 per entry)', 'yellow')
  log('   - Jobs: Project screenshots (2-3 per job)', 'yellow')
  log('   - Projects: Screenshots and demo videos (3-4 per project)', 'yellow')
  log('   - Tools: Tool screenshots and demos (3-4 per tool)', 'yellow')
  log('   - Certifications: Certificate images (1 per cert)', 'yellow')
  log('3. Review and edit migrated data as needed', 'yellow')
  log('4. Test content in Next.js app', 'yellow')
  log('5. Start refactoring components to use Sanity data\n', 'yellow')
  
  return failed === 0
}

// Check for SANITY_API_TOKEN
if (!process.env.SANITY_API_TOKEN) {
  logError('SANITY_API_TOKEN environment variable is not set!')
  logInfo('Get your token from: https://www.sanity.io/manage/personal/tokens')
  logInfo('Then run: SANITY_API_TOKEN=your_token npm run migrate')
  process.exit(1)
}

// Run migration
migrateAll()
  .then((success) => {
    process.exit(success ? 0 : 1)
  })
  .catch((error) => {
    logError(`Migration failed: ${error.message}`)
    process.exit(1)
  })
