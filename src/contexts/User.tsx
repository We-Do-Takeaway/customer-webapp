import React, { Component, createContext } from 'react'
import Keycloak, { KeycloakInstance } from 'keycloak-js'
import { getEnv } from '../utils'

const TokenCheckTime = 30 * 1000
const TokenTimoutBuffer = 300

interface ParsedToken {
  email?: string
  family_name?: string
  given_name?: string
  name?: string
  preferred_username?: string
  realm_access: {
    roles: string[]
  }
  resource_access: {
    account: {
      roles: string[]
    }
  }
}

interface UserProviderState {
  keycloak: KeycloakInstance | null
  authenticated: boolean
}

export interface UserType extends ParsedToken {
  authenticated: boolean
  logout: () => void
}

export const UserContext = createContext<UserType | null>(null)

export class UserProvider extends Component<unknown, UserProviderState> {
  constructor(props: unknown) {
    super(props)
    this.state = { keycloak: null, authenticated: false }
  }

  componentDidMount() {
    const keycloakConfig = {
      url: getEnv('KEYCLOAK_URL', ''),
      realm: getEnv('KEYCLOAK_REALM', ''),
      clientId: getEnv('KEYCLOAK_CLIENT', ''),
    }

    const keycloak = Keycloak(keycloakConfig)

    keycloak.init({ onLoad: 'login-required' }).then((authenticated) => {
      this.setState({ keycloak, authenticated })
      sessionStorage.setItem('token', keycloak.token || '')

      setInterval(() => {
        keycloak.updateToken(TokenTimoutBuffer).then((refreshed: boolean) => {
          if (refreshed) {
            sessionStorage.setItem('token', keycloak.token || '')
          }
        })
      }, TokenCheckTime)
    })
  }

  logout = () => {
    if (this.state.keycloak) {
      this.state.keycloak.logout().then(() => {
        this.setState({
          authenticated: false,
        })
      })
    }

    sessionStorage.removeItem('token')
  }

  render() {
    if (this.state.keycloak) {
      if (this.state.authenticated) {
        const tokenParsed = this.state.keycloak.tokenParsed as ParsedToken

        return (
          <UserContext.Provider
            value={{
              ...tokenParsed,
              authenticated: this.state.authenticated,
              logout: this.logout,
            }}
          >
            {this.props.children}
          </UserContext.Provider>
        )
      }
      return <>Unable to authenticate</>
    }
    return <div>Initializing authentication...</div>
  }
}
