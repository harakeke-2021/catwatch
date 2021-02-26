import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import Markers from './Markers'
import data from '../../static/data.json'

const { places } = data
export default function MapView () {
  // const [state, setState] = useState({
  //   currentLocation: { lat: '0', lng: '0' },
  //   zoom: 13
  // })

  // useEffect(() => {
  //   navigator.geolocation
  //     .getCurrentPosition(
  //       (position) => {
  //         setState({
  //           ...state,
  //           currentLocation: {
  //             lat: position.coords.latitude,
  //             lng: position.coords.longitude
  //           }
  //         })
  //       },
  //       (error) => {
  //         console.log(error)
  //       },

  //       {
  //         enableHighAccuracy: true
  //       }
  //     )
  // }, [])
  const [state, setState] = useState({
    longitude: '174.77568721075158',
    latitude: '-36.864655622742752'
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
  }, [])

  const geoLat = state.latitude
  const geoLng = state.longitude

  console.log(geoLat)
  console.log(geoLng)

  return (

    <MapContainer center={{ lat: geoLat, lng: geoLng }} zoom={13}>

      <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png" />
      <Markers places={places}/>
    </MapContainer>

  )
}
