import React from 'react'
import Logo from './Logo'
import NavButton from './NavButton'

export default function Header () {
  return (
    <header className="text-2xl shadow-lg">
      <div className="flex items-center justify-between p-2 px-3">
        <NavButton target="/leaderboard" className="fas fa-trophy" />
        <Logo/>
        <NavButton target="/user" className="fas fa-user"/>
      </div>
    </header>
  )
}
