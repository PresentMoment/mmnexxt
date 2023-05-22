/* eslint-disable import/no-anonymous-default-export */
import { defineField,defineType } from "sanity";

export default defineType({
  name: 'post',
  type: 'document',
  title: 'Post',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
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
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})