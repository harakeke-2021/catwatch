import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { setImg, setCaption } from './camProtoSlice'

function Caption () {
  const { img, caption } = useSelector(state => state.camera)
  const dispatch = useDispatch()
  const history = useHistory()

  function addCaption (e) {
    const { value } = e.target
    dispatch(setCaption(value))
  }

  function resetForm () {
    dispatch(setImg(''))
    dispatch(setCaption(''))
    history.push('/')
  }

  function submitForm () {
    console.log(img)
    console.log(caption)
  }

  return (
    <form onSubmit={submitForm}>
      <div>
        <button onClick={resetForm}>Back</button>
      </div>
      <img src={img}/>
      <div>
        <input type='text' placeholder='caption' value={caption} onChange={addCaption}/>
      </div>
      <div>
        <button type='submit'>Submit</button>
      </div>
    </form>
  )
}

export default Caption
