# Portfolio CMS Plan - Sanity Integration

**Last Updated**: February 22, 2026  
**Portfolio Version**: v2.0 (Dark Red Theme with Car Dashboard Navigation)  
**CMS Platform**: Sanity.io

---

## Table of Contents
1. [Overview](#overview)
2. [Content Architecture](#content-architecture)
3. [Sanity Schema Definitions](#sanity-schema-definitions)
4. [API Integration Strategy](#api-integration-strategy)
5. [Implementation Phases](#implementation-phases)
6. [Folder Structure](#folder-structure)
7. [Common Patterns](#common-patterns)

---

## Overview

### Purpose
This CMS will enable dynamic content management for the portfolio website using Sanity.io. All sections (Hero, About, Career, Projects, Tools, Certifications, Contact) will be editable through a user-friendly admin interface.

### Key Features
- ✅ **Content Types**: 8 main schemas (Hero, About, Career, Projects, Tools, Certifications, Contact, Settings)
- ✅ **Media Management**: Images, videos, and 3D model references
- ✅ **Relationships**: Tools ↔ Projects, Categories ↔ Items
- ✅ **Versioning**: Draft and published states
- ✅ **SEO**: Meta tags, Open Graph, structured data
- ✅ **Real-time Preview**: Live preview of changes
- ✅ **Image Optimization**: Automatic image transformations with Sanity Image API

---

## Content Architecture

### Portfolio Sections Breakdown

```
Portfolio Website
│
├── 1. Hero Section
│   ├── Name & Title
│   ├── Terminal Commands (array)
│   ├── Resume File
│   └── Scroll Hint Text
│
├── 2. About Section
│   ├── Profile Image
│   ├── Bio Text (rich text)
│   ├── Skills (Frontend, Backend, DevOps, Networking)
│   ├── Location & Stats
│   ├── Terminal Commands
│   └── Social Links
│
├── 3. Career Section
│   ├── Education Timeline
│   │   ├── Level (HSC, BSC, MSC, PHD)
│   │   ├── Institution & Course
│   │   ├── Date Range & Location
│   │   ├── Description
│   │   └── Media (images, videos)
│   └── Job Timeline
│       ├── Job Title & Company
│       ├── Date Range & Location
│       ├── Description & Responsibilities
│       ├── Tech Stack
│       └── Media (images, videos)
│
├── 4. Projects Section
│   ├── Project Categories
│   │   ├── Desktop Applications
│   │   ├── Web Development
│   │   ├── Systems Development
│   │   └── Networking Projects
│   └── Projects
│       ├── Title & Description
│       ├── Category Reference
│       ├── Tech Stack
│       ├── Media Gallery (images, videos)
│       ├── Links (GitHub, Live, Demo)
│       └── Featured Flag
│
├── 5. Tools Section
│   ├── Tool Categories (3D, Video, Design, Development, Networking)
│   └── Tools
│       ├── Name & Description
│       ├── Category
│       ├── 3D Model Reference
│       ├── Media Gallery
│       ├── Related Projects (references)
│       ├── Website URL
│       └── Slug
│
├── 6. Certifications Section
│   └── Certifications
│       ├── Name & Issuer
│       ├── Date Issued
│       ├── Description
│       ├── Certificate Image
│       ├── Verification URL
│       └── Credential ID
│
├── 7. Contact Section
│   ├── Contact Email
│   ├── Social Links
│   ├── Form Success Message
│   └── Availability Status
│
└── 8. Global Settings
    ├── Site Metadata (title, description)
    ├── SEO Settings
    ├── Analytics IDs
    ├── Social Media Handles
    └── Theme Settings
```

---

## Sanity Schema Definitions

### 1. Hero Schema (`hero.ts`)

```typescript
// schemas/hero.ts
export default {
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    {
      name: 'fullName',
      title: 'Full Name',
      type: 'object',
      fields: [
        {
          name: 'firstName',
          title: 'First Name',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'lastName',
          title: 'Last Name',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
      ],
    },
    {
      name: 'titles',
      title: 'Professional Titles',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g., "Full-Stack Developer", "Network Engineer", "Problem Solver"',
      validation: (Rule) => Rule.required().min(1).max(4),
    },
    {
      name: 'terminalCommands',
      title: 'Terminal Code Block',
      type: 'object',
      fields: [
        {
          name: 'objectName',
          title: 'Object Name',
          type: 'string',
          initialValue: 'developer',
        },
        {
          name: 'properties',
          title: 'Properties',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'key', type: 'string', title: 'Key' },
                { name: 'value', type: 'string', title: 'Value' },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'resumeFile',
      title: 'Resume/CV File',
      type: 'file',
      options: {
        accept: '.pdf,.doc,.docx',
      },
    },
    {
      name: 'scrollHintText',
      title: 'Scroll Hint Text',
      type: 'string',
      initialValue: 'Scroll to explore',
    },
    {
      name: 'heroImageAlt',
      title: 'Hero Section Alternative Text',
      type: 'string',
      description: 'For accessibility and SEO',
    },
  ],
  preview: {
    select: {
      firstName: 'fullName.firstName',
      lastName: 'fullName.lastName',
      title: 'titles.0',
    },
    prepare({ firstName, lastName, title }) {
      return {
        title: `${firstName} ${lastName}`,
        subtitle: title,
      };
    },
  },
}
```

### 2. About Schema (`about.ts`)

```typescript
// schemas/about.ts
export default {
  name: 'about',
  title: 'About Section',
  type: 'document',
  fields: [
    {
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          validation: (Rule) => Rule.required(),
        },
      ],
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'External Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                ],
              },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'quickStats',
      title: 'Quick Stats',
      type: 'object',
      fields: [
        { name: 'location', type: 'string', title: 'Location' },
        { name: 'university', type: 'string', title: 'University' },
        { name: 'yearsExperience', type: 'string', title: 'Years Experience' },
        { name: 'projectsCompleted', type: 'string', title: 'Projects Completed' },
      ],
    },
    {
      name: 'skills',
      title: 'Skills',
      type: 'object',
      fields: [
        {
          name: 'frontend',
          title: 'Frontend Skills',
          type: 'array',
          of: [{ type: 'string' }],
        },
        {
          name: 'backend',
          title: 'Backend Skills',
          type: 'array',
          of: [{ type: 'string' }],
        },
        {
          name: 'devops',
          title: 'DevOps & Tools',
          type: 'array',
          of: [{ type: 'string' }],
        },
        {
          name: 'networking',
          title: 'Networking Skills',
          type: 'array',
          of: [{ type: 'string' }],
        },
      ],
    },
    {
      name: 'terminalCommands',
      title: 'Terminal Commands',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'command', type: 'string', title: 'Command' },
            {
              name: 'output',
              type: 'array',
              of: [{ type: 'string' }],
              title: 'Output Lines',
            },
          ],
        },
      ],
    },
    {
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'socialLink' }] }],
    },
  ],
  preview: {
    select: {
      location: 'quickStats.location',
      media: 'profileImage',
    },
    prepare({ location, media }) {
      return {
        title: 'About Section',
        subtitle: location,
        media,
      };
    },
  },
}
```

### 3. Career Schema - Education (`education.ts`)

```typescript
// schemas/education.ts
export default {
  name: 'education',
  title: 'Education',
  type: 'document',
  fields: [
    {
      name: 'level',
      title: 'Education Level',
      type: 'string',
      options: {
        list: [
          { title: 'HSC', value: 'HSC' },
          { title: 'BSC', value: 'BSC' },
          { title: 'MSC', value: 'MSC' },
          { title: 'PHD', value: 'PHD' },
          { title: 'Other', value: 'Other' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'institution',
      title: 'Institution Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'course',
      title: 'Course/Degree Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'dateRange',
      title: 'Date Range',
      type: 'object',
      fields: [
        {
          name: 'start',
          type: 'date',
          title: 'Start Date',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'end',
          type: 'date',
          title: 'End Date (leave empty if ongoing)',
        },
      ],
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required().min(50).max(500),
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
      ],
    },
    {
      name: 'videos',
      title: 'Videos',
      type: 'array',
      of: [
        {
          type: 'file',
          options: {
            accept: 'video/*',
          },
        },
      ],
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first in timeline',
      validation: (Rule) => Rule.required().min(0),
    },
  ],
  orderings: [
    {
      title: 'Timeline Order',
      name: 'timelineOrder',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      institution: 'institution',
      level: 'level',
      course: 'course',
      media: 'images.0',
    },
    prepare({ institution, level, course, media }) {
      return {
        title: `${level} - ${institution}`,
        subtitle: course,
        media,
      };
    },
  },
}
```

### 4. Career Schema - Jobs (`job.ts`)

```typescript
// schemas/job.ts
export default {
  name: 'job',
  title: 'Job Experience',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Job Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'company',
      title: 'Company Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'dateRange',
      title: 'Date Range',
      type: 'object',
      fields: [
        {
          name: 'start',
          type: 'date',
          title: 'Start Date',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'end',
          type: 'date',
          title: 'End Date (leave empty if current)',
        },
        {
          name: 'current',
          type: 'boolean',
          title: 'Currently Working Here',
          initialValue: false,
        },
      ],
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Job Description',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required().min(50).max(500),
    },
    {
      name: 'responsibilities',
      title: 'Key Responsibilities',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of key responsibilities and achievements',
      validation: (Rule) => Rule.required().min(3),
    },
    {
      name: 'techStack',
      title: 'Technologies Used',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: 'images',
      title: 'Project Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    },
    {
      name: 'videos',
      title: 'Project Videos',
      type: 'array',
      of: [
        {
          type: 'file',
          options: {
            accept: 'video/*',
          },
        },
      ],
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first in timeline',
      validation: (Rule) => Rule.required().min(0),
    },
  ],
  orderings: [
    {
      title: 'Timeline Order',
      name: 'timelineOrder',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      company: 'company',
      current: 'dateRange.current',
      media: 'images.0',
    },
    prepare({ title, company, current, media }) {
      return {
        title: `${title} at ${company}`,
        subtitle: current ? 'Current Position' : 'Past Position',
        media,
      };
    },
  },
}
```

### 5. Projects Schema - Category (`projectCategory.ts`)

```typescript
// schemas/projectCategory.ts
export default {
  name: 'projectCategory',
  title: 'Project Category',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Category Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    },
    {
      name: 'icon3DPath',
      title: '3D Model Path',
      type: 'string',
      description: 'Path to 3D model file (e.g., /models/projects/laptop.glb)',
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    },
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'displayOrder',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
    },
  },
}
```

### 6. Projects Schema - Project (`project.ts`)

```typescript
// schemas/project.ts
export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required().min(100).max(1000),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'projectCategory' }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      description: 'Highlight this project on homepage',
      initialValue: false,
    },
    {
      name: 'techStack',
      title: 'Tech Stack',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Technologies and frameworks used',
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: 'images',
      title: 'Project Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: 'videos',
      title: 'Project Videos',
      type: 'array',
      of: [
        {
          type: 'file',
          options: {
            accept: 'video/*',
          },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Video Caption',
            },
          ],
        },
      ],
    },
    {
      name: 'links',
      title: 'Project Links',
      type: 'object',
      fields: [
        {
          name: 'github',
          type: 'url',
          title: 'GitHub Repository',
        },
        {
          name: 'live',
          type: 'url',
          title: 'Live Demo',
        },
        {
          name: 'demo',
          type: 'url',
          title: 'Demo Video',
        },
      ],
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      validation: (Rule) => Rule.required().min(0),
    },
    {
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'displayOrder',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Newest First',
      name: 'publishedDateDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category.name',
      media: 'images.0',
    },
    prepare({ title, category, media }) {
      return {
        title,
        subtitle: category,
        media,
      };
    },
  },
}
```

### 7. Tools Schema - Tool (`tool.ts`)

```typescript
// schemas/tool.ts
export default {
  name: 'tool',
  title: 'Tool',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Tool Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required().min(100).max(800),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: '3D Modeling', value: '3D' },
          { title: 'Video Editing', value: 'Video' },
          { title: 'Design', value: 'Design' },
          { title: 'Development', value: 'Development' },
          { title: 'Networking', value: 'Networking' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'icon3DPath',
      title: '3D Icon/Logo Path',
      type: 'string',
      description: 'Path to 3D model file (e.g., /models/tools/blender-logo.glb)',
    },
    {
      name: 'images',
      title: 'Screenshots & Samples',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.min(1),
    },
    {
      name: 'videos',
      title: 'Demo Videos',
      type: 'array',
      of: [
        {
          type: 'file',
          options: {
            accept: 'video/*',
          },
        },
      ],
    },
    {
      name: 'relatedProjects',
      title: 'Related Projects',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'project' }] }],
      description: 'Projects where this tool was used',
    },
    {
      name: 'website',
      title: 'Official Website',
      type: 'url',
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    },
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'displayOrder',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Category',
      name: 'category',
      by: [
        { field: 'category', direction: 'asc' },
        { field: 'name', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'name',
      category: 'category',
      media: 'images.0',
    },
    prepare({ title, category, media }) {
      return {
        title,
        subtitle: category,
        media,
      };
    },
  },
}
```

### 8. Certifications Schema (`certification.ts`)

```typescript
// schemas/certification.ts
export default {
  name: 'certification',
  title: 'Certification',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Certification Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'issuer',
      title: 'Issuing Organization',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'dateIssued',
      title: 'Date Issued',
      type: 'date',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'expiryDate',
      title: 'Expiry Date',
      type: 'date',
      description: 'Leave empty if it does not expire',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required().min(50).max(500),
    },
    {
      name: 'certificateImage',
      title: 'Certificate Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'verificationUrl',
      title: 'Verification URL',
      type: 'url',
      description: 'Link to verify the certificate',
    },
    {
      name: 'credentialId',
      title: 'Credential ID',
      type: 'string',
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    },
  ],
  orderings: [
    {
      title: 'Newest First',
      name: 'dateIssuedDesc',
      by: [{ field: 'dateIssued', direction: 'desc' }],
    },
    {
      title: 'Display Order',
      name: 'displayOrder',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      issuer: 'issuer',
      date: 'dateIssued',
      media: 'certificateImage',
    },
    prepare({ title, issuer, date, media }) {
      return {
        title,
        subtitle: `${issuer} - ${new Date(date).getFullYear()}`,
        media,
      };
    },
  },
}
```

### 9. Contact Schema (`contact.ts`)

```typescript
// schemas/contact.ts
export default {
  name: 'contact',
  title: 'Contact Settings',
  type: 'document',
  fields: [
    {
      name: 'email',
      title: 'Contact Email',
      type: 'email',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'availabilityStatus',
      title: 'Availability Status',
      type: 'string',
      options: {
        list: [
          { title: 'Available for work', value: 'available' },
          { title: 'Open to opportunities', value: 'open' },
          { title: 'Currently unavailable', value: 'unavailable' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'formSuccessMessage',
      title: 'Form Success Message',
      type: 'text',
      rows: 2,
      initialValue: 'Thank you for reaching out! I will get back to you soon.',
    },
    {
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'socialLink' }] }],
    },
  ],
  preview: {
    select: {
      email: 'email',
      status: 'availabilityStatus',
    },
    prepare({ email, status }) {
      return {
        title: 'Contact Settings',
        subtitle: `${email} - ${status}`,
      };
    },
  },
}
```

### 10. Social Link Schema (`socialLink.ts`)

```typescript
// schemas/socialLink.ts
export default {
  name: 'socialLink',
  title: 'Social Link',
  type: 'document',
  fields: [
    {
      name: 'platform',
      title: 'Platform Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'url',
      title: 'Profile URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
      description: 'Lucide React icon name (e.g., Github, Linkedin, Twitter, Mail)',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    },
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'displayOrder',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'platform',
      subtitle: 'url',
    },
  },
}
```

### 11. Global Settings Schema (`settings.ts`)

```typescript
// schemas/settings.ts
export default {
  name: 'settings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'siteDescription',
      title: 'Site Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(160),
    },
    {
      name: 'siteUrl',
      title: 'Site URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'logo',
      title: 'Site Logo',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
    },
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        {
          name: 'keywords',
          type: 'array',
          of: [{ type: 'string' }],
          title: 'Keywords',
        },
        {
          name: 'ogImage',
          type: 'image',
          title: 'Open Graph Image',
          description: 'Image for social media sharing (1200x630px recommended)',
        },
        {
          name: 'twitterHandle',
          type: 'string',
          title: 'Twitter Handle',
          description: '@username',
        },
      ],
    },
    {
      name: 'analytics',
      title: 'Analytics',
      type: 'object',
      fields: [
        {
          name: 'googleAnalyticsId',
          type: 'string',
          title: 'Google Analytics ID',
        },
        {
          name: 'googleTagManagerId',
          type: 'string',
          title: 'Google Tag Manager ID',
        },
      ],
    },
    {
      name: 'theme',
      title: 'Theme Settings',
      type: 'object',
      fields: [
        {
          name: 'primaryColor',
          type: 'string',
          title: 'Primary Color',
          description: 'Hex color code (e.g., #DC143C)',
        },
        {
          name: 'secondaryColor',
          type: 'string',
          title: 'Secondary Color',
        },
        {
          name: 'fontFamily',
          type: 'string',
          title: 'Font Family',
          options: {
            list: [
              { title: 'TechHeadlines', value: 'TechHeadlines' },
              { title: 'MaterialTheories', value: 'MaterialTheories' },
            ],
          },
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
      };
    },
  },
}
```

---

## API Integration Strategy

### Sanity Client Setup

```typescript
// lib/sanity.client.ts
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-02-22',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}
```

### GROQ Query Examples

```typescript
// lib/sanity.queries.ts

// Fetch Hero Section
export const heroQuery = `*[_type == "hero"][0]{
  fullName,
  titles,
  terminalCommands,
  "resumeUrl": resumeFile.asset->url,
  scrollHintText
}`

// Fetch About Section
export const aboutQuery = `*[_type == "about"][0]{
  "profileImageUrl": profileImage.asset->url,
  "profileImageAlt": profileImage.alt,
  bio,
  quickStats,
  skills,
  terminalCommands,
  socialLinks[]-> {
    platform,
    url,
    icon,
    order
  }
}`

// Fetch All Projects with Category
export const projectsQuery = `*[_type == "project"] | order(order asc) {
  _id,
  title,
  slug,
  description,
  category->{name, slug},
  featured,
  techStack,
  "images": images[]{
    "url": asset->url,
    alt,
    caption
  },
  "videos": videos[]{
    "url": asset->url,
    caption
  },
  links,
  publishedAt
}`

// Fetch Projects by Category
export const projectsByCategoryQuery = `*[_type == "project" && category->slug.current == $categorySlug] | order(order asc) {
  _id,
  title,
  slug,
  description,
  techStack,
  "images": images[]{
    "url": asset->url,
    alt
  },
  links,
  featured
}`

// Fetch All Tools with Related Projects
export const toolsQuery = `*[_type == "tool"] | order(order asc) {
  _id,
  name,
  slug,
  description,
  category,
  icon3DPath,
  "images": images[]{
    "url": asset->url,
    alt,
    caption
  },
  "videos": videos[]{
    "url": asset->url
  },
  relatedProjects[]->{
    _id,
    title,
    slug,
    "thumbnail": images[0].asset->url
  },
  website
}`

// Fetch Career Timeline (Education + Jobs)
export const careerQuery = `{
  "education": *[_type == "education"] | order(order asc) {
    _id,
    level,
    institution,
    course,
    dateRange,
    location,
    description,
    "images": images[]{
      "url": asset->url,
      alt
    }
  },
  "jobs": *[_type == "job"] | order(order asc) {
    _id,
    title,
    company,
    dateRange,
    location,
    description,
    responsibilities,
    techStack,
    "images": images[]{
      "url": asset->url,
      alt
    }
  }
}`

// Fetch Certifications
export const certificationsQuery = `*[_type == "certification"] | order(dateIssued desc) {
  _id,
  name,
  issuer,
  dateIssued,
  expiryDate,
  description,
  "certificateImageUrl": certificateImage.asset->url,
  "certificateImageAlt": certificateImage.alt,
  verificationUrl,
  credentialId
}`

// Fetch Contact Settings
export const contactQuery = `*[_type == "contact"][0]{
  email,
  availabilityStatus,
  formSuccessMessage,
  socialLinks[]-> {
    platform,
    url,
    icon,
    order
  }
}`

// Fetch Site Settings
export const settingsQuery = `*[_type == "settings"][0]{
  siteTitle,
  siteDescription,
  siteUrl,
  "logoUrl": logo.asset->url,
  "faviconUrl": favicon.asset->url,
  seo,
  analytics,
  theme
}`
```

### Data Fetching Functions

```typescript
// lib/sanity.api.ts
import { client } from './sanity.client'
import * as queries from './sanity.queries'

export async function getHeroData() {
  return await client.fetch(queries.heroQuery)
}

export async function getAboutData() {
  return await client.fetch(queries.aboutQuery)
}

export async function getProjectsData() {
  return await client.fetch(queries.projectsQuery)
}

export async function getProjectsByCategory(categorySlug: string) {
  return await client.fetch(queries.projectsByCategoryQuery, { categorySlug })
}

export async function getToolsData() {
  return await client.fetch(queries.toolsQuery)
}

export async function getCareerData() {
  return await client.fetch(queries.careerQuery)
}

export async function getCertificationsData() {
  return await client.fetch(queries.certificationsQuery)
}

export async function getContactData() {
  return await client.fetch(queries.contactQuery)
}

export async function getSettings() {
  return await client.fetch(queries.settingsQuery)
}
```

---

## Implementation Phases

### Phase 1: Sanity Studio Setup (Week 1)
- [ ] Initialize Sanity project (`npm create sanity@latest`)
- [ ] Configure project settings (dataset, API tokens)
- [ ] Create all schema files (11 schemas total)
- [ ] Test schemas in Sanity Studio
- [ ] Add sample data for testing
- [ ] Configure CORS for Next.js domain

### Phase 2: Next.js Integration (Week 2)
- [ ] Install Sanity client packages (`@sanity/client`, `@sanity/image-url`)
- [ ] Create Sanity client configuration
- [ ] Implement GROQ queries for all sections
- [ ] Create TypeScript interfaces matching schemas
- [ ] Build data fetching functions
- [ ] Test API endpoints with sample data

### Phase 3: Content Migration (Week 3)
- [ ] Migrate Hero section data
- [ ] Migrate About section (bio, skills, terminal commands)
- [ ] Migrate Career data (education + jobs with media)
- [ ] Migrate Projects (all categories + projects)
- [ ] Migrate Tools (all tools + relationships)
- [ ] Migrate Certifications
- [ ] Migrate Contact settings
- [ ] Migrate Global settings

### Phase 4: Component Refactoring (Week 4)
- [ ] Update `HeroContent.tsx` to use Sanity data
- [ ] Update `AboutContent.tsx` with dynamic content
- [ ] Update `CareerContent.tsx` (ParallaxTimeline with Sanity data)
- [ ] Update `ProjectsContent.tsx` and related components
- [ ] Update `ToolsContent.tsx` and tool detail pages
- [ ] Update `CertificationsContent.tsx`
- [ ] Update `ContactContent.tsx`
- [ ] Add loading states and error handling

### Phase 5: Media Optimization (Week 5)
- [ ] Implement Sanity Image API for optimized images
- [ ] Add responsive image srcsets
- [ ] Configure lazy loading for images
- [ ] Optimize video loading (progressive streaming)
- [ ] Test performance with Lighthouse
- [ ] Implement CDN caching strategies

### Phase 6: Real-time Preview & ISR (Week 6)
- [ ] Set up Sanity webhook for revalidation
- [ ] Implement Incremental Static Regeneration (ISR)
- [ ] Add draft mode for content preview
- [ ] Configure on-demand revalidation
- [ ] Test content updates with live preview
- [ ] Document content update workflow

### Phase 7: Testing & QA (Week 7)
- [ ] Test all GROQ queries
- [ ] Validate data fetching for all sections
- [ ] Test image optimization and loading
- [ ] Cross-browser testing
- [ ] Mobile responsiveness testing
- [ ] Performance testing (60 FPS maintained)
- [ ] SEO validation
- [ ] Accessibility audit

### Phase 8: Deployment & Documentation (Week 8)
- [ ] Deploy Sanity Studio to production
- [ ] Configure production environment variables
- [ ] Deploy Next.js app with Sanity integration
- [ ] Create content management guide for editors
- [ ] Document schema relationships
- [ ] Create video tutorials for content updates
- [ ] Final production testing

---

## Folder Structure

```
portfolio_cms/
├── sanity/
│   ├── schemas/
│   │   ├── index.ts                    # Schema registry
│   │   ├── hero.ts                     # Hero section schema
│   │   ├── about.ts                    # About section schema
│   │   ├── education.ts                # Education schema
│   │   ├── job.ts                      # Job experience schema
│   │   ├── projectCategory.ts          # Project category schema
│   │   ├── project.ts                  # Project schema
│   │   ├── tool.ts                     # Tool schema
│   │   ├── certification.ts            # Certification schema
│   │   ├── contact.ts                  # Contact settings schema
│   │   ├── socialLink.ts               # Social link schema
│   │   └── settings.ts                 # Global settings schema
│   ├── sanity.cli.ts                   # Sanity CLI config
│   ├── sanity.config.ts                # Studio configuration
│   └── package.json
├── lib/
│   ├── sanity.client.ts                # Sanity client setup
│   ├── sanity.queries.ts               # GROQ queries
│   ├── sanity.api.ts                   # API functions
│   └── sanity.types.ts                 # TypeScript types
├── .env.local                           # Environment variables
├── README.md                            # CMS documentation
└── plan.md                              # This file
```

---

## Common Patterns

### 1. Image Handling

```typescript
// Using Sanity Image URL Builder
import { urlFor } from '@/lib/sanity.client'

// In component
<Image
  src={urlFor(image).width(800).height(600).url()}
  alt={image.alt}
  width={800}
  height={600}
  quality={90}
/>

// Responsive images
const imageSrcSet = [400, 800, 1200].map(width => 
  `${urlFor(image).width(width).url()} ${width}w`
).join(', ')
```

### 2. Date Formatting

```typescript
// Format date range
function formatDateRange(start: string, end?: string, current?: boolean) {
  const startDate = new Date(start).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short' 
  })
  
  if (current) return `${startDate} - Present`
  if (!end) return startDate
  
  const endDate = new Date(end).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short' 
  })
  
  return `${startDate} - ${endDate}`
}
```

### 3. Rich Text Rendering

```typescript
// Using @portabletext/react for bio
import { PortableText } from '@portabletext/react'

const components = {
  block: {
    h3: ({children}) => <h3 className="text-2xl font-bold">{children}</h3>,
    normal: ({children}) => <p className="text-gray-300">{children}</p>,
  },
  marks: {
    link: ({value, children}) => (
      <a href={value.href} target="_blank" rel="noopener" className="text-red-600">
        {children}
      </a>
    ),
  },
}

// In component
<PortableText value={about.bio} components={components} />
```

### 4. Reference Resolution

```typescript
// Resolving project references in tools
const toolWithProjects = await client.fetch(`
  *[_type == "tool" && slug.current == $slug][0]{
    ...,
    relatedProjects[]->{
      _id,
      title,
      slug,
      "thumbnail": images[0].asset->url,
      techStack
    }
  }
`, { slug: toolSlug })
```

---

## Environment Variables

```env
# .env.local

# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token_with_read_permissions

# Sanity Studio URL (for preview)
NEXT_PUBLIC_SANITY_STUDIO_URL=http://localhost:3333

# Next.js Revalidation Secret
REVALIDATION_SECRET=your_random_secret_string
```

---

## Key Considerations

### Performance
- Use Sanity CDN for production (`useCdn: true`)
- Implement ISR with 60-second revalidation
- Optimize images with Sanity Image API
- Use GROQ projections to fetch only needed fields
- Implement proper loading states

### SEO
- Generate sitemap.xml from Sanity data
- Implement structured data (JSON-LD)
- Optimize meta tags dynamically
- Use proper heading hierarchy

### Content Workflow
- Use draft/published states
- Implement content versioning
- Add validation rules for required fields
- Create custom input components for complex fields

### Security
- Restrict API token permissions
- Use read-only tokens for client-side
- Implement CORS properly
- Sanitize user inputs in forms

---

## Next Steps

1. **Review this plan** with all stakeholders
2. **Initialize Sanity project** in portfolio_cms folder
3. **Create all schemas** based on definitions above
4. **Test with sample data** in Sanity Studio
5. **Begin Phase 1** implementation

---

**Document maintained by**: SAM Al Mahmud  
**Contact**: [GitHub](https://github.com/AlMahmud22)