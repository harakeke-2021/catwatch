import React, { useEffect, useState } from 'react'

const Geolocation = () => {
  const [state, setState] = useState({
    longitude: 0,
    latitude: 0
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
  })
  return (
    <div>
      <h1>Geolocation</h1>
      <p>Longitude: {state.longitude}</p>
      <p>Latitude: {state.latitude}</p>
    </div>
  )
}

export default Geolocation
