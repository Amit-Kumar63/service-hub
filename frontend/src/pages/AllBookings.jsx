import { useState } from 'react'
import UserBookingsList from '../components/UserBookingsList'
import { useOutletContext } from 'react-router-dom'
import { SetTitle } from '../components/SetTitle'

const AllBookings = () => {
  const { user } =useOutletContext()
  const [userData, setUserData] = useState(user || {})
  return (
    <div className='bg-white w-full h-full px-4'>
      <UserBookingsList user={userData} viewAllBookings={true}/>
      <SetTitle title="All Bookings" />
    </div>
  )
}

export default AllBookings