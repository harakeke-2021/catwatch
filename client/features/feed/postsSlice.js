import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit'
import app from '../../firebase'
import { fetchUsers } from '../user/usersSlice'
import firebase from 'firebase'

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.dateTime - a.dateTime
}
)

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

export const likePost = createAsyncThunk('feed/likePost', async ({ postId, userId, like }) => {
  const ref = app.firestore().collection('sightings').doc(postId)

  if (like) {
    await ref.update({
      aplaws: firebase.firestore.FieldValue.arrayUnion(userId)
    })
  } else {
    await ref.update({
      aplaws: firebase.firestore.FieldValue.arrayRemove(userId)
    })
  }

  const updatedDoc = await ref.get()
  return { id: updatedDoc.id, ...updatedDoc.data() }
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
    },
    [likePost.fulfilled]: postsAdapter.upsertOne,
    [likePost.rejected]: (state, action) => {
      console.error(action)
    }
  }
})

export default postsSlice.reducer

export const {
  selectAll: selectPosts,
  selectById: selectPostById,
  selectIds: selectPostIds
} = postsAdapter.getSelectors(state => state.posts)
