import { configureStore } from '@reduxjs/toolkit'
import feedSlice from './features/feed/feedSlice'

const store = configureStore({
  reducer: {
    feed: feedSlice
  }
})

export default store
