import React from 'react'
import { ApolloProvider } from '@apollo/client'
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'

import { UserProvider } from './contexts'
import { client } from './graphql'
import { HomePage, MenuPage } from './pages'

const App: React.FC = () => (
  <UserProvider>
    <ApolloProvider client={client}>
      <CssBaseline />
      <Router>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/menu/:menuId" component={MenuPage} />
      </Router>
    </ApolloProvider>
  </UserProvider>
)

export default App
