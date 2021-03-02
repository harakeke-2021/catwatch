import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import L from 'leaflet'
import 'leaflet.heat'
import 'leaflet/dist/leaflet.css'

import { addressPoints } from '../../static/addressPoints'
import { getAllSightingLocations, updateLocation } from './geolocHelper'

export default function Map () {
  const dispatch = useDispatch()

  getAllSightingLocations()
    .then(data => console.log(data))
    .catch(err => console.error(err))

  useEffect(() => {
    const map = L.map('map', { doubleClickZoom: false })
    const points = addressPoints || []

    map.locate({ setView: true, maxZoom: 16 })
    map.once('locationfound', (evt) => updateLocation(dispatch, evt))

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map)
    L.heatLayer(points).addTo(map)
  }, [])

  return (
    <div id="map" style={{ height: '100vh' }}></div>
  )
}
