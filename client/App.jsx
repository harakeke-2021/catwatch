import React from 'react'
import { Route } from 'react-router'
import Feed from './features/feed/Feed'
import Header from './features/nav/Header'
import Footer from './features/nav/Footer'
import MapView from './features/map/MapView'
import Geolocation from './features/map/Geolocation'
import Router from 'react-dom'

import './style.css'

export default function App () {
  return (<>
    <div className="flex flex-col h-screen">
      <Header />
      <Geolocation />
      <Route exact path="/" component={Feed}/>
      <Route exact path="/map" component={MapView}/>
      <Footer />
    </div>

  </>)
}
