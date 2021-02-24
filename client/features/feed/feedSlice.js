import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const adjustLater = createAsyncThunk('feed/adjustLater', async (amount) => {
  return Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(amount)
    }, 1000)
  })
})

const feedSlice = createSlice({
  name: 'feed',
  initialState: {
    value: 0,
    status: 'idle'
  },
  reducers: {
    increment: state => {
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    },
    adjust: (state, action) => {
      state.value += action.payload
    },
    set: (state, action) => {
      state.value = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(adjustLater.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(adjustLater.fulfilled, (state, action) => {
        state.value = action.payload
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
