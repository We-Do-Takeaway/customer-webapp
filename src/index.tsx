import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

declare global {
  interface Window {
    _env_: any
  }
}

// eslint-disable-next-line no-underscore-dangle
window._env_ = window._env_ || {}

ReactDOM.render(<App />, document.getElementById('root'))
