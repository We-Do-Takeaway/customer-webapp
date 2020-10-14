/* eslint @typescript-eslint/camelcase: 0 */
import React, { Component, createContext } from 'react'
import jwt from 'jsonwebtoken'
import Keycloak from 'keycloak-js'

import { getEnv } from '../utils'

const TokenCheckTime = 30

interface ParsedToken {
  email?: string
  family_name?: string
  given_name?: string
  name?: string
  preferred_username?: string
  realm_access?: {
    roles: string[]
  }
  resource_access?: {
    account: {
      roles: string[]
    }
  }
}

export interface UserType extends ParsedToken {
  logout: () => void
}

export const UserContext = createContext<UserType | null>(null)

const defaultState: ParsedToken = {
  email: undefined,
  family_name: undefined,
  given_name: undefined,
  name: undefined,
  preferred_username: undefined,
  realm_access: undefined,
  resource_access: undefined,
}

const keycloakConfig = {
  url: getEnv('KEYCLOAK_URL', ''),
  realm: getEnv('KEYCLOAK_REALM', ''),
  clientId: getEnv('KEYCLOAK_CLIENT', ''),
}

export class UserProvider extends Component<unknown, ParsedToken> {
  intervalRef: NodeJS.Timeout | undefined

  keycloak: Keycloak.KeycloakInstance | undefined

  constructor(props: unknown) {
    super(props)

    this.keycloak = Keycloak(keycloakConfig)

    // If the user is refreshing the page, then use the token in the session store
    // to provide the user details
    const token = sessionStorage.getItem('token')
    if (token) {
      const parsedToken = jwt.decode(token || '', { json: true }) as ParsedToken
      this.state = { ...parsedToken }
    } else {
      this.state = { ...defaultState }
    }
  }

  componentDidMount() {
    // If we don't have a token in the session store, go get one from Keycloak
    if (!sessionStorage.getItem('token')) {
      this.login()
    } else {
      // Tell keycloak to go refresh the token on a regular basis
      const { keycloak } = this

      if (!keycloak) {
        return
      }

      keycloak
        .updateToken(TokenCheckTime)
        .then(() => {
          if (keycloak.token) {
            this.updateUser(keycloak.token)
          }
        })
        .catch(() => {
          console.log('Failed to refresh token', keycloak.token)
        })
    }
  }

  updateUser = (token: string) => {
    sessionStorage.setItem('token', token)

    const parsedToken = jwt.decode(token, {
      json: true,
    }) as ParsedToken

    this.setState({ ...parsedToken })
  }

  logout = async () => {
    const { keycloak } = this

    this.setState({ ...defaultState })
    sessionStorage.removeItem('token')

    if (keycloak && keycloak.logout) {
      await keycloak.logout()
    }
  }

  login() {
    const { keycloak } = this

    if (!keycloak) {
      return
    }

    keycloak.init({ onLoad: 'login-required' }).then((authenticated) => {
      if (authenticated && keycloak.token) {
        this.updateUser(keycloak.token)
      }
    })
  }

  render() {
    if (!this?.state?.email) {
      return <p>Please authenticate</p>
    }

    return (
      <UserContext.Provider
        value={{
          ...this.state,
          logout: this.logout,
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    )
  }
}
