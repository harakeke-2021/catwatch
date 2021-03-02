import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import L from 'leaflet'
import 'leaflet.heat'
import 'leaflet/dist/leaflet.css'

import { fetchPosts, selectPosts } from '../feed/postsSlice'
import { updateLocation } from './geolocHelper'

export default function Map () {
  const posts = useSelector(selectPosts)
  const map = L.map('map', { doubleClickZoom: false })

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPosts())
  }, [])

  useEffect(() => {
    map.locate({ setView: true, maxZoom: 16 })
    map.once('locationfound', (evt) => updateLocation(dispatch, evt))

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map)
  }, [])

  useEffect(() => {
    const points = posts.filter(post => !!post.location)
      .map(post => {
        const { latitude, longitude } = post.location
        return [latitude, longitude]
      })

    L.heatLayer(points).addTo(map)
  }, [posts])

  return (
    <div id="map" style={{ height: '100vh' }}></div>
  )
}
