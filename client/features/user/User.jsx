import React, { useContext, useEffect, useState } from 'react'
import { Redirect } from 'react-router'
import Logout from '../auth/Logout'
import { AuthContext } from '../auth/GetAuthState'
import app from '../../firebase'

function User () {
  const [userDetails, setUserDetails] = useState({})
  const [userSightings, setUserSightings] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [newUsername, setNewUsername] = useState(userDetails.username)

  useEffect(() => {
    fetchUserData()
  }, [newUsername])

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
    console.log('Test')
    setIsEditing(true)
  }

  const submitUsername = async () => {
    console.log('My new username is: ', newUsername)
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

  return (
    <>
      <div className="items-center justify-center flex-1 h-full overflow-y-auto divide-y divide-gray-100">
        <div className="flex rounded-lg">
          <div className="flex flex-col items-center w-full h-screen bg-transparent mb-7">
            <img src={userDetails.userPicture} alt="" className="w-32 h-32 mt-5 border-2 border-gray-400 rounded-full" title="edit picture" />
            {!isEditing
              ? <h1 className="p-4 text-xl text-gradient bg-gradient-to-r from-indigo-500 to-pink-300">{userDetails.username} <i className="fas fa-pen" onClick={handleUsername}></i></h1>
              : (
                <>
                  <input type="text" className="px-4 py-2 my-2 text-sm text-gray-700 border rounded-lg focus:outline-none" onChange={userOnChange}/>
                  <button className="block w-24 py-3 mb-2 font-bold text-white bg-pink-400 rounded shadow-2xl" onClick={submitUsername}>Save</button>
                </>
              )}
            <h1 className="pt-5 text-lg font-semibold text-gradient bg-gradient-to-r from-indigo-500 to-pink-400 rounded-md" >{userDetails.email}</h1>
            <h1 className="p-4 text-sm text-gradient bg-gradient-to-r from-indigo-500 to-pink-300">Auckland, New Zealand</h1>
            <div className="w-11/12 h-auto mt-2 overflow-y-visible bg-gradient-to-bl from-indigo-200 to-pink-300 rounded-md">
              <Logout/>
              <div className="flex flex-wrap w-full">
                {userSightings.map((result, index) => (
                  <div className="w-4/12 border-2 border-transparent m-0.4" key={index}>
                    <img className="w-full h-full rounded" src={result.photoUrl} alt="catpic"/>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default User
