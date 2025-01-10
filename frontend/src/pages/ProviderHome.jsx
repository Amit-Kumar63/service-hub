import { useState, useRef } from "react";
import ProviderNavigation from "../components/ProviderNavigation";
import { Avatar } from "@mui/material";
import AddService from "../components/AddService";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useGetProviderProfileQuery } from "../app/api/api";
import { CircularProgress } from "@mui/material";

const ProviderHome = () => {
    const [addServicePanel, setAddServicePanel] = useState(false);
    const [value, setValue] = useState(0);

    const token = localStorage.getItem("provider-token");

    const addServicePanelRef = useRef(null);
    const { data: provider, isLoading } = useGetProviderProfileQuery(
        token,
        {
            skip: !token,
        }
    );

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

    // Dummy Data
    const services = [
        {
            name: "Plumbing Fix",
            type: "Plumber",
            price: 100,
            bookings: 10,
            status: "Available",
            image: "https://via.placeholder.com/150/blue?text=Plumbing+Fix",
        },
        {
            name: "Electrical Setup",
            type: "Electrician",
            price: 150,
            bookings: 5,
            status: "Unavailable",
            image: "https://via.placeholder.com/150/yellow?text=Electrical+Setup",
        },
    ];
    console.log(provider);
    const bookings = [
        {
            id: "B123",
            serviceName: "Plumbing Fix",
            user: "John Doe",
            date: "2025-01-15",
            status: "Pending",
        },
        {
            id: "B124",
            serviceName: "Electrical Setup",
            user: "Jane Smith",
            date: "2025-01-17",
            status: "Completed",
        },
        {
            id: "B126",
            serviceName: "Plumbing Fix",
            user: "John Doe",
            date: "2025-01-15",
            status: "Pending",
        },
        {
            id: "B128",
            serviceName: "Electrical Setup",
            user: "Jane Smith",
            date: "2025-01-17",
            status: "Completed",
        },
    ];

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
                                <p className="text-xl font-bold">3</p>
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
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="bg-white p-4 rounded shadow flex items-start space-x-4">
                                {/* Service Image */}
                                <img
                                    src={service.image}
                                    alt={service.name}
                                    className="w-16 h-16 object-cover rounded"
                                />
                                {/* Service Details */}
                                <div>
                                    <p className="text-lg font-bold">
                                        {service.name}
                                    </p>
                                    <p className="text-gray-500">
                                        {service.type}
                                    </p>
                                    <p className="text-gray-500">
                                        Price: ${service.price}
                                    </p>
                                    <p
                                        className={`text-sm ${
                                            service.status === "Available"
                                                ? "text-green-500"
                                                : "text-red-500"
                                        }`}>
                                        {service.status}
                                    </p>
                                </div>
                            </div>
                        ))}
                        <button
                            className="w-full bg-blue-500 text-white py-2 rounded"
                            onClick={() => {
                                setAddServicePanel(!addServicePanel);
                                addServicePanel ? setValue(0) : setValue(1);
                            }}>
                            Add New Service
                        </button>
                    </div>

                    {/* Bookings List */}
                    <div className="space-y-4 pb-16">
                        <h2 className="text-xl font-bold text-gray-800">
                            Recent Bookings
                        </h2>
                        {bookings.map((booking) => (
                            <div
                                key={booking.id}
                                className="bg-white p-4 rounded shadow">
                                <p className="text-lg font-bold">
                                    {booking.serviceName}
                                </p>
                                <p className="text-gray-500">
                                    Booked by: {booking.user}
                                </p>
                                <p className="text-gray-500">
                                    Date: {booking.date}
                                </p>
                                <p
                                    className={`text-sm ${
                                        booking.status === "Pending"
                                            ? "text-yellow-500"
                                            : "text-green-500"
                                    }`}>
                                    {booking.status}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div
                        ref={addServicePanelRef}
                        className="fixed translate-y-full h-fit left-0 right-0 bottom-0 z-10 w-full bg-white">
                        <AddService
                            setAddServicePanel={setAddServicePanel}
                            setValue={setValue}
                        />
                    </div>
                    <div className="fixed bottom-0 z-10 right-0 left-0 border border-t border-gray-300">
                        <ProviderNavigation
                            value={value}
                            setValue={setValue}
                            setAddServicePanel={setAddServicePanel}
                            addServicePanel={addServicePanel}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default ProviderHome;
