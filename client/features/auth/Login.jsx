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
    <div className="h-full">
      <div className="h-full shadow-2xl">
        <div className="flex flex-col w-screen h-full py-32 text-xl bg-indigo-500 sm:px-32">
          <form className="items-center w-full mx-auto my-auto lg:w-auto" onSubmit={handleLogin}>
            <div className="flex items-center px-2 bg-indigo-300 border-b border-indigo-500 sm:rounded-t-lg">
              <label htmlFor="email" className="w-20 ml-2 mr-8 text-pink-100">Email</label>
              <input id="email" name="email" type="email" placeholder="Email" autoComplete="on" className="flex-1 p-4 pl-0 overflow-auto text-white placeholder-purple-200 bg-transparent outline-none"/>
            </div >
            <div className="flex items-center px-2 mb-10 bg-indigo-300 sm:rounded-b-lg">
              <label htmlFor="password" className="w-20 ml-2 mr-8 text-pink-100">Password</label>
              <input id="password" name="password" type="password" placeholder="Password" autoComplete="on" className="flex-1 p-4 pl-0 overflow-auto text-white placeholder-purple-200 bg-transparent outline-none"/></div>
            <button type="submit" className="block w-full py-3 font-bold text-white bg-pink-400 shadow-2xl sm:rounded">Log In</button>
            <p className="flex-1 p-4 pl-0 ml-0 text-xs text-pink-100 sm:ml-8">No account? Register <Link to="/register" className='text-pink-400 underline'>here</Link></p>
          </form>
        </div>
      </div>
    </div>

  )
}
// text-gradient bg-gradient-to-r from-pink-400 to-indigo-500

export default Login
