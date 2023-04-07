/* eslint-disable import/no-anonymous-default-export */

export default {
  name: 'exhibit',
  type: 'document',
  title: 'Exhibits',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'dates',
      type: 'string',
      title: 'Dates',
    },
    {
      name: 'artist',
      type: 'reference',
      title: 'Artist',
      to: [{ type: 'artist' }],
    },
    { name: 'image', title: 'Image', type: 'image' },
    {
      name: 'images',
      type: 'array',
      title: 'Images',
      of: [
        {
          name: 'image',
          type: 'image',
          title: 'Image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            },
          ],
        },
      ],
      options: {
        layout: 'grid',
      },
    },
    {
      title: 'Checklist',
      name: 'checklist',
      type: 'file',
    },
    {
      title: 'Press Release',
      name: 'pressrelease',
      type: 'array',
      of: [
        {
          type: 'file',
          fields: [
            {
              name: 'language',
              type: 'string',
              title: 'Language',
              options: {
                list: [
                  { title: 'Italian', value: 'Italian' },
                  { title: 'English', value: 'English' },
                ],
                layout: 'radio',
              },
            },
          ],
        },
      ],
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
  ],
}
