import React from 'react'
import { Route, useRouteMatch } from 'react-router'

import Feed from './features/feed/Feed'
import Camera from './features/camera/Camera'
import Nav from './features/nav/Nav'
import Register from './features/auth/Register'
import Login from './features/auth/Login'
import { AuthProvider } from './features/auth/GetAuthState'
import PrivateRoute from './features/auth/PrivateRoute'
import User from './features/user/User'
import MapView from './features/map/MapView'
import Splash from './features/splash/Splash'

import './style.css'
import '@fortawesome/fontawesome-free/css/all.css'

export default function App () {
  const splashRoute = useRouteMatch({ path: '/', exact: true })
  return (<>
    <AuthProvider>
      <div className="fixed flex flex-col w-full h-full">
        <Nav display={!splashRoute}>
          <PrivateRoute exact path="/" component={Splash}/>
          <Route exact path="/feed" component={Feed}/>
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
