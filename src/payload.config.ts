import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'

import Posts from './collections/Posts'
import Media from './collections/Media'

export default buildConfig({
  admin: {
    user: 'users',
    bundler: 'webpack',
  },
  collections: [
    Posts,
    Media,
    {
      slug: 'users',
      auth: true,
      access: {
        delete: () => false,
        update: () => true,
      },
      fields: [
        {
          name: 'role',
          type: 'select',
          options: [
            { label: 'Admin', value: 'admin' },
            { label: 'Editor', value: 'editor' },
          ],
          defaultValue: 'editor',
          required: true,
        },
      ],
    },
  ],
  secret: process.env.PAYLOAD_SECRET || 'fallback-secret-key',
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || 'mongodb://localhost:27017/nalaikh-city',
  }),
  editor: lexicalEditor({}),
  localization: {
    locales: ['en', 'mn', 'zh'],
    defaultLocale: 'mn',
    fallback: true,
  },
  cors: [
    'http://localhost:3000',
    'https://your-production-domain.com', // Replace with your production domain
  ],
  csrf: [
    'http://localhost:3000',
    'https://your-production-domain.com', // Replace with your production domain
  ],
})