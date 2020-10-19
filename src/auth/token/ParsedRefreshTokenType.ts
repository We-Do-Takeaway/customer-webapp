export interface ParsedRefreshToken {
  exp: number
  iat: number
  jti: string
  iss: string
  aud: string
  sub: string
  typ: 'refresh'
  azp: string
  session_state: string
  scope: string
}
