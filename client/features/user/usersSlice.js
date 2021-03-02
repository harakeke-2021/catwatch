import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import app from '../../firebase'

const usersAdapter = createEntityAdapter()

const initialState = usersAdapter.getInitialState()

export const fetchUser = createAsyncThunk('users/fetchUser', async (id) => {
  const userRef = app.firestore().collection('users').doc(id)
  const user = await userRef.get()
  return { id: user.id, ...user.data() }
})

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (ids) => {
  const usersRef = app.firestore().collection('users')
  const snapshot = await usersRef.get()
  const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  return users
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUser.fulfilled]: (state, action) => {
      usersAdapter.upsertOne(state, action.payload)
    },
    [fetchUsers.fulfilled]: (state, action) => {
      usersAdapter.setAll(state, action.payload)
    }
  }
})

export default usersSlice.reducer

export const {
  selectAll: selectUsers,
  selectById: selectUserById,
  selectIds: selectUserIds
} = usersAdapter.getSelectors(state => state.users)
