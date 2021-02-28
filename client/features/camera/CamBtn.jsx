import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { setImg } from './camProtoSlice'
import app from '../../firebase'

function CamBtn () {
  const dispatch = useDispatch()
  const history = useHistory()

  // saving the image to the cloud but also passing along the blob data for the preview in caption. Ideally I'd want to pass the whole file via redux and submit the caption and the image in Caption.jsx instead but unsure how atm.
  const addImg = async (e) => {
    const file = e.target.files[0]
    const storageRef = app.storage().ref()
    const fileRef = storageRef.child(file.name)
    await fileRef.put(file)
    const fileUrl = await fileRef.getDownloadURL()
    const url = URL.createObjectURL(file)
    const { name, type } = file
    dispatch(setImg({ url, name, type, fileUrl }))
    await history.push('/camera/caption')
  }

  return (
    <div>
      <label htmlFor='image' className='relative items-center justify-center block w-40 h-5 font-bold text-white shadow-md cursor-pointer rounded-xl bg-gradient-to-bl from-pink-400 to-indigo-500 transition-transform'>this is the label</label>
      <input id='image' className='absolute invisible w-1 h-1 opacity-0' type='file' capture='environment' accept='image/*' onChange={addImg}/>
    </div>
  )
}

export default CamBtn
