import React, { useCallback, useContext } from 'react'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import app from '../../firebase'
import { AuthContext } from './GetAuthState'
import cat from 'url:../../static/defaultUserCat.jpg'

function Register ({ history }) {
  const handleRegister = useCallback(
    async event => {
      event.preventDefault()
      const { email, password, username } = event.target.elements
      try {
        const userAuth = await app.auth().createUserWithEmailAndPassword(email.value, password.value)

        await app.firestore().collection('users').doc(userAuth.user.uid).set({
          username: username.value,
          email: email.value,
          id: userAuth.user.uid,
          userPicture: cat
        })
        history.push('/')
      } catch (error) {
        alert(error)
      }
    },
    [history]
  )

  const { currentUser } = useContext(AuthContext)

  if (currentUser) {
    return <Redirect to="/" />
  }

  return (

    <div className="h-full">
      <div className="h-full shadow-2xl">
        <div className="flex flex-col w-screen h-full py-32 text-xl bg-indigo-500 sm:px-32">
          <form className="items-center w-full mx-auto my-auto lg:w-auto" onSubmit={handleRegister} >
            <div className="flex items-center bg-indigo-300 border-b border-indigo-500 sm:rounded-t-lg">
              <label htmlFor="name" className="ml-2 mr-8 text-pink-100 w-28">User Name</label>
              <input name="username" type="text" placeholder="User Name" autoComplete="on" className="flex-1 p-4 pl-0 overflow-auto text-white placeholder-purple-200 bg-transparent outline-none "/>
            </div >
            <div className="flex items-center bg-indigo-300 border-b border-indigo-500 ">
              <label htmlFor="name" className="ml-2 mr-8 text-pink-100 w-28">Email</label>
              <input name="email" type="email" placeholder="Email" autoComplete="on" className="flex-1 p-4 pl-0 overflow-auto text-white placeholder-purple-200 bg-transparent outline-none"/>
            </div >
            <div className="flex items-center mb-10  bg-indigo-300 sm:rounded-b-lg"><label htmlFor="twitter" className="ml-2 mr-8 text-pink-100 w-28">Password</label>
              <input name="password" type="password" placeholder="Password" autoComplete="on" className="flex-1 p-4 pl-0 overflow-auto text-white placeholder-purple-200 bg-transparent outline-none"/></div>
            <button type="submit" className="block w-full py-3 font-bold text-white bg-pink-400 rounded shadow-2xl">Register</button>
            <p className="flex-1 p-4 pl-0 ml-8 text-xs text-pink-100 sm:ml-0">Already part of CATWATCH? Log in <Link to="/login" className='text-pink-400 underline'>here</Link></p>
          </form>

        </div>
      </div>
    </div>
  )
}

export default Register
