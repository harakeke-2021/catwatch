import React from 'react'
import { render } from 'react-dom'
import { HashRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import App from './App'
import store from './store'
import 'leaflet/dist/leaflet.css'

if (module.hot) {
  module.hot.accept()
}

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)
