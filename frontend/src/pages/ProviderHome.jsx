import { useState, useRef } from "react";
import ProviderNavigation from "../components/ProviderNavigation";
import { Avatar } from "@mui/material";
import AddService from "../components/AddService";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CircularProgress } from "@mui/material";
import BookingLists from "../components/BookingLists";
import { useOutletContext } from "react-router-dom";
import { useGetChangeBookingStatusMutation } from "../app/api/api";

const ProviderHome = () => {
    const [addServicePanel, setAddServicePanel] = useState(false);
    const [recentBookingsPanel, setRecentBookingsPanel] = useState(true);
    const [value, setValue] = useState(0);

    const { provider, isLoading } = useOutletContext()
    const [changeBookingStatus, { isLoading: isBookingStatusLoading, isSuccess: isBookingStatusSuccess, isError: isBookingStatusError }] = useGetChangeBookingStatusMutation();

    console.log(provider)
    const addServicePanelRef = useRef(null);
    const recentBookingsPanelRef = useRef(null);

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
                                <p className="text-xl font-bold">{provider?.provider.services.length}</p>
                            </div>
                            <div className="bg-white p-4 rounded shadow">
                                <p className="text-gray-500">Total Bookings</p> 
                                <p className="text-xl font-bold">{provider?.provider.bookings.length}</p>
                            </div>
                            <div className="bg-white p-4 rounded shadow">
                                <p className="text-gray-500">
                                    Pending Bookings
                                </p>
                                <p className="text-xl font-bold">{provider?.provider.bookings.filter((booking) => booking.status?.toLowerCase() === "Pending"?.toLowerCase()).length}</p>
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
                                    src={'https://via.placeholder.com/150/blue?text=Plumbing+Fix'}
                                    alt={service.serviceType}
                                    className="w-16 h-16 object-cover rounded"
                                />
                                {/* Service Details */}
                                <div>
                                    <p className="text-lg font-bold">
                                        {service.serviceType?.charAt(0).toUpperCase() + service.serviceType?.slice(1)}
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
                                        {service.status?.charAt(0).toUpperCase() + service.status?.slice(1)}
                                    </span>
                                </div>
                                </div>
                                <button className="px-3 py-1 bg-red-500 font-semibold text-white rounded">Delete</button>
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
                    <BookingLists provider={provider} changeBookingStatus={changeBookingStatus} isBookingStatusError={isBookingStatusError} isBookingStatusSuccess={isBookingStatusSuccess}/>
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
                            <h4 onClick={()=> {setRecentBookingsPanel(false); setValue(0)}} className="w-full text-center"><i className="text-2xl text-gray-400 ri-arrow-down-wide-fill"></i></h4>
                        <BookingLists provider={provider} changeBookingStatus={changeBookingStatus} isBookingStatusSuccess={isBookingStatusSuccess} isBookingStatusError={isBookingStatusError}/>    
                    </div>  
                    <div className="fixed bottom-0 z-10 right-0 left-0 border border-t border-gray-300">
                        <ProviderNavigation
                            value={value}
                            setValue={setValue}
                            setAddServicePanel={setAddServicePanel}
                            addServicePanel={addServicePanel}
                            setRecentBookingsPanel={setRecentBookingsPanel}
                            recentBookingsPanel={recentBookingsPanel}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default ProviderHome;
