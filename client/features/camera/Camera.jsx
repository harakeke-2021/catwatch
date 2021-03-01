import React, { useState } from 'react'

function Camera () {
  const [img, setImg] = useState(null)
  const [caption, setCaption] = useState('')

  function addImg (e) {
    setImg(e.target.files[0])
  }

  function addCaption (e) {
    const { value } = e.target
    setCaption(value)
  }

  function resetForm () {
    setImg(null)
    setCaption('')
  }

  function submitForm () {
    console.log(URL.createObjectURL(img))
    console.log(caption)
    // upload image to firebase storage
    // then, put data in firestore and:
    resetForm()
  }

  return (
    <form onSubmit={submitForm}>
      <button onClick={resetForm}>Back</button>
      {
        img
          ? (<>
            <img src={URL.createObjectURL(img)}/>
            <input type='text' placeholder='caption' value={caption} onChange={addCaption}/>
            <button type='submit'>Submit</button>
          </>)
          : <input type='file' id='imageFile' capture='environment' accept='image/*' onChange={addImg}/>
      }
    </form>
  )
}

export default Camera
