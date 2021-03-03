import React from 'react'

export default function Gossip ({ op, comment }) {
  return (
    <div className="px-2 space-y-3">
      {comment &&
      <GossipItem
        poster={op}
        text={comment}
      />
      }
    </div>
  )
}

function GossipItem ({ poster, text }) {
  return (
    <div>
      <span className="font-bold">{poster}</span>
      <span className="pl-2">{text}</span>
    </div>
  )
}
