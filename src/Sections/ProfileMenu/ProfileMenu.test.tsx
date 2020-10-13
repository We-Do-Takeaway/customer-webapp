import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'

import { UserContext, UserType } from '../../contexts'
import { ProfileMenu } from '.'

describe('Profile Menu', () => {
  let wrapper: RenderResult

  beforeEach(() => {
    const user: UserType = {
      email: 'fred@test.com',
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      logout: () => {},
      authenticated: true,
      // eslint-disable-next-line @typescript-eslint/camelcase
      realm_access: { roles: [] },
      // eslint-disable-next-line @typescript-eslint/camelcase
      resource_access: { account: { roles: [] } },
    }

    wrapper = render(
      <UserContext.Provider value={user}>
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
