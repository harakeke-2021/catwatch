import React, { useContext, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { AuthContext } from '../auth/GetAuthState'
import { postImageToStorage, updateFirestore } from './cameraHelper'

function Camera () {
  const [img, setImg] = useState(null)
  const [caption, setCaption] = useState('')
  const [location, setLocation] = useState({ longitude: 0, latitude: 0 })

  const dispatch = useDispatch()
  const history = useHistory()

  const { currentUser } = useContext(AuthContext)

  // todo: this should be global state -> prompted after opening app
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { longitude, latitude } }) => setLocation({ longitude, latitude }),
      (err) => console.error(err),
      { enableHighAccuracy: true }
    )
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
    <div className="items-center justify-center flex-1 h-full overflow-y-hidden divide-y divide-gray-100">
      <div className=" flex flex-col items-center w-full h-full mb-2 bg-transparent">
        <div className="w-11/12 h-screen mt-2 mb-2 overflow-y-visible bg-gradient-to-bl from-indigo-200 to-pink-300 rounded-md">
          <div className="flex flex-wrap  w-full">
            <form className="h-full" onSubmit={submitForm}>

              <button type='reset' onClick={resetForm} className="w-20  mr-8 text-pink-100 bg-pink-600 rounded-sm">Back</button>
              {<div className=""> {
                img
                  ? (<><div className="p-5 mt-2">
                    <img className="object-contain border-2 border-gray-300" src={URL.createObjectURL(img)}/>
                  </div>
                  <textarea placeholder="enter a description..." className="w-11/12 bg-indigo-500 h-16 px-3 py-2 ml-5 text-base text-pink-200 placeholder-gray-600 border rounded-lg focus:shadow-outline"></textarea>
                  <div className="flex flex-row m-5 ">

                    {/* <input className="flex-1 pl-2 mr-2 "type='text' placeholder='Add caption' value={caption} onChange={addCaption}/> */}
                    <button type='submit' className="w-20 mr-8 text-pink-100 bg-pink-600 rounded-sm flex-2">Submit</button>
                  </div>
                  </>)
                  : <input type='file' id='imageFile' capture='environment' accept='image/*' onChange={addImg}/>
              }
              </div>
              }

            </form>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Camera
