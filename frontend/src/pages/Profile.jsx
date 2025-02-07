import React, { useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import UserBookingsList from "../components/UserBookingsList";
import { signOut, auth } from "../firebase-config";
import { useLogoutUserMutation, useUpdateUserProfileMutation } from "../app/api/api";
import { toast } from "react-toastify";
import AddressSuggestion from "../components/AddressSuggestion";

const ProfilePage = () => {
  const { user, isLoading, isSuccess,token } = useOutletContext()
  const [viewAllBookings, setViewAllBookings] = useState(user?.user.bookings.length <= 3 ? true : false);
  const [editedProfileData, setEditedProfileData] = useState({
    phone: user?.user.phone || "",
    name: user?.user.name || "",
  });
  const [address, setAddress] = useState(user?.user.address || "")
  const [isEdit, setIsEdit] = useState(false)

  const [logoutUser, { isLoading: isLogoutLoading, isSuccess: isLogoutSuccess, isError: isLogoutError, error: logoutError }] = useLogoutUserMutation()
  const [updateProfile, { isLoading: isUpdateLoading, isSuccess: isUpdateSuccess, isError: isUpdateError, error: updateError }] = useUpdateUserProfileMutation()
  const navigate = useNavigate(); 
  const handleLogout = async () => {
    try {
      await logoutUser(token)
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong, please try again")
     console.error({message: error.message});
  }}
  useEffect(() => {
    const onLogoutSuccess = async () => {
      if (isLogoutSuccess) {
        await signOut(auth);
        localStorage.removeItem("token");
        navigate("/user/home", { state: { showToast: true, message: "You are logged out, see you soon!", severity: "success"} });
        window.location.reload();
      }
    }
    onLogoutSuccess();
    return ()=> {}
  }, [isLogoutSuccess, handleLogout ]);
  const updateProfileHandler = async () => {
    await updateProfile({name: editedProfileData.name, address, phone: editedProfileData.phone, token})
    if (isUpdateLoading) {
      toast.loading("Updating...", {toastId: "loading"})
    }
    if (isUpdateSuccess) {
      toast.dismiss("loading")
      toast.success("Profile updated successfully")
    }
  }
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
          <div className="text-center mx-2">
            <img
              src={`${user?.user.image}`}
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto object-cover"
            />
            <h1 className="text-lg font-bold mt-4">
              {user?.user.name.charAt(0).toUpperCase() + user?.user.name.slice(1)}
            </h1>
            <p className="text-sm text-gray-500">
              Joined in {user?.user.createdAt?.split("T")[0]}
            </p>
            <p className="text-sm text-gray-500 text-ellipsis whitespace-nowrap overflow-hidden">{user?.user.address}</p>
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
      <section className="fixed h-fit bottom-20 z-10 w-full bg-white">
        <div className="pt-7 pb-5 px-2 border-t border-b border-gray-200 border-solid">
          <button 
          onClick={() => setIsEdit(!isEdit)}
          className={`bg-gray-200 font-bold ${isEdit ? 'text-red-500' : 'text-gray-700'} text-sm py-1 px-3 rounded-lg mb-3 float-right`}>
            {isEdit ? "Cancel" : "Edit"}
          </button>
          <input 
          className={`w-full px-4 py-3 mb-5 text-wrap text-lg bg-[#E8EEF2] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ${isEdit ? 'text-gray-700' : 'text-gray-400'} ${isEdit ? 'focus:ring-blue-500' : 'focus:ring-transparent'}`}
          type="text" 
          placeholder="Name"
          required
          value={editedProfileData.name}
          readOnly={!isEdit}
          onChange={(e) => setEditedProfileData({...editedProfileData, name: e.target.value})}
          />
          <input 
          required
          className={`w-full px-4 py-3 mb-5 text-wrap text-lg bg-[#E8EEF2] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ${isEdit ? 'text-gray-700' : 'text-gray-400'} ${isEdit ? 'focus:ring-blue-500' : 'focus:ring-transparent'}`}
          type="number" 
          placeholder="Phone"
          value={editedProfileData.phone}
          readOnly={!isEdit}
          onChange={(e) => setEditedProfileData({...editedProfileData, phone: e.target.value})}
          />
          <AddressSuggestion address={address} setAddress={setAddress} readOnly={!isEdit}/>
          <button 
          disabled={!isEdit}
          className={`w-full ${isEdit ? 'bg-blue-500' : 'bg-gray-400'} font-bold text-white py-3 px-4 rounded-lg mb-3`}
          onClick={updateProfileHandler}
          >
            Confirm changes
          </button>
          <button className="w-full bg-gray-400 font-bold text-white py-3 px-4 rounded-lg mb-2">Cancel</button>
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;
