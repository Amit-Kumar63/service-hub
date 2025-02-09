import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { useDeleteUserBookingMutation } from '../app/api/api';
import { toast } from 'react-toastify';

const UserBookingsSummary = () => {
    const location = useLocation()
    const { booking } = location.state || {};
    const { token } = useOutletContext()
    const [deleteUserBooking, { isLoading, error, isSuccess }] = useDeleteUserBookingMutation()

    const deleteBookingHandler = async(id) => {
      try {
        await deleteUserBooking({id, token})
      } catch (error) {
        toast.error(error?.data?.message || "Something went wrong, please try again")
        console.error({message: error.message});
      }
    }
    useEffect(() => {
      if (isSuccess) {
        toast.dismiss('delete')
        toast.success('Booking deleted successfully', {toastId: 'delete'})
        const timeOut = setTimeout(() => {
          window.history.back()
        }, 2000);
        return () => clearTimeout(timeOut)
      }
      if (isLoading) {
        toast.loading('Deleting booking...', {toastId: 'delete'})
      }
    }, [isSuccess])
  return (
    <>
    <div className='mt-6 flex items-center justify-between w-full'>
    <h4 className='ml-3' onClick={()=> window.history.back()}>
      <i className="text-2xl text-gray-700 ri-arrow-left-line"></i>
    </h4>
    <h1 className='w-full mr-8 text-center font-semibold text-lg'>ServiceHub</h1>
    </div>
    <div className="max-w-2xl mx-auto mt-2 p-6 border rounded-lg shadow-lg bg-white">
      <h2 className="font-bold text-2xl text-gray-800 mb-6">Booking Summary</h2>
      <div className="flex items-center gap-4 mb-4">
        {/* Provider Image */}
        <img
          src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV4UlS1Ehv87B7_HRdQWlKz8Jw13A0zxuiuQ&s'}
          alt={`${booking.provider.name}'s profile`}
          className="w-16 h-16 rounded-full border object-cover"
        />
        {/* Provider Name */}
        <div>
          <h3 className="font-semibold text-lg text-gray-800">
            {`${booking.provider.name.charAt(0).toUpperCase() + booking.provider.name.slice(1)}`}
          </h3>
          <p className="text-gray-500 text-sm">Service provider</p>
        </div>
      </div>
      {/* Booking Details */}
      <div className="border-t pt-4 space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-gray-600 font-medium">Service Type:</p>
          <p className="text-gray-800 font-semibold">
            {booking.serviceType.charAt(0).toUpperCase() + booking.serviceType.slice(1)}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-gray-600 font-medium">Booking Date:</p>
          <p className="text-gray-800 font-semibold">{booking.createdAt.split('T')[0]}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-gray-600 font-medium">Price:</p>
          <p className="text-gray-800 font-semibold">&#8377;{booking.price}</p>
        </div>
        <div className="flex justify-between items-center mb-4">
          <p className="text-gray-600 font-medium">Status:</p>
          <p
            className={`font-semibold ${
              booking.status === 'pending' ? 'text-yellow-600' : 'text-green-500'
            }`}
          >
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </p>
        </div>
        <button 
        onClick={()=> deleteBookingHandler(booking._id)}
        className='px-6 py-2 bg-red-600 text-white rounded-lg font-semibold w-full'>
        Cancel
        </button>
      </div>
    </div>
    </>
  );
};

export default UserBookingsSummary;
