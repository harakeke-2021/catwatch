import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { setImg } from './camProtoSlice'
import firebase from '../../firebase'

function Caption () {
  const { url, name, type } = useSelector(state => state.camera.img)
  const [caption, setCaption] = useState('')
  const dispatch = useDispatch()
  const history = useHistory()
  const storageRef = firebase.storage().ref()

  function onChange (e) {
    const { value } = e.target
    setCaption(value)
  }

  function resetForm () {
    dispatch(setImg({}))
    history.push('/')
  }

  async function submitForm (e) {
    e.preventDefault()
    console.log('img URL:', url)
    console.log('img type:', type)
    console.log('caption:', caption)
    const imgRef = storageRef.child(`${name}`)
    // todo: refactor - might need some actions/reducers for this
    imgRef.put(url, { contentType: type })
      .then(snapshot => {
        console.log('snapshop:', snapshot)
        console.log('uploaded img!')
        dispatch(setImg({}))
        return null
      })
      .catch(err => {
        console.log('something went wrong!')
        console.error(err)
      })
    resetForm()
  }

  return (
    <form onSubmit={submitForm}>
      <div>
        <button onClick={resetForm}>Back</button>
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
