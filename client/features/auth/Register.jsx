import React, { useCallback, useContext } from 'react'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import app from '../../firebase'
import { AuthContext } from './GetAuthState'

function Register ({ history }) {
  const handleRegister = useCallback(
    async event => {
      event.preventDefault()
      const { email, password } = event.target.elements
      try {
        const userAuth = await app.auth().createUserWithEmailAndPassword(email.value, password.value)

        await app.firestore().collection('users').doc(userAuth.user.uid).set({
          email: email.value,
          id: userAuth.user.uid
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

    <div>
      <div className=" w-full shadow-2xl">
        <div className="w-full h-full max-h-full px-10 py-32 text-xl bg-indigo-500">
          <form className="mx-auto" onSubmit={handleRegister}>
            <div className="flex items-center  bg-indigo-300 border-b border-indigo-500 rounded-t-lg">
              <label htmlFor="name" className="w-20 mr-8 text-right text-pink-100">Email</label>
              <input name="email" type="email" placeholder="Email" autoComplete="on" className="flex-1 p-4 pl-0 text-white placeholder-purple-200 bg-transparent outline-none"/>
            </div >
            <div className="flex items-center mb-10  bg-indigo-300 rounded-b-lg"><label htmlFor="twitter" className="w-20 ml-5 mr-8 text-right text-pink-100">Password</label>
              <input name="password" type="password" placeholder="Password" autoComplete="on" className="flex-1 p-4 pl-0 text-white placeholder-purple-200 bg-transparent outline-none"/></div>
            <button type="submit" className="block w-full py-3 font-bold text-white bg-pink-400 rounded shadow-2xl">Register</button>
            <p className="flex-1 p-4 pl-0 text-pink-100 text-xs">Already part of CATWATCH? Log in <Link to="/login" className='text-pink-400 underline'>here</Link></p>
          </form>
        </div>
      </div>

    </div>
  )
}

export default Register


