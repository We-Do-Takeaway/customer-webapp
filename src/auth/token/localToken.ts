import jwt_decode from 'jwt-decode'

import { log } from '../utils'
import { ParsedRefreshToken, ParsedToken } from '.'

const TOKEN_NAME = 'token'
const REFRESH_TOKEN_NAME = 'refresh_token'

export const getLocalToken = () => {
  // Get the token currently stored in local storage
  const token = localStorage.getItem(TOKEN_NAME) || undefined

  // if there is no token then go no further
  if (!token) {
    return undefined
  }

  const parsedToken = jwt_decode(token) as ParsedToken

  // If the expiration property on the token occurred before now
  // then get rid of it and return undefined
  const expDate = new Date(parsedToken.exp * 1000)
  const now = new Date()
  if (expDate.getTime() < now.getTime()) {
    log.debug('getLocalToken:Token expired')
    removeLocalToken()
    removeLocalRefreshToken()
    return undefined
  }

  // The token is still in date, use it.
  return token
}
export const setLocalToken = (token: string) =>
  localStorage.setItem(TOKEN_NAME, token)
export const removeLocalToken = () => localStorage.removeItem(TOKEN_NAME)

export const getLocalRefreshToken = () => {
  // Check the expiry time for the refresh token
  // Get the token currently stored in local storage
  const token = localStorage.getItem(REFRESH_TOKEN_NAME) || undefined

  // if there is no token then go no further
  if (!token) {
    return undefined
  }

  const parsedToken = jwt_decode(token) as ParsedRefreshToken

  // If the expiration property on the token occurred before now
  // then get rid of it and return undefined
  const expDate = new Date(parsedToken.exp * 1000)
  const now = new Date()
  if (expDate.getTime() < now.getTime()) {
    log.debug('getLocalRefreshToken:Token expired')
    removeLocalToken()
    removeLocalRefreshToken()
    return undefined
  }

  // The token is still in date, use it.
  return token
}

export const setLocalRefreshToken = (refresh_token: string) =>
  localStorage.setItem(REFRESH_TOKEN_NAME, refresh_token)
export const removeLocalRefreshToken = () =>
  localStorage.removeItem(REFRESH_TOKEN_NAME)

export const hasToken = (): boolean => {
  const token = getLocalToken()
  const refresh_token = getLocalRefreshToken()

  return !!(
    token &&
    token.length > 0 &&
    refresh_token &&
    refresh_token.length > 0
  )
}
