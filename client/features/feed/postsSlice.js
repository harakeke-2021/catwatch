import { createAsyncThunk, createSlice, createEntityAdapter, createSelector } from '@reduxjs/toolkit'
import app from '../../firebase'

const postsAdapter = createEntityAdapter()

const initialState = postsAdapter.getInitialState({
  loading: false
})

export const fetchPosts = createAsyncThunk('feed/fetchPosts', async () => {
  console.log('fetching')
  const sightingsRef = app.firestore().collection('sightings')
  const snapshot = await sightingsRef.get()
  const data = snapshot.docs.map(doc =>  ({ id: doc.id, ...doc.data() }))
  console.log('data', data)
  return data
})

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.loading = true
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false
        console.log(action.payload)
        postsAdapter.setAll(state, action.payload)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        console.log('sadface')
      })
  }
})


export default postsSlice.reducer

export const {
  selectAll: selectPosts,
  selectById: selectPostsById
} = postsAdapter.getSelectors(state => state.posts)

export const selectPostIds = createSelector(
  selectPosts,
  posts => posts.map(post => post.id)
)