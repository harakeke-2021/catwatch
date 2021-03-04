import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import L from 'leaflet'
import 'leaflet.heat'
import 'leaflet/dist/leaflet.css'

import { fetchPosts, selectPosts } from '../feed/postsSlice'
import { getMapPoints, updateLocation } from './geolocHelper'

export default function Map () {
  const posts = useSelector(selectPosts)
  const [heatmap, setHeatMap] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPosts())
  }, [])

  useEffect(() => {
    const map = L.map('map', { doubleClickZoom: false })
    const points = getMapPoints(posts)
    const heatlayer = L.heatLayer(points, { radius: 30, maxZoom: 5, gradient: { 0.0: '#FBCFE8', 0.3: '#EC4899', 1.0: '#818CF8' }, blur: 15 })

    map.locate({ setView: true, maxZoom: 16 })
    map.once('locationfound', (evt) => updateLocation(dispatch, evt))

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map)
    heatlayer.addTo(map)

    setHeatMap(heatlayer)
  }, [])

  useEffect(() => {
    if (heatmap) heatmap.setLatLngs(getMapPoints(posts))
  }, [posts])

  return (
    <div id="map" style={{ height: '100vh' }}></div>
  )
}
