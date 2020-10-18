import { User } from '../context'
import { ParsedToken } from '../token'

export const extractUserFromPayload = ({
  realm_access,
  resource_access,
  email_verified,
  name,
  preferred_username,
  given_name,
  family_name,
  email,
}: ParsedToken): User => ({
  realm_access,
  resource_access,
  email_verified,
  name,
  preferred_username,
  given_name,
  family_name,
  email,
})
