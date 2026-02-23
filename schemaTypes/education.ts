import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'education',
  title: 'Education',
  type: 'document',
  fields: [
    defineField({
      name: 'level',
      title: 'Education Level',
      type: 'string',
      options: {
        list: [
          {title: 'SSC (Secondary School Certificate)', value: 'SSC'},
          {title: 'HSC (Higher Secondary Certificate)', value: 'HSC'},
          {title: 'Foundation (Bridging Courses)', value: 'Foundation'},
          {title: 'BSC (Bachelor of Science)', value: 'BSC'},
          {title: 'MSC (Master of Science)', value: 'MSC'},
          {title: 'PHD (Doctor of Philosophy)', value: 'PHD'},
          {title: 'Other', value: 'Other'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'institution',
      title: 'Institution',
      type: 'string',
      description: 'Name of the educational institution',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'course',
      title: 'Course/Major',
      type: 'string',
      description: 'Course of study or major',
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
          validation: (Rule) => Rule.required(),
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
      description: 'Brief description or achievements',
      rows: 4,
      validation: (Rule) => Rule.min(50).max(500),
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
      title: 'institution',
      subtitle: 'course',
      level: 'level',
      media: 'images.0',
    },
    prepare({title, subtitle, level, media}) {
      return {
        title: `${level} - ${title}`,
        subtitle: subtitle,
        media,
      }
    },
  },
})
