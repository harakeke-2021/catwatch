import React from 'react'
import { Route } from 'react-router'

import Feed from './features/feed/Feed'
import Camera from './features/camera/Camera'
import Nav from './features/nav/Nav'
import Register from './features/auth/Register'
import Login from './features/auth/Login'
import { AuthProvider } from './features/auth/GetAuthState'
import PrivateRoute from './features/auth/PrivateRoute'
import User from './features/user/User'
import MapView from './features/map/MapView'
import Geolocation from './features/map/Geolocation'

import './style.css'
import '@fortawesome/fontawesome-free/css/all.css'

export default function App () {
  return (<>
    <AuthProvider>
      <div className="fixed flex flex-col h-full">
        <Nav>
          <PrivateRoute exact path="/" component={Feed}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/register" component={Register}/>
          <Route path="/user" component={User}/>
          <Route exact path="/map" component={MapView}/>
          <Route path='/camera' component={Camera}/>
        </Nav>
      </div>
    </AuthProvider>
  </>)
}
