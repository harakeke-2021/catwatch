import sha1 from 'js-sha1'

import firebase from '../../firebase'
import { setUploading } from './camProtoSlice'

const storage = firebase.storage()
const firestore = firebase.firestore()

export function postImageToStorage (dispatch, image) {
  const { name, type } = image
  const fileRef = storage.ref().child(sha1(name + Date.now()))

  dispatch(setUploading(true))
  return fileRef.put(image, { contentType: type })
    .then(() => {
      dispatch(setUploading(false))
      return getStorageImageURL(fileRef)
    })
    .catch(err => console.error(err))
}

function getStorageImageURL (fileRef) {
  return fileRef.getDownloadURL()
    .catch(err => console.error(err))
}

export function updateFirestore (currentUser, location, comments, photoUrl) {
  return firestore.collection('sightings').doc().set({
    userID: currentUser.uid,
    dateTime: Date.now(),
    location,
    comments,
    photoUrl
  })
    .catch(err => console.error(err))
}
