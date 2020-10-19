import fetch from 'jest-fetch-mock'

import { getTokenResponse } from '../../test'
import { fetchToken } from '.'

const fakeTokenResponse = getTokenResponse()

describe('fetchToken', () => {
  let result: any

  beforeEach(() => {
    fetch.resetMocks()
  })

  describe('When the user logs in', () => {
    beforeEach(async () => {
      fetch.mockResponseOnce(JSON.stringify(fakeTokenResponse))

      result = await fetchToken({ username: 'ztolley', password: 'password' })
    })

    it('generate a url based on the base url, realm and protocol', () => {
      expect(fetch.mock.calls[0][0]).toEqual(
        'http://localhost/auth/realms/my-realm/protocol/openid-connect/token'
      )
    })

    it('generates the correct base fields and values for login on the JWT server', () => {
      const body = fetch.mock.calls[0][1]?.body as FormData

      expect(body.get('client_id')).toEqual('my-client')
      expect(body.get('scope')).toEqual('openid')
    })

    it('informs the server it wishes to authenticate using name and password', () => {
      const body = fetch.mock.calls[0][1]?.body as FormData

      expect(body.get('grant_type')).toEqual('password')
      expect(body.get('username')).toEqual('ztolley')
      expect(body.get('password')).toEqual('password')
    })

    it('responds with valid data', () => {
      expect(result).toEqual(fakeTokenResponse)
    })
  })

  describe('When the token is to be refreshed', () => {
    beforeEach(async () => {
      fetch.mockResponseOnce(JSON.stringify(fakeTokenResponse))

      result = await fetchToken({ refresh_token: '1234' })
    })

    it('generate the correct base fields and values for login on the JWT server', () => {
      const body = fetch.mock.calls[0][1]?.body as FormData

      expect(body.get('client_id')).toEqual('my-client')
      expect(body.get('scope')).toEqual('openid')
    })

    it('inform the server it wishes to authenticate a token', () => {
      const body = fetch.mock.calls[0][1]?.body as FormData

      expect(body.get('grant_type')).toEqual('refresh_token')
      expect(body.get('refresh_token')).toEqual('1234')
    })

    it('respond with valid data', () => {
      expect(result).toEqual(fakeTokenResponse)
    })
  })

  describe('when the credentials are invalid', () => {
    beforeEach(async () => {
      fetch.mockResponseOnce(
        JSON.stringify({
          error: 'invalid_grant',
          error_description: 'Invalid user credentials',
        }),
        { status: 401 }
      )
    })

    it('throw an exception', async () => {
      try {
        await fetchToken({
          username: 'ztolley',
          password: 'password',
        })

        expect(false).toEqual(true)
        // eslint-disable-next-line no-empty
      } catch (e) {}
    })
  })
})
