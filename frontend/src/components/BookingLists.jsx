import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";

const BookingLists = ({ provider, changeBookingStatus, isBookingStatusError, isBookingStatusLoading, isBookingStatusSuccess }) => {
    const [bookings, setBookings] = useState(provider?.provider.bookings || []);
    const { providerToken } = useOutletContext();

    const changeBookingStatusHandler = async (bookingId, status) => {
        const updateBookings = bookings.map((booking) => 
            booking._id === bookingId ? { ...booking, status } : booking
        );
        setBookings(updateBookings);

try {
            await changeBookingStatus({
                id: bookingId,
                status,
                token:providerToken
            })

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
                                {booking.serviceType?.charAt(0).toUpperCase() + booking.serviceType?.slice(1)}
                            </p>
                            <p className="text-gray-800 font-semibold text-ellipsis">
                                Booked :{" "}
                                {booking.user.name
                                    ?.charAt(0)
                                    .toUpperCase() +
                                    booking.user.name?.slice(1)}{" "}
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
                    {
                        booking.status.toLowerCase() === "declined" && (
                            <p className="text-[10px] text-gray-500 mt-2 text-center">Booking will be deleted in 24 hours if not accepted</p>
                        )
                    }
                </div>
            ))}
        </div>
    );
};

export default BookingLists;
