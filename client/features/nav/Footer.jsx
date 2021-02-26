import React from 'react'
import NavButton from './NavButton'

export default function Footer () {
  return (
    <footer className="text-6xl shadow-lg transform rotate-180">
      <div className="flex justify-between p-4 px-12 transform rotate-180">
        {/* map camera feed */}
        <NavButton target="/map" className="fas fa-map text-gradient bg-gradient-to-r from-pink-400 to-indigo-500" />
        <NavButton target="/camera" className="fas fa-camera text-gradient bg-gradient-to-r from-pink-400 to-indigo-500" />
        <NavButton target="/feed" className="fas fa-fish text-gradient bg-gradient-to-r from-pink-400 to-indigo-500" />
      </div>
    </footer>
  )
}
