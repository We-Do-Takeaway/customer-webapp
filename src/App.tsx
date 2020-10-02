import React from 'react'
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'

import { UserProvider } from './contexts'
import { Home } from './pages'

const App: React.FC = () => (
  <UserProvider>
    <CssBaseline />
    <Router>
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>
      <Route exact path="/home" component={Home} />
    </Router>
  </UserProvider>
)

export default App
