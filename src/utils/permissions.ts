// roleUtils.ts
import { User } from '../types'

// only for admin level
export const isAdmin = (user: User): boolean => user.isAdmin

// only for super admin level
export const isSuperAdmin = (user: User): boolean => user.isSuperAdmin

// for all admin levels (admin and super admin)
export const hasAdminAccess = (user: User): boolean =>
  isAdmin(user) || isSuperAdmin(user)

// Function to determine user role as string (for tables, inputs or info)
export const getUserRole = (user: User): string => {
  if (user.isSuperAdmin) {
    return 'superadmin'
  } else if (user.isAdmin) {
    return 'admin'
  } else {
    return 'user'
  }
}
