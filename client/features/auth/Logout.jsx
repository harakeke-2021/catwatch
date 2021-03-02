import React from 'react'
import app from '../../firebase'

function Logout () {
  const auth = app.auth()

  function handleLogout () {
    auth.signOut()
      .catch(err => console.error(err))
  }

  return (
    <div>
      <button onClick={handleLogout} className="block w-full py-3 mb-2 font-bold text-white bg-pink-400 rounded shadow-2xl">Logout</button>
    </div>
  )
}

export default Logout
