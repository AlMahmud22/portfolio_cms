import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'about',
  title: 'About Section',
  type: 'document',
  fields: [
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      description: 'Your profile photo',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Your bio in rich text format',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'quickStats',
      title: 'Quick Stats',
      type: 'object',
      fields: [
        {name: 'yearsExperience', title: 'Years of Experience', type: 'string'},
        {name: 'projectsCompleted', title: 'Projects Completed', type: 'string'},
        {name: 'technologiesUsed', title: 'Technologies Used', type: 'string'},
        {name: 'linesOfCode', title: 'Lines of Code', type: 'string'},
      ],
      description: 'Quick stats to display',
    }),
    defineField({
      name: 'skills',
      title: 'Skills',
      type: 'object',
      fields: [
        {
          name: 'frontend',
          title: 'Frontend Skills',
          type: 'array',
          of: [{type: 'string'}],
        },
        {
          name: 'backend',
          title: 'Backend Skills',
          type: 'array',
          of: [{type: 'string'}],
        },
        {
          name: 'devops',
          title: 'DevOps Skills',
          type: 'array',
          of: [{type: 'string'}],
        },
        {
          name: 'networking',
          title: 'Networking Skills',
          type: 'array',
          of: [{type: 'string'}],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'terminalCommands',
      title: 'Terminal Commands',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'command', title: 'Command', type: 'string'},
            {
              name: 'output',
              title: 'Output',
              type: 'array',
              of: [{type: 'string'}],
            },
          ],
        },
      ],
      description: 'Commands to display in the terminal view',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'socialLink'}]}],
      description: 'Social media links',
    }),
  ],
  preview: {
    select: {
      title: 'bio',
      media: 'profileImage',
    },
    prepare({media}) {
      return {
        title: 'About Section',
        media,
      }
    },
  },
})
