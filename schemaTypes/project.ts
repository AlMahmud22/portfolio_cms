import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  initialValue: {
    featured: false,
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      description: 'Name of the project',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly identifier',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Detailed project description',
      rows: 6,
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'projectCategory'}],
      description: 'Project category',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      description: 'Display on homepage or featured section',
      initialValue: false,
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image (Thumbnail)',
      type: 'image',
      description: 'Primary image shown on project cards',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'techStack',
      title: 'Tech Stack (deprecated)',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Legacy free-text field — use Skills and Tools below instead.',
      hidden: true,
    }),
    defineField({
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{type: 'skill'}],
        options: { disableNew: false },
      }],
      description: 'Programming languages, frameworks, libraries, concepts used. Search to select.',
    }),
    defineField({
      name: 'projectTools',
      title: 'Tools',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{type: 'tool'}],
        options: { disableNew: false },
      }],
      description: 'Software tools and platforms used in this project. Search to select.',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
            },
          ],
        },
      ],
      description: 'Project screenshots or images',
    }),
    defineField({
      name: 'videos',
      title: 'Videos',
      type: 'array',
      of: [
        {
          type: 'file',
          options: {accept: 'video/*'},
          fields: [
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
            },
          ],
        },
      ],
      description: 'Demo videos or walkthroughs',
    }),
    defineField({
      name: 'links',
      title: 'Project Links',
      type: 'object',
      fields: [
        {
          name: 'github',
          title: 'GitHub URL',
          type: 'url',
          validation: (Rule) => Rule.uri({scheme: ['http', 'https']}),
        },
        {
          name: 'live',
          title: 'Live URL',
          type: 'url',
          validation: (Rule) => Rule.uri({scheme: ['http', 'https']}),
        },
        {
          name: 'demo',
          title: 'Demo URL',
          type: 'url',
          validation: (Rule) => Rule.uri({scheme: ['http', 'https']}),
        },
        {
          name: 'downloadUrl',
          title: 'Download URL',
          type: 'url',
          description: 'External download link (e.g. GitHub Releases, Google Drive, Dropbox). Opens in a new tab.',
          validation: (Rule) => Rule.uri({scheme: ['http', 'https']}),
        },
      ],
      description: 'Links to GitHub, live site, demo, or download',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order within category (lower number appears first)',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      description: 'When the project was published',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
    {
      title: 'Published Date (Newest First)',
      name: 'publishedDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
    {
      title: 'Featured First',
      name: 'featuredFirst',
      by: [{field: 'featured', direction: 'desc'}, {field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category.name',
      featured: 'featured',
      media: 'images.0',
    },
    prepare({title, subtitle, featured, media}) {
      return {
        title: `${featured ? '⭐ ' : ''}${title}`,
        subtitle: subtitle || 'No category',
        media,
      }
    },
  },
})
