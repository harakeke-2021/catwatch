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
        <div className="flex mt-5 bg-transparent rounded-lg">
          <div className="flex flex-col items-center justify-center pt-10">
            <img src="https://freepngimg.com/thumb/cartoon/86245-purple-cat-art-sans-undertale-png-image-high-quality.png" alt="" className="w-32 bg-indigo-300 rounded-full"/>
            <h1 className="text-xl font-semibold text-gray-800">{userDetails.email}</h1>
            <h1 className="p-4 text-sm text-gray-400">Auckland, New Zealand</h1>
            <h1 className="p-4 text-sm text-center text-gray-400"></h1>
            <div className="h-screen mt-2 overflow-y-hidden bg-gray-300 border-black h-max rounded-md">
              <div className="flex flex-wrap items-start justify-center w-full m-1 h-max">
                {userSightings.map((result, index) => (
                  <div className="w-1/4 m-2 bg-white rounded-md" key={index}>
                    <img className="object-contain w-full h-48 rounded-full" src={result.photoUrl} alt="catpic"/>
                  </div>
                ))}
              </div>
            </div>
            <Logout/>
          </div>
        </div>
      </div>
    </>
  )
}

export default User
