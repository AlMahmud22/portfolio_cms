// Sanity Blog Post Schema
export default {
  name: 'blog',
  title: 'Blog Post',
  type: 'document',
  initialValue: {
    featured: false,
    allowComments: true,
  },
  fields: [
    { 
      name: 'title', 
      title: 'Title', 
      type: 'string', 
      validation: (Rule: any) => Rule.required() 
    },
    { 
      name: 'slug', 
      title: 'Slug', 
      type: 'slug', 
      options: { source: 'title' }, 
      validation: (Rule: any) => Rule.required() 
    },
    { 
      name: 'excerpt', 
      title: 'Excerpt', 
      type: 'text', 
      rows: 3 
    },
    { 
      name: 'coverImage', 
      title: 'Cover Image', 
      type: 'image', 
      options: { hotspot: true } 
    },
    { 
      name: 'body', 
      title: 'Body', 
      type: 'array', 
      of: [
        { type: 'block' },
        { 
          type: 'image', 
          options: { hotspot: true },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
            }
          ]
        },
        { 
          type: 'object', 
          name: 'videoEmbed', 
          title: 'Video Embed', 
          fields: [
            { name: 'url', title: 'Video URL (YouTube/Vimeo)', type: 'url' }
          ]
        }
      ]
    },
    { 
      name: 'publishedAt', 
      title: 'Published At', 
      type: 'datetime' 
    },
    { 
      name: 'tags', 
      title: 'Tags', 
      type: 'array', 
      of: [{ type: 'string' }], 
      options: { layout: 'tags' } 
    },
    { 
      name: 'featured', 
      title: 'Featured Post', 
      type: 'boolean', 
      initialValue: false 
    },
    { 
      name: 'allowComments', 
      title: 'Allow Comments', 
      type: 'boolean', 
      initialValue: true 
    },
  ],
  preview: {
    select: { title: 'title', media: 'coverImage', date: 'publishedAt' },
    prepare: ({ title, media, date }: any) => ({ 
      title, 
      media, 
      subtitle: date ? new Date(date).toLocaleDateString() : 'No date' 
    })
  }
}
