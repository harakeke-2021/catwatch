import React from 'react'
import { Route } from 'react-router'

import CamBtn from './CamBtn'
import Caption from './Caption'

function Camera () {
  return (
    <>
      <Route exact path="/" component={CamBtn}/>
      <Route path='/caption' component={Caption}/>
    </>
  )
}

export default Camera
