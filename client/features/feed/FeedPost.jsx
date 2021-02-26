import React from 'react'

// eslint-disable-next-line import/no-unresolved
import cat from 'url:../../static/cat.jpeg'

export default function FeedPost (props) {
  return (
    <section className="pb-12">
      <div className="flex items-center p-4">
        <div className="flex w-8 h-8 bg-green-500 rounded-full" >
          <p className="m-auto">😽</p>
        </div>
        <div className="px-8">{props.item}</div>
      </div>
      <div>
        <img className="w-full" src={cat} alt=""/>
      </div>
      <div className="h-8 p-2 bg-gray-300"></div>
      <div className="h-24 p-2 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, vel magni. Non impedit id ducimus delectus a. Voluptatibus, qui temporibus!</div>
    </section>
  )
}
