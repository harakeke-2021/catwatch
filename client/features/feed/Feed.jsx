import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FeedPost from './FeedPost'
import { fetchPosts, selectPostIds } from './postsSlice'
export default function Feed () {
  const items = ['ya boi kenneth', 'bob', 'fred']
  const dispatch = useDispatch()

  const postsIds = useSelector(selectPostIds)

  useEffect(() => {
    dispatch(fetchPosts())
  }, [])

  return (
    <main className="divide-y divide-gray-100">
      {postsIds.map(id =>
        <FeedPost key={id} id={id} />
      )}

    </main>
  )
}
