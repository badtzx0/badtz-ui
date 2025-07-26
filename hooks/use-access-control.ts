import { UserRole } from "@/generated/prisma"

// Simplified version without auth - returns no access for everything
export const useAccessControl = () => {
  const typedRoles: UserRole[] = []

  return {
    roles: typedRoles,
    effectiveRoles: typedRoles,
    primaryRole: null as UserRole | null,
    isPending: false,
    error: null,
    hasAccess: (requiredRoles: UserRole[]) => false,
    hasAnyRole: (targetRoles: UserRole[]) => false,
    hasExactAccess: (requiredRole: UserRole) => false,
  }
}

export const hasOneYearAccess = (user: {
  roles: UserRole[]
  oneYearExpiresAt?: Date | null
}) => {
  if (!user.roles.includes(UserRole.ONE_YEAR_ACCESS)) {
    return false
  }

  if (user.oneYearExpiresAt) {
    const now = new Date()
    const expirationDate = new Date(user.oneYearExpiresAt)
    return now <= expirationDate
  }

  return false
}
