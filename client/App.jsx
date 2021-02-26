import React from 'react'
import { Route } from 'react-router'

import Feed from './features/feed/Feed'
import Camera from './features/camera/Camera'
import Nav from './features/nav/Nav'

import './style.css'
import '@fortawesome/fontawesome-free/css/all.css'

export default function App () {
  return (<>
    <div className="flex flex-col h-screen">
      <Nav>
        <Route exact path="/" component={Feed}/>
        <Route path='/capture' component={Camera}/>
      </Nav>
    </div>
  </>)
}
