import React from 'react'
import { Route } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import Feed from './features/feed/Feed'
import Nav from './features/nav/Nav'
import Register from './features/Auth/Register'
import Login from './features/Auth/Login'
import { AuthProvider } from './features/Auth/getAuthState'
import PrivateRoute from './features/Auth/PrivateRoute'

import './style.css'

export default function App () {
  return (<>
    <AuthProvider>
      <Router>
        <div className="flex flex-col h-screen">
          <Nav>
            <PrivateRoute exact path="/" component={Feed}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
          </Nav>
        </div>
      </Router>
    </AuthProvider>
  </>)
}
