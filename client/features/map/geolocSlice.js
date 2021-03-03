import { createSlice } from '@reduxjs/toolkit'

const geolocSlice = createSlice({
  name: 'geolocation',
  initialState: {
    location: null
  },
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload
    }
  }
})

export default geolocSlice.reducer
export const {
  setLocation
} = geolocSlice.actions
