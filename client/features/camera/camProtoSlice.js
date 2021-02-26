import { createSlice } from '@reduxjs/toolkit'

const cameraSlice = createSlice({
  name: 'camera',
  initialState: {
    img: ''
  },
  reducers: {
    setImg: (state, action) => {
      state.img = action.payload
    }
  }
})

export default cameraSlice.reducer
export const {
  setImg
} = cameraSlice.actions
