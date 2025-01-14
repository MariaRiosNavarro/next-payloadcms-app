import type { Access } from 'payload'

interface User {
  id: string | number
  role: 'admin' | 'editor'
}

export const hasRole =
  (role: 'admin' | 'editor'): Access =>
  ({ req }) => {
    const user = req.user as User
    return user?.role === role
  }

export const isAdmin: Access = hasRole('admin')
export const isEditor: Access = hasRole('editor')

export const isAdminOrEditor: Access = ({ req }) => {
  const user = req.user as User | undefined
  if (!user) return false
  return user.role === 'admin' || user.role === 'editor'
}

// Reusable access function to check if the user is the author of the document
export const isAuthor: Access = async ({ req, id }) => {
  const user = req.user // Retrieve the logged-in user
  if (!user) return false // Ensure there's an authenticated user

  if (!id) return false // Ensure an ID is provided to identify the document

  // Fetch the post document from the database using the provided ID
  const post = await req.payload.findByID({
    collection: 'posts', // Specify the collection slug
    id, // The document ID to fetch
  })

  const author = post?.author

  // Type narrowing to handle both cases
  const authorId = typeof author === 'string' ? author : author?.id

  // Validate if the current user is the author of the post
  return authorId === user.id
}
