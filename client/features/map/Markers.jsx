import React from 'react'
import { Marker } from 'react-leaflet'
import { IconLocation } from './IconLocation'


// import data from '../../static/data.json'
// const { places } = JSON.parse(data)

const Markers = (props) => {
  const { places } = props
  const markers = places.map((place, i) => (
    <Marker key={i} position={place.geometry} icon={IconLocation} />
  ))
  return markers
}

export default Markers
