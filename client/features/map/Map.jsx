import React, { useState, useEffect } from 'react'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import 'leaflet.heat'
import { addressPoints } from '../../static/addressPoints'
export default function Map () {
  const [state, setState] = useState({
    longitude: '',
    latitude: ''
  })
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        setState({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude
        })
      }, function (error) { console.log(error) },

      {
        enableHighAccuracy: true
      }
    )
    var map = L.map('map', { doubleClickZoom: false }).locate({ setView: true, maxZoom: 16 })
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map)
    const points = addressPoints
      ? addressPoints.map((p) => {
        return [p[0], p[1], '3.0']
      })
      : []
    L.heatLayer(points, { radius: 30, gradient: { 0.0: '#FBCFE8', 0.3: '#EC4899', 1.0: '#818CF8' }, blur: 30 }).addTo(map)
  }, [])

  return (
    <div id="map" style={{ height: '100vh' }}></div>

  )
}
