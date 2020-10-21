import React, { createContext, useMemo, useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'

import {
  fetchToken,
  getLocalRefreshToken,
  getLocalToken,
  logoutToken,
  ParsedToken,
  removeLocalRefreshToken,
  removeLocalToken,
  setLocalRefreshToken,
  setLocalToken,
} from '../token'
import { extractUserFromPayload, log } from '../utils'
import { User } from '.'

export interface LoginParams {
  username: string
  password: string
}

export interface UserContextState {
  authenticating: boolean
  error: string | undefined
  login: (params: LoginParams) => Promise<void>
  logout: () => void
  user: User | undefined
}

export const UserContext = createContext<UserContextState>({
  user: undefined,
  error: undefined,
  authenticating: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
  login: (params: LoginParams) => {
    return new Promise((resolve) => {
      resolve()
    })
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  logout: () => {},
})

let timeoutRef: NodeJS.Timeout | undefined

export const UserProvider: React.FC = ({ children }) => {
  const [authenticating, setAuthenticating] = useState<boolean>(false)
  const [error, setError] = useState<string | undefined>()
  const [token, setToken] = useState<string | undefined>(getLocalToken)

  const renewToken = async () => {
    log.debug('Renew token')
    const refresh_token = getLocalRefreshToken()

    // If for some reason the refresh token isn't there or
    // we are already waiting for a token
    if (!refresh_token || authenticating) {
      log.debug('Renew token: no refresh token or already fetching')
      return
    }

    try {
      setAuthenticating(true)
      const fetchTokenResponse = await fetchToken({
        refresh_token,
      })
      setAuthenticating(false)

      log.debug('Renew token: Update token')
      setLocalToken(fetchTokenResponse.access_token)
      setLocalRefreshToken(fetchTokenResponse.refresh_token)
      setToken(fetchTokenResponse.access_token)
    } catch (e) {
      setAuthenticating(false)
      setError('Unable to renew token')
      log.error(e)
    }
  }

  // When the token changes, queue up the job to refresh it
  useEffect(() => {
    log.debug('Token changed:Start')

    if (timeoutRef) {
      log.debug('Token changed: clear existing timer')
      clearTimeout(timeoutRef)
    }

    // If we are clearing the token, clear any renewals
    if (!token) {
      log.debug('Token changed: token is undefined, do not renew')
      return
    }

    log.debug('Token changed: Set timer for renewal')

    // When the token is 75% through it lifespan , renew (accounts for short tokens)
    timeoutRef = setTimeout(async () => {
      await renewToken()
    }, 300 * 1000 * 0.75)
  }, [token])

  // Extract the user from the token
  const user: User | undefined = useMemo(() => {
    log.debug('Calculate user:start')

    // If the token is undefined there is no user
    if (!token) {
      log.debug('Calculate user:no token')
      return undefined
    }

    // Parse the Access token to extra the json data within it
    const parsedToken = jwt_decode(token) as ParsedToken

    const parsedUser = extractUserFromPayload(parsedToken)
    log.debug('Calculate user:')
    log.debug(parsedUser)

    return parsedUser
  }, [token])

  const login = async (params: LoginParams) => {
    try {
      setAuthenticating(true)
      const fetchTokenResponse = await fetchToken(params)
      log.debug(fetchTokenResponse)
      setAuthenticating(false)

      setLocalToken(fetchTokenResponse.access_token)
      setLocalRefreshToken(fetchTokenResponse.refresh_token)
      setToken(fetchTokenResponse.access_token)
    } catch (e) {
      setAuthenticating(false)
      setError('Unable to login')
      log.error(e)
    }
  }

  const logout = async () => {
    const refresh_token = getLocalRefreshToken()

    if (refresh_token) {
      await logoutToken({ refresh_token })
    }

    removeLocalToken()
    removeLocalRefreshToken()
    setToken(undefined)
  }

  return (
    <UserContext.Provider
      value={{
        authenticating,
        error,
        user,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
