import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'skill',
  title: 'Skill',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Skill Name',
      type: 'string',
      description: 'e.g. Python, React, Machine Learning',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Type of skill',
      options: {
        list: [
          {title: 'Language',    value: 'Language'},
          {title: 'Framework',   value: 'Framework'},
          {title: 'Library',     value: 'Library'},
          {title: 'Database',    value: 'Database'},
          {title: 'Networking',  value: 'Networking'},
          {title: 'Methodology', value: 'Methodology'},
          {title: 'Concept',     value: 'Concept'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Controls sort order in filters (lower = first)',
    }),
    defineField({
      name: 'logo',
      title: 'Skill Logo',
      type: 'image',
      description: 'Optional logo. If not provided, text fallback will be used on the 3D globe.',
      options: {
        hotspot: true,
      },
    }),
  ],
  orderings: [
    {
      title: 'Category + Name',
      name: 'categoryName',
      by: [{field: 'category', direction: 'asc'}, {field: 'name', direction: 'asc'}],
    },
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {title: 'name', subtitle: 'category'},
    prepare({title, subtitle}) {
      const icons: Record<string, string> = {
        Language: '💻', Framework: '🏗️', Library: '📦',
        Database: '🗄️', Networking: '🌐', Methodology: '📐', Concept: '💡',
      }
      return {
        title,
        subtitle: `${icons[subtitle] ?? ''} ${subtitle ?? ''}`,
      }
    },
  },
})
