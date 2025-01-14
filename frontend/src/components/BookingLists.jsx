import React from "react";

const BookingLists = ({ provider }) => {
    return (
        <div className="space-y-4 pb-16">
            <h2 className="text-xl font-bold text-gray-800">Recent Bookings</h2>
            {provider?.provider.bookings.map((booking, index) => (
                <div
                    key={index}
                    className="bg-white px-4 py-3 rounded shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-lg font-bold">
                                {booking.serviceName}
                            </p>
                            <p className="text-gray-800 font-semibold text-ellipsis">
                                Booked :{" "}
                                {booking.user.firstName
                                    ?.charAt(0)
                                    .toUpperCase() +
                                    booking.user.firstName?.slice(1)}{" "}
                                {booking.user.lastName
                                    ?.charAt(0)
                                    .toUpperCase() +
                                    booking.user.lastName?.slice(1)}
                            </p>
                            <p className="text-gray-500 text-sm font-semibold">
                                Date: {booking.createdAt?.split("T")[0]}
                            </p>
                            <p className="text-gray-500 text-sm text-ellipsis">
                            {booking.address}
                        </p>
                            <p
                                className={`text-sm font-semibold ${
                                    booking.status?.toLowerCase() ===
                                    "Pending"?.toLocaleLowerCase()
                                        ? "text-yellow-600"
                                        : "text-green-500"
                                }`}>
                                {booking.status?.charAt(0).toUpperCase() +
                                    booking.status?.slice(1)}
                            </p>
                        </div>
                        <div>
                            <img
                                className="w-16 h-16 rounded-full object-cover"
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV4UlS1Ehv87B7_HRdQWlKz8Jw13A0zxuiuQ&s"
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-2 mt-4">
                        <button className="w-1/2 bg-green-500 text-white px-1 py-2 rounded-md font-semibold text-sm">
                            Accept
                        </button>
                        <button className="w-1/2 bg-red-500 text-white px-1 py-2 rounded-md font-semibold text-sm">
                            Decline
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BookingLists;
