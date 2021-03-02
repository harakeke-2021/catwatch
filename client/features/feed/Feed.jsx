import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FeedPost from './FeedPost'
import { fetchPosts, selectPostIds } from './postsSlice'

export default function Feed () {
  const dispatch = useDispatch()
  const postsIds = useSelector(selectPostIds)

  useEffect(() => {
    dispatch(fetchPosts())
  }, [])

  useEffect(() => {
    setRenderUntil(1)
  }, [postsIds])

  function nextPlease () {
    setRenderUntil(state => state + 1)
  }

  const [renderUntil, setRenderUntil] = useState(1)

  const readyPosts = postsIds.slice(0, renderUntil)

  return (
    <main className="divide-y divide-gray-100">
      {readyPosts.map(id =>
        <FeedPost key={id} id={id} nextPlease={nextPlease} />
      )}

    </main>
  )
}
