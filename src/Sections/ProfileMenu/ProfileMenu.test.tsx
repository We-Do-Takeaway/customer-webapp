import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'

import { ProfileMenu } from '.'
import { LoginParams, UserContext } from '../../auth'

describe('Profile Menu', () => {
  let wrapper: RenderResult
  let logout: jest.Mock<any, any>

  beforeEach(() => {
    logout = jest.fn()

    wrapper = render(
      <UserContext.Provider
        value={{
          user: {
            email: 'fred@test.com',
            email_verified: true,
            family_name: 'Test',
            given_name: 'Fred',
            name: 'Fred Test',
            preferred_username: 'fred@test.com',
            realm_access: {
              roles: [],
            },
            resource_access: {
              account: {
                roles: [],
              },
            },
          },
          authenticating: false,
          error: undefined,
          // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
          login: (params: LoginParams) => {
            return new Promise((resolve) => {
              resolve()
            })
          },
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          logout,
        }}
      >
        <Router>
          <ProfileMenu />
        </Router>
      </UserContext.Provider>
    )
  })

  it('includes the user email details', () => {
    const profileMenuEmailElement = wrapper.getByTestId(
      'profile-menu__user-email'
    )
    expect(profileMenuEmailElement).toBeInTheDocument()
    expect(profileMenuEmailElement).toHaveTextContent('fred@test.com')
  })
})
