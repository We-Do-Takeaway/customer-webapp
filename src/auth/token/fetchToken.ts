import { getEnv } from '../../utils'
import { log } from '../utils'
import { TokenResponse } from '.'

export interface FetchTokenParams {
  refresh_token?: string
  username?: string
  password?: string
}

export interface LogoutTokenParams {
  refresh_token: string
}

const keycloakConfig = {
  url: getEnv('KEYCLOAK_URL', 'http://localhost/auth'),
  realm: getEnv('KEYCLOAK_REALM', 'my-realm'),
  clientId: getEnv('KEYCLOAK_CLIENT', 'my-client'),
}

const tokenUrl = `${keycloakConfig.url}/realms/${keycloakConfig.realm}/protocol/openid-connect/token`
const logoutUrl = `${keycloakConfig.url}/realms/${keycloakConfig.realm}/protocol/openid-connect/logout`

export const fetchToken = async ({
  refresh_token,
  username,
  password,
}: FetchTokenParams): Promise<TokenResponse> => {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')

  const urlencoded = new URLSearchParams()
  urlencoded.append('client_id', keycloakConfig.clientId)
  urlencoded.append('scope', 'openid')

  if (refresh_token) {
    urlencoded.append('grant_type', 'refresh_token')
    urlencoded.append('refresh_token', refresh_token)
  } else {
    urlencoded.append('grant_type', 'password')
  }

  if (username) {
    urlencoded.append('username', username)
  }

  if (password) {
    urlencoded.append('password', password)
  }

  const requestOptions: RequestInit = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow',
  }

  const response = await fetch(tokenUrl, requestOptions)

  if (response.status !== 200) {
    log.error(JSON.stringify(response, null, 2))
    throw new Error('Invalid login')
  }

  return response.json()
}

export const logoutToken = async ({ refresh_token }: LogoutTokenParams) => {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')

  const urlencoded = new URLSearchParams()
  urlencoded.append('client_id', keycloakConfig.clientId)
  urlencoded.append('refresh_token', refresh_token)

  const requestOptions: RequestInit = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow',
  }

  const response = await fetch(logoutUrl, requestOptions)

  if (response.status !== 204) {
    log.error(JSON.stringify(response, null, 2))
    throw new Error('Error logging out')
  }
}
