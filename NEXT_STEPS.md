# Next Steps: Running Migrations

## Quick Start

### 1. Get Your Sanity API Token
1. Visit: https://www.sanity.io/manage/personal/tokens
2. Click "Add API Token"
3. Name: "Migration Token"
4. Permissions: **Editor** (required for write access)
5. Copy the token (starts with `sk-`)

### 2. Run All Migrations

**PowerShell (Windows):**
```powershell
cd c:\dev\mahmud-portfolio\portfolio_cms
$env:SANITY_API_TOKEN="sk-your-token-here"
npm run migrate
```

**Expected Output:**
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

ℹ Starting Settings migration...
✓ Created settings: settings-main
✓ Settings migration completed!

ℹ Starting About migration...
✓ Created about: about-main
✓ About migration completed!
⚠️  Note: Profile image needs to be uploaded manually through Sanity Studio

ℹ Starting Contact migration...
✓ Created contact: contact-main
✓ Contact migration completed!

ℹ Starting Career (Education + Jobs) migration...
✓ Created education: education-hsc
✓ Created education: education-bsc
✓ Created job: job-1
✓ Created job: job-2
✓ Career migration completed! (2 education entries, 2 jobs)
⚠️  Note: Images and videos need to be uploaded manually through Sanity Studio

ℹ Starting Projects (Categories + Projects) migration...
Creating project categories...
✓ Created category: category-desktop
✓ Created category: category-websites
✓ Created category: category-systems
✓ Created category: category-networking
Creating projects...
✓ Created project: project-desktop-1
✓ Created project: project-desktop-2
✓ Created project: project-desktop-3
✓ Created project: project-web-1
✓ Created project: project-web-2
✓ Created project: project-web-3
✓ Created project: project-system-1
✓ Created project: project-system-2
✓ Created project: project-network-1
✓ Created project: project-network-2
✓ Projects migration completed! (4 categories, 10 projects)
⚠️  Note: Project images and videos need to be uploaded manually through Sanity Studio

ℹ Starting Tools migration...
✓ Created tool: tool-blender
✓ Created tool: tool-premiere
✓ Created tool: tool-illustrator
✓ Created tool: tool-figma
✓ Created tool: tool-cisco-packet-tracer
✓ Created tool: tool-vscode
✓ Created tool: tool-git
✓ Created tool: tool-docker
✓ Created tool: tool-after-effects
✓ Tools migration completed! (9 tools)
⚠️  Note: Tool images and videos need to be uploaded manually through Sanity Studio

ℹ Starting Certifications migration...
✓ Created certification: cert-aws
✓ Created certification: cert-ccna
✓ Created certification: cert-psm
✓ Created certification: cert-mongodb
✓ Created certification: cert-react
✓ Certifications migration completed! (5 certifications)
⚠️  Note: Certificate images need to be uploaded manually through Sanity Studio

========================================
Migration Summary
========================================

✓ Successful: 9/9

⏱️  Total time: 12.34s

📝 Next Steps:
1. Open Sanity Studio: http://localhost:3333
2. Upload images and videos for all content
3. Review and edit migrated data as needed
4. Test content in Next.js app
5. Start refactoring components to use Sanity data
```

### 3. Verify in Sanity Studio

Open http://localhost:3333 and check:

#### Document Structure
You should see these content types in the left sidebar:
- Hero Section (1 document)
- About Section (1 document)
- Education (2 documents)
- Job (2 documents)
- Project Categories (4 documents)
- Projects (10 documents)
- Tools (9 documents)
- Certifications (5 documents)
- Contact (1 document)
- Social Links (4 documents)
- Settings (1 document)

**Total**: 36 documents created

#### Quick Checks
1. **Hero Section**
   - Click "Hero Section" → Should show "SAM Al Mahmud"
   - See 4 titles (Full Stack Developer, UI/UX Designer, 3D Artist, Network Engineer)

2. **Projects → Desktop Applications**
   - Should show "Productivity Suite" (featured)
   - Tech stack: Electron, React, TypeScript, SQLite, Node.js

3. **Tools → VS Code**
   - Click to open
   - Scroll to "Related Projects" → Should show 6 project references

4. **Career → Jobs**
   - "Software Engineer" should have `current: true`
   - "Full Stack Developer" should have `current: false`

### 4. Upload Media Files

#### Priority Order (Most Critical First)

**High Priority** (Visible on homepage):
1. **Hero Profile Image**
   - Navigate: Hero Section
   - Field: Profile Image (if added to schema)
   - Upload your main profile photo

2. **About Profile Image**
   - Navigate: About Section
   - Field: Profile Image
   - Upload same or different profile photo
   - **Tip**: Click image to set hotspot (face focus)

3. **Hero Resume PDF**
   - Navigate: Hero Section
   - Field: Resume File
   - Upload your resume.pdf

**Medium Priority** (Project pages):
4. **Featured Projects** (3 projects)
   - E-Commerce Platform (web-1)
   - Social Media Dashboard (web-2)
   - Microservices API Gateway (system-1)
   - Upload 3-4 screenshots each

5. **Project Category Icons** (Optional 3D models)
   - Desktop: laptop.glb
   - Web: browser.glb
   - Systems: server.glb
   - Networking: router.glb

**Lower Priority** (Detail pages):
6. **All Other Projects** (7 projects)
   - 3-4 screenshots each
   - Demo videos (optional)

7. **Education Images**
   - HSC: 2 images
   - BSC: 2 images + 1 video

8. **Job Screenshots**
   - Job 1: 3 images + 1 video
   - Job 2: 2 images

9. **Tools Screenshots**
   - 9 tools × 3-4 images each

10. **Certifications**
    - 5 certificates × 1 image each

**Estimated Upload Time**: 5-7 hours total (can be done over multiple sessions)

### 5. Test in Next.js App

Create a test page to verify Sanity integration:

```bash
cd c:\dev\mahmud-portfolio\portfolio\site
```

Create `src/app/test-sanity/page.tsx`:

```typescript
import {getHeroData, getAboutData, getProjectsData} from '@/lib/sanity.api'

export default async function TestSanityPage() {
  const hero = await getHeroData()
  const about = await getAboutData()
  const projects = await getProjectsData()

  return (
    <div className="p-8 bg-black text-white min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Sanity CMS Test Page</h1>
      
      {/* Hero Data */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-red-600">Hero Data</h2>
        {hero ? (
          <div>
            <p className="mb-2">
              <strong>Name:</strong> {hero.fullName.firstName} {hero.fullName.lastName}
            </p>
            <p className="mb-2"><strong>Titles:</strong></p>
            <ul className="list-disc list-inside ml-4">
              {hero.titles.map((title, i) => (
                <li key={i}>{title}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-red-500">❌ Hero data failed to load</p>
        )}
      </section>

      {/* About Data */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-red-600">About Data</h2>
        {about ? (
          <div>
            <p className="mb-2"><strong>Frontend Skills:</strong></p>
            <p className="ml-4">{about.skills.frontend.join(', ')}</p>
          </div>
        ) : (
          <p className="text-red-500">❌ About data failed to load</p>
        )}
      </section>

      {/* Projects Data */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-red-600">Projects Data</h2>
        {projects && projects.length > 0 ? (
          <div>
            <p className="mb-4"><strong>Total Projects:</strong> {projects.length}</p>
            <div className="grid grid-cols-1 gap-4">
              {projects.slice(0, 3).map((project) => (
                <div key={project._id} className="border border-red-900 p-4 rounded">
                  <h3 className="font-bold">{project.title}</h3>
                  <p className="text-sm text-gray-400">Category: {project.category?.name}</p>
                  <p className="text-sm">Tech: {project.techStack.join(', ')}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-red-500">❌ Projects data failed to load</p>
        )}
      </section>

      <div className="mt-12 p-4 bg-red-950 rounded border border-red-900">
        <h3 className="font-bold mb-2">✅ Sanity Integration Working!</h3>
        <p>All data is loading from Sanity CMS successfully.</p>
      </div>
    </div>
  )
}
```

**Visit**: http://localhost:3000/test-sanity

**Expected Result**:
- Hero section shows name and 4 titles
- About section shows frontend skills
- Projects section shows 3 projects with categories and tech stacks
- Green success box at bottom

### 6. Individual Migrations (If Needed)

If you want to re-run specific migrations:

```powershell
$env:SANITY_API_TOKEN="sk-your-token"

# Run one at a time
npm run migrate:hero
npm run migrate:social
npm run migrate:settings
npm run migrate:about
npm run migrate:contact
npm run migrate:career
npm run migrate:projects
npm run migrate:tools
npm run migrate:certifications
```

## Common Issues

### Issue: Token Error
```
✗ SANITY_API_TOKEN environment variable is not set!
```

**Fix**: Make sure to set the token **in the same shell** where you run npm:
```powershell
$env:SANITY_API_TOKEN="sk-xxxxx"
npm run migrate
```

### Issue: Package Not Found
```
Cannot find module '@sanity/client'
```

**Fix**: Install dependencies first:
```bash
cd c:\dev\mahmud-portfolio\portfolio_cms
npm install
```

### Issue: Unauthorized Error
```
Request failed with status 401
```

**Fix**: Your token doesn't have Editor permissions.
1. Go to https://www.sanity.io/manage/personal/tokens
2. Delete old token
3. Create new token with **Editor** permissions

### Issue: Studio Not Running
If you see connection errors, make sure Studio is running:

```bash
cd c:\dev\mahmud-portfolio\portfolio_cms\sanity
npm run dev
```

Should show: `Running with auto-updates enabled` at http://localhost:3333

## What's Next?

After successful migration:

1. **Phase 7**: Refactor Components
   - Update components to fetch from Sanity
   - Replace config imports with Sanity API calls
   - Use Portable Text for rich content
   - Implement image optimization

2. **Phase 8**: Media Optimization
   - Configure Next.js Image component
   - Add blur placeholders
   - Implement responsive images

3. **Phase 9**: Real-time Preview & ISR
   - Add preview mode for draft content
   - Configure Incremental Static Regeneration
   - Set up webhooks for auto-deploy

---

**Current Status**: Ready to run migrations
**Next Action**: Get API token and run `npm run migrate`
