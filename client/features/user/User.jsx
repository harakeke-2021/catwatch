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
    <div className="items-center justify-center flex-1 h-full overflow-y-auto divide-y divide-gray-100">
      <div className="flex mt-5 bg-transparent rounded-lg">
        <div className="flex flex-col items-center justify-center pt-10">
          <img src="https://freepngimg.com/thumb/cartoon/86245-purple-cat-art-sans-undertale-png-image-high-quality.png" alt="" className="w-32 bg-indigo-300 rounded-full"/>
          <h1 className="text-xl font-semibold text-gray-800">Name</h1>
          <h1 className="p-4 text-sm text-gray-400">Auckland, New Zealand</h1>
          <h1 className="p-4 text-sm text-center text-gray-400"></h1>
          <div className="h-screen mt-2 overflow-y-hidden bg-gray-300 border-black h-max rounded-md">
            <div className="flex flex-wrap items-start justify-center w-full m-1 h-max">
              <div className="w-1/4 m-2 bg-white rounded-md"><img src="https://freepngimg.com/thumb/cartoon/86245-purple-cat-art-sans-undertale-png-image-high-quality.png" alt="" className="object-contain w-full h-48 rounded-full"/></div>
              <div className="w-1/4 m-2 bg-white rounded-md"><img src="https://freepngimg.com/thumb/cartoon/86245-purple-cat-art-sans-undertale-png-image-high-quality.png" alt="" className="object-contain w-full h-48 rounded-full"/></div>
              <div className="w-1/4 m-2 bg-white rounded-md"><img src="https://freepngimg.com/thumb/cartoon/86245-purple-cat-art-sans-undertale-png-image-high-quality.png" alt="" className="object-contain w-full h-48 rounded-full"/></div>
              <div className="w-1/4 m-2 bg-white rounded-md"><img src="https://freepngimg.com/thumb/cartoon/86245-purple-cat-art-sans-undertale-png-image-high-quality.png" alt="" className="object-contain w-full h-48 rounded-full"/></div>
              <div className="w-1/4 m-2 bg-white rounded-md"><img src="https://freepngimg.com/thumb/cartoon/86245-purple-cat-art-sans-undertale-png-image-high-quality.png" alt="" className="object-contain w-full h-48 rounded-full"/></div>
              <div className="w-1/4 m-2 bg-white rounded-md"><img src="https://freepngimg.com/thumb/cartoon/86245-purple-cat-art-sans-undertale-png-image-high-quality.png" alt="" className="object-contain w-full h-48 rounded-full"/></div>
              <div className="w-1/4 m-2 bg-white rounded-md"><img src="https://freepngimg.com/thumb/cartoon/86245-purple-cat-art-sans-undertale-png-image-high-quality.png" alt="" className="object-contain w-full h-48 rounded-full"/></div>
              <div className="w-1/4 m-2 bg-white rounded-md"><img src="https://freepngimg.com/thumb/cartoon/86245-purple-cat-art-sans-undertale-png-image-high-quality.png" alt="" className="object-contain w-full h-48 rounded-full"/></div>
              <div className="w-1/4 m-2 bg-white rounded-md"><img src="https://freepngimg.com/thumb/cartoon/86245-purple-cat-art-sans-undertale-png-image-high-quality.png" alt="" className="object-contain w-full h-48 rounded-full"/></div>
              <div className="w-1/4 m-2 bg-white rounded-md"><img src="https://freepngimg.com/thumb/cartoon/86245-purple-cat-art-sans-undertale-png-image-high-quality.png" alt="" className="object-contain w-full h-48 rounded-full"/></div>
              <div className="w-1/4 m-2 bg-white rounded-md"><img src="https://freepngimg.com/thumb/cartoon/86245-purple-cat-art-sans-undertale-png-image-high-quality.png" alt="" className="object-contain w-full h-48 rounded-full"/></div>
              <div className="w-1/4 m-2 bg-white rounded-md"><img src="https://freepngimg.com/thumb/cartoon/86245-purple-cat-art-sans-undertale-png-image-high-quality.png" alt="" className="object-contain w-full h-48 rounded-full"/></div>
              <div className="w-1/4 m-2 bg-white rounded-md"><img src="https://freepngimg.com/thumb/cartoon/86245-purple-cat-art-sans-undertale-png-image-high-quality.png" alt="" className="object-contain w-full h-48 rounded-full"/></div>
            </div>
          </div>
          <Logout/>
        </div>
      </div>
    </div>
  )
}

export default withRouter(User)
