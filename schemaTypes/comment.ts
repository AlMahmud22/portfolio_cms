// Sanity Comment Schema
export default {
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'body',
      title: 'Comment Body',
      type: 'text',
      validation: (Rule: any) => Rule.required().min(10),
    },
    {
      name: 'approved',
      title: 'Approved',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'post',
      title: 'Post',
      type: 'reference',
      to: [{ type: 'blog' }],
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: (new Date()).toISOString(),
    },
  ],
  preview: {
    select: {
      name: 'name',
      comment: 'body',
      post: 'post.title',
    },
    prepare({ name, comment, post }: any) {
      return {
        title: `${name} on ${post || 'unknown post'}`,
        subtitle: comment,
      }
    },
  },
}
