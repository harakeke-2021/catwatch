import React from 'react'
import { Route } from 'react-router'
import Feed from './features/feed/Feed'
import Nav from './features/nav/Nav'
import Register from './features/Auth/Register'
import Login from './features/Auth/Login'

import './style.css'

export default function App () {
  return (<>
    <div className="flex flex-col h-screen">
      <Nav>
        <Route exact path="/" component={Register}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/register" component={Register}/>
      </Nav>
    </div>

  </>)
}
