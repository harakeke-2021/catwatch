import React from 'react'

// eslint-disable-next-line import/no-unresolved
import cat from 'url:../../static/cat.jpeg'

export default function FeedPost (props) {
  return (
    <section className="">
      <div className="flex items-center p-6">
        <div className="flex w-24 h-24 rounded-full" >
          <p className="m-auto text-7xl">😽</p>
        </div>
        <div className="px-8 text-5xl">{props.item}</div>
      </div>
      <div>
        <img className="w-full" src={cat} alt=""/>
      </div>
      <div className="h-24 bg-gray-300"></div>
    </section>
  )
}
