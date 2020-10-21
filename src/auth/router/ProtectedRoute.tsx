import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router'
import { RouteComponentProps, useLocation } from 'react-router-dom'

import { hasRoles, hasToken, UserContext } from '../index'
import { log } from '../utils'

interface Props {
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>
  path: string
  exact?: boolean
  requiredRoles?: string[]
}

export const ProtectedRoute: React.FC<Props> = ({
  requiredRoles = [],
  ...props
}) => {
  const { user } = useContext(UserContext)
  const isAuthed = hasToken()
  const hasPermission = user && hasRoles(user, requiredRoles) && hasToken()
  const location = useLocation()

  // If the user has requested 'This' page
  if (props.path === location.pathname) {
    // and they are not authenticated, goto login
    if (!isAuthed) {
      log.debug('ProtectedRout:Unauthenticated:RedirectToLogin')

      // Redirect to login
      return (
        <Redirect
          to={{
            pathname: '/login',
          }}
        />
      )
    }

    // and they are not permitted, tell them
    if (!hasPermission) {
      log.debug('ProtectedRoute:Not Permitted')

      return (
        <Redirect
          to={{
            pathname: '/unauthorised',
          }}
        />
      )
    }
  }

  log.debug('ProtectedRoute:OK')

  // Either not the current page, so we don't care, or permitted
  return <Route {...props} />
}
