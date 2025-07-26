import { UserRole } from "@/generated/prisma"

export const ROLE_HIERARCHY: Record<UserRole, UserRole[]> = {
  ADMIN: [
    "FULL_ACCESS",
    "ONE_YEAR_ACCESS",
    "MONTHLY_ACCESS",
    "TEMPLATE_1",
    "TEMPLATE_2",
  ],
  FULL_ACCESS: ["ONE_YEAR_ACCESS", "TEMPLATE_1", "TEMPLATE_2"],
  ONE_YEAR_ACCESS: ["TEMPLATE_1", "TEMPLATE_2"],
  MONTHLY_ACCESS: [],
  TEMPLATE_1: [],
  TEMPLATE_2: [],
  USER: [],
}

export function getEffectiveRoles(userRoles: UserRole[]): UserRole[] {
  const effectiveRoles = new Set<UserRole>(userRoles)

  for (const role of userRoles) {
    const inheritedRoles = ROLE_HIERARCHY[role] || []
    inheritedRoles.forEach((inheritedRole) => effectiveRoles.add(inheritedRole))
  }

  return Array.from(effectiveRoles)
}

export function hasAccess(
  userRoles: UserRole[],
  requiredRoles: UserRole[]
): boolean {
  if (requiredRoles.length === 0) return true

  const effectiveRoles = getEffectiveRoles(userRoles)
  return requiredRoles.some((requiredRole) =>
    effectiveRoles.includes(requiredRole)
  )
}

export function hasAnyRole(
  userRoles: UserRole[],
  targetRoles: UserRole[]
): boolean {
  return targetRoles.some((targetRole) => userRoles.includes(targetRole))
}

export function hasExactAccess(
  userRoles: UserRole[],
  requiredRole: UserRole
): boolean {
  return userRoles.includes(requiredRole)
}
