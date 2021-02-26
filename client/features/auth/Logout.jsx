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
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Logout
