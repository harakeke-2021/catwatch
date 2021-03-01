import { configureStore } from '@reduxjs/toolkit'

import cameraSlice from './features/camera/camProtoSlice'
import postsSlice from './features/feed/postsSlice'

const store = configureStore({
  reducer: {
    posts: postsSlice,
    camera: cameraSlice
  }
})

export default store
