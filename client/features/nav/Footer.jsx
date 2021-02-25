import React from 'react'

import Map from './MapButton'
import CameraButton from './CameraButton'

export default function Footer () {
  return (
    <footer className="flex flex-row py-5 text-center text-white bg-gray-700">
      <li className="flex-none list-none"><button>
        <Map />
      </button></li>
      <li className="flex-grow list-none"><button>
        <CameraButton />
      </button></li>
      <li className="flex-none list-none"><button>
        <CameraButton />
      </button></li>
    </footer>
  )
}
