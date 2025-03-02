import { useState, useRef, useEffect } from "react";
import { Avatar } from "@mui/material";
import AddService from "../components/AddService";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CircularProgress } from "@mui/material";
import BookingLists from "../components/BookingLists";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { useDeleteServiceMutation, useGetChangeBookingStatusMutation } from "../app/api/api";
import { toast } from "react-toastify";
import AddAddressPopup from "../components/AddAddressPopup";

const ProviderHome = () => {
    const { addServicePanel, setAddServicePanel, setValue, recentBookingsPanel, setRecentBookingsPanel, provider, isLoading, providerToken: token } = useOutletContext()
    const [addAddressPanel, setAddAddressPanel] = useState(false)

    const addAddressPopupRef = useRef()
    const [
        changeBookingStatus,
        {
            isLoading: isBookingStatusLoading,
            isSuccess: isBookingStatusSuccess,
            isError: isBookingStatusError,
        },
    ] = useGetChangeBookingStatusMutation();

    const [deleteService, { isLoading: isDeleteServiceLoading, isSuccess: isDeleteServiceSuccess, error: deleteServiceError }] = useDeleteServiceMutation()
    const addServicePanelRef = useRef(null);
    const recentBookingsPanelRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();

    const deleteServiceHandler = async (serviceId)=> {
        await deleteService({serviceId, token})
    }
    useGSAP(() => {
        if (addServicePanel) {
            gsap.to(addServicePanelRef.current, {
                transform: "translateY(0)",
            });
        } else {
            gsap.to(addServicePanelRef.current, {
                transform: "translateY(100%)",
            });
        }
    }, [addServicePanel]);

    useGSAP(() => {
        if (recentBookingsPanel) {
            gsap.to(recentBookingsPanelRef.current, {
                transform: "translateY(0)",
                display: "block",
            });
        } else {
            gsap.to(recentBookingsPanelRef.current, {
                transform: "translateY(100%)",
                display: "none",
            });
        }
    }, [recentBookingsPanel]);
    useEffect(() => {
        if (location.state?.showToast) {
            const timeOut1 = setTimeout(() => {
                toast(location.state?.message, {
                    type: location.state?.severity,
                });
            }, 200);

            const timeOut2 = setTimeout(() => {
                toast.dismiss();
                navigate("/provider/home", {
                    state: { showToast: false, message: "", severity: "" },
                });
            }, 5000);

            return () => {
                clearTimeout(timeOut1);
                clearTimeout(timeOut2);
            };
        }
    }, [location.state]);
    useGSAP(() => {
        if (addAddressPanel) {
           gsap.to(addAddressPopupRef.current, {
            bottom: 80,
            transform: 'translateY(0)',
            delay: 0.3
          })
        }
        else {
          gsap.to(addAddressPopupRef.current, {
            bottom: 0,
            duration: 0.3,
            transform: 'translateY(100%)'
          })
        }
      }, [addAddressPanel])

      useEffect(()=> {
        if (provider && !provider?.provider.address) {
          setAddAddressPanel(true)
        }
        else {
          setAddAddressPanel(false)
        }
      }, [token])

      useEffect(() => {
        if (isDeleteServiceSuccess) {
          toast.dismiss('deleting')
          toast.success("Service deleted successfully")
        }
        if (deleteServiceError) {
          toast.dismiss('deleting')
          toast.error(deleteServiceError.data.message)
        }
        if (isDeleteServiceLoading) {
          toast.loading({toastId: "deleting"}, "Deleting service...")
        }        
      }, 
      [isBookingStatusLoading, isDeleteServiceLoading, deleteServiceError, isDeleteServiceSuccess])
    return (
        <>
            {isLoading ? (
                <div className="flex items-center justify-center h-screen w-full bg-slate-200">
                    <CircularProgress />
                </div>
            ) : (
                <div className="p-4 space-y-6 bg-gray-100 min-h-screen relative">
                    {/* Dashboard Summary */}
                    <div className="space-y-4">
                        <div className="w-full flex justify-between">
                            <h1 className="text-xl font-bold self-end text-gray-800">
                                Dashboard
                            </h1>
                            <Avatar
                                alt="Remy Sharp"
                                src="https://via.placeholder.com/150"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white p-4 rounded shadow">
                                <p className="text-gray-500">Total Services</p>
                                <p className="text-xl font-bold">
                                    {provider?.provider.services.length}
                                </p>
                            </div>
                            <div className="bg-white p-4 rounded shadow">
                                <p className="text-gray-500">Total Bookings</p>
                                <p className="text-xl font-bold">
                                    {provider?.provider.bookings.length}
                                </p>
                            </div>
                            <div className="bg-white p-4 rounded shadow">
                                <p className="text-gray-500">
                                    Pending Bookings
                                </p>
                                <p className="text-xl font-bold">
                                    {
                                        provider?.provider.bookings.filter(
                                            (booking) =>
                                                booking.status?.toLowerCase() ===
                                                "Pending"?.toLowerCase()
                                        ).length
                                    }
                                </p>
                            </div>
                            <div className="bg-white p-4 rounded shadow">
                                <p className="text-gray-500">Earnings</p>
                                <p className="text-xl font-bold">&#8377; 500</p>
                            </div>
                        </div>
                    </div>

                    {/* Services List */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-gray-800">
                            Your Services
                        </h2>
                        {provider?.provider.services.map((service, index) => (
                            <div
                                key={index}
                                className="bg-white px-4 py-2 rounded shadow flex items-center justify-between space-x-4">
                                {/* Service Image */}
                                <div className="flex items-center gap-4">
                                    <img
                                        src={
                                            service.image
                                        }
                                        alt={service.serviceType}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                    {/* Service Details */}
                                    <div>
                                        <p className="text-lg font-bold">
                                            {service.serviceType
                                                ?.charAt(0)
                                                .toUpperCase() +
                                                service.serviceType?.slice(1)}
                                        </p>
                                        <p className="text-gray-500 text-sm font-semibold">
                                            Price: &#8377; {service.price}
                                        </p>
                                        <span
                                            className={`text-sm ${
                                                service.status === "active"
                                                    ? "text-green-600"
                                                    : "text-red-500"
                                            } font-semibold`}>
                                            {service.status
                                                ?.charAt(0)
                                                .toUpperCase() +
                                                service.status?.slice(1)}
                                        </span>
                                    </div>
                                </div>
                                <button onClick={() => deleteServiceHandler(service._id)} className="px-3 py-1 bg-red-500 font-semibold text-white rounded">
                                    Delete
                                </button>
                            </div>
                        ))}
                        <button
                            className="w-full bg-blue-500 font-semibold text-white py-2 rounded"
                            onClick={() => {
                                setAddServicePanel(!addServicePanel);
                                addServicePanel ? setValue(0) : setValue(1);
                            }}>
                            Add New Service
                        </button>
                    </div>

                    {/* Bookings List */}
                    <BookingLists
                        provider={provider}
                        changeBookingStatus={changeBookingStatus}
                        isBookingStatusError={isBookingStatusError}
                        isBookingStatusSuccess={isBookingStatusSuccess}
                        isBookingStatusLoading={isBookingStatusLoading}
                    />
                    <div
                        ref={addServicePanelRef}
                        className="fixed translate-y-full h-fit left-0 right-0 bottom-0 z-10 w-full bg-white">
                        <AddService
                            setAddServicePanel={setAddServicePanel}
                            setValue={setValue}
                        />
                    </div>
                    <div
                        ref={recentBookingsPanelRef}
                        className="absolute hidden px-4 py-2 h-full z-10 bottom-0 left-0 right-0 w-full bg-gray-100">
                        <h4
                            onClick={() => {
                                setRecentBookingsPanel(false);
                                setValue(0);
                            }}
                            className="w-full text-center">
                            <i className="text-2xl text-gray-400 ri-arrow-down-wide-fill"></i>
                        </h4>
                        <BookingLists
                            provider={provider}
                            changeBookingStatus={changeBookingStatus}
                            isBookingStatusSuccess={isBookingStatusSuccess}
                            isBookingStatusError={isBookingStatusError}
                        />
                    </div>
                    <div
                        ref={addAddressPopupRef}
                        className="fixed z-10 left-0 right-0 bottom-0 translate-y-full h-fit w-full">
                        <AddAddressPopup
                            setAddAddressPanel={setAddAddressPanel}
                            isProviderAddress={true}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default ProviderHome;
