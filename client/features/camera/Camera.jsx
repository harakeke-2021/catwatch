import React, { useState } from 'react'

function Camera () {
  const [img, setImg] = useState(null)

  function onChange (e) {
    setImg(e.target.files[0])
  }
  return (
    <>
      <h2>hello world!</h2>
      <input type="file" id="imageFile" capture="environment" accept="image/*" onChange={onChange}/>
      {
        img
          ? <img src={URL.createObjectURL(img)}/>
          : <p>no image specified</p>
      }
    </>
  )
}

export default Camera
