import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import app from '../../firebase'

function Register () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const auth = app.auth()
  const db = app.firestore()

  function handleSignup (e) {
    e.preventDefault()
    auth.createUserWithEmailAndPassword(email, password)
      .then(data => firestoreSignUp(data))
      .catch(error => {
        console.log(error)
      })
  }

  function firestoreSignUp (data) {
    const uid = data.user.uid
    const userData = { email: email, id: uid }
    return db.collection('users').doc(uid).set(userData)
      .then(() => console.log('new user created so redirect'))
      .then(() => setEmail(''))
      .then(() => setPassword(''))
      .catch(error => { console.log(error) })
  }

  return (
    <div>
      <h2>Register</h2>
      <form id="form">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)}/>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)}/>
        <button type="submit" onClick={handleSignup}>Sign up</button>
      </form>
      <div>
        <Link to="/login"><p>Already got an account? Login here</p></Link>
      </div>
    </div>
  )
}

export default Register
