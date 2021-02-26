import React from 'react'
import Logo from './Logo'
import NavButton from './NavButton'

export default function Header () {
  return (
    <header className="text-5xl shadow-lg">
      <div className="flex justify-between p-8 px-12">
        <NavButton target="/leaderboard" className="fas fa-trophy text-gradient bg-gradient-to-r from-pink-400 to-indigo-500" />
        <Logo/>
        <NavButton target="/user" className="fas fa-user text-gradient bg-gradient-to-r from-pink-400 to-indigo-500"/>
      </div>
    </header>
  )
}
