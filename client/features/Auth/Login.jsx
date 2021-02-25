import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import app from '../../firebase'

function Login () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const auth = app.auth()

  function handleLogin (e) {
    e.preventDefault()
    auth.signInWithEmailAndPassword(email, password)
      .then(() => setEmail(''))
      .then(() => setPassword(''))
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <div>
      <h2>Login In</h2>
      <form id="form">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)}/>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)}/>
        <button type="submit" onClick={handleLogin}>Login</button>
      </form>
      <Link to="/register"><p>No account? Register here</p></Link>
    </div>
  )
}

export default Login
