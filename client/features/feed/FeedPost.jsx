import React from 'react'

// eslint-disable-next-line import/no-unresolved
import cat from 'url:../../static/cat.jpeg'

export default function FeedPost (props) {
  return (
    <section className="pb-12">
      <div className="flex items-center p-6">
        <div className="flex w-24 h-24 bg-green-500 rounded-full" >
          <p className="m-auto text-7xl">😽</p>
        </div>
        <div className="px-8 text-3xl">{props.item}</div>
      </div>
      <div>
        <img className="w-full" src={cat} alt=""/>
      </div>
      <div className="h-16 bg-gray-300"></div>
      <div className="h-24 text-2xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, vel magni. Non impedit id ducimus delectus a. Voluptatibus, qui temporibus!</div>
    </section>
  )
}
