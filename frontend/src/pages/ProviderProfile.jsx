import React from "react";
import { Avatar } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { useOutletContext } from "react-router-dom";

const ProviderProfile = () => {
    const { provider, isLoading } = useOutletContext()
  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen w-full bg-slate-200">
          <CircularProgress />
        </div>
      ) : (
        <div className="p-4 space-y-5 bg-gray-100 min-h-screen">
          <div onClick={() => window.history.back()}>
          <i className="text-2xl text-gray-500 ri-arrow-left-line"></i>
          </div>
          {/* Profile Header */}
          <div className="flex items-center gap-4">
            <Avatar
              alt={provider?.provider.name}
              src="https://via.placeholder.com/150"
              className="w-20 h-20"
            />
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                {provider?.provider.firstName} {provider?.provider.lastName}
              </h1>
              <p className="text-gray-500">{provider?.provider.email}</p>
            </div>
          </div>

          {/* Services Summary */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800">Services Summary</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded shadow">
                <p className="text-gray-500">Total Services</p>
                <p className="text-xl font-bold">
                  {provider?.provider.services.length}
                </p>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <p className="text-gray-500">Active Services</p>
                <p className="text-xl font-bold">
                  {
                    provider?.provider.services.filter(
                      (service) => service.status === "active"
                    ).length
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Bookings Summary */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800">Bookings Summary</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded shadow">
                <p className="text-gray-500">Total Bookings</p>
                <p className="text-xl font-bold">
                  {provider?.provider.bookings.length}
                </p>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <p className="text-gray-500">Pending Bookings</p>
                <p className="text-xl font-bold">
                  {
                    provider?.provider.bookings.filter(
                      (booking) =>
                        booking.status?.toLowerCase() === "pending"
                    ).length
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Account Management */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800">
              Account Management
            </h2>
            <div className="bg-white p-4 rounded shadow space-y-2">
              <button className="w-full text-left px-4 py-2 rounded bg-blue-500 text-white font-semibold">
                Edit Profile
              </button>
              <button className="w-full text-left px-4 py-2 rounded bg-gray-500 text-white font-semibold">
                Change Password
              </button>
              <button className="w-full text-left px-4 py-2 rounded bg-red-500 text-white font-semibold">
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProviderProfile;
