import React from 'react'
import { Route } from 'react-router'
import Feed from './features/feed/Feed'
import Header from './features/nav/Header'
import Footer from './features/nav/Footer'
import MapView from './features/map/MapView'

import './style.css'

export default function App () {
  return (<>
    <div className="flex flex-col h-screen">
      <Header />
      <Route path="/" component={Feed}/>
      <Footer />
      <MapView />
    </div>

  </>)
}
