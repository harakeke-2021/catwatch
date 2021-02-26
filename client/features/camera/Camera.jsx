import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { setImg } from './camProtoSlice'

function Camera () {
  const dispatch = useDispatch()
  const history = useHistory()

  function addImg (e) {
    const img = e.target.files[0]
    const imgURL = URL.createObjectURL(img)
    dispatch(setImg(imgURL))
    history.push('/caption')
  }

  return (
    <input type='file' id='imageFile' capture='environment' accept='image/*' onChange={addImg}/>
  )
}

export default Camera
