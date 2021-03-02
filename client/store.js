import { configureStore } from '@reduxjs/toolkit'

import cameraSlice from './features/camera/camProtoSlice'
import postsSlice from './features/feed/postsSlice'
import usersSlice from './features/user/usersSlice'
import geolocSlice from './features/map/geolocSlice'

const store = configureStore({
  reducer: {
    posts: postsSlice,
    camera: cameraSlice,
    users: usersSlice,
    geoloc: geolocSlice
  }
})

export default store
