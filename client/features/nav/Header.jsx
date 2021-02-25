import React from 'react'
import ProfileButton from './ProfileButton'
import LeaderboardButton from './LeaderboardButton'
import MainCatLogo from './MainCatLogo'

export default function Header () {
  return (
    <div>
      <header className="flex flex-row py-5 text-center text-white bg-gray-700">
        <li className="flex-none list-none"><button>
          <LeaderboardButton/>
        </button></li>
        <li className="flex-grow list-none"><button>
          <MainCatLogo />
        </button></li>
        <li className="flex-none list-none" > <button>
          <ProfileButton />
        </button></li>

      </header>
    </div>
  )
}
