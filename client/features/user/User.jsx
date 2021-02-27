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
    const list = []
    const sightingsRef = app.firestore().collection('sightings').where('userID', '==', `${currentUser.uid}`)
    const sighting = await sightingsRef.get()
    sighting.docs.forEach(item => {
      list.push(item.data())
    })
    setUserSightings(list)
  }

  // location.x_ = latitude
  // location.N_ = longitude

  return (
    <>
      <p>this is the users page for: {userDetails.email}</p>
      {userSightings.map((result, index) => (
        <div key={index}>
          <img src={result.photoUrl} alt="catpic"/>
          {result.location.x_}
          <br></br>
          {result.location.N_}
        </div>
      ))}
      <Logout/>
    </>
  )
}

export default User
