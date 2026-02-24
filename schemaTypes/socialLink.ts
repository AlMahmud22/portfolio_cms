import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'socialLink',
  title: 'Social Link',
  type: 'document',
  fields: [
    defineField({
      name: 'platform',
      title: 'Platform Name',
      type: 'string',
      description: 'Display name of the platform (e.g., GitHub, LinkedIn, Bluesky)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'string',
      description: 'Full URL or mailto: link (e.g., https://github.com/you or mailto:you@domain.com)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Lucide Icon Name',
      type: 'string',
      description: [
        'Icon name from lucide-react. Leave blank if uploading a custom icon image below.',
        'Common values: Github · Linkedin · Twitter · Mail · Globe · Youtube · Instagram · Twitch · Discord · Slack · Figma · BookOpen · Code2 · ExternalLink',
      ].join(' — '),
    }),
    defineField({
      name: 'customIcon',
      title: 'Custom Icon Image',
      type: 'image',
      description: 'Upload a custom icon (SVG or PNG) if the platform has no Lucide icon. Takes precedence over the icon name above.',
      options: {
        accept: 'image/svg+xml,image/png,image/webp',
      },
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this link appears (lower = earlier)',
      initialValue: 99,
      validation: (Rule) => Rule.min(0),
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
      title: 'platform',
      subtitle: 'url',
      order: 'order',
      media: 'customIcon',
    },
    prepare({title, subtitle, order, media}) {
      return {
        title,
        subtitle: `Order ${order ?? '—'} · ${subtitle}`,
        media,
      }
    },
  },
})
