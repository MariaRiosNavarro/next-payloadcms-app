import type { Access } from 'payload'
import type { AccessArgs } from 'payload'

interface User {
  id: string | number
  role: 'admin' | 'editor'
  email: string
}

export let authUserEmail: string

export const hasRole =
  (role: 'admin' | 'editor'): Access =>
  ({ req }) => {
    const user = req.user as User
    authUserEmail = user?.email
    return user?.role === role
  }

export const isAdmin: Access = hasRole('admin')
export const isEditor: Access = hasRole('editor')

export const isAdminOrEditor: Access = ({ req }) => {
  const user = req.user as User | undefined
  if (!user) return false
  return user.role === 'admin' || user.role === 'editor'
}


export const isAuthor: Access = async ({ req, id }) => {
  const user = req.user 
  if (!user) return false 
  if (!id) return false 

  const post = await req.payload.findByID({
    collection: 'posts', 
    id, 
  })

  const author = post?.author

  const authorId = typeof author === 'string' ? author : author?.id

  return authorId === user.id
}

// ------------PAYLOAD

export const anyone: Access = () => true

type isAuthenticated = (args: AccessArgs<User>) => boolean

export const authenticated: isAuthenticated = ({ req: { user } }) => {
  return Boolean(user)
}

export const authenticatedOrPublished: Access = ({ req: { user } }) => {
  if (user) {
    return true
  }

  return {
    _status: {
      equals: 'published',
    },
  }
}
