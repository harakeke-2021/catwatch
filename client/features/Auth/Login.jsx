import React, { useCallback, useContext } from 'react'
import { Redirect } from 'react-router'
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

      {/* <h1>Log in</h1>
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
      <Link to="/register"><p>No Account? Register here</p></Link> */}
      <div className="shadow-2xl">
        <div className="min-h-screen px-10 py-32 text-xl bg-purple-600 ">
          <form className="mx-auto md:w-1/2 "action="">
            <div className="flex items-center bg-purple-300 border-b border-purple-500 rounded-t-lg">
              <label htmlFor="name" className="w-20 mr-8 text-right text-purple-100">Name</label>
              <input type="text" id="name" name="name" placeholder="Insert your name" className="flex-1 p-4 pl-0 text-white placeholder-purple-200 bg-transparent outline-none"/>
            </div >
            <div className="flex items-center mb-10 bg-purple-300 rounded-b-lg"><label htmlFor="twitter" className="w-20 mr-8 text-right  text-purple-100">Twitter</label>
              <input type="text" id="twitter" name="twitter" placeholder="Insert your twitter" className="flex-1 p-4 pl-0 text-white placeholder-purple-200 bg-transparent outline-none"/></div>
            <button className="block w-full py-3 font-bold text-white bg-pink-400 rounded shadow-2xl">Submit</button>
          </form>
        </div>
      </div>

    </div>
  )
}

export default Login
