import { configureStore } from '@reduxjs/toolkit'

import cameraSlice from './features/camera/camProtoSlice'
import postsSlice from './features/feed/postsSlice'
import usersSlice from './features/user/usersSlice'

const store = configureStore({
  reducer: {
    posts: postsSlice,
    camera: cameraSlice,
    users: usersSlice
  }
})

export default store
