import { useState } from 'react'
import UserBookingsList from '../components/UserBookingsList'
import { useOutletContext } from 'react-router-dom'

const AllBookings = () => {
  const { user } =useOutletContext()
  const [userData, setUserData] = useState(user || {})
  return (
    <div className='bg-white w-full h-full px-4'>
      <UserBookingsList user={userData} viewAllBookings={true}/>
    </div>
  )
}

export default AllBookings