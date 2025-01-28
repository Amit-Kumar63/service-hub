import { useState } from 'react'
import UserBookingsList from '../components/UserBookingsList'

const AllBookings = ({user}) => {
  const [userData, setUserData] = useState(user || {})
  return (
    <div className='bg-white w-full h-full px-4'>
      <UserBookingsList user={userData}/>
    </div>
  )
}

export default AllBookings