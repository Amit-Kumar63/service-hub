import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import UserBookingsList from "../components/UserBookingsList";
import { signOut, auth } from "../firebase-config";
import { useLogoutUserMutation, useUpdateUserProfileMutation } from "../app/api/api";
import { toast } from "react-toastify";
import AddressSuggestion from "../components/AddressSuggestion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import EditProfile from "../components/EditProfile";
import axios from "axios";

const ProfilePage = () => {
  const { user, isLoading, isSuccess,token, refetch } = useOutletContext()
  const [viewAllBookings, setViewAllBookings] = useState(user?.user.bookings.length <= 3 ? true : false);
  const [editedProfileData, setEditedProfileData] = useState({
    phone: user?.user.phone || "",
    name: user?.user.name || "",
  });
  const [address, setAddress] = useState(user?.user.address || "")
  const [isEdit, setIsEdit] = useState(false)
  const [updateProfilePanel, setUpdateProfilePanel] = useState(false)

  const [logoutUser, { isLoading: isLogoutLoading, isSuccess: isLogoutSuccess, isError: isLogoutError, error: logoutError }] = useLogoutUserMutation()
  const [updateProfile, { isLoading: isUpdateLoading, isSuccess: isUpdateSuccess, isError: isUpdateError, error: updateError }] = useUpdateUserProfileMutation()

  const navigate = useNavigate(); 
  const updateProfileRef = useRef()
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

  useGSAP(()=> {
    if (updateProfilePanel) {
      gsap.to(updateProfileRef.current, {
        transform: 'translateY(0)',
        bottom: 65,
        duration: 0.5,
        ease: 'power4.out',
      })
    } else {
      gsap.to(updateProfileRef.current, {
        transform: 'translateY(100%)',
        bottom: 0,
        duration: 0.5,
        ease: 'power4.out',
      })
    }
  }, [updateProfilePanel])
  const updateProfileHandler = async () => {
    await updateProfile({name: editedProfileData.name, address, phone: editedProfileData.phone, token})
  }

  const editProfileImageHandler = async (e) => {
    const data = new FormData()
    data.append('image', e.target.files[0])
    if (data.get('image')) {
      toast.loading("Updating...", {toastId: "loadingEditProfileImage"})
      await axios.post(`${import.meta.env.VITE_BASE_URL}/users/edit-profile-image`, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      }).then((res) => {
        if (res.status === 200) {
          toast.dismiss("loadingEditProfileImage")
          toast.success("Profile image updated successfully")
          refetch()
        }
      }
      ).catch((error) => {
        console.error(error)
        toast.dismiss("loadingEditProfileImage")
        toast.error(error?.response?.data?.message || "Something went wrong, please try again")
      }
      )
    }
  }
  useEffect(() => {
    if (isUpdateLoading) {
      toast.loading("Updating...", {toastId: "loading"})
    }
    if (isUpdateSuccess) {
      toast.dismiss("loading")
      setUpdateProfilePanel(false)
      sessionStorage.setItem('isProfileUpdated', JSON.stringify(true))
      
    }
    if (updateError) {
      toast.dismiss("loading")
      toast.error(updateError?.data?.message || "Something went wrong, please try again")
    }
  }, [isUpdateSuccess, isUpdateLoading, updateError])
  useEffect(() => {
    const timeOut = setTimeout(() => {
      const isProfileUpdated = JSON.parse(sessionStorage.getItem('isProfileUpdated'))
      if (isProfileUpdated) {
        toast.success("Profile updated successfully")
        sessionStorage.removeItem('isProfileUpdated')
      }
    }, 300);
    return () => clearTimeout(timeOut);
  }, [])

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
          <div className="text-center mx-auto w-fit">
            <div className="relative">
            <img
              src={user?.user.image.url}
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto object-cover"
            />
            <div className="absolute z-10 bg-white bg-opacity-40 w-24 h-fit bottom-0 left-[20px] rounded-full">
            <label htmlFor="image" className="w-full">
            <i className="text-xl ri-pencil-fill m-[0 auto] float-right mr-6 text-gray-800"></i>
            </label>
            <input type="file" id="image" name="image" className="hidden" onChange={(e) => editProfileImageHandler(e)}/>
              </div>
            </div>
            <h1 className="text-lg font-bold mt-4">
              {user?.user.name.charAt(0).toUpperCase() + user?.user.name.slice(1).split(' ')[0]}
            </h1>
            <p className="text-sm text-gray-500">
              Joined in {user?.user.createdAt?.split("T")[0]}
            </p>
            <p className="text-sm text-gray-500 text-ellipsis whitespace-nowrap overflow-hidden">{user?.user.address}</p>
          </div>
  
          {/* Edit and Logout Buttons */}
          <div className="flex justify-between gap-3 mt-4">
            <button onClick={()=> setUpdateProfilePanel(!updateProfilePanel)} className="w-1/2 bg-gray-200 font-bold text-gray-700 py-2 px-4 rounded-lg">
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
      <EditProfile 
      setUpdateProfilePanel={setUpdateProfilePanel}
      updateProfileRef={updateProfileRef}
      isEdit={isEdit}
      setIsEdit={setIsEdit}
      setEditedProfileData={setEditedProfileData}
      updateProfileHandler={updateProfileHandler}
      editedProfileData={editedProfileData}
      address={address}
      setAddress={setAddress}
      />
    </div>
  );
};

export default ProfilePage;
