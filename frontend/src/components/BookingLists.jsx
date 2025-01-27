import { useState } from "react";

const BookingLists = ({ provider, changeBookingStatus, isBookingStatusError, isBookingStatusLoading, isBookingStatusSuccess }) => {
    const [bookings, setBookings] = useState(provider?.provider.bookings || []);

    const changeBookingStatusHandler = async (bookingId, status) => {
        const updateBookings = bookings.map((booking) => 
            booking._id === bookingId ? { ...booking, status } : booking
        );
        setBookings(updateBookings);

        const token = localStorage.getItem("provider-token");
try {
            await changeBookingStatus({
                id: bookingId,
                status,
                token
            })
            if (isBookingStatusError) {
                console.log(isBookingStatusError);
            }
            if (isBookingStatusSuccess) {
                console.log(isBookingStatusSuccess);
            }
            if (isBookingStatusLoading) {
                console.log(isBookingStatusLoading);
            }
} catch (error) {
    console.error(error);
    const revertBookings = bookings.map((booking) => 
        booking._id === bookingId ? { ...booking, status: status === "accepted" ? "pending" : "accepted" } : booking
    );
    setBookings(revertBookings);
}
    }
    return (
        <div className="space-y-4 pb-16">
            <h2 className="text-xl font-bold text-gray-800">Recent Bookings</h2>
            {bookings.map((booking, index) => (
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
                            <p className="text-sm text-gray-500 font-semibold">
                                Service type: {booking.serviceType?.charAt(0).toUpperCase() + booking.serviceType?.slice(1)}
                            </p>
                            <p className="text-gray-500 text-sm text-ellipsis">
                            {booking.address}
                        </p>
                            <p
                                className={`text-sm font-semibold ${
                                    booking.status?.toLowerCase() ===
                                    "Pending"?.toLowerCase() && "text-yellow-600" ||
                                    booking.status?.toLowerCase() ===
                                    'Accepted'.toLowerCase() && "text-green-600" ||
                                    booking.status?.toLowerCase() ===
                                    'Declined'.toLowerCase() && "text-red-600"
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
                        <button
                        disabled={booking.status.toLowerCase() === "accepted"}
                        onClick={() => changeBookingStatusHandler(booking._id, "Accepted")}
                        className={`w-1/2 ${booking.status.toLowerCase() === "accepted" ? "bg-gray-400" : "bg-green-500"} text-white px-1 py-2 rounded-md font-semibold text-sm`}>
                            {booking.status.toLowerCase() === "accepted" ? "Accepted" : "Accept"}
                        </button>
                        <button
                        disabled={booking.status.toLowerCase() === "declined"}
                        onClick={() => changeBookingStatusHandler(booking._id, "Declined")}
                        className={`w-1/2 ${booking.status.toLowerCase() === "accepted" ? "bg-red-500" : "bg-gray-400"} text-white px-1 py-2 rounded-md font-semibold text-sm`}>
                            {booking.status.toLowerCase() === "declined" ? "Declined" : "Decline"}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BookingLists;
