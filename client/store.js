import { configureStore } from '@reduxjs/toolkit'

import feedSlice from './features/feed/feedSlice'
import cameraSlice from './features/camera/camProtoSlice'
import geolocSlice from './features/map/geolocSlice'

const store = configureStore({
  reducer: {
    feed: feedSlice,
    camera: cameraSlice,
    geoloc: geolocSlice
  }
})

export default store
