import Keycloak from 'keycloak-js'
import { getEnv } from '../utils'

export const keycloak = Keycloak({
  url: getEnv('KEYCLOAK_URL'),
  realm: getEnv('KEYCLOAK_REALM'),
  clientId: getEnv('KEYCLOAK_CLIENT'),
})
