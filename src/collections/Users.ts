import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  // auth: true,
  auth: {
    useAPIKey: true, //If you need to conect with an external API - to validate data
  },
  access: {
    // Only admin can create users
    create: ({ req: { user } }) => {
      return user?.userType === 'admin'
    },
    // Only admin can update users
    update: ({ req: { user } }) => {
      return user?.userType === 'admin'
    },
    // Only admin can delete users
    delete: ({ req: { user } }) => {
      return user?.userType === 'admin'
    },
    // Everyone can read users
    read: () => true,
  },
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: 'userType',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
      ],
      required: true,
      access: {
        // Control field-level access
        update: ({ req: { user } }): boolean => {
          return user?.userType === 'admin'
        },
      },
      admin: {
        position: 'sidebar',
        // For non-admin users, the field will be read-only
        description: 'User type can only be modified by administrators',
      },
    },
  ],
}
