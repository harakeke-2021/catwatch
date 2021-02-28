import React, { useState, useContext } from 'react'
import { Redirect } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { setImg, setFile } from './camProtoSlice'
import app from '../../firebase'
import { AuthContext } from '../auth/GetAuthState'

function Caption () {
  const { url, name, type, fileUrl } = useSelector(state => state.camera.img)
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

  // submit to fireStore with random sighting ID
  const submitForm = async (e) => {
    e.preventDefault()
    await app.firestore().collection('sightings').doc('TEST').set({
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
        {/* <button onClick={resetForm}>Back</button> */}
      </div>
      <img src={url}/>
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
