import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit'
import app from '../../firebase'

export const adjustLater = createAsyncThunk('feed/adjustLater', async (amount) => {
  return Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(amount)
    }, 1000)
  })
})

const postsAdapter = createEntityAdapter()

const initialState = postsAdapter.getInitialState({
  loading: false
})

export const fetchPosts = createAsyncThunk('feed/fetchPosts', async () => {
  const sightings = await app.firestore().collection('sightings')
})

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    postDeleted: postsAdapter.removeOne,
  },
  extraReducers: builder => {
    builder
      .addCase(adjustLater.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(adjustLater.fulfilled, (state, action) => {
        state.value = action.payload
      })
      .addCase(fetchPosts.pending, (state, action) => {
        state.loading = true
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false
        postsAdapter.setAll(state, action.payload)
      })
  }
})

export default feedSlice.reducer
export const {
  increment,
  decrement,
  adjust,
  set
} = feedSlice.actions
