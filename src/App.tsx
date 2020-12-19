import React from 'react'
import { ApolloProvider } from '@apollo/client'
import { BrowserRouter as Router } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import { AuthClientTokens } from '@react-keycloak/core/lib/types'
import { ReactKeycloakProvider } from '@react-keycloak/web'

import { keycloak, LogoutPage } from './auth'
import { BasketProvider } from './contexts'
import { client } from './graphql'
import { BasketPage, HomePage, MenuPage } from './pages'
import { RouteWithLayout } from './utils'
import { HeaderContent } from './layouts'

const tokenLogger = (tokens: AuthClientTokens) => {
  const token = tokens.token

  if (token) {
    localStorage.setItem('token', token)
  } else {
    localStorage.removeItem('token')
  }
}

const App: React.FC = () => (
  <ApolloProvider client={client}>
    <ReactKeycloakProvider authClient={keycloak} onTokens={tokenLogger}>
      <BasketProvider>
        <CssBaseline />
        <Router>
          <RouteWithLayout
            exact
            path="/"
            layout={HeaderContent}
            component={HomePage}
          />
          <RouteWithLayout
            exact
            path="/home"
            layout={HeaderContent}
            component={HomePage}
          />
          <RouteWithLayout
            exact
            path="/menu/:menuId"
            layout={HeaderContent}
            component={MenuPage}
          />
          <RouteWithLayout
            exact
            path="/basket"
            layout={HeaderContent}
            component={BasketPage}
          />
          <RouteWithLayout
            exact
            path="/logout"
            layout={HeaderContent}
            component={LogoutPage}
          />
        </Router>
      </BasketProvider>
    </ReactKeycloakProvider>
  </ApolloProvider>
)

export default App
