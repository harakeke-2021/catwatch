import React, { useContext, useEffect, useState } from 'react'
import { Redirect } from 'react-router'
import Logout from '../auth/Logout'
import { AuthContext } from '../auth/GetAuthState'
import app from '../../firebase'

function User () {
  useEffect(() => {
    fetchUserData()
  }, [])

  useEffect(() => {
    fetchUserSightings()
  }, [])

  const [userDetails, setUserDetails] = useState({})
  const [userSightings, setUserSightings] = useState([])

  const { currentUser } = useContext(AuthContext)
  if (!currentUser) {
    return <Redirect to="/login" />
  }

  const fetchUserData = async () => {
    const userRef = app.firestore().collection('users').where('id', '==', `${currentUser.uid}`)
    const user = await userRef.get()
    user.docs.forEach(item => {
      setUserDetails(item.data())
    })
  }

  const fetchUserSightings = async () => {
    const sightingsRef = app.firestore().collection('sightings').where('userID', '==', `${currentUser.uid}`)
    const sighting = await sightingsRef.get()
    const list = sighting.docs.map(item => item.data())
    setUserSightings(list)
  }

  // location.x_ = latitude
  // location.N_ = longitude

  return (
    <>
      <div className="items-center justify-center flex-1 h-full overflow-y-auto divide-y divide-gray-100">
        <div className="flex rounded-lg">
          <div className="flex flex-col items-center justify-center h-screen">
            <img src="https://gm1.ggpht.com/e-Dg7SIqvxsSElDeg27q4vjCA176Zfo4p1OhAqb2dHTNiOL_S9o_vlgbMsUD1gy4Ng-84ilP3Rxt2_E5LTCVFbJsACtCAL9tUygH0I6FePO_HXD6Wk62QrAKXH4Y5XGkXeYRYDtj5lt2ItVnFQ59ROpTSSFg5lPCfGX-qa7ZRBC3n3qJdg2PtsXXS7TZ-nSD7C2PBPNRKAfX7olHQjvCS_dnth5VgA3BBNT0HNUXVHuxZCdjSsMZCjxGOqJ0RmBZyRyiZiAKq1fi8-bKXZ0e6l4pzn3I5H104DPfmEFGK_HjorbeZw30fEwuoOYMJG2_QcTLMRIgSJwccNFRXEbkr5rnt0zizXHwMP4ETfo3kl-2Ww_W8jHRoqKi6h_LTvOyCKg5n9OmkfJqn8BwOsOheEWIA615m-ivgzHuHc3g47QI_dmbI9YQ8ZtJAOfN7fBq93zxOPtsKxfbQKItoL6uRCdvqCtkIPBJCFQhu9crz0iRqdK4jXdH9f9WUUdiVI_0WG2pHekyXesDFBqBzK1LI_XdKRRdhvWyo1UIiZOwmhxpYgzOJsGddi0q1p4pAzd8eHiuQFZA2YuTBJY8B29VRfBkR9m-LqU_kdmsEPFIHYevfxFsT2WiUwLcHsRpFNRUrNBmC4UFc416Ah4s0l-3c20vnd_O-uylJ_suAO9Ib64bhHDYyUS7nEFZSfG3Soa9rsH92M84C1q88xLspsL1YaWNcfVL3EkL3BEPgVHUHcg7OTpwTxhfouT-YBRht5sNZlI=s0-l75-ft-l75-ft"
              alt="" className="w-32 h-32 mt-5 border-2 border-gray-400 rounded-full"/>
            <h1 className="pt-5 text-xl font-semibold text-gradient bg-gradient-to-r from-indigo-500 to-pink-400 rounded-md">{userDetails.email}</h1>
            <h1 className="p-4 text-sm text-gradient bg-gradient-to-r from-indigo-500 to-pink-300">Auckland, New Zealand</h1>
            <div className="w-11/12 h-full mt-2 overflow-y-hidden bg-gradient-to-bl from-indigo-200 to-pink-300 rounded-md">
              <div className="flex flex-wrap w-full m-0 justify-left h-max">
                {userSightings.map((result, index) => (
                  <div className="w-4/12 border-2 border-transparent m-0.4" key={index}>
                    <img className="w-full h-full rounded-sm" src={result.photoUrl} alt="catpic"/>
                  </div>
                ))}
              </div>
            </div>
            {/* <Logout/>  will add logout button on hamburguer icon bg-gradient-to-bl from-indigo-200 to-pink-300 */}
          </div>
        </div>
      </div>
    </>
  )
}

export default User
