import React from 'react'
import NavButton from './NavButton'

export default function Footer () {
  return (
    <footer className="text-2xl shadow-lg transform rotate-180">
      <div className="flex justify-between p-2 px-6 transform rotate-180">
        {/* map camera feed */}
        <NavButton target="/map" className="fas fa-map" />
        <NavButton target="/camera" className="fas fa-camera" />
        <NavButton target="/feed" className="fas fa-fish" />
      </div>
    </footer>
  )
}
