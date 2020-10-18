import { User } from '../context/UserType'

export function hasRoles(user: User, requiredRoles: string[] = []) {
  // If there are no required roles, we are good
  if (requiredRoles.length === 0) {
    return true
  }

  const allUserRoles = [
    ...user.realm_access.roles,
    ...user.resource_access.account.roles,
  ]

  let authorised = true

  requiredRoles.forEach((requiredRole) => {
    if (!allUserRoles.includes(requiredRole)) {
      authorised = false
    }
  })

  return authorised
}
