/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'
import 'leaflet/dist/leaflet.css'
require('dotenv').config()

if (module.hot) {
  module.hot.accept()
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const sw = './sw.js'
    navigator.serviceWorker.register(sw)
  })
}

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)
