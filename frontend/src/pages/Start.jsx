import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div className='w-full h-screen bg-white flex flex-col justify-between items-center font-montserrat'>
      <div className='w-full h-[60%] relative'>
      <h2 className='text-center text-2xl font-bold py-3'>ServiceHub</h2>
      <div className='absolute w-full text-center z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[15%]'>
      <h2 className='text-white flex flex-col text-3xl font-extrabold leading-9'>Get more done with ServiceHub app</h2>
      <p className='text-white text-xs leading-5 font-medium mt-2 px-16'>Find skilled proffessional to help you with everything from home projects to moving and delivery</p>
      </div>
      <div className='w-full h-full bg-black absolute opacity-[30%]'></div>
        <img className='w-full h-full object-cover' src="start.png" alt="" />
      </div>
      <div className='w-full flex flex-col justify-center items-center gap-3 pb-5 px-5'>
        <Link to="/home" className='rounded-lg w-full py-3 bg-[#1a80e6] text-white text-center font-bold'>Continue</Link>
        <p className='text-xs font-medium text-gray-500'>By continuing, you agree to our terms</p>
      </div>
      <div className='w-full'>
        <p className='text-base text-center font-medium text-black'>Get start as a <span className='text-[#1a80e6] font-semibold'>Service Provider</span></p>
        <Link to="/provider/login" className='bg-[#0A090D] text-white font-semibold py-3 px-3 flex justify-center items-center mt-3'>Start as a Service Provider</Link>
      </div>
    </div>
  )
}

export default Start