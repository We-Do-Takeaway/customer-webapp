import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import 'antd/dist/antd.css'

declare global {
  interface Window {
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
