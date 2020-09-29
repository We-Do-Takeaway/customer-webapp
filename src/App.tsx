import React from 'react'
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'

import { Home } from './pages'

const App: React.FC = () => (
  <Router>
    <Route exact path="/">
      <Redirect to="/home" />
    </Route>
    <Route exact path="/home" component={Home} />
  </Router>
)

export default App
