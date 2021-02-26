import React, { useCallback, useContext } from 'react'
import { withRouter, Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import app from '../../firebase'
import { AuthContext } from './GetAuthState'

function Register ({ history }) {
  const handleRegister = useCallback(
    async event => {
      event.preventDefault()
      const { email, password } = event.target.elements
      try {
        const userAuth = await app.auth().createUserWithEmailAndPassword(email.value, password.value)

        await app.firestore().collection('users').doc(userAuth.user.uid).set({
          email: email.value,
          id: userAuth.user.uid
        })
        history.push('/')
      } catch (error) {
        alert(error)
      }
    },
    [history]
  )

  const { currentUser } = useContext(AuthContext)

  if (currentUser) {
    return <Redirect to="/" />
  }

  return (
    <div>
      <h1>Sign up</h1>
      <form onSubmit={handleRegister}>
        <label>
      Email
          <input name="email" type="email" placeholder="Email" autoComplete="on" />
        </label>
        <label>
      Password
          <input name="password" type="password" placeholder="Password" autoComplete="on" />
        </label>
        <button type="submit">Sign Up</button>
      </form>
      <Link to="/login"><p>Already part of CATWATCH? Login here</p></Link>
    </div>
  )
}

export default withRouter(Register)
