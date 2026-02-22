# Portfolio CMS - Sanity Implementation TODO

**Project**: Portfolio CMS with Sanity.io  
**Start Date**: February 22, 2026  
**Target Completion**: April 22, 2026 (8 weeks)  
**Status**: 🟡 Planning Phase

---

## Quick Reference

**Current Phase**: Phase 0 - Pre-Implementation  
**Next Milestone**: Sanity Studio Setup Complete  
**Blockers**: None

---

## Phase 0: Pre-Implementation Setup ⏳

### Environment Preparation
- [ ] Create Sanity account at https://sanity.io
- [ ] Install Sanity CLI globally: `npm install -g @sanity/cli`
- [ ] Verify Node.js version (18.x or higher)
- [ ] Set up GitHub repository access tokens
- [ ] Create project folder structure in `portfolio_cms/`

### Documentation Review
- [ ] Review complete `plan.md` document
- [ ] Understand all 11 schema relationships
- [ ] Map current config files to Sanity schemas
- [ ] Identify media migration requirements
- [ ] Document current data structure locations

**Estimated Time**: 1 day  
**Due Date**: February 23, 2026

---

## Phase 1: Sanity Studio Setup (Week 1) 🔴

### 1.1 Project Initialization
- [ ] Navigate to `portfolio_cms/` folder
- [ ] Run `npm create sanity@latest` or `sanity init`
- [ ] Choose project configuration:
  - [ ] Project name: "Portfolio CMS"
  - [ ] Dataset: "production"
  - [ ] Schema template: "Clean project"
  - [ ] Output path: `./sanity`
- [ ] Install dependencies: `npm install`
- [ ] Test Sanity Studio locally: `npm run dev`

### 1.2 Project Configuration
- [ ] Configure `sanity.config.ts` with branding
- [ ] Set up project ID in environment variables
- [ ] Configure dataset permissions (public read, private write)
- [ ] Add CORS origins for Next.js development (localhost:3000)
- [ ] Add CORS origins for production domain
- [ ] Create API tokens:
  - [ ] Editor token (for CMS admin)
  - [ ] Viewer token (for Next.js read-only)

### 1.3 Schema Creation - Core Schemas
- [ ] Create `schemas/index.ts` (schema registry)
- [ ] Create `schemas/hero.ts`
  - [ ] Add fullName object (firstName, lastName)
  - [ ] Add titles array
  - [ ] Add terminalCommands object
  - [ ] Add resumeFile field
  - [ ] Add scrollHintText field
  - [ ] Test preview in Studio
- [ ] Create `schemas/socialLink.ts`
  - [ ] Add platform, url, icon, order fields
  - [ ] Add ordering configuration
  - [ ] Test preview
- [ ] Create `schemas/settings.ts`
  - [ ] Add site metadata fields
  - [ ] Add SEO object
  - [ ] Add analytics object
  - [ ] Add theme object
  - [ ] Test preview

### 1.4 Schema Creation - About & Contact
- [ ] Create `schemas/about.ts`
  - [ ] Add profileImage with hotspot
  - [ ] Add bio as portable text
  - [ ] Add quickStats object
  - [ ] Add skills object (4 categories)
  - [ ] Add terminalCommands array
  - [ ] Add socialLinks references
  - [ ] Test rich text editor
- [ ] Create `schemas/contact.ts`
  - [ ] Add email field
  - [ ] Add availabilityStatus dropdown
  - [ ] Add formSuccessMessage
  - [ ] Add socialLinks references
  - [ ] Test preview

### 1.5 Schema Creation - Career
- [ ] Create `schemas/education.ts`
  - [ ] Add level dropdown (HSC, BSC, MSC, PHD, Other)
  - [ ] Add institution, course, location fields
  - [ ] Add dateRange object (start, end)
  - [ ] Add description text area
  - [ ] Add images array with alt text
  - [ ] Add videos array
  - [ ] Add order field for sorting
  - [ ] Configure ordering
  - [ ] Test preview
- [ ] Create `schemas/job.ts`
  - [ ] Add title, company, location fields
  - [ ] Add dateRange object (start, end, current)
  - [ ] Add description text area
  - [ ] Add responsibilities array
  - [ ] Add techStack array
  - [ ] Add images array
  - [ ] Add videos array
  - [ ] Add order field
  - [ ] Configure ordering
  - [ ] Test preview

### 1.6 Schema Creation - Projects
- [ ] Create `schemas/projectCategory.ts`
  - [ ] Add name, slug, description fields
  - [ ] Add icon3DPath string
  - [ ] Add order field
  - [ ] Configure slug generation
  - [ ] Configure ordering
  - [ ] Test preview
- [ ] Create `schemas/project.ts`
  - [ ] Add title, slug, description fields
  - [ ] Add category reference
  - [ ] Add featured boolean
  - [ ] Add techStack array
  - [ ] Add images array with hotspot
  - [ ] Add videos array
  - [ ] Add links object (github, live, demo)
  - [ ] Add order and publishedAt fields
  - [ ] Configure multiple orderings
  - [ ] Test preview and relationships

### 1.7 Schema Creation - Tools & Certifications
- [ ] Create `schemas/tool.ts`
  - [ ] Add name, slug, description fields
  - [ ] Add category dropdown (5 options)
  - [ ] Add icon3DPath string
  - [ ] Add images array
  - [ ] Add videos array
  - [ ] Add relatedProjects references
  - [ ] Add website URL
  - [ ] Add order field
  - [ ] Configure ordering
  - [ ] Test preview and project relationships
- [ ] Create `schemas/certification.ts`
  - [ ] Add name, issuer fields
  - [ ] Add dateIssued and expiryDate
  - [ ] Add description text area
  - [ ] Add certificateImage with alt text
  - [ ] Add verificationUrl and credentialId
  - [ ] Add order field
  - [ ] Configure date ordering
  - [ ] Test preview

### 1.8 Studio Testing & Validation
- [ ] Register all schemas in `schemas/index.ts`
- [ ] Test each schema independently:
  - [ ] Create sample document
  - [ ] Test all field types
  - [ ] Verify validation rules
  - [ ] Test image uploads
  - [ ] Test file uploads
  - [ ] Check preview rendering
- [ ] Test schema relationships:
  - [ ] Project → ProjectCategory
  - [ ] Tool → Projects (array)
  - [ ] About → SocialLinks
  - [ ] Contact → SocialLinks
- [ ] Test ordering configurations
- [ ] Document any issues or schema adjustments needed

### 1.9 Sample Data Creation
- [ ] Add 1 Hero document
- [ ] Add 1 About document
- [ ] Add 2 Education documents
- [ ] Add 2 Job documents
- [ ] Add 4 ProjectCategory documents
- [ ] Add 6 Project documents (2 per category)
- [ ] Add 5 Tool documents
- [ ] Add 3 Certification documents
- [ ] Add 1 Contact document
- [ ] Add 4 SocialLink documents
- [ ] Add 1 Settings document
- [ ] Test data integrity and relationships

### 1.10 Studio Deployment
- [ ] Deploy Sanity Studio: `sanity deploy`
- [ ] Choose studio hostname: `portfolio-cms-almahmud`
- [ ] Test deployed studio access
- [ ] Share studio URL with stakeholders
- [ ] Document login credentials securely

**Estimated Time**: 5 days  
**Due Date**: February 29, 2026

---

## Phase 2: Next.js Integration (Week 2) 🟡

### 2.1 Package Installation
- [ ] Navigate to `portfolio/site/` folder
- [ ] Install Sanity client: `npm install @sanity/client`
- [ ] Install image URL builder: `npm install @sanity/image-url`
- [ ] Install Portable Text React: `npm install @portabletext/react`
- [ ] Install Sanity types (dev): `npm install -D @sanity/types`
- [ ] Verify package installations

### 2.2 Client Configuration
- [ ] Create `lib/sanity.client.ts`
  - [ ] Import and configure createClient
  - [ ] Set up client with environment variables
  - [ ] Configure CDN settings
  - [ ] Export client instance
  - [ ] Create urlFor helper (imageUrlBuilder)
  - [ ] Test client connection
- [ ] Create `.env.local` in `portfolio/site/`
  - [ ] Add NEXT_PUBLIC_SANITY_PROJECT_ID
  - [ ] Add NEXT_PUBLIC_SANITY_DATASET
  - [ ] Add SANITY_API_TOKEN
  - [ ] Add NEXT_PUBLIC_SANITY_STUDIO_URL
  - [ ] Add REVALIDATION_SECRET
  - [ ] Add `.env.local` to `.gitignore`

### 2.3 TypeScript Types
- [ ] Create `lib/sanity.types.ts`
- [ ] Define Hero interface
- [ ] Define About interface (with Skills, Stats)
- [ ] Define Education interface
- [ ] Define Job interface
- [ ] Define ProjectCategory interface
- [ ] Define Project interface
- [ ] Define Tool interface
- [ ] Define Certification interface
- [ ] Define Contact interface
- [ ] Define SocialLink interface
- [ ] Define Settings interface
- [ ] Export all interfaces

### 2.4 GROQ Queries
- [ ] Create `lib/sanity.queries.ts`
- [ ] Write heroQuery
  - [ ] Fetch name, titles, terminal commands
  - [ ] Resolve resume file URL
  - [ ] Test query in Sanity Vision
- [ ] Write aboutQuery
  - [ ] Fetch profile image with URL
  - [ ] Fetch bio (portable text)
  - [ ] Fetch skills object
  - [ ] Resolve socialLinks references
  - [ ] Test query
- [ ] Write projectsQuery
  - [ ] Fetch all projects with category
  - [ ] Transform images array with URLs
  - [ ] Transform videos array with URLs
  - [ ] Sort by order
  - [ ] Test query
- [ ] Write projectsByCategoryQuery
  - [ ] Filter by category slug parameter
  - [ ] Fetch category details
  - [ ] Test with different categories
- [ ] Write toolsQuery
  - [ ] Fetch all tools
  - [ ] Resolve relatedProjects references
  - [ ] Transform media arrays
  - [ ] Test relationships
- [ ] Write careerQuery
  - [ ] Fetch education array
  - [ ] Fetch jobs array
  - [ ] Transform all media
  - [ ] Test combined query
- [ ] Write certificationsQuery
  - [ ] Fetch all certs sorted by date
  - [ ] Transform certificate image URL
  - [ ] Test query
- [ ] Write contactQuery
  - [ ] Fetch settings and social links
  - [ ] Resolve references
  - [ ] Test query
- [ ] Write settingsQuery
  - [ ] Fetch all global settings
  - [ ] Transform logo and favicon URLs
  - [ ] Test query

### 2.5 API Functions
- [ ] Create `lib/sanity.api.ts`
- [ ] Implement getHeroData()
- [ ] Implement getAboutData()
- [ ] Implement getProjectsData()
- [ ] Implement getProjectsByCategory(slug)
- [ ] Implement getToolsData()
- [ ] Implement getCareerData()
- [ ] Implement getCertificationsData()
- [ ] Implement getContactData()
- [ ] Implement getSettings()
- [ ] Add error handling to all functions
- [ ] Add TypeScript return types
- [ ] Test all functions with sample data

### 2.6 Integration Testing
- [ ] Test Hero data fetching in page component
- [ ] Test About data fetching
- [ ] Test Projects data fetching
- [ ] Test Tools data fetching
- [ ] Test Career data fetching
- [ ] Test Certifications data fetching
- [ ] Test Contact data fetching
- [ ] Test image URL generation
- [ ] Test error scenarios (empty data, network errors)
- [ ] Verify TypeScript types match responses
- [ ] Document any query adjustments needed

**Estimated Time**: 5 days  
**Due Date**: March 7, 2026

---

## Phase 3: Content Migration (Week 3) 🟡

### 3.1 Hero Section Migration
- [ ] Review current Hero data in `HeroContent.tsx`
- [ ] Extract fullName from component
- [ ] Extract professional titles
- [ ] Extract terminal command object
- [ ] Upload resume PDF to Sanity
- [ ] Create Hero document in Sanity Studio
- [ ] Verify all fields populated correctly
- [ ] Test data retrieval with getHeroData()

### 3.2 About Section Migration
- [ ] Review `about.config.ts` data structure
- [ ] Upload profile image to Sanity
- [ ] Format bio text as Portable Text
- [ ] Migrate quick stats object
- [ ] Migrate all 4 skill categories:
  - [ ] Frontend skills array
  - [ ] Backend skills array
  - [ ] DevOps skills array
  - [ ] Networking skills array
- [ ] Migrate terminal commands array
- [ ] Create SocialLink documents (4 links)
- [ ] Create About document with references
- [ ] Test data retrieval

### 3.3 Career Section Migration - Education
- [ ] Review `career.config.ts` education data
- [ ] For each education entry:
  - [ ] Create Education document in Sanity
  - [ ] Upload institution images
  - [ ] Upload videos (if any)
  - [ ] Set correct order value
  - [ ] Verify date range format
- [ ] Total: 2 Education documents
- [ ] Test timeline ordering
- [ ] Test media URLs

### 3.4 Career Section Migration - Jobs
- [ ] Review `career.config.ts` jobs data
- [ ] For each job entry:
  - [ ] Create Job document in Sanity
  - [ ] Migrate responsibilities array
  - [ ] Migrate tech stack array
  - [ ] Upload project images
  - [ ] Upload demo videos (if any)
  - [ ] Set current job flag if applicable
  - [ ] Set correct order value
- [ ] Total: 2+ Job documents
- [ ] Test timeline ordering
- [ ] Test media URLs

### 3.5 Projects Section Migration - Categories
- [ ] Review `projects.config.ts` categories
- [ ] Create ProjectCategory: "Desktop Applications"
  - [ ] Set icon3DPath: /models/projects/laptop.glb
  - [ ] Set order: 1
  - [ ] Generate slug
- [ ] Create ProjectCategory: "Web Development"
  - [ ] Set icon3DPath: /models/projects/browser.glb
  - [ ] Set order: 2
- [ ] Create ProjectCategory: "Systems Development"
  - [ ] Set icon3DPath: /models/projects/server.glb
  - [ ] Set order: 3
- [ ] Create ProjectCategory: "Networking Projects"
  - [ ] Set icon3DPath: /models/projects/router.glb
  - [ ] Set order: 4
- [ ] Test category ordering

### 3.6 Projects Section Migration - Projects
- [ ] Review all projects in `projects.config.ts`
- [ ] For each project (sample: first 6):
  - [ ] Create Project document
  - [ ] Upload project images (3-4 per project)
  - [ ] Upload demo videos (if any)
  - [ ] Link to category reference
  - [ ] Migrate tech stack array
  - [ ] Add GitHub/live/demo links
  - [ ] Set featured flag
  - [ ] Set order value
  - [ ] Generate slug
- [ ] Projects to migrate:
  - [ ] Desktop: Productivity Suite
  - [ ] Desktop: Media Converter
  - [ ] Web: E-commerce Platform
  - [ ] Web: Portfolio Website
  - [ ] Systems: API Gateway
  - [ ] Networking: VLAN Configuration
- [ ] Test project-category relationships
- [ ] Test filtering by category

### 3.7 Tools Section Migration
- [ ] Review `tools.config.ts` data
- [ ] For each tool:
  - [ ] Create Tool document
  - [ ] Upload tool screenshots (3-4 per tool)
  - [ ] Upload demo videos (if any)
  - [ ] Set icon3DPath
  - [ ] Set category dropdown value
  - [ ] Add website URL
  - [ ] Link related projects (references)
  - [ ] Set order value
  - [ ] Generate slug
- [ ] Tools to migrate:
  - [ ] Blender (3D)
  - [ ] Adobe Premiere Pro (Video)
  - [ ] Adobe Illustrator (Design)
  - [ ] Figma (Design)
  - [ ] Cisco Packet Tracer (Networking)
- [ ] Test tool-project relationships
- [ ] Verify related projects appear correctly

### 3.8 Certifications Section Migration
- [ ] Review `certifications.config.ts` data
- [ ] For each certification:
  - [ ] Upload certificate image to Sanity
  - [ ] Create Certification document
  - [ ] Set issuer name
  - [ ] Set date issued
  - [ ] Set expiry date (if applicable)
  - [ ] Add verification URL
  - [ ] Add credential ID
  - [ ] Set order value
- [ ] Certifications to migrate:
  - [ ] AWS Solutions Architect
  - [ ] CCNA
  - [ ] PSM I
  - [ ] MongoDB Developer
  - [ ] React Developer (Meta)
- [ ] Test date sorting
- [ ] Verify certificate image displays

### 3.9 Contact & Settings Migration
- [ ] Create Contact document:
  - [ ] Set contact email
  - [ ] Set availability status
  - [ ] Set form success message
  - [ ] Link social links references
- [ ] Create Settings document:
  - [ ] Set site title: "SAM_.portfolio"
  - [ ] Set site description
  - [ ] Set site URL
  - [ ] Upload logo and favicon
  - [ ] Add SEO keywords
  - [ ] Upload OG image
  - [ ] Set Twitter handle
  - [ ] Add Google Analytics ID
  - [ ] Set theme colors (primary: #DC143C)
- [ ] Test settings retrieval

### 3.10 Migration Verification
- [ ] Run all getters to verify data:
  - [ ] getHeroData() returns complete object
  - [ ] getAboutData() includes social links
  - [ ] getCareerData() has education + jobs
  - [ ] getProjectsData() has all categories
  - [ ] getToolsData() has related projects
  - [ ] getCertificationsData() sorted by date
  - [ ] getContactData() has settings
  - [ ] getSettings() has complete config
- [ ] Verify all images load correctly
- [ ] Verify all relationships resolve
- [ ] Document any data issues
- [ ] Create backup of Sanity dataset

**Estimated Time**: 5 days  
**Due Date**: March 14, 2026

---

## Phase 4: Component Refactoring (Week 4) 🟡

### 4.1 Hero Component Update
- [ ] Update `HeroContent.tsx`:
  - [ ] Add getHeroData() import
  - [ ] Fetch hero data in page component
  - [ ] Pass data as props to HeroContent
  - [ ] Replace hardcoded name with data.fullName
  - [ ] Map titles array dynamically
  - [ ] Map terminal commands object
  - [ ] Update resume link to data.resumeUrl
  - [ ] Update scroll hint text
  - [ ] Add loading state
  - [ ] Add error boundary
  - [ ] Test with live data
  - [ ] Remove old config imports

### 4.2 About Component Update
- [ ] Update `AboutContent.tsx`:
  - [ ] Fetch about data in page component
  - [ ] Pass data as props
  - [ ] Replace profile image with urlFor(data.profileImage)
  - [ ] Add responsive image optimization
  - [ ] Render bio with PortableText component
  - [ ] Map skills object (4 categories)
  - [ ] Map quick stats dynamically
  - [ ] Map social links from references
  - [ ] Add loading skeleton
  - [ ] Test rich text rendering
  - [ ] Remove old config imports

### 4.3 Career Component Update
- [ ] Update `ParallaxTimeline.tsx`:
  - [ ] Fetch career data in CareerContent
  - [ ] Pass education and jobs arrays
  - [ ] Update EducationCard to accept Sanity data
  - [ ] Update JobCard to accept Sanity data
  - [ ] Format date ranges dynamically
  - [ ] Map responsibilities arrays
  - [ ] Map tech stack arrays
  - [ ] Transform image URLs with urlFor()
  - [ ] Add video support
  - [ ] Test timeline ordering
  - [ ] Add loading state
- [ ] Update `EducationCard.tsx`:
  - [ ] Accept Sanity education interface
  - [ ] Render all fields dynamically
  - [ ] Add image optimization
  - [ ] Test with migrated data
- [ ] Update `JobCard.tsx`:
  - [ ] Accept Sanity job interface
  - [ ] Render responsibilities list
  - [ ] Render tech stack badges
  - [ ] Add current job indicator
  - [ ] Test with migrated data

### 4.4 Projects Component Update
- [ ] Update `ProjectsContent.tsx`:
  - [ ] Fetch projects data
  - [ ] Fetch categories data
  - [ ] Pass to child components
  - [ ] Add category filtering logic
  - [ ] Add loading state
- [ ] Update `ProjectCard.tsx`:
  - [ ] Accept Sanity project interface
  - [ ] Transform images array with urlFor()
  - [ ] Add image optimization (width, height, quality)
  - [ ] Update tech stack rendering
  - [ ] Update links to use data.links object
  - [ ] Add featured badge logic
  - [ ] Test with migrated projects
- [ ] Update `ProjectDetailModal.tsx`:
  - [ ] Accept Sanity project data
  - [ ] Render image carousel from data.images
  - [ ] Add video support from data.videos
  - [ ] Map tech stack badges
  - [ ] Add image zoom functionality
  - [ ] Test modal with full data
- [ ] Update `ImageCarousel.tsx`:
  - [ ] Accept images array from Sanity
  - [ ] Transform all image URLs
  - [ ] Add alt text support
  - [ ] Add caption support
  - [ ] Test carousel functionality

### 4.5 Tools Component Update
- [ ] Update `ToolsContent.tsx`:
  - [ ] Fetch tools data
  - [ ] Group tools by category
  - [ ] Pass to child components
  - [ ] Add loading state
- [ ] Update `ToolDetailSection.tsx`:
  - [ ] Accept Sanity tool interface
  - [ ] Render tool description
  - [ ] Transform images with urlFor()
  - [ ] Add video support
  - [ ] Render related projects section
  - [ ] Map project cards for related projects
  - [ ] Add website button link
  - [ ] Test with full tool data
- [ ] Update `ToolCarousel.tsx`:
  - [ ] Accept images array from Sanity
  - [ ] Support mixed image/video media
  - [ ] Transform all URLs
  - [ ] Test carousel functionality
- [ ] Update tool detail page `/tools/[tool]/page.tsx`:
  - [ ] Fetch tool by slug
  - [ ] Pass data to ToolDetailSection
  - [ ] Add 404 handling for invalid slugs
  - [ ] Test dynamic routing

### 4.6 Certifications Component Update
- [ ] Update `CertificationsContent.tsx`:
  - [ ] Fetch certifications data
  - [ ] Pass to child components
  - [ ] Add loading state
- [ ] Update `CertCarousel.tsx`:
  - [ ] Accept Sanity certifications array
  - [ ] Transform certificate images with urlFor()
  - [ ] Add image optimization
  - [ ] Test carousel with real certs
- [ ] Update `CertModal.tsx`:
  - [ ] Accept Sanity certification data
  - [ ] Render all cert details
  - [ ] Add verification link
  - [ ] Display credential ID
  - [ ] Show expiry date if exists
  - [ ] Add enlarged certificate image view
  - [ ] Test modal functionality

### 4.7 Contact Component Update
- [ ] Update `ContactContent.tsx`:
  - [ ] Fetch contact data
  - [ ] Use data.email for form submission
  - [ ] Display availability status
  - [ ] Show custom success message from data
  - [ ] Map social links dynamically
  - [ ] Add loading state
  - [ ] Test form integration

### 4.8 Global Components Update
- [ ] Update `page.tsx` (main):
  - [ ] Fetch all section data (parallel)
  - [ ] Pass data to each section component
  - [ ] Add global loading state
  - [ ] Add error boundaries per section
  - [ ] Implement data prefetching
  - [ ] Test full page rendering
- [ ] Update `layout.tsx`:
  - [ ] Fetch settings data
  - [ ] Use settings for metadata
  - [ ] Add SEO meta tags from settings
  - [ ] Add OG tags from settings
  - [ ] Add analytics scripts from settings
  - [ ] Test metadata rendering
- [ ] Update `sitemap.ts`:
  - [ ] Fetch projects from Sanity
  - [ ] Fetch tools from Sanity
  - [ ] Generate dynamic sitemap entries
  - [ ] Test sitemap generation

### 4.9 Loading States & Error Handling
- [ ] Create LoadingSkeleton components:
  - [ ] HeroSkeleton
  - [ ] AboutSkeleton
  - [ ] CareerSkeleton
  - [ ] ProjectsSkeleton
  - [ ] ToolsSkeleton
  - [ ] CertificationsSkeleton
  - [ ] ContactSkeleton
- [ ] Create error boundaries:
  - [ ] SectionErrorBoundary component
  - [ ] Global error handler
  - [ ] Fallback UI components
- [ ] Add retry logic for failed fetches
- [ ] Add offline detection
- [ ] Test error scenarios

### 4.10 Refactoring Verification
- [ ] Test each section independently:
  - [ ] Hero renders with Sanity data
  - [ ] About shows profile and skills
  - [ ] Career timeline displays correctly
  - [ ] Projects filter by category
  - [ ] Tools show related projects
  - [ ] Certifications carousel works
  - [ ] Contact form has correct settings
- [ ] Test all loading states
- [ ] Test all error states
- [ ] Verify no config file dependencies remain
- [ ] Run TypeScript compiler (no errors)
- [ ] Test in development mode
- [ ] Document breaking changes

**Estimated Time**: 5 days  
**Due Date**: March 21, 2026

---

## Phase 5: Media Optimization (Week 5) 🟡

### 5.1 Image Optimization Setup
- [ ] Create `lib/sanity.image.ts` utility:
  - [ ] Create getImageUrl() function
  - [ ] Add width/height parameters
  - [ ] Add quality parameter (90 default)
  - [ ] Add format parameter (webp default)
  - [ ] Add auto format detection
  - [ ] Add blur placeholder generation
  - [ ] Export all utilities
- [ ] Create responsive image helper:
  - [ ] Generate srcSet for multiple widths
  - [ ] Add sizes attribute helper
  - [ ] Support different breakpoints
  - [ ] Test with various screen sizes

### 5.2 Component Image Optimization
- [ ] Optimize AboutContent profile image:
  - [ ] Add multiple widths (400, 600, 800)
  - [ ] Add srcSet attribute
  - [ ] Add sizes attribute
  - [ ] Add blur placeholder
  - [ ] Test loading performance
- [ ] Optimize ProjectCard images:
  - [ ] Generate thumbnails (400w, 600w)
  - [ ] Add lazy loading
  - [ ] Add blur placeholder
  - [ ] Test grid performance
- [ ] Optimize ProjectDetailModal carousel:
  - [ ] Generate multiple sizes
  - [ ] Add progressive loading
  - [ ] Add zoom optimization
  - [ ] Test modal performance
- [ ] Optimize ToolDetailSection images:
  - [ ] Generate responsive sizes
  - [ ] Add lazy loading
  - [ ] Add blur placeholders
  - [ ] Test carousel performance
- [ ] Optimize CertCarousel images:
  - [ ] Generate certificate thumbnails
  - [ ] Add full-size image on click
  - [ ] Add progressive loading
  - [ ] Test carousel performance
- [ ] Optimize EducationCard images:
  - [ ] Generate timeline thumbnails
  - [ ] Add lazy loading
  - [ ] Test timeline performance
- [ ] Optimize JobCard images:
  - [ ] Generate project thumbnails
  - [ ] Add lazy loading
  - [ ] Test timeline performance

### 5.3 Video Optimization
- [ ] Create video utility `lib/sanity.video.ts`:
  - [ ] Add video URL transformer
  - [ ] Add poster image generation
  - [ ] Add video metadata extraction
  - [ ] Export utilities
- [ ] Optimize Hero section video (if any):
  - [ ] Generate poster image
  - [ ] Add lazy loading
  - [ ] Add autoplay with muted
  - [ ] Test performance
- [ ] Optimize Career section videos:
  - [ ] Add poster images
  - [ ] Add play on viewport
  - [ ] Add controls
  - [ ] Test loading
- [ ] Optimize Project videos:
  - [ ] Generate thumbnails
  - [ ] Add lazy loading
  - [ ] Add progressive streaming
  - [ ] Test in modal
- [ ] Optimize Tool demo videos:
  - [ ] Add poster images
  - [ ] Add lazy loading
  - [ ] Add quality selection
  - [ ] Test in carousel

### 5.4 CDN Configuration
- [ ] Configure Sanity Image CDN:
  - [ ] Enable CDN in production
  - [ ] Set cache headers
  - [ ] Configure image formats (webp, avif)
  - [ ] Test CDN delivery
- [ ] Configure Sanity Asset CDN:
  - [ ] Enable for videos
  - [ ] Set cache headers
  - [ ] Configure streaming options
  - [ ] Test video delivery
- [ ] Add custom CDN domain (optional):
  - [ ] Configure DNS CNAME
  - [ ] Update Sanity settings
  - [ ] Update image URL generator
  - [ ] Test custom domain

### 5.5 Performance Testing
- [ ] Run Lighthouse audits:
  - [ ] Homepage performance
  - [ ] Projects page performance
  - [ ] Tools page performance
  - [ ] Individual project performance
  - [ ] Individual tool performance
  - [ ] Target: 90+ score
- [ ] Test with slow 3G:
  - [ ] Check image loading
  - [ ] Check video loading
  - [ ] Verify progressive enhancement
  - [ ] Test offline mode
- [ ] Test with Fast 3G:
  - [ ] Verify quick load times
  - [ ] Check image quality
  - [ ] Test video streaming
- [ ] Test Core Web Vitals:
  - [ ] LCP < 2.5s (Largest Contentful Paint)
  - [ ] FID < 100ms (First Input Delay)
  - [ ] CLS < 0.1 (Cumulative Layout Shift)
  - [ ] Document all metrics

### 5.6 Lazy Loading Implementation
- [ ] Implement intersection observer:
  - [ ] Create useIntersectionObserver hook
  - [ ] Add to all image components
  - [ ] Add to all video components
  - [ ] Test viewport detection
- [ ] Add skeleton loaders:
  - [ ] ImageSkeleton component
  - [ ] VideoSkeleton component
  - [ ] Apply to all media
  - [ ] Test loading UX
- [ ] Configure loading priority:
  - [ ] Mark above-fold images as priority
  - [ ] Mark below-fold images as lazy
  - [ ] Configure preload hints
  - [ ] Test loading order

### 5.7 Caching Strategy
- [ ] Configure Next.js Image caching:
  - [ ] Set image cache duration
  - [ ] Configure stale-while-revalidate
  - [ ] Test cache headers
- [ ] Configure data caching:
  - [ ] Set Sanity CDN cache
  - [ ] Configure ISR revalidation
  - [ ] Add cache headers to API routes
  - [ ] Test data freshness
- [ ] Implement browser caching:
  - [ ] Configure service worker (if needed)
  - [ ] Add cache strategies
  - [ ] Test offline experience

### 5.8 Optimization Verification
- [ ] Compare before/after metrics:
  - [ ] Page load time improvement
  - [ ] Image load time improvement
  - [ ] Video load time improvement
  - [ ] Overall performance score
- [ ] Test on real devices:
  - [ ] iOS Safari
  - [ ] Android Chrome
  - [ ] Desktop Chrome
  - [ ] Desktop Firefox
  - [ ] Desktop Safari
- [ ] Verify image quality:
  - [ ] Check all images render correctly
  - [ ] Verify no quality degradation
  - [ ] Test on retina displays
  - [ ] Test on standard displays
- [ ] Document all optimizations:
  - [ ] List all image configs
  - [ ] List all video configs
  - [ ] Document CDN settings
  - [ ] Document cache strategies

**Estimated Time**: 5 days  
**Due Date**: March 28, 2026

---

## Phase 6: Real-time Preview & ISR (Week 6) 🟡

### 6.1 Webhook Setup
- [ ] Create webhook endpoint `/api/revalidate`:
  - [ ] Add POST handler
  - [ ] Verify REVALIDATION_SECRET
  - [ ] Extract document type from payload
  - [ ] Implement revalidatePath logic
  - [ ] Return success/error responses
  - [ ] Add logging
  - [ ] Test locally
- [ ] Configure Sanity webhook:
  - [ ] Go to Sanity project settings
  - [ ] Add webhook URL (production URL)
  - [ ] Set HTTP method to POST
  - [ ] Add GROQ filter for relevant documents
  - [ ] Add secret header
  - [ ] Enable webhook
  - [ ] Test with sample update

### 6.2 ISR Configuration
- [ ] Update page.tsx with ISR:
  - [ ] Convert to export const revalidate = 60
  - [ ] Move data fetching to server component
  - [ ] Add generateStaticParams if needed
  - [ ] Test ISR behavior
- [ ] Configure project pages:
  - [ ] Add ISR to /projects/[category]/page.tsx
  - [ ] Set revalidate duration
  - [ ] Add generateStaticParams for categories
  - [ ] Test category page generation
- [ ] Configure tool pages:
  - [ ] Add ISR to /tools/[tool]/page.tsx
  - [ ] Set revalidate duration
  - [ ] Add generateStaticParams for tools
  - [ ] Test tool page generation
- [ ] Configure individual routes:
  - [ ] Identify all dynamic routes
  - [ ] Add ISR to each
  - [ ] Test generation

### 6.3 Draft Mode Implementation
- [ ] Create draft route handler `/api/draft`:
  - [ ] Add GET handler
  - [ ] Verify authentication
  - [ ] Enable draft mode cookies
  - [ ] Redirect to preview page
  - [ ] Add disable draft endpoint
  - [ ] Test draft mode toggle
- [ ] Update Sanity client for drafts:
  - [ ] Create draftClient instance
  - [ ] Add perspective: 'previewDrafts'
  - [ ] Add token for draft access
  - [ ] Export draft client
- [ ] Update queries for draft mode:
  - [ ] Add draft document detection
  - [ ] Prioritize draft over published
  - [ ] Update all query functions
  - [ ] Test draft fetching
- [ ] Create draft indicator UI:
  - [ ] Add banner component
  - [ ] Show "Preview Mode" message
  - [ ] Add exit preview button
  - [ ] Style draft indicator
  - [ ] Test visibility

### 6.4 Sanity Studio Preview Integration
- [ ] Install preview plugin:
  - [ ] `npm install @sanity/preview-kit`
  - [ ] Configure in sanity.config.ts
  - [ ] Add preview URL template
- [ ] Configure preview button:
  - [ ] Add to document actions
  - [ ] Set preview URL pattern
  - [ ] Add resolve function for slugs
  - [ ] Test preview button
- [ ] Configure preview pane:
  - [ ] Add preview pane plugin
  - [ ] Configure iframe settings
  - [ ] Set preview URL
  - [ ] Test live preview in Studio

### 6.5 Real-time Updates
- [ ] Install Sanity real-time client:
  - [ ] `npm install @sanity/client`
  - [ ] Configure listen client
  - [ ] Add event listeners
- [ ] Implement live query hook:
  - [ ] Create useLiveQuery hook
  - [ ] Add document listeners
  - [ ] Handle updates
  - [ ] Add error handling
  - [ ] Test real-time updates
- [ ] Add to key components:
  - [ ] Hero section live updates
  - [ ] About section live updates
  - [ ] Projects live updates
  - [ ] Test edit → preview flow

### 6.6 On-Demand Revalidation
- [ ] Create revalidation utility:
  - [ ] Add function to revalidate by path
  - [ ] Add function to revalidate by tag
  - [ ] Export utilities
- [ ] Add to webhook handler:
  - [ ] Map document type to paths
  - [ ] Revalidate affected paths
  - [ ] Log revalidation results
  - [ ] Test with updates
- [ ] Test revalidation scenarios:
  - [ ] Update hero → revalidate homepage
  - [ ] Update project → revalidate project page
  - [ ] Update tool → revalidate tool page
  - [ ] Update settings → revalidate all pages
  - [ ] Verify changes appear

### 6.7 Preview & ISR Testing
- [ ] Test ISR behavior:
  - [ ] Verify pages regenerate after 60s
  - [ ] Test stale-while-revalidate
  - [ ] Verify new content appears
  - [ ] Check build times
- [ ] Test draft mode:
  - [ ] Enable draft mode from Studio
  - [ ] Verify draft content shows
  - [ ] Edit draft → see changes
  - [ ] Disable draft mode
  - [ ] Verify published content returns
- [ ] Test webhook revalidation:
  - [ ] Update document in Studio
  - [ ] Verify webhook fires
  - [ ] Check revalidation logs
  - [ ] Verify page updates immediately
  - [ ] Test with multiple document types
- [ ] Test real-time preview:
  - [ ] Open Studio preview
  - [ ] Edit document
  - [ ] Verify preview updates live
  - [ ] Test with different sections
  - [ ] Check performance

### 6.8 Edge Cases & Error Handling
- [ ] Handle failed revalidation:
  - [ ] Add retry logic
  - [ ] Log errors
  - [ ] Send notifications
  - [ ] Test error scenarios
- [ ] Handle deleted documents:
  - [ ] Detect deletions
  - [ ] Remove from cache
  - [ ] Redirect to 404
  - [ ] Test deletion flow
- [ ] Handle network errors:
  - [ ] Add timeout handling
  - [ ] Show error UI
  - [ ] Add retry button
  - [ ] Test with offline mode
- [ ] Handle concurrent updates:
  - [ ] Test multiple simultaneous edits
  - [ ] Verify data consistency
  - [ ] Check for race conditions
  - [ ] Document behavior

**Estimated Time**: 5 days  
**Due Date**: April 4, 2026

---

## Phase 7: Testing & QA (Week 7) 🟡

### 7.1 Data Validation Testing
- [ ] Test all GROQ queries:
  - [ ] Run each query in Sanity Vision
  - [ ] Verify correct data returned
  - [ ] Test with missing data
  - [ ] Test with empty arrays
  - [ ] Document edge cases
- [ ] Test data transformations:
  - [ ] Image URL generation
  - [ ] Video URL generation
  - [ ] Date formatting
  - [ ] Reference resolution
  - [ ] Test all helpers
- [ ] Test TypeScript types:
  - [ ] Verify all interfaces match data
  - [ ] Check for type errors
  - [ ] Test optional fields
  - [ ] Validate enum values
  - [ ] Fix any type issues

### 7.2 Component Testing
- [ ] Test Hero section:
  - [ ] Verify name displays
  - [ ] Check titles animation
  - [ ] Test terminal commands
  - [ ] Test resume download
  - [ ] Check responsive layout
- [ ] Test About section:
  - [ ] Verify profile image loads
  - [ ] Check bio rich text
  - [ ] Test skills display
  - [ ] Test social links
  - [ ] Check terminal animation
- [ ] Test Career section:
  - [ ] Verify timeline order
  - [ ] Test education cards
  - [ ] Test job cards
  - [ ] Check date formatting
  - [ ] Test media loading
- [ ] Test Projects section:
  - [ ] Test category filtering
  - [ ] Verify project cards
  - [ ] Test project modal
  - [ ] Check image carousel
  - [ ] Test links (GitHub, live, demo)
- [ ] Test Tools section:
  - [ ] Test category grouping
  - [ ] Verify tool cards
  - [ ] Test tool detail page
  - [ ] Check related projects
  - [ ] Test media carousel
- [ ] Test Certifications section:
  - [ ] Verify cert carousel
  - [ ] Test cert modal
  - [ ] Check certificate images
  - [ ] Test verification links
  - [ ] Verify date sorting
- [ ] Test Contact section:
  - [ ] Test form submission
  - [ ] Verify email format
  - [ ] Check success message
  - [ ] Test social links
  - [ ] Test validation

### 7.3 Cross-Browser Testing
- [ ] Test on Chrome (Desktop):
  - [ ] Windows 11
  - [ ] macOS
  - [ ] Verify all features
  - [ ] Check performance
- [ ] Test on Firefox (Desktop):
  - [ ] Windows 11
  - [ ] macOS
  - [ ] Verify all features
  - [ ] Check performance
- [ ] Test on Safari (Desktop):
  - [ ] macOS
  - [ ] Verify all features
  - [ ] Check WebKit quirks
  - [ ] Test video playback
- [ ] Test on Edge (Desktop):
  - [ ] Windows 11
  - [ ] Verify all features
  - [ ] Check Chromium compatibility
- [ ] Test on mobile browsers:
  - [ ] iOS Safari
  - [ ] Android Chrome
  - [ ] Check touch interactions
  - [ ] Test car dashboard scrollbar
  - [ ] Verify responsive images

### 7.4 Mobile Responsiveness Testing
- [ ] Test breakpoints:
  - [ ] 320px (small mobile)
  - [ ] 375px (iPhone SE)
  - [ ] 390px (iPhone 12/13)
  - [ ] 428px (iPhone 14 Pro Max)
  - [ ] 768px (tablet portrait)
  - [ ] 1024px (tablet landscape)
  - [ ] 1280px (small laptop)
  - [ ] 1920px (desktop)
- [ ] Test scroll behavior:
  - [ ] Native scroll works
  - [ ] Car dashboard meter visible
  - [ ] Section navigation works
  - [ ] Smooth scrolling
  - [ ] No scroll jank
- [ ] Test touch interactions:
  - [ ] Tap targets (44x44px min)
  - [ ] Swipe gestures
  - [ ] Pinch zoom (images)
  - [ ] Scroll momentum
- [ ] Test orientation changes:
  - [ ] Portrait to landscape
  - [ ] Layout adjusts
  - [ ] Content reflows
  - [ ] No broken layouts

### 7.5 Performance Testing
- [ ] Run Lighthouse audits:
  - [ ] Homepage: Target 90+
  - [ ] About page: Target 90+
  - [ ] Projects page: Target 85+
  - [ ] Tools page: Target 85+
  - [ ] Individual pages: Target 90+
- [ ] Test Core Web Vitals:
  - [ ] LCP: < 2.5s ✅
  - [ ] FID: < 100ms ✅
  - [ ] CLS: < 0.1 ✅
  - [ ] TTFB: < 800ms ✅
  - [ ] INP: < 200ms ✅
- [ ] Test with slow connections:
  - [ ] Slow 3G
  - [ ] Fast 3G
  - [ ] 4G
  - [ ] Verify progressive loading
- [ ] Test frame rate:
  - [ ] Monitor FPS during scroll
  - [ ] Target: 60 FPS maintained ✅
  - [ ] Check car dashboard animations
  - [ ] Test 3D scenes (if any)
- [ ] Test memory usage:
  - [ ] Monitor heap size
  - [ ] Check for memory leaks
  - [ ] Test long scroll sessions
  - [ ] Verify cleanup on unmount

### 7.6 SEO Validation
- [ ] Test metadata:
  - [ ] Title tags (all pages)
  - [ ] Meta descriptions (all pages)
  - [ ] OG tags (all pages)
  - [ ] Twitter cards (all pages)
  - [ ] Canonical URLs
- [ ] Test structured data:
  - [ ] Person schema
  - [ ] Organization schema
  - [ ] WebSite schema
  - [ ] BreadcrumbList schema
  - [ ] Validate with Google's tool
- [ ] Test sitemap:
  - [ ] Verify sitemap.xml generates
  - [ ] All pages included
  - [ ] Valid XML format
  - [ ] Submit to Google Search Console
- [ ] Test robots.txt:
  - [ ] Verify file exists
  - [ ] Check crawl directives
  - [ ] Test with Google's tool
- [ ] Test page indexing:
  - [ ] Request indexing in GSC
  - [ ] Verify no index blocks
  - [ ] Check for duplicate content
  - [ ] Monitor indexing status

### 7.7 Accessibility Audit
- [ ] Run automated tests:
  - [ ] axe DevTools
  - [ ] WAVE tool
  - [ ] Lighthouse accessibility
  - [ ] Target: 95+ score
- [ ] Test keyboard navigation:
  - [ ] Tab through all elements
  - [ ] Focus indicators visible
  - [ ] Logical tab order
  - [ ] Escape closes modals
  - [ ] Enter activates buttons
- [ ] Test screen reader:
  - [ ] NVDA (Windows)
  - [ ] JAWS (Windows)
  - [ ] VoiceOver (macOS/iOS)
  - [ ] Verify all content readable
  - [ ] Check ARIA labels
  - [ ] Test image alt text
- [ ] Test color contrast:
  - [ ] Text on backgrounds: 4.5:1 min
  - [ ] Large text: 3:1 min
  - [ ] Dark red on black: verify contrast
  - [ ] Button text: check contrast
  - [ ] Use contrast checker tools
- [ ] Test with zoom:
  - [ ] 200% zoom
  - [ ] 300% zoom
  - [ ] No horizontal scroll
  - [ ] No content cut off
  - [ ] Layout remains functional

### 7.8 Error Handling Testing
- [ ] Test network errors:
  - [ ] Disconnect internet
  - [ ] Verify error messages
  - [ ] Test retry functionality
  - [ ] Check offline UI
- [ ] Test missing data:
  - [ ] Empty arrays
  - [ ] Null values
  - [ ] Missing images
  - [ ] Missing references
  - [ ] Verify graceful fallbacks
- [ ] Test invalid data:
  - [ ] Malformed dates
  - [ ] Invalid URLs
  - [ ] Wrong data types
  - [ ] Verify error boundaries
- [ ] Test API failures:
  - [ ] 404 responses
  - [ ] 500 errors
  - [ ] Timeout scenarios
  - [ ] Rate limiting
  - [ ] Check error logging

### 7.9 Integration Testing
- [ ] Test Studio → Website flow:
  - [ ] Create new project in Studio
  - [ ] Verify webhook fires
  - [ ] Check revalidation
  - [ ] Verify appears on website
  - [ ] Test entire flow
- [ ] Test update flow:
  - [ ] Edit existing document
  - [ ] Save changes
  - [ ] Verify webhook
  - [ ] Check page updates
  - [ ] Test with multiple edits
- [ ] Test delete flow:
  - [ ] Delete document in Studio
  - [ ] Verify removal from website
  - [ ] Check 404 handling
  - [ ] Test related content updates
- [ ] Test draft → publish flow:
  - [ ] Create draft in Studio
  - [ ] Verify not live
  - [ ] Publish document
  - [ ] Verify appears live
  - [ ] Check timing

### 7.10 Final QA Checklist
- [ ] All sections display correctly
- [ ] All images load and optimize
- [ ] All videos play correctly
- [ ] All links work (internal and external)
- [ ] All forms submit correctly
- [ ] All animations smooth (60 FPS)
- [ ] All data from Sanity displays
- [ ] All loading states work
- [ ] All error states work
- [ ] Car dashboard scroll meter functional
- [ ] Section navigation works
- [ ] Dark red theme applied consistently
- [ ] Typography (TechHeadlines + MaterialTheories) correct
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] No accessibility violations
- [ ] No performance regressions
- [ ] SEO metadata complete
- [ ] Responsive on all devices
- [ ] Cross-browser compatible

**Estimated Time**: 5 days  
**Due Date**: April 11, 2026

---

## Phase 8: Deployment & Documentation (Week 8) 🟡

### 8.1 Production Environment Setup
- [ ] Configure production Sanity project:
  - [ ] Create production dataset
  - [ ] Set up CORS for production domain
  - [ ] Configure API tokens
  - [ ] Set up webhook for production
  - [ ] Document all settings
- [ ] Configure production environment variables:
  - [ ] NEXT_PUBLIC_SANITY_PROJECT_ID
  - [ ] NEXT_PUBLIC_SANITY_DATASET
  - [ ] SANITY_API_TOKEN
  - [ ] REVALIDATION_SECRET
  - [ ] Google Analytics ID
  - [ ] Other analytics IDs
  - [ ] Store securely in Vercel/hosting platform
- [ ] Test Studio in production:
  - [ ] Deploy Studio: `sanity deploy`
  - [ ] Test login
  - [ ] Test all schemas
  - [ ] Test media uploads
  - [ ] Verify CORS settings

### 8.2 Next.js Deployment
- [ ] Prepare Next.js for production:
  - [ ] Run production build: `npm run build`
  - [ ] Check build output
  - [ ] Verify no errors
  - [ ] Test production mode locally: `npm run start`
  - [ ] Check bundle size
  - [ ] Optimize if needed
- [ ] Deploy to Vercel (or hosting platform):
  - [ ] Connect GitHub repository
  - [ ] Configure build settings
  - [ ] Add environment variables
  - [ ] Set up custom domain
  - [ ] Configure DNS
  - [ ] Deploy production
  - [ ] Verify deployment successful
- [ ] Configure production domain:
  - [ ] Set up SSL certificate
  - [ ] Configure redirects (www → non-www)
  - [ ] Set up 404 page
  - [ ] Test domain access
  - [ ] Update Sanity CORS
  - [ ] Update webhook URL

### 8.3 Post-Deployment Testing
- [ ] Test production website:
  - [ ] All pages load
  - [ ] All images display
  - [ ] All videos play
  - [ ] All forms work
  - [ ] All links work
  - [ ] SSL certificate valid
- [ ] Test Sanity integration:
  - [ ] Update document in Studio
  - [ ] Verify webhook fires
  - [ ] Check revalidation
  - [ ] Verify changes appear
  - [ ] Test with multiple updates
- [ ] Test performance:
  - [ ] Run Lighthouse on production
  - [ ] Verify Core Web Vitals
  - [ ] Check load times
  - [ ] Monitor FPS
  - [ ] Test on slow connections
- [ ] Verify SEO:
  - [ ] Check meta tags
  - [ ] Verify OG images
  - [ ] Test structured data
  - [ ] Submit sitemap to Google
  - [ ] Test in Google Search Console

### 8.4 Monitoring & Analytics Setup
- [ ] Set up error monitoring:
  - [ ] Configure Sentry (or error tracking)
  - [ ] Add error boundaries
  - [ ] Test error reporting
  - [ ] Set up alerts
- [ ] Set up performance monitoring:
  - [ ] Configure Vercel Analytics
  - [ ] Set up Web Vitals tracking
  - [ ] Monitor build times
  - [ ] Set up alerts for degradation
- [ ] Set up Google Analytics:
  - [ ] Verify GA4 tracking
  - [ ] Configure events
  - [ ] Set up goals
  - [ ] Test tracking
- [ ] Set up uptime monitoring:
  - [ ] Configure uptime service
  - [ ] Set up alerts
  - [ ] Monitor API endpoints
  - [ ] Test notifications

### 8.5 Content Editor Documentation
- [ ] Create CMS User Guide:
  - [ ] Studio login instructions
  - [ ] Navigation overview
  - [ ] Schema explanations
  - [ ] How to create documents
  - [ ] How to edit documents
  - [ ] How to upload media
  - [ ] How to publish/unpublish
  - [ ] How to use preview
  - [ ] Best practices
  - [ ] Common issues & solutions
- [ ] Create video tutorials:
  - [ ] Studio tour (5 min)
  - [ ] Adding a new project (3 min)
  - [ ] Adding a new tool (3 min)
  - [ ] Updating About section (3 min)
  - [ ] Managing certifications (3 min)
  - [ ] Image upload best practices (3 min)
  - [ ] Using draft mode (3 min)
- [ ] Create quick reference cards:
  - [ ] Image size guidelines
  - [ ] Video format requirements
  - [ ] Character limits
  - [ ] Required vs optional fields
  - [ ] Schema relationships diagram
- [ ] Schedule training session:
  - [ ] Walk through Studio
  - [ ] Demonstrate editing
  - [ ] Answer questions
  - [ ] Provide hands-on practice
  - [ ] Share documentation

### 8.6 Technical Documentation
- [ ] Create Developer Guide:
  - [ ] Architecture overview
  - [ ] Folder structure
  - [ ] Schema documentation
  - [ ] GROQ query reference
  - [ ] API documentation
  - [ ] Component structure
  - [ ] Data flow diagrams
  - [ ] Deployment process
  - [ ] Environment variables
- [ ] Document maintenance tasks:
  - [ ] How to add new schema
  - [ ] How to modify queries
  - [ ] How to update components
  - [ ] How to test changes
  - [ ] How to deploy updates
  - [ ] Backup procedures
  - [ ] Rollback procedures
- [ ] Create troubleshooting guide:
  - [ ] Common errors
  - [ ] Debug procedures
  - [ ] Log locations
  - [ ] Support contacts
  - [ ] FAQ section
- [ ] Update README files:
  - [ ] portfolio_cms/README.md
  - [ ] portfolio/site/README.md
  - [ ] Install instructions
  - [ ] Development setup
  - [ ] Build instructions
  - [ ] Deployment steps

### 8.7 Backup & Recovery
- [ ] Set up Sanity backups:
  - [ ] Configure automated backups
  - [ ] Set backup frequency (daily)
  - [ ] Test backup restoration
  - [ ] Document backup location
  - [ ] Create manual backup procedure
- [ ] Set up code backups:
  - [ ] Verify GitHub backups
  - [ ] Tag release version
  - [ ] Create deployment branch
  - [ ] Document rollback procedure
- [ ] Create disaster recovery plan:
  - [ ] Identify critical systems
  - [ ] Document recovery steps
  - [ ] List emergency contacts
  - [ ] Test recovery procedure
  - [ ] Set recovery time objectives

### 8.8 Go-Live Checklist
- [ ] Pre-launch checks:
  - [ ] All content migrated
  - [ ] All images optimized
  - [ ] All links working
  - [ ] SEO configured
  - [ ] Analytics tracking
  - [ ] Error monitoring active
  - [ ] SSL certificate valid
  - [ ] Performance targets met
  - [ ] Accessibility standards met
  - [ ] Cross-browser tested
  - [ ] Mobile responsive
- [ ] Launch tasks:
  - [ ] Update DNS records
  - [ ] Set up email forwarding
  - [ ] Submit sitemap to search engines
  - [ ] Announce on social media
  - [ ] Monitor for issues
  - [ ] Check analytics tracking
  - [ ] Verify forms working
  - [ ] Test from different locations
- [ ] Post-launch monitoring:
  - [ ] Monitor error logs (24h)
  - [ ] Check performance metrics (1 week)
  - [ ] Review analytics data (1 week)
  - [ ] Gather user feedback
  - [ ] Address any issues
  - [ ] Document lessons learned

### 8.9 Handoff & Training
- [ ] Conduct handoff meeting:
  - [ ] Present final system
  - [ ] Walk through documentation
  - [ ] Demonstrate workflows
  - [ ] Answer questions
  - [ ] Provide access credentials
- [ ] Schedule follow-up sessions:
  - [ ] Week 1: Check-in
  - [ ] Week 2: Advanced features
  - [ ] Month 1: Review and Q&A
  - [ ] Month 3: Final review
- [ ] Provide ongoing support plan:
  - [ ] Support hours
  - [ ] Response time SLA
  - [ ] Escalation procedures
  - [ ] Maintenance schedule
  - [ ] Update procedures

### 8.10 Project Closeout
- [ ] Complete final deliverables:
  - [ ] All documentation
  - [ ] All source code
  - [ ] All credentials
  - [ ] All training materials
  - [ ] All test reports
- [ ] Archive project files:
  - [ ] Code repository
  - [ ] Documentation
  - [ ] Design files
  - [ ] Meeting notes
  - [ ] Test results
- [ ] Conduct retrospective:
  - [ ] What went well
  - [ ] What could improve
  - [ ] Lessons learned
  - [ ] Best practices identified
  - [ ] Document for future projects
- [ ] Celebrate launch! 🎉
  - [ ] Team recognition
  - [ ] Success metrics review
  - [ ] Portfolio update
  - [ ] Case study creation

**Estimated Time**: 5 days  
**Due Date**: April 18, 2026

---

## Maintenance & Support (Ongoing)

### Monthly Tasks
- [ ] Review analytics data
- [ ] Check error logs
- [ ] Monitor performance metrics
- [ ] Update content as needed
- [ ] Review backups
- [ ] Check security updates
- [ ] Test critical paths
- [ ] Update documentation

### Quarterly Tasks
- [ ] Security audit
- [ ] Performance review
- [ ] Dependency updates
- [ ] Schema optimizations
- [ ] Content review
- [ ] User feedback analysis
- [ ] Documentation updates
- [ ] Training refresher

### Annual Tasks
- [ ] Comprehensive security audit
- [ ] Full performance optimization
- [ ] Major version upgrades
- [ ] Content strategy review
- [ ] Analytics review
- [ ] Disaster recovery test
- [ ] Documentation overhaul
- [ ] Feature planning

---

## Success Criteria

### Technical Metrics
- ✅ Lighthouse Performance Score: 90+
- ✅ Core Web Vitals: All green
- ✅ 60 FPS scroll maintained
- ✅ Accessibility Score: 95+
- ✅ SEO Score: 95+
- ✅ Mobile-First Design: 100% responsive
- ✅ Zero TypeScript errors
- ✅ Zero console errors in production
- ✅ < 3s page load time
- ✅ < 1s image load time

### Functional Requirements
- ✅ All 7 sections editable via CMS
- ✅ Real-time preview working
- ✅ ISR revalidation < 60s
- ✅ Image optimization active
- ✅ Video streaming working
- ✅ All forms functional
- ✅ All links working
- ✅ Search engine indexed
- ✅ Analytics tracking
- ✅ Error monitoring active

### User Experience
- ✅ Intuitive CMS interface
- ✅ Easy content updates
- ✅ Fast page loads
- ✅ Smooth animations
- ✅ Responsive design
- ✅ Accessible to all users
- ✅ Cross-browser compatible
- ✅ Mobile-optimized
- ✅ Professional appearance
- ✅ Clear documentation

---

## Notes & References

### Important Links
- **Sanity Studio**: [URL after deployment]
- **Production Website**: [URL after deployment]
- **GitHub Repository**: https://github.com/AlMahmud22/portfolio_cms
- **Documentation**: plan.md in this directory
- **Figma Design**: [Link if applicable]

### Key Contacts
- **Developer**: SAM Al Mahmud
- **GitHub**: @AlMahmud22
- **Email**: [Your email]

### Resources
- Sanity Documentation: https://www.sanity.io/docs
- Next.js Documentation: https://nextjs.org/docs
- Vercel Documentation: https://vercel.com/docs
- GROQ Cheat Sheet: https://www.sanity.io/docs/query-cheat-sheet

---

**Last Updated**: February 22, 2026  
**Status**: Ready to begin Phase 1  
**Next Action**: Initialize Sanity project

---

## Quick Start Commands

```bash
# Initialize Sanity in portfolio_cms/
cd portfolio_cms
npm create sanity@latest

# Install Next.js dependencies
cd ../portfolio/site
npm install @sanity/client @sanity/image-url @portabletext/react

# Run Sanity Studio
cd ../../portfolio_cms/sanity
npm run dev

# Run Next.js dev server
cd ../../portfolio/site
npm run dev

# Deploy Sanity Studio
cd ../../portfolio_cms/sanity
sanity deploy
```

---

**Ready to transform your portfolio with Sanity CMS! 🚀**
