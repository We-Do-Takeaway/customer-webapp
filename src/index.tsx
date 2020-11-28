import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _env_: any
  }
}

// eslint-disable-next-line no-underscore-dangle
window._env_ = window._env_ || {}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
