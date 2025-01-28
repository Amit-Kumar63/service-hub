import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import UserBookingsList from "../components/UserBookingsList";

const ProfilePage = ({ user, isLoading, isSuccess }) => {
  const [viewAllBookings, setViewAllBookings] = useState(user?.user.bookings.length <= 3 ? true : false);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
  const handleLogout = async () => {
    try {
     const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
      });
      if (response.status === 200){
        localStorage.removeItem("token");
        navigate("/user/home");
      }
    } catch (error) {
     console.error({message: error.message});
  }}
  return (
    <div className="bg-white min-h-screen flex justify-center items-center p-4 pb-20">
      {
        isLoading ? (
          <div className="w-full h-full flex flex-col justify-center items-center">
            <span className="mt-2 font-semibold text-lg">Loading...</span>
            <CircularProgress />  
          </div>
        )  : isSuccess && (
          <div className="p-2 w-full">
          {/* Back Button */}
          <div onClick={()=> navigate(-1) } className="text-gray-500 text-2xl mb-4">&larr;</div>
  
          {/* Profile Section */}
          <div className="text-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD7c15mqbUC9Ube6XGhKYSsY9KC2v76CwEJA&s"
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto object-cover"
            />
            <h1 className="text-lg font-bold mt-4">
              {user?.user.firstName.charAt(0).toUpperCase() + user?.user.firstName.slice(1)} {user?.user.lastName.charAt(0).toUpperCase() + user?.user.lastName.slice(1)}
            </h1>
            <p className="text-sm text-gray-500">
              Joined in {user?.user.createdAt?.split("T")[0]}
            </p>
            <p className="text-sm text-gray-500 text-ellipsis">{user?.user.address}</p>
          </div>
  
          {/* Edit and Logout Buttons */}
          <div className="flex justify-between gap-3 mt-4">
            <button className="w-1/2 bg-gray-200 font-bold text-gray-700 py-2 px-4 rounded-lg">
              Edit
            </button>
            <button onClick={handleLogout} className="w-1/2 bg-blue-500 font-bold text-white py-2 px-4 rounded-lg">
              Log out
            </button>
          </div>
  
          {/* Contact Section */}
          <div className="mt-6">
            <h2 className="font-bold text-lg mb-3">Contact and address</h2>
            <div className="flex items-center mb-3">
              <span className="text-gray-500 mr-3">📞</span>
              <span className="font-semibold text-base text-gray-600">{user?.user.phone}</span>
            </div>
            <div className="flex items-center mb-2">
              <span className="text-gray-500 mr-2">📧</span>
              <span className="font-semibold text-base text-gray-600">{user?.user.email}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-500 mr-2">🏠</span>
              <div>
                <span className="font-semibold">Address</span>
                <p className="text-sm text-gray-500 font-semibold">
                  {user?.user.address}
                </p>
              </div>
            </div>
          </div>
  
          {/* Bookings Section */}
          <div>
          <UserBookingsList user={user} viewAllBookings={viewAllBookings}/>
          <Link 
          className={`${user?.user.bookings.length <= 3 ? "hidden" : 'flex'} justify-center py-2 mt-5 mx-auto px-3 text-sm text-slate-700 border border-solid border-slate-200 font-semibold w-fit rounded-md `} 
          to='/user/all-bookings'>
            View all bookings
          </Link>
          </div>
        </div>
        )
      }
    </div>
  );
};

export default ProfilePage;
