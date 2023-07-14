import React from 'react'
import { PulseLoader } from 'react-spinners'

const Preloader = () => {
  return (
    <div className='h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]'>
      <PulseLoader color={'#ffffff'} size={'2rem'} />
    </div>
  )
}

export default Preloader
