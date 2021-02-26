import React, { useCallback, useContext } from 'react'
import { withRouter, Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import app from '../../firebase'
import { AuthContext } from './GetAuthState'

function Login ({ history }) {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault()
      const { email, password } = event.target.elements
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value)
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
      <h1>Log in</h1>
      <form onSubmit={handleLogin}>
        <label>
          Email
          <input name="email" type="email" placeholder="Email" autoComplete="on" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="Password" autoComplete="on"/>
        </label>
        <button type="submit">Log in</button>
      </form>
      <Link to="/register"><p>No Account? Register here</p></Link>
    </div>
  )
}

export default withRouter(Login)
