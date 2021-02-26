import React from 'react'
import Logo from './Logo'
import NavButton from './NavButton'

export default function Header () {
  return (
    <header className="text-6xl shadow-lg">
      <div className="flex justify-between p-8 px-12">
        <NavButton target="/leaderboard" className="fas fa-trophy" />
        <Logo/>
        <NavButton target="/user" className="fas fa-user"/>
      </div>
    </header>
  )
}
