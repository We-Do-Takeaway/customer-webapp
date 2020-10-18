import { getLocalRefreshToken, getLocalToken } from './localToken'
import { getTokenResponse } from '../../test'

describe('LocalToken', () => {
  beforeEach(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('refresh_token')
  })

  describe('When there is no local token data in local storage', () => {
    it('returns undefined for token', () => {
      expect(getLocalToken()).toBeUndefined()
    })

    it('returns undefined for refresh token', () => {
      expect(getLocalRefreshToken()).toBeUndefined()
    })
  })

  describe('When there are valid tokens in local storage', () => {
    let token: string | undefined
    let refresh_token: string | undefined

    beforeEach(() => {
      const fakeTokenResponse = getTokenResponse()

      token = fakeTokenResponse.access_token
      refresh_token = fakeTokenResponse.refresh_token

      localStorage.setItem('token', fakeTokenResponse.access_token)
      localStorage.setItem('refresh_token', fakeTokenResponse.refresh_token)
    })

    it('returns the token', () => {
      expect(getLocalToken()).toEqual(token)
    })

    it('returns the refresh token', () => {
      expect(getLocalRefreshToken()).toEqual(refresh_token)
    })
  })

  describe('When there are expired tokens in localstorage', () => {
    beforeEach(() => {
      const fakeTokenResponse = getTokenResponse(-60)
      localStorage.setItem('token', fakeTokenResponse.access_token)
      localStorage.setItem('refresh_token', fakeTokenResponse.refresh_token)
    })

    it('returns undefined for token', () => {
      expect(getLocalToken()).toBeUndefined()
    })

    it('returns undefined for refresh token', () => {
      expect(getLocalRefreshToken()).toBeUndefined()
    })

    it('clear the token from local storage', () => {
      expect(localStorage.removeItem).toBeCalledWith('token')
    })

    it('clear the refresh token from local storage', () => {
      expect(localStorage.removeItem).toBeCalledWith('refresh_token')
    })
  })
})
