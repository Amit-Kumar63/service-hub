import { useEffect, useRef, useState } from "react";
import { Avatar } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { useOutletContext } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import EditProfile from "../components/EditProfile";
import { useLogoutProviderMutation, useUpdateProviderProfileMutation } from "../app/api/api";
import {toast} from "react-toastify";
import { signOut, auth } from "../firebase-config";
const ProviderProfile = () => {
    const { provider, isLoading } = useOutletContext()
      const [editedProfileData, setEditedProfileData] = useState({
        phone: provider?.provider.phone || "",
        name: provider?.provider.name || "",
      });
      const [address, setAddress] = useState(provider?.provider.address || "")
      const [isEdit, setIsEdit] = useState(false)
      const [updateProfilePanel, setUpdateProfilePanel] = useState(false)

      const updateProfileRef = useRef()
      const [updateProviderProfile, { isLoading: isUpdateLoading, isSuccess: isUpdateSuccess, error: updateError }] = useUpdateProviderProfileMutation()
      const [logoutProvider, { isLoading: isLogoutLoading, isSuccess: isLogoutSuccess, error: logoutError }] = useLogoutProviderMutation()      

      useGSAP(()=> {
        if (updateProfilePanel) {
          gsap.to(updateProfileRef.current, {
            transform: 'translateY(0)',
            bottom: 58,
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
        try {
          await updateProviderProfile({name: editedProfileData.name, address, phone: editedProfileData.phone, token: provider?.provider.token})
        } catch (error) {
          toast.error(error.data.message)
        }
      }
      useEffect(() => {
        if (isUpdateSuccess) {
          toast.dismiss("loading")
          toast.success("Profile updated successfully")
          setUpdateProfilePanel(false)
        } 
        if (updateError) {
          toast.dismiss("loading")
          toast.error(updateError.data.message)
          setUpdateProfilePanel(false)
        }
        if (isUpdateLoading) {
          toast.loading({toastId: "loading"},"Updating profile...")
        }
      }, 
      [isUpdateSuccess, updateError, isUpdateLoading])

      const logoutHandler = async () => {
        try {
          await logoutProvider(provider?.provider.token)
        } catch (error) {
          toast.error(error.data.message)
        }
      }
      useEffect(() => {
        const onLogoutSuccess = async () => {
          if (isLogoutSuccess) {
            await signOut(auth);
            localStorage.removeItem("token");
            window.location.href = "/provider/login"
          }
        }
        onLogoutSuccess();
        if (logoutError) {
          toast.dismiss("loading")
          toast.error(logoutError.data.message)
        }
        if (isLogoutLoading) {
          toast.loading({toastId: "loading"},"Logging out...")
        }
        return ()=> {}
      },
      [isLogoutSuccess, logoutError, isLogoutLoading])
  return (
    <div className="min-h-screen pb-10 bg-gray-100">
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
              <button onClick={() => setUpdateProfilePanel(!updateProfilePanel)} className="w-full text-left px-4 py-2 rounded bg-blue-500 text-white font-semibold">
                Edit Profile
              </button>
              <button onClick={()=> logoutHandler()} className="w-full text-left px-4 py-2 rounded bg-red-500 text-white font-semibold">
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
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

export default ProviderProfile;
