import React from 'react'
import { useSelector } from 'react-redux'
export default function Feed () {
  const count = useSelector(state => state.feed.value)

  return (<h2 className="p-4">{count} is cool</h2>)
}
