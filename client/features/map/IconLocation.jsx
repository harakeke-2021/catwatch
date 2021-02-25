import { L } from 'leaflet'

export const IconLocation = L.icon({
  iconUrl: require('dist/Icon.svg'),
  iconRetinaUrl: require('dist/Icon.svg'),
  iconAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [35, 35],
  className: 'leaflet-venue-icon'
})

//cannot import the icon x.x