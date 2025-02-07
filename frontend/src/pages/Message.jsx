import React from 'react'
import { Link } from 'react-router-dom'

const Message = () => {
  return (
    <div className='flex flex-col gap-28 px-5 text-center font-semibold text-sm pt-10 text-gray-600'>
        This feature is currently under development
        <Link to="/user/home" className='text-white px-2 py-3 text-lg bg-black rounded-md mt-3'>Home</Link>
    </div>
  )
}

export default Message