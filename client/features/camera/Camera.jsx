import React from 'react'
import { Route } from 'react-router'

import CamBtn from './CamBtn'
import Caption from './Caption'

function Camera () {
  return (
    <>
      <Route exact path="/camera" component={CamBtn}/>
      <Route path='/camera/caption' component={Caption}/>
    </>
  )
}

export default Camera
