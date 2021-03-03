import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { withIsVisible } from 'react-is-visible'

// eslint-disable-next-line import/no-unresolved
import { selectUserById } from '../user/usersSlice'
import { selectPostById } from './postsSlice'
import apaw from 'url:../../static/paw.png'
import noApaw from 'url:../../static/bwpaw.png'

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
    <section className={`pb-4 transition-all duration-500 ease-in-out ${imageLoaded && isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="flex items-center p-2">
        <div className="flex w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-pink-300" >
          <img className="w-8 h-8 m-auto rounded-full" src={user.userPicture} alt=""/>
        </div>
        <div className="p-4 text-xl text-center text-gradient bg-gradient-to-r from-indigo-500 to-pink-300">{user.username}</div>
      </div>
      <div>
        <img className="w-full" src={post.photoUrl} onLoad={() => setImageLoaded(true)} alt=""/>
      </div>
      <div className="p-1 bg-gray-200">
        <div className="justify-center h-8 p-2 text-sm">{post.comments}</div>
        <img src={noApaw} alt="" className="inline-block w-14 h-14"/>
        <img src={apaw} alt="" className="inline-block m-auto"/>
      </div>

    </section>
  ) : <h1>loading</h1>
}

export default withIsVisible(FeedPost)
