import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'certification',
  title: 'Certification',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Certification Name',
      type: 'string',
      description: 'Name of the certification',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'issuer',
      title: 'Issuer',
      type: 'string',
      description: 'Organization that issued the certification',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'dateIssued',
      title: 'Date Issued',
      type: 'date',
      description: 'When the certification was issued',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'expiryDate',
      title: 'Expiry Date',
      type: 'date',
      description: 'When the certification expires (if applicable)',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Description of the certification',
      rows: 3,
      validation: (Rule) => Rule.min(50).max(500),
    }),
    defineField({
      name: 'certificateImage',
      title: 'Certificate Image',
      type: 'image',
      description: 'Image of the certificate',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'verificationUrl',
      title: 'Verification URL',
      type: 'url',
      description: 'Link to verify the certification',
      validation: (Rule) => Rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'credentialId',
      title: 'Credential ID',
      type: 'string',
      description: 'Unique credential identifier',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which certifications appear',
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
      title: 'Date Issued (Newest First)',
      name: 'dateDesc',
      by: [{field: 'dateIssued', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'issuer',
      media: 'certificateImage',
      dateIssued: 'dateIssued',
    },
    prepare({title, subtitle, media, dateIssued}) {
      return {
        title: title,
        subtitle: `${subtitle} | ${dateIssued || 'No date'}`,
        media,
      }
    },
  },
})
