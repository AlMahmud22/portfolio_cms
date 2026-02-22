import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
      description: 'Main title of the website',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'siteDescription',
      title: 'Site Description',
      type: 'text',
      description: 'Short description for SEO',
      rows: 3,
      validation: (Rule) => Rule.required().max(160),
    }),
    defineField({
      name: 'siteUrl',
      title: 'Site URL',
      type: 'url',
      description: 'Full URL of the website',
      validation: (Rule) => Rule.required().uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'Site logo',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      description: 'Site favicon (32x32 recommended)',
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        {
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          of: [{type: 'string'}],
          description: 'SEO keywords',
        },
        {
          name: 'ogImage',
          title: 'Open Graph Image',
          type: 'image',
          description: 'Default image for social sharing (1200x630 recommended)',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'twitterHandle',
          title: 'Twitter Handle',
          type: 'string',
          description: 'Twitter/X username (without @)',
        },
      ],
    }),
    defineField({
      name: 'analytics',
      title: 'Analytics',
      type: 'object',
      fields: [
        {
          name: 'googleAnalyticsId',
          title: 'Google Analytics ID',
          type: 'string',
          description: 'GA4 Measurement ID (e.g., G-XXXXXXXXXX)',
        },
        {
          name: 'googleTagManagerId',
          title: 'Google Tag Manager ID',
          type: 'string',
          description: 'GTM Container ID (e.g., GTM-XXXXXXX)',
        },
      ],
    }),
    defineField({
      name: 'theme',
      title: 'Theme Settings',
      type: 'object',
      fields: [
        {
          name: 'primaryColor',
          title: 'Primary Color',
          type: 'string',
          description: 'Hex color code (e.g., #DC143C for crimson red)',
          initialValue: '#DC143C',
        },
        {
          name: 'fontFamily',
          title: 'Font Family',
          type: 'string',
          description: 'Primary font family name',
          initialValue: 'TechHeadlines',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'siteTitle',
      subtitle: 'siteUrl',
    },
    prepare({title, subtitle}) {
      return {
        title: title || 'Site Settings',
        subtitle: subtitle || 'No URL set',
      }
    },
  },
})
