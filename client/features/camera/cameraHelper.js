import sha1 from 'js-sha1'

import firebase from '../../firebase'

const storage = firebase.storage()
const firestore = firebase.firestore()

export function postImageToStorage (image) {
  const { name, type } = image
  const fileRef = storage.ref().child(sha1(name + Date.now()))

  return fileRef.put(image, { contentType: type })
    // .then(snapshot => console.log('uploaded image file!'))
    .then(() => getStorageImageURL(fileRef))
    .catch(err => console.error(err))
}

function getStorageImageURL (fileRef) {
  return fileRef.getDownloadURL()
    .catch(err => console.error(err))
}

export function updateFirestore (currentUser, comments, photoUrl) {
  return firestore.collection('sightings').doc().set({
    test: 'test',
    userID: currentUser.uid,
    dateTime: Date.now(),
    comments,
    photoUrl
  })
    // .then(() => console.log('sightings updated!'))
    .catch(err => console.error(err))
}
