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
  const [fileUrl, setFileUrl] = useState('')

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

  const onSubmit = async (e) => {
    e.preventDefault()
    const userPictureRef = app.firestore().collection('users').doc(`${currentUser.uid}`)
    await userPictureRef.update({
      profileURL: fileUrl
    })
    console.log('Photo submitted to firestore')
  }

  const onFileChange = async (e) => {
    const file = e.target.files[0]
    const storageRef = app.storage().ref()
    const fileRef = storageRef.child(file.name)
    await fileRef.put(file)
    setFileUrl(await fileRef.getDownloadURL())
  }

  // location.x_ = latitude
  // location.N_ = longitude

  return (
    <>
      <img src={userDetails.profileURL} alt="" style={{ width: '20px' }}/>
      <p>this is the users page for: {userDetails.email}</p>
      {userSightings.map((result, index) => (
        <div key={index}>
          {/* <img src={result.photoUrl} alt="catpic"/> */}
          <br></br>
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
