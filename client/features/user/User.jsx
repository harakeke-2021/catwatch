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
    <div className="items-center justify-center flex-1 overflow-y-auto divide-y divide-gray-100">
      <div className="flex w-1/3 mt-5 bg-transparent rounded-lg">
        <div className="flex flex-col items-center justify-center pt-10">
          <img src="https://freepngimg.com/thumb/cartoon/86245-purple-cat-art-sans-undertale-png-image-high-quality.png" alt="" className="w-32 bg-indigo-300 rounded-full"/>
          <h1 className="text-xl font-semibold text-gray-800">Mariano</h1>
          <h1 className="p-4 text-sm text-gray-400">Buenos Aires, Argentina</h1>
          <h1 className="p-4 text-sm text-center text-gray-400"></h1>
          <div className="flex flex-wrap mt-2 bg-gray-300 border-black rounded-md">
            <div className="flex flex-wrap w-screen">
              <div className="w-2/6 m-4 bg-white rounded-md"><img src="https://freepngimg.com/thumb/cartoon/86245-purple-cat-art-sans-undertale-png-image-high-quality.png" alt="" className="object-contain w-full h-48 rounded-full"/></div>
              <div className="w-2/6 m-4 bg-white rounded-md"><img src="https://freepngimg.com/thumb/cartoon/86245-purple-cat-art-sans-undertale-png-image-high-quality.png" alt="" className="object-contain w-full h-48 rounded-full"/></div>
              <div className="w-2/6 m-4 bg-white rounded-md"><img src="https://freepngimg.com/thumb/cartoon/86245-purple-cat-art-sans-undertale-png-image-high-quality.png" alt="" className="object-contain w-full h-48 rounded-full"/></div>
              <div className="w-2/6 m-4 bg-white rounded-md"><img src="https://freepngimg.com/thumb/cartoon/86245-purple-cat-art-sans-undertale-png-image-high-quality.png" alt="" className="object-contain w-full h-48 rounded-full"/></div>
              <div className="w-2/6 m-4 bg-white rounded-md"><img src="https://freepngimg.com/thumb/cartoon/86245-purple-cat-art-sans-undertale-png-image-high-quality.png" alt="" className="object-contain w-full h-48 rounded-full"/></div>
              <div className="w-2/6 m-4 bg-white rounded-md"><img src="https://freepngimg.com/thumb/cartoon/86245-purple-cat-art-sans-undertale-png-image-high-quality.png" alt="" className="object-contain w-full h-48 rounded-full"/></div>
              <div className="w-2/6 m-4 bg-white rounded-md"><img src="https://freepngimg.com/thumb/cartoon/86245-purple-cat-art-sans-undertale-png-image-high-quality.png" alt="" className="object-contain w-full h-48 rounded-full"/></div>
              <div className="w-2/6 m-4 bg-white rounded-md"><img src="https://freepngimg.com/thumb/cartoon/86245-purple-cat-art-sans-undertale-png-image-high-quality.png" alt="" className="object-contain w-full h-48 rounded-full"/></div>
              <div className="w-2/6 m-4 bg-white rounded-md"><img src="https://freepngimg.com/thumb/cartoon/86245-purple-cat-art-sans-undertale-png-image-high-quality.png" alt="" className="object-contain w-full h-48 rounded-full"/></div>
              <div className="w-2/6 m-4 bg-white rounded-md"><img src="https://freepngimg.com/thumb/cartoon/86245-purple-cat-art-sans-undertale-png-image-high-quality.png" alt="" className="object-contain w-full h-48 rounded-full"/></div>
              <div className="w-2/6 m-4 bg-white rounded-md"><img src="https://freepngimg.com/thumb/cartoon/86245-purple-cat-art-sans-undertale-png-image-high-quality.png" alt="" className="object-contain w-full h-48 rounded-full"/></div>
              <div className="w-2/6 m-4 bg-white rounded-md"><img src="https://freepngimg.com/thumb/cartoon/86245-purple-cat-art-sans-undertale-png-image-high-quality.png" alt="" className="object-contain w-full h-48 rounded-full"/></div>
            </div>
          </div>
        </div>
        <Logout/>
      </div>
    </div>
    // <h1>test</h1>
  )
}

export default withRouter(User)
