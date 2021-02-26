import React from 'react'
import { Route } from 'react-router'
import Feed from './features/feed/Feed'
import Nav from './features/nav/Nav'

import './style.css'
import '@fortawesome/fontawesome-free/css/all.css'

export default function App () {
  return (<>
    <div className="flex flex-col h-screen">
      <Nav>
        <Route path="/" component={Feed}/>
      </Nav>
    </div>

  </>)
}
