import React from 'react'
import { useHistory, useRouteMatch } from 'react-router'

export default function NavButton ({ className, target }) {
  const history = useHistory()

  const routeMatch = useRouteMatch(target)

  function navigate (e) {
    e.preventDefault()
    history.push(target)
  }

  return (
    <div onClick={navigate} className={`p-2 rounded-xl ${routeMatch ? 'bg-gradient-to-r from-pink-400 to-indigo-500' : ''}`}>
      {/* <div className="flex justify-center w-20 h-20 p-3 bg-white rounded-lg"> */}
      <div className="flex items-center justify-center w-6 h-6">
        <div className={`${className} ${routeMatch ? 'text-white' : 'text-gradient bg-gradient-to-r from-pink-400 to-indigo-500'}`}></div>
      </div>
      {/* </div> */}
    </div>
  )
}
