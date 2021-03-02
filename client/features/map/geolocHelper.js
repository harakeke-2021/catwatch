import firebase from '../../firebase'
import { setLocation } from './geolocSlice'

const firestore = firebase.firestore()

// todo? - use navigator.geolocation.watchPosition to dispatch an action
// when location changes?
export function promptForGeoLoc (dispatch) {
  navigator.geolocation.getCurrentPosition(
    ({ coords: { latitude, longitude } }) => dispatch(setLocation({ latitude, longitude })),
    (err) => { throw err },
    { enableHighAccuracy: true }
  )
}

export function updateLocation (dispatch, { latitude, longitude }) {
  dispatch(setLocation({ latitude, longitude }))
}

export function getAllSightingLocations () {
  return firestore.collection('sightings').get()
    .then(snapshot => snapshot.docs.map(doc => doc.data()))
    .then(data => data.filter(datum => !!datum.location))
}
