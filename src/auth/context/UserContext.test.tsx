import React, { useContext } from 'react'
import { render, RenderResult } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

import { getTokenResponse } from '../../test'
import { TokenResponse } from '../token'
import * as FetchToken from '../token/fetchToken'
import { UserContext, UserProvider } from './UserContext'

jest.useFakeTimers()

const TestComponent = () => {
  const { login, logout, user } = useContext(UserContext)

  const onLogin = () => {
    login({ username: 'fred', password: 'password' })
  }

  const onLogout = () => {
    logout()
  }

  return (
    <>
      <button type="button" data-testid="login-button" onClick={onLogin}>
        Login
      </button>

      <button type="button" data-testid="logout-button" onClick={onLogout}>
        Logout
      </button>
      <div data-testid="user-email">{user?.email}</div>
    </>
  )
}

describe('UserContext', () => {
  let wrapper: RenderResult

  beforeEach(() => {
    localStorage.clear()
    jest.clearAllTimers()
    FetchToken.logoutToken = jest.fn()
  })

  describe('When the browser does not have a token in local storage', () => {
    let fakeTokenResponse: TokenResponse | undefined

    beforeEach(() => {
      fakeTokenResponse = getTokenResponse()

      // @ts-ignore
      FetchToken.fetchToken = jest.fn().mockResolvedValue(fakeTokenResponse)
    })

    describe('and the user logs in', () => {
      beforeEach(async () => {
        wrapper = render(
          <UserProvider>
            <TestComponent />
          </UserProvider>
        )

        const loginButton = await wrapper.getByTestId('login-button')
        await act(async () => {
          await loginButton.click()
        })
      })

      it('call the token fetcher with the login details', () => {
        expect(FetchToken.fetchToken).toBeCalled()
      })

      it('store the retrieved token in local storage', () => {
        expect(localStorage.setItem).toBeCalledWith(
          'token',
          fakeTokenResponse?.access_token
        )
      })

      it('store the refresh token in local storage', () => {
        expect(localStorage.setItem).toBeCalledWith(
          'refresh_token',
          fakeTokenResponse?.refresh_token
        )
      })

      it('show the user details associated with the token', () => {
        expect(wrapper.getByTestId('user-email')).toContainHTML(
          'zac@thetolleys.com'
        )
      })

      it('create a timer based on the expires value', () => {
        expect(setTimeout).toHaveBeenLastCalledWith(
          expect.any(Function),
          300000
        )
      })

      describe('after any timers have fired', () => {
        beforeEach(async () => {
          await act(async () => {
            await jest.runOnlyPendingTimers()
          })
        })

        it('the token is refreshed', () => {
          expect(FetchToken.fetchToken).toBeCalledWith({
            refresh_token: fakeTokenResponse?.refresh_token,
          })
        })
      })

      describe('when the user logs out', () => {
        beforeEach(async () => {
          const logoutButton = await wrapper.getByTestId('logout-button')

          await act(async () => {
            await logoutButton.click()
            await jest.runOnlyPendingTimers()
          })
        })

        it('clear the token from local storage', () => {
          expect(localStorage.removeItem).toBeCalledWith('token')
        })

        it('clear the refresh token from local storage', () => {
          expect(localStorage.removeItem).toBeCalledWith('refresh_token')
        })

        it('clears the user in the context', () => {
          expect(wrapper.getByTestId('user-email')).not.toContainHTML(
            'zac@thetolleys.com'
          )
        })

        it('call the auth server to logout', () => {
          expect(FetchToken.logoutToken).toBeCalledWith({
            refresh_token: fakeTokenResponse?.refresh_token,
          })
        })

        describe('after any timers have fired', () => {
          beforeEach(async () => {
            await act(async () => {
              await jest.runOnlyPendingTimers()
            })
          })

          it('the token is not refreshed', () => {
            expect(FetchToken.fetchToken).toBeCalledTimes(1)
          })
        })
      })
    })
  })

  describe('When the browser already has an expired token', () => {
    beforeEach(() => {
      const fakeTokenResponse = getTokenResponse(-60)

      // @ts-ignore
      FetchToken.fetchToken = jest.fn().mockResolvedValue(fakeTokenResponse)

      localStorage.setItem('token', fakeTokenResponse.access_token)
      localStorage.setItem('refresh_token', fakeTokenResponse.refresh_token)

      wrapper = render(
        <UserProvider>
          <TestComponent />
        </UserProvider>
      )
    })

    it('clear the token from local storage', () => {
      expect(localStorage.removeItem).toBeCalledWith('token')
    })

    it('clear the refresh token from local storage', () => {
      expect(localStorage.removeItem).toBeCalledWith('refresh_token')
    })

    it('clears the user in the context', () => {
      expect(wrapper.getByTestId('user-email')).not.toContainHTML(
        'zac@thetolleys.com'
      )
    })

    describe('after any timers have fired', () => {
      beforeEach(async () => {
        await act(async () => {
          await jest.runOnlyPendingTimers()
        })
      })

      it('the token is not refreshed', () => {
        expect(FetchToken.fetchToken).not.toBeCalled()
      })
    })
  })

  describe('When the browser already has a valid token', () => {
    let fakeTokenResponse: TokenResponse | undefined

    beforeEach(() => {
      fakeTokenResponse = getTokenResponse()

      // @ts-ignore
      FetchToken.fetchToken = jest.fn().mockResolvedValue(fakeTokenResponse)

      localStorage.setItem('token', fakeTokenResponse.access_token)
      localStorage.setItem('refresh_token', fakeTokenResponse.refresh_token)

      wrapper = render(
        <UserProvider>
          <TestComponent />
        </UserProvider>
      )
    })

    it('show the user details associated with the token', () => {
      expect(wrapper.getByTestId('user-email')).toContainHTML(
        'zac@thetolleys.com'
      )
    })

    describe('after any timers have fired', () => {
      beforeEach(async () => {
        await act(async () => {
          await jest.runOnlyPendingTimers()
        })
      })

      it('the token is refreshed', () => {
        expect(FetchToken.fetchToken).toBeCalledWith({
          refresh_token: fakeTokenResponse?.refresh_token,
        })
      })
    })

    describe('when the user logs out', () => {
      beforeEach(async () => {
        const logoutButton = await wrapper.getByTestId('logout-button')

        await act(async () => {
          await logoutButton.click()
          await jest.runOnlyPendingTimers()
        })
      })

      it('clear the token from local storage', () => {
        expect(localStorage.removeItem).toBeCalledWith('token')
      })

      it('clear the refresh token from local storage', () => {
        expect(localStorage.removeItem).toBeCalledWith('refresh_token')
      })

      it('clears the user in the context', () => {
        expect(wrapper.getByTestId('user-email')).not.toContainHTML(
          'zac@thetolleys.com'
        )
      })

      it('call the auth server to logout', () => {
        expect(FetchToken.logoutToken).toBeCalledWith({
          refresh_token: fakeTokenResponse?.refresh_token,
        })
      })

      describe('after any timers have fired', () => {
        beforeEach(async () => {
          await act(async () => {
            await jest.runOnlyPendingTimers()
          })
        })

        it('the token is not refreshed', () => {
          expect(FetchToken.fetchToken).not.toBeCalled()
        })
      })
    })
  })
})
