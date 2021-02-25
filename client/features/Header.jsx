import React from 'react'
import Profile from './Profile'
import Camera from './Camera'
import Leaderboard from './Leaderboard'

export default function Header () {
  return (
    <div>
      <header className="flex flex-row py-5 text-center text-white bg-gray-700">
        <button>
          <Leaderboard className="flex-none h-16"/>
        </button>
        <button>
          <Camera className="flex-grow h-16"/>
        </button>
        <button>
          <Profile className="flex-none h-16" />
        </button>

      </header>
    </div>
  )
}
