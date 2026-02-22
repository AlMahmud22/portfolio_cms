# Migration Scripts Guide

This directory contains scripts to migrate data from the existing portfolio configuration files to Sanity CMS.

## Prerequisites

1. **Get API Token**:
   - Visit https://www.sanity.io/manage/personal/tokens
   - Create a new token with "Editor" permissions
   - Copy the token

2. **Install Dependencies**:
   ```bash
   cd portfolio_cms
   npm install
   ```

## Running Migrations

### Option 1: Migrate All (Recommended)
Migrates Hero, Social Links, Settings, About, and Contact in one go:

```bash
SANITY_API_TOKEN=your_token_here npm run migrate
```

**Windows PowerShell:**
```powershell
$env:SANITY_API_TOKEN="your_token_here"; npm run migrate
```

### Option 2: Migrate Individual Sections
Migrate one section at a time:

```bash
# Social Links (run first - referenced by others)
SANITY_API_TOKEN=your_token npm run migrate:social

# Hero Section
SANITY_API_TOKEN=your_token npm run migrate:hero

# Settings
SANITY_API_TOKEN=your_token npm run migrate:settings

# About Section
SANITY_API_TOKEN=your_token npm run migrate:about

# Contact
SANITY_API_TOKEN=your_token npm run migrate:contact
```

## What Gets Migrated

### ✅ Automatic Migration
- **Hero Section**: Name, titles, terminal commands, scroll hint
- **Social Links**: GitHub, LinkedIn, Twitter, Email (4 documents)
- **Settings**: Site title, description, SEO, theme colors
- **About**: Bio (rich text), skills (4 categories), terminal commands, stats
- **Contact**: Email, availability, form message, social links

### ⚠️ Manual Steps Required
Some content must be added manually through Sanity Studio:

1. **Profile Image** (About section)
   - Open Studio: http://localhost:3333
   - Navigate to "About Section"
   - Upload your profile photo
   - Set hotspot (optional)

2. **Resume PDF** (Hero section)
   - Navigate to "Hero Section"
   - Upload resume.pdf file

3. **Education** (Career section)
   - Create 2+ education documents
   - Add dates, institution, course info
   - Upload images/videos

4. **Jobs** (Career section)
   - Create 2+ job documents
   - Add responsibilities, tech stack
   - Upload project images

5. **Project Categories**
   - Create 4 categories:
     * Desktop Applications
     * Web Development
     * Systems Development
     * Networking Projects

6. **Projects**
   - Create project documents
   - Link to categories
   - Upload screenshots
   - Add tech stack, links

7. **Tools**
   - Create tool documents
   - Link to related projects
   - Upload tool screenshots

8. **Certifications**
   - Create certification documents
   - Upload certificate images
   - Add verification URLs

## Migration Output

After running, you should see:

```
========================================
Portfolio CMS Migration
========================================

ℹ Starting Social Links migration...
✓ Created socialLink: social-github
✓ Created socialLink: social-linkedin
✓ Created socialLink: social-twitter
✓ Created socialLink: social-email
✓ Social Links migration completed! (4 links)

ℹ Starting Hero migration...
✓ Created hero: hero-main
✓ Hero migration completed!

... (more migrations)

========================================
Migration Summary
========================================

✓ Successful: 5/5

📝 Next Steps:
1. Open Sanity Studio: http://localhost:3333
2. Upload profile image for About section
3. Review and edit migrated data as needed
4. Add education, jobs, projects, tools, and certifications
5. Test data in Next.js app
```

## Verifying Migration

1. **Open Sanity Studio**:
   ```bash
   cd sanity
   npm run dev
   ```
   Visit: http://localhost:3333

2. **Check Documents**:
   - Hero Section → Should show SAM Al Mahmud with 4 titles
   - Social Links → Should show 4 links
   - About Section → Should show bio and skills (image pending)
   - Settings → Should show site title, SEO settings
   - Contact → Should show email and availability

3. **Test in Next.js**:
   Create a test page to verify data loads:
   
   ```typescript
   // portfolio/site/app/test-sanity/page.tsx
   import {getHeroData, getAboutData} from '@/lib/sanity.api'
   
   export default async function TestPage() {
     const hero = await getHeroData()
     const about = await getAboutData()
     
     return (
       <div className="p-8">
         <h1>{hero?.fullName.firstName} {hero?.fullName.lastName}</h1>
         <ul>
           {hero?.titles.map((title, i) => (
             <li key={i}>{title}</li>
           ))}
         </ul>
         <h2>Skills</h2>
         <p>Frontend: {about?.skills.frontend.join(', ')}</p>
       </div>
     )
   }
   ```
   
   Visit: http://localhost:3000/test-sanity

## Troubleshooting

### Error: "SANITY_API_TOKEN is not set"
**Solution**: Make sure you set the environment variable before running:
```bash
SANITY_API_TOKEN=your_token npm run migrate
```

### Error: "Cannot find module '@sanity/client'"
**Solution**: Install dependencies first:
```bash
npm install
```

### Error: "Unauthorized"
**Solution**: Check that your API token has **Editor** permissions in Sanity Dashboard.

### Warning: "Failed to create/update..."
**Solution**: 
1. Verify Sanity Studio is running
2. Check your project ID in `utils.js` (7d6vxzye)
3. Ensure the dataset is 'production'

## Files

- `utils.js` - Helper functions for Sanity operations
- `migrate.js` - Main migration script (runs all)
- `migrate-hero.js` - Hero section migration
- `migrate-social.js` - Social links migration
- `migrate-settings.js` - Settings migration
- `migrate-about.js` - About section migration  
- `migrate-contact.js` - Contact migration

## Next: Manual Content Addition

After automatic migration completes:

1. **Upload Images** (30 min)
   - Profile photo
   - Resume PDF
   - Education institution images
   - Job project screenshots

2. **Add Career Data** (1-2 hours)
   - 2 Education entries with dates
   - 2-5 Job entries with responsibilities

3. **Add Projects** (2-3 hours)
   - 4 Project categories
   - 10-20 projects with screenshots
   - Tech stacks and links

4. **Add Tools** (1 hour)
   - 10-15 tools with descriptions
   - Link to related projects

5. **Add Certifications** (30 min)
   - 5 certifications with images
   - Verification URLs

**Total Estimated Time**: 5-7 hours for complete migration

---

**Status**: Ready to run migrations  
**Next**: Get API token and run `npm run migrate`
