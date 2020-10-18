import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router'
import { RouteComponentProps } from 'react-router-dom'

import { hasRoles, hasToken, UserContext } from '../index'

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

  if (!isAuthed) {
    return (
      <Redirect
        to={{
          pathname: '/login',
        }}
      />
    )
  }

  if (!hasPermission) {
    return (
      <Redirect
        to={{
          pathname: '/unauthorised',
        }}
      />
    )
  }

  return <Route {...props} />
}
