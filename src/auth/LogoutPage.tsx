import { useKeycloak } from '@react-keycloak/web'
import React, { useCallback } from 'react'
import { Redirect, useLocation } from 'react-router-dom'

export const LogoutPage: React.FC = () => {
  const location = useLocation<{ [key: string]: unknown }>()
  const currentLocationState = location.state || {
    from: { pathname: '/home' },
  }

  const { keycloak } = useKeycloak()

  const logout = useCallback(() => {
    keycloak?.logout()
  }, [keycloak])

  if (keycloak?.authenticated) {
    return <Redirect to={currentLocationState?.from as string} />
  }

  logout()

  return <p>Logging out..</p>
}
