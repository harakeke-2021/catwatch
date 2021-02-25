import { configureStore } from '@reduxjs/toolkit'

import feedSlice from './features/feed/feedSlice'
import cameraSlice from './features/camera/camProtoSlice'

const store = configureStore({
  reducer: {
    feed: feedSlice,
    camera: cameraSlice
  }
})

export default store
