import { setLocation } from './geolocSlice'

// todo? - use navigator.geolocation.watchPosition to dispatch an action
// when location changes?
export function promptForGeoLoc (dispatch) {
  navigator.geolocation.getCurrentPosition(
    ({ coords: { latitude, longitude } }) => dispatch(setLocation({ latitude, longitude })),
    (err) => { throw err },
    { enableHighAccuracy: true }
  )
}
