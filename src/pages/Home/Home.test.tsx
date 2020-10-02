import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'

import { UserContext, UserType } from '../../contexts'
import { Home } from '.'

describe('Home Page', () => {
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
          <Home />
        </Router>
      </UserContext.Provider>
    )
  })

  it('renders the welcome message', () => {
    expect(wrapper.getByText(/Welcome to We Do Takeaway/i)).toBeInTheDocument()
  })
})
