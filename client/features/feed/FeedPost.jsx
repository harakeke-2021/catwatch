import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { withIsVisible } from 'react-is-visible'

// eslint-disable-next-line import/no-unresolved
import { selectUserById } from '../user/usersSlice'
import { selectPostById } from './postsSlice'

function FeedPost ({ id, nextPlease, isVisible }) {
  const post = useSelector(state => selectPostById(state, id))
  const user = useSelector(state => selectUserById(state, post.userID)) ||
    { username: 'anonymous cat' }

  const [imageLoaded, setImageLoaded] = useState(false)
  const [signaled, setSignaled] = useState(false)

  useEffect(() => {
    if (imageLoaded && isVisible && !signaled) {
      nextPlease()
      setSignaled(true)
    }
  }, [isVisible, imageLoaded])

  return post ? (
    <section className={`pb-12 transition-all duration-100 ease-in-out ${imageLoaded && isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="flex items-center p-4">
        <div className="flex w-8 h-8 bg-green-500 rounded-full" >
          <p className="m-auto">😽</p>
        </div>
        <div className="px-8">{user.username}</div>
      </div>
      <div>
        <img className="w-full" src={post.photoUrl} onLoad={() => setImageLoaded(true)} alt=""/>
      </div>
      <div className="h-8 p-2 bg-gray-300"></div>
      <div className="h-24 p-2 text-sm">{post.comments}</div>
    </section>
  ) : <h1>loading</h1>
}

export default withIsVisible(FeedPost)
