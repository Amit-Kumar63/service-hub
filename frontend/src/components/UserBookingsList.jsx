import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const UserBookingsList = ({user}) => {
  return (
    <div className="mt-6">
            <h2 className="font-bold text-lg mb-3">Bookings</h2>
            {user?.user.bookings.map((booking, index) => (
      <Link to='/user-booking-summary' state={{booking}} key={index}>
              <div
                className="flex justify-between border-b py-2 font-semibold text-sm"
              >
                <div>
                  <p className="text-gray-800 text-base">{booking?.serviceType?.charAt(0).toUpperCase() + booking?.serviceType?.slice(1)}</p>
                  <p className="text-gray-500 text-xs mt-1">Booked : {booking?.createdAt.split("T")[0]}</p>
                </div>
                <p className="text-gray-600">&#8377;{booking?.price}</p>
                <div>
                <span className={`${booking.status === "pending" && "text-yellow-600" || booking.status === "accepted" && "text-green-500" || booking.status === "declined" && "text-red-500"}`}>{booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}</span>
                <p className='text-ellipsis text-gray-700'>{booking.provider.firstName?.charAt(0).toUpperCase() + booking.provider.firstName?.slice(1) + " " + booking.provider.lastName?.charAt(0).toUpperCase() + booking.provider.lastName?.slice(1)}</p>
                </div>
              </div>
            </Link> 
            ))}
          </div>
  )
}

export default UserBookingsList