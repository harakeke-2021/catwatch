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
  navigator.serviceWorker.register('./sw.js')
}

if ('serviceWorker' in navigator) {
  console.log('CLIENT: service worker registration in progress.')
  navigator.serviceWorker.register('./sw.js').then(function () {
    console.log('CLIENT: service worker registration complete.')
  }, function () {
    console.log('CLIENT: service worker registration failure.')
  })
} else {
  console.log('CLIENT: service worker is not supported.')
}

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)
