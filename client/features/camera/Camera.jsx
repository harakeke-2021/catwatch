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

    <div className="items-center justify-center flex-1 h-full overflow-y-visible divide-y divide-gray-100">
      <div className="flex flex-col items-center w-full h-full mb-2 bg-transparent">
        <div className="flex flex-wrap items-center w-screen h-screen overflow-y-visible bg-indigo-500">
          <div className="flex-wrap items-center flex-1 w-full">
            <form className="flex flex-col h-full" onSubmit={submitForm}>
              <div className="flex flex-row justify-center">
              </div>
              {<div className="flex flex-col items-center"> {
                img
                  ? (<><div className="flex flex-col items-center pt-5 pb-5 pl-5 pr-5">
                        <button type='reset' onClick={resetForm} className="w-20 leading-normal tracking-wider mb-5 text-white bg-pink-400 border-b-2 border-pink-300 rounded-sm">Back</button>
                    <img className="object-contain border-2 border-gray-300 shadow-2xl" src={URL.createObjectURL(img)}/>
                  </div>
                  <textarea placeholder="Write a cat-ption..." className="flex flex-col w-11/12 h-16 px-3 py-2 text-base text-pink-100 placeholder-pink-100 bg-indigo-300 border shadow-2xl rounded-md"></textarea>
                  <div className="flex flex-row justify-center mt-5 mb-5">

                    <div className="flex-wrap items-center flex-1 w-full">
                      <div className="flex flex-col h-full">
                        <div className="flex flex-row justify-center w-full p-1">
                          <button type='submit' className="flex flex-row justify-center w-20  leading-normal tracking-wider text-white bg-pink-400 border-b-2 border-pink-300 rounded-sm">Submit</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  </>)
                  : <div className="flex justify-center w-full h-full items-top">

                    <label className="flex flex-col items-center w-48 h-24 tracking-wider bg-pink-400 border-b-2 border-pink-300 rounded-lg shadow-lg cursor-pointer">
                      <svg className="w-2/4 h-2/4 mt-2.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title"
                        aria-describedby="desc" role="img" xmlnsxlink="http://www.w3.org/1999/xlink">
                        <path data-name="layer2"
                          d="M59 17H46.6L40 9H24l-6.6 8H5a3 3 0 0 0-3 3v30a3 3 0 0 0 3 3h54a3 3 0 0 0 3-3V20a3 3 0 0 0-3-3z"
                          fill="none" stroke="white" strokeMiterlimit="10" strokeWidth="1.2" strokeLinejoin="round"
                          strokeLinecap="round"></path>
                        <circle data-name="layer1" cx="32" cy="33" r="14" fill="none" stroke="white"
                          strokeMiterlimit="10" strokeWidth="1.2" strokeLinejoin="round" strokeLinecap="round"></circle>
                        <circle data-name="layer1" cx="54" cy="25" r="1" fill="none"
                          stroke="white" strokeMiterlimit="10" strokeWidth="1.2" strokeLinejoin="round"
                          strokeLinecap="round"></circle>
                        <circle data-name="layer1" cx="32" cy="33" r="6" fill="none"
                          stroke="white" strokeMiterlimit="10" strokeWidth="1.2" strokeLinejoin="round"
                          strokeLinecap="round"></circle>
                      </svg>
                      <div>
                        <span className="mt-2 leading-normal text-white">Take a cat pic!</span>
                        <input type='file' className="hidden" id='imageFile' capture='environment' accept='image/*' onChange={addImg}/>
                      </div>
                    </label>
                  </div>
                  // <input type='file' id='imageFile' capture='environment' accept='image/*' onChange={addImg}/>
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
