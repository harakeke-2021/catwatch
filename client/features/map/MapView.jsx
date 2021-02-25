import React from 'react'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import Markers from './Markers'

export default function MapView () {
  return (

    <MapContainer center={{ lat: '-36.87723822443632', lng: '174.76421797903905' }} zoom={13}>

      <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png" />
      <Markers/>
    </MapContainer>

  )
}
