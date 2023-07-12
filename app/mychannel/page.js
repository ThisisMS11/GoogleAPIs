import React from 'react'

const MyChannel = () => {
  return (
    <div className='h-[100vh] flex items-center justify-center'>
      <iframe className='w-[48rem] h-2/3 rounded-lg' src="https://www.youtube.com/embed/RgKAFK5djSk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </div>
  )
}

export default MyChannel