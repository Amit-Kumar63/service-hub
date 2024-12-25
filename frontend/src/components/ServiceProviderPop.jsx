import React from 'react'

const ServiceProviderPop = ({...props}) => {
  return (
    <div>
        <h5 onClick={()=> props.setServicePanel(false)} className='text-center pt-2'>
        <i className="text-2xl text-gray-700 ri-arrow-down-wide-line"></i>
        </h5>
        <div className='flex items-center justify-between p-4'>
            <img className='w-14 h-14 object-cover rounded-full' src="https://static.wikia.nocookie.net/b30b9ff3-a9f8-41a4-b620-87990cf3a233/scale-to-width/755" alt="" />
            <div>
                <h4 className='text-lg font-semibold'>Amit Kumar</h4>
                <p className='text-sm'>Electrician, Home service provider</p>
            </div>
            <i className="text-2xl ri-heart-line"></i>
        </div>
        <div className='p-4 flex gap-5 mt-2'>
        <div className='flex h-fit'>
        <i className="text-2xl p-3 bg-[#E8EEF2] rounded-md ri-information-line"></i>
        </div>
        <div className=''>
            <h4 className='text-lg font-semibold'>About this business</h4>
            <p className='text-sm text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, quas!</p>
        </div>
        </div>
        <div className='p-4'>
        <button onClick={()=> props.setBookServicePanel(true)} className='w-full bg-[#1980E6] text-white font-semibold py-2 px-4 rounded'>
            Book now
        </button>
        </div>
    </div>
  )
}

export default ServiceProviderPop