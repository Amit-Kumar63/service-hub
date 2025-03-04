import { useEffect, useRef, useState } from "react";
import { Avatar } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import EditProfile from "../components/EditProfile";
import { useLogoutProviderMutation, useUpdateProviderProfileMutation } from "../app/api/api";
import {toast} from "react-toastify";
import { signOut, auth } from "../firebase-config";
import AlertDialogSlide from "../components/Dialog";
import axios from "axios";

const ProviderProfile = () => {
    const { provider, isLoading, providerToken: token, refetchProvider } = useOutletContext()
      const [editedProfileData, setEditedProfileData] = useState({
        phone: provider?.provider.phone || "",
        name: provider?.provider.name || "",
      });
      const [address, setAddress] = useState(provider?.provider.address || "")
      const [isEdit, setIsEdit] = useState(false)
      const [updateProfilePanel, setUpdateProfilePanel] = useState(false)
      const [open, setOpen] = useState(false)

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
      const editProfileImageHandler = async (e) => {
        const data = new FormData()
        data.append('image', e.target.files[0])
        if (data.get('image')) {
          toast.loading("Updating...", {toastId: "loadingEditProfileImage"})
          await axios.post(`${import.meta.env.VITE_BASE_URL}/providers/edit-profile-image`, data, {
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          }).then((res) => {
            if (res.status === 200) {
              toast.dismiss("loadingEditProfileImage")
              toast.success("Profile image updated successfully")
              refetchProvider()
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
            <div className="relative overflow-hidden rounded-full">
            <Avatar
              alt={provider?.provider.name}
              src={provider?.provider.image.url}
              sx={{ width: 70, height: 70 }}
              className="w-20 h-20"
            />
             <div className="absolute z-10 bg-white bg-opacity-40 w-24 h-fit bottom-0 -left-[10px] rounded-full">
            <label htmlFor="image" className="w-full">
            <i className="text-xl ri-pencil-fill m-[0 auto] float-right mr-6 text-gray-800"></i>
            </label>
            <input type="file" id="image" name="image" className="hidden" onChange={(e) => editProfileImageHandler(e)}/>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                {provider?.provider.name}
              </h1>
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

            <div className="mt-6">
              <h2 className="font-bold text-lg mb-3">Contact and address</h2>
              <div className="flex items-center mb-3">
                <span className="text-gray-500 mr-3">📞</span>
                <span className="font-semibold text-base text-gray-600">{provider?.provider.phone}</span>
              </div>
              <div className="flex items-center mb-2">
                <span className="text-gray-500 mr-2">📧</span>
                <span className="font-semibold text-base text-gray-600">{provider?.provider.email}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-500 mr-2">🏠</span>
                <div>
                  <span className="font-semibold">Address</span>
                  <p className="text-sm text-gray-500 font-semibold">
                    {provider?.provider.address}
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
              <button onClick={()=> setOpen(true)} className="w-full text-left px-4 py-2 rounded bg-red-500 text-white font-semibold">
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
      <AlertDialogSlide open={open} setOpen={setOpen} cb={logoutHandler} text={{Agree: 'Logout', Disagree: 'Cancel'}} title={"Confirm logout ?"}/>
    </div>
  );
};

export default ProviderProfile;
