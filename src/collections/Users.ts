import type { CollectionConfig, FieldAccess, User } from 'payload'
import { isAdmin } from './../access'

const isAdminFieldAccess: FieldAccess = ({ req }) => {
  const user = req.user as User | undefined
  return user?.role === 'admin'
}

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
    create: isAdmin,

    // Only admin can update users
    update: isAdmin,

    // Only admin can update users
    delete: isAdmin,

    // PUBLIC - Everyone can read users
    read: () => true,
  },
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      required: true,
      access: {
        // Control field-level access
        update: isAdminFieldAccess,
      },
      admin: {
        position: 'sidebar',
        // For non-admin users, the field will be read-only
        description: 'User type can only be modified by administrators',
      },
    },
  ],
}
