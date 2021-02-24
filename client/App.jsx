import React from 'react'
import { Route } from 'react-router'
import Feed from './features/feed/Feed'

import './style.css'

export default function App () {
  return (<>
    <Route path="/" component={Feed}/>
  </>)
}
