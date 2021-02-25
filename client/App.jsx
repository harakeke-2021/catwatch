import React from 'react'
import { Route } from 'react-router'
import Feed from './features/feed/Feed'
import Nav from './features/nav/Nav'
import Register from './features/Auth/Register'

import './style.css'

export default function App () {
  return (<>
    <div className="flex flex-col h-screen">
      <Nav>
        <Route path="/" component={Register}/>
      </Nav>
    </div>

  </>)
}
