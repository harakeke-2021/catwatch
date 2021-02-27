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
        <div className="flex flex-col w-screen h-full px-10 py-32 text-xl bg-indigo-500">
          <form className="w-full mx-auto my-auto items-center" onSubmit={handleLogin}>
            <div className="flex items-center bg-indigo-300 border-b border-indigo-500 rounded-t-lg">
              <label htmlFor="name" className="w-20 ml-2 mr-8 text-pink-100">Email</label>
              <input name="email" type="email" placeholder="Email" autoComplete="on" className="flex-1 p-4 pl-0 text-white placeholder-purple-200 bg-transparent outline-none"/>
            </div >
            <div className="flex items-center mb-10  bg-indigo-300 rounded-b-lg"><label htmlFor="twitter" className="w-20 ml-2 mr-8 text-pink-100">Password</label>
              <input name="password" type="password" placeholder="Password" autoComplete="on" className="flex-1 p-4 pl-0 text-white placeholder-purple-200 bg-transparent outline-none"/></div>
            <button type="submit" className="block w-full py-3 font-bold text-white bg-pink-400 rounded shadow-2xl">Log In</button>
            <p className="flex-1 p-4 pl-0 text-xs text-pink-100">No account? Register <Link to="/register" className='text-pink-400 underline'>here</Link></p>
          </form>
        </div>
      </div>
    </div>

  )
}
// text-gradient bg-gradient-to-r from-pink-400 to-indigo-500

export default Login
