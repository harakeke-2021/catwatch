import React from 'react'
import Footer from './Footer'
import Header from './Header'

export default function Nav ({ children, display }) {
  return display ? (<>
    <Header />
    <div className='flex-1 overflow-y-auto'>
      {children}
    </div>
    <Footer/>
  </>)
    : children
}
