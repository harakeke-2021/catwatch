import React, { useContext, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { AuthContext } from '../auth/GetAuthState'
import { promptForGeoLoc } from '../map/geolocHelper'
import { postImageToStorage, updateFirestore } from './cameraHelper'

function Camera () {
  const [img, setImg] = useState(null)
  const [caption, setCaption] = useState('')
  const location = useSelector(state => state.geoloc.location)

  const dispatch = useDispatch()
  const history = useHistory()

  const { currentUser } = useContext(AuthContext)

  useEffect(() => {
    promptForGeoLoc(dispatch)
  }, [])

  function addImg (e) {
    setImg(e.target.files[0])
  }

  function addCaption (e) {
    const { value } = e.target
    setCaption(value)
  }

  function resetForm () {
    setImg(null)
    setCaption('')
  }

  function submitForm (e) {
    e.preventDefault()

    postImageToStorage(dispatch, img)
      .then(url => {
        resetForm()
        history.push('/')
        updateFirestore(currentUser, location, caption, url)
        return null
      })
      .catch(err => console.error(err))
  }

  return (
    <form onSubmit={submitForm}>
      <button type='reset' onClick={resetForm}>Back</button>
      {
        img
          ? (<>
            <img src={URL.createObjectURL(img)}/>
            <input type='text' placeholder='caption' value={caption} onChange={addCaption}/>
            <button type='submit'>Submit</button>
          </>)
          : <input type='file' id='imageFile' capture='environment' accept='image/*' onChange={addImg}/>
      }
    </form>
  )
}

export default Camera
