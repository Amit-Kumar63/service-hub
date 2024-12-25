import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProfilePage = () => {
    const navigate = useNavigate();
  const user = {
    name: "Liam",
    age: 30,
    gender: "male",
    joinedYear: 2019,
    location: "San Francisco, CA",
    phone: "+1 ***-***-1234",
    email: "liam@gmail.com",
    address: "1234 Mission St, San Francisco, CA",
    bookings: [
      { service: "Handyman", date: "Jan 20, 2023", price: "$120" },
      { service: "Moving", date: "Jan 21, 2023", price: "$200" },
      { service: "Cleaning", date: "Jan 22, 2023", price: "$80" },
    ],
  };

  const handleLogout = async () => {
    try {
        const token = localStorage.getItem('token');
     const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
      });
      if (response.status === 200){
        localStorage.removeItem("token");
        navigate("/home");
      }
    } catch (error) {
     console.error({message: error.message});
  }}
  return (
    <div className="bg-white min-h-screen flex justify-center items-center p-4">
      <div className="p-6 w-full">
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
            {user.name}, age {user.age}, {user.gender}
          </h1>
          <p className="text-sm text-gray-500">
            Joined in {user.joinedYear}
          </p>
          <p className="text-sm text-gray-500">{user.location}</p>
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
            <span>{user.phone}</span>
          </div>
          <div className="flex items-center mb-2">
            <span className="text-gray-500 mr-2">📧</span>
            <span>{user.email}</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-500 mr-2">🏠</span>
            <div>
              <span>Address</span>
              <p className="text-sm text-gray-500">
                {user.address}
              </p>
            </div>
          </div>
        </div>

        {/* Bookings Section */}
        <div className="mt-6">
          <h2 className="font-bold text-lg mb-3">Bookings</h2>
          {user.bookings.map((booking, index) => (
            <div
              key={index}
              className="flex justify-between border-b py-2 font-semibold text-sm"
            >
              <div>
                <p>{booking.service}</p>
                <p className="text-gray-500">{booking.date}</p>
              </div>
              <p>{booking.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
