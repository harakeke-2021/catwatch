import React from 'react'
import Profile from './Profile'
import Leaderboard from './Leaderboard'
import Logo from './Logo'

export default function Header () {
  return (
    <div>
      <header className="flex flex-row py-5 text-center text-white bg-gray-700">
        <li className="flex-none list-none"><button>
          <Leaderboard/>
        </button></li>
        <li className="flex-grow list-none"><button>
          <Logo />
        </button></li>
        <li className="flex-none list-none" > <button>
          <Profile />
        </button></li>

      </header>
    </div>
  )
}
