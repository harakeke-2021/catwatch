import React, { useState, useContext } from 'react'
import { Redirect } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { setImg } from './camProtoSlice'
import app from '../../firebase'
import { AuthContext } from '../auth/GetAuthState'

function Caption () {
  const { url, name, type, blob } = useSelector(state => state.camera.img)
  const [caption, setCaption] = useState('')
  const dispatch = useDispatch()
  const history = useHistory()

  const { currentUser } = useContext(AuthContext)
  if (!currentUser) {
    return <Redirect to="/login" />
  }

  function onChange (e) {
    const { value } = e.target
    setCaption(value)
  }

  function resetForm () {
    dispatch(setImg({}))
    history.push('/')
  }

  // submit to storage and then firestore
  const submitForm = async (e) => {
    e.preventDefault()
    const storageRef = app.storage().ref()
    const fileRef = storageRef.child(name)
    await fileRef.put(blob)
    const fileUrl = await fileRef.getDownloadURL()
    await app.firestore().collection('sightings').doc().set({
      test: 'test',
      userID: currentUser.uid,
      dateTime: Date.now(),
      comments: caption,
      photoUrl: fileUrl
    })
    resetForm()
  }

  return (
    <form onSubmit={submitForm}>
      <div>
        <button onClick={resetForm}>Back</button>
      </div>
      <img src={url} style={{ width: '75%', height: '75%' }} />
      <div>
        <textarea name='caption' placeholder='caption' value={caption} style={{
          boxSizing: 'border-box',
          width: '100%'
        }} onChange={onChange}>
        </textarea>
      </div>
      <div>
        <button type='submit'>Submit</button>
      </div>
    </form>
  )
}

export default Caption
