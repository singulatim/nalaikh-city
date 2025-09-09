import { buildConfig } from "payload"
import { mongooseAdapter } from "@payloadcms/db-mongodb"
import { lexicalEditor } from "@payloadcms/richtext-lexical"
import path from "path"

import Posts from "./collections/Posts"
import Media from "./collections/Media"

export default buildConfig({
  admin: {
    user: "users",
    meta: {
      titleSuffix: "- NCDC Admin",
    },
    dateFormat: "dd/MM/yyyy",
  },
  collections: [
    Posts,
    Media,
    {
      slug: "users",
      auth: {
        depth: 0,
        verify: false,
        maxLoginAttempts: 5,
        lockTime: 600 * 1000, // 10 minutes
      },
      access: {
        delete: ({ req }) => {
          // Only allow deletion of users for super admins
          return req.user?.role === "admin"
        },
        update: ({ req, id }) => {
          // Users can update their own profile, admins can update any
          return req.user?.role === "admin" || req.user?.id === id
        },
        read: ({ req }) => {
          // Only authenticated users can read users
          return Boolean(req.user)
        },
      },
      fields: [
        {
          name: "role",
          type: "select",
          options: [
            { label: "Admin", value: "admin" },
            { label: "Editor", value: "editor" },
          ],
          defaultValue: "editor",
          required: true,
          access: {
            update: ({ req }) => req.user?.role === "admin",
          },
        },
        {
          name: "firstName",
          type: "text",
          required: true,
        },
        {
          name: "lastName",
          type: "text",
          required: true,
        },
      ],
      admin: {
        useAsTitle: "email",
        defaultColumns: ["firstName", "lastName", "email", "role"],
      },
    },
  ],
  secret: process.env.PAYLOAD_SECRET || "fallback-secret-key",
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || "mongodb://localhost:27017/nalaikh-city",
    connectOptions: {
      dbName: "nalaikh-city",
    },
  }),
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      // Add any additional features here if needed
    ],
  }),
  localization: {
    locales: [
      {
        label: "Mongolian",
        code: "mn",
      },
      {
        label: "English",
        code: "en",
      },
      {
        label: "Chinese",
        code: "zh",
      },
    ],
    defaultLocale: "mn",
    fallback: true,
  },
  cors: [
    "http://localhost:3000",
    "https://your-production-domain.com", // Replace with your production domain
  ],
  csrf: [
    "http://localhost:3000",
    "https://your-production-domain.com", // Replace with your production domain
  ],
  upload: {
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB
    },
  },
})
