import type { CollectionConfig } from "payload"

const Posts: CollectionConfig = {
  slug: "posts",
  versions: {
    drafts: true,
  },
  admin: {
    defaultColumns: ["title", "author", "category", "status", "createdAt"],
    useAsTitle: "title",
    group: "Content",
    listSearchableFields: ["title", "author", "category", "status"],
  },
  access: {
    read: () => true, // Everyone can read posts
    create: () => true, // For now, anyone can create (adjust for production)
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true, // Support for multiple languages
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "author",
      type: "text",
      required: true,
      defaultValue: "NCDC Admin",
    },
    {
      name: "publishedDate",
      type: "date",
      required: true,
      defaultValue: () => new Date(),
      admin: {
        position: "sidebar",
      },
      filter: true,
    },
    {
      name: "category",
      type: "select",
      required: true,
      options: [
        {
          label: "News",
          value: "news",
        },
        {
          label: "Projects",
          value: "projects",
        },
        {
          label: "Green Development",
          value: "green-development",
        },
        {
          label: "Housing",
          value: "housing",
        },
        {
          label: "Technology",
          value: "technology",
        },
      ],
      admin: {
        position: "sidebar",
        isClearable: false,
        isSortable: true,
      },
    },
    {
      name: "featuredImage",
      type: "upload",
      relationTo: "media",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "excerpt",
      type: "textarea",
      required: true,
      localized: true,
      admin: {
        description: "Short description that appears in post listings",
      },
    },
    {
      name: "content",
      type: "richText",
      required: true,
      localized: true,
    },
    {
      name: "tags",
      type: "text",
      hasMany: true,
      admin: {
        position: "sidebar",
        description: "Add tags separated by pressing Enter",
      },
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "draft",
      options: [
        {
          label: "Draft",
          value: "draft",
        },
        {
          label: "Published",
          value: "published",
        },
        {
          label: "Archived",
          value: "archived",
        },
      ],
      admin: {
        position: "sidebar",
        isClearable: false,
        isSortable: true,
      },
    },
    {
      name: "seo",
      type: "group",
      fields: [
        {
          name: "title",
          type: "text",
          localized: true,
        },
        {
          name: "description",
          type: "textarea",
          localized: true,
        },
      ],
    },
  ],
}

export { Posts }
export default Posts
