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
    <div className="flex items-center justify-center">
      <div className="w-1/3 mt-5 bg-white rounded-lg">
        <div className="flex flex-col items-center justify-center pt-10">
          <img src="https://freepngimg.com/thumb/cartoon/86245-purple-cat-art-sans-undertale-png-image-high-quality.png" alt="" className="w-32 rounded-full"/>
          <h1 className="text-xl font-semibold text-gray-800">Mariano</h1>
          <h1 className="p-4 text-sm text-gray-400">Buenos Aires, Argentina</h1>
          <h1 className="p-4 text-sm text-center text-gray-400">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint perferendis sit eum voluptatem at cum debitis illo impedit maiores explicabo fugit tempora, dolor, praesentium eos similique, placeat facere vel dolorum.</h1>
        </div>
        <div></div>
      </div>
    </div>
  )
}

export default withRouter(User)
