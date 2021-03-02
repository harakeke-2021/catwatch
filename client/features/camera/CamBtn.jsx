import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { setImg } from './camProtoSlice'
import convert from 'image-file-resize'

function CamBtn () {
  const dispatch = useDispatch()
  const history = useHistory()


  // putting the blob in redux store (works but hmmmmmmm)
  const addImg = async (e) => {
    const file = await convert({ file: e.target.files[0], width: 300, height: 300 })
    const url = URL.createObjectURL(file)
    const blob = await fetch(url).then(r => r.blob())
    const { name, type } = file
    dispatch(setImg({ url, name, type, blob }))

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
