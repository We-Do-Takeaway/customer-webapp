import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'

import { TokenResponse } from '../auth/token'

export const privateKey =
  '-----BEGIN RSA PRIVATE KEY-----\n' +
  'MIIBOgIBAAJAdMrFEiU128nBFwhqy4LZm9WAesya6zbu/f45bhbut1QGKNJzapGL\n' +
  'uAI/YDaXayoTBz0xgVb/b3G5cSBpEjOBPwIDAQABAkAlyuOgbogSGiQwZtngBvSR\n' +
  't7G+iuzqhjkp2ZUN6b/PdJ5pGsqLl0CV188xxl3XiHFRCL0AH1BHGNRufn3uhf3p\n' +
  'AiEA3/n/68GdkmlwBq9Cfug/wxQv+EAR/4i/tLo3+TKhZ/0CIQCFfZk058Nuqi1K\n' +
  'kvklcO/5w+yFhjfTJa7fmlLXjhz86wIhANsIBsgtLcUyq0U+O08UHNbPdSHWtkMp\n' +
  'HiDFQ1vFsaaZAiBi1Uz7WKTfaGvEDPEeAXILUD3r1iW61OmWb+Hp6jQYJQIhAMPB\n' +
  'h0Hs6iIoJ5Nb6LeMQn6v/OYGHN0jcDu352pAaPao\n' +
  '-----END RSA PRIVATE KEY-----'

export const publicKey =
  '-----BEGIN PUBLIC KEY-----\n' +
  'MFswDQYJKoZIhvcNAQEBBQADSgAwRwJAdMrFEiU128nBFwhqy4LZm9WAesya6zbu\n' +
  '/f45bhbut1QGKNJzapGLuAI/YDaXayoTBz0xgVb/b3G5cSBpEjOBPwIDAQAB\n' +
  '-----END PUBLIC KEY-----'

export const generateAccessToken = (expiresInMinutes = 60) => {
  const now = Date.now() / 1000
  const expireSeconds = 60 * expiresInMinutes

  return {
    acr: '1',
    aud: 'web-client',
    auth_time: 0,
    azp: 'web-client',
    email: 'zac@thetolleys.com',
    email_verified: true,
    exp: now + expireSeconds,
    family_name: 'Tolley',
    given_name: 'Zac',
    iat: expiresInMinutes > 0 ? now : now - 10000,
    iss: 'http://auth.wedotakeaway.com/auth/realms/we-do-takeaway',
    jti: uuidv4(),
    name: 'Zac Tolley',
    preferred_username: 'ztolley',
    session_state: uuidv4(),
    sub: uuidv4(),
    typ: 'ID',
  }
}

const generateIDToken = (expiresInMinutes = 60) => {
  const now = Date.now() / 1000
  const expireSeconds = 60 * expiresInMinutes
  return {
    acr: '1',
    aud: 'web-client',
    azp: 'web-client',
    email: 'zac@thetolleys.com',
    email_verified: true,
    exp: now + expireSeconds,
    family_name: 'Tolley',
    given_name: 'Zac',
    iat: expiresInMinutes > 0 ? now : now - 10000,
    iss: 'http://auth.wedotakeaway.com/auth/realms/we-do-takeaway',
    jti: uuidv4(),
    name: 'Zac Tolley',
    preferred_username: 'ztolley',
    session_state: uuidv4(),
    sub: uuidv4(),
    typ: 'ID',
  }
}

export const generateRefreshToken = (expiresInMinutes = 60) => {
  const now = Date.now() / 1000
  const expireSeconds = 60 * expiresInMinutes

  return {
    aud: 'http://auth.wedotakeaway.com/auth/realms/we-do-takeaway',
    azp: 'web-client',
    exp: now + expireSeconds,
    iat: expiresInMinutes > 0 ? now : now - 10000,
    iss: 'http://auth.wedotakeaway.com/auth/realms/we-do-takeaway',
    jti: uuidv4(),
    scope: 'openid profile email',
    session_state: uuidv4(),
    sub: uuidv4(),
    typ: 'Refresh',
  }
}

export const getTokenResponse = (expiresInMinutes = 60): TokenResponse => {
  const access_token = jwt.sign(
    generateAccessToken(expiresInMinutes),
    privateKey,
    {
      algorithm: 'RS256',
    }
  )

  const refresh_token = jwt.sign(
    generateRefreshToken(expiresInMinutes),
    privateKey,
    {
      algorithm: 'RS256',
    }
  )

  const id_token = jwt.sign(generateIDToken(expiresInMinutes), privateKey, {
    algorithm: 'RS256',
  })

  return {
    access_token,
    expires_in: expiresInMinutes * 60,
    refresh_expires_in: 1800,
    refresh_token,
    token_type: 'bearer',
    id_token,
    not_before_policy: 0,
    session_state: uuidv4(),
    scope: 'openid profile email',
  }
}
