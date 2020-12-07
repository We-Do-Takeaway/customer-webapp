import React from 'react'
import { ApolloProvider } from '@apollo/client'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import { AuthClientTokens } from '@react-keycloak/core/lib/types'
import { ReactKeycloakProvider } from '@react-keycloak/web'

import { keycloak, LogoutPage } from './auth'
import { BasketProvider } from './contexts'
import { client } from './graphql'
import { BasketPage, HomePage, MenuPage } from './pages'

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
          <Route exact path="/" component={HomePage} />
          <Route exact path="/home" component={HomePage} />
          <Route exact path="/menu/:menuId" component={MenuPage} />
          <Route exact path="/basket" component={BasketPage} />
          <Route exact path="/logout" component={LogoutPage} />
        </Router>
      </BasketProvider>
    </ReactKeycloakProvider>
  </ApolloProvider>
)

export default App
