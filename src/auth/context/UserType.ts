export interface User {
  email: string
  email_verified: boolean
  family_name: string
  given_name: string
  name: string
  preferred_username: string
  realm_access: {
    roles: string[]
  }
  resource_access: {
    account: {
      roles: string[]
    }
  }
}
