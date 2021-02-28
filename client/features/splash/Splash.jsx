import React, { useContext } from 'react'
import { Redirect, useHistory } from 'react-router'
import { AuthContext } from '../auth/GetAuthState'

export default function Splash () {
  const history = useHistory()

  function navTo (e, route) {
    e.preventDefault()
    history.push(route)
  }

  const { currentUser } = useContext(AuthContext)

  if (currentUser) {
    return <Redirect to="/feed" />
  }

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-50">
      <div className="text-gradient bg-gradient-to-r from-pink-400 to-indigo-500">
        <i className="fas fa-cat text-9xl"></i>
      </div>
      <div className="flex justify-around w-full px-6 pt-20 text-gray-50 placeholder-opacity-20">
        <div onClick={e => navTo(e, '/login')} className="w-32 p-4 text-xl font-bold text-center rounded-xl bg-gradient-to-r from-pink-400 to-indigo-500">Login</div>
        <div onClick={e => navTo(e, '/register')} className="w-32 p-4 text-xl font-bold text-center rounded-xl bg-gradient-to-r from-pink-400 to-indigo-500">Register</div>
      </div>
    </div>
  )
}
