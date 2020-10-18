import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { getTokenResponse } from '../../test'
import { TokenResponse, UserProvider } from '..'
import * as FetchToken from '../token/fetchToken'
import { ProtectedRoute } from './ProtectedRoute'

jest.useFakeTimers()

const ProtectedTestComponent = () => <h1 data-testid="protected">Protected</h1>
const LoginComponent = () => <h1 data-testid="login">Login</h1>

// fake redirect

describe('ProtectedRoute', () => {
  let wrapper: RenderResult

  beforeEach(() => {
    localStorage.clear()
    jest.clearAllTimers()
  })

  describe('When the user is logged in and we try to access a protected route', () => {
    let fakeTokenResponse: TokenResponse | undefined

    beforeEach(() => {
      fakeTokenResponse = getTokenResponse()
      // @ts-ignore
      FetchToken.fetchToken = jest.fn().mockResolvedValue(fakeTokenResponse)

      localStorage.setItem('token', fakeTokenResponse.access_token)
      localStorage.setItem('refresh_token', fakeTokenResponse.refresh_token)

      wrapper = render(
        <UserProvider>
          <Router>
            <ProtectedRoute exact path="/" component={ProtectedTestComponent} />
            <Route exact path="/login" component={LoginComponent} />
          </Router>
        </UserProvider>
      )
    })

    it('should show the protected content', () => {
      expect(wrapper.getByTestId('protected')).toBeVisible()
    })
  })

  describe('When the user is not logged in and we try to access a protected route', () => {
    let fakeTokenResponse: TokenResponse | undefined

    beforeEach(() => {
      fakeTokenResponse = getTokenResponse()
      // @ts-ignore
      FetchToken.fetchToken = jest.fn().mockResolvedValue(fakeTokenResponse)

      wrapper = render(
        <UserProvider>
          <Router>
            <ProtectedRoute exact path="/" component={ProtectedTestComponent} />
            <Route exact path="/login" component={LoginComponent} />
          </Router>
        </UserProvider>
      )
    })

    it('show the login page', () => {
      expect(wrapper.getByTestId('login')).toBeVisible()
    })
  })
})
