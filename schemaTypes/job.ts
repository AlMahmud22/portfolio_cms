import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'job',
  title: 'Job Experience',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Job Title',
      type: 'string',
      description: 'Your position title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
      description: 'Company name',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'dateRange',
      title: 'Date Range',
      type: 'object',
      fields: [
        {
          name: 'start',
          title: 'Start Date',
          type: 'date',
          options: {
            dateFormat: 'YYYY-MM',
          },
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'end',
          title: 'End Date',
          type: 'date',
          options: {
            dateFormat: 'YYYY-MM',
          },
        },
        {
          name: 'current',
          title: 'Currently Working Here',
          type: 'boolean',
          initialValue: false,
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'City, Country',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Brief description of your role',
      rows: 4,
      validation: (Rule) => Rule.min(50).max(500),
    }),
    defineField({
      name: 'responsibilities',
      title: 'Responsibilities',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Key responsibilities and achievements',
      validation: (Rule) => Rule.required().min(3),
    }),
    defineField({
      name: 'techStack',
      title: 'Tech Stack',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Technologies used in this role',
      validation: (Rule) => Rule.required(),
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
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'videos',
      title: 'Videos',
      type: 'array',
      of: [{type: 'file', options: {accept: 'video/*'}}],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in timeline (lower numbers appear first)',
      validation: (Rule) => Rule.required().min(0),
    }),
  ],
  orderings: [
    {
      title: 'Timeline Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'company',
      current: 'dateRange.current',
      media: 'images.0',
    },
    prepare({title, subtitle, current, media}) {
      return {
        title: title,
        subtitle: `${subtitle}${current ? ' (Current)' : ''}`,
        media,
      }
    },
  },
})
