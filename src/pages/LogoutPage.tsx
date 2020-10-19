import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'

import { UserContext } from '../auth'

export const LogoutPage = () => {
  const { logout, user } = useContext(UserContext)

  logout()

  if (user) {
    return <p>Logging off</p>
  }

  return (
    <Redirect
      to={{
        pathname: '/login',
      }}
    />
  )
}
