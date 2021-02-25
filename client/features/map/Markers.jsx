import React from 'react'
import { Marker } from 'react-leaflet'

import { IconLocation } from './IconLocation'

export default function Markers () {
  return (
    <Marker position={{ lat: '-36.8750570540076', lng: '174.76811551843952', icon:{IconLocation} }} />
  )
}
