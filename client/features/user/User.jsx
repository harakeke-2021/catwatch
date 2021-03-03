import React, { useContext, useEffect, useState } from 'react'
import { Redirect } from 'react-router'
import Logout from '../auth/Logout'
import { AuthContext } from '../auth/GetAuthState'
import app from '../../firebase'
import sha1 from 'js-sha1'

function User () {
  const [userDetails, setUserDetails] = useState({})
  const [userSightings, setUserSightings] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [isEditingPhoto, setIsEditingPhoto] = useState(false)
  const [newUsername, setNewUsername] = useState(null)
  const [img, setImg] = useState(null)

  useEffect(() => {
    fetchUserData()
  }, [newUsername, img])

  useEffect(() => {
    fetchUserSightings()
  }, [])

  const { currentUser } = useContext(AuthContext)
  if (!currentUser) {
    return <Redirect to="/login" />
  }

  const fetchUserData = async () => {
    const userRef = app.firestore().collection('users').where('id', '==', `${currentUser.uid}`)
    const user = await userRef.get()
    user.docs.forEach(item => {
      setUserDetails(item.data())
    })
  }

  const fetchUserSightings = async () => {
    const sightingsRef = app.firestore().collection('sightings').where('userID', '==', `${currentUser.uid}`)
    const sightings = await sightingsRef.get()
    setUserSightings(sightings.docs.map(doc => {
      return doc.data()
    }))
  }

  function handleUsername () {
    setIsEditing(true)
  }

  const submitUsername = async () => {
    const userPictureRef = app.firestore().collection('users').doc(`${currentUser.uid}`)
    await userPictureRef.update({
      username: newUsername
    })
    setIsEditing(false)
    setNewUsername(userDetails.username)
  }

  function userOnChange (e) {
    setNewUsername(e.target.value)
  }

  function cancelUsernameState () {
    setIsEditing(false)
  }
  function cancelPhotoState () {
    setImg(null)
  }

  function addImg (e) {
    setImg(e.target.files[0])
    setIsEditingPhoto(true)
  }

  const savePicture = async () => {
    sha1(img.name + Date.now())
    const storageRef = app.storage().ref()
    const fileRef = storageRef.child('profilePictures').child(sha1(img.name + Date.now()))
    await fileRef.put(img)
    const fileUrl = await fileRef.getDownloadURL()
    const userPhotoRef = app.firestore().collection('users').doc(`${currentUser.uid}`)
    await userPhotoRef.update({
      userPicture: fileUrl
    })
    setImg(null)
  }

  return (
    <>
      <div className="flex flex-col items-center w-full h-screen bg-transparent mb-7">
        {!img
          ? <div><label htmlFor="image">
            <img src={userDetails.userPicture} alt="" className="w-32 h-32 mt-5 border-2 border-gray-400 rounded-full" title="edit picture" />
            <input type="file" name="image" id="image" accept="image/*" className="invisible w-0 h-0" onChange={addImg}/>
          </label></div>
          : (
            <>
              <img src={URL.createObjectURL(img)} alt="" className="w-32 h-32 mt-5 border-2 border-gray-400 rounded-full" title="edit picture" />
              <div className="flex flex-row mt-5">
                <button className="w-24 py-3 mb-2 mr-3 font-bold text-white bg-pink-400 rounded shadow-2xl" onClick={savePicture}>Save</button>
                <button type="reset" className="w-24 py-3 mb-2 ml-3 font-bold text-white bg-pink-400 rounded shadow-2xl" onClick={cancelPhotoState}>Cancel</button>
              </div>
            </>
          )}
        {!isEditing
          ? <div><h1 className="p-4 ml-5 text-3xl text-gradient bg-gradient-to-r from-indigo-500 to-pink-300">{userDetails.username} <i className="text-xs fas fa-pen" onClick={handleUsername}></i></h1></div>
          : (
            <>
              <p className="p-4 text-sm text-gradient bg-gradient-to-r from-indigo-500 to-pink-300" > Enter a new username</p>
              <input type="text" className="px-4 py-2 my-2 text-sm text-gray-700 border rounded-lg focus:outline-none" onChange={userOnChange}/>
              <div className="flex flex-row mt-5">
                <button className="w-24 py-3 mb-2 mr-3 font-bold text-white bg-pink-400 rounded shadow-2xl" onClick={submitUsername}>Save</button>
                <button type="reset" className="w-24 py-3 mb-2 ml-3 font-bold text-white bg-pink-400 rounded shadow-2xl" onClick={cancelUsernameState}>Cancel</button>
              </div>
            </>
          )}
        <h1 className="pt-5 text-lg font-semibold text-gradient bg-gradient-to-r from-indigo-500 to-pink-400 rounded-md" >{userDetails.email}</h1>
        <h1 className="p-4 text-sm text-gradient bg-gradient-to-r from-indigo-500 to-pink-300">Auckland, New Zealand</h1>
        <div className="w-11/12 h-auto mt-2 overflow-y-visible bg-gradient-to-bl from-indigo-200 to-pink-300 rounded-md">
          <Logout/>
          <div className="flex flex-wrap w-full">
            {userSightings.map((result, index) => (
              <div className="w-4/12 border-2 border-transparent m-0.4" key={index}>
                <img className="flex-auto w-full h-full rounded" src={result.photoUrl} alt="catpic"/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default User
