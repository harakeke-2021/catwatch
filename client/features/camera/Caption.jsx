import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { setImg } from './camProtoSlice'

function Caption () {
  const img = useSelector(state => state.camera.img)
  const [caption, setCaption] = useState('')
  const dispatch = useDispatch()
  const history = useHistory()

  function onChange (e) {
    const { value } = e.target
    setCaption(value)
  }

  function resetForm () {
    dispatch(setImg(''))
    history.push('/')
  }

  function submitForm (e) {
    e.preventDefault()
    console.log('img URL:', img)
    console.log('caption:', caption)
    resetForm()
  }

  return (
    <form onSubmit={submitForm}>
      <div>
        <button onClick={resetForm}>Back</button>
      </div>
      <img src={img}/>
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
