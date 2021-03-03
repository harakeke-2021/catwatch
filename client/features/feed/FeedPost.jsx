import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withIsVisible } from 'react-is-visible'

// eslint-disable-next-line import/no-unresolved
import { selectUserById } from '../user/usersSlice'
import { likePost, selectPostById } from './postsSlice'
import apaw from 'url:../../static/paw.png'
import noApaw from 'url:../../static/bwpaw.png'
import Gossip from './Gossip'
import { AuthContext } from '../auth/GetAuthState'

function FeedPost ({ id, nextPlease, isVisible }) {
  const dispatch = useDispatch()
  const { currentUser } = useContext(AuthContext)

  const post = useSelector(state => selectPostById(state, id))
  const user = useSelector(state => selectUserById(state, post.userID)) ||
    { username: 'anonymous cat' }

  const [imageLoaded, setImageLoaded] = useState(false)
  const [signaled, setSignaled] = useState(false)

  const { aplaws } = post

  const userLiked = !aplaws ? false : aplaws.some(el => el === currentUser.uid)
  const likedCount = !aplaws ? 0 : aplaws.length

  function clickAplaws (e) {
    // setUserLiked(state => !state)
    dispatch(likePost({ postId: id, userId: currentUser.uid, like: !userLiked }))
  }

  useEffect(() => {
    if (imageLoaded && isVisible && !signaled) {
      nextPlease()
      setSignaled(true)
    }
  }, [isVisible, imageLoaded])

  return post ? (
    <section className={`pb-8 transition-all duration-500 ease-in-out ${imageLoaded && isVisible ? 'opacity-100' : 'opacity-100'}`}>
      <div className="flex items-center p-2">
        <div className="flex w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-pink-300" >
          <img className="w-8 h-8 m-auto rounded-full" src={user.userPicture} alt=""/>
        </div>
        <div className="p-4 text-xl text-center text-gradient bg-gradient-to-r from-indigo-500 to-pink-300">{user.username}</div>
      </div>
      {/* <div> */}
      <img className="w-full" src={post.photoUrl} onLoad={() => setImageLoaded(true)} alt=""/>
      <div className="flex justify-between w-full p-4">
        <div onClick={clickAplaws}>
          <img className="w-8 h-8" src={userLiked ? apaw : noApaw} alt="" />
        </div>
        <div>{likedCount || 'no'} aplaws{!likedCount ? '... yet!' : ''}</div>
      </div>
      <Gossip
        op={user.username}
        comment={post.comments}
      />

    </section>
  ) : <h1>loading</h1>
}

export default withIsVisible(FeedPost)
