import React from 'react'
import { ApolloProvider } from '@apollo/client'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import { AuthClientTokens } from '@react-keycloak/core/lib/types'
import { ReactKeycloakProvider } from '@react-keycloak/web'

import { keycloak, LogoutPage } from './auth'

import { client } from './graphql'
import { HomePage, MenuPage } from './pages'

const tokenLogger = (tokens: AuthClientTokens) => {
  const token = tokens.token

  if (token) {
    localStorage.setItem('token', token)
  }
}

const App: React.FC = () => (
  <ReactKeycloakProvider authClient={keycloak} onTokens={tokenLogger}>
    <ApolloProvider client={client}>
      <CssBaseline />
      <Router>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/menu/:menuId" component={MenuPage} />
        <Route exact path="/logout" component={LogoutPage} />
      </Router>
    </ApolloProvider>
  </ReactKeycloakProvider>
)

export default App
