import React from 'react'
import { useHistory, useRouteMatch } from 'react-router'

export default function NavButton ({ className, target }) {
  const history = useHistory()

  const routeMatch = useRouteMatch(target)

  function navigate (e) {
    e.preventDefault()
    history.push(target)
  }

  return routeMatch ? (
    <div className="flex p-2 rounded-xl bg-gradient-to-r from-pink-400 to-indigo-500">
      <div className="flex p-3 bg-white rounded-lg">
        <button onClick={navigate} className={className}></button>
      </div>
    </div>
  ) : (
    <div className="flex p-2">
      <div className="flex p-3 rounded-lg">
        <button onClick={navigate} className={className}></button>
      </div>
    </div>
  )
}
