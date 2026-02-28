import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'fullName',
      title: 'Full Name',
      type: 'object',
      fields: [
        {name: 'firstName', title: 'First Name', type: 'string', validation: (Rule) => Rule.required()},
        {name: 'lastName', title: 'Last Name', type: 'string', validation: (Rule) => Rule.required()},
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titles',
      title: 'Professional Titles',
      type: 'array',
      of: [{type: 'string'}],
      description: 'List of professional titles to display (max 4)',
      validation: (Rule) => Rule.required().max(4).min(1),
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Image (Hero)',
      type: 'image',
      description: 'Image displayed in the hero section',
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: 'terminalCommands',
      title: 'Terminal Commands',
      type: 'object',
      fields: [
        {
          name: 'greeting',
          title: 'Greeting Command',
          type: 'string',
          description: 'Command shown in terminal (e.g., "$ welcome")',
        },
        {
          name: 'output',
          title: 'Terminal Output',
          type: 'array',
          of: [{type: 'string'}],
          description: 'Lines of output from the command',
        },
      ],
      description: 'Commands and output to display in the terminal section',
    }),
    defineField({
      name: 'resumeFile',
      title: 'Resume File',
      type: 'reference',
      to: [{type: 'fileAsset'}],
      description: 'Select a File Asset for the resume',
    }),
    defineField({
      name: 'portfolioFile',
      title: 'Static Portfolio File',
      type: 'reference',
      to: [{type: 'fileAsset'}],
      description: 'Select a File Asset for the static portfolio',
    }),
    defineField({
      name: 'scrollHintText',
      title: 'Scroll Hint Text',
      type: 'string',
      description: 'Text to display in scroll hint',
      initialValue: 'Scroll to explore',
    }),
  ],
  preview: {
    select: {
      firstName: 'fullName.firstName',
      lastName: 'fullName.lastName',
      titles: 'titles',
    },
    prepare({firstName, lastName, titles}) {
      return {
        title: `${firstName} ${lastName}`,
        subtitle: titles?.[0] || 'No title',
      }
    },
  },
})
