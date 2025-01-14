// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { isAdmin } from './access'

// Add all collections in one place

import { collections } from './collections'
import { Users } from './collections/Users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections,
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  globals: [
    {
      slug: 'site-settings',
      access: {
        // Only admin users can read global settings
        read: isAdmin,
        // Only admin users can update global settings
        update: isAdmin,
      },
      fields: [
        {
          name: 'siteTitle',
          type: 'text',
          required: true,
        },
        {
          name: 'siteDescription',
          type: 'text',
          required: true,
        },
        {
          name: 'contactEmail',
          type: 'text',
          required: true,
        },
        {
          name: 'socialMediaLinks',
          type: 'array',
          fields: [
            {
              name: 'plattform',
              type: 'text',
              required: true,
            },
            {
              name: 'url',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'maintenanceMode',
          type: 'checkbox',
        },
        {
          name: 'defaultLanguage',
          type: 'select',
          options: [
            { label: 'English', value: 'en' },
            { label: 'Spanish', value: 'es' },
            { label: 'German', value: 'de' },
          ],
        },
        {
          name: 'themeSettings',
          type: 'group',
          fields: [
            {
              name: 'theme',
              type: 'select',
              options: [
                { label: 'Light', value: 'light' },
                { label: 'Dark', value: 'dark' },
              ],
            },
            {
              name: 'accentColor',
              type: 'select',
              options: [
                { label: 'Blue', value: 'blue' },
                { label: 'Green', value: 'green' },
                { label: 'Red', value: 'red' },
              ],
            },
          ],
        },
        {
          name: 'footerSettings',
          type: 'group',
          fields: [
            {
              name: 'footerText',
              type: 'text',
            },
            {
              name: 'footerLink',
              type: 'text',
            },
            {
              name: 'footerLogo',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
        {
          name: 'headerSettings',
          type: 'group',
          fields: [
            {
              name: 'headerText',
              type: 'text',
            },
            {
              name: 'headerLink',
              type: 'text',
            },
            {
              name: 'headerLogo',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
      ],
    },
  ],
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
