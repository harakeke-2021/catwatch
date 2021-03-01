import React, { useContext, useEffect, useState } from 'react'
import { Redirect } from 'react-router'
import Logout from '../auth/Logout'
import { AuthContext } from '../auth/GetAuthState'
import app from '../../firebase'

function User () {
  useEffect(() => {
    fetchUserData()
  }, [])

  useEffect(() => {
    fetchUserSightings()
  }, [])

  const [userDetails, setUserDetails] = useState({})
  const [userSightings, setUserSightings] = useState([])

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
    const sighting = await sightingsRef.get()
    const list = sighting.docs.map(item => item.data())
    setUserSightings(list)
  }

  // location.x_ = latitude
  // location.N_ = longitude

  return (
    <>
      <div className="items-center justify-center flex-1 h-full overflow-y-auto divide-y divide-gray-100">
        <div className="flex rounded-lg">
          <div className="flex flex-col items-center justify-center h-screen">
            <img src={userDetails.userPicture}
              alt="" className="w-32 h-32 mt-5 border-2 border-gray-400 rounded-full"/>
            <h1 className="pt-5 text-xl font-semibold text-gradient bg-gradient-to-r from-indigo-500 to-pink-400 rounded-md">{userDetails.username}</h1>
            <h1 className="pt-5 text-lg font-semibold text-gradient bg-gradient-to-r from-indigo-500 to-pink-400 rounded-md">{userDetails.email}</h1>
            <h1 className="p-4 text-sm text-gradient bg-gradient-to-r from-indigo-500 to-pink-300">Auckland, New Zealand</h1>
            <div className="w-11/12 h-full mt-2 overflow-y-hidden bg-gradient-to-bl from-indigo-200 to-pink-300 rounded-md">
              <div className="flex flex-wrap w-full m-0 justify-left h-max">
                {userSightings.map((result, index) => (
                  <div className="w-4/12 border-2 border-transparent m-0.4" key={index}>
                    <img className="w-full h-full rounded-sm" src={result.photoUrl} alt="catpic"/>
                  </div>
                ))}
              </div>
            </div>
            {/* <Logout/>  will add logout button on hamburguer icon bg-gradient-to-bl from-indigo-200 to-pink-300 */}
            <Logout/>
          </div>
        </div>
      </div>
    </>
  )
}

export default User
