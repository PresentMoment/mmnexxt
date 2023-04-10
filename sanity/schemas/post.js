/* eslint-disable import/no-anonymous-default-export */

export default {
  name: 'post',
  type: 'document',
  title: 'Post',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      type: 'slug',
      name: 'slug',
      title: 'Slug',
      description:
        'this will be the url address for the location - click the "Generate" button to auto-fill',
      options: {
        source: 'title',
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/\s+/g, '')
            .replace(/&/g, '')
            .slice(0, 200),
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
}