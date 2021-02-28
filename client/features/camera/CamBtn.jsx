import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { setImg } from './camProtoSlice'

function CamBtn () {
  const dispatch = useDispatch()
  const history = useHistory()

  function addImg (e) {
    const img = e.target.files[0]
    console.log(img.name)
    console.log(img.type)
    const url = URL.createObjectURL(img)
    const { name, type } = img
    dispatch(setImg({ url, name, type }))
    history.push('/camera/caption')
  }

  return (
    <div>
      <label htmlFor='image' className='relative items-center justify-center block w-40 h-5 font-bold text-white shadow-md cursor-pointer rounded-xl bg-gradient-to-bl from-pink-400 to-indigo-500 transition-transform'>this is the label</label>
      <input id='image' className='absolute invisible w-1 h-1 opacity-0' type='file' capture='environment' accept='image/*' onChange={addImg}/>
    </div>
  )
}

export default CamBtn
