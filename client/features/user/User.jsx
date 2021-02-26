import React, { useContext } from 'react'
import { withRouter, Redirect } from 'react-router'
import Logout from '../auth/Logout'
import { AuthContext } from '../auth/GetAuthState'

function User () {
  const { currentUser } = useContext(AuthContext)

  if (!currentUser) {
    return <Redirect to="/login" />
  }
  return (
    <>
      <p>this is the users page</p>
      <Logout/>
    </>
  )
}

export default withRouter(User)
