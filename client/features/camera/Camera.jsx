import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setImg, setCaption } from './camProtoSlice'

function Camera () {
  const { img, caption } = useSelector(state => state.camera)
  const dispatch = useDispatch()

  function addImg (e) {
    const img = e.target.files[0]
    const imgURL = URL.createObjectURL(img)
    dispatch(setImg(imgURL))
  }

  function addCaption (e) {
    const { value } = e.target
    dispatch(setCaption(value))
  }

  function resetForm () {
    dispatch(setImg(''))
    dispatch(setCaption(''))
  }

  function submitForm () {
    console.log(img)
    console.log(caption)
  }

  return (
    <form onSubmit={submitForm}>
      <button onClick={resetForm}>Back</button>
      {
        img
          ? (<>
            <img src={img}/>
            <input type='text' placeholder='caption' value={caption} onChange={addCaption}/>
            <button type='submit'>Submit</button>
          </>)
          : <input type='file' id='imageFile' capture='environment' accept='image/*' onChange={addImg}/>
      }
    </form>
  )
}

export default Camera
