import React from 'react'

const BookingLists = ({provider}) => {
  return (
    <div className="space-y-4 pb-16">
                        <h2 className="text-xl font-bold text-gray-800">
                            Recent Bookings
                        </h2>
                        {provider?.provider.bookings.map((booking, index) => (
                            <div
                                key={index}
                                className="bg-white px-4 py-3 rounded shadow flex items-center justify-between">
                                    <div>
                                    <p className="text-lg font-bold">
                                    {booking.serviceName}
                                </p>
                                <p className="text-gray-800 font-semibold">
                                    Booked by: {booking.user.firstName?.charAt(0).toUpperCase() + booking.user.firstName?.slice(1)} {booking.user.lastName?.charAt(0).toUpperCase() + booking.user.lastName?.slice(1)}
                                </p>
                                <p className="text-gray-500 text-sm font-semibold">
                                    Date: {booking.createdAt?.split('T')[0]}
                                </p>
                                <p
                                    className={`text-sm font-semibold ${
                                        booking.status?.toLowerCase() === "Pending"?.toLocaleLowerCase()
                                            ? "text-yellow-600"
                                            : "text-green-500"
                                    }`}>
                                    {booking.status?.charAt(0).toUpperCase() + booking.status?.slice(1)}
                                </p>
                                    </div>
                                <div>
                                    <img className='w-14 h-14 rounded-full' src="https://via.placeholder.com/150/blue?text=Plumbing+Fix" alt="" />
                                </div>
                            </div>
                        ))}
                    </div>
  )
}

export default BookingLists