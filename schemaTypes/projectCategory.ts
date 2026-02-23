import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'projectCategory',
  title: 'Project Category',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Category Name',
      type: 'string',
      description: 'Name of the project category',
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
      description: 'Brief description of this category',
      rows: 3,
    }),
    defineField({
      name: 'color',
      title: 'Category Accent Color',
      type: 'string',
      description: 'Hex color for this category (e.g. #4a8b8d)',
    }),
    defineField({
      name: 'icon3DPath',
      title: '3D Icon Path',
      type: 'string',
      description: 'Path to 3D model file (e.g., /models/projects/laptop.glb)',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which categories appear',
      validation: (Rule) => Rule.required().min(0),
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
      order: 'order',
    },
    prepare({title, subtitle, order}) {
      return {
        title: title,
        subtitle: `Order: ${order} | ${subtitle || 'No description'}`,
      }
    },
  },
})
