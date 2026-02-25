import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'tool',
  title: 'Tool',
  type: 'document',
  initialValue: {
    category: 'Development',
  },
  fields: [
    defineField({
      name: 'name',
      title: 'Tool Name',
      type: 'string',
      description: 'Name of the tool or technology',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly identifier',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Description of how you use this tool',
      rows: 4,
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: '3D Modeling & Animation', value: '3D'},
          {title: 'Video Editing', value: 'Video'},
          {title: 'Design', value: 'Design'},
          {title: 'Development', value: 'Development'},
          {title: 'Networking', value: 'Networking'},
          {title: 'Cloud & Deployment', value: 'Cloud & Deployment'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon3DPath',
      title: '3D Icon Path (deprecated)',
      type: 'string',
      description: 'Legacy — no longer used. Kept for data migration safety.',
      hidden: true,
    }),
    defineField({
      name: 'logo',
      title: 'Tool Logo',
      type: 'image',
      description: 'Upload the tool logo (PNG/SVG). Used in globe and grid views.',
      options: { hotspot: false },
    }),
    defineField({
      name: 'proficiency',
      title: 'Proficiency (%)',
      type: 'number',
      description: 'Your skill level with this tool (0–100)',
      validation: (Rule) => Rule.min(0).max(100),
      initialValue: 80,
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image (optional)',
      type: 'image',
      description: 'Optional hero/showcase image for this tool',
      options: { hotspot: true },
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
      description: 'Tool screenshots or samples',
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
      description: 'Tool demo videos',
    }),
    defineField({
      name: 'relatedProjects',
      title: 'Related Projects',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'project'}]}],
      description: 'Projects where this tool was used',
    }),
    defineField({
      name: 'website',
      title: 'Official Website',
      type: 'url',
      description: 'Link to tool official website',
      validation: (Rule) => Rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order within category (lower number appears first)',
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
    {
      title: 'By Category',
      name: 'categoryOrder',
      by: [{field: 'category', direction: 'asc'}, {field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'images.0',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title,
        subtitle: subtitle || 'No category',
        media,
      }
    },
  },
})
