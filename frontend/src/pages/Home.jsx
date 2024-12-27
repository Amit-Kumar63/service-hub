import React, { useEffect } from 'react'
import ServiceCard from '../components/ServiceCard'
import NavigationBar from '../components/NavigationBar'
import { useNavigate } from 'react-router-dom'
import { useGetUserQuery } from '../app/api/api'

const Home = () => {
  const token = localStorage.getItem('token')

  const { data, isSuccess, isError, isLoading } = useGetUserQuery()
  
  const navigate = useNavigate()

  useEffect(() => {
    // console.log('data', data);
  }, [isLoading])
  return (
    <div className='w-full h-screen font-montserrat py-5 px-4'>
        <div className='flex items-center justify-between w-full'>
        <h2 className='text-lg font-bold w-full text-center'>Services</h2>
        {
          token ? <i className="text-2xl plas ri-shopping-cart-2-line"></i> : <i onClick={()=> navigate('/login') } className="text-2xl plas ri-user-3-line"></i>
        }
        </div>
        <div className='mt-8 relative'>
        <i className="text-gray-600 text-2xl absolute top-[18%] left-4 ri-search-line"></i>
            <input className='w-full py-3 px-4 pl-12 placeholder:text-base placeholder:text-gray-500 rounded-lg bg-[#E8EEF2]' type="search" placeholder='Search for service' />
        </div>
        <div className='mt-8 w-full'>
          <h1 className='text-2xl font-bold'>Popular services</h1>
          <div className='mt-8 space-y-7'>
            <ServiceCard />
            <ServiceCard />
            <ServiceCard />
            <ServiceCard />
            <ServiceCard />
            <ServiceCard />
            <ServiceCard />
            <ServiceCard />
          </div>
        </div>
        <NavigationBar />
    </div>
  )
}

export default Home