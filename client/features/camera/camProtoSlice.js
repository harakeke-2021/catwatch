import { createSlice } from '@reduxjs/toolkit'

const cameraSlice = createSlice({
  name: 'camera',
  initialState: {
    img: '',
    caption: ''
  },
  reducers: {
    setImg: (state, action) => {
      state.img = action.payload
    },
    setCaption: (state, action) => {
      state.caption = action.payload
    }
  }
})

export default cameraSlice.reducer
export const {
  setImg
} = cameraSlice.actions
