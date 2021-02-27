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
  const [fileUrl, setFileUrl] = useState(null)

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
    // const list = sighting.docs.map(item => item.data())
    setUserSightings(sightings.docs.map(doc => {
      return doc.data()
    }))
    // setUserSightings(list)
  }

  const onSubmit = (e) => {
    e.preventDefault()
  }

  const onFileChange = async (e) => {
    const file = e.target.files[0]
    console.log(file)
    const storageRef = app.storage().ref()
    console.log(storageRef)
    const fileRef = storageRef.child(file.name)
    console.log(fileRef)
    await fileRef.put(file)
    // setFileUrl(await fileRef.getDownloadURL())
  }

  // location.x_ = latitude
  // location.N_ = longitude

  return (
    <>
      <p>this is the users page for: {userDetails.email}</p>
      {userSightings.map((result, index) => (
        <div key={index}>
          {/* <img src={result.photoUrl} alt="catpic"/> */}
          Location: {result.location.x_}
          <br></br>
          Location: {result.location.N_}
        </div>
      ))}
      <Logout/>
      <form onSubmit={onSubmit} >
        <input type="file" onChange={onFileChange}/>
        <button>Submit</button>
      </form>
    </>
  )
}

export default User
