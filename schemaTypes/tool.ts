import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'tool',
  title: 'Tool',
  type: 'document',
  initialValue: {
    proficiency: 50,
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
      validation: (Rule) => Rule.required().min(100).max(800),
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
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon3DPath',
      title: '3D Icon Path',
      type: 'string',
      description: 'Path to 3D model file (e.g., /models/tools/blender.glb)',
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
      description: 'Order within category',
      validation: (Rule) => Rule.required().min(0),
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
