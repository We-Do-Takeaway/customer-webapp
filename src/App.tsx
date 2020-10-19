import React from 'react'
import { ApolloProvider } from '@apollo/client'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'

import { client } from './graphql'
import {
  HomePage,
  LoginPage,
  LogoutPage,
  MenuPage,
  UnauthorisedPage,
} from './pages'
import { ProtectedRoute, UserProvider } from './auth'

const App: React.FC = () => (
  <UserProvider>
    <ApolloProvider client={client}>
      <CssBaseline />
      <Router>
        <ProtectedRoute exact path="/" component={HomePage} />
        <ProtectedRoute exact path="/home" component={HomePage} />
        <ProtectedRoute exact path="/menu/:menuId" component={MenuPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/logout" component={LogoutPage} />
        <Route exact path="/unauthorised" component={UnauthorisedPage} />
      </Router>
    </ApolloProvider>
  </UserProvider>
)

export default App
