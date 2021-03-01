import React from 'react'
import FeedPost from './FeedPost'
export default function Feed () {
  const items = ['ya boi kenneth', 'bob', 'fred']

  return (
    <main className="divide-y divide-gray-100">
      {items.map(item =>
        <FeedPost key={item} item={item} />
      )}

    </main>
  )
}
