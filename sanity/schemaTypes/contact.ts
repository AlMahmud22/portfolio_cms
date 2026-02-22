import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'contact',
  title: 'Contact Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'string',
      description: 'Your contact email address',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'availabilityStatus',
      title: 'Availability Status',
      type: 'string',
      options: {
        list: [
          {title: 'Available for Work', value: 'available'},
          {title: 'Busy', value: 'busy'},
          {title: 'Not Available', value: 'unavailable'},
        ],
      },
      description: 'Current availability status',
      initialValue: 'available',
    }),
    defineField({
      name: 'formSuccessMessage',
      title: 'Form Success Message',
      type: 'text',
      description: 'Message displayed after successful form submission',
      rows: 2,
      initialValue: 'Thank you for your message! I will get back to you soon.',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'socialLink'}]}],
      description: 'Social media links to display in contact section',
    }),
  ],
  preview: {
    select: {
      email: 'email',
      status: 'availabilityStatus',
    },
    prepare({email, status}) {
      return {
        title: 'Contact Settings',
        subtitle: `${email} | ${status || 'No status'}`,
      }
    },
  },
})
