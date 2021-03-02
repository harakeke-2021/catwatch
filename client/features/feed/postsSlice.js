import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit'
import app from '../../firebase'
import { fetchUsers } from '../user/usersSlice'

const postsAdapter = createEntityAdapter()

const initialState = postsAdapter.getInitialState({
  loading: false
})

export const fetchPosts = createAsyncThunk('feed/fetchPosts', async (thought, { dispatch }) => {
  const sightingsRef = app.firestore().collection('sightings')
  const snapshot = await sightingsRef.get()
  const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  // const userIds = posts
  //   .map(p => p.userID)
  //   .filter((val, i, self) => self.indexOf(val) === i)
  dispatch(fetchUsers())
  return posts
})

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPosts.pending]: (state, action) => {
      state.loading = true
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.loading = false
      postsAdapter.setAll(state, action.payload)
    },
    [fetchPosts.rejected]: (state, action) => {
      state.loading = false
    }
  }
})

export default postsSlice.reducer

export const {
  selectAll: selectPosts,
  selectById: selectPostById,
  selectIds: selectPostIds
} = postsAdapter.getSelectors(state => state.posts)
