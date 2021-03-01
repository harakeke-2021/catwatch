import { createSlice } from '@reduxjs/toolkit'

const cameraSlice = createSlice({
  name: 'camera',
  initialState: {
    uploading: false
  },
  reducers: {
    // todo: should this be global state? state for a wait indicator?
    setUploading: (state, action) => {
      state.uploading = action.payload
    }
  }
})

export default cameraSlice.reducer
export const {
  setUploading
} = cameraSlice.actions
